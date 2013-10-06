'use strict';

var http = require('http');
var urlproc = require('url');

var request = require('request');

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var url = decodeURIComponent(urlproc.parse(req.url, true).query.url);
  request.get(url).pipe(res);
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Listening on ' + port);
});
