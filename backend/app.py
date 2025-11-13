from flask import Flask, render_template, request, redirect, url_for
from models import db, User, Projects, Content, Funding
import os
app = Flask(__name__)
@app.route('/')
def index():
    pass