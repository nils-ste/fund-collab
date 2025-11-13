from flask import Flask, render_template, request, redirect, url_for
import os
app = Flask(__name__)
@app.route('/')
def index():
