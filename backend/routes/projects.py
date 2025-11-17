from flask import request, jsonify, Blueprint
from ..models import Projects, db
bp = Blueprint('projects', __name__, url_prefix='/projects')

@bp.route('/<int:project_id>', methods=['GET'])
def projects(project_id):

    #retrieve json

@bp.route('/<int:project_id>', methods=['POST'])
def create_project(project_id):
    #request.json()

@bp.route('/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    #get id passed (query.get)

@bp.route('/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):