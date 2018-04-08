import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class EditAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.sendAlbumInfo = this.sendAlbumInfo.bind(this);
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  sendAlbumInfo() {
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const privacy = parseInt(document.getElementById('privacy').value)
    this.props.onEditAlbum({name, description, privacy})
  }
  render() {
    return (
      <div className="form-container">
        <p className={this.props.infoClass}>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}} className="admin-form">
          <ul>
            <li>
              <label>Name</label>
              <input type="text" id="name" placeholder="Name" defaultValue={this.props.album.name}/>
            </li>
            <li>
              <label>Description</label>
              <input type="text" id="description" placeholder="Description" defaultValue={this.props.album.description}/>
            </li>
            <li>
              <label>Privacy</label>
              <select name="privacy" form="privacy" id="privacy">
                <option value="0">Private</option>
                <option value="1">Public</option>
              </select>
            </li>
            <li>
              <input type="submit" onClick = {this.sendAlbumInfo}/>
            </li>
          </ul>
          </form>
      </div>
    )
  }
}

EditAlbum.propTypes = {
  album: PropTypes.object.isRequired,
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onEditAlbum: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
}

export default EditAlbum
