import constants from '../constants'

var initialState = {
  user: null
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type) {
    // Assign 'currentUser' property when new user signs up
    case constants.PROFILE_CREATED:
      updated['currentUser'] = action.profile
      return updated

    // Assign 'currentUser' property when returning user logs in
    case constants.CURRENT_USER_RECEIVED:
      updated['currentUser'] = action.profile
      return updated

    default:
      return state
  }
}
