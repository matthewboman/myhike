import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { APIManager } from '../../utils'
import actions from '../../actions'
import Register from './Register'
import { Login } from '../presentation'

// const appElement = document.getElementById('your-app-element');

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


  render() {
    /*
      Populate modal with Login or Register
    */
    let modal = null
    if (this.state.isRegister) {
      modal = (
        <div className="modal-register">
          <Register onClose={this.closeModal}/>
        </div>
      )
    }
    if (this.state.isLogin) {
      modal = (
        <div className="modal-login">
          <Login onLogin={this.login.bind(this)} />
        </div>
      )
    }

    /*
      Display login/signup if user is not logged in.
      If user is logged in, display profile link and logout.
    */
    const user = this.props.user
    let content = null

    if (user == null) {
      content = (
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
    } else {
      content = (
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

    return (
      <div>
        {content}
        <Modal
          // className="account-modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/*<button className="x-button" onClick={this.closeModal}><div className="x"></div></button>*/}
          <div onClick={this.closeModal} className="x"></div>
          <div className="modal-header">

              {modal}
          </div>

        </Modal>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
    logoutUser: (user) => dispatch(actions.logoutUser(user)),
  }
}

export default connect(stateToProps, dispatchToProps)(NavAdmin)
