from flask import jsonify, Blueprint
from models import db

bp = Blueprint('health', __name__)

@bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "my-backend",
    }), 200