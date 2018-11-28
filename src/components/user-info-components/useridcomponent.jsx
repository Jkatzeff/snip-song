import React from 'react';

const UserIdComponent = (props) => {
  return (
    <div className="bg-warning user-info-id">
	  					<div className="user-info-text">
	  						{"Username: " + props.userId}
	  					</div>
	  				</div>
  )
}

export default UserIdComponent;