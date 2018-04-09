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
        <h1 className="w3-jumbo w3-animate-top w3-center">FORGOT PASSWORD</h1>
        <div className="w3-large w3-center">
          <div className="w3-row-padding">
            <div className={this.props.infoClass}>{this.props.info}</div>
            <form onSubmit = {(e) => {e.preventDefault()}}>
              <div className="w3-half">
                <input className="w3-input w3-border" type="email" id="email" placeholder="Email"  />
              </div>
              <div className="w3-half"> 
                <button className="w3-btn" type="submit" onClick = {this.sendForgotPassword} > Reclaim Password </button>
              </div>
            </form>
          </div>
        </div>
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
