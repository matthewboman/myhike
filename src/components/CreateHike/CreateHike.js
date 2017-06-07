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
        address: ''
      }
    }
  }

  updateHike(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    let updatedAddress = Object.assign({}, updatedHike.address)
    updatedAddress[event.target.id] = event.target.value
    updatedHike[event.target.id] = event.target.value
    this.setState({ hike: updatedHike })
  }

  useCurrentLocation(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['position'] = this.props.userLocation
    this.setState({ hike: updatedHike })
    this.props.markHikeLocation(this.props.userLocation, false)
  }

  useAddress(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['useAddress'] = true
    this.setState({ hike: updatedHike })
  }

  updateAddress(event) {
    let addressLocation = event.geometry.location
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike['position'] = addressLocation
    this.setState({ hike: updatedHike })
    this.props.markHikeLocation(this.state.hike.position, false)
  }

  useMap(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    if (!this.props.clickedLocation) {
      this.props.displayMessage('please click on the map')
      return
    }
    updatedHike['position'] = this.props.clickedLocation
    updatedHike['useAddress'] = false
    this.setState({
      hike: updatedHike
    })
    this.props.markHikeLocation(this.props.clickedLocation, true)
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
  }

  renderAddressSearch() {
    if (this.state.hike.useAddress)
      return (
        <Autocomplete
          className="form-control"
          style={{width: '90%'}}
          onPlaceSelected={this.updateAddress.bind(this)}
          types={['geocode']}
        />
      )
  }

  render() {
    return (
      <div className="create-hike-sidebar">
        <h3>Add a New Hike</h3>
        <span className="error">{this.props.error}</span>
        <span className="message">{this.props.message}</span>
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
        {this.renderAddressSearch()}
        <br />
        <button onClick={this.submitHike.bind(this)}
          className="btn">Add it</button>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    clickedLocation: state.hike.clickedLocation,
    error: state.message.error,
    hikeLocation: state.hike.hikeLocation,
    message: state.message.message,
    user: state.account.user,
    userLocation: state.hike.userLocation,
  }
}

const dispatchToProps = (dispatch) => {
	return {
    displayError: (message) => dispatch(actions.displayError(message)),
    displayMessage: (message) => dispatch(actions.displayMessage(message)),
    hikeCreated: (newHike) => dispatch(actions.hikeCreated(newHike)),
    markHikeLocation: (location, usingMap) => dispatch(actions.markHikeLocation(location, usingMap)),
	}
}

export default connect(stateToProps, dispatchToProps)(CreateHike)
