import React from "react";
import spotifyLogo from "../spotify-logo.svg";

const LoginToSpotify = () => {
	return (
		<div className="">
			<div className="user-info-text">
				<a href="http://localhost:8888/login">
					<div className="flex-and-display">
						<div className="user-info-text">
							<img
								src={spotifyLogo}
								alt="spotify logo"
								height={40}
								width={40}
							/>
						</div>
					</div>
				</a>
				<div className="display-flex">
					<div className="user-info-text">
						<div size={20}>Authorize Spotify</div>
					</div>
					>
				</div>
			</div>
		</div>
	);
};

export default LoginToSpotify;
