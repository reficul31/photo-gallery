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
      <div>
        <p className={this.props.infoClass}>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}} className="admin-form">
            <div className="w3-third">
              <input className="w3-input w3-border" type="text" id="name" placeholder="Name" defaultValue={this.props.album.name}/>
            </div>
            <div className="w3-third">
              <input className="w3-input w3-border" type="text" id="description" placeholder="Description" defaultValue={this.props.album.description}/>
            </div>
            <div className="w3-third">
              <select className="w3-input w3-border" name="privacy" form="privacy" id="privacy">
                <option value="0">Private</option>
                <option value="1">Pubdivc</option>
              </select>
            </div>
            <div className="w3-full">
              <input className="w3-input w3-border" type="submit" onClick = {this.sendAlbumInfo}/>
            </div>
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
