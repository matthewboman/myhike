import React, { Component } from 'react'

import { Images } from '../common'


class CreateReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      review: {
        animals: '',
        description: '',
        fungi: '',
        pictures: [],
        plants: '',
        user: props.user,
        hikeId: props.hike.id,
        userId: props.user.id
      }
    }
  }

  componentDidMount() {
    console.log(this.props.user.id)
  }

  updateHike(event) {
    let updatedReview = Object.assign({}, this.state.review)
    updatedReview[event.target.id] = event.target.value
    this.setState({
      review: updatedReview
    })
  }

  addImages(event) {
    let updatedReview = Object.assign({}, this.state.review)
    // Add images from Image component
    let updatedImages = Object.assign([], this.state.review.pictures)
    for (let value of event) {
      updatedImages.push(value.secure_url)
    }
    updatedReview["pictures"] = updatedImages

    this.setState({
      review: updatedReview
    })
  }

  submitHike(review) {
    event.preventDefault()
    this.props.onReview(this.state.review)
  }


  render() {

    return (
      <div className="review-block">
        <h3>Add your own review</h3>
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
        <Images onImageSubmit={this.addImages.bind(this)}/>
        <br />
        <button onClick={this.submitHike.bind(this)}
          className="btn add-review-btn">Add it</button>
      </div>
    )
  }
}

export default CreateReview
