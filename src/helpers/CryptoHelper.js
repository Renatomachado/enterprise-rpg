var crypto = require('crypto');

module.exports = function () {

	var CryptoHelper = (function () {

		var confs = {
			algorithm: 'aes-256-ctr',
    		password: 'm12hr92dehwijd0qsdj91hd92ud972edh9qid9qjo'
		};

		var instance = undefined;

		function CryptoHelper() {
			var self = this;

			self.encrypt = function (text) {
				var cipher = crypto.createCipher(confs.algorithm, confs.password);
				var crypted = cipher.update(text,'utf8','hex');
				crypted += cipher.final('hex');
				return crypted;
			};

			self.decrypt = function (text) {
				var decipher = crypto.createDecipher(confs.algorithm, confs.password);
				var dec = decipher.update(text,'hex','utf8');
				dec += decipher.final('utf8');
				return dec;
			};
		};

		return {
			getInstance: function () {
				return instance || (instance = new CryptoHelper());
			}
		};
	}());


	return CryptoHelper;
};