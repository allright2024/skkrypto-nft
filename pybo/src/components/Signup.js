import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

function Signup(){
    const [show,setShow]=useState(false);
    const [pwShow, setPwShow]=useState(false)
    const [pwCheckShow, setPwCheckShow]=useState(false)
    // const [pwVariant, setPwVariant]=useState(pwShow?'danger':'success')
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState('you can`t use this ID')
    const [id,setId]=useState('');
    const [password, setPassword]=useState('');
    const [idVeri, setIdVeri]=useState(0);
    const[passwordCheck, setPasswordCheck]=useState(true)
    const [passwordError, setPasswordError]=useState('')
    const [email, setEmail] = useState('');
    const [emailVeri, setEmailVeri]=useState(0);
    const [emailAlert, setEmailAlert]=useState(0);
    const [eVariant, setEVariant] = useState('success');
    const [eShow, setEShow] = useState(false)
    const onChangeId = (e)=>{
        setId(e.currentTarget.value)
    }

    const emailVerification=()=>{
        setEShow(true)
        console.log(email)
        let requestOpt=getRequestOpt({"email":email});
        fetch('http://127.0.0.1:5000/api/emailValidator/', requestOpt).then(response=>response.json()).then(jsons=>{
            let response = jsons['isValid']
            if(response == 1){
                setEmailVeri(1);
                setEmailAlert(1);
                setEVariant('success');
            }
            else if (response==2) {
                setEmailVeri(0);
                setEmailAlert(0);
                setEVariant('danger');
            }
            else{
                setEmailVeri();
                setEmailAlert(2);
                setEVariant('danger');
            }
        })
    }

    const getRequestOpt=(jsons)=>{
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

    function onChangePassword(e){
        setPassword(e.currentTarget.value)
        if(e.currentTarget.value.length>6){
            setPwShow(false)
        }
        else{
            setPwShow(true)
        }
    };

    function onChangePasswordCheck(e){
        setPasswordError(e.currentTarget.value!==password)
        setPasswordCheck(e.currentTarget.value)
        setPwCheckShow(passwordError)
    }
    
    const onChangeEmail=(e)=>{
        setEmail(e.currentTarget.value);
    }

    const onClickIdVerification=()=>{
        let requestOpt=getRequestOpt({'id':id})
        fetch('http://localhost:5000/api/idverification', requestOpt).then(response=>response.json()).then(jsons=>{
            let response = jsons['a']
            console.log(response)
            if(response==="list index out of range"){
                setMessage('You can use this ID')
                setVariant('success')
                setIdVeri(1)
                setShow(true)
            }
            else{
                setMessage('You cannot use this ID')
                setVariant('danger')
                setIdVeri(0)
                setShow(true)
            }
        })
    }

    const onClickNew=(e)=>{
        e.preventDefault();
        let requestOpt = getRequestOpt({"id": id, "password":password,"email":email})
        fetch('http://localhost:5000/api/createUser', requestOpt).then(response=>response.json()).then(jsons=>{
            alert("success")
        })

    }   
    
    return (
        <>
        <Form style={{marginTop:'100px', marginLeft:'20px'}}>

            <Form.Group className = "mb-3" controlId="formBasciId">
                <Form.Label>ID</Form.Label>
                <Form.Control type="Id" placeholder="Id" onChange={onChangeId}/>
            </Form.Group>
            <Button size="sm" style={{display : 'inline'}} onClick={onClickIdVerification}>duplication check</Button> 
            
            <Alert style = {{marginTop:'10px'}} show={show} variant={variant} >
                <Alert.Heading>{message}</Alert.Heading>
                
                <hr />
                <div className="d-flex justify-content-end">
                    <Button size="sm" onClick={() => setShow(false)} variant="outline-primary">
                        Close
                    </Button>
                </div>
            </Alert>
           <hr/>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onClick={()=>setPwShow(true&&password.length<6)} onChange={onChangePassword} />
            </Form.Group>
            <Alert style={{margin:'10px'}} show={pwShow} variant='danger'>
                password length should be more than 6
            </Alert>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Check</Form.Label>
                <Form.Control type="password" placeholder="Password check" onClick={()=>setPwCheckShow(true&&password===passwordCheck)} onChange={onChangePasswordCheck}/>
            </Form.Group>
            <Alert style={{margin:'10px'}} show={pwCheckShow&&password!==passwordCheck} variant='danger'>
                Not same with password
            </Alert>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={onChangeEmail}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Button onClick={emailVerification} size = "sm">
                Check
            </Button>
            <Alert style={{marginTop:'10px'}} show={eShow} variant={eVariant}>
                {emailAlert===0?'not valid email' : emailAlert===1? "you can use this Email" : "already registered email"}
                <hr/>
                <Button size = "sm" onClick={()=>setEShow(false)} variant="outline-primary">
                    Close
                </Button>
            </Alert>
            <hr/>
            <Button variant="primary" type="submit" onClick = {onClickNew}>
             Create Account
            </Button>
        </Form>

        </>
    )
    
}

export default Signup
