var mongo = require('../mongo');

module.exports.findUser = function (email, callback) {
	mongo.db.collection('users', function (err, colUsers) {
		if (err) return callback(err);

		var query = { email: email };

		colUsers.findOne(query, callback);
	});
};

module.exports.checkPassword = function (user, password, callback) {
	this.findUser(user.email, function (err, user) {
		if (err) return callback(err);
		if (password !== user.password) return callback(null, 'bad_password');

		return callback(null);
	});
};