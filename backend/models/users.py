from . import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(80), nullable=False)
    project_ids = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {"id": self.id,"username": self.username,"email": self.email,
                "role": self.role,"project_ids": self.project_ids,
                "created_at": self.created_at}