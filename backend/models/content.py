from . import db

class Content(db.Model):
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), nullable=False)
    section_type = db.Column(db.Integer, nullable=False)
    text_box = db.Column(db.String(80), nullable=False)
    permission_editing = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    permission_reading = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)