# myhike
My Hike is sort of like a social network meets wikipedia meets public database.
This app allows nature enthusiasts to share their favorite spots and foragers
their best finds, and also provides a public database of species dispersal
to measure the effects of climate change on different ecosystems.

## mobile compatibility
I know web design is mobile-first, but part of this project was to experiment using
the [shoji](https://crashspringfield.github.io/shoji/) component I wrote. The next phase
of this project will most-likely be building a mobile-friendly version, either with
React-Native, or detecting screen to render a mobile- or desktop-friendly viewport.

## contributing
This is an ongoing project, so this is as much as a personal to-do list as it's a
list of ways anyone interested can help:

      - Routing: React-Router handles most things and the server-side [index](https://github.com/crashspringfield/myhike/blob/master/routes/index.js)
        but I want users to be able to share links to their favorite hikes. The
        right component doesn't populate with hike data if /hike/:id is linked
        to instead of accessed directly from a marker click

      - Multiple Hike Reviews: This would allow a user to post a hike with their
        review and other users to add their own review instead of having to add
        another hike. Checkout [the Hike model](https://github.com/crashspringfield/myhike/blob/master/src/components/containers/Hike.js) and [CreateHike component](https://github.com/crashspringfield/myhike/blob/master/src/components/containers/CreateHike.js).

      - Email verification and lost password re-submission. I wrote this in AngularJs
        for [Camover](https://github.com/crashspringfield/camover) so a lot of the backend can be taken from there. The front
        will have to be rewritten in React.

      - Mobile Compatibility: see above note re: different views and/or
        React-Native app.

      - Long Term: I have a lot of ideas about what I'd want to see as a user of
        this site. It'd be great to search for hikes based on specifications other
        than just location by making descriptions and other review aspects (animals,
        plants, fungi) searchable. Also, I'd like users to be able to user their
        current location as a hike location (see [Map](https://github.com/crashspringfield/myhike/blob/master/src/components/containers/Map.js) and [CreateHike](https://github.com/crashspringfield/myhike/blob/master/src/components/containers/CreateHike.js) components)
        or use an address.

## running locally

  I set up a MongoDB with Mlabs so that you can run this without needing a database
  installed on your computer and everyone can be testing with the same data. I'm
  also using my Cloudinary account to store pictures. Please don't mess with this
  or I'll take it down.

  You can also use your own database by changing [.env]() and photo cloud by changing
  the [Images]() component.

  If you want to run locally, to test it out or contribute:

      git clone https://github.com/crashspringfield/myhike.git
      npm install
      webpack -w
      nodemon (or npm start)

## license
MIT
