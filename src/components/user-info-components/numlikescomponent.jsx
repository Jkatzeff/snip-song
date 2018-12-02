import React from "react";

const NumLikesComponent = ({numLikes}) => {
	return (
		<div className="bg-info user-info-likes">
			<div className="user-info-text">{"Likes: " + numLikes}</div>
		</div>
	);
};

export default NumLikesComponent;
