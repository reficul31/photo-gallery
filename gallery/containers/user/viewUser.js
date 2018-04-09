import React from 'react'
import { connect } from 'react-redux'
import ViewUser from './../../components/user/viewUser'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    user: state.user.user,
    info: state.user.info,
    infoClass: state.user.infoClass,
  }
}

const mapDispatchToProps = dispatch => ({
  onComponentMount: () => {
    dispatch(actions.user.fetchUser())
  },
  clearInfo: () => {
    dispatch(actions.user.setInfo({info: '', infoClass: ''}))
  }
})

const ViewUserContainer = connect(mapStateToProps, mapDispatchToProps)(ViewUser)

export default ViewUserContainer
