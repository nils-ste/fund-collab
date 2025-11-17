from flask import request, jsonify, Blueprint
from ..models import Users
bp = Blueprint('users', __name__)

@bp.route('/users', methods=['GET'])
def user():
    users = data_manager.get_users()
    return users

@bp.route('/users', methods=['POST'])
def create_user():
    user = data_manager.create_user(request.form['username'], request.form['password'], request.form['email'], request.form['role'])
    return user

@bp.route('/users', methods=['PUT'])
def update_user():

@bp.route('/users', methods=['DELETE'])
def delete_user():