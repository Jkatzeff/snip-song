import React from 'react';
import LikeOrUnlike from './likeorunlike.jsx'
const formatTime = (date, time) => {
	const base = "Posted on " + date + " at " + time;
	return base;
}

const UserInfo = (props) => {
  return ( <div className="user-info">
  				<div className="bg-warning user-info-id">
  					<div className="user-info-text">
  						{"Username: " + props.userId}
  					</div>
  				</div>
  				<div className="bg-info user-info-likes">
  	  				<div className="user-info-text">
  	  					{"Likes: " + props.numLikes}
  	  				</div>
  	  			</div>
  				<LikeOrUnlike canLike={props.canLike} data={props.data} onLike={props.onLike} onUnlike={props.onUnlike}/>  					
  				<div className="bg-primary user-info-time">
  					<div className="user-info-text">
  						{formatTime(props.date,props.time)}
  					</div>
  			</div>
  			</div>
  )
}

export default UserInfo;