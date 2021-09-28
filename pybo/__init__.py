from flask import Flask, render_template, Response, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from email_validator import validate_email, EmailNotValidError
from sqlalchemy import and_
from pybo.model.user_model import Transaction, User, UserInfo
from datetime import datetime

import json

app = Flask(__name__)
CORS(app)

db = {
    'user': 'root',
    'password': '1234',
    'host': 'localhost',
    'port': '3306',
    'database': 'skkrypto'
}

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + db['user'] + ':' + db['password'] + '@' + db['host'] + ':' + db['port'] + '/' + db['database']
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)

# temp_user = User(_username = "Elliot", _pointA = 10000, _pointB = 10000, _pointC = 10000, _pointD = 10000)
# db.session.add(temp_user)
# db.session.commit()
def merge_dic(x, y):
    z = x
    z.update(y)
    return z

@app.route('/api/idverification/', methods=['POST', 'OPTIONS'])
def verify():
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method == "POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data = json.loads(data1)
        id = data['id']
        new = UserInfo.query.filter(UserInfo._userid == id).first()

        print(str(type(new)) == "<class 'NoneType'>")

        if str(type(new)) == "<class 'NoneType'>":
            dictionary = {"a": "list index out of range"}
        else:
            dictionary = {"a": "hi"}

        # try:
        #     dictionary={"a" : new._userid}
        # except IndexError as e:
        #     dictionary={"a": str(e)}

        response.set_data(json.dumps(dictionary, ensure_ascii=False))

    return response


@app.route('/api/emailValidator/', methods=['POST', 'OPTIONS'])
def emailValidator():
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method == "POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data = json.loads(data1)

        sent_email = data['email']

        try:
            valid = validate_email(sent_email)
            email1 = valid.email
            try:
                u = UserInfo.query.filter(UserInfo._useremail == email1)
                dictionary = {"a": u[0]._useremail}
                a = 3
            except:
                a = 1
        except EmailNotValidError as e:
            a = 2

        response.set_data(json.dumps({'isValid': a}, ensure_ascii=False))
    return response


@app.route('/api/createUser/', methods=['POST', 'OPTIONS'])
def createUser():
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method == "POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data = json.loads(data1)

        id = data['id']
        password = data['password']
        email = data['email']

        newUser = UserInfo(_userid=id, _userpw=password, _useremail=email)
        db.session.add(newUser)
        db.session.commit()

        response.set_data(json.dumps('True', ensure_ascii=False))

    return response



@app.route('/api/detail/txId/', methods=['POST', 'OPTIONS'])
def detail():
    response = Response()

    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method == "POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data = json.loads(data1)
        cur_state = data["who"]
        cur_type = data["type"]
        address = data['address']

        justDict = {}
        if cur_state == "to":
            txs = Transaction.query.filter(and_(Transaction._to == address, Transaction._type == cur_type))
        elif cur_state == "from":
            txs = Transaction.query.filter(and_(Transaction._from == address, Transaction._type == cur_type))

        i = 1
        for tx in txs:
            dictionary = {'from': tx._from, 'to': tx._to, 'value': tx._point, 'type': tx._type, 'create_date': tx._date}
            newDict = {str(i): dictionary}
            i += 1
            justDict = merge_dic(justDict, newDict)

        response.set_data(json.dumps(justDict))
    return response



