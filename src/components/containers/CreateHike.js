import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Images } from '../presentation'

/*
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
    updatedHike['position'] = this.props.userLocation.center
    updatedHike['useAddress'] = false
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

  // Add new hike to database
  submitHike(hike) {
    console.log('submitting ' + JSON.stringify(this.state.hike))
    // check if user is logged in
    if (this.props.user == null) {
      alert('You must be signed up')
      return
    }
    let newHike = this.state.hike
    this.props.hikeCreated(newHike)
  }


  render() {
    // Allow user to choose hike by map or current location
    let lat
    let lng
    if (this.state.position != null) {
      lat = this.state.hike.position.lat
      lng = this.state.hike.position.lng
    }

    // Allow user to choose hike by address
    let display = ''
    let address = this.state.hike.useAddress
    if (address == true) {
      display = (
        <div>
          <input onChange={this.updateHike.bind(this)} id="address"
            className="form-control" type="text" placeholder="Address" />
          <br />
          <input onChange={this.updateHike.bind(this)} id="city"
            className="form-control" type="text" placeholder="City" />
          <br />
          <input onChange={this.updateHike.bind(this)} id="state"
            className="form-control" type="text" placeholder="State" />
          <br />
          <input onChange={this.updateHike.bind(this)} id="country"
            className="form-control" type="text" placeholder="Country" />
          <br />
        </div>
      )
    } else {
      display = (
        <div>
          <p>Hike location is at latitude {lat} and longitude {lng}</p>
        </div>
      )
    }

    return (
      <div className="sidebar">
        <h3>Add a New Hike</h3>
        <input onChange={this.updateHike.bind(this)} id="name"
          className="form-control" type="text" placeholder="Hike Name" />
        <br />
        <button onClick={this.useCurrentLocation.bind(this)}>Use current location</button>
        <button onClick={this.useAddress.bind(this)}>Enter an address</button>
        <button onClick={this.useMap.bind(this)}>Select Map Location</button>
        <br/>
        <br />
        {display}
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
    user: state.account.user,
    userLocation: state.hike.center,
  }
}

const dispatchToProps = (dispatch) => {
	return {
    hikeCreated: (newHike) => dispatch(actions.hikeCreated(newHike)),
		locationAdded: (location) => dispatch(actions.locationAdded(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(CreateHike)
