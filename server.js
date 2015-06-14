var async = require('async');
var http = require('./api/modules/http');

process.on('uncaughtException', function (err) {
	console.error('process', err);
});

[
	'accounts/accounts-controller',
	'account/account-controller'
].forEach(function (module) {
	require('./api/modules/' + module).mount(http.server);
});

http.listen();