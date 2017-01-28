import React, { Component } from 'react'

import { Map, Hikes } from '../containers'
import Sidebar from './Sidebar'
import styles from './styles'

class Container extends Component {
  render() {
    const location = {
      lat: 40.7575285,
      lng: -73.9884469
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{width:300, height:600}}>
            <Map center={location}/>
          </div>
          <div className="col-md-8">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Container
