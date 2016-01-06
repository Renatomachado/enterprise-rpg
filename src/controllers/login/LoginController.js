var crypto = require('crypto');

module.exports = function(app) {
    "use strict";

    var User = app.models.User;

    class LoginController extends app.controllers.BaseController {

        login(req, res) {
            var userData = {
                login: req.body.username,
                password: crypto.createHash('sha1')
                                .update(req.body.password)
                                .digest('hex')
                                .toString()
            };


            console.log(userData);

            User.findOne(userData, function(err, user) {
                if (err) {
                    res.json(err);
                }

                if (!user) {
                    userData.username = req.body.username;
                    userData.level = 1;
                    userData.classe = 'Aprendiz';
                    userData.avatar = "http://lorempixel.com/100/100/people";
                    userData.exp = 0;

                    User.create(userData, function(err, user) {
                        if (err) { throw err }

                        res.json(user);
                    });
                }else{
                    res.json(user);
                }

            });
        }

    }

    return LoginController;

};