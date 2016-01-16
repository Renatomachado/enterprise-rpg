var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	
	var User = mongoose.Schema({
		username: {
			type: String,
			required: true,
			unique: true
		},
		login: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		avatar: {
			type: String
		},
		level: {
			type: Number
		},
		exp : {
			type : Number
		},
		classe: {
			type: String
		}

	});

	mongoose.plugin(findOrCreate);

	return mongoose.model('User', User);
};