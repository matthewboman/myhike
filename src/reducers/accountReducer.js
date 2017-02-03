import constants from '../constants'

var initialState = {
  currentUser: null
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type) {
    // assign 'currentUser' property when new user signs up
    case constants.PROFILE_CREATED:
      updated['currentUser'] = action.profile
      return updated

    case constants.CURRENT_USER_RECEIVED:
      updated['currentUser'] = action.profile
      return updated

    default:
      return state
  }
}
