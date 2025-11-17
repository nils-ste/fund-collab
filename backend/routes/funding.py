from flask import request, jsonify, Blueprint
from ..models import Funding
bp = Blueprint('funding', __name__, url_prefix='/funding')

@bp.route('/<int:project_id>', methods=['GET'])
def projects_by_id(project_id):
    @bp.route('/<int:project_id>', methods=['GET'])