import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Error extends Component {
  constructor(props) {
    super(props)
  }

  clearError() {
    this.props.displayError('')
  }

  render() {
    return (
      <div className="error-block" onClick={this.clearError.bind(this)}>
        {this.props.error}
      </div>
    )
  }

}

const stateToProps = (state) => {
  return {
    error: state.message.error
  }
}

const dispatchToProps = (dispatch) => {
  return {
    displayError: (error) => dispatch(actions.displayError(error))
  }
}

export default connect(stateToProps, dispatchToProps)(Error)
