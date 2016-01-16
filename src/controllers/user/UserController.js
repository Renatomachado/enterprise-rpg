"use strict";
var crypto = require('crypto');

module.exports = function (app) {

	var User = app.models.User;

	var UserController = {

		index: function(req, res) {

			User.find({}).exec().then(function(users) {
				res.json(users);
			}).catch(function(err){
				res.status(500);
				res.json(err);
			})
		},

		store: function(req, res) {

			var user = new User();
			user.username = req.body.username;
			user.login = req.body.login;
			user.password = crypto.createHash('sha1').update(req.body.password).digest('hex').toString();
			user.avatar = req.body.avatar;
			user.level = 1;
			user.classe = "Aprendiz";
			user.exp = 0;

			user.save.then(function() {
				res.json({
					message: 'Success!'
				});
			}).catch(function(err){
				res.status(500);
				res.json(err);
			});
		}

	};

	return UserController;
};