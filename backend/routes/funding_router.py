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
    new_funding = Funding(project_id=project_id, title=funding_data.get('title'),
                          deadline=funding_data.get('deadline'), requirements=funding_data.get(
            'requirements'),hyperlink=funding_data.get('hyperlink') , created_at=datetime.datetime.now())
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
    try:
        db.session.delete(funding)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500
