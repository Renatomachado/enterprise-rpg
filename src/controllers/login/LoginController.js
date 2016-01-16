"use strict";
var crypto = require('crypto');

module.exports = function(app) {

    var User = app.models.User,
        LoginController = {

        login: function(req, res) {
            var userData = {
                login: req.body.username,
                //TODO: Validate password
                password: req.body.password ? crypto.createHash('sha1')
                                                    .update(req.body.password)
                                                    .digest('hex')
                                                    .toString() : undefined
            };

            User.findOne({login : userData.login}).select('+password').exec().then(function(user) {
                console.log(user);
                console.log(userData);

                if(user && user.password === userData.password){
                    res.json(user);
                }else if(user && user.password !== userData.password) {
                    res.status(400);
                    res.json({
                        message : "invalid password"
                    });
                }else{
                    userData.username = req.body.username;
                    userData.level = 1;
                    userData.classe = 'Aprendiz';
                    userData.avatar = "http://lorempixel.com/100/100/people";
                    userData.exp = 0;

                    User.create(userData).then(function (user) {
                        res.json(user);
                    }).catch(function(err){
                        res.status(500);
                        res.json(err);
                    })
                }
            }).catch(function(err){
                res.status(500);
                res.json(err);
            });
        }

    };

    return LoginController;

};