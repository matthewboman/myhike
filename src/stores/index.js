import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { accountReducer, hikeReducer, mapReducer } from '../reducers'

var store;

export default {

  configureStore: () => {
    // combine all reducers
    const reducers = combineReducers({
      account: accountReducer,
      hike: hikeReducer,
      map: mapReducer,
    })

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }

}
