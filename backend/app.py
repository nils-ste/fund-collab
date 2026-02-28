from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from routes import register_routes
from config import Config
app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True)

db.init_app(app)
jwt = JWTManager(app)

register_routes(app)

@app.route('/')
def welcome_message():
    """
    Welcome message
    :return:
    """
    return {"message": "Welcome to fund-collab!"}


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
