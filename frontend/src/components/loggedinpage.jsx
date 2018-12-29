import React from "react";
import SnipsContainer from "./snipscontainer.jsx";
import Banner from "./banner.jsx";
import LoginToSpotify from "./logintospotify.jsx";
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
			topSongs: [],
			snips: []
		};
		if (token) {
			spotifyWebApi.setAccessToken(token);
		}
	}

	componentDidMount() {
		if(this.state.userId === ""){
			this.timerID = setInterval(() => {
				this.getCurrentUser();
				this.getTopSongs();
			}, 3000);
		}
	}
	componentWillUnmount() {
		if(this.timerID){
			clearInterval(this.timerID);
		}
	}
	getCurrentUser() {
		spotifyWebApi
			.getMe([])
			.then(response => {
				this.setState({ userId: response.id });
				this.props.setSpotifyUsername(response.id);
				clearInterval(this.timerID);
			});
	}
	getTopSongs() {
		spotifyWebApi.getMyTopTracks({ limit: 5 }).then(response => {
			this.setState({ topSongs: response.items.map(item => item) });
			clearInterval(this.timerID);
		});
	}
	getDate = () => {
		let curr_time = new Date();
		let day = curr_time.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		let month = curr_time.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		let year = curr_time.getFullYear();
		const date = month + "/" + day + "/" + year;

		let hours = curr_time.getHours();
		if(hours < 10) {
			hours = "0" + hours;
		}
		let minutes = curr_time.getMinutes();
		if(minutes < 10) {
			minutes = "0" + minutes;
		}
		let seconds = curr_time.getSeconds();
		if(seconds < 10) {
			seconds = "0" + seconds;
		}
		const time = hours+":"+minutes+":"+seconds;

		return [date, time];
	};
	createSnip = (track) => {
		const [date, time] = this.getDate()
		let newSnip = {
			userId: this.state.userId,
			type: "spotify",
			songURI: track.uri,
			numLikes: 0,
			date: date,
			time: time,
			canLike: true
		};
		const oldSnips = this.state.snips;
		let newSnips = [newSnip, ...oldSnips];
		this.setState({snips: newSnips})
	};
	handleLike = snip => {
		let arr = this.state.snips;
		const index = arr.indexOf(snip);
		arr[index].numLikes++;
		arr[index].canLike = !arr[index].canLike;
		this.setState({ snips: arr });
	};
	handleUnlike = snip => {
		let arr = this.state.snips;
		const index = arr.indexOf(snip);
		arr[index].numLikes--;
		arr[index].canLike = !arr[index].canLike;
		this.setState({ snips: arr });
	};
	render() {
		const loggedIn = this.state.loggedInSpotify;
		const spotifyUser = this.state.userId;
		// todo: make banner include spotify loggedin status
		const topSongs = this.state.topSongs;
		const snips = this.state.snips;
		return (
			<div>
				<Banner
					loggedIn={this.props.loggedIn}
					username={this.props.username}
					spotifyUser={spotifyUser}
					logout={this.props.logout}
				/>
				<div className="display-flex">
				<div className="user-info-text">
				{loggedIn ? null : <LoginToSpotify />}
				{loggedIn ? <SnipsContainer
									allSnips={snips}
									topSongs={topSongs}
									createSnip={this.createSnip}
									handleLike={this.handleLike}
									handleUnlike={this.handleUnlike}
									spotifyWebApi={spotifyWebApi}
								/> : null}</div></div>
			</div>
		);
	}
}

// export default LoggedInPage;
