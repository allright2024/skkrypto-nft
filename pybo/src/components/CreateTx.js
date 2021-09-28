import React,{useState} from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';

import Table from 'react-bootstrap/Table'

function CreateTx(){

    const [from, setFrom]=useState('')
    const [to, setTo] = useState('')
    const [exchange_value, setExchangeValue] = useState('')

    const [from_user_hash, setFromUserHash] = useState('')
    const [from_user_value, setFromValue] = useState('')
    const [to_user_hash, setToUserHash] = useState('')
    const [to_user_value, setToValue] = useState('')
    const [create_date,setCreate_date]=useState('')
    const cur_type = 'A';

    const onClick=()=>{
        let requestOpt=getRequest({"from": from, "to": to, "type": cur_type, "value": exchange_value})

        // console.log(requestOpt)
        let fromuserList=[]
        let fromvalueList=[]
        let touserList =[]
        let tovalueList=[]

        fetch("http://localhost:5000/api/createTx/", requestOpt).then(response=>response.json()).then(jsons=>{
            
            if(1){
                for(let i=1;jsons[i]!==undefined;i++){
                    fromuserList.push(jsons[i]['from_user'])
                    fromvalueList.push(jsons[i]['from_Value'])
                    touserList.push(jsons[i]['to_user'])
                    tovalueList.push(jsons[i]['to_Value'])
                }
                setFromUserHash(fromuserList)
                setFromValue(fromvalueList)
                setToUserHash(touserList)
                setToValue(tovalueList)
            }
        })

        
    }
    
    const getRequest=(jsons)=>{
        return{
            method:'POST',
            header:{
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Headers':"*"                
            },
            body:JSON.stringify(jsons)
        }
    }

    const handleChangeFrom=({target:{value}})=>setFrom(value);
    const handleChangeTo=({target:{value}})=>setTo(value);
    const handleChangeValue=({target:{value}})=>setExchangeValue(value);

    const afterTxs=()=>{
        
        const result=[];
        for(let i =0;i<from_user_hash.length;i++){
            result.push(
                <tr>
                    <td>{i+1}</td>
                    <td>{from_user_hash[i]}</td>
                    <td>{from_user_value[i]}</td>
                    <td>{to_user_hash[i]}</td>
                    <td>{to_user_value[i]}</td>
                </tr>
            )
        }        

        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>From</th>
                            <th>From Value</th>
                            <th>To</th>
                            <th>To Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </Table>
            </div>
        )
        
    }
    return(
        <div style={{paddingTop:'100px', margin:'20px'}}>
            <Form>
                <Form.Control style ={{marginTop:'20px'}} type="text" placeholder="Text from ID" onChange={handleChangeFrom}/> 
                <Form.Control style ={{marginTop:'20px'}} type="text" placeholder="Text to ID" onChange={handleChangeTo}/> 
                <Form.Control style ={{marginTop:'20px'}} type="text" placeholder="Text Amount u wanna send" onChange={handleChangeValue}/> 
            </Form>
            
            <Button style ={{marginTop:'20px'}}variant="primary"onClick={onClick}>Send</Button>
            <div style={{marginLeft:'0px', marginTop:'10px'}}>{afterTxs()}</div>
        </div>
    )
}

export default CreateTx
