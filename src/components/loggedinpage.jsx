import React from 'react';
import SnipsContainer from "./snipscontainer.jsx";
import Banner from "./banner.jsx"

export default class LoggedInPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Banner />
				<SnipsContainer />
			</div>
		);
	}
}
