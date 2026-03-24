import datetime
from sqlalchemy.orm import relationship
from . import db

class Permissions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    role =db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)

    user = relationship(
        argument="Users",
        back_populates="permissions"
    )

    project = relationship(
        argument="Projects",
        back_populates="permissions"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'role': self.role,
            'email':self.user.email if self.user else None,
        }