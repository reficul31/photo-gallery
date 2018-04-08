import React from 'react'
import ForgotPassword from './../components/forgotpassword'
import { connect } from 'react-redux'
import * as actions from './../actions'

const mapStateToProps = state => {
  return {
    info: state.forgot.info,
    infoClass: state.forgot.infoClass,
  }
}

const mapDispatchToProps = dispatch => ({
  onForgotPasswordInput: input => {
    dispatch(actions.forgotUser({userInput: input}))
  },
})

const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

export default ForgotPasswordContainer
