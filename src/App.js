import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SnipsContainer from "./components/snipscontainer.jsx";
import LogInPage from './components/loginpage.jsx';

const validLogins = [{username: 'admin', passwd: 'a'}]
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }
  checkLogin = () => {
    let username = document.getElementById('username').value;
    let passwd = document.getElementById('password').value;
    if ((username===validLogins[0].username && passwd===validLogins[0].passwd)){
      alert('Successfully logged in! Redirecting.')
      this.setState((prev) => ({loggedIn: true}))
    }else{
      alert('Unsuccessful login, try again.')
    }
    document.getElementById('username').value='';
    document.getElementById('password').value='';
  }
  render() {
    return (
        <div className="main-app">
          {this.state.loggedIn ? <SnipsContainer /> : 
        // <div className="main-app">Log in please.</div>;
          <LogInPage checkLogin={this.checkLogin}/>}

          <button onClick={() => this.setState((prev) => ({loggedIn: !prev.loggedIn}))}>
              (Click to change loggedIn)
          </button>
        </div>)
  }
}

export default App;
