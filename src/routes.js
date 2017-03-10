import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { Hike, Hikes, CreateHike, Register, ReviewHike } from './components/containers/'
import { Container } from './components/layout/'
import { Detail, HomePage } from './components/presentation'
import store from './store/store'

module.exports = (
  <Route path="/" component={Container} >
    <IndexRoute component={HomePage}/>
    <Route path="/add-hike" component={CreateHike} />
    <Route path="/hike/:id" component={Hike} />
    <Route path="/register" component={Register} />
    <Route path="/review-hike" component={ReviewHike} />
  </Route>
)
