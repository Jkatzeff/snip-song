import React from 'react';

const formatTime = (date, time) => {
	const base = "Posted on " + date + " at " + time;
	return base;
}

const TimeComponent = ({date, time}) => {
  return (
    <div className="bg-primary user-info-time">
  					<div className="user-info-text">
  						{formatTime(date,time)}
  					</div>
  				</div>
  )
}

export default TimeComponent;