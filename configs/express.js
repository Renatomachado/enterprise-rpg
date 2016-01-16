var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')
    morgan = require('morgan'),
    _ = require('lodash'),
    CryptoHelper = require('../src/Helpers/CryptoHelper')();

module.exports = function() {

    var crypt = CryptoHelper.getInstance(),
        app = express(),
        APP_PORT = process.env.PORT || 8080;

    app.set('port', APP_PORT);

    //middlewares
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(cookieParser());

    app.use(morgan('dev'));

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
        next();
    });

    load('models', { cwd: 'src' })
        .then('helpers')
        .then('middlewares')
        .then('controllers')
        .then('routes')
        .into(app);

    app.use(express.static('site'));

    //serve the website
    app.route('*', function (req, res) {
        res.sendFile('index.html');
    });

    app.use(function(req, res){
        res.redirect('/');
    });

    return app;
};