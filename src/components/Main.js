/*
For server-side rendering.
Master layout to render child routes
*/
import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

export default Main
