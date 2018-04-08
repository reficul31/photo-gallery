import React from 'react'
import { connect } from 'react-redux'
import ViewAlbum from './../../components/album/viewAlbum'
import * as actions from './../../actions'
import { browserHistory } from 'react-router'

const mapStateToProps = state => {
  return {
    albums: state.album.albums,
    info: state.album.info,
    infoClass: state.album.infoClass,
  }
}

const mapDispatchToProps = dispatch => ({
  onEditAlbum: input => {
    dispatch(actions.album.editAlbum({album: input}))
  },
  onDeleteAlbum: input => {
    dispatch(actions.album.deleteAlbum({album:input, type: 'DELETE'}))
  },
  onAddPhotos: input => {
    dispatch(actions.photo.setAlbum(input))
    browserHistory.push('/gallery/photo/add')
  },
  onViewPhotos: input => {
    dispatch(actions.photo.setAlbum(input))
    browserHistory.push('/gallery/photo/view')
  },
  onComponentMount: () => {
    dispatch(actions.album.fetchAlbums())
  },
  clearInfo: () => {
    dispatch(actions.album.setInfo({info: '', infoClass: ''}))
  }
})

const ViewAlbumContainer = connect(mapStateToProps, mapDispatchToProps)(ViewAlbum)

export default ViewAlbumContainer
