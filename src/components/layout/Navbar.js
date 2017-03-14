import React, { Component } from "react";
import { Link } from 'react-router'

import { NavAdmin } from '../containers'

class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-list" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Home</a>
          </div>

          <div className="pull-right">
            <NavAdmin />
          </div>

        </div>
      </div>
    )
  }
}


export default Navigation
