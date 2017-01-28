import React, { Component } from 'react'

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <h1>this.props.title</h1>
        <Hike />
      </div>
    )
  }
}

export default Sidebar
