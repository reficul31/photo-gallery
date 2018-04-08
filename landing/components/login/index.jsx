import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router'

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.sendUserInfo = this.sendUserInfo.bind(this)
	}
	sendUserInfo() {
		const email = document.getElementById('email').value
		const password = document.getElementById('password').value
		this.props.onUserInput({email, password})
	}


	render() {
		return (
			<div>
				<div className='warn-text'>{this.props.info}</div>
				<form onSubmit = {(e) => {e.preventDefault()}}>
					<input type="email" id="email" placeholder="Email" />
					<input type="password" id="password" placeholder="Password" />
					<button type="submit" onClick = {this.sendUserInfo} > Login </button>
					<Link to='/forgotpassword'>Forgot Password ?</Link>
				</form>
			</div>
			)
	}
}

Login.propTypes = {
	info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
	onUserInput: PropTypes.func.isRequired,
}

export default Login
