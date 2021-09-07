import React,{useState} from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';

import Table from 'react-bootstrap/Table'

function ViewOne(){

    const [from, setFrom]=useState('')
    const[to, setTo] = useState('')
    const [value, setValue] = useState('')
    const [create_date,setCreate_date]=useState('')
    const [cur_state, setCur_state]=useState('')
    const[address,setAddress] = useState('')

    const onClick=()=>{
        let requestOpt=getRequest({"who":cur_state, "address":address})

        console.log(requestOpt)

        let fromList=[]
        let toList=[]
        let valueList=[]
        let create_dateList=[]

        fetch("http://127.0.0.1:5000/api/detail/txId", requestOpt).then(response=>response.json()).then(jsons=>{
            
            if(1){
                for(let i=1;jsons[i]!==undefined;i++){
                    fromList.push(jsons[i]['from'])
                    toList.push(jsons[i]['to'])
                    valueList.push(jsons[i]['value'])
                    create_dateList.push(jsons[i]['create_date'])
                }
                setFrom(fromList)
                setTo(toList)
                setValue(valueList)
                setCreate_date(create_dateList)
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

    const handleChange=({target:{value}})=>setAddress(value);

    const getSomeTxs=()=>{
        
        const result=[];

        console.log(from);

        if(create_date[0]!==undefined){
            for(let i =0;i<to.length;i++){
                result.push(
                    <tr>
                        <td>{i+1}</td>
                        <td>{from[i]}</td>
                        <td>{to[i]}</td>
                        <td>{value[i]}</td>
                        <td>{create_date[i].split('.')[0]}</td>
                    </tr>
                )
            }
        }

        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Value</th>
                            <th>create_date</th>
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
            <div key={`inline-radio`} className='mb-3'>
                <Form.Check
                    inline
                    label="from"
                    name="group1"
                    type='radio'
                    id={`inline-radio-1`}
                    onChange={()=>setCur_state('from')}
                />
                <Form.Check
                    inline
                    label="to"
                    name="group1"
                    type='radio'
                    id={`inline-radio-2`}
                    onChange={()=>setCur_state('to')}
                />
                <br/>
                <Form.Control style ={{marginTop:'20px'}} type="text" placeholder="Text from or to ID" onChange={handleChange}/> 
                
            </div>
            </Form>
            
            <Button style ={{marginTop:'20px'}}variant="primary"onClick={onClick}>Search</Button>
            <div style={{marginLeft:'0px', marginTop:'10px'}}>{getSomeTxs()}</div>
        </div>
    )
}

export default ViewOne