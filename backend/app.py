from flask import Flask, request
from flask_cors import CORS
from models import db
from routes import register_routes
from config import Config
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)
register_routes(app)

@app.route('/')
def get_data():
    return {"message": "Welcome to fund-collab!"}


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
