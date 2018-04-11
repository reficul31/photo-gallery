import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

var renderRoutes = (location) => {
  if(location.pathname == "/gallery/photo/view")
    return (
      <div>
        <Link to='/gallery/photo/add'><button className="w3-button w3-circle w3-black" title="Add Photo">Add</button></Link>
        <button className="w3-button w3-circle w3-teal" title="View Photo">View</button>
      </div>
      )
  else
    return (
      <div>
        <button className="w3-button w3-circle w3-teal" title="Add Photo">Add</button>
        <Link to='/gallery/photo/view'><button className="w3-button w3-circle w3-black" title="View Photo">View</button></Link>
      </div>
      )
}

const Photo = ({children, location}) => {
  return (
    <div className="w3-container w3-center">
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">PHOTOS</h1>
        <hr></hr>
        {renderRoutes(location)}
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
