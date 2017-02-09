import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Images } from '../presentation'

/*
  TODO: Split into two componenets. Right now, it is getting the position
  from the app state but getting everything else from user input.

  Smart component: gets location and current user from app and passes it down
  Dumb component: gets hike data from user input, saves in state to be sent back
    up to smart component on submit. Keep Image presentational component as is
    and also pass to smart component.

  TODO: Allow for user to choose current location or click on map (or address?)

  TODO: Hike can be submitted only if user is logged in and location is selected
*/

class CreateHike extends Component {
  constructor() {
    super()
    this.state = {
      hike: {
        name: '',
        position: {},
        review: {
          animals: '',
          description: '',
          fungi: '',
          pictures: [],
          plants: '',
          user: '',
        }
      }
    }
  }

  updateHike(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    // Get new hike location from props and assign
    let position = {
      lat: this.props.location.lat,
      lng: this.props.location.lng
    }
    updatedHike["position"] = position

    // Get and assign form subfields
    let updatedReview = Object.assign({}, this.state.hike.review)
    updatedReview[event.target.id] = event.target.value
    updatedReview["user"] = this.props.currentUser.username
    updatedHike["review"] = updatedReview

    // Get and assign all fields
    updatedHike[event.target.id] = event.target.value // kind of janks it b/c more is being submitted, but mongoose model makes it work
    // Set state with all the details
    this.setState({
      hike: updatedHike
    })
  }

  addImages(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    let updatedReview = Object.assign({}, this.state.hike.review)
    // Add images from Image component
    let updatedImages = Object.assign([], this.state.hike.review.pictures)
    for (let value of event) {
      updatedImages.push(value.secure_url)
    }
    updatedReview["pictures"] = updatedImages
    updatedHike["review"] = updatedReview
    // Set state with all the details
    this.setState({
      hike: updatedHike
    })
  }

  submitHike(hike) {
    console.log('submitting ' + JSON.stringify(this.state.hike))
    APIManager.post('/api/hike', this.state.hike, (err, response) => {
      if (err) {
        console.error('ERROR: ' + err.message)
      }
    })
  }



  render() {
    const position = JSON.stringify(this.props.location) // for displaying GPS position in form

    return (
      <div className="sidebar">
        <h3>Add a New Hike</h3>
        <input onChange={this.updateHike.bind(this)} id="name"
          className="form-control" type="text" placeholder="Hike Name" />
        <br />
        <input id="location" onChange={this.updateHike.bind(this)} id="position"
          className="form-control" type="text" placeholder={position}/>
        <br />
        <input onChange={this.updateHike.bind(this)} id="description"
          className="form-control" type="text" placeholder="Describe it!" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="plants"
          className="form-control" type="text" placeholder="What plants?" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="fungi"
          className="form-control" type="text" placeholder="What mushrooms?" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="animals"
          className="form-control" type="text" placeholder="What animals" />
        <br />
        <Images onImageSubmit={this.addImages.bind(this)}/>
        <br />
        <button onClick={this.submitHike.bind(this)}
          className="btn btn-info btn-block">Add it</button>
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
