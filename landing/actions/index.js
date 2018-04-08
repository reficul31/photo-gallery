import {createAction} from 'redux-act'
import validator from 'validator'

export const loginUser = createAction('login/loginUser')
export const setLoginStatus = createAction('login/setLoginStatus')
export const registerUser = createAction('register/registerUser')
export const forgotUser = createAction('forgot/forgotUser')
export const resetUser = createAction('reset/resetUser')
export const setRegisterStatus = createAction('register/setRegisterStatus')
export const setResetStatus = createAction('reset/setResetStatus')
export const setForgotStatus = createAction('forgot/setForgotStatus')

const validateData = data => {
  let objKeys = Object.keys(data)
  for (var key in objKeys) {
    switch (objKeys[key]) {
      case 'email':
        if (!validator.isEmail(data[objKeys[key]]))
          return {info: 'Invalid Email', infoClass: 'warn'}
        break;
      case 'password':
        if (!validator.isLength(data[objKeys[key]], {min: 3, max: 40}))
          return {info: 'Password should be between 3 and 40 characters', infoClass: 'warn'}
        break;
      case 'name':
        if (!validator.isLength(data[objKeys[key]], {min: 3, max: 50}))
          return {info: 'Username should be between 3 and 50 characters', infoClass: 'warn'}

        if (!validator.isAlphanumeric(data[objKeys[key]]))
          return {info: 'Username cannot contain special characters', infoClass: 'warn'}
        break;
      case 'gender':
        if (data[objKeys[key]] != "male" && data[objKeys[key]] != "female")
          return {info: 'Please input either "male" or "female" in gender form', infoClass: 'warn'}
        break;
      case 'token':
        if (!validator.isLength(data[objKeys[key]], {min: 20, max: 20}))
          return {info: 'Invalid token, cannot send data', infoClass: 'warn'}
        break;
      default:
        return {info: 'Invalid input', infoClass: 'warn'}
        break;
    }
  }
  return {info: 'Sending data', infoClass: 'info'}
}

export function sendLoginData(data) {
  return async function (dispatch) {
    const {info, infoClass} = validateData(data.userInput)
    dispatch(setLoginStatus({info, infoClass}))
    if(infoClass == 'info'){
      await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(data.userInput),
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.success === true) {
          dispatch(setLoginStatus({info: data.data, infoClass: 'info'}))
          window.location.assign('/gallery')
        }
        else if (data.success === false)
          dispatch(setLoginStatus({info: data.data, infoClass: 'error'}))
        else
          dispatch(setLoginStatus({info: 'Unexpected Error Occurred', infoClass: 'error'}))
      })
    }
  return
  }
}

export function sendRegisterData(data) {
  return async function (dispatch) {
    const {info, infoClass} = validateData(data.userInput)
    dispatch(setRegisterStatus({info, infoClass}))
    if(infoClass == 'info'){
      fetch('/register', {
        method: 'POST',
        body: JSON.stringify(data.userInput),
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.success === true) {
          dispatch(setRegisterStatus({info: data.data, infoClass: 'info'}))
          window.location.assign("/login")
        }
      else if (data.success === false)
          dispatch(setRegisterStatus({info: data.data, infoClass: 'error'}))
        else
          dispatch(setRegisterStatus({info: 'Unexpected Error Occurred', infoClass: 'error'}))
      })
    }
  }
  return
}

export function sendForgotData(data) {
  return async function (dispatch) {
    const {info, infoClass} = validateData(data.userInput)
    dispatch(setForgotStatus({info, infoClass}))
    if(infoClass == 'info'){
      await fetch('/forgotpassword', {
        method: 'POST',
        body: JSON.stringify(data.userInput),
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.success === true)
          dispatch(setForgotStatus({info: data.data}))
        else if (data.success === false)
          dispatch(setForgotStatus({info: data.data}))
        else
          dispatch(setForgotStatus({info: 'Unexpected Error Occurred'}))
      })
    }
  return
  }
}


export function sendResetData(data) {
  return async function (dispatch) {
    const {info, infoClass} = validateData(data.userInput)
    dispatch(setResetStatus({info, infoClass}))
    if(infoClass != 'warn') {
      await fetch('/resetpassword', {
        method: 'POST',
        body: JSON.stringify(data.userInput),
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.success === true)
          dispatch(setResetStatus({info: data.data}))
        else if (data.success === false)
          dispatch(setResetStatus({info: data.data}))
        else
          dispatch(setResetStatus({info: 'Unexpected Error Occurred'}))
      })
    }
  return
  }
}
