import { createAction } from 'redux-act'
import validator from 'validator'

const setInfo = createAction('showcase/setInfo')
const setAlbum = createAction('showcase/setAlbum')
const fetchAlbum = createAction('showcase/fetchAlbum')
const setPhoto = createAction('showcase/setPhoto')
const fetchPhoto = createAction('showcase/fetchPhoto')

export default {setInfo, setAlbum, fetchAlbum, setPhoto, fetchPhoto}

export function getAlbumShowcase(data) {
  return async function(dispatch) {
    await fetch(`/fetchAlbum?albumId=${data.albumId}`, {
      method      : 'GET',
      credentials : 'same-origin',
      headers     : { 'Content-Type': 'application/json' }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(data.success == true) {
        let album = JSON.parse(data.data)
        dispatch(setAlbum(album))
        dispatch(setInfo({info: 'Album successfully found', infoClass:'info'}))        
      } else {
        dispatch(setInfo({info: data.data, infoClass:'info'})) 
      }
    })
  }
}

export function getPhotoShowcase(data) {
  return async function(dispatch) {
    await fetch(`/fetchPhoto?photoId=${data.photoId}`, {
      method      : 'GET',
      credentials : 'same-origin',
      headers     : { 'Content-Type': 'application/json' }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(data.success == true) {
        let photo = JSON.parse(data.data)
        dispatch(setPhoto(photo))
        dispatch(setInfo({info: 'Photo successfully found', infoClass:'info'}))        
      } else {
        dispatch(setInfo({info: data.data, infoClass:'info'})) 
      }
    })
  }
}
