
module.exports = function(app) {
  "use strict";

  class HomeController extends app.controllers.BaseController {

    index(req, res) {
      return res.json({
        message: 'Enterprise RPG funfando!'
      });
    }

  }

  return HomeController;

};