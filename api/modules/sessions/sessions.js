var crypto = require('crypto');
// var timecop = require('timecop');
var mongo = require('../mongo');

function genToken(callback) {
	crypto.randomBytes(16, function (err, buf) {
		if (err) return callback(err);

		var token = buf.toString('hex');

		return callback(null, token);
	});
};

module.exports = {
	create: function (session, callback) {
		genToken(function (err, token) {
			if (err) return callback(err);

			session.token = token;
			console.info('sessions', "Creating %s| session %s", session, token);

			mongo.db.collection('sessions', function (err, col) {
				if (err) return next(err);

				col.save(session, callback);
			});
		});
	}
};