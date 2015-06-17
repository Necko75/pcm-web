var http = require('../http');
var AccountService = require('./account-service');

module.exports.mount = function (server) {
	server.post('/api/account/login', function (req, res, next) {
		if (!req.body || !req.body.user) {
			res.send(400, 'bad_param');
			return next();
		}

		var userBody = req.body.user;
		if (!userBody.email || !userBody.password) return res.send(400, 'bad_param');

		AccountService.findUser(userBody.email, function (err, user) {
			if (err || !user || !user.password) return next(err);
			if (user.password !== userBody.password) return next(err);

			res.send(200);
			return next();
		});
	});
};