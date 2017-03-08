import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Review } from '../presentation'

/*
  TODO: Hike can be submitted only if user is logged in and location is selected
*/

class CreateHike extends Component {
  constructor() {
    super()
    this.state = {}
  }


  componentDidUpdate() {
    console.log("location " + JSON.stringify(this.props.location))
    console.log(" hike ID " + this.props.currentHike._id)
  }

  submitReview(review) {
    console.log('submitting ' + JSON.stringify(review))
    // APIManager.post('/api/hike', this.state.hike, (err, response) => {
    //   if (err) {
    //     console.error('ERROR: ' + err.message)
    //   }
    // })
  }



  render() {

    if (this.props.currentUser == null || undefined) { return false }

    return (
      <div className="sidebar">
        <Review
          user={this.props.currentUser.username}
          onReview={this.submitReview.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    location: state.hike.hikeLocation,
    currentUser: state.account.currentUser
  }
}

const dispatchToProps = (dispatch) => {
	return {
		locationAdded: (location) => dispatch(actions.locationAdded(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(CreateHike)
