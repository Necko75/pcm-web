var server = require('http');

module.exports.accounts = function (callback) {

	// ne marche, pourtant l'url est correcte, comme çi node ne rentrait jamais ici //
	server.get('/api/users/login', function (req, res, next) {
		console.log('ici');
	});
	// server.post('/users/login', function (req, res, next) {
	// 	console.log('ici');
	// });
};