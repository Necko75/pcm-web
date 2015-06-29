var formidable = require('formidable');
var fs = require('fs');
var mongo = require('../../mongo');
var Grid = require('gridfs-stream');
Grid.mongo = require('mongodb');

module.exports.mount = function (server) {
	server.post('/api/account/galleries/create', function (req, res, next) {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			if (err) return next(err);

			var gfs = Grid(mongo.db);

			/* on écrit le fichier dans mongodb */
			var writestream = gfs.createWriteStream({
				filename: files.file.name
			});

			fs.createReadStream(files.file.path).pipe(writestream);

			writestream.on('close', function (file) {
				console.log(file.filename + 'Written To DB');
			});

			/* on lit le fichier */
			// var readstream = gfs.createReadStream({ filename: 'colorida3.jpg' });
			// readstream.pipe(res);

			/* lire les meta data */
			// gfs.files.findOne({ filename: 'face.jpg' }, function (err, file) {
			// 	if (err) return next(err);

			// 	return next();
			// });

		});
	});	
};