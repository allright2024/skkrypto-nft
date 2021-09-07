from . import db
from datetime import datetime 

class Transaction(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    _from=db.Column(db.String(200), nullable=False)
    _to=db.Column(db.String(200), nullable=False)
    _value = db.Column(db.Integer, nullable=False)
    create_date=db.Column(db.DateTime(), nullable=False)

class Transaction_Hash(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    _from=db.Column(db.String(200), nullable=False)
    _to=db.Column(db.String(200), nullable=False)
    _value = db.Column(db.Integer, nullable=False)
    create_date=db.Column(db.DateTime(), nullable=False)
    _hash=db.Column(db.String(200), nullable=False)