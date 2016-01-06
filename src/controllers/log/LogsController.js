"use strict";

module.exports = function (app) {

	var Log = app.models.Log;

	class LogController extends app.controllers.BaseController {

		constructor() {
			super();
		}

		index(req, res) {
			Log.find({}, function(err, logs) {
				if (err) { throw err };
				res.json(logs);
			});
		}

		create(req, res) {
			var log = new Log();

			log.user_ip = req.body.user_ip;
			log.date = req.body.date;
			log.local = req.body.local;

			log.save(function(err) {
				if (err) { 
					res.json({ error: err });
				} else {
					res.json({
						status: 'success',
						obj: log
					});	
				}
			});
		}

	}

	return LogController;
};