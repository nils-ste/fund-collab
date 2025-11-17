from . import db

class Funding(db.Model):
    funding_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    requirements = db.Column(db.List(db.String(80), nullable=False))