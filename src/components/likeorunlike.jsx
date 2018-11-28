import React from 'react';

const LikeOrUnlike = (props) =>{ 
	return(props.canLike ? 
	  					<button className="user-info-action-like" onClick={() => props.onLike(props.data)}>
	  						<div className="user-info-text">Like!</div>
	  					</button>
	  					:
	  					<button className="user-info-action-dislike" onClick={() => props.onUnlike(props.data)}>
	  						<div className="user-info-text">Unlike!</div>
	  					</button>)}
  

export default LikeOrUnlike;