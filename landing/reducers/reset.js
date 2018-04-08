import { createReducer } from 'redux-act'
import * as actions from '../actions'

export const defaultState = {
  info: '',
}

function resetUser(state, {userInput}) {
  return {...state, info:'Validating Data', infoClass: 'info'}
}

function setResetStatus(state, {info, infoClass}) {
  return {...status, info, infoClass}
}

export default createReducer({
  [actions.resetUser]: resetUser,
  [actions.setResetStatus]: setResetStatus,
}, defaultState)
