var async = require('async');

process.on('uncaughtException', function (err) {
	console.error('process', err);
});

// var mongo = require('./modules/mongo');
var http = require('./api/modules/http');

async.each(
	[
		'accounts/accounts-controller'
	],
	function (module, callback) {
		require('./api/modules/' + module);
		callback();
	},
	function (err) {
		if (err) return next(err);
				
		http.listen();
	}
);