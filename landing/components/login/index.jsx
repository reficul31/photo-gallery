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
				<h1 className="w3-jumbo w3-animate-top w3-center">LOGIN</h1>
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
							<div className="w3-full"> 
								<button className="w3-btn" type="submit" onClick = {this.sendUserInfo} > Login </button>
								<button className="w3-btn"><Link to='/forgotpassword'>Forgot Password ?</Link></button>
							</div>
						</form>
					</div>
				</div>
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
