var restify = require('restify');
var server = module.exports.server = restify.createServer({
	name: 'locahost'
});

server.on('uncaughtException', function (req, res, route, err) {
	// log.error('http', err);
	console.error('http', err);
});

server.use(function (req, res, next) {
	console.log('http', req.method, req.url);
	return next();
});

server.use(restify.jsonBodyParser({ mapParams: false }));
server.use(restify.queryParser({ mapParams: false }));

module.exports.fail = function (status, code, message) {
	return new restify.RestError({
		statusCode: status,
		body: {
			error: {
				code: code,
				message: message
			}
		}
	});
};

module.exports.noCache = function (req, res, next) {
	res.setHeader('Cache-Control','no-cache, no-store, must-revalidate');
	res.setHeader('Expires','0');

	return next();
};

module.exports.requireSecuredAccess = function (req, res, next) {
	if (req.headers.host.indexOf('localhost') === -1) return next(module.exports.fail(401, 'unauthorized-host'));

	return next();
};

module.exports.maxAge = function (res, maxAge) {
	res.setHeader('Cache-Control', 'max-age=' + maxAge + ', private, must-revalidate');
};

module.exports.listen = function () {
	server.listen(8082, function () {
		console.info('http', server.name + " listening at "  + server.url);
	});
};