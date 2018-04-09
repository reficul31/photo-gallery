import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.sendUserInfo = this.sendUserInfo.bind(this);
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  sendUserInfo() {
    const name = document.getElementById('name').value
    const gender = document.getElementById('gender').value
    const email = document.getElementById('email').value
    this.props.onEditUser({name, gender, email})
  }
  render() {
    return (
      <div>
        <p className={this.props.infoClass}>{this.props.info}</p>
        <form onSubmit = {(e) => {e.preventDefault()}} className="admin-form">
            <div className="w3-third">
              <input className="w3-input w3-border" type="text" id="email" placeholder="Email" defaultValue={this.props.user.email}/>
            </div>
            <div className="w3-third">
              <input className="w3-input w3-border" type="text" id="name" placeholder="Name" defaultValue={this.props.user.name}/>
            </div>
            <div className="w3-third">
              <input className="w3-input w3-border" type="text" id="gender" placeholder="Gender" defaultValue={this.props.user.gender}/>
            </div>
            <div className="w3-full">
              <input className="w3-input w3-border" type="submit" onClick = {this.sendUserInfo}/>
            </div>
          </form>
      </div>
    )
  }
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onEditUser: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
}

export default EditUser
