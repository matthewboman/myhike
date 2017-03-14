import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { accountReducer, hikeReducer, mapReducer, profileReducer, reviewReducer } from '../reducers'

var store;

export default {

  configureStore: (initial) => {
    // combine all reducers
    const reducers = combineReducers({
      account: accountReducer,
      hike: hikeReducer,
      map: mapReducer,
      profile: profileReducer,
      review: reviewReducer,
    })

    store = createStore(
      reducers,
      initial,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }

}
