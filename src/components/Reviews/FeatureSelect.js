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

class FeatureSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: []
    }
  }

  updateValues(value) {
    this.setState({value}, () => {
      this.props.addFeaturesToHike(this.state.value)
    })
  }

  render() {
    return (
      <Select multi simpleValue
              value={this.state.value}
              placeholder="Select your favourite(s)"
              options={features}
              onChange={this.updateValues.bind(this)} />
    )
  }
}

export default FeatureSelect
