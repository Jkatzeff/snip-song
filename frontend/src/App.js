import React, { Component } from "react";
import "./App.css";
import LogInPage from "./components/loginpage.jsx";
import LoggedInPage from "./components/loggedinpage.jsx";
var validLogins=[{username: "admin", passwd: "a"}]
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: ""
    };
  }
  userExistsInDb = (username) => {
    fetch("/api/userExists")
      .then(data => data.json())
      .then((res) => {
        if(res.success === true){
          return true;
        }else{
          return false;
        }
      })
  }
  verifyUserInfoInDb = (username, passwd) => {
    fetch("/api/verifyUser")
      .then(data => data.json())
      .then((res) => {
        console.log(res);
        if(res.success === true && res.loggedIn === true){
          this.setState({loggedIn: true, username: username});
        }else{
          alert("Unsuccessful login. Try again.");
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
        }

      })
  }
  registerUserInDb = (username, passwd) => {
    fetch("/api/verifyUser")
      .then(data => data.json())
      .then((res) => {
        if(res.success === true){
          alert("Registed as " + username);
        }
      })
  }
  checkLogin = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    const a = this.verifyUserInfoInDb(username,passwd);
  };

  logout = () => {
    this.setState({loggedIn: false, username: ""});
  }
  register = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    if(this.userExistsInDb() === true){
      alert("Username already taken, please choose another.");
      return;
    }
    console.log("user doesn't exist, registering...")
    this.registerUserInDb(username, passwd);
    // let found = false;
    // validLogins.forEach(({ username: curr_user, passwd: curr_pass }) => {
    //   if (curr_user === username) {
    //     alert("Username already taken, please choose another.");
    //     found = true;
    //   }
    // });
    // if (!found) {
    //   validLogins.push({ username: username, passwd: passwd });
    // }
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
