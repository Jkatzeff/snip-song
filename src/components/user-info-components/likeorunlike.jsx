import React from 'react';

const LikeOrUnlike = (props) =>{ 
	return(props.canLike ? 
	  					<a href="#" className="user-info-action-like" onClick={() => props.onLike(props.data)}>
	  						<div className="user-info-text">Like!</div>
	  					</a>
	  					:
	  					<a href="#" className="user-info-action-dislike" onClick={() => props.onUnlike(props.data)}>
	  						<div className="user-info-text">Unlike!</div>
	  					</a>)}
  

export default LikeOrUnlike;