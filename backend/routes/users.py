from flask import request, jsonify, Blueprint
from ..models import Users, db
bp = Blueprint('users', __name__)

@bp.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()
    if not users:
        return jsonify({})
    return users

@bp.route('/users', methods=['POST'])
def create_user(user_json):
    user_data = user_json.json()
    db.session.add(user_data)
    db.session.commit()

@bp.route('/users', methods=['PUT'])
def update_user(user_id):
    #fetch user by id
    user = Users.query.get_or_404(user_id)
    data = request.get_json()

    #set editable fields (check if username and password should be edible this way)
    editable_fields = ['email', 'password', 'role', 'project_ids']
    #update selected fields
    for field in editable_fields:
        if field not in data:
            setattr(user, field, data[field])

    db.session.commit()
    return user


@bp.route('/users', methods=['DELETE'])
def delete_user(user_id):
    db.session.delete(Users.query.get(user_id))
    db.session.commit()