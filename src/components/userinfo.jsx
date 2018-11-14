import React from 'react';
import LikeOrUnlike from './likeorunlike.jsx'
const formatTime = (date, time) => {
	const base = "Posted on " + date + " at " + time;
	return base;
}

const UserInfo = (props) => {
  return ( <div>
	  			<div className="col" >
	  				<div className="bg-warning">
	  					{"Username: " + props.userId}
	  				</div>
	  			</div>
	  			<div className="col">
	  				<div className="bg-info">
	  	  				{"Likes: " +props.numLikes}
	  	  			</div>
	  			</div>
	  			<div className="col">				
	  				<LikeOrUnlike canLike={props.canLike} data={props.data} onLike={props.onLike} onUnlike={props.onUnlike}/>  					
	  			</div>
	  			<div className="col">
	  				<div className="bg-primary">
	  					{formatTime(props.date,props.time)}
	  				</div>
	  			</div>
  			</div>
  )
}

export default UserInfo;