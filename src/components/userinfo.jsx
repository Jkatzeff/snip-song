import React from 'react';

const UserInfo = (props) => {
  return ( 
  	<div class={"container"}>
  		<div class={"col"} >
  			<div style={{border: "1px dotted red", backgroundColor: "rgba(64, 128, 200, 0.3)"}} class={"row"}>
  				{"Username: " + props.userId}
  			</div>
  			<button class={"row"} style={{backgroundColor: "rgba(100, 100, 255, 0.9)"}} onClick={() => props.onLike(props.data)}>
  				{"Likes: " +props.numLikes}
  			</button>
  			<div class={"row"} style={{backgroundColor: "rgba(50, 0, 122, 0.1)"}}>
  				{"Posted on " + props.date + " at " + props.time}
  			</div>
  		</div>
  	</div>
  )
}

export default UserInfo;