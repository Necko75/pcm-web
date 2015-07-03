var formidable = require('formidable');
var mongo = require('../../mongo');
var http = require('../../http');
var GalleriesService = require('./galleries-service');

module.exports.mount = function (server) {
	server.post('/api/account/galleries',
		http.requireSession,
		function (req, res, next) {

			var form = new formidable.IncomingForm();
			form.multiples = true;

			form.parse(req, function (err, fields, files) {
				if (err) return next(err);
				
				GalleriesService.create(fields, files, req.session, function (err) {
					if (err) return next(err);

					res.send(200);
					return next();
				});
			});
		}
	);

	server.get('/api/account/galleries', 
		http.requireSession,
		function (req, res, next) {
			var fields = { _id: 1, name: 1 };

			GalleriesService.get(req.session.accountId, fields, function (err, galleries) {
				if (err) return next(err);

				res.send(200, galleries || []);
				return next();
			});
		}
	);
};