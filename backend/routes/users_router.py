import datetime

from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Users, db

bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    """
    Get user by id
    :param user_id:
    :return:
    """
    current_user_id = get_jwt_identity()

    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    user = Users.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200



@bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """
    Update user
    :param user_id:
    :return:
    """
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    user = Users.query.get_or_404(user_id)
    data = request.get_json()

    # set editable fields (check if username and password should be edible this way)
    editable_fields = ['username','email']
    # update selected fields
    for field in editable_fields:
        if field in data:
            setattr(user, field, data[field])
    try:
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """
    Delete user
    :param user_id:
    :return:
    """
    current_user_id = get_jwt_identity()

    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    user = Users.query.get_or_404(user_id)
    try:
        db.session.delete(user)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500
