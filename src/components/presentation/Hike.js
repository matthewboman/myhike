import React, { Component } from 'react'

class Hike extends Component {
  render() {
    return (
      <div>
        <p>{this.props.currentHike.name}</p>
        <p>{this.props.currentHike.description}</p>
        <p>{this.props.currentHike.plants}</p>
        <p>{this.props.currentHike.animals}</p>
        <p>{this.props.currentHike.fungi}</p>
      </div>
    )
  }
}

export default Hike
