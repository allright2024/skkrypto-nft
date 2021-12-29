from enum import unique
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Transaction(db.Model):
    """table name : transaction
    table information
    -id : index int, primary key (auto increment)
    -_from : varchar(32) not null
    -_to : varchar(32) not null
    -_point : int not null
    -_type : varchar(1) not null
    -_date : varchar(32)
    """

    __tablename__='transaction'

    id = db.Column(db.Integer, primary_key = True, nullable = False, autoincrement=True) 
    _from = db.Column(db.String(64,'utf8mb4_unicode_ci'), nullable = False)
    _to = db.Column(db.String(64, 'utf8mb4_unicode_ci'), nullable = False)
    _point = db.Column(db.Integer, nullable = False)
    _type = db.Column(db.String(1, 'utf8mb4_unicode_ci'), nullable=False)
    _date = db.Column(db.String(32, 'utf8mb4_unicode_ci'))
    _hash = db.Column(db.String(64, 'utf8mb4_unicode_ci'))

    def __init__(self, _from, _to,_point, _type, _date, _hash):
        self._from = _from
        self._to=_to 
        self._point=_point 
        self._type=_type
        self._date=_date 
        self._hash = _hash


class User(db.Model):
    """
    tablename : user
    table information
    -id
    -_username
    -_pointA : A에서 쓰이는 포인트 (ex : A: 명륜당)
    -_pointB : B에서 쓰이는 포인트
    -_pointC : C에서 쓰이는 포인트
    -_pointD : D에서 쓰이는 포인트
    """

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key = True, nullable = False, autoincrement=True) 
    _username = db.Column(db.String(64, 'utf8mb4_unicode_ci'),nullable = False, unique=True)
    _pointA = db.Column(db.Integer, nullable=False)
    _pointB = db.Column(db.Integer, nullable=False)
    _pointC = db.Column(db.Integer, nullable=False)
    _pointD = db.Column(db.Integer, nullable=False)

    def __init__(self, _username, _pointA, _pointB, _pointC, _pointD):
        self._username = _username
        self._pointA= _pointA
        self._pointB= _pointB
        self._pointC=_pointC
        self._pointD=_pointD

class UserInfo(db.Model):
    """
    table name : new
    table information 
    _userid
    _userpw
    _useremail
    """
    __tablename__ = 'userinfo'

    id = db.Column(db.Integer, primary_key = True, nullable = False, autoincrement=True) 
    _userid = db.Column(db.String(64, 'utf8mb4_unicode_ci'), nullable = False, unique=True)
    _userpw = db.Column(db.String(32, 'utf8mb4_unicode_ci'), nullable=False)
    _useremail=db.Column(db.String(32,'utf8mb4_unicode_ci'), nullable=False)

    def __init__(self, _userid, _userpw, _useremail):
        self._userid = _userid
        self._userpw=_userpw
        self._useremail = _useremail
