import React from 'react'
import { connect } from 'react-redux'
import AddPhoto from './../../components/photo/addPhoto'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    info: state.photo.info,
    infoClass: state.photo.infoClass,
    album: state.photo.album,
  }
}

const mapDispatchToProps = dispatch => ({
  onPhotoInput: input => {
    dispatch(actions.photo.addPhoto({photo: input, type:'POST'}))
  },
  clearInfo: () => {
    dispatch(actions.photo.setInfo({info: '', infoClass: ''}))
  },
})

const AddPhotoContainer = connect(mapStateToProps, mapDispatchToProps)(AddPhoto)

export default AddPhotoContainer
