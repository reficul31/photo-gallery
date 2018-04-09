import { createAction } from 'redux-act'
import validator from 'validator'

const setInfo = createAction('user/setInfo')
const setUser = createAction('user/setUser')
const editUser = createAction('user/editUser')
const fetchUser = createAction('user/fetchUser')

export default {setInfo, fetchUser, setUser, editUser}

const validateUserDetails = (data) => {
  let objKeys = Object.keys(data)
  for(var key in objKeys) {
    switch(objKeys[key]){
      case 'name':
        if(validator.isEmpty(data[objKeys[key]]))
          return {info:'Name cannot be empty', infoClass:'warn'}
      break;
      case 'gender':
        if(validator.isEmpty(data[objKeys[key]]) || (data[objKeys[key]] != "male" && data[objKeys[key]] != "female"))
          return {info:'Gender must specify either male or female', infoClass:'warn'}
      break;
    }
  }
  return {info:'Sending data', infoClass:'info'}
}

export function sendUser(data) {
  return async function(dispatch){
    const {info, infoClass} = validateUserDetails(data.user)
    dispatch(setInfo({info, infoClass}))
    if(infoClass == 'info'){
      await fetch('/modifyUser', {
        method      : data.type,
        body        : JSON.stringify(data.user),
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

export function getUser(data) {
  return async function(dispatch) {
    await fetch(`/getUser`, {
      method      : 'GET',
      credentials : 'same-origin',
      headers     : { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      let users = JSON.parse(data.data)
      dispatch(setUser(users))
      dispatch(setInfo({info: 'Fetched User from database', infoClass:'info'}))
    })
  }
}
