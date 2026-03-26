from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify, Blueprint
from models import Content, Projects, Permissions, db

bp = Blueprint('content', __name__, url_prefix='/projects/<int:project_id>/content')


@bp.route('', methods=['GET'])
@jwt_required()
def content(project_id):
    """
    Get all content objects
    :param project_id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(project_id=project_id, user_id=current_user_id).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"
    is_viewer = permission and permission.role == "viewer"

    if not is_owner and not is_editor and not is_viewer:
        return jsonify({"Error": "Not authorized"}), 401

    content_user = Content.query.filter_by(project_id=project_id).all()
    content_obj = [cont.to_dict() for cont in content_user]

    return jsonify(content_obj), 200


@bp.route('', methods=['POST'])
@jwt_required()
def create_content(project_id):
    """
    Create a new content object
    :param project_id:
    :return:
    """
    """
    check token with userid
    if false check permissions table for uid and return role
    if editor also ok
    if viewer error
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(project_id=project_id, user_id=current_user_id).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    content_data = request.get_json()

    new_content = Content(
        project_id=project_id,
        section_type=content_data.get('section_type'),
        text_box=content_data.get('text_box'),
        order=content_data.get('order'),
        category=content_data.get('category'),
    )

    try:
        db.session.add(new_content)
        db.session.commit()
        return jsonify(new_content.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_content(project_id, id):
    """
    Update a content object
    :param project_id:
    :param id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(project_id=project_id, user_id=current_user_id).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    content = Content.query.filter_by(project_id=project_id, id=id).first()

    if not content:
        return jsonify({"Error": "Not found"}), 404

    data = request.get_json()

    editable_fields = ['section_type', 'text_box', 'permission_reading', 'permission_editing', 'category']

    for field in editable_fields:
        if field in data:
            setattr(content, field, data[field])

    try:
        db.session.commit()
        return jsonify(content.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_content(project_id, id):
    """
    Delete a content object
    :param project_id:
    :param id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(project_id=project_id, user_id=current_user_id).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    content = Content.query.filter_by(project_id=project_id, id=id).first()

    if not content:
        return jsonify({"Error": "Not found"}), 404

    try:
        db.session.delete(content)
        db.session.commit()
        return '', 204

    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500