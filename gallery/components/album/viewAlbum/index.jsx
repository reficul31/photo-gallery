import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router'

class ViewAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.editAlbumClicked = this.editAlbumClicked.bind(this);
    this.deleteAlbumClicked = this.deleteAlbumClicked.bind(this);
    this.addPhotosInAlbumClicked = this.addPhotosInAlbumClicked.bind(this);
    this.viewPhotosInAlbumClicked = this.viewPhotosInAlbumClicked.bind(this);
  }
  componentWillMount() {
    this.props.onComponentMount()
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  editAlbumClicked(album) {
    this.props.onEditAlbum(album)
    this.props.router.push('/gallery/album/edit')
  }
  deleteAlbumClicked(album) {
    this.props.onDeleteAlbum(album)
  }
  addPhotosInAlbumClicked(album) {
    this.props.onAddPhotos(album)
  }
  viewPhotosInAlbumClicked(album) {
    this.props.onViewPhotos(album)
  }
  render() {
    return (
      <div className="w3-container">
        <p className={this.props.infoClass}>{this.props.info}</p>
          {this.props.albums.map((album, idx) => {
            return (
              <div key={idx} className="w3-display-container w3-quarter w3-hover-opacity w3-black">
                <img src="/static/img/album.png" style={{opacity: 0.4}} alt="Avatar"></img>
                <div className="w3-display-topleft w3-display-hover w3-large">
                    <button className="w3-white w3-animate-opacity w3-btn w3-margin w3-round" onClick={() => {this.deleteAlbumClicked(album)}} title="Delete Album"><i className="fa fa-close w3-text-red"></i></button>
                    <button className="w3-white w3-animate-opacity w3-btn w3-margin w3-round" onClick={() => {this.editAlbumClicked(album)}} title="Edit Album"><i className="fa fa-ellipsis-v w3-text-blue"></i></button>
                    </div>
                    <div className="w3-display-topright w3-display-hover w3-large">
                    <button className="w3-white w3-animate-opacity w3-btn w3-margin w3-round" onClick={() => {this.addPhotosInAlbumClicked(album)}} title="Add Photos"><i className="fa fa-cloud-upload"></i></button>
                    <button className="w3-white w3-animate-opacity w3-btn w3-margin w3-round" onClick={() => {this.viewPhotosInAlbumClicked(album)}} title="View Photos"><i className="fa fa-camera"></i></button>
                    </div>
                <div className="w3-display-middle w3-large w3-display-hover w3-text-white">
              <p style={{fontWeight: "bold"}}>{album.name}</p>
              <p style={{fontWeight: "bold"}}>{album.description}</p>
              </div>
              <div className="w3-display-bottomright w3-display-hover w3-text-white">
                      {album.created}
              </div>
              <div className="w3-display-bottomleft w3-display-hover w3-text-white">
                  <Link to={'/gallery/showcase/album/'+album.id}><button className="w3-white w3-animate-opacity w3-btn w3-margin w3-round" title="View Album"><i className="fa fa-paperclip"></i></button></Link>
              </div>
              </div>
            )
          })}
      </div>
    )
  }
}

ViewAlbum.propTypes = {
    albums: PropTypes.array.isRequired,
  	info: PropTypes.string.isRequired,
  	infoClass: PropTypes.string.isRequired,
  	clearInfo: PropTypes.func.isRequired,
  	onDeleteAlbum: PropTypes.func.isRequired,
  	onEditAlbum: PropTypes.func.isRequired,
    onAddPhotos: PropTypes.func.isRequired,
    onViewPhotos: PropTypes.func.isRequired,
  	onComponentMount: PropTypes.func.isRequired,
}

export default ViewAlbum
