import React from 'react'
import { connect } from 'react-redux'
import ShowcasePhoto from './../../components/showcase/showcasePhoto'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
  	info: state.showcase.info,
  	infoClass: state.showcase.infoClass,
  	photo: state.showcase.photo,
  }
}

const mapDispatchToProps = dispatch => ({
	onComponentMount: input => {
    	dispatch(actions.showcase.fetchPhoto({photoId: input}))
	},
	clearInfo: () => {
		dispatch(actions.showcase.setInfo({info: '', infoClass: ''}))
	} 
})

const ShowcasePhotoContainer = connect(mapStateToProps, mapDispatchToProps)(ShowcasePhoto)

export default ShowcasePhotoContainer
