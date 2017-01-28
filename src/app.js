import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Container from './components/layout/Container'
import { Hikes, CreateHike } from './components/containers/'
import Detail from './components/views/Detail'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Container} >
          <IndexRoute component={CreateHike} />
          <Route path="add-hike" component={CreateHike} />
          <Route path="detail/:placeId" component={Detail} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('root'))
