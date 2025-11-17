from flask import request, jsonify, Blueprint
from ..models import Projects, db
bp = Blueprint('projects', __name__, url_prefix='/projects')

@bp.route('/<int:user_id>', methods=['GET'])
def projects(user_id):
    projects_user = Projects.query.filter_by(user_id=user_id).all()
    if not projects_user:
        return jsonify({})
    return jsonify(projects_user)
    #retrieve json

@bp.route('/<int:user_id>', methods=['POST'])
def create_project(user_id):
    #request.json()

@bp.route('/<int:user_id>', methods=['PUT'])
def update_project(user_id):
    #get id passed (query.get)

@bp.route('/<int:user_id>', methods=['DELETE'])
def delete_project(user_id):