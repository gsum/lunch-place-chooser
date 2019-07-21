$(document).ready(function() {
  function make_form(){
    console.log("Make Form Function");
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
          console.log(response['response']);
          console.log(typeof(response['response']));
          var x = document.getElementById("demo");
          if (response['response'] == null)
          {
            x.innerHTML = "Enter valid address.  Herh herh herh.";
          }else{
            x.innerHTML = response['response']['name'];
          }
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
        if (response['response'] == null)
        {
          x.innerHTML = "Enter valid address.  Herh herh herh.";
        }else{
          var vals = response['response']
          var name = document.getElementById("name");
          name.innerHTML = vals["name"];
          var address = document.getElementById("address");
          address.innerHTML = vals["formatted_address"];
          var rating = document.getElementById("rating");
          rating.innerHTML = vals["rating"];
          var lat = vals["geometry"]["location"]["lat"]
          var lng = vals["geometry"]["location"]["lng"]
          var uluru = {lat: lat, lng: lng};
          // The map, centered at Uluru
          var map = new google.maps.Map(
              document.getElementById('map'), {zoom: 18, center: uluru});
          // The marker, positioned at Uluru
          var marker = new google.maps.Marker({position: uluru, map: map});
        }
      },
      fail: function(response){
        console.log("Failed");
        console.log(response);
      }
    });
  }
});
