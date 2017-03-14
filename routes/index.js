var express = require('express')
var router = express.Router()
var Promise = require('bluebird')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var controllers = require('../controllers')

var serverapp = require('../public/build/es5/serverapp')
var store = require('../public/build/es5/store/store')
var Account = require('../public/build/es5/components/containers/Account')
var CreateContainer = require('../public/build/es5/components/layout/CreateContainer')
var HikeContainer = require('../public/build/es5/components/layout/HikeContainer')
var Home = require('../public/build/es5/components/layout/Home')
var ProfileInfo = require('../public/build/es5/components/layout/ProfileInfo')

/*
TODO: Write general routes for pages.
*/


/* ==================== Private Functions ========================= */

// Allows React-Router to connect app to previously-defined routes
matchRoutes = function(req, routes) {
  return new Promise(function(resolve, reject) {
    ReactRouter.match({ routes, location: req.url}, function(error, redirectLocation, renderProps) {
      if (error) {
        reject(error)
        return
      }
      resolve(renderProps)
    })
  })
}

/* =================== End Private Functions ===================== */

/* =================== Server-side Routing ====================== */

// GET home page
router.get('/', function(req, res, next) {

  // Define initial Redux state to be passed to client
  let initialStore = null
  let reducers = {}

  // See if user is logged in
  controllers.account.currentUser(req)
    .then(function(result) {
      // Populate the account reducer with user, if logged in
      reducers['account'] = {
        user: result
      }

      // Fetch hikes
      return controllers.hike.find(null)
    })
    .then(function(hikes) {
      // Populate the hike reducer with hikes
      reducers['hike'] = {
        selectedHike: 0,
        list: hikes
      }
    })
    .then(function() {
      // Update intial state of Redux store with updated reducers
      initialStore = store.configureStore(reducers)
      // Prepare Home route and app state
      var routes = {
        path: '/',
        component: serverapp,
        initial: initialStore,
        indexRoute: {
          component: Home
        }
      }
      return matchRoutes(req, routes)
    })
    .then(function(renderProps) {
      // Generate server-side HTML
      var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
      // Send HTML and state to index.hjs
      res.render('index', {
        react: html,
        preloadedState: JSON.stringify(initialStore.getState())
      })
    })
    .catch(function(err) {
      // Handle errors
      console.log('Error in / route: ' + err)
    })
})

//
/* Server-side rendering for a specific page */
//
router.get('/:page', function(req, res, next) {
  var page = req.params.page

  // If client is making API request or accessing account, don't handle
  if (page == 'api' || page == 'account') {
    next()
    return
  }

  let initialStore = null
  let reducers = {}

  // Server-side rendering for CreateHike component
  if (page == 'create-hike') {
    // See if user is logged in
    controllers.account.currentUser(req)
      .then(function(result) {
        reducers['account'] = {
          user: result
        }

        initialStore = store.configureStore(reducers)
        var routes = {
          path: '/create-hike',
          component: serverapp,
          initial: initialStore,
          indexRoute: {
            component: CreateContainer
          }
        }
        return matchRoutes(req, routes)
      })
      .then(function(renderProps) {
        var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
        res.render('index', {
          react: html,
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  // Server-side rendering for Account component
  if (page == 'currentuser') {
    controllers.account.currentUser(req)
      .then(function(result) {
        reducers['account'] = {
          user: result
        }
        initialStore = store.configureStore(reducers)

        var routes = {
          path: '/currentuser',
          component: serverapp,
          initial: initialStore,
          indexRoute: {
            component: Account
          }
        }
        return matchRoutes(req, routes)
      })
      .then(function(renderProps) {
        var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
        res.render('index', {
          react: html,
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch(function(err) {
        console.log(err)
      })
  }

});

//
/* Server-side rendering for a specific page of a specific resource */
//
router.get('/:page/:slug', function(req, res, next) {
  var page = req.params.page
  var slug = req.params.slug

  // If client is making API request or accessing account, don't handle
  if (page == 'api' || page == 'account') {
    next()
    return
  }

  let initialStore = null
  let reducers = {}

  ////////////////////////////////
  /* specific cases for testing */
  //////////////////////////////

  // Profile
  if (page == 'profile') {
    controllers.profile.findById(slug)
      .then(function(profile) {
        var profileMap = {}
        profileMap[slug] = profile

        reducers['profile'] = {
          profileMap: profileMap
        }
        initialStore = store.configureStore(reducers)

        var routes = {
          path: '/profile/:id',
          component: serverapp,
          initial: initialStore,
          indexRoute: {
            component: ProfileInfo
          }
        }
        return matchRoutes(req, routes)
      })
      .then(function(renderProps) {
        var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
        res.render('index', {
          react: html,
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  // Hike
  if (page == 'hike') {
    controllers.hike.findById(slug)
      .then(function(hike) {
        // var hike = hike
        var hikeMap = {}
        hikeMap[slug] = hike

        reducers['hike'] = {
          currentHike: hike,
          hikeMap: hikeMap
        }
        return controllers.account.currentUser(req)
      })
      .then(function(result) {
        console.log('current user should be ' + JSON.stringify(result))
        reducers['account'] = {
          user: result
        }
      })
      .then(function() {
        initialStore = store.configureStore(reducers)

        var routes = {
          path : '/hike/:id',
          component: serverapp, // define initial component
          initial: initialStore,
          indexRoute: {
            component: HikeContainer
          }
        }
        return matchRoutes(req, routes)
      })
      .then(function(renderProps) {
        // generate server-side html
        var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
        res.render('index', {
          react: html,
          preloadedState: JSON.stringify(initialStore.getState())
        });
      })
      .catch(function(err) {
        console.log('Error in /:page/:slug route: ' + err)
      })
  }



})







/* client-side routes */
/*
router.get('/add-hike', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});

router.get('/review-hike', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});

// this one doesn't render the specific hike.....
router.get('/hike/:id', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});
*/

// -------------------- TESTING -------------------------

/* GET createhike page */
// router.get('/createhike', function(req, res, next) {
//   res.render('createhike', null);
// });

module.exports = router
