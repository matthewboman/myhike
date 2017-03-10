import React, { Component } from 'react'

class HomePage extends Component {
  render() {
    return (
      <div className="sidebar">
        <h2>Welcome</h2>
        <div className="hikeBlock">
          <p>
          My Hike is sort of like a social network meets wikipedia meets public database.
          This site allows nature enthusiasts to share their favorite spots and foragers
          their best finds, as well as provide a public database of species dispersal
          to measure the effects of climate change on different ecosystems.
          </p>
          <p>
          If you have hikes to share, you can register and start posting. If you're
          just here to look around, everything is public and free--just click on a
          marker to get a hike's details.
          </p>
        </div>
        <div className="hikeBlock">
          <p>
            My Hike is currently in development phase. Here are some things we could
            use help with: allowing user's to edit their own hikes but not others,
            enabling photo-sharing capability, making hikes searchable by description
            or wildlife.
          </p>
        </div>
      </div>
    )
  }
}

export default HomePage
