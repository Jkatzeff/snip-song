import React from 'react';
import DefaultLoginPage from './login-page-components/defaultloginpage.jsx'
import Banner from './banner.jsx'

export default class LogInPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Banner username={this.props.username} loggedIn={this.props.loggedIn}/>
				<div className="login-page">
					<DefaultLoginPage 
						checkLogin={this.props.checkLogin}
						register={this.props.register}/>
				</div>
			</div>
		);
	}
}
