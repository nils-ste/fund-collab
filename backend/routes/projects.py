from flask import request, jsonify, Blueprint
from ..models import Projects, db
bp = Blueprint('projects', __name__, url_prefix='/projects')

@bp.route('/<int:user_id>', methods=['GET'])
def projects(user_id):
    projects_user = Projects.query.filter_by(user_id=user_id).all()
    if not projects_user:
        return jsonify({})
    return jsonify(projects_user.to_dict())

@bp.route('/<int:user_id>', methods=['POST'])
def create_project(user_id):
    projects_user = Projects.query.filter_by(user_id=user_id).all()
    if not projects_user:
        return jsonify({})
    new_project = request.get_json()
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict())

@bp.route('/<int:user_id>', methods=['PUT'])
def update_project(project_id):
    project_specific = Projects.query.filter_by(project_id=project_id).all()
    if not project_specific:
        return jsonify({})
    data = request.get_json
    db.session.add(data)
    db.session.commit()
    return jsonify(data)

@bp.route('/<int:user_id>', methods=['DELETE'])
def delete_project(project_id):
    project_specific = Projects.query.filter_by(project_id=project_id).all()
    if not project_specific:
        return jsonify({})
    db.session.delete(project_specific)
    db.session.commit()
    return jsonify({})

