import React from 'react'
import ResetPassword from './../components/resetpassword'
import { connect } from 'react-redux'
import * as actions from './../actions'

const mapStateToProps = state => {
  return {
    info: state.reset.info,
    infoClass: state.reset.infoClass,
  }
}

const mapDispatchToProps = dispatch => ({
  onResetPasswordInput: input => {
    dispatch(actions.resetUser({userInput: input}))
  },
})

const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

export default ResetPasswordContainer
