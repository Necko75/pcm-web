var async = require('async');
var http = require('./api/modules/http');
var mongo = require('./api/modules/mongo');

process.on('uncaughtException', function (err) {
	console.error('process', err);
});

mongo.connect(function (err) {
	if (err) throw err;

	var apiModules = [
		'accounts/accounts-controller',
		'account/account-controller'
	];

	apiModules.forEach(function (module) {
		require('./api/modules/' + module).mount(http.server);
	});

	http.listen();
});