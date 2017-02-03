import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Detail } from '../presentation'

class Hike extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidUpdate() {
    // console.log('dealing with ' + JSON.stringify(this.props.currentHike))
  }

  render() {

    if (this.props.currentHike == null || undefined) { return false }
    const currentHike = this.props.currentHike

    return (
      <div className="sidebar">
        <p>{currentHike.name}</p>
        <p>{currentHike.review.description}</p>
        <p>{currentHike.review.animals}</p>
        <p>{currentHike.review.plants}</p>
        <p>{currentHike.review.fungi}</p>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    currentHike: state.hike.currentHike,
  }
}

export default connect(stateToProps)(Hike)
