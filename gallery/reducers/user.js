import update from 'lodash/fp/update'
import remove from 'lodash/fp/remove'
import { createReducer } from 'redux-act'
import * as actions from '../actions'

const defaultStore = {
  user: {},
  infoClass: '',
  info: '',
}

function fetchUser(state) {
  return {...state, info: 'Fetching user from the database', infoClass: 'info'}
}

function setUser(state, user) {
  return {...state, user}
}

function setInfo(state, {info, infoClass}) {
  return {...state, info, infoClass}
}

function editUser(state, data) {
  return {...state, user:data.user}
}

export default createReducer({
  [actions.user.setInfo]: setInfo,
  [actions.user.editUser]: editUser,
  [actions.user.setUser]: setUser,
  [actions.user.fetchUser]: fetchUser,
}, defaultStore)
