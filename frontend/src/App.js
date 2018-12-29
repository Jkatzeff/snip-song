import React, { Component } from "react";
import "./App.css";
import LogInPage from "./components/loginpage.jsx";
import LoggedInPage from "./components/loggedinpage.jsx";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "",
      spotifyUsername: ""
    };
    this.registerUserInDb = this.registerUserInDb.bind(this);
  }
  userExistsInDb = username => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/userExists", { username: username })
        .then(response => {
          console.log(response);
          if (response && response.data && response.data.success === true) {
            resolve(response.data.userExists);
          } else {
            resolve(true);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  };
  verifyLoginToDb = (username, passwd) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/verifyLogin", { username: username, passwd: passwd })
        .then(response => {
          if (response.data.loggedIn === true) {
            this.setState({ loggedIn: true, username: username });
            if(response.data.spotifyUsername !== null){
              this.setState({spotifyUsername: response.data.spotifyUsername})
            }
          } else {
            this.setState({ loggedIn: false, username: "", spotifyUsername: "" });
            alert("Incorrect login information.");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
          }
        });
    });
  };
  registerUserInDb = (username, passwd) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/registerUser", { username: username, passwd: passwd })
        .then(response => {
          if (response.data.success === true) {
            resolve(true);
          }
        });
    });
  };
  checkLogin = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    this.verifyLoginToDb(username, passwd).then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
  };

  logout = () => {
    this.setState({ loggedIn: false, username: "" });
  };

  setSpotifyUsername = (spotifyUsername) => {
    if(this.state.username === ""){
      return;
    }else{
      axios.post("/api/addSpotifyToUser", {username: this.state.username, spotifyUsername: spotifyUsername})
      .then(response => {
        if(response.data.success === true){
          console.log(spotifyUsername)
        }
      })
    }
  }
  register = () => {
    let username = document.getElementById("username").value;
    let passwd = document.getElementById("password").value;
    if (passwd.length < 6) {
      alert("Password not long enough. Must be at least 6 characters.");
      return;
    }
    if (passwd.length >= 30) {
      alert("Password too long, must be less than 30 characters.");
      return;
    }
    let registerUserInDb = this.registerUserInDb;
    this.userExistsInDb(username).then(function(res) {
      if (res === true) {
        alert(
          "Username " + username + " already taken, please choose another."
        );
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        return;
      } else {
        console.log("user doesn't exist, registering...");
        registerUserInDb(username, passwd).then(() => {
          alert("Registered user " + username);
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          return;
        });
      }
    });
  };
  render() {
    return (
      <div className="main-app">
        {this.state.loggedIn ? (
          <LoggedInPage
            loggedIn={this.state.loggedIn}
            username={this.state.username}
            logout={this.logout}
            setSpotifyUsername={this.setSpotifyUsername}
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
