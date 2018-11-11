import React from 'react';

const EmbeddedSong = (props) => {
	return (
  	<iframe 
	  	src={"https://open.spotify.com/embed/track/" + props.songURI.split(":")[2]} 
		style={{height: 80, width: "100%", float:"left"}}
		frameborder={0} 
		allowtransparency={"true"} 
		allow={"encrypted-media"}>
	</iframe>
  )
}

export default EmbeddedSong;