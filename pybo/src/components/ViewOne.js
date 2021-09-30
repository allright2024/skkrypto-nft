import React,{useState} from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import Table from 'react-bootstrap/Table'

function ViewOne(){

    const [from, setFrom]=useState('')
    const[to, setTo] = useState('')
    const [value, setValue] = useState('')
    const[type, setType] = useState('')
    const [create_date,setCreate_date]=useState('')
    const [hash, setHash] = useState('')
    const [cur_state, setCur_state]=useState('')
    const [dropdown, setDropdown] = useState('1')
    const[address,setAddress] = useState('')

    const [typeCheck, setTypeCheck] = useState('ALL') // 'all' : all, 'A' : A, 'B' : B, 'C': C, 'D':D
    

    const onClick=()=>{
        let requestOpt=getRequest({"who":cur_state,"type": dropdown, "address":address})

        console.log(requestOpt)

        let fromList=[]
        let toList=[]
        let valueList=[]
        let typeList=[]
        let create_dateList=[]
        let hashList=[]

        fetch("http://localhost:5000/api/detail/txId", requestOpt).then(response=>response.json()).then(jsons=>{
            
            if(1){
                for(let i=1;jsons[i]!==undefined;i++){
                    fromList.push(jsons[i]['from'])
                    toList.push(jsons[i]['to'])
                    valueList.push(jsons[i]['value'])
                    typeList.push(jsons[i]['type'])
                    create_dateList.push(jsons[i]['create_date'])
                    hashList.push(jsons[i]['hash'])
                }
                setFrom(fromList)
                console.log(from)
                setTo(toList)
                setValue(valueList)
                setType(typeList)
                setCreate_date(create_dateList)
                setHash(hashList)
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
                if(typeCheck==='ALL'){
                    result.push(
                        <tr>
                            <td>{i+1}</td>
                            <td>{from[i]}</td>
                            <td>{to[i]}</td>
                            <td>{value[i]}</td>
                            <td>{type[i]}</td>
                            <td>{create_date[i]}</td>
                            <td>{hash[i]}</td>
                        </tr>
                    )
                }
                else if(typeCheck==='A'){
                    if(type[i]==='A'){
                        result.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{from[i]}</td>
                                <td>{to[i]}</td>
                                <td>{value[i]}</td>
                                <td>{type[i]}</td>
                                <td>{create_date[i]}</td>
                                <td>{hash[i]}</td>
                            </tr>
                        )
                    }
                }
                else if(typeCheck==='B'){
                    if(type[i]==='B'){
                        result.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{from[i]}</td>
                                <td>{to[i]}</td>
                                <td>{value[i]}</td>
                                <td>{type[i]}</td>
                                <td>{create_date[i]}</td>
                                <td>{hash[i]}</td>
                            </tr>
                        )
                    }
                }
                else if(typeCheck==='C'){
                    if(type[i]==='C'){
                        result.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{from[i]}</td>
                                <td>{to[i]}</td>
                                <td>{value[i]}</td>
                                <td>{type[i]}</td>
                                <td>{create_date[i]}</td>
                                <td>{hash[i]}</td>
                            </tr>
                        )
                    }
                }
                else if(typeCheck==='D'){
                    if(type[i]==='D'){
                        result.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{from[i]}</td>
                                <td>{to[i]}</td>
                                <td>{value[i]}</td>
                                <td>{type[i]}</td>
                                <td>{create_date[i]}</td>
                                <td>{hash[i]}</td>
                            </tr>
                        )
                    }
                }
                
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
                            <DropdownButton as={ButtonGroup} title={typeCheck} id="bg-vertical-dropdown-3" variant="outline-dark">
                            <Dropdown.Item eventKey="1" size = "sm" onClick={()=>setTypeCheck('ALL')}>ALL</Dropdown.Item>
                                <Dropdown.Item eventKey="1" size = "sm" onClick={()=>setTypeCheck('A')}>A</Dropdown.Item>
                                <Dropdown.Item eventKey="2" size = "sm" onClick={()=>setTypeCheck('B')}>B</Dropdown.Item>
                                <Dropdown.Item eventKey="3" size = "sm" onClick={()=>setTypeCheck('C')}>C</Dropdown.Item>
                                <Dropdown.Item eventKey="4" size = "sm" onClick={()=>setTypeCheck('D')}>D</Dropdown.Item>
                            </DropdownButton>
                            <th>create_date</th>
                            <th>Hash</th>
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
