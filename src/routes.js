import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { Hike, Hikes, CreateHike, Register, ReviewHike } from './components/containers/'
import { Container } from './components/layout/'
import { Detail, Home } from './components/presentation'
import store from './stores'

module.exports = (
  <Route path="/" component={Container} >
    <IndexRoute component={Home}/>
    <Route path="/add-hike" component={CreateHike} />
    <Route path="/hike/:id" component={Hike} />
    <Route path="/register" component={Register} />
    <Route path="/review-hike" component={ReviewHike} />
  </Route>
)
