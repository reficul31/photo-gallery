import React from 'react'
import { connect } from 'react-redux'
import EditAlbum from './../../components/album/editAlbum'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    album: state.album.editAlbum,
    info: state.album.info,
    infoClass: state.album.infoClass
  }
}

const mapDispatchToProps = dispatch => ({
  onEditAlbum: input => {
    dispatch(actions.album.addAlbum({album: input, type:'PUT'}))
  },
  clearInfo: () => {
    dispatch(actions.album.setInfo({info: '', infoClass: ''}))
  },
})

const EditAlbumContainer = connect(mapStateToProps, mapDispatchToProps)(EditAlbum)

export default EditAlbumContainer
