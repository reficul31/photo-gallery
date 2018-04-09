import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

const User = ({children, location}) => {
  return (
    <div className="w3-container w3-center">
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">USER</h1>
        <hr></hr>
        <button className="w3-button w3-circle w3-teal" title="Edit User"><Link to='/gallery/user/edit'>Edit</Link></button>
        <button className="w3-button w3-circle w3-black" title="View User"><Link to='/gallery/user/view'>Profile</Link></button>
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
