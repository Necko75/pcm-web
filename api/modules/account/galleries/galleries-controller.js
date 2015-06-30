var formidable = require('formidable');
var mongo = require('../../mongo');
var http = require('../../http');
var GalleriesService = require('./galleries-service');

module.exports.mount = function (server) {
	server.post('/api/account/galleries', function (req, res, next) {
	
		var form = new formidable.IncomingForm();

		form.parse(req, function (err, fields, files) {
			if (err) return next(err);
			
			GalleriesService.create(fields, files, function (err) {
				if (err) return next(err);

				res.send(200);
				return next();
			});
		});
	});
		// var form = new formidable.IncomingForm();

		// form.parse(req, function(err, fields, files) {
	
		// 	mongo.db.collection('galleries', function (err, col) {
		// 		if (err) return next(err);

		// 		fs.readFile(files.file.path, function (err, data) {
		// 			if (err) return next(err);

		// 			var bufferBase64 = new Buffer(data).toString('base64');

		// 			col.save({ filename: files.file.name, data: bufferBase64 }, function (err) {
		// 				if (err) return next(err);

		// 				col.findOne({ filename: 'face.jpg' }, function (err, file) {
		// 					if (err) return next(err);

		// 					var data = file.data;
		// 					res.writeHead(200, {'Content-Type': 'image/jpeg' });
		// 					res.end(data);
		// 					return next();
		// 				});
		// 			});
		// 		});
		// 	});
		// });
};