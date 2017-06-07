import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import routes from './routes'
import store from './store/store'

import Main from './components/Main'
import { AccountContainer, CreateHikeContainer, HikeContainer, HomeContainer,
         ProfileContainer } from './components/containers'

/*
// NOTE:
//  for client side rendering: path="../profile/:id"
//  for server-side rendering: path="/profile/:id"
//  both go tothe same place
*/

// Get initial state as rendered by the server
const initialState = window.__PRELOADED_STATE__

const app = (
  <Provider store={store.configureStore(initialState)}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>

        <IndexRoute component={HomeContainer}></IndexRoute>
        <Route path="/hike/:id" component={HikeContainer}></Route>
        <Route path="/create-hike" component={CreateHikeContainer}></Route>
        <Route path="/currentuser" component={AccountContainer}></Route>
        <Route path="../profile/:id" component={ProfileContainer}></Route>
        <Route path="/profile/:id" component={ProfileContainer}></Route>

      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
