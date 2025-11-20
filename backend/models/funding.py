from . import db

class Funding(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    funding_title = db.Column(db.String(80), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    requirements = db.Column(db.String, nullable=False)

def to_dict(self):
    return {"funding_title": self.funding_title, "deadline": self.deadline,"requirements": self.requirements}