import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

const Photo = ({children, location}) => {
  return (
    <div>
      <div>
        <div>Photos</div>
        <Link to='/gallery/photo/add'>Add</Link>
        <Link to='/gallery/photo/view'>View</Link>
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
