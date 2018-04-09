import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

const Navigation = () => {
	return (
		<div className="w3-bar w3-xxlarge w3-black">
		    <span className="w3-left">PhotoChef</span>
		    <span className="w3-right">
		      <span><Link to="/gallery/album">Album</Link></span>
		      <span><a href="/logout">Logout</a></span>
		    </span>
		</div>
	)
}


export default Navigation
