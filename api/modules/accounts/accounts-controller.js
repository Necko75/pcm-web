var http = require('../http');

module.exports.mount = function (server) {
	server.get('/api/users/login', function (req, res, next) {
		console.log('ici');
		return next();
	});
};