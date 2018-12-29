import React from "react";
import logo from "../spotify-logo.svg";
const Banner = ({ loggedIn, username, spotifyUser, logout }) => {
	return (
		<div className="banner display-flex">
			{loggedIn ? (
				<div className="flex-one banner-text">
					<h3>
						Welcome, {username}.{" "}
						{spotifyUser
							? "Logged in as " + spotifyUser + " on Spotify."
							: ""}
					</h3>
				</div>
			) : (
				<div className="flex-two banner-text">
					<h3>
						Welcome to Snip-Song! Powered by Spotify. Please
						register or login.
					</h3>
				</div>
			)}
			<div className="flex-one display-flex">
				<div className="flex-one">Powered by Spotify (and you!) </div>
				<div className="flex-one">
					<img src={logo} className="spotify-logo" alt="logo" />
				</div>
				{loggedIn ? (
					<div className="flex-one">
						<a href="" onClick={() => logout()}>
							<h3> Log out. </h3>
						</a>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Banner;
