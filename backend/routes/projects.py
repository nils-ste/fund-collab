from flask import request, jsonify, Blueprint
from models import Projects, db
bp = Blueprint('projects', __name__, url_prefix='/projects')

@bp.route('/', methods=['GET'])
def projects(user_id):
    projects_user = Projects.query.filter_by(user_id=user_id).all()
    if not projects_user:
        return jsonify({})
    return jsonify(projects_user.to_dict())

@bp.route('/', methods=['POST'])
def create_project():
    new_project = request.get_json()
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict())

@bp.route('/<int:id>', methods=['PUT'])
def update_project(id):
    project_specific = Projects.query.filter_by(id=id).all()
    if not project_specific:
        return jsonify({})
    data = request.get_json
    editable_fields = ['project_title', 'status', 'public', 'tags'] #potentially user_ids depending on permissions?
    for field in editable_fields:
        if field in data:
            setattr(project_specific, field, data[field])
    db.session.commit()
    return jsonify(project_specific.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
def delete_project(id):
    project_specific = Projects.query.filter_by(id=id).first_or_404()
    db.session.delete(project_specific)
    db.session.commit()
    return '', 204

