import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import mobileRoutes from './mobileRoutes'
import routes from './routes'
import store from './store/store'

import Main from './components/Main'
import { Home, ProfileInfo } from './components/layout'
import { Account, CreateHike, Hike, Profile } from './components/containers'

/*
// NOTE: path="../profile/:id"
//  It has to go up a directory because, at the moment, profiles
//  are accessible through clicking on a review on a hike. Without
//  the preceding '../' path would be '/hike/profile/:id'.
//
// TODO: Figure out a way of rending the profile from the Review
//  that doesn't prevent route from working at other times.
*/

// Get initial state as rendered by the server
const initialState = window.__PRELOADED_STATE__

const app = (
  <Provider store={store.configureStore(initialState)}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>

        <IndexRoute component={Home}></IndexRoute>
        <Route path="/hike/:id" component={Hike}></Route>
        <Route path="/create-hike" component={CreateHike}></Route>
        <Route path="/currentuser" component={Account}></Route>
        <Route path="../profile/:id" component={ProfileInfo}></Route>
        <Route path="/profile/:id" component={ProfileInfo}></Route>


      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))


/*
PRE-server-side rendering
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
*/
