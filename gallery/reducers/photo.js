import update from 'lodash/fp/update'
import remove from 'lodash/fp/remove'
import { createReducer } from 'redux-act'
import * as actions from '../actions'

const defaultStore = {
  photos: [],
  infoClass: '',
  info: '',
  photo: undefined,
}

function addPhoto(state) {
  return {...state, info: 'Validating photo attributes', infoClass: 'info'}
}

function fetchPhotos(state) {
  return {...state, info: 'Fetching photos from the database', infoClass: 'info'}
}

function deletePhoto(state, data) {
  return update('photos', photos => remove(photo => photo === data.photo)(photos))(state)
}

function setAlbum(state, album) {
  return {...state, album}
}

function setPhoto(state, photos) {
  return {...state, photos}
}

function setInfo(state, {info, infoClass}) {
  return {...state, info, infoClass}
}

export default createReducer({
  [actions.photo.setInfo]: setInfo,
  [actions.photo.addPhoto]: addPhoto,
  [actions.photo.deletePhoto]: deletePhoto,
  [actions.photo.fetchPhotos]: fetchPhotos,
  [actions.photo.setAlbum]: setAlbum,
  [actions.photo.setPhoto]: setPhoto,
}, defaultStore)
