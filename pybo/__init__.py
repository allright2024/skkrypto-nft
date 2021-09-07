from flask import Flask, Response, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

from datetime import datetime
import json

import config 

db = SQLAlchemy()
migrate=Migrate() 

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

app.config.from_object(config) 

db.init_app(app)
migrate.init_app(app,db)

from . import models 

def merge_dic(x,y):
    z=x 
    z.update(y)
    return z

# @app.route('/api/viewAll/',methods=["GET","OPTIONS"])
# def viewAll():
#     response=Response()

#     if request.method=='OPTIONS':
#         response.headers.add("Access-Control-Origin", "*")
#         response.headers.add("Access-Control-Allow-Headers", "*")
#         response.headers.add("Access-Control-Allow-Methods", "GET")
#     elif request.method=="GET":
#         response.headers.add('Access-Control-Allow-Origin', "*")
        
#         response.headers.add('Access-Control-Allow-Headers', "*")
#         allTxs=models.Transaction.query.all()
#         justDict={1:'asd'}
#         for tx in allTxs:
#             dictionary={'from':tx._from, 'to':tx._to, 'create_date':str(tx.create_date)}
#             newDict={str(tx.id):dictionary}
#             justDict=merge_dic(justDict,newDict)
#         response.set_data(json.dumps(justDict, ensure_ascii=False))
#     return response    
        



@app.route('/api/createTx/', methods=['POST', 'OPTIONS'])
def createTx():
    response = Response()

    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Aloow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method =="POST":
        response.headers.add("Access-Control-Allow-Origin", "*")
        
        data=request.get_json()
        data_from = data['from']
        data_to = data['to']
        data_value=data['value']
        print(data)
        tx=models.Transaction(_from=data_from, _to=data_to, _value=data_value, create_date=datetime.now())
        db.session.add(tx)
        db.session.commit()
        response.set_data(json.dumps('True', ensure_ascii=False))
    return response

@app.route('/api/detail/txId/',methods = ['POST', 'OPTIONS'])
def detail():
    response = Response()

    if request.method=='OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
    elif request.method=="POST":
        print('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        response.headers.add("Access-Control-Allow-Origin", "*")
        data1 =request.get_data()
        data=json.loads(data1)
        methods = request.method
        print(data)
        print(json.loads(data1)["who"])
        print(methods)
        cur_state=data["who"]
        address=data["address"]
        justDict={}
        if cur_state=='to':
            txs= models.Transaction.query.filter(models.Transaction._to==address)
        elif cur_state=='from':
            txs=models.Transaction.query.filter(models.Transaction._from==address)

        print(txs)

        for tx in txs:
            dictionary={'from':tx._from, 'to':tx._to, 'value':tx._value, 'create_date':str(tx.create_date)}
            newDict={str(tx.id):dictionary}
            justDict=merge_dic(justDict,newDict)
        
        print(justDict)

        response.set_data(json.dumps(justDict))

    return response


@app.route('/api/test', methods=['GET', 'POST', 'OPTIONS'])
def test_api():
    data = request.get_json()
    print(data)
    print(request.method)

    response=Response()

    result = response.set_data(json.dumps({"data":"hello"}))

    return 'result'

@app.route('/api/viewAll',methods=["GET","POST", "OPTIONS"])
def viewAll():
    result = Response()
    result.headers.add('Access-Control-Allow-Origin', "*")
    result.headers.add('Access-Control-Allow-Headers', "*")
    allTxs=models.Transaction.query.all()
    justDict={}
    
    for tx in allTxs:
        dictionary={'from':tx._from, 'to':tx._to, 'value':tx._value, 'create_date':str(tx.create_date)}
        newDict={str(tx.id):dictionary}
        justDict=merge_dic(justDict,newDict)
    # result.set_data(json.dumps(justDict, ensure_ascii=False))
    result.set_data(json.dumps(justDict))

    return result