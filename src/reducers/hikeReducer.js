import constants from '../constants'

var initialState = {
  hikeLocation: null,
  list: [],
  selectedHike: null,
  currentHike: null,
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type) {

    case constants.CURRENT_HIKE_RECEIVED:
    // console.log('CURRENT_HIKE_RECEIVED ' + JSON.stringify(action.hike))
      updated['currentHike'] = action.hike
      return updated

    case constants.HIKES_RECEIVED:
      // console.log('HIKES_RECEIVED ' + JSON.stringify(action.hikes))
      updated['list'] = action.hikes
      return updated

    case constants.HIKE_SELECTED:
      // console.log('HIKE_SELECTED ' + JSON.stringify(action.hike))
      updated['selectedHike'] = action.hike
      return updated

    case constants.LOCATION_ADDED:
      // console.log('LOCATION_ADDED ' + JSON.stringify(action.location))
      updated['hikeLocation'] = action.location
      return updated

    default:
      return state
  }
}
