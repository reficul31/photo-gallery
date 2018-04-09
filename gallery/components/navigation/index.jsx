import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

const Navigation = () => {
	return (
		<div className="w3-bar w3-xxlarge w3-black">
		    <span className="w3-left w3-xxlarge">PhotoChef</span>
		    <span className="w3-right w3-large">
		      <span className="navbar-text"><Link to="/gallery/album">Album</Link></span>
		      <span className="navbar-text"><Link to="/gallery">Profile</Link></span>
		      <span className="navbar-text"><a href="/logout">Logout</a></span>
		    </span>
		</div>
	)
}


export default Navigation
