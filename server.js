var async = require('async');
var http = require('./api/modules/http');
var mongo = require('./api/modules/mongo');
var log = require('./api/modules/log');

process.on('uncaughtException', function (err) {
	log.error('process', err);
});

mongo.connect(function (err) {
	if (err) throw err;

	var apiRequired = [
		'sessions/sessions.js'
	];

	apiRequired.forEach(function (module) {
		require('./api/modules/' + module);
	});

	var apiModules = [
		'accounts/accounts-controller',
		'account/account-controller',
		'account/galleries/galleries-controller',
		'medias/medias-controller.js',
		'crawl.js'
	];

	apiModules.forEach(function (module) {
		require('./api/modules/' + module).mount(http.server);
	});

	http.listen();
});