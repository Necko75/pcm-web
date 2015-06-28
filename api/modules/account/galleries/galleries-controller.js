var formidable = require('formidable'),
util = require('util');

module.exports.mount = function (server) {
	server.post('/api/account/galleries/create', function (req, res, next) {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			if (err) return next(err);

			res.send(200, util.inspect({ fields: fields, files: files }));
			return next();
		});
	});	
};