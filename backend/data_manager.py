from backend.models.models import db, Users


class DataManager():
    def get_users(self):
        return Users.query.all()
    def create_user(self, username, password, email, role):
        new_user = Users(username=username, password=password, email=email, role=role)
        db.session.add(new_user)
        db.session.commit()
