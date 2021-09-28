import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

function ViewPoint() {
  const [userName, setUserName] = useState('');
  //userName을 표에 넣으면 사용자가 input창에 입력할 때 표의 UserName column에 실시간으로 반영되는 부작용이 있어 따로 state를 만들었음.
  const [displayedUserName, setDisplayedUserName] = useState('');
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [pointC, setPointC] = useState('');
  const [pointD, setPointD] = useState('');

  const handleChangeId = (e) => {
    setUserName(e.currentTarget.value);
  }

  const onClick = () => {
    let requestOpt = getRequest({"username":userName})
    
    fetch("http://localhost:5000/api/userInfo", requestOpt).then(response => response.json()).then(jsons => {
      console.log(jsons);
      setPointA(jsons.pointA);
      setPointB(jsons.pointB);
      setPointC(jsons.pointC);
      setPointD(jsons.pointD);
      setDisplayedUserName(jsons.username);
    })
  }

  const getRequest = (jsons) => {
    return {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(jsons)
    }
  }

  const getTable = () => {
    return(
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>UserName</th>
              <th>pointA</th>
              <th>pointB</th>
              <th>pointC</th>
              <th>pointD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{displayedUserName}</td>
              <td>{pointA}</td>
              <td>{pointB}</td>
              <td>{pointC}</td>
              <td>{pointD}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  return (
    <div style={{paddingTop:'60px', margin:'30px'}}>
    <Form>
        <Form.Control style ={{marginTop:'20px'}} type="text" placeholder="Your Username" onChange={handleChangeId}/> 
    </Form>
    
    <Button style ={{marginTop:'20px'}} variant="primary" onClick={onClick}>Search</Button>
    <div style={{marginLeft:'0px', marginTop:'10px'}}>{getTable()}</div>
</div>
  );
}

export default ViewPoint;
