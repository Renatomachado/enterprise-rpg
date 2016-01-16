var mongoose = require('mongoose'),
	bluebird = require('bluebird');

module.exports = function (uri) {
	mongoose.Promise = bluebird ;

  	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Connected on ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! disconnected ' + uri);
	});

	mongoose.connection.on('error', function(erro) {
		console.log('Mongoose! Connection error: ' + erro);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose! Disconnected by application end');
			process.exit(0);
		});
	});
};