var http = require('../http');
var AccountService = require('./account-service');
var Sessions = require('../sessions/sessions.js');

module.exports.mount = function (server) {
	server.post('/api/account/login', function (req, res, next) {
		if (!req.body || !req.body.user) return next(http.fail(400, 'bad_param'));

		var userBody = req.body.user;
		if (!userBody.email || !userBody.password) return next(http.fail(400, 'bad_param'));

		AccountService.findUserByEmail(userBody.email, function (err, user) {
			if (err) return next(err);
			if (!user) return next(http.fail(400, 'no_registred'));
			if (user.password !== userBody.password) return next(http.fail(400, 'bad_password'));

			var session = {
				accountId: user._id
			};
			
			Sessions.create(session, function (err) {
				if (err) return next(err);
				if (!session || !session.token) return next(http.fail(400, 'bad_token'));

				res.send(200, session.token);
				return next();
			});
		});
	});
};