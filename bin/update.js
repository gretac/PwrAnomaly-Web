var fs = require('fs'),
    http = require('http');

var HOST = "localhost";
var PORT = "3002";
var ENDPOINT = "/api/upload";

var uploadTrace = function (traceLoc) {
  var req = http.request({
    host: HOST,
    port: PORT,
    path: ENDPOINT,
    method: 'POST'
  }, function (res) {
    console.log("done request");
    req.end();
  }).on('error', function (e) {
    console.log(e.message);
  });

  var boundaryKey = Math.random().toString(16); // random string
  req.setHeader('Content-Type', 'multipart/form-data; boundary="' + boundaryKey + '"');

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
  console.log(req.body);
};

if (process.argv.length > 2) {
  var ordered_args = [];

  process.argv.forEach(function (arg, index) {
    if (index <= 1) return;

    if (arg === "-h") {
      console.log('Default Usage: node update.js filePath');
    } else {
      ordered_args.push(arg);
    }

    console.log(arg);
    var filePath = arg;
    console.log(filePath);
    uploadTrace(filePath);
  });
}










