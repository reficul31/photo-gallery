import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUserAccount = this.deleteUserAccount.bind(this);
  }
  componentWillMount() {
    this.props.onComponentMount()
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  deleteUserAccount() {
    this.props.onDeleteUser({})
    window.location.assign("/logout")
  }
  render() {
    return (
      <div className="w3-container">
      <p className={this.props.infoClass}>{this.props.info}</p>
      <table className="w3-table-all w3-striped w3-centered">
        <tr>
          <td><b>NAME</b></td>
          <td>{this.props.user.name}</td>
        </tr>
        <tr>
          <td><b>EMAIL</b></td>
          <td>{this.props.user.email}</td>
        </tr>
        <tr>
          <td><b>Albums</b></td>
          <td>{this.props.user.albums}</td>
        </tr>
        <tr>
          <td><b>Photos</b></td>
          <td>{this.props.user.photos}</td>
        </tr>
      </table>
      <button className="w3-full w3-red w3-text-white" onClick = {this.deleteUserAccount}>
          <h3>Delete Account</h3>
      </button>
      </div>
    )
  }
}

ViewUser.propTypes = {
  user: PropTypes.object.isRequired,
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  onComponentMount: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
}

export default ViewUser
