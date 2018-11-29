import React from 'react';
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
					<div className="flex-one">Password:</div><input type="text" id="password"></input>
				</div>
				<input type="submit" onClick={() => this.props.checkLogin()} id="submit" className="submit"></input>
			</div>
		);
	}
}
