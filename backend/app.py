from flask import Flask, request
from models import db
from routes import register_routes
from config import Config
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
register_routes(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)



