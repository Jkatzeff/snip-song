import React from "react";

const PostNewSnip = ({topSongs, createSnip}) => {
	return (
		<div className="snip-container">
			<div className="snip">
				{topSongs.map(track => {return (
					<button
						onClick={() => {createSnip(track)}}
						className="flex-one display-flex"
					>
						{track.name}
					</button>
				)})}
			</div>
		</div>
	);
};

export default PostNewSnip;
