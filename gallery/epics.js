import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import * as actions from './actions'
import {sendAlbum, getAlbum} from './actions/album'

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
