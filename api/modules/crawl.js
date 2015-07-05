var http = require('./http');
var requestHttp = require('http');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var async = require('async');

module.exports.mount = function (server) {
	server.get('/api/crawl', function (req, res, next) {
		
		var url = "http://www.artmajeur.com/en/art-gallery/painting";

		requestHttp.get(url, function (page) {
			var data = "";

			page.on('data', function (chunck) {
				data += chunck;
			});

			page.on('end', function () {
				var $ = cheerio.load(data);
				var thumbsImg = [];

				$('.img-thumbnail img').each(function (index, element) {
					var src = $(this).attr('src');
					var spliting = src.split('/');
					var filename = spliting[spliting.length - 1];

					if (src.indexOf('/files/') > -1) {
						thumbsImg.push({
							path: 'http://artmajeur.com' + src,
							filename: filename
						});
					}
				});

				// streaming method //
				async.each(thumbsImg, function (thumb, callback) {
					var w = fs.createWriteStream('galleries-content/' + thumb.filename);

					request(thumb.path, { encoding: 'binary' }).pipe(w).on('finish', function () {
						callback();
					});
				}, function (err) {
					if (err) return next(err);

					res.send(200, thumbsImg);
					return next();
				});
			});
		});
	});
};