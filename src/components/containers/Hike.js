import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'
import Reviews from './Reviews'

class Hike extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidUpdate() {
    let hike = this.props.hike
    if (hike == null) {
      return
    }
  }

  render() {
    let hike = this.props.hike
    let header

    if (hike != null) {
      header = (
        <div>
          <h3>{hike.name}</h3>
        </div>
      )
    }

    return (
      <div className="sidebar">
        {header}
        <Reviews />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    hike: state.hike.currentHike,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchHike: (params) => dispatch(actions.fetchHike(params)),
  }
}

export default connect(stateToProps, dispatchToProps)(Hike)
