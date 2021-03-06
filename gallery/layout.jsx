import React from 'react'
import PropTypes from 'prop-types'
import Navigation from './components/navigation'

import classNames from 'classnames'

const Layout = ({children, location}) => (
	<div>
		<Navigation location = {location}/>
		<div>
			{children}
		</div>
	</div>
)

Layout.propTypes = {
	location: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
}

export default Layout
