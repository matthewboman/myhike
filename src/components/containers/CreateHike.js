import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autocomplete from 'react-google-autocomplete';

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Images } from '../presentation'

/*
  TODO: Place marker on map if user uses current location or address
  TODO: Hike can be submitted only if user is logged in and location is selected
*/

class CreateHike extends Component {
  constructor() {
    super()
    this.state = {
      hike: {
        name: '',
        position: null,
        useAddress: false,
        address: '',
        city: '',
        state: '',
        country: ''
      },
    }
  }


  updateHike(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    let updatedAddress = Object.assign({}, updatedHike.address)
    updatedAddress[event.target.id] = event.target.value
    updatedHike[event.target.id] = event.target.value
    this.setState({
      hike: updatedHike
    })
  }

  // Set hike location to user's GPS coordinates
  useCurrentLocation(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    // console.log(JSON.stringify(this.props.userLocation.center))
    updatedHike['position'] = this.props.userLocation.center
    updatedHike['useAddress'] = false
    this.props.locationAdded(this.props.userLocation.center)
    this.setState({
      hike: updatedHike
    })
  }

  // Set hike location to address user enters in
  useAddress(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['useAddress'] = true
    this.setState({
      hike: updatedHike
    })
  }

  // Set hike location to where user clicks on map
  useMap(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    if (!this.props.location) {
      console.error('please click on the map')
      return
    }
    updatedHike['position'] = this.props.location
    updatedHike['useAddress'] = false
    this.setState({
      hike: updatedHike
    })
  }

  updateAddress(event) {
    let addressLocation = event.geometry.location
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['position'] = addressLocation
    this.setState({
      hike: updatedHike
    })
  }

  // Add new hike to database
  submitHike(hike) {
    // check if user is logged in
    if (this.props.user == null) {
      let message = 'You must be logged in to add hikes'
      this.props.displayMessage(message)
      return
    }
    // check for location
    if (this.state.hike.location == null) {
      let message = 'Add a hike location before submitting'
      this.props.displayMessage(message)
      return
    }
    let newHike = this.state.hike
    this.props.hikeCreated(newHike)
  }

  render() {
    // Allow user to choose hike by map or current location
    let lat
    let lng
    if (this.state.hike.position != null) {
      lat = this.state.hike.position.lat
      lng = this.state.hike.position.lng
    }

    // Allow user to choose hike by address
    let display = ''
    let address = this.state.hike.useAddress
    if (address == true) {
      display = (
        <div>
          <Autocomplete
            className="form-control"
            style={{width: '90%'}}
            onPlaceSelected={this.updateAddress.bind(this)}
            types={['geocode']}
          />
        </div>
      )
    }

    let errorMessage = this.props.message

    return (
      <div className="sidebar">
        <span className="error">{errorMessage}</span>
        <h3>Add a New Hike</h3>
        <span>Hike Name:</span>
        < br/>
        <input onChange={this.updateHike.bind(this)} id="name"
          className="form-control" type="text" placeholder="ex. Graveyard Fields" />
        <br />
        <span>I want to:</span>
        <br />
        <button className="btn btn-change" onClick={this.useCurrentLocation.bind(this)}>Use current location</button>
        <button className="btn btn-change" onClick={this.useAddress.bind(this)}>Enter an address</button>
        <button className="btn btn-change" onClick={this.useMap.bind(this)}>Select Map Location</button>
        <br/>
        <br />
        {display}
        <br />
        <button onClick={this.submitHike.bind(this)}
          className="btn btn-block">Add it</button>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    location: state.hike.hikeLocation,
    message: state.message.message,
    user: state.account.user,
    userLocation: state.hike.center,
  }
}

const dispatchToProps = (dispatch) => {
	return {
    displayMessage: (message) => dispatch(actions.displayMessage(message)),
    hikeCreated: (newHike) => dispatch(actions.hikeCreated(newHike)),
		locationAdded: (location) => dispatch(actions.locationAdded(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(CreateHike)
