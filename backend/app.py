from flask import Flask, request
from backend.models.models import *
from backend.data_manager import DataManager
import os
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'data/movies.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

data_manager = DataManager()

"""Users handling and crud operations"""
@app.route('/users', methods=['GET'])
def user():
    users = data_manager.get_users()
    return users

@app.route('/users', methods=['POST'])
def create_user():
    user = data_manager.create_user(request.form['username'], request.form['password'], request.form['email'], request.form['role'])
    return user

@app.route('/users', methods=['PUT'])
def update_user():

@app.route('/users', methods=['DELETE'])
def delete_user():

@app.route('/project/<int:project_id>', methods=['GET'])
def projects(project_id):

@app.route('/project/<int:project_id>', methods=['POST'])
def create_project(project_id):

@app.route('/project/<int:project_id>', methods=['PUT'])
def update_project(project_id):

@app.route('/project/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):

@app.route('/content/<int:content_id>', methods=['GET'])
def content(content_id):

@app.route('/content/<int:content_id>', methods=['POST'])
def create_content(content_id):

@app.route('/content/<int:content_id>', methods=['PUT'])
def update_content(content_id):

@app.route('/content/<int:content_id>', methods=['DELETE'])
def delete_content(content_id):



