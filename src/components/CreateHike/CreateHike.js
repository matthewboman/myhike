import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autocomplete from 'react-google-autocomplete';

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Images } from '../common'

class CreateHike extends Component {
  constructor() {
    super()
    this.state = {
      hike: {
        name: '',
        position: {},
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

  useCurrentLocation(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['position'] = this.props.userLocation
    this.setState({
      hike: updatedHike
    })
    this.props.markHikeLocation(this.props.userLocation)
  }

  useAddress(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['useAddress'] = true
    this.setState({
      hike: updatedHike
    })
  }

  useMap(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    if (!this.props.hikeLocation) {
      this.props.displayError('please click on the map')
      return
    }
    updatedHike['position'] = this.props.hikeLocation
    updatedHike['useAddress'] = false
    this.setState({
      hike: updatedHike
    })
    this.props.markHikeLocation(this.state.hike.position)
  }

  updateAddress(event) {
    let addressLocation = event.geometry.location
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['position'] = addressLocation
    this.setState({
      hike: updatedHike
    })
    this.props.markHikeLocation(this.state.hike.position)
  }

  submitHike(hike) {
    if (this.props.user == null) {
      this.props.displayError('You must be logged in to add hikes')
      return
    }
    if (this.state.hike.location == null) {
      this.props.displayError('Add a hike location before submitting')
      return
    }
    let newHike = this.state.hike
    this.props.hikeCreated(newHike)
    // console.log('submitting ' + JSON.stringify(this.state.hike))
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

    let errorMessage = this.props.error

    return (
      <div className="create-hike-sidebar">
        <span className="error">{errorMessage}</span>
        <h3>Add a New Hike</h3>
        <input onChange={this.updateHike.bind(this)} id="name"
          className="form-control" type="text" placeholder="Hike name" />
        <br />
        <div className="add-hike-how">
          <span>I want to:</span>
          <span className="location-type" onClick={this.useCurrentLocation.bind(this)}>Use current location</span>
          <span className="location-type" onClick={this.useAddress.bind(this)}>Enter an address</span>
          <span className="location-type" onClick={this.useMap.bind(this)}>Select Map Location</span>
        </div>
        <br/>
        <br />
        {display}
        <br />
        <button onClick={this.submitHike.bind(this)}
          className="btn">Add it</button>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    hikeLocation: state.hike.hikeLocation,
    error: state.message.error,
    user: state.account.user,
    userLocation: state.hike.userLocation,
  }
}

const dispatchToProps = (dispatch) => {
	return {
    displayError: (message) => dispatch(actions.displayError(message)),
    hikeCreated: (newHike) => dispatch(actions.hikeCreated(newHike)),
    markHikeLocation: (location) => dispatch(actions.markHikeLocation(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(CreateHike)
