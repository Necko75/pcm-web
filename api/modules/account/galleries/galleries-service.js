var mongo = require('../../mongo');
var fs = require('fs');

module.exports.create = function (fields, files, callback) {
	mongo.db.collection('galleries', function (err, col) {
		if (err) return callback(err);

		fs.readFile(files.file.path, function (err, data) {
			if (err) return next(err);

			var bufferBase64 = new Buffer(data).toString('base64');
			var query = {
				galleryName: fields.galleryName,
				filename: files.file.name,
				data: bufferBase64
			};
			col.save(query, callback);
		});
	});
};