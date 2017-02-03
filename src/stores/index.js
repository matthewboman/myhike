import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { accountReducer, hikeReducer } from '../reducers'

var store;

export default {

  configureStore: () => {
    // combine all reducers
    const reducers = combineReducers({

      account: accountReducer,
      hike: hikeReducer,

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
