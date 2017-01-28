import React, { Component } from 'react'

import { APIManager } from '../../utils'

class CreateHike extends Component {
  constructor() {
    super()
    this.state = {
      hike: {
        name: '',
        location: [],
        description: '',
        plants: '',
        fungi: '',
        animals: '',
        pictures: [],
      }
    }
  }

  updateHike(event) {
    let updatedHike = Object.assign({}, this.state.hike)
    updatedHike[event.target.id] = event.target.value
    this.setState({
      hike: updatedHike
    })
  }

  submitHike(hike) {
    APIManager.post('/api/hike', this.state.hike, (err, response) => {
      if (err) {
        console.error('ERROR: ' + err.message)
      }
    })
  }

  render() {
    return (
      <div>
        <h3>Add a New Hike</h3>
        <input onChange={this.updateHike.bind(this)} id="name"
          className="form-control" type="text" placeholder="Hike Name" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="location"
          className="form-control" type="text" placeholder="Where at?" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="description"
          className="form-control" type="text" placeholder="Describe it!" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="plants"
          className="form-control" type="text" placeholder="What plants?" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="fungi"
          className="form-control" type="text" placeholder="What mushrooms?" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="animals"
          className="form-control" type="text" placeholder="What animals" />
        <br />
        <input onChange={this.updateHike.bind(this)} id="pictures"
          className="form-control" type="text" placeholder="upload here" />
        <br />
        <button onClick={this.submitHike.bind(this)}
          className="btn btn-info btn-block">Add it</button>
      </div>
    )
  }
}

export default CreateHike
