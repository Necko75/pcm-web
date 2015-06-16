var http = require('../http');
var AccountService = require('./account-service');

module.exports.mount = function (server) {
	server.post('/api/account/login', function (req, res, next) {
		if (!req.body) return res.send(400, 'bad_param');

		AccountService.findUser(req.body.user.email, function (err, user) {
			if (err) return next(err);

			AccountService.checkPassword(user, req.body.user.password, function (err, back) {
				if (err) return next(err);
				if (back == "bad_password") {
					res.send(401, back);
					return next();
				}
				else {
					res.send(200);
					return next();
				}
			});
		});
	});
};