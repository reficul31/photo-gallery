import { createAction } from 'redux-act'
import validator from 'validator'

const setInfo = createAction('album/setInfo')
const addAlbum = createAction('album/addAlbum')
const deleteAlbum = createAction('album/deleteAlbum')
const editAlbum = createAction('album/editAlbum')
const setAlbum = createAction('album/setAlbum')
const fetchAlbums = createAction('album/fetchAlbums')

export default {setInfo, addAlbum, deleteAlbum, editAlbum, setAlbum, fetchAlbums}

const validateAlbumDetails = (data) => {
  let objKeys = Object.keys(data)
  for(var key in objKeys) {
    switch(objKeys[key]){
      case 'name':
        if(validator.isEmpty(data[objKeys[key]]))
          return {info:'Name cannot be empty', infoClass:'warn'}
      break;
      case 'description':
        if(validator.isEmpty(data[objKeys[key]]))
          return {info:'Description cannot be empty', infoClass:'warn'}
      break;
    }
  }
  return {info:'Sending data', infoClass:'info'}
}

export function sendAlbum(data) {
  return async function(dispatch){
    const {info, infoClass} = validateAlbumDetails(data.album)
    dispatch(setInfo({info, infoClass}))
    if(infoClass == 'info'){
      await fetch('/album', {
        method      : data.type,
        body        : JSON.stringify(data.album),
        credentials : 'same-origin',
        headers     : { 'Content-Type': 'application/json' }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        dispatch(setInfo({info: data.data, infoClass: 'info'}))
      })
    }
    return
  }
}

export function getAlbum(data) {
  return async function(dispatch) {
    await fetch('/album', {
      method      : 'GET',
      credentials : 'same-origin',
      headers     : { 'Content-Type': 'application/json' }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      let albums = JSON.parse(data.data)
      dispatch(setAlbum(albums))
      dispatch(setInfo({info: `${albums.length} rows found`, infoClass:'info'}))
    })
  }
}
