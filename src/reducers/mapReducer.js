import constants from '../constants'

var initialState = {
  // appStatus: 'ready',
  list: []
}

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state)

  switch (action.type) {

    case constants.HIKE_ADDED:
      // console.log('HIKE_ADDED: ' + JSON.stringify(action.hike))
      updatedState['list'].push(action.hike)
      return updatedState

    case constants.HIKES_RECEIVED:
      // console.log('HIKES_RECEIVED ' + JSON.stringify(action.hikes))
      updatedState['list'] = action.hikes
      updatedState['appStatus'] = 'ready'
      return updatedState

    case constants.APPLICATION_STATE:
      if (action.reducer != 'hike') {
        return updatedState
      }
      updatedState['appStatus'] = action.status
      return updatedState

    default:
      return state
  }
}
