from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    def __init__(self, username, password):
        self.username = username
        self.password = password
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(80), nullable=False)
    project_ids = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

class Projects(db.Model):
    project_id = db.Column(db.Integer, primary_key=True)
    project_title = db.Column(db.String(80), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User)
    public = db.Column(db.Boolean, nullable=False)
    tags = db.Column(db.List(db.String(80)), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

class Content(db.Model):
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), nullable=False)
    section_type = db.Column(db.Integer, nullable=False)
    text_box = db.Column(db.String(80), nullable=False)
    permission_editing = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    permission_reading = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

class Funding(db.Model):
    funding_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    requirements = db.Column(db.List(db.String(80), nullable=False))



