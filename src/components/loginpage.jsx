import React from 'react';
import DefaultLoginPage from './login-page-components/defaultloginpage.jsx'

export default class LogInPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="login-page">
				<DefaultLoginPage checkLogin={this.props.checkLogin}/>
			</div>
		);
	}
}
