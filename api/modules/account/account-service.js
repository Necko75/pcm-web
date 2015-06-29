var mongo = require('../mongo');

module.exports.findUserByEmail = function (email, callback) {
	mongo.db.collection('accounts', function (err, colUsers) {
		if (err) return callback(err);

		var query = { email: email };

		colUsers.findOne(query, callback);
	});
};