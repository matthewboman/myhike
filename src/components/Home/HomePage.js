import React, { Component } from 'react'
import SearchDifficulty from './SearchDifficulty'
import SearchFeatures from './SearchFeatures'
import SearchMany from './SearchMany'
import { Review } from '../Reviews'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderSearchResults() {
    if (this.props.searchResults && this.props.searchResults.length > 0) {
      return this.props.searchResults.map((review, i) => {
        return (
          <Review key={i}
                  review={review}
                  displayName={true} />
        )
      })
    }
  }

  render() {
    return (
      <div className="homepage-right">
        <div className="homepage-header-background-image">
          <div className="home-text">
            <div className="home-instructions">
            Use the map to search for a hike, or sign in to create/review hikes of your own
            </div>
            <SearchDifficulty
              searchByDifficulty={this.props.searchByDifficulty.bind(this)} />
            <SearchFeatures
              searchByFeatures={this.props.searchByFeatures.bind(this)} />
            <SearchMany
              searchByField={this.props.searchByField.bind(this)} />
            {this.renderSearchResults()}

          </div>
        </div>

      </div>
    )
  }
}

export default HomePage
