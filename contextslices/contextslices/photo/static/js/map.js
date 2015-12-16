// global map
var map;

// global arrays
var initialMarkers = [];
var markers = [];
var circles = [];
var polygons = [];
var timestamps = [];

// global booleans
var setMarker = true;
var setCircle = false;
var setPolygon = false;
var singleClick = false;
var drawingPoly = false;

// global vars for drawing polygons
var poly;
var path;
var firstPolyPoint;

function GetMap() {
  // will center
  var latlng = new google.maps.LatLng(38.8225909761771, -76.79443359375);
  // define map
  var container = document.getElementById("mapContainer");
  
  var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(container,myOptions);

  // add listener to put pins down
  google.maps.event.addListener(map, 'click', function(event)
  {
      /* 
        This will handle double clicks on the map
        are not supposed to be clicks.  A user will have
        half a second to double click before the click 
        registers 
      */
      singleClick = true;
      
      // if either a circle or pin click
      if (setMarker){
        setTimeout(function(){
          if (singleClick)
          {
            placeMarkerAndPanTo(event.latLng, map);
          }
        }, 500);
      }
      else if (setPolygon){
        if (!drawingPoly){
          startPolygon(event.latLng, map);
        }
        else {
          drawPolygon(event.latLng);
        }
      }
      else if (setCircle){
        drawCircle(event.latLng, map);                      
      }
  });

  google.maps.event.addListener(map, 'dblclick', function(event) {
       clearSingleClick();
  });    
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    for (var i = 0; i < markers.length; i++)
    {
      markers[i].setMap(null);
    }
    markers = [];
}

function dropCircleOnClick()
{
  setPolygon = false;
  setCircle = true;
  setMarker = false;
}

function dropPinOnClick()
{
  setPolygon = false;
  setCircle = false;
  setMarker = true;
}

function dropPolygonOnClick()
{
  setCircle = false;
  setPolygon = true;
  setMarker = false;
}

function clearSingleClick(){
  singleClick = false;
};

// Attaches an info window to a marker with the provided message.
function attachSecretMessage(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });

  marker.addListener('dblclick', function() {
      marker.setMap(null);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  attachSecretMessage(marker, "Information about point.  Location: " + latLng)
  markers.push(marker)
}

function drawCircle(latLng, map) {
  // Add the circle to map.
  var circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: latLng,
    radius: 500,
    editable: true,
    draggable: true
  });

  circle.addListener('dblclick', function() {
      circle.setMap(null);
  });

  circles.push(circle);
}

function startPolygon(latLng, map) {
    poly = new google.maps.Polyline({
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      draggable: true
    });

    drawingPoly = true;
    firstPolyPoint = latLng;
    path = poly.getPath();
    path.push(latLng);
}

function drawPolygon(latLng){
  var newLat = latLng.lat();
  var newLng = latLng.lng();
  var startLat = firstPolyPoint.lat();
  var startLng = firstPolyPoint.lng();
  var latDiff = Math.abs(startLat - newLat);
  var lngDiff = Math.abs(startLng - newLng);

  // check if the next point will close the polygon
  if (latDiff < 0.04 && lngDiff < 0.04) {
    path.push(firstPolyPoint);
    drawingPoly = false;
    polygons.push(poly);
    path = [];
  }
  else {
    path.push(latLng);
  }
}

function initialize() {
  console.log(lat1); console.log(long1)
  console.log(lat2); console.log(long2)
  console.log(lat3); console.log(long3)
  console.log(lat4); console.log(long4)

  // var pinImage1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + red,
  // new google.maps.Size(21, 34),
  // new google.maps.Point(0,0),
  // new google.maps.Point(10, 34));
  // var pinImage2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + green,
  // new google.maps.Size(21, 34),
  // new google.maps.Point(0,0),
  // new google.maps.Point(10, 34));
  // var pinImage3 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + blue,
  // new google.maps.Size(21, 34),
  // new google.maps.Point(0,0),
  // new google.maps.Point(10, 34));
  // var pinImage4 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + yellow,
  // new google.maps.Size(21, 34),
  // new google.maps.Point(0,0),
  // new google.maps.Point(10, 34));
  // var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
  // new google.maps.Size(40, 37),
  // new google.maps.Point(0, 0),
  // new google.maps.Point(12, 35));
  
  var marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(lat1, long1),
    map: map,
            //icon: pinImage1,
            //shadow: pinShadow
  });

  var marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(lat2, long2),
    map: map,
          //icon: pinImage2,
          //shadow: pinShadow
  });

  var marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(lat3, long3),
    map: map,
            //icon: pinImage3,
            //shadow: pinShadow
  });

  var marker4 = new google.maps.Marker({
    position: new google.maps.LatLng(lat4, long4),
    map: map,
            //icon: pinImage4,
            //shadow: pinShadow
  });

  initialMarkers[0] = marker1;
  initialMarkers[1] = marker2;
  initialMarkers[2] = marker3;
  initialMarkers[3] = marker4;
}

function checkSliderChanged(minValue, maxValue) {
    for (var i = 0; i < initialMarkers.length; i++) {
      if (timestamps[i] < minValue || timestamps[i] > maxValue) {
        initialMarkers[i].setMap(null)
      }
      else if (initialMarkers[i].getMap() == null ) {
        initialMarkers[i].setMap(map);
      }
    }
    console.log(minValue + " " + maxValue);
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var num_month = a.getMonth();
  var time = num_month + "/" + date + "/" + year  // ' ' + hour + ':' + min + ':' + sec ;
  console.log(time)
  return time;
}