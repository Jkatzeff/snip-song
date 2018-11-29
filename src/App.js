import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SnipsContainer from "./components/snipscontainer.jsx";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return <SnipsContainer />;
  }
}

export default App;
