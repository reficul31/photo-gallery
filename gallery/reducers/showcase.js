import update from 'lodash/fp/update'
import remove from 'lodash/fp/remove'
import { createReducer } from 'redux-act'
import * as actions from '../actions'

const defaultStore = {
  album: {},
  photo: {},
  infoClass: '',
  info: '',
}

function fetchAlbum(state) {
  return {...state, info: 'Fetching the album from the database', infoClass: 'info'}
}

function setAlbum(state, album) {
  return {...state, album}
}

function fetchPhoto(state) {
  return {...state, info: 'Fetching the photo from the database', infoClass: 'info'}
}

function setPhoto(state, photo) {
  return {...state, photo}
}

function setInfo(state, {info, infoClass}) {
  return {...state, info, infoClass}
}

export default createReducer({
  [actions.showcase.setInfo]: setInfo,
  [actions.showcase.setAlbum]: setAlbum,
  [actions.showcase.fetchAlbum]: fetchAlbum,
  [actions.showcase.setPhoto]: setPhoto,
  [actions.showcase.fetchPhoto]: fetchPhoto,
}, defaultStore)
