import React, { Component } from 'react'

class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
      <div className="about">
        <div className="home-section-title">
          Hikers!
        </div>
        <div className="home-section-content">
          Do you have so many good places you just can't remember them all?
          Or maybe you are traveling, have just moved somewhere new, or are just out of new ideas?
          Myhike allows you to post locations and reviews of your hikes and search for hikes
          others have added based on location.
        </div>

        <div className="home-section-title">
          Foragers!
        </div>
        <div className="home-section-content">
          Ever forget to mark that one spot with that really sweet find?
          Aside from allowing users to leave hike reviews and descriptions,
          there are also fields specifically for plants and mushrooms you find.
        </div>

        <div className="home-section-title">
          Ecologists!
        </div>
        <div className="home-section-content">
          Myhike strives to serve as a public database of species dispersal.
          On top of photo-uploading capabilities, Myhike also allows users to share where
          they've seen different animals, plants, and fungi. Any details you
          want can be found making requests to our public API at '[sitename]/api/reviews'
        </div>
      </div>

      <div className="line"></div>

      <div className="dev">
        <p>
          My Hike is always evolving. Feel free to contact us with feature suggestions
          or check out our Github to see how you can contribute.
        </p>
      </div>

      </div>
    )
  }
}

export default HomePage
