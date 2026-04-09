from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import File, Users, Projects, db
from werkzeug.utils import secure_filename
from backend.supabase_client import get_supabase
import uuid


bp = Blueprint('files', __name__, url_prefix='/projects')


@bp.route('/upload', methods=['POST'])
@jwt_required()
def file_upload():
    current_user_id = int(get_jwt_identity())
    supabase = get_supabase()
    bucket = "private_uploads"

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    original_filename = secure_filename(file.filename)
    file_id = str(uuid.uuid4())
    file_path = f"{current_user_id}/{file_id}_{original_filename}"

    file_bytes = file.read()

    response = supabase.storage.from_(bucket).upload(
        path=file_path,
        file=file_bytes,
        file_options={
            "content-type": file.content_type
        }
    )

    if response.get("error"):
        return jsonify({
            "error": "Upload failed",
            "details": response["error"]
        }), 500

    new_file = File(
        user_id=current_user_id,
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


@bp.route('/<int:upload_id>', methods=['GET'])
@jwt_required()
def permissions(upload_id):
    current_user_id = int(get_jwt_identity())
    supabase = get_supabase()
    bucket = "private_uploads"

    user_file = File.query.get(upload_id)

    if not user_file:
        return jsonify({"error": "File not found"}), 404

    if user_file.user_id != current_user_id:
        return jsonify({"error": "Not authorized"}), 401

    signed = supabase.storage.from_(bucket).create_signed_url(
        user_file.file_path,
        expires_in=60
    )

    if signed.get("error"):
        return jsonify({
            "error": "Could not generate access URL",
            "details": signed["error"]
        }), 500

    return jsonify({
        "id": user_file.id,
        "file_name": user_file.file_name,
        "url": signed["signedURL"]
    }), 200