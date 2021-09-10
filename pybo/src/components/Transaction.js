import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import autosize from 'autosize';

function Transaction() {

    const [txs, setTxs]=useState(0);
    const [toLi, setToLi] = useState([])
    const [fromLi, setFromLi] = useState([])
    const [create_dateLi,setCreate_dateLi] = useState([])
    const [valueLi, setValueLi] = useState([])

    const getRequest=()=>{
        return{
            method:'GET',
            headers:{
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Headers':"*"
            }
        }
    }

    const getAllTransaction=()=>{

        setTxs(1)
        
        const requestOpt=getRequest();
        let toList=[]
        let fromList=[]
        let valueList=[]
        let create_dateList=[]
        fetch('http://127.0.0.1:5000/api/viewAll', requestOpt).then(response=>response.json()).then(jsons=>{
            

            for (let i=1;jsons[i]!==undefined;i++){
                fromList.push(jsons[i]['from'])
                toList.push(jsons[i]['to'])
                valueList.push(jsons[i]['value'])
                create_dateList.push(jsons[i]['create_date'])
            }
            console.log(jsons[1])
            setToLi(fromList)
            setFromLi(toList)
            setValueLi(valueList)
            setCreate_dateLi(create_dateList)
            console.log(create_dateList)
        })
    }

    
    const view=()=>{

        if(create_dateLi[0]===undefined){
            return<span></span>
        }
        else{
            const result=[];

            for(let i =0;i<toLi.length;i++){
                result.push(
                    <tr>
                        <td>{i+1}</td>
                        <td>{toLi[i]}</td>
                        <td>{fromLi[i]}</td>
                        <td>{valueLi[i]}</td>
                        <td>{create_dateLi[i].split('.')[0]}</td>
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
        
    }

    return (
        
        <div >
            <Button style={{display:'inline',marginLeft:'100px',marginTop:'100px'}} onClick={getAllTransaction}>veiw all transactions</Button>
            <div style={{marginLeft:'100px', marginTop:'10px'}}>{view()}</div>
        </div>
    );
}

export default Transaction