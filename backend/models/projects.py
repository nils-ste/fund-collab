from . import db

class Projects(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_title = db.Column(db.String(80), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {"project_title": self.project_title, "status": self.status,
                "public": self.public,"created_at": self.created_at}

