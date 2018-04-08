import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class AddAlbum extends React.Component {
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
    this.props.onAlbumInput({name, description})
  }
  render() {
    return (
      <div>
      	<div>
        <p className={this.props.infoClass}>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}} className="gallery-form">
          <ul>
            <li>
              <label>Name</label>
              <input type="text" id="name" />
            </li>
            <li>
              <label>Description</label>
              <input type="text" id="description" />
            </li>
            <li>
              <input type="submit" onClick = {this.sendAlbumInfo} />
            </li>
          </ul>
          </form>
      </div>
      </div>
    )
  }
}

AddAlbum.propTypes = {
	info: PropTypes.string.isRequired,
  	infoClass: PropTypes.string.isRequired,
  	onAlbumInput: PropTypes.func.isRequired,
  	clearInfo: PropTypes.func.isRequired,
}

export default AddAlbum
