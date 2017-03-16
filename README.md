# myhike
My Hike is sort of like a social network meets wikipedia meets public database.
This app allows nature enthusiasts to share their favorite spots and foragers
their best finds, and also provides a public database of species dispersal
to measure the effects of climate change on different ecosystems.


## contributing
This is an ongoing project, so this is as much as a personal to-do list as it's a
list of ways anyone interested can help:

      - Email verification and lost password re-submission. I wrote this in AngularJs
        for [Camover](https://crashspringfield.github.io/camover-demo/) so a lot of the backend can be taken from there. The front
        will have to be rewritten in React.
        
      - Server-side routing for all components (some are front-end only). Also, making
        routing more general instead of being controller-specific.
        
      - Aesthetics (everything looks like garbage since I got rid of Bootstap-React
        but I also haven't tried to fix it yet).
        
      - Mobile routing and rewriting the Map/Container files.

## running locally

  I set up a MongoDB with Mlabs so that you can run this without needing a database
  installed on your computer and everyone can be testing with the same data. I'm
  also using my Cloudinary account to store pictures. Please don't mess with this
  or I'll take it down.

  You can also use your own database by changing [.env](https://github.com/crashspringfield/myhike/blob/master/.env) and photo cloud by changing
  the [Images](https://github.com/crashspringfield/myhike/blob/master/src/components/presentation/Images.js) component.

  If you want to run locally, to test it out or contribute:

      git clone https://github.com/crashspringfield/myhike.git
      npm install
      webpack -w
      gulp
      nodemon (or npm start)

## license
MIT
