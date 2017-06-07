import constants from '../constants'

var initialState = {
  user: null
}

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state)

  switch (action.type) {

    case constants.CURRENT_USER_RECEIVED:
      // console.log('CURRENT_USER_RECEIVED: ' + JSON.stringify(action.user))
      updatedState['user'] = action.user
      return updatedState

    default:
      return state
  }
}
