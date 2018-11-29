import React from "react";
import LikeOrUnlike from "./user-info-components/likeorunlike.jsx";
import UserIdComponent from "./user-info-components/useridcomponent.jsx";
import NumLikesComponent from "./user-info-components/numlikescomponent.jsx";
import TimeComponent from "./user-info-components/timecomponent.jsx";

const UserInfo = props => {
	return (
		<div className="user-info">
			<div className="user-info-container-1">
				<UserIdComponent userId={props.userId} />
				<NumLikesComponent numLikes={props.numLikes} />
			</div>
			<LikeOrUnlike
				canLike={props.canLike}
				data={props.data}
				onLike={props.onLike}
				onUnlike={props.onUnlike}
			/>
			<TimeComponent date={props.date} time={props.time} />
		</div>
	);
};

export default UserInfo;
