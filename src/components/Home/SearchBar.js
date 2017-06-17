import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchableFields: [
        'plants',
        'animals',
        'fungi'
      ],
      searchTerm: '',
      inputValue: ''
    }
  }

  filterOptions() {

  }

  loadOptions() {

  }

  updateInput() {

  }

  listHikes() {

  }

  render() {
    return (
      <div>
        <Select.Async
          name="search-field"
          className="addactivitysearch-wrapper"
          placeholder="What are you looking for?"
          value={this.state.query}
          arrowRenderer={() => ''}
          filterOptions={this.filterOptions.bind(this)}
          clearable={false}
          autoload={false}
          cache={false}
          onBlurResetsInput={false}
          optionRenderer={this.renderOption}
          loadOptions={this.loadOptions.bind(this)}
          autoBlur
          onInputChange={(inputValue) => this.setState({ inputValue }) }
          onInputKeyDown={this.updateInput.bind(this)}
          onChange={this.listHikes.bind(this)}
          onFocus={() => this.state.query ? this.setState({ query: undefined }) : undefined}
          menuRenderer={this.menuRenderer.bind(this)}
        />
        <Select
              name="term-field"
              className="term-wrapper"
              placeholder="term"
              searchable={false}
              value={this.state.searchTerm}
              clearable={false}
              options={this.state.searchableFields}
              autoBlur
              onChange={(searchTerm) => this.setState({ searchTerm }) }
            />
        </div>
    )
  }

}

export default SearchBar
