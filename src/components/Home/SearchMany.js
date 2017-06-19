import React, { Component } from 'react'
import Select from 'react-select'

const field = [
  { value: 'animals', label: 'animals'},
  { value: 'plants', label: 'plants'},
  { value: 'fungi', label: 'fungi'}
]

class SearchMany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      field: '',
      term: ''
    }
  }

  updateSearchTerm(event) {
    this.setState({ term: event.target.value })
  }

  searchByField() {
    this.props.searchByField(this.state.field.value, this.state.term)
  }

  render() {
    return (
      <div className="search-many-container">
        <div className="search-header">
          Search in categories
        </div>
        <input className="form-control"
               placeholder="Seach for"
               onChange={this.updateSearchTerm.bind(this)}/>
        <Select
          name="term-field"
          className="many-select"
          placeholder="in"
          searchable={false}
          value={this.state.field}
          clearable={false}
          options={field}
          autoBlur
          onChange={(field) => this.setState({ field }) } />
        <button className="button-right button-default"
                onClick={this.searchByField.bind(this)}>
          Search
        </button>
      </div>
    )
  }
}

export default SearchMany
