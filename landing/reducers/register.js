import { createReducer } from 'redux-act'
import * as actions from '../actions'

export const defaultState = {
	info: '',
  infoClass: '',
}

function registerUser(state, {userInput}) {
	return {...state, info:'Validating Data', infoClass: 'info'}
}

function setRegisterStatus(state, {info, infoClass}) {
	return {...status, info, infoClass}
}

export default createReducer({
	[actions.registerUser]: registerUser,
	[actions.setRegisterStatus]: setRegisterStatus,
}, defaultState)
