from . import db

class Projects(db.Model):
    project_id = db.Column(db.Integer, primary_key=True)
    project_title = db.Column(db.String(80), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    tags = db.Column(db.List(db.String(80)), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

