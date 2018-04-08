import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import classNames from 'classnames'

const Album = ({children, location}) => {
  return (
    <div>
      <div>
        <div>Albums</div>
        <Link className="table-button" to='/gallery/album/add'>Add</Link>
        <Link className="table-button" to='/gallery/album/edit'>Edit</Link>
        <Link className="table-button" to='/gallery/album/view'>View</Link>
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
