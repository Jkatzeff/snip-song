import React from 'react';

const LikeOrUnlike = (props) =>{ 
	return(props.canLike ? 
	  					<button style={{backgroundColor: "rgba(100, 100, 255, 0.9)"}} onClick={() => props.onLike(props.data)}>
	  						Like!
	  					</button>
	  					:
	  					<button style={{backgroundColor: "rgba(155, 155, 0, 0.9)"}} onClick={() => props.onUnlike(props.data)}>
	  						Unlike!
	  					</button>)}
  

export default LikeOrUnlike;