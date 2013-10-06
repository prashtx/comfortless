'use strict';

var http = require('http');
var urlproc = require('url');

var request = require('request');

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var encodedUrl = urlproc.parse(req.url, true).query.url;
  if (!encodedUrl) {
    res.statusCode = 200;
    res.end();
    return;
  }
  var url = decodeURIComponent(encodedUrl);
  try {
    request.get(url).pipe(res);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
    return;
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Listening on ' + port);
});
