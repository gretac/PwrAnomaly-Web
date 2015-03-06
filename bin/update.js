var fs = require('fs'),
    http = require('http'),
    debug = require('debug')('http');

// var HOST = "power.gretacutulenco.com";
var HOST = "localhost";
var PORT = "3002";
var ENDPOINT = "/api/upload";

var uploadTrace = function (traceLoc, alarm) {
  var req = http.request({
    host: HOST,
    port: PORT,
    path: ENDPOINT,
    method: 'POST'
  }, function (res) {
    // NOTE: if a response event handler exists, then the data from the response MUST
    // be consumed, either by calling the response.read() for a readable event,
    // by adding a data handler, or by calling .resume() method.
    // UNTIL the data is consumed, the end event will not fire.
    // Also, UNTIL the data is read it will consume memory that can eventually
    // lead to a 'process out of memory' error

    console.log("done request");
    // res.read();
    res.resume();
    req.end();
  }).on('error', function (e) {
    console.log(e.message);
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  var boundaryKey = Math.random().toString(16); // random string
  req.setHeader('Content-Type', 'multipart/form-data; boundary="' + boundaryKey + '"');

  req.write(
    '--' + boundaryKey + '\r\n'
    + 'Content-Disposition: form-data; name="alarm" \r\n\r\n'
    + alarm + '\r\n'
  );

  debug(req.body);

  req.write(
    '--' + boundaryKey + '\r\n'
    + 'Content-Disposition: form-data; name="traceFile"; filename="' + traceLoc + '"\r\n'
    + 'Content-Transfer-Encoding: binary\r\n\r\n'
  );

  fs.createReadStream(traceLoc, { bufferSize: 4 * 1024 })
    // set "end" to false in the options so .end() isnt called on the request
    .on('end', function() {
      // mark the end of the one and only part
      req.end('\r\n--' + boundaryKey + '--');
    })
    .pipe(req, { end: false });

  console.log("request set up");
  // console.log(req.body);
  debug(req.body);
};

if (process.argv.length > 2) {
  var ordered_args = [];

  process.argv.forEach(function (arg, index) {
    if (index <= 1) return;

    if (arg === "-h") {
      console.log('Default Usage: node update.js filePath alarmValue');
    } else {
      ordered_args.push(arg);
    }
  });

  console.log('arguments:');
  console.log(ordered_args);

  var filePath = ordered_args[0];
  var alarm = ordered_args[1];

  uploadTrace(filePath, alarm);
}










