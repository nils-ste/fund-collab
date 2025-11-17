from flask import request, jsonify, Blueprint
from ..models import Content
bp = Blueprint('content', __name__, url_prefix='/content')

@app.route('/<int:content_id>', methods=['GET'])
def content(content_id):

@app.route('/<int:content_id>', methods=['POST'])
def create_content(content_id):

@app.route('/<int:content_id>', methods=['PUT'])
def update_content(content_id):

@app.route('/<int:content_id>', methods=['DELETE'])
def delete_content(content_id):