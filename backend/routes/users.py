import datetime

from flask import request, jsonify, Blueprint
from models import Users, db

bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = Users.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200


@bp.route('', methods=['POST'])
def create_user():
    user_data = request.get_json()
    user = Users(username=user_data.get('username'), email=user_data.get('email'), password=user_data.get('password'),
                 role=user_data.get('role', 0), created_at=datetime.datetime.now())
    db.session.add(user)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201


@bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # fetch user by id
    user = Users.query.get_or_404(user_id)
    data = request.get_json()

    # set editable fields (check if username and password should be edible this way)
    editable_fields = ['email', 'password', 'role', 'project_ids']
    # update selected fields
    for field in editable_fields:
        if field in data:
            setattr(user, field, data[field])

    db.session.commit()
    return jsonify(user.to_dict()), 200


@bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = Users.query.filter_by(id=user_id).first_or_404()
    db.session.delete(user)
    db.session.commit()
    return '', 204
