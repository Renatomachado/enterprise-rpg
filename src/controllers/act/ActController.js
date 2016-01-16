"use strict";
var _ = require('lodash'),
	async = require('async');

module.exports = function (app) {

	var Act = app.models.Act,
		User = app.models.User,
		ActController = {

		index: function(req, res) {

			Act.find({}).then(function(acts) {
				res.json(acts);
			}).catch(function(err){
				res.status(500);
				res.json(err);
			});
		},

		store: function(req, res) {

			console.log(req.body);

			var act = new Act();
			act.username = req.body.username;
			act.createdBy = req.body.userGrade;
			act.type = req.body.type;
			act.evaluations = [];
			act.act = req.body.act;
			act.state = 'open';
			act.isAnonymous = req.body.anonymous;

			act.save().then(function() {
				res.json({
					message: 'Success!'
				});
			}).catch(function(err){
				res.status(500);
				res.json(err);
			});

		},

		evaluate: function(req, res) {
			var _this = this,
 				obj = {
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

										_this.addExp(act, res);


									} else {
										res.json({ obj: suc });
									}
								}
							});
						});
					}
				}
			});
		},

		addExp: function(act) {
			var user = {},
					evaluations = act.evaluations,
					actPoints = 0,
					actLimit = 0;

			async.forEach(evaluations, function(ev, callback){
				var userGrade = {};
				userGrade.username = ev.userGrade;

				User.findOne(userGrade).exec().then(function(gradeUser){

					actPoints += gradeUser.level * ev.gradeNum;
					actLimit += gradeUser.level * 4;

					callback();
				});
			}).then(function(){
				var percent = actPoints / actLimit;

				user.username = act.username;

				User.findOne(user).exec().then(function(us){
					var needExp = us.level * 1000,
						cardExp = (percent) * (needExp / 2);

					if(act.type == 1){
						us.exp += cardExp;

						if(us.exp >= needExp){
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
						us.exp -= cardExp;
						if(us.exp < 0){
							us.exp = 0;
						}
					}
					us.save().then(function(leUser){
						res.json({
							message: 'Act fechado!',
							obj: leUser
						});

					}).catch(function(err){
						res.status(500);
						res.json(err);
					});

				}).catch(function(err){
					res.status(500);
					res.json(err);
				});
			}).catch(function(err){
				res.status(500);
				res.json(err);
			});
		}
	};

	return ActController;
};

