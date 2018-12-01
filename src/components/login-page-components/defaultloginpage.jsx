import React from 'react';
import Banner from '../banner.jsx'
export default class DefaultLoginPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="default-login-page">
				<div className="enter-username">
					<div className="flex-one">Username:</div> <input type="text" id="username"></input>
				</div>
				<div className="enter-password">
					<div className="flex-one">Password:</div><input type="password" id="password"></input>
				</div>
				<div className="flex-basis-thirty">
					<input type="submit" onClick={() => this.props.checkLogin()} id="submit" className="submit"></input>
					<input type="submit" onClick={() => this.props.register()} id="register" className="register" value="Register"></input>
				</div>
			</div>
		);
	}
}
