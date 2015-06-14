var http = require('../http');

module.exports.mount = function (server) {

	server.post('/api/account/login', function (req, res, next) {
		console.log('ici');
		return next();
	});
};