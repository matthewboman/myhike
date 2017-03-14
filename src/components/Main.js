/*
For server-side rendering.
Master layout to render child routes
*/
import React, { Component } from 'react'
import { Navbar } from './layout'

class Main extends Component {

  render() {
    return (
      <div>

        <div className="nav">
          <Navbar />
        </div>

        {this.props.children}
      </div>
    )
  }

}

export default Main
