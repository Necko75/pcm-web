var formidable = require('formidable');
var fs = require('fs');
var mongo = require('../../mongo');
// var Grid = require('gridfs-stream');
// Grid.mongo = require('mongodb');

module.exports.mount = function (server) {
	server.post('/api/account/galleries/create', function (req, res, next) {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			if (err) return next(err);

			mongo.db.collection('galleries', function (err, col) {
				if (err) return next(err);

				fs.readFile(files.file.path, function (err, data) {
					if (err) return next(err);

					var bufferBase64 = new Buffer(data).toString('base64');

					col.save({ filename: files.file.name, data: bufferBase64 }, function (err) {
						if (err) return next(err);

						col.findOne({ filename: 'face.jpg' }, function (err, file) {
							if (err) return next(err);

							var data = file.data;
							res.writeHead(200, {'Content-Type': 'image/jpeg' });
							res.end(data);
							return next();
						});
					});
				});
			});
		});
	});
};

/****** SOLUTION AVEC GRIDFS *******/
// var gfs = Grid(mongo.db);

	// /* on écrit le fichier dans mongodb */
	// var writestream = gfs.createWriteStream({
	// 	filename: files.file.name
	// });

	// fs.createReadStream(files.file.path).pipe(writestream);

	// writestream.on('close', function (file) {
	// 	console.log(file.filename + 'Written To DB');
	// });

	/* on lit le fichier */
	// var readstream = gfs.createReadStream({ filename: 'colorida3.jpg' });
	// readstream.pipe(res);

	/* lire les meta data */
	// gfs.files.findOne({ filename: 'face.jpg' }, function (err, file) {
	// 	if (err) return next(err);

	// 	return next();
	// });
/****** END SOLUTION AVEC GRIDFS *******/