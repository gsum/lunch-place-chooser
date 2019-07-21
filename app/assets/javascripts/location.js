$(document).ready(function() {
  function make_form(){
    var x = document.getElementById("demo");
    x.innerHTML = "make Form"
  }
  function success(pos){
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    console.log(lat);
    console.log(long);

    if (typeof(lat) != "undefined" && typeof(long) != "undefined")
    {
      $.ajax({
        type: "GET",
        url: "/locations_with_long_lat",
        data: "lat="+lat+"&long="+long,
        dataType: "JSON",
        success: function(response){
          console.log(response);
          var x = document.getElementById("demo");
          x.innerHTML = response['response']['name'];
        },
        fail: function(response){
          console.log("Failed");
        }
      });
    }else{
      make_form();
    }
  }
  var pos = navigator.geolocation.getCurrentPosition(success, make_form);
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
