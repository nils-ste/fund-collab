# reset_neon.py
from app import app, db

with app.app_context():
    # WARNING: this deletes ALL tables and data
    db.drop_all()
    print("✅ All tables dropped from Neon")

    db.create_all()
    print("✅ All tables recreated in Neon")