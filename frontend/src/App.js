import React, { Component } from "react";
import "./App.css";
import LogInPage from "./components/loginpage.jsx";
import LoggedInPage from "./components/loggedinpage.jsx";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: ""
    };
    this.registerUserInDb = this.registerUserInDb.bind(this);
  }
  userExistsInDb = (username) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/userExists", {username: username}).then((response) => {
        console.log(response);
        if(response && response.data && response.data.success === true){
          resolve(response.data.userExists);
        }else{
          resolve(true);
        }
      }).catch((e) => {reject(e)})})
  }
  verifyLoginToDb = (username, passwd) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/verifyLogin", {username: username, passwd: passwd}).then((response) => {
        if(response.data.loggedIn === true){
          this.setState({loggedIn: true, username: username})
        }
        else{
          this.setState({loggedIn: false, username: ""})
        }
      })      
    })}
  registerUserInDb = (username, passwd) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/registerUser", {username: username, passwd: passwd}).then((response) => {
        if(response.data.success === true){
          resolve(true);
        }
      })      
    })

  }
  checkLogin = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    this.verifyLoginToDb(username,passwd).then((res)=>{
      if(res){return true;}
      else{return false;}
    });
  };

  logout = () => {
    this.setState({loggedIn: false, username: ""});
  }
  register = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    let registerUserInDb = this.registerUserInDb;
    this.userExistsInDb(username).then(function(res){
      if (res === true){
        alert("Username " + username + " already taken, please choose another.");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        return;        
      }else{
        console.log("user doesn't exist, registering...")
        registerUserInDb(username, passwd).then(()=>{
          alert("Registered user " + username);
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          return;
        })
      }
    })
  };
  render() {
    return (
      <div className="main-app">
        {this.state.loggedIn ? (
          <LoggedInPage
            loggedIn={this.state.loggedIn}
            username={this.state.username}
            logout={this.logout}
          />
        ) : (
          <LogInPage
            loggedIn={this.state.loggedIn}
            checkLogin={this.checkLogin}
            register={this.register}
            username={this.state.username}
          />
        )}
        <button
          onClick={() => this.setState(prev => ({ loggedIn: !prev.loggedIn }))}
        >
          (Click to change loggedIn)
        </button>
      </div>
    );
  }
}

export default App;
