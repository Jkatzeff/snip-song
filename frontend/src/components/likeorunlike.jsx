import React from "react";

const LikeOrUnlike = ({ onLike, onUnlike }) => {
	return props.canLike ? (
		<a
			href="#"
			className="user-info-action-like"
			onClick={() => onLike(props.data)}
		>
			<div className="user-info-text">Like!</div>
		</a>
	) : (
		<a
			href="#"
			className="user-info-action-dislike"
			onClick={() => onUnlike(props.data)}
		>
			<div className="user-info-text">Unlike!</div>
		</a>
	);
};

export default LikeOrUnlike;
