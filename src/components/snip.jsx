import React from 'react';
import EmbeddedSong from './embeddedsong.jsx'
import UserInfo from './userinfo.jsx'

//Default values for Snips
export default class Snip extends React.Component {
	constructor(){
		super()
		this.state = {canLike: true}
	}
	render() {
		const {songURI, userId, numLikes, date, time, canLike} = this.props.data;
		return (

				<div className="border border-dark border-9" style={{backgroundColor: "#FEF3D7"}}>
					<div className="row">
						<div class="col-3">
							<EmbeddedSong songURI={songURI} />
						</div>
						<div className="col-9">
							<UserInfo canLike={canLike} userId={userId} numLikes={numLikes} date={date} time={time} onLike={this.props.onLike} onUnlike={this.props.onUnlike} data={this.props.data}/>
						</div>
					</div>
				</div>
		);
	}
}
