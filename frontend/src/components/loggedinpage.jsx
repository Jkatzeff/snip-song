import React from "react";
import SnipsContainer from "./snipscontainer.jsx";
import Banner from "./banner.jsx";
import LoginToSpotify from "./logintospotify.jsx";
import axios from "axios";
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
			spotifyUsername: "",
			topSongs: [],
			snips: []
		};
		if (token) {
			spotifyWebApi.setAccessToken(token);
		}
		//purely for aesthetic reasons for loading snips...can remove V
		this.sleep(500).then(() => this.getNewSnips());
		// this.getNewSnips();
	}
	sleep = ms => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};
	componentDidMount() {
		if (this.state.spotifyUsername === "") {
			this.timerID = setInterval(() => {
				this.getCurrentUser();
				this.getTopSongs();
			}, 3000);
		}
		this.getSnipsInterval = setInterval(() => {
			this.getNewSnips();
		}, 10000);
	}
	componentWillUnmount() {
		if (this.timerID) {
			clearInterval(this.timerID);
		}
	}
	addSnipToDb = snip => {
		return new Promise((resolve, reject) => {
			axios.post("/api/addSnip", snip).then(response => {
				console.log(response);
				if (response.data.success === true) {
					console.log("successfully added snip to db");
					resolve(0);
				} else {
					console.log("error in adding snip:");
					console.log(response.data.err);
					reject(-1);
				}
			});
		});
		// axios.post("/api/addSnip", newSnip)
		// 	 .then(response => {
		// 	 	console.log(response);
		// 	 	if(response.data.success === true){
		// 			console.log('success')
		// 	 	}else{
		// 	 		console.log("error in adding snip:")
		// 	 		console.log(response.data.err);
		// 	 	}
		// 	 })
	};
	getNewSnips() {
		axios
			.post("/api/getNSnips", {
				username: this.props.username,
				numSnips: 25
			})
			.then(response => {
				if (response.data.success) {
					this.setState({ snips: response.data.snips });
				} else {
					console.log(response.data.err);
				}
			});
	}

	getCurrentUser() {
		spotifyWebApi.getMe([]).then(response => {
			this.setState({ spotifyUsername: response.id });
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
		if (hours < 10) {
			hours = "0" + hours;
		}
		let minutes = curr_time.getMinutes();
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		let seconds = curr_time.getSeconds();
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		const time = hours + ":" + minutes + ":" + seconds;

		return [date, time];
	};
	createSnip = track => {
		const [date, time] = this.getDate();
		let newSnip = {
			userId: this.props.username,
			type: "spotify",
			songURI: track.uri,
			numLikes: 0,
			date: date,
			time: time,
			canLike: true
		};
		const oldSnips = this.state.snips;
		let newSnips = [newSnip, ...oldSnips];
		this.setState({ snips: newSnips });
		this.addSnipToDb(newSnip).then(() => this.getNewSnips());
		// axios.post("/api/addSnip", newSnip)
		// 	 .then(response => {
		// 	 	console.log(response);
		// 	 	if(response.data.success === true){
		// 			console.log('success')
		// 	 	}else{
		// 	 		console.log("error in adding snip:")
		// 	 		console.log(response.data.err);
		// 	 	}
		// 	 }).then(() => {
		// 	 	this.getNewSnips();
		// 	 })
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
		const spotifyUser = this.state.spotifyUsername;
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
				<div className="-flex">
					<div className="user-info">
						{loggedIn ? null : <LoginToSpotify />}
						{loggedIn ? (
							<SnipsContainer
								allSnips={snips.reverse()}
								topSongs={topSongs}
								createSnip={this.createSnip}
								handleLike={this.handleLike}
								handleUnlike={this.handleUnlike}
								spotifyWebApi={spotifyWebApi}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

// export default LoggedInPage;
