from flask import request, jsonify, Blueprint
from models import Funding, db
from sqlalchemy.testing.plugin.plugin_base import requirements

bp = Blueprint('funding', __name__, url_prefix='/funding')

@bp.route('/<int:project_id>', methods=['GET'])
def funding_by_id(project_id):
    funding = Funding.query.filter_by(project_id=project_id).all_or_404()
    return jsonify({funding.to_dict()})

@bp.route('/<int:project_id>', methods=['POST'])
def add_funding():
    funding_data = request.get_json()
    new_funding = Funding(project_id=funding_data.get('project_id'), funding_title=funding_data.get('funding_title'), deadline=funding_data.get('deadline'), requirements=funding_data.get(
        'requirements'))
    db.session.add(new_funding)
    db.session.commit()
    return jsonify({new_funding.to_dict()})

@bp.route('/<int:project_id>', methods=['PUT'])
def update_funding(id):
    funding = Funding.query.filter_by(id=id).all_or_404()
    data = request.get_json()
    editable_fields = ['title', 'deadline', 'requirements']
    for field in editable_fields:
        if field in data:
            setattr(funding, field, data[field])
    db.session.commit()
    return jsonify({funding.to_dict()})

@bp.route('/<int:project_id>', methods=['DELETE'])
def delete_funding(funding_id):
    funding = Funding.query.filter_by(id=id).first_or_404()
    db.session.delete(funding)
    db.session.commit()
    return '', 204


