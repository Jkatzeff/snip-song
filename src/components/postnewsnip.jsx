import React from "react";

const PostNewSnip = props => {
	return (
		<div className="snip-container">
			<div className="snip">
				{props.songs.map(snip => (
					<button
						onClick={() => {}}
						className="flex-one display-flex"
					>
						{snip}
					</button>
				))}
			</div>
		</div>
	);
};

export default PostNewSnip;
