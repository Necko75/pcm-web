// var mongodb = require('mongodb');
// var server = new mongodb.Server(conf.server.host, conf.server.port, conf.server.options);
// var db = new mongodb.Db(conf.db.name, server, conf.db.options);
// var objectId = mongodb.ObjectID;

// 	db.open(function (err, db) {
// 		if (err) throw err;

// 		db.addListener('err', function (err) {
// 			app.err('Mongo Error', err);
// 		});

// 		app.info('Connected to Mongo');

// 		return done(null, { server: server, db: db, objectId: objectId });
// 	});

// };