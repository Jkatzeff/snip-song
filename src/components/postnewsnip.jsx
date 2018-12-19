import React from "react";

const PostNewSnip = ({topSongs, createSnip, onCreate}) => {
	const doStuff = (track) => {
		createSnip(track);
		if(onCreate){
			onCreate();
		}
	}
	return (
		<div>
			<div className="default-login-page">
				{topSongs.map(track => {return (
					<button
						onClick={() => {doStuff(track)

						}}
						className="flex-one display-flex"
						key={track.artists[0].name+track.name}
					>
						<div className="flex-one">
						{track.name}
						</div>
						<div className="flex-one">
						{track.artists[0].name}
						</div>
					</button>
				)})}
			</div>
		</div>
	);
};

export default PostNewSnip;
