import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

const Navigation = () => {
	return (
			<div>
				<div>
					<Link to="/login">Login</Link>
				</div>
				<div>
					<Link to="/register">Register</Link>
				</div>
			</div>
	)
}


export default Navigation
