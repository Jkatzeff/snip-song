import React from 'react';
import EmbeddedSong from './embeddedsong.jsx'
import UserInfo from './userinfo.jsx'

//Default values for Snips
export default class Snip extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	// constructor(props) {
	// 	super(props);
	// }

	render() {
		const songURI = this.props.data.songURI
		const userId = this.props.data.userId
		const numLikes = this.props.data.numLikes
		const date = this.props.data.date
		const time = this.props.data.time
		return (

				<div class={"container"} style={{border: "9px solid black", borderStyle: "double", float: "left", padding: "12px", width: "40%", backgroundColor: "#FEF3D7"}}>
					<div class={"row"}>
						<div class={"col"}>
							<EmbeddedSong songURI={songURI} />
						</div>
						<div class={"col"}>
							<UserInfo userId={userId} numLikes={numLikes} date={date} time={time} onLike={this.props.onLike} data={this.props.data}/>
						</div>
					</div>
				</div>
		);
	}
}
