io = io.connect()
google.load('visualization', '1.1', {packages: ['line']});
var chart;

window.onload = function () {
  chart = new google.charts.Line(document.getElementById('power_chart'));
};

function refreshView (updateData, callback) {
  // display updated data in the view
  var data = updateData.data;
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

  var options = { height: 500 };

  if (updateData.alarm) options.colors = ['red'];
  else options.colors = ['#4285F4'];

  chart.draw(data, options);
  callback();
}

io.on("update", function (updateData) {
  refreshView(updateData, function () {
    if (updateData.alarm) {
      document.getElementById("alarm-g").style.display = 'none';
      document.getElementById("alarm-b").style.display = 'block';
      document.getElementById("alarm-b").innerHTML = "Anomaly detected: " + updateData.alarmMessage;
    } else {
      document.getElementById("alarm-g").style.display = 'block';
      document.getElementById("alarm-b").style.display = 'none';
      document.getElementById("alarm-g").innerHTML = "Status: No anomaly";
    }
  });
});
