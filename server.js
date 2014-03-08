'use strict';

var http = require('http');
var urlproc = require('url');

var request = require('request');

var stream = require('stream');
function dbgstream() {
  var dbg = new stream.Transform();
  dbg._transform = function (chunk, encoding, done) {
    process.stdout.write(chunk);
    dbg.push(chunk);
    done();
  };
  return dbg;
}

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accepts, Accept-Encoding, User-Agent');
  
  var encodedUrl = urlproc.parse(req.url, true).query.url;
  if (!encodedUrl) {
    res.statusCode = 200;
    res.end();
    return;
  }
  var url = decodeURIComponent(encodedUrl);
  function handleError(error) {
    console.log(error);
    res.statusCode = 500;
    res.end();
  }
  try {
    console.log('method=' + req.method + ' url=' + url);
    delete req.headers.host;
    var r = request({
      strictSSL: false,
      url: url,
      method: req.method,
      headers: req.headers
    });
    req.pipe(r);
    r.pipe(res).on('error', handleError);
    r.on('error', handleError);
  } catch (e) {
    handleError(e);
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Listening on ' + port);
});
