from app import *


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Text)

def __init__(self, data):
    self.data = data
