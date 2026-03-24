from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Permissions, Users, Projects, db

bp = Blueprint('permissions', __name__, url_prefix='/projects')

@bp.route('/<int:project_id>/permissions', methods=['GET'])
@jwt_required()
def permissions(project_id):
    current_user_id = int(get_jwt_identity())
    project = Projects.query.get(project_id)
    permissions_project = []
    if not project:
        return jsonify({"Error": "Project not found"}), 404
    if current_user_id != project.user_id:
        return jsonify({"Error": "Permission denied"}), 403
    permissions_data = Permissions.query.filter_by(project_id=project_id).all()
    for permission in permissions_data:
        permission_project = permission.to_dict()
        permission_project['email'] = permission.user.email
        permissions_project.append(permission_project)
    return jsonify(permissions_project), 200


@bp.route('/<int:project_id>/permissions', methods=['POST'])
@jwt_required()
def add_permission(project_id):
    current_user_id = int(get_jwt_identity())
    project = Projects.query.get(project_id)
    if current_user_id != project.user_id:
        return jsonify({"Error": "Permission denied"}), 403
    permissions_data = request.get_json()
    email = permissions_data.get("email")
    if not email:
        return jsonify({"Error": "Email is required"}), 403
    role = permissions_data.get("role", "viewer")
    if role != "viewer" and role != "editor":
        return jsonify({"Error": "Role can only be viewer or editor"}), 403
    user_exists = Users.query.filter_by(email=email).first()
    if not user_exists:
        return jsonify({"Error": "User does not exist"}), 403
    if user_exists.id == project.user_id:
        return jsonify({"Error": "Cannot add admin as collaborator"}), 403
    new_permission = Permissions(role=role, user_id=user_exists.id, project_id=project_id)
    try:
        db.session.add(new_permission)
        db.session.commit()
        new_permission['email'] = email
        return jsonify(new_permission.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

@bp.route('/<int:project_id>/permissions/<int:permission_id>', methods=['PUT'])
@jwt_required()
def update_permission(project_id, permission_id):
    current_user_id = int(get_jwt_identity())

    project = Projects.query.get(project_id)
    if not project:
        return jsonify({"Error": "Project not found"}), 404

    if current_user_id != project.user_id:
        return jsonify({"Error": "Permission denied"}), 403

    permission = Permissions.query.get(permission_id)
    if not permission or permission.project_id != project_id:
        return jsonify({"Error": "Permission not found"}), 404

    data = request.get_json()
    role = data.get("role")

    if not role:
        return jsonify({"Error": "Role is required"}), 400

    if role not in ["viewer", "editor"]:
        return jsonify({"Error": "Role can only be viewer or editor"}), 400

    try:
        permission.role = role
        db.session.commit()
        return jsonify(permission.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

@bp.route('/<int:project_id>/permissions/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_permission(project_id, id):
    current_user_id = int(get_jwt_identity())

    project = Projects.query.get(project_id)
    if not project:
        return jsonify({"Error": "Project not found"}), 404

    permissions_data = Permissions.query.get(id)
    if not permissions_data:
        return jsonify({"Error": "Permission not found"}), 404

    if permissions_data.project_id != project_id:
        return jsonify({"Error": "Permission does not belong to this project"}), 400

    is_owner = current_user_id == project.user_id
    is_self = current_user_id == permissions_data.user_id

    if not (is_owner or is_self):
        return jsonify({"Error": "Permission denied"}), 403

    if is_self and is_owner:
        return jsonify({"Error": "Owner cannot remove themselves"}), 400

    try:
        db.session.delete(permissions_data)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
