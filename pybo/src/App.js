import logo from './logo.svg';
import './App.css';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import React, {useState} from 'react';
import Contact from './components/Contact.js';
import Transaction from './components/Transaction.js'
import ViewOne from './components/ViewOne.js';
import Navbar1 from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CreateTx from './components/CreateTx';
import ViewPoint from './components/ViewPoint.js';
import "./style.css"
import Signup from './components/Signup';

function App() {
  return (
    <div className="">
      
      <Router>
      
        
        <Route exact path = "/">
          <Redirect to="/home"/>
        </Route>

        <Route exact path="/home">
          <Home/>
          <Navbar1/>
        </Route>

        <Route path="/home/contact">
          
          <Contact/>
          <Navbar1/>
        </Route>

        <Route path="/home/signup">
          <Signup/>
          <Navbar1/>
        </Route>

        <Route path="/home/login">
          <Login/>
          <Navbar1/>
        </Route>
        
        <Route path="/home/CreateTx">
          <CreateTx/>
          <Navbar1/>
        </Route>

        <Route path="/home/viewPoint">
          <ViewPoint/>
          <Navbar1/>
        </Route>

        <Route path="/home/searchTx">
          <ViewOne/>
          <Navbar1/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
