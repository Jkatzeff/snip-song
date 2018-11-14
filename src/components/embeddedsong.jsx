import React from 'react';

const EmbeddedSong = (props) => {
	return (
	<div className="row">
	<div className="col">
  	<iframe 
	  	src={"https://open.spotify.com/embed/track/" + props.songURI.split(":")[2]} 
		frameBorder="0" 
		allowtransparency={"true"} 
		allow={"encrypted-media"}
		title={props.songURI.split(":")[2]}>
	</iframe></div>
	 </div>
  )
}

export default EmbeddedSong;