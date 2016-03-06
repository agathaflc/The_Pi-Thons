var LocationData = [
    // lat     long         name
    [22.3816, 114.2733, "Sai Kung" ], 
    [22.2770, 114.176937, "Wan Chai" ], 
    [22.3584, 114.1070, "Tsing Yi" ], 
    [22.3916, 113.9709, "Tuen Mun" ], 
];
 
function initialize()
{
    var map = 
        new google.maps.Map(document.getElementById('mapHome'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
     
    // loop through markers and display content
    for (var i in LocationData)
    {
        var p = LocationData[i];
        var latlng = new google.maps.LatLng(p[0], p[1]);
        bounds.extend(latlng);
         
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: p[2]
        });
     
        // allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    }
    
    // automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
}
 
google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addListener(marker, 'click', (function(mm, tt) {
    return function() {
        infowindow.setContent(tt);
        infowindow.open(map, mm);
    }
})(marker, p[2]));

/*var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Tuen Mun</h1>'+
  '<div id="bodyContent">'+
  '<p>This area is safe to visit.</p>'+
  '</div>'+
  '</div>';
  
var infowindow = new google.maps.InfoWindow({
  content: contentString
});*/


$( document ).on("pageshow", "#homePage", function() {
  console.log("initMap");
  initMap();
});

//geolocationPage
var x = document.getElementById("geoLocation");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}

$(document).on('click', '#getGeolocation', function(){
    console.log("clicked");
    getLocation();
});

//map page
var y = document.getElementById("map-canvas");
var mapLatitude;
var mapLongitude;
var myLatlng;

function getMapLocation() {
  console.log("getMapLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMapPosition);
    } else {
        y.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showMapPosition(position) {
  console.log("showMapPosition");
    mapLatitude = position.coords.latitude;
    mapLongitude = position.coords.longitude;
    myLatlng = new google.maps.LatLng(mapLatitude,mapLongitude);
    getMap();
}


var map;
function getMap() {
  console.log("getMap");

  var mapOptions = {
    zoom: 20,
    center: new google.maps.LatLng(mapLatitude, mapLongitude)
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var infowindow = new google.maps.InfoWindow({
    content: "This is my content"
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: "You are here!",
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

$( document ).on( "pageshow", "#mapPage", function( event ) {
  getMapLocation();
});

//directionsPage
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var z = document.getElementById("directions-canvas");
var start;
var end;

function getDirectionsLocation() {
  console.log("getDirectionsLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDirectionsPosition);
    } else {
        z.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showDirectionsPosition(position) {
  console.log("showDirectionsPosition");
    directionsLatitude = position.coords.latitude;
    directionsLongitude = position.coords.longitude;
    directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
    getDirections();
}

function getDirections() {
  console.log('getDirections');
  directionsDisplay = new google.maps.DirectionsRenderer();
  //start = new google.maps.LatLng(directionsLatLng);
  var directionsOptions = {
    zoom:12,
    center: start
  }
  directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), directionsOptions);
  directionsDisplay.setMap(directionsMap);
  calcRoute();
}

function calcRoute() {
  console.log("calcRoute");
  start = directionsLatLng;
  end = "Kwun Tong";
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.TRANSIT
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

$( document ).on( "pageshow", "#directionsPage", function( event ) {
  getDirectionsLocation();
});