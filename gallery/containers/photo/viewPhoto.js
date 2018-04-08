import React from 'react'
import { connect } from 'react-redux'
import ViewPhoto from './../../components/photo/viewPhoto'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    photos: state.photo.photos,
    info: state.photo.info,
    infoClass: state.photo.infoClass,
  }
}

const mapDispatchToProps = dispatch => ({
  onEditPhoto: input => {
    dispatch(actions.photo.editPhoto({photo: input}))
  },
  onDeletePhoto: input => {
    dispatch(actions.photo.deletePhoto({photo:input, type: 'DELETE'}))
  },
  onComponentMount: () => {
    dispatch(actions.photo.fetchPhotos())
  },
  clearInfo: () => {
    dispatch(actions.photo.setInfo({info: '', infoClass: ''}))
  },
})

const ViewPhotoContainer = connect(mapStateToProps, mapDispatchToProps)(ViewPhoto)

export default ViewPhotoContainer
