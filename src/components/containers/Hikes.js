import React, { Component } from 'react'
import { Link } from 'react-router'

import { Hike } from '../presentation'
import { APIManager } from '../../utils'

class Hikes extends Component {

  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    APIManager.get('/api/hike', null, (err, response) => {
      if (err) {
        console.error('ERROR: ' + err.message)
        return
      }

      this.setState({
        list: response.results
      })
    })
  }

  render() {

    const listItems = this.state.list.map((hike, i) => {
      return (
        <li key={i}>
          <Hike index={i} currentHike={hike} />
        </li>
      )
    })

    return (
      <div>
        <h3>List of hikes</h3>

          <ul>
            {listItems}
          </ul>
      </div>
    )
  }
}

export default Hikes
