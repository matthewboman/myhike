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
    transform             : 'translate(-50%, -50%)'
  }
};

class NavAdmin extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  login(credentials) {
    this.props.currentUserReceived(credentials)
  }

  logout(event) {
    event.preventDefault()
    this.props.logoutUser(null)
  }


  render() {
    /*
      Display login/signup if user is not logged in.
      If user is logged in, display profile link and logout.
    */
    const user = this.props.user
    let content = null

    if (user == null) {
      content = (
        <div className="collapse navbar-collapse" id="menu-list">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/create-hike">Create Hike</Link>
            </li>
            <li>
              <Login onLogin={this.login.bind(this)} />
            </li>
            <li>
              <button className="btn-login" onClick={this.openModal}>Register</button>
            </li>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <button className="x-button" onClick={this.closeModal}>X</button>
              <Register onClose={this.closeModal}/>
            </Modal>
          </ul>
        </div>
      )
    } else {
      content = (
        <div className="collapse navbar-collapse" id="menu-list">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/create-hike">Create Hike</Link>
            </li>
            <li>
              <Link to="/currentuser"><button>Account</button></Link>
            </li>
            <li>
              <button onClick={this.logout.bind(this)}>Log out</button>
            </li>
          </ul>
        </div>
      )
    }

    return (
      <div>
        {content}
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
