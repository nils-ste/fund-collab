import datetime

from flask import request, jsonify, Blueprint
from models import Projects, db

bp = Blueprint('projects', __name__, url_prefix='/users/<int:user_id>/projects')


@bp.route('', methods=['GET'])
def projects(user_id):
    projects_user = Projects.query.filter_by(user_id=user_id).all()
    if not projects_user:
        return jsonify({"Error": "Project not found"}), 404
    projects = [project.to_dict() for project in projects_user]
    return jsonify(projects), 200


@bp.route('', methods=['POST'])
def create_project(user_id):
    project_data = request.get_json()
    new_project = Projects(project_title=project_data.get('project_title'), status=project_data.get('status', 0),
                           user_id=user_id, public=project_data.get('public', 0),
                           created_at=datetime.datetime.now())
    try:
        db.session.add(new_project)
        db.session.commit()
        return jsonify(new_project.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['PUT'])
def update_project(id, user_id):
    project_specific = Projects.query.filter_by(user_id=user_id,id=id).first()
    if not project_specific:
        return jsonify({})
    data = request.get_json()
    editable_fields = ['project_title', 'status', 'public']  # potentially user_ids depending on permissions?
    for field in editable_fields:
        if field in data:
            setattr(project_specific, field, data[field])
    try:
        db.session.commit()
        return jsonify(project_specific.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['DELETE'])
def delete_project(id, user_id):
    project_specific = Projects.query.filter_by(user_id=user_id, id=id).first()
    if not project_specific:
        return jsonify({"Error": "Project not found"}), 404
    try:
        db.session.delete(project_specific)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500
