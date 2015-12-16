function initialize() {

        console.log(lat1); console.log(long1)
        console.log(lat2); console.log(long2)
        console.log(lat3); console.log(long3)
        console.log(lat4); console.log(long4)

         var red = "FE7569";
         var green = "00FF00";
         var blue = "0000FF";
         var yellow = "FFFF00";

    var pinImage1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + red,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinImage2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + green,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinImage3 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + blue,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinImage4 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + yellow,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

  var mapProp = {
    center:new google.maps.LatLng(lat1, long1),
    zoom:2,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

        var marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(lat1, long1),
    map: map,
            icon: pinImage1,
                shadow: pinShadow
  });

      var marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(lat2, long2),
    map: map,
          icon: pinImage2,
                shadow: pinShadow
  });

          var marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(lat3, long3),
    map: map,
              icon: pinImage3,
                shadow: pinShadow
  });

          var marker4 = new google.maps.Marker({
    position: new google.maps.LatLng(lat4, long4),
    map: map,
              icon: pinImage4,
                shadow: pinShadow
  });
}
google.maps.event.addDomListener(window, 'load', initialize);function initialize() {

        console.log(lat1); console.log(long1)
        console.log(lat2); console.log(long2)
        console.log(lat3); console.log(long3)
        console.log(lat4); console.log(long4)

         var red = "FE7569";
         var green = "00FF00";
         var blue = "0000FF";
         var yellow = "FFFF00";

    var pinImage1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + red,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinImage2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + green,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinImage3 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + blue,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinImage4 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + yellow,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

  var mapProp = {
    center:new google.maps.LatLng(lat1, long1),
    zoom:2,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

        var marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(lat1, long1),
    map: map,
            icon: pinImage1,
                shadow: pinShadow
  });

      var marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(lat2, long2),
    map: map,
          icon: pinImage2,
                shadow: pinShadow
  });

          var marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(lat3, long3),
    map: map,
              icon: pinImage3,
                shadow: pinShadow
  });

          var marker4 = new google.maps.Marker({
    position: new google.maps.LatLng(lat4, long4),
    map: map,
              icon: pinImage4,
                shadow: pinShadow
  });
}
google.maps.event.addDomListener(window, 'load', initialize);