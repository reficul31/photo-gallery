import React from 'react'
import { connect } from 'react-redux'
import ShowcaseAlbum from './../../components/showcase/showcaseAlbum'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
  	info: state.showcase.info,
  	infoClass: state.showcase.infoClass,
  	album: state.showcase.album,
  }
}

const mapDispatchToProps = dispatch => ({
	onComponentMount: input => {
    	dispatch(actions.showcase.fetchAlbum({albumId: input}))
	},
	clearInfo: () => {
		dispatch(actions.showcase.setInfo({info: '', infoClass: ''}))
	} 
})

const ShowcaseAlbumContainer = connect(mapStateToProps, mapDispatchToProps)(ShowcaseAlbum)

export default ShowcaseAlbumContainer
