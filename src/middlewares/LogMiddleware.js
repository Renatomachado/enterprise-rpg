"use strict";

module.exports = function(app) {

  var Log = app.models.Log;

  var LogMiddleware = {

    before: function(req, res, next) {
      var log = new Log();
      log.local = req.originalUrl;
      log.user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      log.date = Date.now();

      log.save(function(err) {
        if (err) { throw err };
        console.log('Caiu no Log: ' + log.local + ' user_ip: ' + log.user_ip + ' date: '+ log.date);
      });

      next();
    },

    after: function(req, res, next) {

    }

  };

  return LogMiddleware;

};