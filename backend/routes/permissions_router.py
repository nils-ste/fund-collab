from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Permissions, Users, Projects, db

bp = Blueprint('permissions', __name__, url_prefix='/projects')

@bp.route('/<int:project_id>/permissions', methods=['GET'])
@jwt_required()
def permissions(project_id):
    current_user_id = int(get_jwt_identity())
    project = Projects.query.get(project_id)
    if current_user_id != project.user_id:
        return jsonify({"Error": "Permission denied"}), 403
    permissions_data = Permissions.query.filter_by(project_id=project_id).all()
    return jsonify([p.to_dict() for p in permissions_data]), 200


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
        return jsonify(new_permission.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500



@bp.route('/<int:project_id>/permissions/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_permission(project_id):
    """check owner first
    later on add editor and viewer"""
    current_user_id = int(get_jwt_identity())
    project = Projects.query.get(project_id)
    permissions_data = Permissions.query.filter_by(user_id=current_user_id).first()
    if current_user_id != project.user_id or current_user_id != permissions_data.user_id:
        return jsonify({"Error": "Permission denied"}), 403
    try:
        db.session.delete(permissions_data)
        db.session.commit()
        return '', 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

