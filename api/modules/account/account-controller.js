var http = require('../http');
var AccountService = require('./account-service');

module.exports.mount = function (server) {
	server.post('/api/account/login', function (req, res, next) {
		if (!req.body || !req.body.user) return next(http.fail(400, 'bad_parma'));

		var userBody = req.body.user;
		if (!userBody.email || !userBody.password) return next(http.fail(400, 'bad_param'));

		AccountService.findUser(userBody.email, function (err, user) {
			if (err) return next(err);
			if (!user) return next(http.fail(400, 'user_missing'));
			if (user.password !== userBody.password) return next(http.fail(400, 'bad_password'));

			res.send(200);
			return next();
		});
	});
};