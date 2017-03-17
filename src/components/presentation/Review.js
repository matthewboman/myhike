import React, { Component } from 'react'
import { Link } from 'react-router'

import { Images } from '../presentation'
import { ImageHelper } from '../../utils'

/*
TODO: get to work with textbox instead of input
*/

class CreateHike extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      review: props.review
    }
  }

  // Show/hide review editing capabilities
  toggleEdit(event) {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  // Update only the fields that the user edited
  updateReview(event) {
    let updatedReview = Object.assign({}, this.state.review)
    let value = (!event.target.value) ? event.target.defaultValue : event.target.value
    updatedReview[event.target.id] = value
    this.setState({
      review: updatedReview
    })
  }

  submitUpdate(event) {
    event.preventDefault()
    this.props.onUpdate(this.state.review)
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  render() {
    let review = this.props.review
    let reviewDate = review.timestamp.slice(0, review.timestamp.indexOf("T"))

    const author = review.user
    const editable = (this.props.isEditable) ? this.props.isEditable : false

    let content = null

    // Render review or editing mode
    if (this.state.isEditing == true) {
      content = (
        <div className="review-block">
        <h4 className="review-header">Review/description: </h4>
        <input
          id="description"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.description} />
        <h4 className="review-header">Animals spotted: </h4>
        <input
          id="animals"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.animals} />
        <h4 className="review-header">Plants identified: </h4>
        <input
          id="plants"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.plants} />
        <h4 className="review-header">Mushrooms and other fungi: </h4>
        <input
          id="fungi"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.fungi} />
        <button onClick={this.submitUpdate.bind(this)}>Update Review</button>
        </div>
      )
    } else {
      content = (
        <div className="review-block">
          <h4 className="review-header">Review/description: </h4>
          <p className="review-description">
            {review.description}
          </p>
          <h4 className="review-header">Animals spotted: </h4>
          <p className="review-animals">
            {review.animals}
          </p>
          <h4 className="review-header">Plants identified: </h4>
          <p className="review-plants">
            {review.plants}
          </p>
          <h4 className="review-header">Mushrooms and other fungi: </h4>
          <p className="review-fungi">
            {review.fungi}
          </p>
          <img className="icon-image" src={ImageHelper.thumbnail(author.image, 40)} />
          <span>
            <Link to={"../profile/" + author.id}>{author.username}</Link>
          </span>
          <span> | </span>
          <span>{reviewDate}</span>
          {
            (editable) ? <button className="review-edit-button" onClick={this.toggleEdit.bind(this)}>Edit Review</button> : null
          }
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default CreateHike
