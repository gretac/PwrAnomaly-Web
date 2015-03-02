var express = require('express');
var router = express.Router();

/* GET home page. */
// the page displays the power consumption graph and alarms if anomalies detected
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Power Consumption Based Anomaly Detection' });
});

module.exports = router;
