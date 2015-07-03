var mongo = require('../../mongo');
var fs = require('fs');
var async = require('async');

module.exports.create = function (fields, files, session, callback) {
	mongo.db.collection('galleries', function (err, col) {
		if (err) return callback(err);

		var uploads = [];

		async.each(files.file, function (file, next) {
			fs.readFile(file.path, function (err, data) {
				if (err) next(err);

				uploads.push({
					bufferBase64: new Buffer(data).toString('base64'),
					filename: file.name
				});

				next();
			});
		}, function (err) {
			if (err) return callback();

			var query = { name: fields.galleryName, accountId: session.accountId, uploads: uploads };

			col.save(query, callback);
		});
	});
};

module.exports.get = function (accountId, fields, callback) {
	mongo.db.collection('galleries', function (err, col) {
		if (err) return callback(err);

		var query = { accountId: accountId };
		
		col.find(query, fields, function (err, cursor) {
			if (err) return callback(err);
			if (!cursor) return callback(null, []);

			cursor.toArray(callback);
		});
	});
};