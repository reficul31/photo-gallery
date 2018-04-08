import React from 'react'
import { connect } from 'react-redux'
import ViewPhoto from './../../components/photo/viewPhoto'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    photos: state.photo.photos,
    album: state.photo.album,
    info: state.photo.info,
    infoClass: state.photo.infoClass,
  }
}

const mapDispatchToProps = dispatch => ({
  onDeletePhoto: input => {
    dispatch(actions.photo.deletePhoto({photo:input, type: 'DELETE'}))
  },
  onComponentMount: input => {
    dispatch(actions.photo.fetchPhotos(input))
  },
  clearInfo: () => {
    dispatch(actions.photo.setInfo({info: '', infoClass: ''}))
  },
})

const ViewPhotoContainer = connect(mapStateToProps, mapDispatchToProps)(ViewPhoto)

export default ViewPhotoContainer
