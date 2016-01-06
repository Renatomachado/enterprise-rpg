var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	
	var Act = mongoose.Schema({
		username: {
			type: String,
			required: true
		},

		createdBy: {
			type: String,
			required: true
		},

		type: {
			type: String,
			required: true
		},

		act: {
			type: String,
			required : true
		},
		
		state: {
			type: String
		},

		isAnonymous: {
			type: Boolean,
			required: true
		},

		evaluations: [{
			userGrade: {
				type: String
			},
			gradeNum: {
				type: Number
			},
			anonymous: {
				type: String
			}
		}]
	});

	mongoose.plugin(findOrCreate);

	return mongoose.model('Act', Act);
};