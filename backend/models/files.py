import datetime
from sqlalchemy.orm import relationship
from . import db

class Files(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    file_path =db.Column(db.String(255))
    file_name = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)

    user = relationship(
        argument="Users",
        back_populates="files"
    )

    project = relationship(
        argument="Projects",
        back_populates="files"
    )