import constants from '../constants'

var initialState = {
  user: null
}

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state)

  switch (action.type) {
    
    // Assign 'currentUser' property when new user signs up
    case constants.PROFILE_CREATED:
      updatedState['user'] = action.profile
      return updatedState

    // Assign 'currentUser' property when returning user logs in
    case constants.CURRENT_USER_RECEIVED:
      console.log('CURRENT_USER_RECEIVED: ' + JSON.stringify(action.user))
      updatedState['user'] = action.user
      console.log('updatedState ' + JSON.stringify(updatedState))
      return updatedState

    default:
      return state
  }
}
