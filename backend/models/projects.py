import datetime

from sqlalchemy.orm import relationship
from . import db

class Projects(db.Model):
    """
    Projects table
    """
    id = db.Column(db.Integer, primary_key=True)
    content = relationship(
        "Content",
        cascade="all, delete-orphan"
    )
    funding = relationship(
        "Funding",
        cascade="all, delete-orphan"
    )
    project_title = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

    def to_dict(self):
        return {"id": self.id,"project_title": self.project_title, "status": self.status,
                "public": self.public,"created_at": self.created_at}

