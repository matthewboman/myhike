import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Main from './components/Main'

/*
  Server-side rendering:
    Any call to the browser (e.g. 'document', 'window', etc.) will cause the
    server to crash b/c it doesn't exist in Node
*/

class App extends Component {
  render() {
    return (
      <Provider store={this.props.route.initial}>
        <Main {...this.props} />
      </Provider>
    )
  }
}


export default App
