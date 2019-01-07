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
  }
  /* Sends signal to backend to check if user exists in database 
  */
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
  /* Sends signal to backend to check to see if provided credentials
     match a user in the database. If it does, sets state of App to be
     logged in, and sets the username. If this user has already set a
     Spotify account, also sets the state to reflect that we already
     know the spotify account.
  */
  verifyLoginToDb = (username, passwd) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/verifyLogin", { username: username, passwd: passwd })
        .then(response => {
          if (response.data.loggedIn === true) {
            this.setState({
              loggedIn: true,
              username: username,
              spotifyUsername:
                response.data.spotifyUsername !== null
                  ? response.data.spotifyUsername
                  : ""
            });
          } else {
            this.setState({
              loggedIn: false,
              username: "",
              spotifyUsername: ""
            });
            alert("Incorrect login information.");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
          }
        });
    });
  };
  /* Sends signal to backend to register user. Doesn't allow registration
     of usernames already in the database. */
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
  /* Grabs username and passwd from document, then checks to see if it's valid.
     Possibly not needed?
  */
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
  /* Logout callback function. 
  */
  logout = () => {
    this.setState({ loggedIn: false, username: "" });
  };
  /* Callback function to set the user's Spotify account in the database
     once the user logs in to Spotify later.
  */
  setSpotifyUsername = spotifyUsername => {
    if (this.state.username === "") {
      return;
    } else {
      axios
        .post("/api/addSpotifyToUser", {
          username: this.state.username,
          spotifyUsername: spotifyUsername
        })
        .then(response => {
          if (response.data.success === true) {
            console.log(spotifyUsername);
          }
        });
    }
  };
  /* Logic for registering a new account in the database. Only allows certain
     password lengths (6<=pwd<30). 
  */
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
            spotifyUsername={this.state.spotifyUsername}
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
