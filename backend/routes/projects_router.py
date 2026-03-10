from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Projects,Permissions, db

bp = Blueprint('projects', __name__, url_prefix='/users/<int:user_id>/projects')


@bp.route('', methods=['GET'])
@jwt_required()
def projects(user_id):
    """
    Get all projects objects
    :param user_id:
    :return:
    """
    current_user_id = int(get_jwt_identity())
    if current_user_id != user_id:
        return jsonify({"Error": "Not authorized"}), 401
    owned_projects = Projects.query.filter_by(user_id=user_id).all()
    collaborator_projects = Permissions.query.filter_by(user_id=user_id).all()
    projects_user = []
    for project in owned_projects:
        project_admin = project.to_dict()
        project_admin['role'] = 'admin'
        projects_user.append(project_admin)
    for collaborator_project in collaborator_projects:
        collab = collaborator_project.project.to_dict()
        collab['role'] = collaborator_project.role
        projects_user.append(collab)
    return jsonify(projects_user), 200


@bp.route('', methods=['POST'])
def create_project(user_id):
    """
    Create a new project object
    :param user_id:
    :return:
    """
    project_data = request.get_json()
    new_project = Projects(project_title=project_data.get('project_title'), status=project_data.get('status', 0),
                           user_id=user_id, public=project_data.get('public', 0))
    try:
        db.session.add(new_project)
        db.session.commit()
        return jsonify(new_project.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['PUT'])
def update_project(id, user_id):
    """
    Update a project object
    :param id:
    :param user_id:
    :return:
    """
    project_specific = Projects.query.filter_by(user_id=user_id, id=id).first()
    if not project_specific:
        return jsonify({"Error": "Not found"}), 404
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
    """
    Delete a project object
    :param id:
    :param user_id:
    :return:
    """
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
