var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// the page displays the power consumption graph and alarms if anomalies detected
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Power Consumption Based Anomaly Detection' });

  // fs.exists('files/trace.dat', function (exists) {
  //   if (exists) req.io.route('updateWeb');
  // });
});

module.exports = router;
