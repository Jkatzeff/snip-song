import React from "react";
import SnipsContainer from "./snipscontainer.jsx";
import Banner from "./banner.jsx";
import LoginToSpotify from "./logintospotify.jsx";
import PostNewSnip from "./postnewsnip.jsx";
var Spotify = require("spotify-web-api-js");
var spotifyWebApi = new Spotify();

function getHashParams() {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

export default class LoggedInPage extends React.Component {
	constructor(props) {
		super(props);
		const params = getHashParams();
		const token = params.access_token;
		this.state = {
			loggedInSpotify: token ? true : false,
			userId: "",
			topSongs: []
		};
		if (token) {
			spotifyWebApi.setAccessToken(token);
		}
		// this.updateInfo = this.updateInfo.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(() => {this.getCurrentUser(); this.getTopSongs();}, 3000);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	getCurrentUser() {
		spotifyWebApi
			.getMe([])
			.then(response => this.setState({ userId: response.id }));
	}
	getTopSongs() {
		spotifyWebApi.getMyTopTracks({limit: 5}).then(response =>{ 
					this.setState({ topSongs: response.items.map(item => item.name)});})
	}
	render() {
		const loggedIn = this.state.loggedInSpotify;
		const user = this.state.userId;
		// todo: make banner include spotify loggedin status
		const songs = this.state.topSongs;
		return (
			<div>
				<Banner
					loggedIn={this.props.loggedIn}
					username={this.props.username}
				/>
				{loggedIn ? <div>{"Hello, " + user}</div> : <LoginToSpotify />}
				<ul>{songs.map(song => <li>{song}</li>)}</ul>
				<PostNewSnip />
				<SnipsContainer />
			</div>
		);
	}
}

// export default LoggedInPage;
