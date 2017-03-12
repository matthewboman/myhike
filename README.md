# myhike
My Hike is sort of like a social network meets wikipedia meets public database.
This app allows nature enthusiasts to share their favorite spots and foragers
their best finds, and also provides a public database of species dispersal
to measure the effects of climate change on different ecosystems.

## contributing
This is an ongoing project, so this is as much as a personal to-do list as it's a
list of ways anyone interested can help:

      - Email verification and lost password re-submission. I wrote this in AngularJs
        for [Camover]() so a lot of the backend can be taken from there. The front
        will have to be rewritten in React.

      - Long Term: I have a lot of ideas about what I'd want to see as a user of
        this site. It'd be great to search for hikes based on specifications other
        than just location by making descriptions and other review aspects (animals,
        plants, fungi) searchable. Also, I'd like users to be able to user their
        current location as a hike location (see [Map]() and [CreateHike]() components)
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
