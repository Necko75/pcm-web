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

module.exports.listen = function () {
	server.listen(8082, function () {
		console.info('http', server.name + " listening at "  + server.url);
	});
};