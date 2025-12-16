from . import db

class Funding(db.Model):
    """
    Funding table
    """
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    deadline = db.Column(db.String(80), nullable=False)
    requirements = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {"title": self.title, "deadline": self.deadline,"requirements": self.requirements}