import { createReducer } from 'redux-act'
import * as actions from '../actions'

export const defaultState = {
	info: '',
  infoClass: '',
}

function loginUser(state, {userInput}) {
	return {...state, info: 'Validating Data', infoClass: 'info'}
}

function setLoginStatus(state, {info, infoClass}) {
	return {...state, info, infoClass}
}

export default createReducer({
	[actions.loginUser]: loginUser,
	[actions.setLoginStatus]: setLoginStatus,
}, defaultState)
