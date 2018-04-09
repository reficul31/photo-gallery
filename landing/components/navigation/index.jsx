import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

const Navigation = () => {
	return (
			<div className="w3-bar w3-xlarge">
				<span className="w3-left">PhotoChef</span>
				<div className="w3-right">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			</div>
	)
}


export default Navigation
