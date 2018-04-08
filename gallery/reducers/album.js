import update from 'lodash/fp/update'
import remove from 'lodash/fp/remove'
import { createReducer } from 'redux-act'
import * as actions from '../actions'

const defaultStore = {
  albums: [],
  editAlbum: {},
  infoClass: '',
  info: '',
}

function addAlbum(state) {
  return {...state, info: 'Validating album attributes', infoClass: 'info'}
}

function fetchAlbums(state) {
  return {...state, info: 'Fetching albums from the database', infoClass: 'info'}
}

function editAlbum(state, data) {
  return {...state, editAlbum: data.album}
}

function deleteAlbum(state, data) {
  return update('albums', albums => remove(album => album === data.album)(albums))(state)
}

function setInfo(state, {info, infoClass}) {
  return {...state, info, infoClass}
}

function setAlbum(state, albums) {
  return {...state, albums}
}

export default createReducer({
  [actions.album.setInfo]: setInfo,
  [actions.album.addAlbum]: addAlbum,
  [actions.album.editAlbum]: editAlbum,
  [actions.album.deleteAlbum]: deleteAlbum,
  [actions.album.setAlbum]: setAlbum,
  [actions.album.fetchAlbums]: fetchAlbums,
}, defaultStore)
