import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { APIManager } from '../../utils'
import actions from '../../actions'
import { Login, Register } from '../User'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '450px',
    width                 : '330px',
    padding               : '0px'
  }
};

class NavAdmin extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      isLogin: false,
      isRegister: false
    }
    this.openLogin = this.openLogin.bind(this)
    this.openRegister = this.openRegister.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openLogin() {
    this.setState({
      modalIsOpen: true,
      isLogin: true
    });
  }

  openRegister() {
    this.setState({
      modalIsOpen: true,
      isRegister: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      isLogin: false,
      isRegister: false
    });
  }

  login(credentials) {
    this.props.currentUserReceived(credentials)
    this.setState({
      modalIsOpen: false
    })
  }

  logout(event) {
    event.preventDefault()
    this.props.logoutUser(null)
  }

  renderModalType() {
    if (this.state.isRegister) {
      return (
        <div className="modal-register">
          <Register onClose={this.closeModal}/>
        </div>
      )
    } else if (this.state.isLogin) {
      return (
        <div className="modal-login">
          <Login onLogin={this.login.bind(this)}
                 displayError={(error) => this.props.displayError(error)}
                 error={this.props.error}
            />
        </div>
      )
    }
  }

  renderIfNoUser() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/create-hike">Create Hike</Link>
        </li>
        <li>
          <a onClick={this.openLogin}>Login</a>
        </li>
        <li>
          <a onClick={this.openRegister}>Register</a>
        </li>
      </ul>
    )
  }

  renderIfUser() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/create-hike">Create Hike</Link>
        </li>
        <li>
          <Link to="/currentuser">Account</Link>
        </li>
        <li>
          <a onClick={this.logout.bind(this)}>Log out</a>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <div className="nav-admin">
        { (this.props.user) ? this.renderIfUser() : this.renderIfNoUser() }
        <Modal
          // className="account-modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="account modal"
        >
          <div onClick={this.closeModal} className="x"></div>
          <div className="modal-header">
            {this.renderModalType()}
          </div>

        </Modal>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user,
    error: state.message.error
  }
}

const dispatchToProps = (dispatch) => {
  return {
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
    displayError: (error) => dispatch(actions.displayError(error)),
    logoutUser: (user) => dispatch(actions.logoutUser(user)),
  }
}

export default connect(stateToProps, dispatchToProps)(NavAdmin)
