import React from "react";
import PostNewSnip from "./postnewsnip.jsx"
export default class SearchForTrack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			query_response: ""
		};
	}
	searchForTrack(query) {
		this.props.spotifyWebApi
			.searchTracks([query])
			.then(response => {
				this.setState({ active: true, query_response: response.tracks.items });
			});
	}
	onCreate = () => {
		this.setState({active: false})
	}

	render() {
		const response = this.state.query_response;
		const active = this.state.active;
		return (
			<div>
				<div>
								<div className="display-flex">
				<div className="user-info-text">

					<input id="query" type="text" /></div></div>
									<div className="display-flex">
				<div className="user-info-text">

					<button
						href="#"
						className="flex-one"
						onClick={() => {
							this.searchForTrack(
								document.getElementById("query").value
							);
							document.getElementById("query").value = "";
						}}
					>
						<div>Search for track.</div>
					</button></div></div>
				</div>
				<br/>
				{(response && active) ? 
					<div>
					<button onClick={() => this.onCreate()}>Hide list.</button>
					<PostNewSnip topSongs={response} createSnip={this.props.createSnip} onCreate={this.onCreate}/>
					</div>
					: null}
			</div>
		);
	}
}
