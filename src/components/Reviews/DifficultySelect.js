import React, { Component } from 'react'
import Select from 'react-select'

const difficulty = [
  { value: 'easy', label: 'easy' },
  { value: 'moderate', label: 'moderate' },
  { value: 'strenuous', label: 'strenuous' },
  { value: 'very strenuous', label: 'very strenuous' },
]

class DifficultySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: ''
    }
  }

  updateDifficulty(difficulty) {
    this.setState({difficulty}, () => {
      this.props.addDifficultyToHike(this.state.difficulty)
    })
  }

  render() {
    return (
      <Select name="difficulty"
              value={this.state.difficulty}
              options={difficulty}
              onChange={this.updateDifficulty.bind(this)} />
    )
  }
}

export default DifficultySelect
