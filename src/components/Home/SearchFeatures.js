import React, { Component } from 'react'
import Select from 'react-select'

const features = [
  { value: 'waterfalls', label: 'waterfalls' },
  { value: 'scenic views', label: 'scenic views' },
  { value: 'river or stream', label: 'river or stream' },
  { value: 'lake', label: 'lake' },
  { value: 'paved path', label: 'paved path' },
  { value: 'dirt path', value: 'dirt path' }
]

class SearchFeatures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      mustIncludeAll: false,
    }
  }

  componentDidUpdate() {
    console.log(this.state.mustIncludeAll)
  }

  updateValues(value) {
    this.setState({value})
  }

  searchByFeatures() {
    this.props.searchByFeatures(this.state.value, this.state.mustIncludeAll)
  }

  toggleCheckbox() {
    this.setState({ mustIncludeAll: !this.state.mustIncludeAll })
  }

  render() {
    return (
      <div className="search-feature-container">
        <div className="search-header">
          Search for specific features
        </div>
        <Select multi simpleValue
                className="feature-select"
                value={this.state.value}
                placeholder="Noteable features"
                options={features}
                onChange={this.updateValues.bind(this)} />
        <span className="include-all">Hike must include all</span>
        <input type="checkbox"
               checked={this.state.mustIncludeAll}
               onChange={this.toggleCheckbox.bind(this)} />

             <button className="button-right button-default"
                onClick={this.searchByFeatures.bind(this)}>
          Search
        </button>
      </div>
    )
  }

}

export default SearchFeatures
