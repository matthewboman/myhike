import React, { Component } from 'react'
import Select from 'react-select'

class SearchDifficulty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levels: [
        { value: 'easy', label: 'easy' },
        { value: 'moderate', label: 'moderate' },
        { value: 'strenuous', label: 'strenuous' },
        { value: 'very strenuous', label: 'very strenuous' },
      ],
      term: ''
    }
  }

  searchByDifficulty() {
    this.props.searchByDifficulty(this.state.term)
  }

  render() {
    return (
      <div className="search-difficulty-container">
        <div className="search-header">
          Search by difficulty
        </div>
        <Select
          name="term-field"
          className="difficulty-select"
          placeholder="difficulty level"
          searchable={false}
          value={this.state.term}
          clearable={false}
          options={this.state.levels}
          autoBlur
          onChange={(term) => this.setState({ term }) } />
        <button className="button-right button-default"
          onClick={this.searchByDifficulty.bind(this)}>
          Search
        </button>
      </div>
    )
  }

}

export default SearchDifficulty
