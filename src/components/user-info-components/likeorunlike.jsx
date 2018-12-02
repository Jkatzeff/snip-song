import React from "react";

const LikeOrUnlike = ({canLike, onLike, onUnlike, data}) => {
	return canLike ? (
		<a
			href="#"
			className="user-info-action-like"
			onClick={() => onLike(data)}
		>
			<div className="user-info-text">Like!</div>
		</a>
	) : (
		<a
			href="#"
			className="user-info-action-dislike"
			onClick={() => onUnlike(data)}
		>
			<div className="user-info-text">Unlike!</div>
		</a>
	);
};

export default LikeOrUnlike;
