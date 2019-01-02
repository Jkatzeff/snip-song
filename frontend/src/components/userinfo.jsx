import React from "react";
import LikeOrUnlike from "./user-info-components/likeorunlike.jsx";
import UserIdComponent from "./user-info-components/useridcomponent.jsx";
import NumLikesComponent from "./user-info-components/numlikescomponent.jsx";
import TimeComponent from "./user-info-components/timecomponent.jsx";

const UserInfo = ({
	userId,
	numLikes,
	canLike,
	data,
	onLike,
	onUnlike,
	date,
	time
}) => {
	return (
		<div className="user-info">
			<div className="user-info-container-1">
				<UserIdComponent userId={userId} />
				<NumLikesComponent numLikes={numLikes} />
			</div>
			<LikeOrUnlike
				canLike={canLike}
				data={data}
				onLike={onLike}
				onUnlike={onUnlike}
			/>
			<TimeComponent date={date} time={time} />
		</div>
	);
};

export default UserInfo;
