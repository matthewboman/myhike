import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { Hike, Hikes, CreateHike, Register } from './components/containers/'
import { PhoneContainer } from './components/layout/'
import { Detail, Home } from './components/presentation'
import store from './stores'

module.exports = (
  <Route path="/" component={PhoneContainer} >
    <IndexRoute component={Home}/>
    <Route path="/add-hike" component={CreateHike} />
    <Route path="/hike/:id" component={Hike} />
    <Route path="/register" component={Register} />
  </Route>
)
