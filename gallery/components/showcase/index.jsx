import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

const Showcase = ({children, location}) => {
  return (
    <div className="w3-container w3-center">
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">SHOWCASE</h1>
        <hr></hr>
      </div>
      {children}
    </div>
  )
}

Showcase.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
}

export default Showcase
