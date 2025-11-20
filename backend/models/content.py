from . import db

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    section_type = db.Column(db.Integer, nullable=False)
    text_box = db.Column(db.String(80), nullable=False)
    permission_editing = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    permission_reading = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {"section_type": self.section_type, "text_box": self.text_box,}