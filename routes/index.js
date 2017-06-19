var express = require('express')
var router = express.Router()
var Promise = require('bluebird')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var controllers = require('../controllers')

var serverapp = require('../public/build/es5/serverapp')
var store = require('../public/build/es5/store/store')
var About = require('../public/build/es5/components/containers/About')
var AccountContainer = require('../public/build/es5/components/containers/AccountContainer')
var CreateHikeContainer = require('../public/build/es5/components/containers/CreateHikeContainer')
var HikeContainer = require('../public/build/es5/components/containers/HikeContainer')
var HomeContainer = require('../public/build/es5/components/containers/HomeContainer')
var ProfileContainer = require('../public/build/es5/components/containers/ProfileContainer')

/*
TODO: Write general routes for pages.
*/


/* ==================== Private Functions ========================= */

// Allows React-Router to connect app to previously-defined routes
matchRoutes = function(req, routes) {
  return new Promise((resolve, reject) => {
    ReactRouter.match({ routes, location: req.url}, (error, redirectLocation, renderProps) => {
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
router.get('/', (req, res, next) => {
  let reducers = {}
  let initialStore = null

  controllers.account.currentUser(req)
    .then((user) => {
      reducers['account'] = { user }
      return controllers.hike.find(null)
    })
    .then((hikes) => {
      reducers['hike'] = { selectedHike: 0, list: hikes }
    })
    .then(() => {
      initialStore = store.configureStore(reducers)
      var routes = {
        path: '/',
        component: serverapp,
        initial: initialStore,
        indexRoute: { component: HomeContainer }
      }
      return matchRoutes(req, routes)
    })
    .then((renderProps) => {
      res.render('index', {
        react: ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps)),
        preloadedState: JSON.stringify(initialStore.getState())
      })
    })
    .catch((err) => {
      console.log('Error in / route: ' + err)
    })
})


/* Server-side rendering for a specific page */
router.get('/:page', (req, res, next) => {
  var page = req.params.page

  if (page == 'api' || page == 'account' || page == 'search') {
    next()
    return
  }

  let reducers = {}
  let initialStore = null

  if (page == 'about') {
    controllers.account.currentUser(req)
      .then((result) => {
        reducers['account'] = { user: result }
        initialStore = store.configureStore(reducers)
        var routes = {
          path: '/create-hike',
          component: serverapp,
          initial: initialStore,
          indexRoute: { component: About }
        }
        return matchRoutes(req, routes)
      })
      .then((renderProps) => {
        res.render('index', {
          react: ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps)),
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (page == 'create-hike') {
    controllers.account.currentUser(req)
      .then((result) => {
        reducers['account'] = { user: result }
        initialStore = store.configureStore(reducers)
        var routes = {
          path: '/create-hike',
          component: serverapp,
          initial: initialStore,
          indexRoute: { component: CreateHikeContainer }
        }
        return matchRoutes(req, routes)
      })
      .then((renderProps) => {
        res.render('index', {
          react: ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps)),
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (page == 'currentuser') {
    controllers.account.currentUser(req)
      .then((result) => {
        reducers['account'] = { user: result }
        initialStore = store.configureStore(reducers)
        var routes = {
          path: '/currentuser',
          component: serverapp,
          initial: initialStore,
          indexRoute: { component: AccountContainer }
        }
        return matchRoutes(req, routes)
      })
      .then((renderProps) => {
        res.render('index', {
          react: ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps)),
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
})


/* Server-side rendering for a specific page of a specific resource */
router.get('/:page/:slug', function(req, res, next) {
  var page = req.params.page
  var slug = req.params.slug

  if (page == 'api' || page == 'account' || page == 'search') {
    next()
    return
  }

  let initialStore = null
  let reducers = {}

  if (page == 'profile') {
    controllers.profile.findById(slug)
      .then((profile) => {
        var profileMap = {}
        profileMap[slug] = profile
        reducers['profile'] = { profileMap: profileMap }
        return controllers.account.currentUser(req)
      }).then((user) => {
        reducers['account'] = { user: user }
      }).then(() => {
        initialStore = store.configureStore(reducers)
        var routes = {
          path: '/profile/:id',
          component: serverapp,
          initial: initialStore,
          indexRoute: { component: ProfileContainer }
        }
        return matchRoutes(req, routes)
      })
      .then((renderProps) => {
        res.render('index', {
          react: ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps)),
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (page == 'hike') {
    controllers.hike.findById(slug)
      .then((hike) => {
        var hikeMap = {}
        hikeMap[slug] = hike
        reducers['hike'] = { currentHike: hike, hikeMap: hikeMap }
        return controllers.account.currentUser(req)
      })
      .then((user) => {
        reducers['account'] = { user: user }
      })
      .then(() => {
        initialStore = store.configureStore(reducers)
        var routes = {
          path : '/hike/:id',
          component: serverapp,
          initial: initialStore,
          indexRoute: { component: HikeContainer }
        }
        return matchRoutes(req, routes)
      })
      .then((renderProps) => {
        res.render('index', {
          react: ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps)),
          preloadedState: JSON.stringify(initialStore.getState())
        })
      })
      .catch((err) => {
        console.log('Error in /:page/:slug route: ' + err)
      })
  }
})

module.exports = router
