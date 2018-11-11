import React from 'react';

const UserInfo = (props) => {
  return ( 
  	<div class={"container"} style={{float: "left"}}>
  		<div class={"col"} >
  			<div style={{border: "1px dotted red", float: "left"}} class={"row"}>
  				{"Username: " + props.userId}
  			</div>
  			<button class={"row"} onClick={() => props.onLike(props.data)}>
  				{"Likes: " +props.numLikes}
  			</button>
  			<div class={"row"}>
  				{"Posted on " + props.date + " at " + props.time}
  			</div>
  		</div>
  	</div>
  )
}

export default UserInfo;