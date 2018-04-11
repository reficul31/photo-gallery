import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

var renderRoutes = (location) => {
  if(location.pathname == "/gallery/user/edit")
    return (
        <div>
          <Link to='/gallery/user/view'><button className="w3-button w3-circle w3-black" title="View User">Profile</button></Link>
          <button className="w3-button w3-circle w3-teal" title="Edit User">Edit</button>
        </div>
      )
  else
    return (
        <div>
          <button className="w3-button w3-circle w3-teal" title="View User">Profile</button>
          <Link to='/gallery/user/edit'><button className="w3-button w3-circle w3-black" title="Edit User">Edit</button></Link>
        </div>
      )
}

const User = ({children, location}) => {
  return (
    <div className="w3-container w3-center">
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">USER</h1>
        <hr></hr>
        {renderRoutes(location)}
      </div>
      {children}
    </div>
  )
}

User.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
}

export default User
