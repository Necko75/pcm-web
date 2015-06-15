var MongoClient = require('mongodb').MongoClient;

module.exports.connect = function (callback) {
	MongoClient.connect('mongodb://localhost:27017/seemypaints', function (err, db) {
		if (err) return callback(err);

		console.log("Connected correctly to server");
		return callback();
	});
};