from flask import request, jsonify, Blueprint
from models import Content, db

bp = Blueprint('content', __name__, url_prefix='/projects/<int:project_id>/content')


@bp.route('', methods=['GET'])
def content(project_id):
    """
    Get all content objects
    :param project_id:
    :return:
    """
    content_user = Content.query.filter_by(project_id=project_id).all()
    content_obj = [cont.to_dict() for cont in content_user]
    return jsonify(content_obj), 200


@bp.route('', methods=['POST'])
def create_content(project_id):
    """
    Create a new content object
    :param project_id:
    :return:
    """
    content_data = request.get_json()
    new_content = Content(project_id=project_id, section_type=content_data.get('section_type'),
                          text_box=content_data.get('text_box'),
                          permission_editing=content_data.get('permission_editing', 0),
                          permission_reading=content_data.get('permission_reading', 0))
    try:
        db.session.add(new_content)
        db.session.commit()
        return jsonify(new_content.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['PUT'])
def update_content(project_id, id):
    """
    Update a content object
    :param project_id:
    :param id:
    :return:
    """
    content = Content.query.filter_by(project_id=project_id, id=id).first()
    if not content:
        return jsonify({"Error": "Not found"}), 404
    data = request.get_json()
    editable_fields = ['section_type', 'text_box', 'permission_reading', 'permission_editing']
    for field in editable_fields:
        if field in data:
            setattr(content, field, data[field])
    try:
        db.session.commit()
        return jsonify(content.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500


@bp.route('/<int:id>', methods=['DELETE'])
def delete_content(project_id, id):
    """
    Delete a content object
    :param project_id:
    :param id:
    :return:
    """
    content = Content.query.filter_by(project_id=project_id, id=id).first()
    if not content:
        return jsonify({"Error": "Not found"}), 404
    try:
        db.session.delete(content)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": f"Database could not be reached - {str(e)}"}), 500
