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
    console.log('dealing with ' + JSON.stringify(this.props.currentHike.review.pictures))
  }

  render() {

    if (this.props.currentHike == null || undefined) { return false }
    const currentHike = this.props.currentHike

    if (this.props.currentHike.review.pictures == null || undefined) { return false }
    const pixx = this.props.currentHike.review.pictures.map((picture, i) => {
      return (
        <li key={i} className="hike-image">
          <img src={picture} className="image-preview"/>
        </li>
      )
    })


    return (
      <div className="sidebar">
        <h2>{currentHike.name}</h2>
        <div className="hikeBlock">
          <h4>Hike Review and Description</h4>
          <p>{currentHike.review.description}</p>
        </div>
        <div className="hikeBlock">
          <h4>Animals</h4>
          <p>{currentHike.review.animals}</p>
        </div>
        <div className="hikeBlock">
          <h4>Plants</h4>
          <p>{currentHike.review.plants}</p>
        </div>
        <div className="hikeBlock">
          <h4>Fungi</h4>
          <p>{currentHike.review.fungi}</p>
        </div>
        <div className="hikeBlock">
        <ul className="hike-images">
          {pixx}
        </ul>
        </div>
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
