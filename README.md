# Myhike
My Hike is a social network meets wikipedia meets public database.
This app allows nature enthusiasts to share their favorite spots and foragers
their best finds, and also provides a public database of species dispersal
to measure the effects of climate change on different ecosystems.

##
try it live: [https://protected-beyond-21980.herokuapp.com](https://protected-beyond-21980.herokuapp.com)


## Contributing
This isn't currently maintained outside of security updates but I may come back to it at some point.
Here's a ToDo list if I ever come back to it.

### Small fixes
* Aesthetics (everything looks like garbage since I got rid of Bootstap-React but I also haven't tried to fix it yet).
* Fix errors in error handling
* Link map to search results
* Link search results to Redux state so app doesn't need to be refreshed
* Expand list of notable characteristics
* Mobile routing and rewriting the Map/Container files.

### Large tasks

* Email verification and lost password re-submission.
* Migrate from MongoDB to Postgres (huge overhaul)
* Build more intuitive and user-friendly photo-uploading component

## running locally

I set up a MongoDB with Mlabs so that you can run this without needing a database installed on your computer and everyone can be testing with the same data.

You can also use your own database by changing [.env](https://github.com/crashspringfield/myhike/blob/master/.env) and photo cloud by changing the [Images](https://github.com/crashspringfield/myhike/blob/master/src/components/presentation/Images.js) component.

If you want to run locally, to test it out or contribute:

```
git clone https://github.com/crashspringfield/myhike.git
npm install
webpack -w
gulp
nodemon (or npm start)
```

## license
MIT
