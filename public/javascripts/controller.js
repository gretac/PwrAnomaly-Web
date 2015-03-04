io = io.connect()
google.load('visualization', '1.1', {packages: ['line']});
var chart;

window.onload = function () {
  chart = new google.charts.Line(document.getElementById('power_chart'));
};

function refreshView (data) {
  // display updated data in the view

  var doubleMax = 200, targetMax = 100;
  var actMin = Math.min.apply(null, data),
      actMax = Math.max.apply(null, data) - actMin;

  // scale the data
  var scaledData = [], timeStep = 20.83, curTime = 0;
  data.forEach(function (elem, index) {
    scaledData.push([curTime / 1000, (elem - actMin) / actMax * doubleMax - targetMax]);
    curTime+= timeStep;
  });

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Time (s)');
  data.addColumn('number', 'Power (%)');
  data.addRows(scaledData);

  var options = { width: 1100, height: 500 };

  chart.draw(data, options);
}

io.on("powerData", function (powerData) {
  refreshView(powerData.data);
});

io.on('alarm', function (alarmData) {
  if (alarmData.alarm) {
    document.getElementById("alarm-g").style.display = 'none';
    document.getElementById("alarm-b").style.display = 'block';
    document.getElementById("alarm-b").innerHTML = "Anomalies Detected: " + alarmData.alarmMessage;
  } else {
    document.getElementById("alarm-g").style.display = 'block';
    document.getElementById("alarm-b").style.display = 'none';
    document.getElementById("alarm-g").innerHTML = "No Anomalies Detected.";
  }
})
