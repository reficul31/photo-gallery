import { createAction } from 'redux-act'
import validator from 'validator'

const setInfo = createAction('photo/setInfo')
const addPhoto = createAction('photo/addPhoto')
const deletePhoto = createAction('photo/deletePhoto')
const setAlbum = createAction('photo/setAlbum')
const fetchPhotos = createAction('photo/fetchPhotos')

export default {setInfo, addPhoto, deletePhoto, fetchPhotos, setAlbum}

const validatePhotoDetails = (data) => {
  let objKeys = Object.keys(data)
  for(var key in objKeys) {
    switch(objKeys[key]){
      case 'photos':
        if(data[objKeys[key]].length == 0)
          return {info:'Cannot upload 0 files', infoClass:'warn'}
      break;
    }
  }
  return {info:'Sending data', infoClass:'info'}
}

export function sendPhoto(data) {
  return async function(dispatch){
    const {info, infoClass} = validatePhotoDetails(data.photo)
    dispatch(setInfo({info, infoClass}))
    var formData  = new FormData();
    formData.append("file", data.photo.photos[0])
    formData.append("privacy",  data.photo.privacy)
    formData.append("description",  data.photo.description)
    formData.append("albumId",  data.photo.albumId)
    if(infoClass == 'info'){
      await fetch('/photo', {
        method      : data.type,
        body        : formData,
        credentials : 'same-origin',
      }).then((response) => {
        return response.json()
      }).then((data) => {
        dispatch(setInfo({info: data.data, infoClass: 'info'}))
      })
    }
    return
  }
}

export function getPhoto(data) {
  return async function(dispatch) {
    await fetch('/photo', {
      method      : 'GET',
      credentials : 'same-origin',
      headers     : { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      let photos = JSON.parse(data.data)
      dispatch(setPhoto(photos))
      dispatch(setInfo({info: `${photos.length} rows found`, infoClass:'info'}))
    })
  }
}
