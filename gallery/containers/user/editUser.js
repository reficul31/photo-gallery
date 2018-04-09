import React from 'react'
import { connect } from 'react-redux'
import EditUser from './../../components/user/editUser'
import * as actions from './../../actions'

const mapStateToProps = state => {
  return {
    user: state.user.user,
    info: state.user.info,
    infoClass: state.user.infoClass
  }
}

const mapDispatchToProps = dispatch => ({
  onEditUser: input => {
    dispatch(actions.user.editUser({user: input, type:'PUT'}))
  },
  clearInfo: () => {
    dispatch(actions.user.setInfo({info: '', infoClass: ''}))
  },
})

const EditUserContainer = connect(mapStateToProps, mapDispatchToProps)(EditUser)

export default EditUserContainer
