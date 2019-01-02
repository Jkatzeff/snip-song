import React from "react";
import DefaultLoginPage from "./login-page-components/defaultloginpage.jsx";
import Banner from "./banner.jsx";

const LogInPage = ({ username, checkLogin, loggedIn, register }) => {
	return (
		<div>
			<Banner username={username} loggedIn={loggedIn} />
			<div className="login-page">
				<DefaultLoginPage checkLogin={checkLogin} register={register} />
			</div>
		</div>
	);
};

export default LogInPage;
