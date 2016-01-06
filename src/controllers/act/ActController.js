"use strict";
var _ = require('lodash');
var async = require('async');


module.exports = function (app) {

	var Act = app.models.Act;
	var User = app.models.User;

	class ActController extends app.controllers.BaseController {

		index(req, res) {

			Act.find({}, function(err, acts) {
				if (err) { throw err };

				res.json(acts);
			});
		}

		store(req, res) {

			console.log(req.body);

			var act = new Act();
			act.username = req.body.username;
			act.createdBy = req.body.userGrade;
			act.type = req.body.type;
			act.evaluations = [];
			act.act = req.body.act;
			act.state = 'open';
			act.isAnonymous = req.body.anonymous;

			act.save(function(err) {
				if (err) { throw err }

				res.json({
					message: 'Success!'
				});

			});

		}

		evaluate(req, res) {

			var addExp = function(act) {

				var user = {},
					evaluations = act.evaluations;

				var actPoints = 0,
					actLimit = 0;
				async.forEach(evaluations, function(ev, callback){
					var usergrade = {};
					usergrade.username = ev.userGrade;

					User.findOne(usergrade, function(err, gradeUser){

						actPoints += gradeUser.level * ev.gradeNum;
						actLimit += gradeUser.level * 4;

						callback();

					});
				}, function(){

					console.log(actPoints);

					var percent = actPoints / actLimit;

					console.log('percent', percent);

					user.username = act.username;
					User.findOne(user, function(err, us){


						console.log(us);

						var needexp = us.level * 1000,
							cardxp = (percent) * (needexp / 2);

						console.log('card', cardxp);

						if(act.type == 1){
							us.exp += cardxp;

							if(us.exp >= needexp){
								us.level += 1;

								if( us.level <= 10)
									us.classe = 'Aprendiz';
								if( us.level > 10 &&  us.level <= 20)
									us.classe = 'Adepto';
								if( us.level > 20 &&  us.level <= 30)
									us.classe = 'Aventureiro';
								if( us.level > 30 &&  us.level <= 40)
									us.classe = 'Mestre';
								if( us.level > 40 && us.level <= 50)
									us.classe = 'Jedi';
								if( us.level > 50){
									us.level = 50;
								}
							}
						}else{
							us.exp -= cardxp;

							if(us.exp < 0){
								us.exp = 0;
							}
						}

						us.save(function(err , leUser){

							res.json({
								message: 'Act fechado!',
								obj: leUser
							});

						});

					});
				});
			};


			var obj = {
				_id: req.params.id
			};

			Act.findOne(obj, function(err, act) {
				if (err) {
					res.json(err);
				} else {

					var matches = _.findWhere(act.evaluations, { userGrade: req.body.userGrade });

					if (matches) {
						res.json({
							message: 'não você já avaliou!'
						});
					} else {
						act.evaluations = req.body.evaluations;
						
						User.count({}, function(err, c) {
							var continha = c - 1;
							if (act.evaluations.length === continha) {
								act.state = 'closed';
							}

							act.save(function(err, suc) {
								if (err) {
									res.json(err);
								}else {
									if (act.state === 'closed') {

										addExp(act, res);


									} else {
										res.json({ obj: suc });
									}
								}
							});
						});
					}

				}
			});

		}

		addGrade(req, res) {

		}

	}

	return ActController;
};

