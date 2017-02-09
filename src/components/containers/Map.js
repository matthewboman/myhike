import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'

/*
  TODO: Pass props of user location to app state instead of setting user location
    as the local state. That way, user can set hike location to their current
    location in the CreateHike component.
  TODO: GET hikes from DB only within certain radius of user. Update API call
    to database as view window changes. That way the app isn't calling every
    hike in DB--only those necessary.
  TODO: One color marker for hikes, another color marker for where the user clicks.
  TODO: Figure out querystring hack in onMarkerClick()
*/

class Map extends Component {
  constructor() {
    super()
    this.state = {
      newHike : {
        lat: 35.578663399999996,
        lng: -82.6077827
      },
      center: {
        lat: 0,
        lng: 0
      }
    }
  }

  componentDidMount() {
    // Center map on user's location (or 0,0 if user doesn't want to share)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        // console.log("getCurrentPosition Success " + lat + lng)
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })

      //  use props instead of state for future
      /*  this.props.userLocationReceived({
          center: {
            lat: lat,
            lng: lng
          }
        })
      */
      },
      (error) => {
        this.props.displayError("Error dectecting your location");
        console.error(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    // GET hikes from database
    /*
    This will have to be changed so it's only grabbing hikes within
    view window of user
    */
    APIManager.get('/api/hike', null, (err, response) => {
      if (err) {
        console.log(err)
        return
      }
      this.props.hikesReceived(response.results)
    })
  }

  // Add marker to map where user clicks and re-direct to CreateHike component
  addMarker(event) {
    // Display marker where user clicks
    let clicked = Object.assign({}, this.state.newHike)
    clicked.lat = event.latLng.lat()
    clicked.lng = event.latLng.lng()
    this.setState({
      newHike: clicked
    })
    // Set app state location to where user clicks
    this.props.locationAdded(clicked)
    // Open CreateHike component on right side
    browserHistory.push(`/add-hike`)
  }

  // Make right component display hike when marker clicked
  onMarkerClick(id) {
    const hikeId = id
    // Set params to be fetched
    this.props.hikeSelected(hikeId)
    // GET hike data from database
    const hack = "/api/hike/" + hikeId
    APIManager.get(hack, null, (err, response) => { // hack to get around whatever error this is
    // APIManager.get("/api/hike/", params, (err, response) => { // what it should be
      if (err) {
        console.error(err)
        return
      }
      this.props.currentHikeReceived(response.result)
    })
    // Change path to selected hike
    const path = `/hike/${hikeId}`
    browserHistory.push(path)
  }

  render() {
    // Set map center to user location (component state version)
    const center = this.state.center
    if (center.lat == 0 && center.lng ==0) { return null }

    // Set map center to user location (app state version)
    /*
    const center = this.props.userLocation
    if (center.lat || center.lng == 0 || null || undefined) { return null }
    */
    
    // Place newHike marker where user clicks
    const marker = {
      position: this.state.newHike
    }
    // Mount hike markers to map
    if (this.props.hikes == null || undefined) { return false }
    const hikes = this.props.hikes.map((hike, id) => {
      const hikeMarker = {
        position: {
          lat: hike.position.lat,
          lng: hike.position.lng
        },
        id : hike._id
      }
      return <Marker
                key={id}
                {...hikeMarker}
                onClick={this.onMarkerClick.bind(this, hike._id)}
              />
    })

    return (
      <GoogleMapLoader
        containerElement = { this.props.mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom={10}
          /*  defaultCenter={this.props.center} */
            defaultCenter={this.state.center}
            options={{streetViewControl: false, mapTypeControl: false}}
            onClick={this.addMarker.bind(this)} >
             <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(index)}
              />
              {hikes}
          </GoogleMap>
        } />
    )
  }
}

const stateToProps = (state) => {
  return {
    hikes: state.hike.list,
    location: state.newHike,
    // userLocation: state.hike.center,
  }
}

const dispatchToProps = (dispatch) => {
	return {
    currentHikeReceived: (hike) => dispatch(actions.currentHikeReceived(hike)),
    hikesReceived: (hikes) => dispatch(actions.hikesReceived(hikes)),
    hikeSelected: (hike) => dispatch(actions.hikeSelected(hike)),
		locationAdded: (location) => dispatch(actions.locationAdded(location)),
    userLocationReceived: (center) => dispatch(actions.userLocationReceived(center)),
	}
}

export default connect(stateToProps, dispatchToProps)(Map)
