from flask import Flask, render_template, request, redirect, url_for
from models import *
from data_manager import DataManager
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

