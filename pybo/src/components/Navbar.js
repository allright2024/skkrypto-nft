import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {Button, NavDropdown, Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import "./Navbar.css"
import Contact from './Contact.js';

function Navbar1() {
    const [sign, setSign] = useState(true)
    const onClick = () => {
        setSign((prev) => !prev)
    }


    return (
        <div style={{float:'right'}} >
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand href='/home'>Skkrypto</Navbar.Brand>
                <Nav className="me-auto">
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/home/viewAll">View All Txs</NavDropdown.Item>
                        <NavDropdown.Item href="/home/searchTx">search Tx</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="/home/createTx">create Tx</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/home/contact" >Contact</Nav.Link>
                    
                </Nav>
                    
                
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href='/home/login'><Button variant="light" style={{float: 'right', paddingRight:'10px', marginRight:'10px'}} color="primary" className="float-right" onClick={onClick}>로그인</Button></Nav.Link>
                    <Nav.Link href = "/home/signup"><Button variant="light" style={{float: 'right'}}  className="float-right" onClick={onClick}>회원가입</Button></Nav.Link>
                </Navbar.Collapse>
            </Navbar>
           
        </div>
    );
}

export default Navbar1;