import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

var renderRoutes = (location) => {
  if(location.pathname == "/gallery/album/view")
    return (
      <div>
        <Link to='/gallery/album/add'><button className="w3-button w3-circle w3-black" title="Add Album">Add</button></Link>
        <button className="w3-button w3-circle w3-teal" title="View Album">View</button>
      </div>
      )
  else
    return (
      <div>
        <button className="w3-button w3-circle w3-teal" title="Add Album">Add</button>
        <Link to='/gallery/album/view'><button className="w3-button w3-circle w3-black" title="View Album">View</button></Link>
      </div>
      )
}

const Album = ({children, location}) => {
  return (
    <div className="w3-container w3-center">
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">ALBUMS</h1>
        <hr></hr>
        {renderRoutes(location)}
      </div>
      {children}
    </div>
  )
}

Album.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
}

export default Album
