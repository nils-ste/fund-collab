import datetime

from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Funding, Projects, Permissions, db

bp = Blueprint('funding', __name__, url_prefix='/projects/<int:project_id>/funding')


@bp.route('', methods=['GET'])
@jwt_required()
def funding_by_id(project_id):
    """
    gets a funding by project id
    :param project_id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"
    is_viewer = permission and permission.role == "viewer"

    if not is_owner and not is_editor and not is_viewer:
        return jsonify({"Error": "Not authorized"}), 401

    funding_user = Funding.query.filter_by(project_id=project_id).all()
    funding_list = [fund.to_dict() for fund in funding_user]

    return jsonify(funding_list), 200


@bp.route('', methods=['POST'])
@jwt_required()
def add_funding(project_id):
    """
    adds a new funding to the project
    :param project_id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    funding_data = request.get_json()

    required_fields = ['title', 'status']
    missing_fields = [field for field in required_fields if not funding_data.get(field)]
    if missing_fields:
        return jsonify({"Error missing": missing_fields}), 400

    deadline_date = None
    deadline_str = funding_data.get('deadline')
    if deadline_str:
        try:
            deadline_date = datetime.datetime.strptime(deadline_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"Error": "Invalid deadline format (YYYY-MM-DD required)"}), 400

    new_funding = Funding(
        project_id=project_id,
        title=funding_data.get('title'),
        deadline=deadline_date,
        status=funding_data.get('status'),
        hyperlink=funding_data.get('hyperlink')
    )

    try:
        db.session.add(new_funding)
        db.session.commit()
        return jsonify(new_funding.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_funding(project_id, id):
    """
    updates a funding
    :param project_id:
    :param id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    funding = Funding.query.filter_by(project_id=project_id, id=id).first()

    if not funding:
        return jsonify({"Error": "Not found"}), 404

    data = request.get_json()

    editable_fields = ['title', 'deadline', 'status', 'hyperlink']

    for field in editable_fields:
        if field in data:
            if field == 'deadline':
                if data[field]:
                    try:
                        funding.deadline = datetime.datetime.strptime(
                            data[field], "%Y-%m-%d"
                        ).date()
                    except ValueError:
                        return jsonify({"Error": "Invalid deadline format (YYYY-MM-DD required)"}), 400
                else:
                    funding.deadline = None
            else:
                setattr(funding, field, data[field])

    try:
        db.session.commit()
        return jsonify(funding.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_funding(project_id, id):
    """
    deletes a funding
    :param project_id:
    :param id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    funding = Funding.query.filter_by(project_id=project_id, id=id).first()

    if not funding:
        return jsonify({"Error": "Not found"}), 404

    try:
        db.session.delete(funding)
        db.session.commit()
        return '', 204

    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500