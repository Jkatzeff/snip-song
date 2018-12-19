import React from 'react';
import spotifyLogo from '../spotify-logo.svg';

const LoginToSpotify = () => {
  return (
    <div>
	  <a href="http://localhost:8888/login">
	    <img src={spotifyLogo} alt="spotify logo" height={40} width={40}/>
	  </a>
	  <div size={20}>Authorize Spotify</div>
	  <br/>
	</div>
  )
}

export default LoginToSpotify;