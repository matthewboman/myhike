var AccountController = require('./AccountController');
var HikeController = require('./HikeController');
var ProfileController = require('./ProfileController');
var ReviewController = require('./ReviewController');

/*
Not currently implemented b/c it causes problems with the controller
*/

module.exports = {

  account: AccountController,
  hike: HikeController,
  profile: ProfileController,
  review: ReviewController,

}
