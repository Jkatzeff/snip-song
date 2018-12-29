import React from "react";

const UserIdComponent = ({userId}) => {
	return (
		<div className="bg-warning user-info-id">
			<div className="user-info-text">{"Username: " + userId}</div>
		</div>
	);
};

export default UserIdComponent;
