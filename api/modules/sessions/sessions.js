var crypto = require('crypto');
var mongo = require('../mongo');

function genToken (callback) {
	crypto.randomBytes(16, function (err, buf) {
		if (err) return callback(err);

		var token = buf.toString('hex');

		return callback(null, token);
	});
};

function free (accountId, callback) {
	findByUserId(accountId, {}, function (err, session) {
		if (err) return callback(err);
		if (!session) return callback();

		mongo.db.collection('sessions', function (err, col) {
			if (err) return callback(err);

			var query = { _id: session._id };
			col.remove(query, callback);
		});	
	});
};

function findByUserId (accountId, fields, callback) {
	mongo.db.collection('sessions', function (err, col) {
		if (err) return next(err);

		col.findOne({ accountId: accountId }, fields, callback);
	});
};

function get (token, callback) {
	mongo.db.collection('sessions', function (err, col) {
		col.findOne({ token: token }, { _id: 0, accountId: 1 }, callback);
	});
};

function create (session, callback) {
	genToken(function (err, token) {
		if (err) return callback(err);

		session.token = token;

		free(session.accountId, function (err) {
			if (err) return callback(err);

			mongo.db.collection('sessions', function (err, col) {
				if (err) return next(err);

				console.info('sessions', "Creating %s| session %s", session, token);
				col.save(session, callback);
			});
		});
	});
};

module.exports = {
	create: create,
	get: get,
	findByUserId: findByUserId,
	free: free
};