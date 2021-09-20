from flask import Flask, render_template, Response, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from email_validator import validate_email, EmailNotValidError

from pybo.model.user_model import Transaction, User, New

from datetime import datetime 
import json


app = Flask(__name__)
CORS(app)

db={
    'user' : 'root',
    'password' : '1234',
    'host' : 'localhost',
    'port' : '3306',
    'database':'skkrypto'
}

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://'+db['user']+':'+db['password']+'@'+db['host']+':'+db['port']+'/'+db['database']
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)

def merge_dic(x,y):
    z=x
    z.update(y)
    return z

@app.route('/api/idverification/', methods=['POST', 'OPTIONS'])
def verify():
    response = Response()
    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method=="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1=request.get_data()
        data=json.loads(data1)
        id = data['id']

        try:
            new = New.query.filter(New._userid==id)
            dictionary={"a" : new[0]._userid}
        except IndexError as e:
            dictionary={"a": str(e)}

        response.set_data(json.dumps(dictionary, ensure_ascii=False))

    return response 

@app.route('/api/emailValidator/', methods=['POST', 'OPTIONS'])
def emailValidator():
    response = Response()
    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data = json.loads(data1)

        sent_email=data['email']

        try:
            valid = validate_email(sent_email)
            email1=valid.email(sent_email)
            try:
                u=New.query.filter(New._useremail==email1)
                dictionary = {"a":u[0]._useremail}
                a=3
            except:
                a=1
        except EmailNotValidError as e:
            a=2

        response.set_data(json.dumps({'isValid' : a}, ensure_ascii=False))
    return response


@app.route('/api/createUser/', methods = ['POST', 'OPTIONS'])
def createUser():
    response = Response()
    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data=json.loads(data1)

        id = data['id']
        password = data['pw']
        email = data['email']

        newUser = New(_userid=id, _userpw=password, _useremail=email)
        db.session.add(newUser)
        db.session.commit()

        response.set_data(json.dumps('True', ensure_ascii=False))
    
    return response

@app.route('/api/createTx/', methods=['POST', 'OPTIONS'])
def CreateTx():
    response = Response()
    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data=json.loads(data1)

        data_from = data['from']
        data_to = data['to']
        data_value = data['value']
        data_type= data['type']

        tx = Transaction(_from=data_from, _to=data_to, _point=data_value, _type = data_type, _date=str(datetime.now()).split('.')[0])
        db.session.add(tx)
        db.session.commit()

        response.set_data(json.dumps('True', ensure_ascii=False))
    return response


@app.route('/api/detail/txId/', methods = ['POST', 'OPTIONS'])
def detail():
    response = Response()

    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data=json.loads(data1)
        cur_state=data["who"]
        address= data['address']

        justDict={}
        if cur_state=="to":
            txs = Transaction.query.filter(Transaction._to==address)
        elif cur_state=="from":
            txs = Transaction.query.filter(Transaction._from==address)
        i=1
        for tx in txs:
            dictionary={'from': tx._from, 'to' : tx._to, 'value' : tx._point, 'type':tx._type, 'create_date':tx._date}
            newDict = {str(i):dictionary}
            i+=1
            justDict=merge_dic(justDict,newDict)

        response.set_data(json.dumps(justDict))
    return response

@app.route('/api/viewAll/', methods = ["POST", "OPTIONS"])
def viewAll():
    result = Response()

    if request.method=='OPTIONS':
        result.headers.add("Access-Control-Allow-Origin", "*")
        result.headers.add("Access-Control-Aloow-Headers", "*")
        result.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        result.headers.add("Access-Control-Allow-Origin", "*")

        allTxs=Transaction.query.all()
        justDict={}
        i=1
        for tx in allTxs:
            dictionary={'from':tx._from, 'to':tx._to, 'value': tx._point, 'type':tx._type, 'create_date':tx._date}
            newDict = {str(i):dictionary}
            i+=1
            justDict=merge_dic(justDict,newDict)

        result.set_data(json.dumps(justDict))

    return result
