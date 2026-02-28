import datetime
from . import db

class Users(db.Model):
    """
    Users table
    """
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

    def to_dict(self):
        return {"id": self.id, "email": self.email,
                "created_at": self.created_at}