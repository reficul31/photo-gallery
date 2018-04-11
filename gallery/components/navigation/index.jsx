import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

import routes from '../../routes'

var buildRoutes = (location) => {
	return (
		<span className="w3-right w3-large">
			{routes.map((route, idx) => {
				if(route.subPaths.indexOf(location.pathname) != -1)
					return (
						<span key={idx} className="navbar-text w3-text-blue">
							<Link to={route.pathname}>{route.name}</Link>
						</span>
					)
				else 
					return (
						<span key={idx} className="navbar-text">
							<Link to={route.pathname}>{route.name}</Link>
						</span>
					)
			})}
	      <span className="navbar-text"><a href="/logout">Logout</a></span>	
		</span>
		)
}

const Navigation = ({location}) => {
	return (
		<div className="w3-bar w3-xxlarge w3-black">
		    <span className="w3-left w3-xxlarge">PhotoChef</span>
		      {buildRoutes(location)}
		</div>
	)
}


export default Navigation
