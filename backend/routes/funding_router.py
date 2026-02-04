import datetime

from flask import request, jsonify, Blueprint
from models import Funding, db

bp = Blueprint('funding', __name__, url_prefix='/projects/<int:project_id>/funding')


@bp.route('', methods=['GET'])
def funding_by_id(project_id):
    """
    Get funding by id
    :param project_id:
    :return:
    """
    funding_user = Funding.query.filter_by(project_id=project_id).all()
    funding_list = [fund.to_dict() for fund in funding_user]
    return jsonify(funding_list), 200


@bp.route('', methods=['POST'])
def add_funding(project_id):
    """
    Add funding
    :param project_id:
    :return:
    """
    funding_data = request.get_json()
    deadline_str = funding_data.get('deadline')
    deadline_date = None
    if deadline_str:
        try:
            deadline_date = datetime.datetime.strptime(deadline_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"Error": "Invalid deadline format"}), 400

    required_fields= ['title', 'requirements']
    missing_fields = [field for field in required_fields if not funding_data.get(field)]
    if missing_fields:
        return jsonify({"Error missing:": missing_fields}), 400

    new_funding = Funding(project_id=project_id, title=funding_data.get('title'),
                          deadline=deadline_date, requirements=funding_data.get(
            'requirements'), hyperlink=funding_data.get('hyperlink'))
    try:
        db.session.add(new_funding)
        db.session.commit()
        return jsonify(new_funding.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['PUT'])
def update_funding(project_id, id):
    """
    Update funding
    :param project_id:
    :param id:
    :return:
    """
    funding = Funding.query.filter_by(project_id=project_id, id=id).first()
    if not funding:
        return jsonify({"Error": "Not found"}), 404
    data = request.get_json()
    editable_fields = ['title', 'deadline', 'requirements', 'hyperlink']
    for field in editable_fields:
        if field in data:
            setattr(funding, field, data[field])
    try:
        db.session.commit()
        return jsonify(funding.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['DELETE'])
def delete_funding(project_id, id):
    """
    Delete funding
    :param project_id:
    :param id:
    :return:
    """
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
