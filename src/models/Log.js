var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	
	var Log = mongoose.Schema({
		user_ip: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			required: true
		},
		local: {
			type: String,
			required: true
		}
	});

	mongoose.plugin(findOrCreate);

	return mongoose.model('Log', Log);
};