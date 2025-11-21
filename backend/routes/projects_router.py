import datetime

from flask import request, jsonify, Blueprint
from models import Projects, db

bp = Blueprint('projects', __name__, url_prefix='/projects')


@bp.route('/<int:user_id>', methods=['GET'])
def projects(user_id):
    projects_user = Projects.query.filter_by(user_id=user_id).all()
    if not projects_user:
        return jsonify({})
    projects = {}
    for project in projects_user:
        projects[project.id]= project.to_dict()
    return jsonify(projects)


@bp.route('/<int:user_id>', methods=['POST'])
def create_project(user_id):
    project_data = request.get_json()
    new_project = Projects(project_title=project_data.get('project_title'), status=project_data.get('status', 0),
                           user_id=user_id, public=project_data.get('public', 0),
                           created_at=datetime.datetime.now())
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict())


@bp.route('/<int:id>', methods=['PUT'])
def update_project(id):
    project_specific = Projects.query.filter_by(id=id).all()
    if not project_specific:
        return jsonify({})
    data = request.get_json()
    editable_fields = ['project_title', 'status', 'public']  # potentially user_ids depending on permissions?
    for field in editable_fields:
        if field in data:
            setattr(project_specific, field, data[field])
    db.session.commit()
    return jsonify(project_specific.to_dict())


@bp.route('/<int:id>', methods=['DELETE'])
def delete_project(id):
    project_specific = Projects.query.filter_by(id=id).first()
    db.session.delete(project_specific)
    db.session.commit()
    return '', 204
