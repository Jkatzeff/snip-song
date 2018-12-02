import React from 'react';
import Banner from '../banner.jsx'

const DefaultLoginPage = ({checkLogin, register}) => {
  return (
    <div className="default-login-page">
		<div className="enter-username">
			<div className="flex-one">Username:</div> <input type="text" id="username"></input>
		</div>
		<div className="enter-password">
			<div className="flex-one">Password:</div><input type="password" id="password"></input>
		</div>
		<div className="flex-basis-thirty">
			<input type="submit" onClick={() => checkLogin()} id="submit" className="submit"></input>
			<input type="submit" onClick={() => register()} id="register" className="register" value="Register"></input>
		</div>
	</div>
  )
}

export default DefaultLoginPage;