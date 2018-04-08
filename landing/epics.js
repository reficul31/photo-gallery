import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import * as actions from './actions'

export const validateDataOnUserLogin = action$ => action$
	.filter(action => action.type === actions.loginUser.getType())
	.debounceTime(500)
	.map((action) => actions.sendLoginData(action.payload))

export const validateDataOnUserRegister = action$ => action$
	.filter(action => action.type === actions.registerUser.getType())
	.debounceTime(500)
	.map((action) => actions.sendRegisterData(action.payload))

export const validateDataOnForgotUser = action$ => action$
  .filter(action => action.type === actions.forgotUser.getType())
  .debounceTime(500)
  .map((action) => actions.sendForgotData(action.payload))

export const validateDataOnResetUser = action$ => action$
  .filter(action => action.type === actions.resetUser.getType())
  .debounceTime(500)
  .map((action) => actions.sendResetData(action.payload))
