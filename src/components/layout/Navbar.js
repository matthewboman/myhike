import React, { Component } from "react";

import { NavAdmin } from '../containers'

class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Home</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <NavAdmin />
          </div>

        </div>
      </nav>
    )
  }
}


export default Navigation
