"use strict";
module.exports = function(app) {

  var HomeController = {

    index: function(req, res) {
      return res.json({
        message: 'Enterprise RPG funfando!'
      });
    }
  };

  return HomeController;

};