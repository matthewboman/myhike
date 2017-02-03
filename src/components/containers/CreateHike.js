import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'

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

  componentDidMount() {
    // console.log('props on CreateHike mounting ' + JSON.stringify(this.props))
  }

  componentDidUpdate() {
    // console.log('CreateHike updating location to ' + this.props.location)
    // console.log('CreateHike updating username to ' + this.props.currentUser.username)
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

  submitHike(hike) {
    // console.log('submitting ' + JSON.stringify(this.state.hike))
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
        <input onChange={this.updateHike.bind(this)} id="pictures"
          className="form-control" type="text" placeholder="upload here" />
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
