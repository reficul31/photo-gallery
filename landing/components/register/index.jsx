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
        <p>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}}>
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password" />
          <input type="text" id="name" placeholder="Username" />
          <input type="text" id="gender" placeholder="Gender" />
          <button type="submit" onClick = {this.sendUserInfo} >Register</button>
        </form>
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
