import React from "react";
import logo from "../spotify-logo.svg";
const Banner = props => {
	console.log(props.loggedIn);
	return (
		<div className="banner">
			{props.loggedIn ? (
				<div className="flex-two banner-text">
					<h3>Welcome, {props.username}. Click here to ...</h3>
				</div>
			) : (
				<div className="flex-two banner-text">
					<h3>
						Welcome to Snip-Song! Powered by Spotify. Please
						register or login.
					</h3>
				</div>
			)}
			<div className="flex-one">
				<div className="flex-one">
					<div>Powered by Spotify (and you!) </div>

					<img src={logo} className="spotify-logo" alt="logo" />
				</div>
			</div>
		</div>
	);
};

export default Banner;
