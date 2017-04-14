import React, { Component } from 'react'
import { Link } from 'react-router'
import Modal from 'react-modal'

import { Images } from '../presentation'
import { ImageHelper } from '../../utils'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class CreateHike extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      review: props.review,
      currentPicture: '',
      modalIsOpen: false,
    },
    this.closeModal = this.closeModal.bind(this)
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

  displayPicture(event, picture, id) {
    console.log(event)
    // BUG: for some reason picture is the first and not second argument?
    this.setState({
      currentPicture: event,
      modalIsOpen: true,
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    let review = this.props.review
    let reviewDate = review.timestamp.slice(0, review.timestamp.indexOf("T"))

    const author = review.user
    const authorImage = (author.image) ? author.image : "/images/default-user-sm.png"
    const editable = (this.props.isEditable) ? this.props.isEditable : false
    const photos = this.props.review.pictures.map((picture, id) => {
      return (
        <li key={id}>
          <img
            className="hike-review-photo"
            src={ImageHelper.preview(picture, 150, 200)}
            onClick={this.displayPicture.bind(this, picture, id)}/>
        </li>
      )
    })

    let modalPicture = <img src={this.state.currentPicture} />

    let content = null

    // Render review or editing mode
    if (this.state.isEditing == true) {
      content = (
        <div className="review-block">
        <h4 className="review-header">Review/description: </h4>
        <textarea
          id="description"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.description} />
        <h4 className="review-header">Animals spotted: </h4>
        <input
          id="animals"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.animals} />
        <h4 className="review-header">Plants identified: </h4>
        <input
          id="plants"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.plants} />
        <h4 className="review-header">Mushrooms and other fungi: </h4>
        <input
          id="fungi"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={review.fungi} />
        <br />
        <button className="btn review-edit-button" onClick={this.submitUpdate.bind(this)}>Update Review</button>
        </div>
      )
    } else {
      content = (
        <div className="review-block">
          <ul className="hike-review-photos">
          {photos}
          </ul>
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
          <img className="icon-image" src={ImageHelper.thumbnail(authorImage, 40)} />
          <span>
            <Link to={"../profile/" + author.id}>{author.username}</Link>
          </span>
          <span> | </span>
          <span>{reviewDate}</span>
          {
            (editable) ? <button className="btn review-edit-button" onClick={this.toggleEdit.bind(this)}>Edit Review</button> : null
          }
        </div>
      )
    }

    return (
      <div>
        {content}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Picture Modal"
        >
          <button className="x-button" onClick={this.closeModal}>X</button>
          {modalPicture}
        </Modal>
      </div>
    )
  }
}

export default CreateHike
