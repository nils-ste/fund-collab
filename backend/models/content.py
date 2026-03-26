import datetime

from . import db

class Content(db.Model):
    """
    Content table
    """
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    section_type = db.Column(db.String(80), nullable=False)
    text_box = db.Column(db.Text, nullable=True)
    order = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

    def to_dict(self):
        return {"id": self.id, "section_type": self.section_type, "text_box": self.text_box, "project_id": self.project_id, "order": self.order, "category": self.category}