import datetime
from . import db
from sqlalchemy.orm import relationship

class Users(db.Model):
    """
    Users table
    """
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

    permissions = relationship(
        argument="Permissions",
        cascade="all, delete-orphan",
        back_populates="user"
    )

    projects = relationship(argument="Projects", cascade="all, delete-orphan")
    files = relationship("Files", back_populates="user")

    def to_dict(self):
        return {"id": self.id, "email": self.email,
                "created_at": self.created_at}