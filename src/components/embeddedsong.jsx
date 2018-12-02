import React from "react";

const EmbeddedSong = ({songURI}) => {
	return (
		<iframe
			className="embedded-song"
			src={
				"https://open.spotify.com/embed/track/" +
				songURI.split(":")[2]
			}
			frameBorder="0"
			allowtransparency={"true"}
			allow={"encrypted-media"}
			title={songURI.split(":")[2]}
		/>
	);
};

export default EmbeddedSong;
