import uuid
import traceback

from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import File, Users, Projects, Permissions, db
from werkzeug.utils import secure_filename

from backend.supabase_client import get_supabase

bp = Blueprint('files', __name__, url_prefix='/projects')


@bp.route('/<int:project_id>/files/upload', methods=['POST'])
@jwt_required()
def file_upload(project_id):
    current_user_id = int(get_jwt_identity())
    project_user = Projects.query.filter_by(id=project_id).first()

    if not project_user:
        return jsonify({"Error": "Project not found"}), 404

    user_id = project_user.user_id
    permission = Permissions.query.filter_by(project_id=project_id, user_id=current_user_id).first()

    is_owner = (current_user_id == user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"Error": "Not authorized"}), 401

    supabase = get_supabase()
    bucket = "project-files"

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    original_filename = secure_filename(file.filename)
    file_id = str(uuid.uuid4())
    file_path = f"{current_user_id}/{file_id}_{original_filename}"

    try:
        file_bytes = file.read()

        supabase.storage.from_(bucket).upload(
            path=file_path,
            file=file_bytes,
            file_options={
                "content-type": file.content_type or "application/octet-stream",
                "upsert": "true"
            }
        )

    except Exception as e:
        resp_text = ""
        if hasattr(e, "response"):
            resp_text = e.response.text
        print(f"Supabase upload error: {e} | Response body: {resp_text}")
        return jsonify({
            "error": "Upload failed",
            "details": str(e),
            "supabase_response": resp_text
        }), 500

    new_file = File(
        user_id=current_user_id,
        project_id=project_id,
        file_path=file_path,
        file_name=original_filename
    )

    db.session.add(new_file)
    db.session.commit()

    return jsonify({
        "message": "File uploaded successfully",
        "file": {
            "id": new_file.id,
            "file_name": new_file.file_name,
            "file_path": new_file.file_path
        }
    }), 201


@bp.route('/<int:project_id>/files', methods=['GET'])
@jwt_required()
def get_project_files(project_id):
    current_user_id = int(get_jwt_identity())

    project = Projects.query.get(project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == project.user_id)
    has_access = permission is not None

    if not is_owner and not has_access:
        return jsonify({"error": "Not authorized"}), 401

    files = File.query.filter_by(project_id=project_id).all()

    result = []
    for file in files:
        result.append({
            "id": file.id,
            "file_name": file.file_name,
            "uploaded_by": file.user_id,
            "created_at": file.created_at.isoformat() if file.created_at else None
        })

    return jsonify(result), 200


@bp.route('/<int:project_id>/files/<int:upload_id>', methods=['GET'])
@jwt_required()
def get_file(project_id, upload_id):
    current_user_id = int(get_jwt_identity())
    supabase = get_supabase()
    bucket = "project-files"

    user_file = File.query.get(upload_id)

    if not user_file:
        return jsonify({"error": "File not found"}), 404

    project = Projects.query.get(project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == project.user_id)
    has_access = permission is not None

    if not is_owner and not has_access:
        return jsonify({"error": "Not authorized"}), 401

    try:
        signed = supabase.storage.from_(bucket).create_signed_url(
            user_file.file_path,
            expires_in=60
        )

        if isinstance(signed, dict) and signed.get("error"):
            return jsonify({
                "error": "Could not generate access URL",
                "details": signed["error"]
            }), 500

        return jsonify({
            "id": user_file.id,
            "file_name": user_file.file_name,
            "url": signed.get("signedURL")
        }), 200

    except Exception as e:
        return jsonify({
            "error": "Could not generate access URL",
            "details": str(e)
        }), 500


@bp.route('/<int:project_id>/files/<int:file_id>', methods=['DELETE'])
@jwt_required()
def delete_file(project_id, file_id):
    current_user_id = int(get_jwt_identity())
    supabase = get_supabase()
    bucket = "project-files"

    project = Projects.query.get(project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    permission = Permissions.query.filter_by(
        project_id=project_id,
        user_id=current_user_id
    ).first()

    is_owner = (current_user_id == project.user_id)
    is_editor = permission and permission.role == "editor"

    if not is_owner and not is_editor:
        return jsonify({"error": "Not authorized"}), 401

    file = File.query.filter_by(
        id=file_id,
        project_id=project_id
    ).first()

    if not file:
        return jsonify({"error": "File not found"}), 404

    try:
        supabase.storage.from_(bucket).remove([file.file_path])
    except Exception as e:
        return jsonify({
            "error": "Failed to delete file from storage",
            "details": str(e)
        }), 500

    try:
        db.session.delete(file)
        db.session.commit()
    except Exception as e:
        return jsonify({
            "error": "Failed to delete file from database",
            "details": str(e)
        }), 500

    return jsonify({
        "message": "File deleted successfully"
    }), 200