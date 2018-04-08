import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let recaptchaInstance;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.sendForgotPassword = this.sendForgotPassword.bind(this)
  }
  sendForgotPassword() {
    const email = document.getElementById('email').value
    this.props.onForgotPasswordInput({email})
  }
  render() {
    return (
      <div>
        <p>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}}>
          <input type="email" id="email" placeholder="Email" />
          <button type="submit" onClick = {this.sendForgotPassword} > Reclaim Password </button>
        </form>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onForgotPasswordInput: PropTypes.func.isRequired,
}

export default ForgotPassword
