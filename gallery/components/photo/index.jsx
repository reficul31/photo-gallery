import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

const Photo = ({children, location}) => {
  return (
    <div className="w3-container w3-center">
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">PHOTOS</h1>
        <hr></hr>
        <button className="w3-button w3-circle w3-teal" title="Add Photos"><Link to='/gallery/photo/add'>Add</Link></button>
        <button className="w3-button w3-circle w3-black" title="View Photos"><Link to='/gallery/photo/view'>View</Link></button>
      </div>
      {children}
    </div>
  )
}

Photo.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
}

export default Photo
