import React, { Component } from "react";
import "./App.css";
import LogInPage from "./components/loginpage.jsx";
import LoggedInPage from "./components/loggedinpage.jsx";

let validLogins = [{ username: "admin", passwd: "a" }];
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: ""
    };
  }
  checkLogin = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    let found = false;
    validLogins.forEach(({ username: user_elem, passwd: pass_elem }) => {
      if (username === user_elem && passwd === pass_elem) {
        alert("Welcome, " + username + ". Redirecting.");
        this.setState(prev => ({ loggedIn: true, username: username }));
        found = true;
        return;
      }
    });
    if (!found) {
      alert("Unsuccessful login, try again.");
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }
  };

  logout = () => {
    this.stateState({loggedIn: false, username: ""});
  }
  register = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    let found = false;
    validLogins.forEach(({ username: curr_user, passwd: curr_pass }) => {
      if (curr_user === username) {
        alert("Username already taken, please choose another.");
        found = true;
      }
    });
    if (!found) {
      validLogins.push({ username: username, passwd: passwd });
    }
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
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
