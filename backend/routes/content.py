from flask import request, jsonify, Blueprint
from ..models import Content
bp = Blueprint('content', __name__, url_prefix='/content')

@app.route('/<int:project_id>', methods=['GET'])
def content(project_id):

@app.route('/<int:project_id>', methods=['POST'])
def create_content(project_id):

@app.route('/<int:project_id>', methods=['PUT'])
def update_content(project_id):

@app.route('/<int:project_id>', methods=['DELETE'])
def delete_content(project_id):