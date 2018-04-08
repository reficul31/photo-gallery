import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ViewAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.editAlbumClicked = this.editAlbumClicked.bind(this);
    this.deleteAlbumClicked = this.deleteAlbumClicked.bind(this);
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
  render() {
    return (
      <div className="table-container">
        <p className={this.props.infoClass}>{this.props.info}</p>
          {this.props.albums.map((album, idx) => {
            return (
            	<div key={idx}>
	                <p>{album.name}</p>
                  <p>{album.description}</p>
	                <p>{parseInt(album.privacy) == 0?"Private":"Public"}</p>
                  <p>{album.created}</p>
	                <p><button onClick={() => {this.editAlbumClicked(album)}}>edit</button></p>
	                <p><button onClick={() => {this.deleteAlbumClicked(album)}}>delete</button></p>
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
  	onComponentMount: PropTypes.func.isRequired,
}

export default ViewAlbum
