$(document).ready(function() {
  function make_form(){
    console.log("Make Form Function");
    var x = document.getElementById("demo");
  }
  function success(pos){
    console.log("Geolocation Success Function");
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    console.log(lat);
    console.log(long);

    if (typeof(lat) != "undefined" && typeof(long) != "undefined")
    {
      console.log("long and Lat present");
      $.ajax({
        type: "GET",
        url: "/locations_with_long_lat",
        data: "lat="+lat+"&long="+long,
        dataType: "JSON",
        success: function(response){
          console.log("Success");
          console.log(response);
          var x = document.getElementById("demo");
          x.innerHTML = response['response']['name'];
        },
        fail: function(response){
          console.log("Failed");
          console.log(response);
        }
      });
    }else{
      console.log("Long and Lat not present");
      make_form();
    }
  }
  //var pos = navigator.geolocation.getCurrentPosition(success, make_form);
  //console.log("pos");
  //console.log(pos);
  get_nearby_place = function (){
    var place_name = document.getElementById('input_val').value;
    console.log(place_name);
    $.ajax({
      type: "GET",
      url: "/locations_with_address",
      data: "place="+place_name,
      dataType: "JSON",
      success: function(response){
        console.log("Success");
        console.log(response);
        var x = document.getElementById("demo");
        x.innerHTML = response['response']['name'];
      },
      fail: function(response){
        console.log("Failed");
        console.log(response);
      }
    });
  }
});
