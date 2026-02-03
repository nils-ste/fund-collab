from . import db

class Funding(db.Model):
    """
    Funding table
    """
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    deadline = db.Column(db.Date, nullable=False)
    hyperlink = db.Column(db.String(120), nullable=True)
    requirements = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {"id":self.id, "title": self.title, "deadline": self.deadline.isoformat(),"hyperlink": self.hyperlink ,"requirements": self.requirements}