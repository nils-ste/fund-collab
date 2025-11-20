from flask import request, jsonify, Blueprint
from models import Funding, db
bp = Blueprint('funding', __name__, url_prefix='/funding')

@bp.route('/<int:project_id>', methods=['GET'])
def funding_by_id(project_id):
    funding = Funding.query.filter_by(project_id=project_id).all_or_404()
    return jsonify({funding.to_dict()})

@bp.route('/<int:project_id>', methods=['POST'])
def add_funding():
    funding = request.get_json()
    db.session.add(funding)
    db.session.commit()
    return jsonify({funding.to_dict()})

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


