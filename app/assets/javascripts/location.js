$(document).ready(function() {
  function success(pos){
    var x = document.getElementById("demo");
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    console.log(lat);
    console.log(long);

    $.ajax({
      type: "GET",
      url: "/locations",
      dataType: "JSON",
      success: function(response){
        console.log(response);
      },
      fail: function(response){
        console.log("faield");
      }
    });
  }
  var pos = navigator.geolocation.getCurrentPosition(success);
  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }
  //
  // function showPosition(position) {
  //   x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  // }
});
