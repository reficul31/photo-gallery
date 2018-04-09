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
    const privacy = parseInt(document.getElementById('privacy').value)
    this.props.onAlbumInput({name, description, privacy})
  }
  render() {
    return (
      <div>
      	<div>
        <p className={this.props.infoClass}>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}}>
            
              <div className="w3-third">
                <input className="w3-input w3-border" type="text" id="name" placeholder="Name"/>
              </div>
              <div className="w3-third">
                <input className="w3-input w3-border" type="text" id="description" placeholder="Description"/>
              </div>
              <div className="w3-third">
                <select name="privacy" form="privacy" id="privacy" className="w3-input w3-border" >
                  <option value="0">Private</option>
                  <option value="1">Public</option>
                </select>
              </div>
              <div className="w3-full">
                <input className="w3-input w3-border" type="submit" onClick = {this.sendAlbumInfo} />
              </div>
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
