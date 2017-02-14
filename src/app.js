import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import mobileRoutes from './mobileRoutes'
import routes from './routes'
import store from './stores'


class App extends Component {
  render() {
    const deviceWidth = window.innerWidth
    return (
      <Provider store={store.configureStore()}>
        {
          (deviceWidth >= 768) ? <Router routes={routes} history={browserHistory} />
          : <Router routes={mobileRoutes} history={browserHistory} />
        }
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('root'))
