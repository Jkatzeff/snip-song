import React from 'react';
import logo from '../spotify-logo.svg'
const Banner = (props) => {
  return (
    <img src={logo} className="spotify-logo flex-one" alt="logo"></img>
  )
}

export default Banner;