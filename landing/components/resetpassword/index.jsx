import React from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import classNames from 'classnames'

let recaptchaInstance;

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.sendResetPassword = this.sendResetPassword.bind(this)
  }
  sendResetPassword() {
    const token = this.props.location.query.token !== undefined ? this.props.location.query.token : ""
    const password = document.getElementById('password').value
    const repassword = document.getElementById('re-password').value
    this.props.onResetPasswordInput({token, password, repassword})
  }
  render() {
    return (
      <div>
        <p>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}}>
          <input type="password" id="password" placeholder="Password" />
          <input type="password" id="re-password" placeholder="Retype Password" />
          <button type="submit" onClick = {this.sendResetPassword} > Reset Password </button>
        </form>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onResetPasswordInput: PropTypes.func.isRequired,
}

export default ResetPassword
