import React, { Component } from "react";
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Login } from '../presentation'

class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  // Check if user is logged in
  componentDidMount() {
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      if (response.profile == null) {
        return
      }
      this.props.currentUserReceived(response.profile)
    })
  }

  // Log user in
  login(credentials) {
    APIManager.post('/account/login', credentials, (err, response) => {
      if (err) {
        let msg = err.message || err
        console.error(msg)
        return
      }
      this.props.currentUserReceived(response.profile)
    })
  }

  // Log user out
  logout(event) {
    APIManager.get('/account/logout', null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
    })
    this.props.currentUserReceived(null)
  }

  render() {
    return (
      <Navbar collapseOnSelect className="navigation">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">My Hike</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/add-hike">
              <NavItem>Add a new Hike</NavItem>
            </LinkContainer>
          </Nav>

          <Nav pullRight>
            {
              (this.props.currentUser == null) ?
              <NavItem><Login onLogin={this.login.bind(this)} /></NavItem>
               : <NavItem><button className="btn-login" onClick={this.logout.bind(this)}>Log out {this.props.currentUser.username}</button></NavItem>
             }
            {
              (this.props.currentUser == null) ?
              <LinkContainer to="/register" className="register">
                <NavItem>Register</NavItem>
              </LinkContainer> : ''
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const stateToProps = (state) => {
  return {
    currentUser: state.account.currentUser
  }
}

const dispatchToProps = (dispatch) => {
  return {
    currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
    profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
  }
}

export default connect(stateToProps, dispatchToProps)(Navigation)
