import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import * as actions from './actions'
import {sendAlbum, getAlbum} from './actions/album'
import {sendPhoto, getPhoto} from './actions/photo'
import {sendUser, getUser} from './actions/user'
import {getAlbumShowcase, getPhotoShowcase} from './actions/showcase'

export const validateAlbumOnAdminInput = action$ => action$
  .filter(action => action.type === actions.album.addAlbum.getType())
  .debounceTime(500)
  .map((action) => sendAlbum(action.payload))

export const deleteAlbumOnAdminInput = action$ => action$
  .filter(action => action.type === actions.album.deleteAlbum.getType())
  .map((action) => sendAlbum(action.payload))

export const fetchAlbums = action$ => action$
  .filter(action => action.type === actions.album.fetchAlbums.getType())
  .map((action) => getAlbum(action.payload))

export const validatePhotoOnAdminInput = action$ => action$
  .filter(action => action.type === actions.photo.addPhoto.getType())
  .debounceTime(500)
  .map((action) => sendPhoto(action.payload))

export const deletePhotoOnAdminInput = action$ => action$
  .filter(action => action.type === actions.photo.deletePhoto.getType())
  .map((action) => sendPhoto(action.payload))

export const fetchPhotos = action$ => action$
  .filter(action => action.type === actions.photo.fetchPhotos.getType())
  .map((action) => getPhoto(action.payload))

export const fetchUser = action$ => action$
  .filter(action => action.type === actions.user.fetchUser.getType())
  .map((action) => getUser(action.payload))

export const validateUserOnAdminInput = action$ => action$
  .filter(action => action.type === actions.user.editUser.getType())
  .debounceTime(500)
  .map((action) => sendUser(action.payload))

export const deleteUserOnAdminInput = action$ => action$
  .filter(action => action.type === actions.user.deleteUser.getType())
  .debounceTime(500)
  .map((action) => sendUser(action.payload))

export const fetchAlbumForShowcase = action$ => action$
  .filter(action => action.type === actions.showcase.fetchAlbum.getType())
  .map((action) => getAlbumShowcase(action.payload))

export const fetchPhotoForShowcase = action$ => action$
  .filter(action => action.type === actions.showcase.fetchPhoto.getType())
  .map((action) => getPhotoShowcase(action.payload))