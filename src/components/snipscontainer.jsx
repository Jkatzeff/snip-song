import React from "react";
import Snip from "./snip.jsx";
import PostNewSnip from "./postnewsnip.jsx";


const SnipsContainer = ({topSongs, allSnips, handleLike, handleUnlike, createSnip}) => {
  return (
    <div>
				<PostNewSnip topSongs={topSongs} createSnip={createSnip} />
				<div className="snip-container">
					{allSnips.map((data, index) => (
						<Snip
							key={data + index}
							data={data}
							onLike={handleLike}
							onUnlike={handleUnlike}
						/>
					))}
				</div>
			</div>
  )
}

export default SnipsContainer;
