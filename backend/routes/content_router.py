import datetime

from flask import request, jsonify, Blueprint
from models import Content, db

bp = Blueprint('content', __name__, url_prefix='/content')


@bp.route('/<int:project_id>', methods=['GET'])
def content(id):
    content = Content.query.filter_by(id=id).all_or_404()
    return jsonify({content.to_dict()})


@bp.route('/<int:project_id>', methods=['POST'])
def create_content():
    content_data = request.get_json()
    new_content = Content(project_id=content_data.get('project_id'), section_type=content_data.get('section_type', 0),
                          text_box = content_data.get('text_box'), permission_editing = content_data.get('permission_editing', 0), permission_reading = content_data.get('permission_reading', 0), created_at = datetime.datetime.now())
    db.session.add(new_content)
    db.session.commit()
    return jsonify({new_content.to_dict()})


@bp.route('/<int:project_id>', methods=['PUT'])
def update_content(id):
    content = Content.query.filter_by(id=id).all_or_404()
    data = request.get_json()
    editable_fields = ['section_type', 'text_box', 'permission_reading', 'permission_editing']
    for field in editable_fields:
        if field in data:
            setattr(content, field, data[field])
    db.session.commit()
    return jsonify({content.to_dict()})


@bp.route('/<int:project_id>', methods=['DELETE'])
def delete_content(project_id):
    content = Content.query.filter_by(id=id).first_or_404()
    db.session.delete(content)
    db.session.commit()
    return '', 204
