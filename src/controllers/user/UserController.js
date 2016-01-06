"use strict";

var crypto = require('crypto');

module.exports = function (app) {

	var User = app.models.User;

	class UserController extends app.controllers.BaseController {

		index(req, res) {

			User.find({}, function(err, users) {
				if (err) { throw err };

				res.json(users);
			});
		}

		store(req, res) {

			var user = new User();
			user.username = req.body.username;
			user.login = req.body.login;
			user.password = crypto.createHash('sha1').update(req.body.password).digest('hex').toString();
			user.avatar = req.body.avatar;
			user.level = 1;
			user.classe = "Aprendiz";
			user.exp = 0;

			user.save(function(err) {
				console.log(err);
				if (err) { throw err }
				res.json({
					message: 'Success!'
				});
			});
		}

	}

	return UserController;
};