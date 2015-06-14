var async = require('async');

process.on('uncaughtException', function (err) {
	log.error('process', err);
});

// var mongo = require('./modules/mongo');
var http = require('./modules/http');

async.each(
	[
		'accounts/accounts'
	],
	function (module, callback) {
		require('./modules/' + module)(callback);
	},
	function (err) {
		if (err) return next(err);

		http.listen();
	}
);