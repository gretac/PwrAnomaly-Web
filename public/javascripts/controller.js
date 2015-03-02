io = io.connect()

function refreshView (data) {
  // display updated data in the view
  console.log(data);
  alert(data);
}

io.on("powerData", function (powerData) {
  refreshView(powerData.data);
});
