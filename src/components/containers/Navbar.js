import React, { Component } from "react";
import { Link } from 'react-router'
import { NavAdmin } from '../Navbar'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#sm-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Home</a>
          </div>

          <div className="collapse navbar-collapse" id="sm-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/about">About</Link></li>
            </ul>
            <NavAdmin />
          </div>

        </div>
      </nav>
    )
  }
}


export default Navbar
