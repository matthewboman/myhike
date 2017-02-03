import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import routes from './routes'
import store from './stores'

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <Router routes={routes} history={browserHistory} />
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('root'))
