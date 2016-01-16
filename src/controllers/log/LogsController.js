"use strict";
module.exports = function (app) {
	var Log = app.models.Log;

	var LogController = {

		index: function(req, res) {
			Log.find({}).then(function(logs) {
				res.json(logs);
			}).catch(function(err){
				res.status(500);
				res.json(err);
			});
		},

		create: function(req, res) {
			var log = new Log();

			log.user_ip = req.body.user_ip;
			log.date = req.body.date;
			log.local = req.body.local;

			log.save.then(function() {
				res.json({
					status: 'success',
					obj: log
				});
			}).catch(function(err){
				res.status(500);
				res.json(err);
			});
		}

	};
	return LogController;
};