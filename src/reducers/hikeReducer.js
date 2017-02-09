import constants from '../constants'

var initialState = {
  hikeLocation: null,
  list: [],
  selectedHike: null,
  currentHike: null,
  center: null
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type) {

    // Set hike location on map click
    case constants.CURRENT_HIKE_RECEIVED:
    // console.log('CURRENT_HIKE_RECEIVED ' + JSON.stringify(action.hike))
      updated['currentHike'] = action.hike
      return updated

    // Hikes gotten from database
    case constants.HIKES_RECEIVED:
      console.log('HIKES_RECEIVED ' + JSON.stringify(action.hikes))
      updated['list'] = action.hikes
      return updated

    // Hike marker on map clicked
    case constants.HIKE_SELECTED:
      // console.log('HIKE_SELECTED ' + JSON.stringify(action.hike))
      updated['selectedHike'] = action.hike
      return updated

    //
    case constants.LOCATION_ADDED:
      // console.log('LOCATION_ADDED ' + JSON.stringify(action.location))
      updated['hikeLocation'] = action.location
      return updated

    // User location gotten from browser -- not currently implemented
    case constants.USER_LOCATION_RECEIVED:
      console.log('USER_LOCATION_RECEIVED ' + JSON.stringify(action.center))
      updated['center'] = action.center
      return updated

    default:
      return state
  }
}
