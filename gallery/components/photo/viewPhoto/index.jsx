import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ViewPhoto extends React.Component {
    constructor(props) {
    super(props);
    this.deletePhotoClicked = this.deletePhotoClicked.bind(this);
  }
  componentWillMount() {
    this.props.onComponentMount(this.props.album)
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  deletePhotoClicked(photo) {
    this.props.onDeletePhoto(photo)
  }
  render() {
    return (
      <div className="table-container">
        <p className={this.props.infoClass}>{this.props.info}</p>
          {this.props.photos.map((photo, idx) => {
            return (
            	<div key={idx}>
	              <p>{photo.name}</p>
                  <p>{photo.description}</p>
	              <p>{parseInt(photo.privacy) == 0?"Private":"Public"}</p>
                  <p>{photo.created}</p>
                  <p><button onClick={() => {this.deletePhotoClicked(photo)}}>delete</button></p>
            	</div>
            )
          })}
      </div>
    )
  }
}

ViewPhoto.propTypes = {
    photos: PropTypes.array.isRequired,
  	info: PropTypes.string.isRequired,
  	infoClass: PropTypes.string.isRequired,
  	clearInfo: PropTypes.func.isRequired,
  	onDeletePhoto: PropTypes.func.isRequired,
  	onComponentMount: PropTypes.func.isRequired,
}

export default ViewPhoto
