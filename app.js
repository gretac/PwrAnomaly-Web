// Main server application module

var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var routes = require('./routes/index');
var api = require('./routes/api');

var utils = require('./utils');

var app = express();
app.http().io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

app.io.route('update', function (req) {
  console.log('broadcasting update to clients');

  fs.readFile('files/trace.dat', function (err, fileContent) {
    if (err) throw err;

    fileContent = String(fileContent).split("\n");
    fileContent.forEach(function (elem, index) {
      fileContent[index] = parseInt(elem);
    });

    req.io.broadcast('powerData', { data: fileContent });
//    req.io.respond({ 'status': 'done' });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// module.exports = app;
var port = utils.normalizePort(process.env.PORT || '3002');
app.set('port', port);

app.listen(port);
app.on('error', utils.onError);
app.on('listening', utils.onListening);


