import React from 'react';
import SnipsContainer from "./snipscontainer.jsx";
import Banner from "./banner.jsx"

const LoggedInPage = ({loggedIn, username}) => {
  return (
    <div>
		<Banner loggedIn={loggedIn} username={username}/>
		<SnipsContainer />
	</div>
  )
}

export default LoggedInPage;