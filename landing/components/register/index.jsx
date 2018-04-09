import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let recaptchaInstance;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.sendUserInfo = this.sendUserInfo.bind(this)
  }
  sendUserInfo() {
    const email = document.getElementById('email').value
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const gender = document.getElementById('gender').value
    this.props.onUserInput({email, password, name, gender})
  }
  render() {
    return (
      <div>
        <h1 className="w3-jumbo w3-animate-top w3-center">REGISTER</h1>
        <div className="w3-large w3-center">
          <div className="w3-row-padding">
            <div className={this.props.infoClass}>{this.props.info}</div>
            <form onSubmit = {(e) => {e.preventDefault()}}>
              <div className="w3-half">
                <input className="w3-input w3-border" type="email" id="email" placeholder="Email" />
              </div>
              <div className="w3-half">
                <input className="w3-input w3-border" type="password" id="password" placeholder="Password" />
              </div>
              <div className="w3-half">
                <input className="w3-input w3-border" type="text" id="name" placeholder="Username" />
              </div>
              <div className="w3-half">
                <input className="w3-input w3-border" type="text" id="gender" placeholder="Gender" />
              </div>
              <div className="w3-full"> 
                <button className="w3-btn" type="submit" onClick = {this.sendUserInfo} >Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )
  }
}

Register.propTypes = {
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
}

export default Register
