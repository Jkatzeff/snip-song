import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Snip from './components/snip.jsx'
const exampledata = 
  {
    userId: "jkatzeff",
    type: "spotify",
    songURI: "spotify:track:3QkTIg9pFStcRvsC3SA10t",
    numLikes: 0,
    date: "11/11/2018",
    time: "9:09:59",
    canLike: true
  }
const exampledata2 = 
  {
    userId: "jkatzeff-fake",
    type: "spotify",
    songURI: "spotify:track:6QXQEeKlpcEtg5eOJfr8nO",
    numLikes: 0,
    date: "11/11/2018",
    time: "20:47:53",
    canLike: true
  }
const exampledata3 = 
  {
    userId: "jkatzeff-fake-2",
    type: "spotify",
    songURI: "spotify:track:2UYHP0RQqPFvue0Ygs5Amm",
    numLikes: 100,
    date: "11/11/2018",
    time: "21:20:10",
    canLike: true
  }
  const exampledata4 = 
  {
    userId: "jkatzeff-fake-2",
    type: "spotify",
    songURI: "spotify:track:2UYHP0RQqPFvue0Ygs5Amm",
    numLikes: 100,
    date: "11/11/2018",
    time: "21:20:10",
    canLike: false
  }

class App extends Component {
  handleLike = (snip) => {
    let arr = this.state.snips;
    const index = arr.indexOf(snip);
    arr[index].numLikes++;
    arr[index].canLike = !arr[index].canLike
    this.setState({snips: arr})
  }
  handleUnlike = (snip) => {
    let arr = this.state.snips;
    const index = arr.indexOf(snip);
    arr[index].numLikes--;
    arr[index].canLike = !arr[index].canLike
    this.setState({snips: arr})
  }
  constructor(){
    super();
    this.state = {
      snips: [exampledata, exampledata2, exampledata3, exampledata4]
    }
  }

  render() {
    return (
        <div className="main-app">
            {this.state.snips.map((data, index) => <Snip key={data+index} data={data} onLike={this.handleLike} onUnlike={this.handleUnlike}/>)}
      </div>
    );
  }
}

export default App;
