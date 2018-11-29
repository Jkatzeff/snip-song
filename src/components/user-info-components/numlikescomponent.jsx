import React from "react";

const NumLikesComponent = props => {
	return (
		<div className="bg-info user-info-likes">
			<div className="user-info-text">{"Likes: " + props.numLikes}</div>
		</div>
	);
};

export default NumLikesComponent;
