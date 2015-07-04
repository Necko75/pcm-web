var http = require('../http');
var MediasService = require('./medias-service');

module.exports.mount = function (server) {
	server.get('/api/medias/galleries/:galleryId/:fileName', function (req, res, next) {
		var galleryId = req.params.galleryId;
		var filename = req.params.fileName;

		MediasService.getMediaFromGallery(galleryId, filename, function (err, data) {
			if (err) return next(err);

			res.writeHead(200, {'Content-Type': 'image/jpg' });
			res.end(new Buffer(data, 'base64').toString('binary'), 'binary');
			
			return next();
		});
	});
};