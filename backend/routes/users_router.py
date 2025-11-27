import datetime

from flask import request, jsonify, Blueprint
from models import Users, db

bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/<int:user_id>', methods=['GET'])
def get_users(user_id):
    user = Users.query.filter_by(id=user_id).first()
    print(user)
    return jsonify(user.to_dict()), 200


@bp.route('/', methods=['POST'])
def create_user():
    user_data = request.get_json()
    user = Users(username=user_data.get('username'), email=user_data.get('email'), password=user_data.get('password'),
                 role=user_data.get('role', 0), created_at=datetime.datetime.now())
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # fetch user by id
    user = Users.query.get_or_404(user_id)
    data = request.get_json()

    # set editable fields (check if username and password should be edible this way)
    editable_fields = ['username','email', 'password', 'role']
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
def delete_user(user_id):
    user = Users.query.filter_by(id=user_id).first_or_404()
    try:
        db.session.delete(user)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500
