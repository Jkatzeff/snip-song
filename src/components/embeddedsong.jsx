import React from "react";

const EmbeddedSong = props => {
	return (
		<iframe
			className="embedded-song"
			src={
				"https://open.spotify.com/embed/track/" +
				props.songURI.split(":")[2]
			}
			frameBorder="0"
			allowtransparency={"true"}
			allow={"encrypted-media"}
			title={props.songURI.split(":")[2]}
		/>
	);
};

export default EmbeddedSong;
