import React from 'react'
import Register from './../components/register'
import { connect } from 'react-redux'
import * as actions from './../actions'

const mapStateToProps = state => {
	return {
		info: state.register.info,
    infoClass: state.register.infoClass,
	}
}

const mapDispatchToProps = dispatch => ({
	onUserInput: input => {
		dispatch(actions.registerUser({userInput: input}))
	},
})

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)

export default RegisterContainer
