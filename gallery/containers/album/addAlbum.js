import React from 'react'
import { connect } from 'react-redux'
import AddAlbum from './../../components/album/addAlbum'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    info: state.album.info,
    infoClass: state.album.infoClass
  }
}

const mapDispatchToProps = dispatch => ({
  onAlbumInput: input => {
    dispatch(actions.album.addAlbum({album: input, type:'POST'}))
  },
  clearInfo: () => {
    dispatch(actions.album.setInfo({info: '', infoClass: ''}))
  },
})

const AddAlbumContainer = connect(mapStateToProps, mapDispatchToProps)(AddAlbum)

export default AddAlbumContainer