@app.route('/api/createTx/', methods=['POST', 'OPTIONS'])
def CreateTx():
    response = Response()

    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method == "POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1 = request.get_data()
        data = json.loads(data1)
        # from
        from_hash = data['from']
        # to
        to_hash = data['to']

        # A,B,C,D
        location = data['type']
        # amount u wanna exchange
        cur_value = data['value']
        justDict = {}
        exist_from = User.query.filter_by(_username = from_hash).first()
        exist_to = User.query.filter_by(_username = to_hash).first()

        if exist_from != None and exist_to != None:
            i = 1
            if location == 'A':
                if int(cur_value) <= exist_from._pointA:
                    from_user = db.session.query(User).filter(User._username == from_hash).update({'_pointA': User._pointA - int(cur_value)})
                    to_user = db.session.query(User).filter(User._username == to_hash).update({'_pointA': User._pointA + int(cur_value)})
                    db.session.commit()
                    dictionary = {'from_user': exist_from._username ,'from_Value': exist_from._pointA - int(cur_value), 'to_user': exist_to._username,'to_Value': exist_to._pointA + int(cur_value)}
            elif location == 'B':
                if int(cur_value) <= exist_from._pointB:
                    from_user = db.session.query(User).filter(User._username == from_hash).update({'_pointB': User._pointB - int(cur_value)})
                    to_user = db.session.query(User).filter(User._username == to_hash).update({'_pointB': User._pointB + int(cur_value)})
                    db.session.commit()
                    dictionary = {'from_user': exist_from._username, 'from_Value': exist_from._pointB - int(cur_value),'to_user': exist_to._username, 'to_Value': exist_to._pointB + int(cur_value)}
            elif location == 'C':
                if int(cur_value) <= exist_from._pointC:
                    from_user = db.session.query(User).filter(User._username == from_hash).update({'_pointA': User._pointC - int(cur_value)})
                    to_user = db.session.query(User).filter(User._username == to_hash).update({'_pointA': User._pointC + int(cur_value)})
                    db.session.commit()
                    dictionary = {'from_user': exist_from._username, 'from_Value': exist_from._pointC - int(cur_value),'to_user': exist_to._username, 'to_Value': exist_to._pointC + int(cur_value)}
            elif location == 'D':
                if int(cur_value) <= exist_from._pointD:
                    from_user = db.session.query(User).filter(User._username == from_hash).update({'_pointA': User._pointD - int(cur_value)})
                    to_user = db.session.query(User).filter(User._username == to_hash).update({'_pointA': User._pointD + int(cur_value)})
                    db.session.commit()
                    dictionary = {'from_user': exist_from._username, 'from_Value': exist_from._pointD - int(cur_value),'to_user': exist_to._username, 'to_Value': exist_to._pointD + int(cur_value)}

            # dictionary = {'id': user_info.id, 'user': user_info._username, 'A_Value': user_info._pointA,'B_Value': user_info._pointB, 'C_Value': user_info._pointC,'D_Value': user_info._pointD}
            newDict = {str(i): dictionary}
            i += 1
            justDict = merge_dic(justDict, newDict)
        response.set_data(json.dumps(justDict))
    return response


@app.route('/api/viewAll/', methods=["POST", "OPTIONS"])
def viewAll():
    result = Response()

    if request.method == 'OPTIONS':
        result.headers.add("Access-Control-Allow-Origin", "*")
        result.headers.add("Access-Control-Aloow-Headers", "*")
        result.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method == "POST":
        result.headers.add("Access-Control-Allow-Origin", "*")

        allTxs = Transaction.query.all()
        justDict = {}
        i = 1
        for tx in allTxs:
            dictionary = {'from': tx._from, 'to': tx._to, 'value': tx._point, 'type': tx._type, 'create_date': tx._date}
            newDict = {str(i): dictionary}
            i += 1
            justDict = merge_dic(justDict, newDict)

        result.set_data(json.dumps(justDict))

    return result

@app.route('/api/userInfo/', methods=["POST", "OPTIONS"])
def userInfo():
    response = Response()
    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")

        data1=request.get_data()
        data = json.loads(data1)

        username = data["username"]
        user = User.query.filter(User._username==username)

        dictionary = {'username':user[0]._username, 'pointA':user[0]._pointA, 'pointB':user[0]._pointB,'pointC':user[0]._pointC,'pointD':user[0]._pointD}

        response.set_data(json.dumps(dictionary))
    return response
