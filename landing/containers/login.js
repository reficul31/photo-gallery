import React from 'react'
import { connect } from 'react-redux'
import Login from './../components/login'
import * as actions from './../actions'

const mapStateToProps = state => {
	return {
		info: state.login.info,
    infoClass: state.login.infoClass,
	}
}

const mapDispatchToProps = dispatch => ({
	onUserInput: input => {
		dispatch(actions.loginUser({userInput: input}))
	},
})


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer
