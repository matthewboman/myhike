/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _routes = __webpack_require__(4);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(83);
	var path = __webpack_require__(84);
	var favicon = __webpack_require__(85);
	var logger = __webpack_require__(86);
	var cookieParser = __webpack_require__(87);
	var bodyParser = __webpack_require__(88);
	var mongoose = __webpack_require__(89);
	var sessions = __webpack_require__(90);
	__webpack_require__(91).config();

	// import some new stuff

	// we'll use this to render our app to an html string

	// and these to match the url to routes and then render


	// My routes
	var account = __webpack_require__(92);
	var api = __webpack_require__(103);
	var routes = __webpack_require__(104);

	// Set up database
	mongoose.connect(process.env.DB_URL, function (err, res) {
	  if (err) {
	    console.log('DB Connection failed:' + err);
	  } else {
	    console.log('DB Connection Success');
	  }
	});

	// Start app
	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hjs');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(sessions({
	  cookieName: 'session',
	  secret: process.env.SESSION_SECRET,
	  duration: 24 * 60 * 60 * 1000,
	  activeDuration: 30 * 60 * 1000
	}));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/public', express.static(__dirname + '/public'));

	app.use('/', routes);
	app.use('/api', api);
	app.use('/account', account);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	// if (app.get('env') === 'development') {
	//   app.use(function(err, req, res, next) {
	//     res.status(err.status || 500);
	//     res.render('error', {
	//       message: err.message,
	//       error: err
	//     });
	//   });
	// }

	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ clientRoutes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    // in here we can make some decisions all at once
	    if (err) {
	      // there was an error somewhere during route matching
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      // we haven't talked about `onEnter` hooks on routes, but before a
	      // route is entered, it can redirect. Here we handle on the server.
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // if we got props then we matched a route and can render
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      // no errors, no redirect, we just didn't match anything
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

	// production error handler
	// no stacktraces leaked to user
	// app.use(function(err, req, res, next) {
	//   res.status(err.status || 500);
	//   res.render('error', {
	//     message: err.message,
	//     error: {}
	//   });
	// });
	//
	//
	// module.exports = app;
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _containers = __webpack_require__(5);

	var _layout = __webpack_require__(70);

	var _presentation = __webpack_require__(15);

	var _stores = __webpack_require__(77);

	var _stores2 = _interopRequireDefault(_stores);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = React.createElement(
	  Route,
	  { path: '/', component: _layout.Container },
	  React.createElement(IndexRoute, { component: _presentation.Home }),
	  React.createElement(Route, { path: '/add-hike', component: _containers.CreateHike }),
	  React.createElement(Route, { path: '/hike/:id', component: _containers.Hike }),
	  React.createElement(Route, { path: '/register', component: _containers.Register })
	);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Register = exports.Map = exports.Login = exports.Hikes = exports.Hike = exports.CreateHike = undefined;

	var _CreateHike = __webpack_require__(6);

	var _CreateHike2 = _interopRequireDefault(_CreateHike);

	var _Hike = __webpack_require__(13);

	var _Hike2 = _interopRequireDefault(_Hike);

	var _Hikes = __webpack_require__(14);

	var _Hikes2 = _interopRequireDefault(_Hikes);

	var _Login = __webpack_require__(19);

	var _Login2 = _interopRequireDefault(_Login);

	var _Map = __webpack_require__(20);

	var _Map2 = _interopRequireDefault(_Map);

	var _Register = __webpack_require__(69);

	var _Register2 = _interopRequireDefault(_Register);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CreateHike = _CreateHike2.default;
	exports.Hike = _Hike2.default;
	exports.Hikes = _Hikes2.default;
	exports.Login = _Login2.default;
	exports.Map = _Map2.default;
	exports.Register = _Register2.default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	var _utils = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CreateHike = function (_Component) {
	  _inherits(CreateHike, _Component);

	  function CreateHike() {
	    _classCallCheck(this, CreateHike);

	    var _this = _possibleConstructorReturn(this, (CreateHike.__proto__ || Object.getPrototypeOf(CreateHike)).call(this));

	    _this.state = {
	      hike: {
	        name: '',
	        position: {},
	        review: {
	          animals: '',
	          description: '',
	          fungi: '',
	          pictures: [],
	          plants: '',
	          user: ''
	        }
	      }
	    };
	    return _this;
	  }

	  _createClass(CreateHike, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // console.log('props on CreateHike mounting ' + JSON.stringify(this.props))
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      // console.log('CreateHike updating location to ' + this.props.location)
	      // console.log('CreateHike updating username to ' + this.props.currentUser.username)
	    }
	  }, {
	    key: 'updateHike',
	    value: function updateHike(event) {
	      var updatedHike = Object.assign({}, this.state.hike);
	      // Get new hike location from props and assign
	      var position = {
	        lat: this.props.location.lat,
	        lng: this.props.location.lng
	      };
	      updatedHike["position"] = position;
	      // Get and assign form subfields
	      var updatedReview = Object.assign({}, this.state.hike.review);
	      updatedReview[event.target.id] = event.target.value;
	      updatedReview["user"] = this.props.currentUser.username;
	      updatedHike["review"] = updatedReview;
	      // Get and assign all fields
	      updatedHike[event.target.id] = event.target.value; // kind of janks it b/c more is being submitted, but mongoose model makes it work
	      // Set state with all the details
	      this.setState({
	        hike: updatedHike
	      });
	    }
	  }, {
	    key: 'submitHike',
	    value: function submitHike(hike) {
	      // console.log('submitting ' + JSON.stringify(this.state.hike))
	      _utils.APIManager.post('/api/hike', this.state.hike, function (err, response) {
	        if (err) {
	          console.error('ERROR: ' + err.message);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _React$createElement;

	      var position = JSON.stringify(this.props.location); // for displaying GPS position in form

	      return _react2.default.createElement(
	        'div',
	        { className: 'sidebar' },
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Add a New Hike'
	        ),
	        _react2.default.createElement('input', { onChange: this.updateHike.bind(this), id: 'name',
	          className: 'form-control', type: 'text', placeholder: 'Hike Name' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', (_React$createElement = { id: 'location', onChange: this.updateHike.bind(this) }, _defineProperty(_React$createElement, 'id', 'position'), _defineProperty(_React$createElement, 'className', 'form-control'), _defineProperty(_React$createElement, 'type', 'text'), _defineProperty(_React$createElement, 'placeholder', position), _React$createElement)),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateHike.bind(this), id: 'description',
	          className: 'form-control', type: 'text', placeholder: 'Describe it!' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateHike.bind(this), id: 'plants',
	          className: 'form-control', type: 'text', placeholder: 'What plants?' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateHike.bind(this), id: 'fungi',
	          className: 'form-control', type: 'text', placeholder: 'What mushrooms?' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateHike.bind(this), id: 'animals',
	          className: 'form-control', type: 'text', placeholder: 'What animals' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateHike.bind(this), id: 'pictures',
	          className: 'form-control', type: 'text', placeholder: 'upload here' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.submitHike.bind(this),
	            className: 'btn btn-info btn-block' },
	          'Add it'
	        )
	      );
	    }
	  }]);

	  return CreateHike;
	}(_react.Component);

	var stateToProps = function stateToProps(state) {
	  return {
	    location: state.hike.hikeLocation,
	    currentUser: state.account.currentUser
	  };
	};

	var dispatchToProps = function dispatchToProps(dispatch) {
	  return {
	    locationAdded: function locationAdded(location) {
	      return dispatch(_actions2.default.locationAdded(location));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(stateToProps, dispatchToProps)(CreateHike);

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(9);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  currentUserReceived: function currentUserReceived(profile) {
	    return {
	      type: _constants2.default.CURRENT_USER_RECEIVED,
	      profile: profile
	    };
	  },

	  profileCreated: function profileCreated(profile) {
	    return {
	      type: _constants2.default.PROFILE_CREATED,
	      profile: profile
	    };
	  },

	  hikesReceived: function hikesReceived(hikes) {
	    return {
	      type: _constants2.default.HIKES_RECEIVED,
	      hikes: hikes
	    };
	  },

	  hikeSelected: function hikeSelected(hike) {
	    return {
	      type: _constants2.default.HIKE_SELECTED,
	      hike: hike
	    };
	  },

	  locationAdded: function locationAdded(location) {
	    return {
	      type: _constants2.default.LOCATION_ADDED,
	      location: location
	    };
	  }

	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  CURRENT_USER_RECEIVED: 'CURRENT_USER_RECEIVED',
	  PROFILE_CREATED: 'PROFILE_CREATED',

	  HIKES_RECEIVED: 'HIKES_RECEIVED',
	  HIKE_SELECTED: 'HIKE_SELECTED',
	  LOCATION_ADDED: 'LOCATION_ADDED'

	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.APIManager = undefined;

	var _APIManager = __webpack_require__(11);

	var _APIManager2 = _interopRequireDefault(_APIManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.APIManager = _APIManager2.default;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _superagent = __webpack_require__(12);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  // GET shit from DB
	  get: function get(endpoint, params, callback) {
	    _superagent2.default.get(endpoint).query(params).set('Accept', 'application/json').end(function (err, response) {
	      if (err) {
	        callback(err, null);
	        return;
	      }

	      var confirmation = response.body.confirmation;
	      if (confirmation != 'success') {
	        callback({ message: response.body.message }, null);
	        return;
	      }

	      callback(null, response.body);
	    });
	  },

	  // POST shit to DB
	  post: function post(endpoint, params, callback) {
	    _superagent2.default.post(endpoint).send(params).set('Accept', 'application/json').end(function (err, response) {
	      if (err) {
	        callback(err, null);
	        return;
	      }

	      var confirmation = response.body.confirmation;
	      if (confirmation != 'success') {
	        callback({ message: response.body.message }, null);
	        return;
	      }

	      callback(null, response.body);
	    });
	  },

	  // UPDATE shit in the database
	  put: function put(endpoint, params, callback) {
	    _superagent2.default.put(endpoint).send(params).set('Accept', 'application/json').end(function (err, response) {
	      if (err) {
	        callback(err, null);
	        return;
	      }

	      var confirmation = response.body.confirmation;
	      if (confirmation != 'success') {
	        callback({ message: response.body.message }, null);
	        return;
	      }

	      callback(null, response.body);
	    });
	  },

	  // DELETE that shit
	  delete: function _delete() {}

	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _utils = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hike = function (_Component) {
	  _inherits(Hike, _Component);

	  function Hike() {
	    _classCallCheck(this, Hike);

	    var _this = _possibleConstructorReturn(this, (Hike.__proto__ || Object.getPrototypeOf(Hike)).call(this));

	    _this.state = {
	      currentHike: {
	        id: '',
	        name: '',
	        review: {}
	      }
	    };
	    return _this;
	  }

	  _createClass(Hike, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var params = this.props.params;
	      var hack = "/api/hike/" + params;
	      // APIManager.get('/api/hike/', params, (err, response) => {
	      _utils.APIManager.get(hack, null, function (err, response) {
	        if (err) {
	          console.error(err);
	          return;
	        }
	        console.log(JSON.stringify(response.result));
	        _this2.setState({
	          currentHike: response.result
	        });
	      });
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate() {
	      var _this3 = this;

	      var params = this.props.params;
	      var hack = "/api/hike/" + params;
	      // APIManager.get('/api/hike/', params, (err, response) => {
	      _utils.APIManager.get(hack, null, function (err, response) {
	        if (err) {
	          console.error(err);
	          return;
	        }
	        console.log(JSON.stringify(response.result));

	        _this3.setState({
	          currentHike: response.result
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // Allow for fields to be blank
	      var name = this.state.currentHike.name == null ? null : this.state.currentHike.name;
	      var description = this.state.currentHike.review.description == null ? null : this.state.currentHike.review.description;
	      var animals = this.state.currentHike.review.animals == null ? null : this.state.currentHike.review.animals;
	      var plants = this.state.currentHike.review.plants == null ? null : this.state.currentHike.review.plants;
	      var fungi = this.state.currentHike.review.fungi == null ? null : this.state.currentHike.review.fungi;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'p',
	          null,
	          'testing hike component'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          this.state.currentHike.name
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          this.state.currentHike.review.description
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          this.state.currentHike.review.animals
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          this.state.currentHike.review.plants
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          this.state.currentHike.review.fungi
	        )
	      );
	    }
	  }]);

	  return Hike;
	}(_react.Component);

	var stateToProps = function stateToProps(state) {
	  return {
	    params: state.hike.selectedHike
	  };
	};

	exports.default = (0, _reactRedux.connect)(stateToProps)(Hike);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _presentation = __webpack_require__(15);

	var _utils = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hikes = function (_Component) {
	  _inherits(Hikes, _Component);

	  function Hikes() {
	    _classCallCheck(this, Hikes);

	    var _this = _possibleConstructorReturn(this, (Hikes.__proto__ || Object.getPrototypeOf(Hikes)).call(this));

	    _this.state = {
	      list: []
	    };
	    return _this;
	  }

	  _createClass(Hikes, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      _utils.APIManager.get('/api/hike', null, function (err, response) {
	        if (err) {
	          console.error('ERROR: ' + err.message);
	          return;
	        }

	        _this2.setState({
	          list: response.results
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var listItems = this.state.list.map(function (hike, i) {
	        return _react2.default.createElement(
	          'li',
	          { key: i },
	          _react2.default.createElement(_presentation.Hike, { index: i, currentHike: hike })
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h3',
	          null,
	          'List of hikes'
	        ),
	        _react2.default.createElement(
	          'ul',
	          null,
	          listItems
	        )
	      );
	    }
	  }]);

	  return Hikes;
	}(_react.Component);

	exports.default = Hikes;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RegisterForm = exports.Home = exports.Detail = undefined;

	var _Detail = __webpack_require__(16);

	var _Detail2 = _interopRequireDefault(_Detail);

	var _Home = __webpack_require__(17);

	var _Home2 = _interopRequireDefault(_Home);

	var _RegisterForm = __webpack_require__(18);

	var _RegisterForm2 = _interopRequireDefault(_RegisterForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Detail = _Detail2.default;
	exports.Home = _Home2.default;
	exports.RegisterForm = _RegisterForm2.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Detail = function (_Component) {
	  _inherits(Detail, _Component);

	  function Detail() {
	    _classCallCheck(this, Detail);

	    return _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).apply(this, arguments));
	  }

	  _createClass(Detail, [{
	    key: 'getDetails',
	    value: function getDetails() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'on the detail page'
	      );
	    }
	  }]);

	  return Detail;
	}(_react.Component);

	exports.default = Detail;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_Component) {
	  _inherits(Home, _Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "sidebar" },
	        _react2.default.createElement(
	          "h2",
	          null,
	          "Welcome"
	        ),
	        _react2.default.createElement(
	          "p",
	          null,
	          "This will display some bullshit about the page"
	        )
	      );
	    }
	  }]);

	  return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RegisterForm = function (_Component) {
	  _inherits(RegisterForm, _Component);

	  function RegisterForm() {
	    _classCallCheck(this, RegisterForm);

	    var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this));

	    _this.state = {
	      visitor: {
	        username: '',
	        email: '',
	        password: ''
	      }
	    };
	    return _this;
	  }

	  _createClass(RegisterForm, [{
	    key: 'updateVisitor',
	    value: function updateVisitor(event) {
	      var updated = Object.assign({}, this.state.visitor);
	      updated[event.target.id] = event.target.value;
	      console.log(updated);
	      this.setState({
	        visitor: updated
	      });
	    }
	  }, {
	    key: 'register',
	    value: function register(event) {
	      event.preventDefault();
	      this.props.onRegister(this.state.visitor);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Sign Up'
	        ),
	        _react2.default.createElement('input', { onChange: this.updateVisitor.bind(this), className: 'form-control', type: 'text', id: 'username', placeholder: 'username' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateVisitor.bind(this), className: 'form-control', type: 'text', id: 'email', placeholder: 'Email' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement('input', { onChange: this.updateVisitor.bind(this), className: 'form-control', type: 'password', id: 'password', placeholder: 'Password' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.register.bind(this) },
	          'Join'
	        )
	      );
	    }
	  }]);

	  return RegisterForm;
	}(_react.Component);

	exports.default = RegisterForm;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = function (_Component) {
	  _inherits(Login, _Component);

	  function Login() {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

	    _this.state = {
	      visitor: {
	        username: '',
	        password: ''
	      }
	    };
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'updateVisitor',
	    value: function updateVisitor(event) {
	      var updated = Object.assign({}, this.state.visitor);
	      updated[event.target.id] = event.target.value;
	      this.setState({
	        visitor: updated
	      });
	    }
	  }, {
	    key: 'login',
	    value: function login(event) {
	      event.preventDefault();
	      console.log(this.state.visitor + ' allegedly logged in');
	      this.props.onLogin(this.state.visitor);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('input', { onChange: this.updateVisitor.bind(this), type: 'text', id: 'username', placeholder: 'username' }),
	        _react2.default.createElement('input', { onChange: this.updateVisitor.bind(this), type: 'password', id: 'password', placeholder: 'Password' }),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.login.bind(this) },
	          'Log in'
	        )
	      );
	    }
	  }]);

	  return Login;
	}(_react.Component);

	exports.default = Login;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactGoogleMaps = __webpack_require__(21);

	var _reactRedux = __webpack_require__(7);

	var _reactRouter = __webpack_require__(3);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	var _utils = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Map = function (_Component) {
	  _inherits(Map, _Component);

	  function Map() {
	    _classCallCheck(this, Map);

	    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

	    _this.state = {
	      newHike: {
	        lat: 35.578663399999996,
	        lng: -82.6077827
	      },
	      center: {
	        lat: 0,
	        lng: 0
	      }
	    };
	    return _this;
	  }

	  _createClass(Map, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      // Center map on user's location
	      navigator.geolocation.getCurrentPosition(function (position) {
	        var lat = position.coords.latitude;
	        var lng = position.coords.longitude;
	        // console.log("getCurrentPosition Success " + lat + lng)
	        _this2.setState({
	          center: {
	            lat: position.coords.latitude,
	            lng: position.coords.longitude
	          }
	        });
	      }, function (error) {
	        _this2.props.displayError("Error dectecting your location");
	        console.error(JSON.stringify(error));
	      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
	      // GET hikes from database
	      /*
	      This will have to be changed so it's only grabbing hikes within
	      view window of user
	      */
	      _utils.APIManager.get('/api/hike', null, function (err, response) {
	        if (err) {
	          return;
	        }
	        _this2.props.hikesReceived(response.results);
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      // console.log('updated list of hikes ' + JSON.stringify(this.props.hikes))
	    }
	  }, {
	    key: 'addMarker',
	    value: function addMarker(event) {
	      var clicked = Object.assign({}, this.state.newHike);
	      clicked.lat = event.latLng.lat();
	      clicked.lng = event.latLng.lng();
	      this.setState({
	        newHike: clicked
	      });
	      this.props.locationAdded(clicked);
	      _reactRouter.browserHistory.push('/add-hike');
	    }
	  }, {
	    key: 'onMarkerClick',
	    value: function onMarkerClick(id) {
	      var hikeId = id;
	      // Set params to be fetched
	      this.props.hikeSelected(hikeId);
	      // Change path to clicked hike
	      var path = '/hike/' + hikeId;
	      _reactRouter.browserHistory.push(path);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      // Set map center to user location
	      var center = this.state.center;
	      if (center.lat == 0 && center.lng == 0) {
	        return null;
	      }
	      // Place newHike marker where user clicks
	      var marker = {
	        position: this.state.newHike
	      };
	      // Mount hike markers to map
	      if (this.props.hikes == null || undefined) {
	        return false;
	      }
	      var hikes = this.props.hikes.map(function (hike, id) {
	        var hikeMarker = {
	          position: {
	            lat: hike.position.lat,
	            lng: hike.position.lng
	          },
	          id: hike._id
	        };
	        return _react2.default.createElement(_reactGoogleMaps.Marker, _extends({
	          key: id
	        }, hikeMarker, {
	          onClick: _this3.onMarkerClick.bind(_this3, hike._id)
	        }));
	      });

	      return _react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
	        containerElement: this.props.mapContainer,
	        googleMapElement: _react2.default.createElement(
	          _reactGoogleMaps.GoogleMap,
	          {
	            defaultZoom: 10
	            /*  defaultCenter={this.props.center} */
	            , defaultCenter: this.state.center,
	            options: { streetViewControl: false, mapTypeControl: false },
	            onClick: this.addMarker.bind(this) },
	          _react2.default.createElement(_reactGoogleMaps.Marker, _extends({}, marker, {
	            onRightClick: function onRightClick() {
	              return props.onMarkerRightClick(index);
	            }
	          })),
	          hikes
	        ) });
	    }
	  }]);

	  return Map;
	}(_react.Component);

	var stateToProps = function stateToProps(state) {
	  return {
	    hikes: state.hike.list,
	    location: state.newHike
	  };
	};

	var dispatchToProps = function dispatchToProps(dispatch) {
	  return {
	    hikesReceived: function hikesReceived(hikes) {
	      return dispatch(_actions2.default.hikesReceived(hikes));
	    },
	    hikeSelected: function hikeSelected(hike) {
	      return dispatch(_actions2.default.hikeSelected(hike));
	    },
	    locationAdded: function locationAdded(location) {
	      return dispatch(_actions2.default.locationAdded(location));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(stateToProps, dispatchToProps)(Map);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

	var _GoogleMapLoader = __webpack_require__(22);

	exports.GoogleMapLoader = _interopRequire(_GoogleMapLoader);

	var _GoogleMap = __webpack_require__(32);

	exports.GoogleMap = _interopRequire(_GoogleMap);

	var _Circle = __webpack_require__(33);

	exports.Circle = _interopRequire(_Circle);

	var _DirectionsRenderer = __webpack_require__(37);

	exports.DirectionsRenderer = _interopRequire(_DirectionsRenderer);

	var _DrawingManager = __webpack_require__(40);

	exports.DrawingManager = _interopRequire(_DrawingManager);

	var _InfoWindow = __webpack_require__(43);

	exports.InfoWindow = _interopRequire(_InfoWindow);

	var _KmlLayer = __webpack_require__(48);

	exports.KmlLayer = _interopRequire(_KmlLayer);

	var _Marker = __webpack_require__(51);

	exports.Marker = _interopRequire(_Marker);

	var _OverlayView = __webpack_require__(54);

	exports.OverlayView = _interopRequire(_OverlayView);

	var _Polygon = __webpack_require__(57);

	exports.Polygon = _interopRequire(_Polygon);

	var _Polyline = __webpack_require__(60);

	exports.Polyline = _interopRequire(_Polyline);

	var _Rectangle = __webpack_require__(63);

	exports.Rectangle = _interopRequire(_Rectangle);

	var _SearchBox = __webpack_require__(66);

	exports.SearchBox = _interopRequire(_SearchBox);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _creatorsGoogleMapHolder = __webpack_require__(23);

	var _creatorsGoogleMapHolder2 = _interopRequireDefault(_creatorsGoogleMapHolder);

	var USE_NEW_BEHAVIOR_TAG_NAME = "__new_behavior__"; /* CIRCULAR_DEPENDENCY */

	var GoogleMapLoader = (function (_Component) {
	  _inherits(GoogleMapLoader, _Component);

	  function GoogleMapLoader() {
	    _classCallCheck(this, GoogleMapLoader);

	    _get(Object.getPrototypeOf(GoogleMapLoader.prototype), "constructor", this).apply(this, arguments);

	    this.state = {
	      map: null
	    };
	  }

	  _createClass(GoogleMapLoader, [{
	    key: "mountGoogleMap",
	    value: function mountGoogleMap(domEl) {
	      if (this.state.map || domEl === null) {
	        return;
	      }
	      var _props$googleMapElement$props = this.props.googleMapElement.props;
	      var children = _props$googleMapElement$props.children;

	      var mapProps = _objectWithoutProperties(_props$googleMapElement$props, ["children"]);

	      //
	      // Create google.maps.Map instance so that dom is initialized before
	      // React's children creators.
	      //
	      var map = _creatorsGoogleMapHolder2["default"]._createMap(domEl, mapProps);
	      this.setState({ map: map });
	    }
	  }, {
	    key: "renderChild",
	    value: function renderChild() {
	      if (this.state.map) {
	        // Notice: implementation details
	        //
	        // In this state, the DOM of google.maps.Map is already initialized in
	        // my innerHTML. Adding extra React components will not clean it
	        // in current version*. It will use prepend to add DOM of
	        // GoogleMapHolder and become a sibling of the DOM of google.maps.Map
	        // Not sure this is subject to change
	        //
	        // *current version: 0.13.3, 0.14.2
	        //
	        return _react2["default"].cloneElement(this.props.googleMapElement, {
	          map: this.state.map,
	          // ------------ Deprecated ------------
	          containerTagName: USE_NEW_BEHAVIOR_TAG_NAME
	        });
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].cloneElement(this.props.containerElement, {
	        ref: this.mountGoogleMap.bind(this)
	      }, this.renderChild());
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      containerElement: _react.PropTypes.node.isRequired,
	      googleMapElement: _react.PropTypes.element.isRequired },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    /* CIRCULAR_DEPENDENCY. Uncomment when 5.0.0 comes: propTypesElementOfType(GoogleMap).isRequired, */
	    value: {
	      containerElement: _react2["default"].createElement("div", null)
	    },
	    enumerable: true
	  }]);

	  return GoogleMapLoader;
	})(_react.Component);

	exports["default"] = GoogleMapLoader;
	module.exports = exports["default"];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(24);

	var _warning2 = _interopRequireDefault(_warning);

	var _eventListsGoogleMapEventList = __webpack_require__(25);

	var _eventListsGoogleMapEventList2 = _interopRequireDefault(_eventListsGoogleMapEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var mapControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	  center: _react.PropTypes.object,
	  heading: _react.PropTypes.number,
	  mapTypeId: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  streetView: _react.PropTypes.any,
	  tilt: _react.PropTypes.number,
	  zoom: _react.PropTypes.number
	};

	exports.mapControlledPropTypes = mapControlledPropTypes;
	var mapDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(mapControlledPropTypes);

	exports.mapDefaultPropTypes = mapDefaultPropTypes;
	var mapUpdaters = {
	  center: function center(_center, component) {
	    component.getMap().setCenter(_center);
	  },
	  heading: function heading(_heading, component) {
	    component.getMap().setHeading(_heading);
	  },
	  mapTypeId: function mapTypeId(_mapTypeId, component) {
	    component.getMap().setMapTypeId(_mapTypeId);
	  },
	  options: function options(_options, component) {
	    component.getMap().setOptions(_options);
	  },
	  streetView: function streetView(_streetView, component) {
	    component.getMap().setStreetView(_streetView);
	  },
	  tilt: function tilt(_tilt, component) {
	    component.getMap().setTilt(_tilt);
	  },
	  zoom: function zoom(_zoom, component) {
	    component.getMap().setZoom(_zoom);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsGoogleMapEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var mapEventPropTypes = eventPropTypes;

	exports.mapEventPropTypes = mapEventPropTypes;

	var GoogleMapHolder = (function (_Component) {
	  _inherits(GoogleMapHolder, _Component);

	  function GoogleMapHolder() {
	    _classCallCheck(this, _GoogleMapHolder);

	    _get(Object.getPrototypeOf(_GoogleMapHolder.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(GoogleMapHolder, [{
	    key: "getMap",
	    value: function getMap() {
	      return this.props.map;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;

	      return _react2["default"].createElement(
	        "div",
	        null,
	        _react.Children.map(this.props.children, function (childElement) {
	          if (_react2["default"].isValidElement(childElement)) {
	            return _react2["default"].cloneElement(childElement, {
	              mapHolderRef: _this
	            });
	          } else {
	            return childElement;
	          }
	        })
	      );
	    }
	  }], [{
	    key: "_createMap",
	    value: function _createMap(domEl, mapProps) {
	      (0, _warning2["default"])("undefined" !== typeof google, "Make sure you've put a <script> tag in your <head> element to load Google Maps JavaScript API v3.\n If you're looking for built-in support to load it for you, use the \"async/ScriptjsLoader\" instead.\n See https://github.com/tomchentw/react-google-maps/pull/168");
	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	      return new google.maps.Map(domEl, (0, _utilsComposeOptions2["default"])(mapProps, mapControlledPropTypes));
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      map: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _GoogleMapHolder = GoogleMapHolder;
	  GoogleMapHolder = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getMap",
	    updaters: mapUpdaters
	  })(GoogleMapHolder) || GoogleMapHolder;
	  return GoogleMapHolder;
	})(_react.Component);

	exports["default"] = GoogleMapHolder;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("warning");

/***/ },
/* 25 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "heading_changed", "idle", "maptypeid_changed", "mousemove", "mouseout", "mouseover", "projection_changed", "resize", "rightclick", "tilesloaded", "tilt_changed", "zoom_changed"];
	module.exports = exports["default"];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = eventHandlerCreator;

	var _react = __webpack_require__(1);

	function groupToUpperCase(match, group) {
	  return group.toUpperCase();
	}

	function toOnEventName(rawName) {
	  return "on" + rawName.replace(/^(.)/, groupToUpperCase).replace(/_(.)/g, groupToUpperCase);
	}

	function eventHandlerCreator(rawNameList) {
	  var eventPropTypes = {};
	  var onEventNameByRawName = {};

	  rawNameList.forEach(function (rawName) {
	    var onEventName = toOnEventName(rawName);
	    eventPropTypes[onEventName] = _react.PropTypes.func;
	    onEventNameByRawName[rawName] = onEventName;
	  });

	  function registerEvents(event, props, googleMapInstance) {
	    var registered = rawNameList.reduce(function (acc, rawName) {
	      var onEventName = onEventNameByRawName[rawName];

	      if (Object.prototype.hasOwnProperty.call(props, onEventName)) {
	        acc.push(event.addListener(googleMapInstance, rawName, props[onEventName]));
	      }
	      return acc;
	    }, []);

	    return registered.forEach.bind(registered, event.removeListener, event);
	  }

	  return {
	    eventPropTypes: eventPropTypes,
	    registerEvents: registerEvents
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = defaultPropsCreator;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _addDefaultPrefix = __webpack_require__(28);

	var _addDefaultPrefix2 = _interopRequireDefault(_addDefaultPrefix);

	function defaultPropsCreator(propTypes) {
	  return Object.keys(propTypes).reduce(function (acc, name) {
	    acc[(0, _addDefaultPrefix2["default"])(name)] = propTypes[name];
	    return acc;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addDefaultPrefix;

	function addDefaultPrefix(name) {
	  return "default" + (name[0].toUpperCase() + name.slice(1));
	}

	module.exports = exports["default"];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = composeOptions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _controlledOrDefault = __webpack_require__(30);

	var _controlledOrDefault2 = _interopRequireDefault(_controlledOrDefault);

	function composeOptions(props, controlledPropTypes) {
	  var optionNameList = Object.keys(controlledPropTypes);
	  var getter = (0, _controlledOrDefault2["default"])(props);

	  // props from arguments may contain unknow props.
	  // We only interested those in optionNameList
	  return optionNameList.reduce(function (acc, optionName) {
	    if ("options" !== optionName) {
	      var value = getter(optionName);
	      if ("undefined" !== typeof value) {
	        acc[optionName] = value;
	      }
	    }
	    return acc;
	  }, _extends({}, getter("options")));
	}

	module.exports = exports["default"];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = controlledOrDefault;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _addDefaultPrefix = __webpack_require__(28);

	var _addDefaultPrefix2 = _interopRequireDefault(_addDefaultPrefix);

	function controlledOrDefault(props) {
	  return function (name) {
	    if (Object.prototype.hasOwnProperty.call(props, name)) {
	      return props[name];
	    } else {
	      return props[(0, _addDefaultPrefix2["default"])(name)];
	    }
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = componentLifecycleDecorator;

	function componentLifecycleDecorator(_ref) {
	  var registerEvents = _ref.registerEvents;
	  var instanceMethodName = _ref.instanceMethodName;
	  var updaters = _ref.updaters;

	  // This modify the Component.prototype directly
	  return function (Component) {
	    function register() {
	      this._unregisterEvents = registerEvents(google.maps.event, this.props, this[instanceMethodName]());
	    }

	    function unregister() {
	      if (this._unregisterEvents) {
	        this._unregisterEvents();
	        this._unregisterEvents = null;
	      }
	    }

	    function noop() {}

	    // Stash component's own lifecycle methods to be invoked later
	    var componentDidMount = Component.prototype.hasOwnProperty("componentDidMount") ? Component.prototype.componentDidMount : noop;
	    var componentDidUpdate = Component.prototype.hasOwnProperty("componentDidUpdate") ? Component.prototype.componentDidUpdate : noop;
	    var componentWillUnmount = Component.prototype.hasOwnProperty("componentWillUnmount") ? Component.prototype.componentWillUnmount : noop;

	    Object.defineProperty(Component.prototype, "componentDidMount", {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: function value() {
	        // Hook into client's implementation, if it has any
	        componentDidMount.call(this);

	        register.call(this);
	      }
	    });

	    Object.defineProperty(Component.prototype, "componentDidUpdate", {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: function value(prevProps) {
	        unregister.call(this);

	        for (var _name in updaters) {
	          if (Object.prototype.hasOwnProperty.call(this.props, _name)) {
	            updaters[_name](this.props[_name], this);
	          }
	        }

	        // Hook into client's implementation, if it has any
	        componentDidUpdate.call(this, prevProps);

	        register.call(this);
	      }
	    });

	    Object.defineProperty(Component.prototype, "componentWillUnmount", {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: function value() {
	        // Hook into client's implementation, if it has any
	        componentWillUnmount.call(this);

	        unregister.call(this);
	        var instance = this[instanceMethodName]();
	        if ("setMap" in instance) {
	          instance.setMap(null);
	        }
	      }
	    });

	    return Component;
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(24);

	var _warning2 = _interopRequireDefault(_warning);

	var _creatorsGoogleMapHolder = __webpack_require__(23);

	var _creatorsGoogleMapHolder2 = _interopRequireDefault(_creatorsGoogleMapHolder);

	var _GoogleMapLoader = __webpack_require__(22);

	var _GoogleMapLoader2 = _interopRequireDefault(_GoogleMapLoader);

	var USE_NEW_BEHAVIOR_TAG_NAME = "__new_behavior__";

	var GoogleMap = (function (_Component) {
	  _inherits(GoogleMap, _Component);

	  function GoogleMap() {
	    _classCallCheck(this, GoogleMap);

	    _get(Object.getPrototypeOf(GoogleMap.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(GoogleMap, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getBounds() {
	      return (this.props.map || this.refs.delegate).getBounds();
	    }
	  }, {
	    key: "getCenter",
	    value: function getCenter() {
	      return (this.props.map || this.refs.delegate).getCenter();
	    }
	  }, {
	    key: "getDiv",
	    value: function getDiv() {
	      return (this.props.map || this.refs.delegate).getDiv();
	    }
	  }, {
	    key: "getHeading",
	    value: function getHeading() {
	      return (this.props.map || this.refs.delegate).getHeading();
	    }
	  }, {
	    key: "getMapTypeId",
	    value: function getMapTypeId() {
	      return (this.props.map || this.refs.delegate).getMapTypeId();
	    }
	  }, {
	    key: "getProjection",
	    value: function getProjection() {
	      return (this.props.map || this.refs.delegate).getProjection();
	    }
	  }, {
	    key: "getStreetView",
	    value: function getStreetView() {
	      return (this.props.map || this.refs.delegate).getStreetView();
	    }
	  }, {
	    key: "getTilt",
	    value: function getTilt() {
	      return (this.props.map || this.refs.delegate).getTilt();
	    }
	  }, {
	    key: "getZoom",
	    value: function getZoom() {
	      return (this.props.map || this.refs.delegate).getZoom();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	    //
	    // Public APIs - Use this carefully
	    // See discussion in https://github.com/tomchentw/react-google-maps/issues/62
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return !it.match(/^get/) && !it.match(/^set/) && !it.match(/Map$/); })
	  }, {
	    key: "fitBounds",
	    value: function fitBounds(bounds) {
	      return (this.props.map || this.refs.delegate).fitBounds(bounds);
	    }
	  }, {
	    key: "panBy",
	    value: function panBy(x, y) {
	      return (this.props.map || this.refs.delegate).panBy(x, y);
	    }
	  }, {
	    key: "panTo",
	    value: function panTo(latLng) {
	      return (this.props.map || this.refs.delegate).panTo(latLng);
	    }
	  }, {
	    key: "panToBounds",
	    value: function panToBounds(latLngBounds) {
	      return (this.props.map || this.refs.delegate).panToBounds(latLngBounds);
	    }

	    // END - Public APIs - Use this carefully
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      var containerTagName = this.props.containerTagName;

	      var isUsingNewBehavior = USE_NEW_BEHAVIOR_TAG_NAME === containerTagName;

	      (0, _warning2["default"])(isUsingNewBehavior, "\"GoogleMap\" with containerTagName is deprecated now and will be removed in next major release (5.0.0).\nUse \"GoogleMapLoader\" instead. See https://github.com/tomchentw/react-google-maps/pull/157 for more details.");
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var containerTagName = _props.containerTagName;
	      var _props$containerProps = _props.containerProps;
	      var containerProps = _props$containerProps === undefined ? {} : _props$containerProps;
	      var children = _props.children;

	      var mapProps = _objectWithoutProperties(_props, ["containerTagName", "containerProps", "children"]);

	      var isUsingNewBehavior = USE_NEW_BEHAVIOR_TAG_NAME === containerTagName;

	      if (isUsingNewBehavior) {
	        return _react2["default"].createElement(
	          _creatorsGoogleMapHolder2["default"],
	          mapProps,
	          children
	        );
	      } else {
	        // ------------ Deprecated ------------
	        var realContainerTagName = containerTagName === undefined || containerTagName === null ? "div" : containerTagName;

	        return _react2["default"].createElement(_GoogleMapLoader2["default"], {
	          ref: "loader",
	          containerElement: _react2["default"].createElement(realContainerTagName, containerProps),
	          googleMapElement: _react2["default"].createElement(
	            GoogleMap,
	            _extends({ ref: "delegate", containerTagName: USE_NEW_BEHAVIOR_TAG_NAME }, mapProps),
	            children
	          )
	        });
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({
	      containerTagName: _react.PropTypes.string,
	      containerProps: _react.PropTypes.object,
	      map: _react.PropTypes.object
	    }, _creatorsGoogleMapHolder.mapDefaultPropTypes, _creatorsGoogleMapHolder.mapControlledPropTypes, _creatorsGoogleMapHolder.mapEventPropTypes),
	    enumerable: true
	  }]);

	  return GoogleMap;
	})(_react.Component);

	exports["default"] = GoogleMap;
	module.exports = exports["default"];
	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsCircleCreator = __webpack_require__(35);

	var _creatorsCircleCreator2 = _interopRequireDefault(_creatorsCircleCreator);

	var Circle = (function (_Component) {
	  _inherits(Circle, _Component);

	  function Circle() {
	    _classCallCheck(this, Circle);

	    _get(Object.getPrototypeOf(Circle.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Circle, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getBounds() {
	      return this.state.circle.getBounds();
	    }
	  }, {
	    key: "getCenter",
	    value: function getCenter() {
	      return this.state.circle.getCenter();
	    }
	  }, {
	    key: "getDraggable",
	    value: function getDraggable() {
	      return this.state.circle.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.circle.getEditable();
	    }
	  }, {
	    key: "getMap",
	    value: function getMap() {
	      return this.state.circle.getMap();
	    }
	  }, {
	    key: "getRadius",
	    value: function getRadius() {
	      return this.state.circle.getRadius();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.circle.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var circle = _creatorsCircleCreator2["default"]._createCircle(this.props);

	      this.setState({ circle: circle });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.circle) {
	        return _react2["default"].createElement(
	          _creatorsCircleCreator2["default"],
	          _extends({ circle: this.state.circle }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsCircleCreator.circleDefaultPropTypes, _creatorsCircleCreator.circleControlledPropTypes, _creatorsCircleCreator.circleEventPropTypes),
	    enumerable: true
	  }]);

	  return Circle;
	})(_react.Component);

	exports["default"] = Circle;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 34 */
/***/ function(module, exports) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	module.exports = canUseDOM;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsCircleEventList = __webpack_require__(36);

	var _eventListsCircleEventList2 = _interopRequireDefault(_eventListsCircleEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var circleControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	  center: _react.PropTypes.any,
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  radius: _react.PropTypes.number,
	  visible: _react.PropTypes.bool
	};

	exports.circleControlledPropTypes = circleControlledPropTypes;
	var circleDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(circleControlledPropTypes);

	exports.circleDefaultPropTypes = circleDefaultPropTypes;
	var circleUpdaters = {
	  center: function center(_center, component) {
	    component.getCircle().setCenter(_center);
	  },
	  draggable: function draggable(_draggable, component) {
	    component.getCircle().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getCircle().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getCircle().setOptions(_options);
	  },
	  radius: function radius(_radius, component) {
	    component.getCircle().setRadius(_radius);
	  },
	  visible: function visible(_visible, component) {
	    component.getCircle().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsCircleEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var circleEventPropTypes = eventPropTypes;

	exports.circleEventPropTypes = circleEventPropTypes;

	var CircleCreator = (function (_Component) {
	  _inherits(CircleCreator, _Component);

	  function CircleCreator() {
	    _classCallCheck(this, _CircleCreator);

	    _get(Object.getPrototypeOf(_CircleCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(CircleCreator, [{
	    key: "getCircle",
	    value: function getCircle() {
	      return this.props.circle;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createCircle",
	    value: function _createCircle(circleProps) {
	      var mapHolderRef = circleProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	      var circle = new google.maps.Circle((0, _utilsComposeOptions2["default"])(circleProps, circleControlledPropTypes));

	      circle.setMap(mapHolderRef.getMap());

	      return circle;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      circle: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _CircleCreator = CircleCreator;
	  CircleCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getCircle",
	    updaters: circleUpdaters
	  })(CircleCreator) || CircleCreator;
	  return CircleCreator;
	})(_react.Component);

	exports["default"] = CircleCreator;

/***/ },
/* 36 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "radius_changed", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsDirectionsRendererCreator = __webpack_require__(38);

	var _creatorsDirectionsRendererCreator2 = _interopRequireDefault(_creatorsDirectionsRendererCreator);

	/*
	 * Original author: @alexishevia
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/22
	 */

	var DirectionsRenderer = (function (_Component) {
	  _inherits(DirectionsRenderer, _Component);

	  function DirectionsRenderer() {
	    _classCallCheck(this, DirectionsRenderer);

	    _get(Object.getPrototypeOf(DirectionsRenderer.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(DirectionsRenderer, [{
	    key: "getDirections",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDirections() {
	      return this.state.directionsRenderer.getDirections();
	    }
	  }, {
	    key: "getPanel",
	    value: function getPanel() {
	      return this.state.directionsRenderer.getPanel();
	    }
	  }, {
	    key: "getRouteIndex",
	    value: function getRouteIndex() {
	      return this.state.directionsRenderer.getRouteIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var directionsRenderer = _creatorsDirectionsRendererCreator2["default"]._createDirectionsRenderer(this.props);

	      this.setState({ directionsRenderer: directionsRenderer });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.directionsRenderer) {
	        return _react2["default"].createElement(
	          _creatorsDirectionsRendererCreator2["default"],
	          _extends({ directionsRenderer: this.state.directionsRenderer }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsDirectionsRendererCreator.directionsRendererDefaultPropTypes, _creatorsDirectionsRendererCreator.directionsRendererControlledPropTypes, _creatorsDirectionsRendererCreator.directionsRendererEventPropTypes),
	    enumerable: true
	  }]);

	  return DirectionsRenderer;
	})(_react.Component);

	exports["default"] = DirectionsRenderer;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsDirectionsRendererEventList = __webpack_require__(39);

	var _eventListsDirectionsRendererEventList2 = _interopRequireDefault(_eventListsDirectionsRendererEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var directionsRendererControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	  directions: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  panel: _react.PropTypes.object,
	  routeIndex: _react.PropTypes.number
	};

	exports.directionsRendererControlledPropTypes = directionsRendererControlledPropTypes;
	var directionsRendererDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(directionsRendererControlledPropTypes);

	exports.directionsRendererDefaultPropTypes = directionsRendererDefaultPropTypes;
	var directionsRendererUpdaters = {
	  directions: function directions(_directions, component) {
	    component.getDirectionsRenderer().setDirections(_directions);
	  },
	  options: function options(_options, component) {
	    component.getDirectionsRenderer().setOptions(_options);
	  },
	  panel: function panel(_panel, component) {
	    component.getDirectionsRenderer().setPanel(_panel);
	  },
	  routeIndex: function routeIndex(_routeIndex, component) {
	    component.getDirectionsRenderer().setRouteIndex(_routeIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsDirectionsRendererEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var directionsRendererEventPropTypes = eventPropTypes;

	exports.directionsRendererEventPropTypes = directionsRendererEventPropTypes;

	var DirectionsRendererCreator = (function (_Component) {
	  _inherits(DirectionsRendererCreator, _Component);

	  function DirectionsRendererCreator() {
	    _classCallCheck(this, _DirectionsRendererCreator);

	    _get(Object.getPrototypeOf(_DirectionsRendererCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(DirectionsRendererCreator, [{
	    key: "getDirectionsRenderer",
	    value: function getDirectionsRenderer() {
	      return this.props.directionsRenderer;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.props.children;

	      if (_react.Children.count(children) > 0) {
	        // TODO: take a look at DirectionsRendererOptions#infoWindow and DirectionsRendererOptions#markerOptions ?
	        return _react2["default"].createElement(
	          "div",
	          null,
	          children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "_createDirectionsRenderer",
	    value: function _createDirectionsRenderer(directionsRendererProps) {
	      var mapHolderRef = directionsRendererProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	      var directionsRenderer = new google.maps.DirectionsRenderer((0, _utilsComposeOptions2["default"])(directionsRendererProps, directionsRendererControlledPropTypes));

	      directionsRenderer.setMap(mapHolderRef.getMap());

	      return directionsRenderer;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      directionsRenderer: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _DirectionsRendererCreator = DirectionsRendererCreator;
	  DirectionsRendererCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getDirectionsRenderer",
	    updaters: directionsRendererUpdaters
	  })(DirectionsRendererCreator) || DirectionsRendererCreator;
	  return DirectionsRendererCreator;
	})(_react.Component);

	exports["default"] = DirectionsRendererCreator;

/***/ },
/* 39 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["directions_changed"];
	module.exports = exports["default"];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsDrawingManagerCreator = __webpack_require__(41);

	var _creatorsDrawingManagerCreator2 = _interopRequireDefault(_creatorsDrawingManagerCreator);

	/*
	 * Original author: @idolize
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/46
	 */

	var DrawingManager = (function (_Component) {
	  _inherits(DrawingManager, _Component);

	  function DrawingManager() {
	    _classCallCheck(this, DrawingManager);

	    _get(Object.getPrototypeOf(DrawingManager.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(DrawingManager, [{
	    key: "getDrawingMode",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDrawingMode() {
	      return this.state.drawingManager.getDrawingMode();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var drawingManager = _creatorsDrawingManagerCreator2["default"]._createDrawingManager(this.props);

	      this.setState({ drawingManager: drawingManager });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.drawingManager) {
	        return _react2["default"].createElement(
	          _creatorsDrawingManagerCreator2["default"],
	          _extends({ drawingManager: this.state.drawingManager }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsDrawingManagerCreator.drawingManagerDefaultPropTypes, _creatorsDrawingManagerCreator.drawingManagerControlledPropTypes, _creatorsDrawingManagerCreator.drawingManagerEventPropTypes),
	    enumerable: true
	  }]);

	  return DrawingManager;
	})(_react.Component);

	exports["default"] = DrawingManager;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsDrawingManagerEventList = __webpack_require__(42);

	var _eventListsDrawingManagerEventList2 = _interopRequireDefault(_eventListsDrawingManagerEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var drawingManagerControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	  drawingMode: _react.PropTypes.any,
	  options: _react.PropTypes.object
	};

	exports.drawingManagerControlledPropTypes = drawingManagerControlledPropTypes;
	var drawingManagerDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(drawingManagerControlledPropTypes);

	exports.drawingManagerDefaultPropTypes = drawingManagerDefaultPropTypes;
	var drawingManagerUpdaters = {
	  drawingMode: function drawingMode(_drawingMode, component) {
	    component.getDrawingManager().setDrawingMode(_drawingMode);
	  },
	  options: function options(_options, component) {
	    component.getDrawingManager().setOptions(_options);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsDrawingManagerEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var drawingManagerEventPropTypes = eventPropTypes;

	exports.drawingManagerEventPropTypes = drawingManagerEventPropTypes;

	var DrawingManagerCreator = (function (_Component) {
	  _inherits(DrawingManagerCreator, _Component);

	  function DrawingManagerCreator() {
	    _classCallCheck(this, _DrawingManagerCreator);

	    _get(Object.getPrototypeOf(_DrawingManagerCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(DrawingManagerCreator, [{
	    key: "getDrawingManager",
	    value: function getDrawingManager() {
	      return this.props.drawingManager;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createDrawingManager",
	    value: function _createDrawingManager(drawingManagerProps) {
	      var mapHolderRef = drawingManagerProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	      var drawingManager = new google.maps.drawing.DrawingManager((0, _utilsComposeOptions2["default"])(drawingManagerProps, drawingManagerControlledPropTypes));

	      drawingManager.setMap(mapHolderRef.getMap());

	      return drawingManager;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      drawingManager: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _DrawingManagerCreator = DrawingManagerCreator;
	  DrawingManagerCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getDrawingManager",
	    updaters: drawingManagerUpdaters
	  })(DrawingManagerCreator) || DrawingManagerCreator;
	  return DrawingManagerCreator;
	})(_react.Component);

	exports["default"] = DrawingManagerCreator;

/***/ },
/* 42 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["circlecomplete", "markercomplete", "overlaycomplete", "polygoncomplete", "polylinecomplete", "rectanglecomplete"];
	module.exports = exports["default"];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsInfoWindowCreator = __webpack_require__(44);

	var _creatorsInfoWindowCreator2 = _interopRequireDefault(_creatorsInfoWindowCreator);

	var InfoWindow = (function (_Component) {
	  _inherits(InfoWindow, _Component);

	  function InfoWindow() {
	    _classCallCheck(this, InfoWindow);

	    _get(Object.getPrototypeOf(InfoWindow.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(InfoWindow, [{
	    key: "getContent",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getContent() {/* TODO: children */}
	  }, {
	    key: "getPosition",
	    value: function getPosition() {
	      return this.state.infoWindow.getPosition();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.infoWindow.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var infoWindow = _creatorsInfoWindowCreator2["default"]._createInfoWindow(this.props);

	      this.setState({ infoWindow: infoWindow });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.infoWindow) {
	        return _react2["default"].createElement(
	          _creatorsInfoWindowCreator2["default"],
	          _extends({ infoWindow: this.state.infoWindow }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsInfoWindowCreator.infoWindowDefaultPropTypes, _creatorsInfoWindowCreator.infoWindowControlledPropTypes, _creatorsInfoWindowCreator.infoWindowEventPropTypes),
	    enumerable: true
	  }]);

	  return InfoWindow;
	})(_react.Component);

	exports["default"] = InfoWindow;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsInfoWindowEventList = __webpack_require__(45);

	var _eventListsInfoWindowEventList2 = _interopRequireDefault(_eventListsInfoWindowEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsSetContentForOptionalReactElement = __webpack_require__(46);

	var _utilsSetContentForOptionalReactElement2 = _interopRequireDefault(_utilsSetContentForOptionalReactElement);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var infoWindowControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	  content: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  position: _react.PropTypes.any,
	  zIndex: _react.PropTypes.number
	};

	exports.infoWindowControlledPropTypes = infoWindowControlledPropTypes;
	var infoWindowDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(infoWindowControlledPropTypes);

	exports.infoWindowDefaultPropTypes = infoWindowDefaultPropTypes;
	var infoWindowUpdaters = {
	  children: function children(_children, component) {
	    (0, _utilsSetContentForOptionalReactElement2["default"])(_children, component.getInfoWindow());
	  },
	  content: function content(_content, component) {
	    component.getInfoWindow().setContent(_content);
	  },
	  options: function options(_options, component) {
	    component.getInfoWindow().setOptions(_options);
	  },
	  position: function position(_position, component) {
	    component.getInfoWindow().setPosition(_position);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getInfoWindow().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsInfoWindowEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var infoWindowEventPropTypes = eventPropTypes;

	exports.infoWindowEventPropTypes = infoWindowEventPropTypes;

	var InfoWindowCreator = (function (_Component) {
	  _inherits(InfoWindowCreator, _Component);

	  function InfoWindowCreator() {
	    _classCallCheck(this, _InfoWindowCreator);

	    _get(Object.getPrototypeOf(_InfoWindowCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(InfoWindowCreator, [{
	    key: "getInfoWindow",
	    value: function getInfoWindow() {
	      return this.props.infoWindow;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createInfoWindow",
	    value: function _createInfoWindow(infoWindowProps) {
	      var mapHolderRef = infoWindowProps.mapHolderRef;
	      var anchorHolderRef = infoWindowProps.anchorHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	      var infoWindow = new google.maps.InfoWindow((0, _utilsComposeOptions2["default"])(infoWindowProps, infoWindowControlledPropTypes));

	      if (infoWindowProps.children) {
	        (0, _utilsSetContentForOptionalReactElement2["default"])(infoWindowProps.children, infoWindow);
	      }

	      if (anchorHolderRef) {
	        infoWindow.open(mapHolderRef.getMap(), anchorHolderRef.getAnchor());
	      } else {
	        infoWindow.setMap(mapHolderRef.getMap());
	      }

	      return infoWindow;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      infoWindow: _react.PropTypes.object.isRequired,
	      anchorHolderRef: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);

	  var _InfoWindowCreator = InfoWindowCreator;
	  InfoWindowCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getInfoWindow",
	    updaters: infoWindowUpdaters
	  })(InfoWindowCreator) || InfoWindowCreator;
	  return InfoWindowCreator;
	})(_react.Component);

	exports["default"] = InfoWindowCreator;

/***/ },
/* 45 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"];
	module.exports = exports["default"];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = setContentForOptionalReactElement;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(47);

	function renderElement(contentElement, possiblePrevContent) {
	  var prevContent = possiblePrevContent;
	  if ("[object HTMLDivElement]" !== Object.prototype.toString.call(prevContent)) {
	    prevContent = document.createElement("div");
	  }

	  (0, _reactDom.render)(contentElement, prevContent);
	  return prevContent;
	}

	function setContentForOptionalReactElement(contentOptionalReactElement, infoWindowLikeInstance) {
	  if (_react2["default"].isValidElement(contentOptionalReactElement)) {
	    var contentElement = _react.Children.only(contentOptionalReactElement);
	    var prevContent = infoWindowLikeInstance.getContent();

	    var domEl = renderElement(contentElement, prevContent);
	    infoWindowLikeInstance.setContent(domEl);
	  } else {
	    infoWindowLikeInstance.setContent(contentOptionalReactElement);
	  }
	}

	module.exports = exports["default"];

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsKmlLayerCreator = __webpack_require__(49);

	var _creatorsKmlLayerCreator2 = _interopRequireDefault(_creatorsKmlLayerCreator);

	var KmlLayer = (function (_Component) {
	  _inherits(KmlLayer, _Component);

	  function KmlLayer() {
	    _classCallCheck(this, KmlLayer);

	    _get(Object.getPrototypeOf(KmlLayer.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(KmlLayer, [{
	    key: "getDefaultViewport",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getDefaultViewport() {
	      return this.state.kmlLayer.getDefaultViewport();
	    }
	  }, {
	    key: "getMetadata",
	    value: function getMetadata() {
	      return this.state.kmlLayer.getMetadata();
	    }
	  }, {
	    key: "getStatus",
	    value: function getStatus() {
	      return this.state.kmlLayer.getStatus();
	    }
	  }, {
	    key: "getUrl",
	    value: function getUrl() {
	      return this.state.kmlLayer.getUrl();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.marker.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var kmlLayer = _creatorsKmlLayerCreator2["default"]._createKmlLayer(this.props);

	      this.setState({ kmlLayer: kmlLayer });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.kmlLayer) {
	        return _react2["default"].createElement(
	          _creatorsKmlLayerCreator2["default"],
	          _extends({ kmlLayer: this.state.kmlLayer }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsKmlLayerCreator.kmlLayerDefaultPropTypes, _creatorsKmlLayerCreator.kmlLayerControlledPropTypes, _creatorsKmlLayerCreator.kmlLayerEventPropTypes),
	    enumerable: true
	  }]);

	  return KmlLayer;
	})(_react.Component);

	exports["default"] = KmlLayer;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsKmlLayerEventList = __webpack_require__(50);

	var _eventListsKmlLayerEventList2 = _interopRequireDefault(_eventListsKmlLayerEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var kmlLayerControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	  defaultViewport: _react.PropTypes.any,
	  metadata: _react.PropTypes.any,
	  status: _react.PropTypes.any,
	  url: _react.PropTypes.string,
	  zIndex: _react.PropTypes.number
	};

	exports.kmlLayerControlledPropTypes = kmlLayerControlledPropTypes;
	var kmlLayerDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(kmlLayerControlledPropTypes);

	exports.kmlLayerDefaultPropTypes = kmlLayerDefaultPropTypes;
	var kmlLayerUpdaters = {
	  defaultViewport: function defaultViewport(_defaultViewport, component) {
	    component.getKmlLayer().setDefaultViewport(_defaultViewport);
	  },
	  metadata: function metadata(_metadata, component) {
	    component.getKmlLayer().setMetadata(_metadata);
	  },
	  status: function status(_status, component) {
	    component.getKmlLayer().setStatus(_status);
	  },
	  url: function url(_url, component) {
	    component.getKmlLayer().setUrl(_url);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getKmlLayer().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsKmlLayerEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var kmlLayerEventPropTypes = eventPropTypes;

	exports.kmlLayerEventPropTypes = kmlLayerEventPropTypes;

	var KmlLayerCreator = (function (_Component) {
	  _inherits(KmlLayerCreator, _Component);

	  function KmlLayerCreator() {
	    _classCallCheck(this, _KmlLayerCreator);

	    _get(Object.getPrototypeOf(_KmlLayerCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(KmlLayerCreator, [{
	    key: "getKmlLayer",
	    value: function getKmlLayer() {
	      return this.props.kmlLayer;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var children = _props.children;

	      if (_react.Children.count(children) > 0) {
	        return _react2["default"].createElement(
	          "div",
	          null,
	          _react.Children.map(children, function (childElement) {
	            return childElement && _react2["default"].cloneElement(childElement, {
	              mapHolderRef: mapHolderRef
	            });
	          })
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "_createKmlLayer",
	    value: function _createKmlLayer(kmlLayerProps) {
	      var mapHolderRef = kmlLayerProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	      var kmlLayer = new google.maps.KmlLayer((0, _utilsComposeOptions2["default"])(kmlLayerProps, kmlLayerControlledPropTypes));

	      kmlLayer.setMap(mapHolderRef.getMap());

	      return kmlLayer;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      kmlLayer: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _KmlLayerCreator = KmlLayerCreator;
	  KmlLayerCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getKmlLayer",
	    updaters: kmlLayerUpdaters
	  })(KmlLayerCreator) || KmlLayerCreator;
	  return KmlLayerCreator;
	})(_react.Component);

	exports["default"] = KmlLayerCreator;

/***/ },
/* 50 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "defaultviewport_changed", "status_changed"];
	module.exports = exports["default"];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsMarkerCreator = __webpack_require__(52);

	var _creatorsMarkerCreator2 = _interopRequireDefault(_creatorsMarkerCreator);

	var Marker = (function (_Component) {
	  _inherits(Marker, _Component);

	  function Marker() {
	    _classCallCheck(this, Marker);

	    _get(Object.getPrototypeOf(Marker.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Marker, [{
	    key: "getAnimation",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getAnimation() {
	      return this.state.marker.getAnimation();
	    }
	  }, {
	    key: "getAttribution",
	    value: function getAttribution() {
	      return this.state.marker.getAttribution();
	    }
	  }, {
	    key: "getClickable",
	    value: function getClickable() {
	      return this.state.marker.getClickable();
	    }
	  }, {
	    key: "getCursor",
	    value: function getCursor() {
	      return this.state.marker.getCursor();
	    }
	  }, {
	    key: "getDraggable",
	    value: function getDraggable() {
	      return this.state.marker.getDraggable();
	    }
	  }, {
	    key: "getIcon",
	    value: function getIcon() {
	      return this.state.marker.getIcon();
	    }
	  }, {
	    key: "getLabel",
	    value: function getLabel() {
	      return this.state.marker.getLabel();
	    }
	  }, {
	    key: "getOpacity",
	    value: function getOpacity() {
	      return this.state.marker.getOpacity();
	    }
	  }, {
	    key: "getPlace",
	    value: function getPlace() {
	      return this.state.marker.getPlace();
	    }
	  }, {
	    key: "getPosition",
	    value: function getPosition() {
	      return this.state.marker.getPosition();
	    }
	  }, {
	    key: "getShape",
	    value: function getShape() {
	      return this.state.marker.getShape();
	    }
	  }, {
	    key: "getTitle",
	    value: function getTitle() {
	      return this.state.marker.getTitle();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.marker.getVisible();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.marker.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var marker = _creatorsMarkerCreator2["default"]._createMarker(this.props);

	      this.setState({ marker: marker });
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }

	      var anchorHolderRef = this.props.anchorHolderRef;
	      var marker = this.state.marker;

	      if (anchorHolderRef) {
	        if ("MarkerClusterer" === anchorHolderRef.getAnchorType()) {
	          anchorHolderRef.getAnchor().removeMarker(marker);
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.marker) {
	        return _react2["default"].createElement(
	          _creatorsMarkerCreator2["default"],
	          _extends({ marker: this.state.marker }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsMarkerCreator.markerDefaultPropTypes, _creatorsMarkerCreator.markerControlledPropTypes, _creatorsMarkerCreator.markerEventPropTypes),
	    enumerable: true
	  }]);

	  return Marker;
	})(_react.Component);

	exports["default"] = Marker;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsMarkerEventList = __webpack_require__(53);

	var _eventListsMarkerEventList2 = _interopRequireDefault(_eventListsMarkerEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var markerControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	  animation: _react.PropTypes.any,
	  attribution: _react.PropTypes.any,
	  clickable: _react.PropTypes.bool,
	  cursor: _react.PropTypes.string,
	  draggable: _react.PropTypes.bool,
	  icon: _react.PropTypes.any,
	  label: _react.PropTypes.any,
	  opacity: _react.PropTypes.number,
	  options: _react.PropTypes.object,
	  place: _react.PropTypes.any,
	  position: _react.PropTypes.any,
	  shape: _react.PropTypes.any,
	  title: _react.PropTypes.string,
	  visible: _react.PropTypes.bool,
	  zIndex: _react.PropTypes.number
	};

	exports.markerControlledPropTypes = markerControlledPropTypes;
	var markerDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(markerControlledPropTypes);

	exports.markerDefaultPropTypes = markerDefaultPropTypes;
	var markerUpdaters = {
	  animation: function animation(_animation, component) {
	    component.getMarker().setAnimation(_animation);
	  },
	  attribution: function attribution(_attribution, component) {
	    component.getMarker().setAttribution(_attribution);
	  },
	  clickable: function clickable(_clickable, component) {
	    component.getMarker().setClickable(_clickable);
	  },
	  cursor: function cursor(_cursor, component) {
	    component.getMarker().setCursor(_cursor);
	  },
	  draggable: function draggable(_draggable, component) {
	    component.getMarker().setDraggable(_draggable);
	  },
	  icon: function icon(_icon, component) {
	    component.getMarker().setIcon(_icon);
	  },
	  label: function label(_label, component) {
	    component.getMarker().setLabel(_label);
	  },
	  opacity: function opacity(_opacity, component) {
	    component.getMarker().setOpacity(_opacity);
	  },
	  options: function options(_options, component) {
	    component.getMarker().setOptions(_options);
	  },
	  place: function place(_place, component) {
	    component.getMarker().setPlace(_place);
	  },
	  position: function position(_position, component) {
	    component.getMarker().setPosition(_position);
	  },
	  shape: function shape(_shape, component) {
	    component.getMarker().setShape(_shape);
	  },
	  title: function title(_title, component) {
	    component.getMarker().setTitle(_title);
	  },
	  visible: function visible(_visible, component) {
	    component.getMarker().setVisible(_visible);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getMarker().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsMarkerEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var markerEventPropTypes = eventPropTypes;

	exports.markerEventPropTypes = markerEventPropTypes;

	var MarkerCreator = (function (_Component) {
	  _inherits(MarkerCreator, _Component);

	  function MarkerCreator() {
	    _classCallCheck(this, _MarkerCreator);

	    _get(Object.getPrototypeOf(_MarkerCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(MarkerCreator, [{
	    key: "getMarker",
	    value: function getMarker() {
	      return this.props.marker;
	    }

	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindowOptions
	    // In the core API, the only anchor is the Marker class.
	  }, {
	    key: "getAnchor",
	    value: function getAnchor() {
	      return this.props.marker;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;

	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var children = _props.children;

	      if (_react.Children.count(children) > 0) {
	        return _react2["default"].createElement(
	          "div",
	          null,
	          _react.Children.map(children, function (childElement) {
	            return childElement && _react2["default"].cloneElement(childElement, {
	              mapHolderRef: mapHolderRef,
	              anchorHolderRef: _this
	            });
	          })
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "_createMarker",
	    value: function _createMarker(markerProps) {
	      var mapHolderRef = markerProps.mapHolderRef;
	      var anchorHolderRef = markerProps.anchorHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	      var marker = new google.maps.Marker((0, _utilsComposeOptions2["default"])(markerProps, markerControlledPropTypes));

	      if (anchorHolderRef) {
	        if ("MarkerClusterer" === anchorHolderRef.getAnchorType()) {
	          anchorHolderRef.getAnchor().addMarker(marker);
	        }
	      } else {
	        marker.setMap(mapHolderRef.getMap());
	      }

	      return marker;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      marker: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _MarkerCreator = MarkerCreator;
	  MarkerCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getMarker",
	    updaters: markerUpdaters
	  })(MarkerCreator) || MarkerCreator;
	  return MarkerCreator;
	})(_react.Component);

	exports["default"] = MarkerCreator;

/***/ },
/* 53 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["animation_changed", "click", "clickable_changed", "cursor_changed", "dblclick", "drag", "dragend", "draggable_changed", "dragstart", "flat_changed", "icon_changed", "mousedown", "mouseout", "mouseover", "mouseup", "position_changed", "rightclick", "shape_changed", "title_changed", "visible_changed", "zindex_changed"];
	module.exports = exports["default"];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsOverlayViewCreator = __webpack_require__(55);

	var _creatorsOverlayViewCreator2 = _interopRequireDefault(_creatorsOverlayViewCreator);

	/*
	 * Original author: @petebrowne
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/63
	 */

	var OverlayView = (function (_Component) {
	  _inherits(OverlayView, _Component);

	  function OverlayView() {
	    _classCallCheck(this, OverlayView);

	    _get(Object.getPrototypeOf(OverlayView.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(OverlayView, [{
	    key: "getPanes",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getPanes() {
	      return this.state.overlayView.getPanes();
	    }
	  }, {
	    key: "getProjection",
	    value: function getProjection() {
	      return this.state.overlayView.getProjection();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var overlayView = _creatorsOverlayViewCreator2["default"]._createOverlayView(this.props);

	      this.setState({ overlayView: overlayView });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.overlayView) {
	        return _react2["default"].createElement(
	          _creatorsOverlayViewCreator2["default"],
	          _extends({ overlayView: this.state.overlayView }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "FLOAT_PANE",
	    value: "floatPane",
	    enumerable: true
	  }, {
	    key: "MAP_PANE",
	    value: "mapPane",
	    enumerable: true
	  }, {
	    key: "MARKER_LAYER",
	    value: "markerLayer",
	    enumerable: true
	  }, {
	    key: "OVERLAY_LAYER",
	    value: "overlayLayer",
	    enumerable: true
	  }, {
	    key: "OVERLAY_MOUSE_TARGET",
	    value: "overlayMouseTarget",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: _extends({}, _creatorsOverlayViewCreator.overlayViewDefaultPropTypes, _creatorsOverlayViewCreator.overlayViewControlledPropTypes),
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      mapPaneName: OverlayView.OVERLAY_LAYER
	    },
	    enumerable: true
	  }]);

	  return OverlayView;
	})(_react.Component);

	exports["default"] = OverlayView;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(47);

	var _invariant = __webpack_require__(56);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var overlayViewControlledPropTypes = {
	  // CustomProps
	  mapPaneName: _react.PropTypes.string,
	  getPixelPositionOffset: _react.PropTypes.func,
	  position: _react.PropTypes.object,
	  children: _react.PropTypes.node,
	  bounds: _react.PropTypes.object
	};

	exports.overlayViewControlledPropTypes = overlayViewControlledPropTypes;
	// NOTICE!!!!!!
	//
	// Only expose those with getters & setters in the table as controlled props.
	//
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	//
	// https://developers.google.com/maps/documentation/javascript/3.exp/reference
	var overlayViewDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(overlayViewControlledPropTypes);

	exports.overlayViewDefaultPropTypes = overlayViewDefaultPropTypes;

	var OverlayViewCreator = (function (_Component) {
	  _inherits(OverlayViewCreator, _Component);

	  function OverlayViewCreator() {
	    _classCallCheck(this, OverlayViewCreator);

	    _get(Object.getPrototypeOf(OverlayViewCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(OverlayViewCreator, [{
	    key: "getOverlayView",
	    value: function getOverlayView() {
	      return this.props.overlayView;
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.getOverlayView().setMap(this.props.mapHolderRef.getMap());
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      this.getOverlayView().setValues(this.props);
	      this.getOverlayView()._redraw(this.props.mapPaneName !== prevProps.mapPaneName);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.getOverlayView().setMap(null);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createOverlayView",
	    value: function _createOverlayView(overlayViewProps) {
	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView
	      var overlayView = new google.maps.OverlayView();
	      overlayView.setValues((0, _utilsComposeOptions2["default"])(overlayViewProps, overlayViewControlledPropTypes));

	      overlayView.onAdd = function onAdd() {
	        this._containerElement = document.createElement("div");
	        this._containerElement.style.position = "absolute";
	      };

	      overlayView.draw = function draw() {
	        this._mountContainerToPane();
	        this._renderContent();
	      };

	      overlayView.onRemove = function onRemove() {
	        (0, _reactDom.unmountComponentAtNode)(this._containerElement);
	        this._unmountContainerFromPane();
	        this._containerElement = null;
	      };

	      overlayView._redraw = function _redraw(mapPaneNameChanged) {
	        if (mapPaneNameChanged) {
	          this._unmountContainerFromPane();
	          this._mountContainerToPane();
	        }
	        this._renderContent();
	      };

	      overlayView._renderContent = function _renderContent() {
	        if (this._containerElement) {
	          (0, _reactDom.render)(_react.Children.only(this.get("children")), this._containerElement, this._positionContainerElement.bind(this));
	        }
	      };

	      overlayView._mountContainerToPane = function _mountContainerToPane() {
	        var mapPaneName = this.get("mapPaneName");
	        (0, _invariant2["default"])(!!mapPaneName, "OverlayView requires a mapPaneName/defaultMapPaneName in your props instead of %s", mapPaneName);

	        this.getPanes()[mapPaneName].appendChild(this._containerElement);
	      };

	      overlayView._unmountContainerFromPane = function _unmountContainerFromPane() {
	        this._containerElement.parentNode.removeChild(this._containerElement);
	      };

	      overlayView._positionContainerElement = function _positionContainerElement() {
	        var left = undefined;
	        var top = undefined;
	        var offset = this._getOffset();
	        if (this.get("bounds")) {
	          var bounds = this._getPixelBounds();
	          if (bounds) {
	            var sw = bounds.sw;
	            var ne = bounds.ne;

	            if (offset) {
	              sw.x += offset.x;
	              ne.y += offset.y;
	            }
	            left = sw.x + "px";
	            top = ne.y + "px";
	            this._containerElement.style.width = ne.x - sw.x + "px";
	            this._containerElement.style.height = sw.y - ne.y + "px";
	          }
	        } else {
	          var position = this._getPixelPosition();
	          if (position) {
	            var x = position.x;
	            var y = position.y;

	            if (offset) {
	              x += offset.x;
	              y += offset.y;
	            }
	            left = x + "px";
	            top = y + "px";
	          }
	        }

	        this._containerElement.style.left = left;
	        this._containerElement.style.top = top;
	      };

	      overlayView._getPixelPosition = function _getPixelPosition() {
	        var projection = this.getProjection();
	        var position = this.get("position");
	        (0, _invariant2["default"])(!!position, "OverlayView requires a position/defaultPosition in your props instead of %s", position);
	        if (projection && position) {
	          if (!(position instanceof google.maps.LatLng)) {
	            position = new google.maps.LatLng(position.lat, position.lng);
	          }
	          return projection.fromLatLngToDivPixel(position);
	        }
	      };

	      overlayView._getPixelBounds = function _getPixelBounds() {
	        var projection = this.getProjection();
	        var bounds = this.get("bounds");
	        (0, _invariant2["default"])(!!bounds, "OverlayView requires a bounds in your props instead of %s", bounds);
	        if (projection && bounds) {
	          if (!(bounds instanceof google.maps.LatLngBounds)) {
	            bounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.ne.lat, bounds.ne.lng), new google.maps.LatLng(bounds.sw.lat, bounds.sw.lng));
	          }
	          return {
	            sw: projection.fromLatLngToDivPixel(this.bounds.getSouthWest()),
	            ne: projection.fromLatLngToDivPixel(this.bounds.getNorthEast())
	          };
	        }
	      };

	      overlayView._getOffset = function _getOffset() {
	        // Allows the component to control the visual position of the OverlayView
	        // relative to the LatLng pixel position.
	        var getPixelPositionOffset = this.get("getPixelPositionOffset");
	        if (getPixelPositionOffset) {
	          return getPixelPositionOffset(this._containerElement.offsetWidth, this._containerElement.offsetHeight);
	        }
	      };

	      // If we're inside a MarkerClusterer, allow ourselves to be clustered
	      if (overlayViewProps.anchorHolderRef) {
	        if ("MarkerClusterer" === overlayViewProps.anchorHolderRef.getAnchorType()) {
	          overlayView.getDraggable = function getDraggable() {
	            return !!overlayViewProps.draggable;
	          };

	          overlayView.getPosition = function getPosition() {
	            return new google.maps.LatLng(this.position);
	          };

	          overlayViewProps.anchorHolderRef.getAnchor().addMarker(overlayView);
	        }
	      }

	      return overlayView;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      mapPaneName: _react.PropTypes.string,
	      overlayView: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  return OverlayViewCreator;
	})(_react.Component);

	exports["default"] = OverlayViewCreator;

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("invariant");

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsPolygonCreator = __webpack_require__(58);

	var _creatorsPolygonCreator2 = _interopRequireDefault(_creatorsPolygonCreator);

	var Polygon = (function (_Component) {
	  _inherits(Polygon, _Component);

	  function Polygon() {
	    _classCallCheck(this, Polygon);

	    _get(Object.getPrototypeOf(Polygon.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Polygon, [{
	    key: "getDraggable",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDraggable() {
	      return this.state.polygon.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.polygon.getEditable();
	    }
	  }, {
	    key: "getPath",
	    value: function getPath() {
	      return this.state.polygon.getPath();
	    }
	  }, {
	    key: "getPaths",
	    value: function getPaths() {
	      return this.state.polygon.getPaths();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.polygon.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var polygon = _creatorsPolygonCreator2["default"]._createPolygon(this.props);

	      this.setState({ polygon: polygon });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.polygon) {
	        return _react2["default"].createElement(
	          _creatorsPolygonCreator2["default"],
	          _extends({ polygon: this.state.polygon }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsPolygonCreator.polygonDefaultPropTypes, _creatorsPolygonCreator.polygonControlledPropTypes, _creatorsPolygonCreator.polygonEventPropTypes),
	    enumerable: true
	  }]);

	  return Polygon;
	})(_react.Component);

	exports["default"] = Polygon;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsPolygonEventList = __webpack_require__(59);

	var _eventListsPolygonEventList2 = _interopRequireDefault(_eventListsPolygonEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var polygonControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  path: _react.PropTypes.any,
	  paths: _react.PropTypes.any,
	  visible: _react.PropTypes.bool
	};

	exports.polygonControlledPropTypes = polygonControlledPropTypes;
	var polygonDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(polygonControlledPropTypes);

	exports.polygonDefaultPropTypes = polygonDefaultPropTypes;
	var polygonUpdaters = {
	  draggable: function draggable(_draggable, component) {
	    component.getPolygon().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getPolygon().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getPolygon().setOptions(_options);
	  },
	  path: function path(_path, component) {
	    component.getPolygon().setPath(_path);
	  },
	  paths: function paths(_paths, component) {
	    component.getPolygon().setPaths(_paths);
	  },
	  visible: function visible(_visible, component) {
	    component.getPolygon().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsPolygonEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var polygonEventPropTypes = eventPropTypes;

	exports.polygonEventPropTypes = polygonEventPropTypes;

	var PolygonCreator = (function (_Component) {
	  _inherits(PolygonCreator, _Component);

	  function PolygonCreator() {
	    _classCallCheck(this, _PolygonCreator);

	    _get(Object.getPrototypeOf(_PolygonCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PolygonCreator, [{
	    key: "getPolygon",
	    value: function getPolygon() {
	      return this.props.polygon;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createPolygon",
	    value: function _createPolygon(polygonProps) {
	      var mapHolderRef = polygonProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	      var polygon = new google.maps.Polygon((0, _utilsComposeOptions2["default"])(polygonProps, polygonControlledPropTypes));

	      polygon.setMap(mapHolderRef.getMap());

	      return polygon;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      polygon: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _PolygonCreator = PolygonCreator;
	  PolygonCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getPolygon",
	    updaters: polygonUpdaters
	  })(PolygonCreator) || PolygonCreator;
	  return PolygonCreator;
	})(_react.Component);

	exports["default"] = PolygonCreator;

/***/ },
/* 59 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsPolylineCreator = __webpack_require__(61);

	var _creatorsPolylineCreator2 = _interopRequireDefault(_creatorsPolylineCreator);

	var Polyline = (function (_Component) {
	  _inherits(Polyline, _Component);

	  function Polyline() {
	    _classCallCheck(this, Polyline);

	    _get(Object.getPrototypeOf(Polyline.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Polyline, [{
	    key: "getDraggable",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDraggable() {
	      return this.state.polyline.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.polyline.getEditable();
	    }
	  }, {
	    key: "getPath",
	    value: function getPath() {
	      return this.state.polyline.getPath();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.polyline.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var polyline = _creatorsPolylineCreator2["default"]._createPolyline(this.props);

	      this.setState({ polyline: polyline });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.polyline) {
	        return _react2["default"].createElement(
	          _creatorsPolylineCreator2["default"],
	          _extends({ polyline: this.state.polyline }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsPolylineCreator.polylineDefaultPropTypes, _creatorsPolylineCreator.polylineControlledPropTypes, _creatorsPolylineCreator.polylineEventPropTypes),
	    enumerable: true
	  }]);

	  return Polyline;
	})(_react.Component);

	exports["default"] = Polyline;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsPolylineEventList = __webpack_require__(62);

	var _eventListsPolylineEventList2 = _interopRequireDefault(_eventListsPolylineEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var polylineControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  path: _react.PropTypes.any,
	  visible: _react.PropTypes.bool
	};

	exports.polylineControlledPropTypes = polylineControlledPropTypes;
	var polylineDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(polylineControlledPropTypes);

	exports.polylineDefaultPropTypes = polylineDefaultPropTypes;
	var polylineUpdaters = {
	  draggable: function draggable(_draggable, component) {
	    component.getPolyline().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getPolyline().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getPolyline().setOptions(_options);
	  },
	  path: function path(_path, component) {
	    component.getPolyline().setPath(_path);
	  },
	  visible: function visible(_visible, component) {
	    component.getPolyline().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsPolylineEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var polylineEventPropTypes = eventPropTypes;

	exports.polylineEventPropTypes = polylineEventPropTypes;

	var PolylineCreator = (function (_Component) {
	  _inherits(PolylineCreator, _Component);

	  function PolylineCreator() {
	    _classCallCheck(this, _PolylineCreator);

	    _get(Object.getPrototypeOf(_PolylineCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PolylineCreator, [{
	    key: "getPolyline",
	    value: function getPolyline() {
	      return this.props.polyline;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createPolyline",
	    value: function _createPolyline(polylineProps) {
	      var mapHolderRef = polylineProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	      var polyline = new google.maps.Polyline((0, _utilsComposeOptions2["default"])(polylineProps, polylineControlledPropTypes));

	      polyline.setMap(mapHolderRef.getMap());

	      return polyline;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      polyline: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _PolylineCreator = PolylineCreator;
	  PolylineCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getPolyline",
	    updaters: polylineUpdaters
	  })(PolylineCreator) || PolylineCreator;
	  return PolylineCreator;
	})(_react.Component);

	exports["default"] = PolylineCreator;

/***/ },
/* 62 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsRectangleCreator = __webpack_require__(64);

	var _creatorsRectangleCreator2 = _interopRequireDefault(_creatorsRectangleCreator);

	/*
	 * Original author: @alistairjcbrown
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/80
	 */

	var Rectangle = (function (_Component) {
	  _inherits(Rectangle, _Component);

	  function Rectangle() {
	    _classCallCheck(this, Rectangle);

	    _get(Object.getPrototypeOf(Rectangle.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Rectangle, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getBounds() {
	      return this.state.rectangle.getBounds();
	    }
	  }, {
	    key: "getDraggable",
	    value: function getDraggable() {
	      return this.state.rectangle.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.rectangle.getEditable();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.rectangle.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var rectangle = _creatorsRectangleCreator2["default"]._createRectangle(this.props);

	      this.setState({ rectangle: rectangle });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.rectangle) {
	        return _react2["default"].createElement(
	          _creatorsRectangleCreator2["default"],
	          _extends({ rectangle: this.state.rectangle }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsRectangleCreator.rectangleDefaultPropTypes, _creatorsRectangleCreator.rectangleControlledPropTypes, _creatorsRectangleCreator.rectangleEventPropTypes),
	    enumerable: true
	  }]);

	  return Rectangle;
	})(_react.Component);

	exports["default"] = Rectangle;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsRectangleEventList = __webpack_require__(65);

	var _eventListsRectangleEventList2 = _interopRequireDefault(_eventListsRectangleEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var rectangleControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	  bounds: _react.PropTypes.any,
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  visible: _react.PropTypes.bool
	};

	exports.rectangleControlledPropTypes = rectangleControlledPropTypes;
	var rectangleDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(rectangleControlledPropTypes);

	exports.rectangleDefaultPropTypes = rectangleDefaultPropTypes;
	var rectangleUpdaters = {
	  bounds: function bounds(_bounds, component) {
	    component.getRectangle().setBounds(_bounds);
	  },
	  draggable: function draggable(_draggable, component) {
	    component.getRectangle().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getRectangle().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getRectangle().setOptions(_options);
	  },
	  visible: function visible(_visible, component) {
	    component.getRectangle().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsRectangleEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var rectangleEventPropTypes = eventPropTypes;

	exports.rectangleEventPropTypes = rectangleEventPropTypes;

	var RectangleCreator = (function (_Component) {
	  _inherits(RectangleCreator, _Component);

	  function RectangleCreator() {
	    _classCallCheck(this, _RectangleCreator);

	    _get(Object.getPrototypeOf(_RectangleCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(RectangleCreator, [{
	    key: "getRectangle",
	    value: function getRectangle() {
	      return this.props.rectangle;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createRectangle",
	    value: function _createRectangle(rectangleProps) {
	      var mapHolderRef = rectangleProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	      var rectangle = new google.maps.Rectangle((0, _utilsComposeOptions2["default"])(rectangleProps, rectangleControlledPropTypes));

	      rectangle.setMap(mapHolderRef.getMap());

	      return rectangle;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      rectangle: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _RectangleCreator = RectangleCreator;
	  RectangleCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getRectangle",
	    updaters: rectangleUpdaters
	  })(RectangleCreator) || RectangleCreator;
	  return RectangleCreator;
	})(_react.Component);

	exports["default"] = RectangleCreator;

/***/ },
/* 65 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["bounds_changed", "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(34);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsSearchBoxCreator = __webpack_require__(67);

	var _creatorsSearchBoxCreator2 = _interopRequireDefault(_creatorsSearchBoxCreator);

	/*
	 * Original author: @eyebraus
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/110
	 */

	var SearchBox = (function (_Component) {
	  _inherits(SearchBox, _Component);

	  function SearchBox() {
	    _classCallCheck(this, SearchBox);

	    _get(Object.getPrototypeOf(SearchBox.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(SearchBox, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getBounds() {
	      return this.state.searchBox.getBounds();
	    }
	  }, {
	    key: "getPlaces",
	    value: function getPlaces() {
	      return this.state.searchBox.getPlaces();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var classes = _props.classes;
	      var style = _props.style;
	      var placeholder = _props.placeholder;

	      var searchBoxProps = _objectWithoutProperties(_props, ["mapHolderRef", "classes", "style", "placeholder"]);

	      // Cannot create input via component - Google Maps will mess with React's internal state by detaching/attaching.
	      // Allow developers to style the "hidden element" via inputClasses.
	      var domEl = document.createElement("input");
	      domEl.className = classes;
	      domEl.type = "text";
	      domEl.placeholder = placeholder;

	      for (var propKey in style) {
	        if (style.hasOwnProperty(propKey)) {
	          domEl.style[propKey] = style[propKey];
	        }
	      }

	      var searchBox = _creatorsSearchBoxCreator2["default"]._createSearchBox(domEl, searchBoxProps);

	      this.setState({
	        inputElement: domEl,
	        searchBox: searchBox
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props2 = this.props;
	      var mapHolderRef = _props2.mapHolderRef;
	      var controlPosition = _props2.controlPosition;

	      return this.state.searchBox ? _react2["default"].createElement(
	        _creatorsSearchBoxCreator2["default"],
	        _extends({ controlPosition: controlPosition, inputElement: this.state.inputElement, mapHolderRef: mapHolderRef, searchBox: this.state.searchBox }, this.props),
	        this.props.children
	      ) : _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsSearchBoxCreator.searchBoxDefaultPropTypes, _creatorsSearchBoxCreator.searchBoxControlledPropTypes, _creatorsSearchBoxCreator.searchBoxEventPropTypes),
	    enumerable: true
	  }]);

	  return SearchBox;
	})(_react.Component);

	exports["default"] = SearchBox;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsSearchBoxEventList = __webpack_require__(68);

	var _eventListsSearchBoxEventList2 = _interopRequireDefault(_eventListsSearchBoxEventList);

	var _utilsEventHandlerCreator = __webpack_require__(26);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(27);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(29);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(31);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(23);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var searchBoxControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  bounds: _react.PropTypes.any
	};

	exports.searchBoxControlledPropTypes = searchBoxControlledPropTypes;
	var searchBoxDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(searchBoxControlledPropTypes);

	exports.searchBoxDefaultPropTypes = searchBoxDefaultPropTypes;
	var searchBoxUpdaters = {
	  bounds: function bounds(_bounds, component) {
	    component.getSearchBox().setBounds(_bounds);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsSearchBoxEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var searchBoxEventPropTypes = eventPropTypes;

	exports.searchBoxEventPropTypes = searchBoxEventPropTypes;

	var SearchBoxCreator = (function (_Component) {
	  _inherits(SearchBoxCreator, _Component);

	  function SearchBoxCreator() {
	    _classCallCheck(this, _SearchBoxCreator);

	    _get(Object.getPrototypeOf(_SearchBoxCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(SearchBoxCreator, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this._mountComponentToMap(this.props.controlPosition);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      if (this.props.controlPosition !== prevProps.controlPosition) {
	        this._unmountComponentFromMap(prevProps.controlPosition);
	        this._mountComponentToMap(this.props.controlPosition);
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this._unmountComponentFromMap(this.props.controlPosition);
	    }
	  }, {
	    key: "_mountComponentToMap",
	    value: function _mountComponentToMap(controlPosition) {
	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var inputElement = _props.inputElement;

	      mapHolderRef.getMap().controls[controlPosition].push(inputElement);
	    }
	  }, {
	    key: "_unmountComponentFromMap",
	    value: function _unmountComponentFromMap(controlPosition) {
	      var _props2 = this.props;
	      var mapHolderRef = _props2.mapHolderRef;
	      var inputElement = _props2.inputElement;

	      var index = mapHolderRef.getMap().controls[controlPosition].getArray().indexOf(inputElement);
	      mapHolderRef.getMap().controls[controlPosition].removeAt(index);
	    }
	  }, {
	    key: "getSearchBox",
	    value: function getSearchBox() {
	      return this.props.searchBox;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createSearchBox",
	    value: function _createSearchBox(inputElement, searchBoxProps) {
	      var searchBox = new google.maps.places.SearchBox(inputElement, (0, _utilsComposeOptions2["default"])(searchBoxProps, searchBoxControlledPropTypes));

	      return searchBox;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      searchBox: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _SearchBoxCreator = SearchBoxCreator;
	  SearchBoxCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getSearchBox",
	    updaters: searchBoxUpdaters
	  })(SearchBoxCreator) || SearchBoxCreator;
	  return SearchBoxCreator;
	})(_react.Component);

	exports["default"] = SearchBoxCreator;

/***/ },
/* 68 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["places_changed"];
	module.exports = exports["default"];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	var _utils = __webpack_require__(10);

	var _presentation = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Register = function (_Component) {
	  _inherits(Register, _Component);

	  function Register() {
	    _classCallCheck(this, Register);

	    var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(Register, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      _utils.APIManager.get('/account/currentUser', null, function (err, response) {
	        if (err) {
	          console.error(err);
	          return;
	        }
	        if (response.profile == null) {
	          return;
	        }

	        console.log(response.profile);
	        _this2.props.currentUserReceived(response.profile);
	      });
	    }
	  }, {
	    key: 'register',
	    value: function register(visitor) {
	      var _this3 = this;

	      console.log(JSON.stringify(visitor) + ' is trying to join the site');
	      _utils.APIManager.post('/account/register', visitor, function (err, response) {
	        if (err) {
	          var msg = err.message || err;
	          console.error(msg);
	          return;
	        }

	        console.log(response.profile + 'successfully joined');
	        _this3.props.profileCreated(response.profile);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'sidebar' },
	        _react2.default.createElement(_presentation.RegisterForm, { onRegister: this.register.bind(this) })
	      );
	    }
	  }]);

	  return Register;
	}(_react.Component);

	var stateToProps = function stateToProps(state) {
	  return {
	    currentUser: state.account.currentUser
	  };
	};

	var dispatchToProps = function dispatchToProps(dispatch) {
	  return {
	    currentUserReceived: function currentUserReceived(profile) {
	      return dispatch(_actions2.default.currentUserReceived(profile));
	    },
	    profileCreated: function profileCreated(profile) {
	      return dispatch(_actions2.default.profileCreated(profile));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(stateToProps, dispatchToProps)(Register);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sidebar = exports.Nav = exports.Container = undefined;

	var _Container = __webpack_require__(71);

	var _Container2 = _interopRequireDefault(_Container);

	var _Nav = __webpack_require__(73);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _Sidebar = __webpack_require__(76);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Container = _Container2.default;
	exports.Nav = _Nav2.default;
	exports.Sidebar = _Sidebar2.default;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactResizable = __webpack_require__(72);

	var _reactRedux = __webpack_require__(7);

	var _containers = __webpack_require__(5);

	var _ = __webpack_require__(70);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Container = function (_Component) {
	  _inherits(Container, _Component);

	  function Container() {
	    _classCallCheck(this, Container);

	    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

	    _this.state = {
	      height: window.innerHeight - 100,
	      leftWidth: window.innerWidth / 2,
	      rightWidth: window.innerWidth / 2
	    };
	    return _this;
	  }

	  _createClass(Container, [{
	    key: 'onResize',
	    value: function onResize(event, _ref) {
	      var element = _ref.element,
	          size = _ref.size;

	      this.setState({
	        leftWidth: size.width,
	        rightWidth: window.innerWidth - size.width
	      });
	      // console.log('Width of left component is ' + this.state.leftWidth + 'px')
	      // console.log('Width of right component is ' + this.state.rightWidth + 'px')
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var mapContainer = _react2.default.createElement('div', { style: { height: this.state.height, width: this.state.leftWidth } });

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'nav' },
	          _react2.default.createElement(_.Nav, null)
	        ),
	        _react2.default.createElement(
	          _reactResizable.ResizableBox,
	          { className: 'left',
	            width: this.state.leftWidth, height: this.state.height,
	            axis: 'x',
	            onResize: this.onResize.bind(this) },
	          _react2.default.createElement(_containers.Map, {
	            mapContainer: mapContainer
	          })
	        ),
	        _react2.default.createElement(
	          _reactResizable.ResizableBox,
	          { className: 'right',
	            width: this.state.rightWidth, height: this.state.height,
	            axis: 'x' },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return Container;
	}(_react.Component);

	exports.default = Container;

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("react-resizable");

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _reactBootstrap = __webpack_require__(74);

	var _reactRouterBootstrap = __webpack_require__(75);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	var _utils = __webpack_require__(10);

	var _containers = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Navigation = function (_React$Component) {
	  _inherits(Navigation, _React$Component);

	  function Navigation() {
	    _classCallCheck(this, Navigation);

	    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(Navigation, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      _utils.APIManager.get('/account/currentuser', null, function (err, response) {
	        if (err) {
	          console.error(err);
	          return;
	        }
	        if (response.profile == null) {
	          return;
	        }
	        _this2.props.currentUserReceived(response.profile);
	      });
	    }
	  }, {
	    key: 'login',
	    value: function login(credentials) {
	      var _this3 = this;

	      _utils.APIManager.post('/account/login', credentials, function (err, response) {
	        if (err) {
	          var msg = err.message || err;
	          console.error(msg);
	          return;
	        }
	        _this3.props.currentUserReceived(response.profile);
	      });
	    }
	  }, {
	    key: 'logout',
	    value: function logout(event) {
	      _utils.APIManager.get('/account/logout', null, function (err, response) {
	        if (err) {
	          console.error(err);
	          return;
	        }
	      });
	      this.props.currentUserReceived(null);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactBootstrap.Navbar,
	        { collapseOnSelect: true },
	        _react2.default.createElement(
	          _reactBootstrap.Navbar.Header,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Navbar.Brand,
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/' },
	              'My Hike'
	            )
	          ),
	          _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Navbar.Collapse,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Nav,
	            null,
	            _react2.default.createElement(
	              _reactRouterBootstrap.LinkContainer,
	              { to: '/add-hike' },
	              _react2.default.createElement(
	                _reactBootstrap.NavItem,
	                null,
	                'Add a new Hike'
	              )
	            ),
	            _react2.default.createElement(
	              _reactRouterBootstrap.LinkContainer,
	              { to: '/hike' },
	              _react2.default.createElement(
	                _reactBootstrap.NavItem,
	                null,
	                'Test hike'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Nav,
	            { pullRight: true },
	            this.props.currentUser == null ? _react2.default.createElement(
	              _reactBootstrap.NavItem,
	              null,
	              _react2.default.createElement(_containers.Login, { onLogin: this.login.bind(this) })
	            ) : _react2.default.createElement(
	              _reactBootstrap.NavItem,
	              null,
	              _react2.default.createElement(
	                'button',
	                { onClick: this.logout.bind(this) },
	                'Log out ',
	                this.props.currentUser.username
	              )
	            ),
	            this.props.currentUser == null ? _react2.default.createElement(
	              _reactRouterBootstrap.LinkContainer,
	              { to: '/register' },
	              _react2.default.createElement(
	                _reactBootstrap.NavItem,
	                null,
	                'Register'
	              )
	            ) : ''
	          )
	        )
	      );
	    }
	  }]);

	  return Navigation;
	}(_react2.default.Component);

	var stateToProps = function stateToProps(state) {
	  return {
	    currentUser: state.account.currentUser
	  };
	};

	var dispatchToProps = function dispatchToProps(dispatch) {
	  return {
	    currentUserReceived: function currentUserReceived(profile) {
	      return dispatch(_actions2.default.currentUserReceived(profile));
	    },
	    profileCreated: function profileCreated(profile) {
	      return dispatch(_actions2.default.profileCreated(profile));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(stateToProps, dispatchToProps)(Navigation);

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("react-bootstrap");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("react-router-bootstrap");

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sidebar = function (_React$Component) {
	  _inherits(Sidebar, _React$Component);

	  function Sidebar() {
	    _classCallCheck(this, Sidebar);

	    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
	  }

	  _createClass(Sidebar, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "sidebar" },
	        "This is the sidebar"
	      );
	    }
	  }]);

	  return Sidebar;
	}(_react2.default.Component);

	exports.default = Sidebar;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(78);

	var _reduxThunk = __webpack_require__(79);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reducers = __webpack_require__(80);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store;

	exports.default = {

	  configureStore: function configureStore() {
	    // combine all reducers
	    var reducers = (0, _redux.combineReducers)({

	      account: _reducers.accountReducer,
	      hike: _reducers.hikeReducer

	    });

	    store = (0, _redux.createStore)(reducers, (0, _redux.applyMiddleware)(_reduxThunk2.default));

	    return store;
	  },

	  currentStore: function currentStore() {
	    return store;
	  }

	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hikeReducer = exports.accountReducer = undefined;

	var _accountReducer = __webpack_require__(81);

	var _accountReducer2 = _interopRequireDefault(_accountReducer);

	var _hikeReducer = __webpack_require__(82);

	var _hikeReducer2 = _interopRequireDefault(_hikeReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.accountReducer = _accountReducer2.default;
	exports.hikeReducer = _hikeReducer2.default;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(9);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
	  currentUser: null
	};

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  var updated = Object.assign({}, state);

	  switch (action.type) {
	    // assign 'currentUser' property when new user signs up
	    case _constants2.default.PROFILE_CREATED:
	      updated['currentUser'] = action.profile;
	      return updated;

	    case _constants2.default.CURRENT_USER_RECEIVED:
	      updated['currentUser'] = action.profile;
	      return updated;

	    default:
	      return state;
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(9);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
	  hikeLocation: null,
	  list: [],
	  selectedHike: null
	};

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  var updated = Object.assign({}, state);

	  switch (action.type) {

	    case _constants2.default.HIKES_RECEIVED:
	      // console.log('HIKES_RECEIVED ' + JSON.stringify(action.hikes))
	      // const params = action.params
	      // const keys = Object.keys(params)
	      // keys.forEach((key, i) => {
	      //   let value = params[key]
	      //   updated[value] = action.hikes
	      // })
	      // console.log('list was ' + updated)
	      updated['list'] = action.hikes;
	      // console.log('list is now' + JSON.stringify(updated))
	      return updated;

	    case _constants2.default.HIKE_SELECTED:
	      console.log('HIKE_SELECTED ' + JSON.stringify(action.hike));
	      updated['selectedHike'] = action.hike;
	      return updated;

	    case _constants2.default.LOCATION_ADDED:
	      // console.log('LOCATION_ADDED ' + JSON.stringify(action.location))
	      updated['hikeLocation'] = action.location;
	      return updated;

	    default:
	      return state;
	  }
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("client-sessions");

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(83);
	var router = express.Router();
	var bcrypt = __webpack_require__(93);

	var controllers = __webpack_require__(94);
	var utils = __webpack_require__(100);

	// Log user out, check if user is logged in
	router.get('/:action', function (req, res, next) {
	  var action = req.params.action;

	  if (action == 'logout') {
	    // log out
	    req.session.reset();
	    res.json({
	      confirmation: 'success'
	    });
	  }

	  if (action == 'currentuser') {
	    // check for a current user
	    if (req.session == null) {
	      res.json({
	        confirmation: 'success',
	        message: 'User not logged in.'
	      });
	      return;
	    }

	    if (req.session.token == null) {
	      res.json({
	        confirmation: 'success',
	        message: 'User not logged in.'
	      });
	      return;
	    }

	    var token = req.session.token;
	    utils.JWT.verify(token, process.env.TOKEN_SECRET).then(function (decode) {
	      return controllers.profile.findById(decode.id);
	    }).then(function (profile) {
	      res.json({
	        confirmation: 'success',
	        profile: profile
	      });
	    }).catch(function (err) {
	      res.json({
	        confirmation: 'fail',
	        message: 'Invalid Token'
	      });
	      return;
	    });
	  }
	});

	// Register and login new user
	router.post('/register', function (req, res, next) {
	  var credentials = req.body;

	  controllers.profile.create(credentials).then(function (profile) {
	    // create signed token
	    var token = utils.JWT.sign({ id: profile.id }, process.env.TOKEN_SECRET);
	    req.session.token = token;

	    res.json({
	      confirmation: 'success',
	      profile: profile,
	      token: token
	    });
	  }).catch(function (err) {
	    res.json({
	      confirmation: 'fail',
	      message: err.message || err
	    });
	  });
	});

	// Login returning user
	router.post('/login', function (req, res, next) {
	  var credentials = req.body;

	  controllers.profile.find({ username: credentials.username }, true).then(function (profiles) {
	    if (profiles.length == 0) {
	      res.json({
	        confirmation: 'fail',
	        message: 'Profile not found.'
	      });
	      return;
	    }

	    var profile = profiles[0];
	    var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password);
	    if (passwordCorrect == false) {
	      res.json({
	        confirmation: 'fail',
	        message: 'Incorrect Password.'
	      });
	      return;
	    }

	    // create signed token
	    var token = utils.JWT.sign({ id: profile._id }, process.env.TOKEN_SECRET);
	    req.session.token = token;

	    res.json({
	      confirmation: 'success',
	      profile: profile.summary(),
	      token: token
	    });
	  }).catch(function (err) {
	    res.json({
	      confirmation: 'fail',
	      message: err
	    });
	  });
	});
	module.exports = router;

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = require("bcryptjs");

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var HikeController = __webpack_require__(95);
	var ProfileController = __webpack_require__(97);

	module.exports = {

	  hike: HikeController,
	  profile: ProfileController

	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Hike = __webpack_require__(96);

	module.exports = {

	  // GET
	  find: function find(params, callback) {
	    Hike.find(params, function (err, hikes) {
	      if (err) {
	        callback(err, null);
	        return;
	      }
	      callback(null, hikes);
	    });
	  },

	  findById: function findById(id, callback) {
	    Hike.findById(id, function (err, hike) {
	      if (err) {
	        callback(err, null);
	        return;
	      }
	      callback(null, hike);
	    });
	  },

	  // POST
	  create: function create(params, callback) {
	    Hike.create(params, function (err, hike) {
	      if (err) {
	        callback(err, null);
	        return;
	      }
	      callback(null, hike);
	    });
	  },

	  // PUT
	  update: function update(id, params, callback) {
	    Hike.findByIdAndUpdate(id, params, { new: true }, function (err, hike) {
	      if (err) {
	        callback(err, null);
	        return;
	      }
	      callback(null, hike);
	    });
	  },

	  // DELETE
	  delete: function _delete(id, callback) {
	    Hike.findByIdAndRemove(id, function (err, zone) {
	      if (err) {
	        callback(err, null);
	        return;
	      }
	      callback(null, null);
	    });
	  }

	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(89);

	var HikeSchema = new mongoose.Schema({

	  name: {
	    type: String,
	    default: ''
	  },
	  position: {
	    type: Object,
	    default: {}
	  },
	  review: {
	    user: {
	      type: String,
	      default: ''
	    },
	    description: {
	      type: String,
	      default: ''
	    },
	    plants: {
	      type: String,
	      default: ''
	    },
	    fungi: {
	      type: String,
	      default: ''
	    },
	    animals: {
	      type: String,
	      default: ''
	    },
	    pictures: {
	      type: Array,
	      default: []
	    }
	  }

	});

	module.exports = mongoose.model('HikeSchema', HikeSchema);

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bcrypt = __webpack_require__(93);
	var Promise = __webpack_require__(98);

	var Profile = __webpack_require__(99);

	module.exports = {

		find: function find(params, isRaw) {
			return new Promise(function (resolve, reject) {
				Profile.find(params, function (err, profiles) {
					if (err) {
						reject(err);
						return;
					}

					if (isRaw) {
						resolve(profiles);
						return;
					}

					var summaries = [];
					profiles.forEach(function (profile) {
						summaries.push(profile.summary());
					});

					resolve(summaries);
				});
			});
		},

		findById: function findById(id) {
			return new Promise(function (resolve, reject) {
				Profile.findById(id, function (err, profile) {
					if (err) {
						reject(err);
						return;
					}

					resolve(profile.summary());
				});
			});
		},

		create: function create(params) {
			return new Promise(function (resolve, reject) {

				// hash password:
				var password = params.password;
				params['password'] = bcrypt.hashSync(password, 10);

				Profile.create(params, function (err, profile) {
					if (err) {
						reject(err);
						return;
					}

					resolve(profile.summary());
				});
			});
		}

	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(89);

	var ProfileSchema = new mongoose.Schema({
	  username: {
	    type: String,
	    trim: true,
	    default: ''
	  },
	  email: {
	    type: String,
	    trim: true,
	    lowercase: true,
	    default: ''
	  },
	  password: {
	    type: String,
	    default: ''
	  },
	  timestamp: {
	    type: Date,
	    default: Date.now
	  }
	});

	ProfileSchema.methods.summary = function () {
	  var summary = {
	    id: this._id.toString(),
	    username: this.username,
	    email: this.email,
	    timestamp: this.timestamp
	  };
	  return summary;
	};

	module.exports = mongoose.model('ProfileSchema', ProfileSchema);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var JWT = __webpack_require__(101);

	module.exports = {

	  JWT: JWT

	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var jwt = __webpack_require__(102);
	var Promise = __webpack_require__(98);

	module.exports = {

		sign: function sign(obj, secret) {
			return jwt.sign(obj, secret); // return token
		},

		verify: function verify(token, secret) {

			return new Promise(function (resolve, reject) {
				jwt.verify(token, secret, function (err, decode) {
					if (err) {
						reject(err);
						return;
					}

					resolve(decode);
				});
			});
		}

	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(83);
	var router = express.Router();
	var controllers = __webpack_require__(94);

	// GET all instances of a resource
	router.get('/:resource', function (req, res, next) {

	  var resource = req.params.resource;
	  var controller = controllers[resource];

	  if (controller == null) {
	    res.json({
	      confirmation: 'fail',
	      message: 'Invalid resource request: ' + resource
	    });
	    return;
	  }

	  controller.find(req.query, function (err, results) {
	    if (err) {
	      res.json({
	        confirmation: 'fail',
	        message: err
	      });
	      return;
	    }
	    res.json({
	      confirmation: 'success',
	      results: results
	    });
	  });
	});

	// GET a specific instance of a resource
	router.get('/:resource/:id', function (req, res, next) {

	  var resource = req.params.resource;
	  var id = req.params.id;
	  var controller = controllers[resource];

	  if (controller == null) {
	    res.json({
	      confirmation: 'fail',
	      message: 'Invalid resource request ' + resource
	    });
	    return;
	  }

	  controller.findById(id, function (err, result) {
	    if (err) {
	      res.json({
	        confirmation: 'fail',
	        message: 'Not found'
	      });
	      return;
	    }
	    res.json({
	      confirmation: 'success',
	      result: result
	    });
	  });
	});

	// POST a new instance of a resource
	router.post('/:resource', function (req, res, next) {

	  var resource = req.params.resource;
	  var controller = controllers[resource];

	  if (controller == null) {
	    res.json({
	      confirmation: 'fail',
	      message: 'Invalid resource request: ' + resource
	    });
	    return;
	  }

	  controller.create(req.body, function (err, result) {
	    if (err) {
	      res.json({
	        confirmation: 'fail',
	        message: 'post failed'
	      });
	      return;
	    }
	    res.json({
	      confirmation: 'success',
	      result: result
	    });
	  });
	});

	// PUT an existing resource
	router.put('/:resource/:id', function (req, res, next) {

	  var resource = req.params.resource;
	  var id = req.params.id;
	  var controller = controllers[resource];

	  if (controller == null) {
	    res.json({
	      confirmation: 'fail',
	      message: 'Invalid resource request: ' + resource
	    });
	    return;
	  }

	  controller.update(id, req.body, function (err, result) {
	    if (err) {
	      res.json({
	        confirmation: 'fail',
	        message: 'Update failed'
	      });
	      return;
	    }
	    res.json({
	      confirmation: 'success',
	      result: result
	    });
	  });
	});

	// DELETE an existing resource
	router.delete('/:resource/:id', function (req, res, next) {

	  var resource = req.params.resource;
	  var id = req.params.id;
	  var controller = controllers[resource];

	  if (controller == null) {
	    res.json({
	      confirmation: 'Fail',
	      message: 'Invalid resource request: ' + resource
	    });
	    return;
	  }

	  controller.delete(id, function (err, result) {
	    if (err) {
	      res.json({
	        confirmation: 'Fail',
	        message: 'Failed to delete'
	      });
	      return;
	    }
	    res.json({
	      confirmation: 'success',
	      result: result
	    });
	  });
	});

	module.exports = router;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(83);
	var router = express.Router();

	/* GET home page. */
	router.get('/', function (req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	// -------------------- TESTING -------------------------

	/* GET createhike page */
	router.get('/createhike', function (req, res, next) {
	  res.render('createhike', null);
	});

	module.exports = router;

/***/ }
/******/ ]);