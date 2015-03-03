var express = require('express'),
    formidable = require('formidable'),
    fs = require('fs'),
    cp = require('child_process');

var router = express.Router();

// function to execute script that processes data
var execScript = function (inFile, res) {
  console.log(inFile);

  cp.exec("./pathToScript/scriptName " + inFile,
    function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    res.render('jadeView');
  });
};

router.post('/upload', function (req, res) {
  console.log("uploading file");

  var form = new formidable.IncomingForm();
  form.uploadDir = "files";
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
    if (err) throw err;
    console.log(files.traceFile.path);

    fs.rename(files.traceFile.path, "files/trace.dat", function (err) {
      if (err) throw err;
      req.io.route('update');
    })
  });
});

module.exports = router;
