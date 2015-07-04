var mongo = require('../mongo');
var ObjectId = require('mongodb').ObjectID;

module.exports.getMediaFromGallery = function (galleryId, fileName, callback) {
	mongo.db.collection('galleries', function (err, col) {
		if (err) return callback(err);

		var query = { _id: new ObjectId(galleryId), uploads: { $elemMatch: { filename: fileName } } };

		col.findOne(query, { 'uploads.$': 1 }, function (err, result) {
			if (err) return callback(err);

			var bufferFile = result.uploads[0].bufferBase64;

			callback(null, bufferFile);
		});
	});
};