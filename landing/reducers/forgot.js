import { createReducer } from 'redux-act'
import * as actions from '../actions'

export const defaultState = {
  info: '',
  infoClass: ''
}

function forgotUser(state, {userInput}) {
  return {...state, info:'Validating Data', infoClass: 'info'}
}

function setForgotStatus(state, {info, infoClass}) {
  return {...status, info, infoClass}
}

export default createReducer({
  [actions.forgotUser]: forgotUser,
  [actions.setForgotStatus]: setForgotStatus,
}, defaultState)
