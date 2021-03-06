import React from "react";
import Snip from "./snip.jsx";
import SearchForTrack from "./searchfortrack.jsx";
import PostNewSnip from "./postnewsnip.jsx";

export default class SnipsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show_top_songs: false };
	}
	show_or_hide() {
		const old = this.state.show_top_songs;
		this.setState({ show_top_songs: !old });
	}
	render() {
		const show = this.state.show_top_songs;
		const {
			topSongs,
			allSnips,
			handleLike,
			handleUnlike,
			createSnip,
			spotifyWebApi
		} = this.props;
		return (
			<div>
				<br />
				<div className="display-flex">
				<div className="user-info-text">
				<button
					onClick={() => {
						this.show_or_hide();
					}}
				>
					{show ? "Hide top songs?" : "Show top songs?"}
				</button></div>
				</div>
				{show ? (
					<PostNewSnip topSongs={topSongs} createSnip={createSnip} />
				) : null}
				<SearchForTrack
					spotifyWebApi={spotifyWebApi}
					createSnip={createSnip}
				/>
				<div className="snip-container">
					{allSnips.length > 0 ? allSnips.map((data, index) => (
						<Snip
							key={data + index}
							data={data}
							onLike={handleLike}
							onUnlike={handleUnlike}
						/>

					))
					: <div className="center1"><div className="center2"><h4>Loading; Snips...</h4></div></div>
				}
				</div>
			</div>
		);
	}
}
