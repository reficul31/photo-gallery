import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.sendPhotoInfo = this.sendPhotoInfo.bind(this);
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  sendPhotoInfo() {
    const photos = document.getElementById('photos').files
    const description = document.getElementById('description').value
    const privacy = parseInt(document.getElementById('privacy').value)
    const albumId = parseInt(this.props.album.id)
    this.props.onPhotoInput({photos, privacy, description, albumId})
  }
  render() {
    return (
      <div>
      	<div>
        <p>Album Name: {this.props.album.name}</p>
        <p className={this.props.infoClass}>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}} className="gallery-form">
          <ul>
            <li>
              <label>Photos</label>
              <input type="file" id="photos" name="photos" accept="image/*" />
            </li>
            <li>
              <label>Description</label>
              <input type="text" id="description" name="description" />
            </li>
            <li>
              <label>Privacy</label>
              <select name="privacy" form="privacy" id="privacy">
                <option value="0">Private</option>
                <option value="1">Public</option>
              </select>
            </li>
            <li>
              <input type="submit" onClick = {this.sendPhotoInfo} />
            </li>
          </ul>
          </form>
      </div>
      </div>
    )
  }
}

AddPhoto.propTypes = {
  info: PropTypes.string.isRequired,
	infoClass: PropTypes.string.isRequired,
  album: PropTypes.object.isRequired,
	onPhotoInput: PropTypes.func.isRequired,
	clearInfo: PropTypes.func.isRequired,
}

export default AddPhoto
