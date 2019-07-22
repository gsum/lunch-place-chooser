$(document).ready(function() {

  function success(pos){
    console.log("Geolocation Success Function");
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    console.log(lat);
    console.log(long);

    if (typeof(lat) != "undefined" && typeof(long) != "undefined")
    {
      console.log("long and Lat present");
      var form_header = document.getElementById("form_header");
      var ans = document.getElementById("ans");
      $.ajax({
        type: "GET",
        url: "/locations_with_long_lat",
        data: "lat="+lat+"&long="+long,
        dataType: "JSON",
        success: function(response){
          console.log("Success");
          console.log(response);
          var x = document.getElementById("demo");
          if (response['response'] == null)
          {
            var demo_div = document.getElementById("demo_div");
            demo_div.style.display = "block";
            ans.style.display = "none";
            form_header.innerHTML = "With address wisest man never make mistake.";
          }else{
            ans.style.display = "block";
            var vals = response['response']
            var name = document.getElementById("name");
            name.innerHTML = vals["name"];
            var rating = document.getElementById("rating");
            rating.innerHTML = "Rating: " + vals["rating"];
            var lat = vals["geometry"]["location"]["lat"]
            var lng = vals["geometry"]["location"]["lng"]
            var uluru = {lat: lat, lng: lng};
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 18, center: uluru});
            var marker = new google.maps.Marker({position: uluru, map: map});
            form_header.innerHTML = "Try some other place want to, hmm?  Herh herh herh.";

          }
        },
        fail: function(response){
          console.log("Failed");
          console.log(response);
        }
      });
    }else{
      console.log("Long and Lat not present");
      var form_header = document.getElementById("form_header");
      form_header.innerHTML = "Find your location automatically cannot.  Enter manually.";
    }
  }
  var pos = navigator.geolocation.getCurrentPosition(success);
  console.log("pos");
  console.log(pos);
  get_nearby_place = function (){
    var place_name = document.getElementById('input_val').value;
    var form_header = document.getElementById("form_header");
    var ans = document.getElementById("ans");
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
          var demo_div = document.getElementById("demo_div");
          demo_div.style.display = "block";
          ans.style.display = "none";
          form_header.innerHTML = "With address wisest man never make mistake.";
        }else{
          ans.style.display = "block";
          var vals = response['response']
          var name = document.getElementById("name");
          name.innerHTML = vals["name"];
          var address = document.getElementById("address");
          address.innerHTML = vals["formatted_address"];
          var rating = document.getElementById("rating");
          rating.innerHTML = "Rating: " + vals["rating"];
          var lat = vals["geometry"]["location"]["lat"]
          var lng = vals["geometry"]["location"]["lng"]
          var uluru = {lat: lat, lng: lng};
          var map = new google.maps.Map(
              document.getElementById('map'), {zoom: 18, center: uluru});
          var marker = new google.maps.Marker({position: uluru, map: map});
          form_header.innerHTML = "Try some other place want to, hmm?  Herh herh herh.";

        }
      },
      fail: function(response){
        x.innerHTML = "What is going on here I know not.";
        console.log("Failed");
        console.log(response);
      }
    });
  }
});
