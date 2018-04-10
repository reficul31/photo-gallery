import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ShowcaseAlbum extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      this.props.onComponentMount(this.props.params.albumId)
    }
    render() {
      let photos = this.props.album.photos == undefined ? [] : this.props.album.photos
      return (
        <div className="w3-container">
          <p className={this.props.infoClass}>{this.props.info}</p>
          <div className="w3-display-container w3-light-grey w3-text-black">
            <h3>Album Name : {this.props.album.name}</h3>
            <h3>Album Description : {this.props.album.description}</h3>
            <h3>Album Created : {this.props.album.created}</h3>
          </div>
          {photos.map((photo, idx) => {
            return (
              <div key={idx} className="w3-row">
                <div className="w3-col s3 w3-dark-grey w3-center w3-text-white">
                  <h4>NAME : {photo.name}</h4>
                  <h4>DESCRIPTION : {photo.description}</h4>
                  <h4>UPLOADED : {photo.created}</h4>
                </div>
                <div className="w3-col s9 w3-center">
                  <img src={"/images/"+photo.name+".png"} />
                </div>
              </div>
            )
          })}
        </div>
      )
    }
}

ShowcaseAlbum.propTypes = {
  album: PropTypes.object.isRequired,
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  clearInfo: PropTypes.func.isRequired,
  onComponentMount: PropTypes.func.isRequired,
}

export default ShowcaseAlbum
