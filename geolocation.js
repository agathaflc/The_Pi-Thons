<<<<<<< HEAD
//homePage

var marker;

function initMap() {
	var mapz = new google.maps.Map(document.getElementById('mapHome'), {
	  zoom: 11,
	  center: {lat: 22.2783, lng: 114.1747}
	});

	marker1 = new google.maps.Marker({
	  map: mapz,
	  draggable: false,
	  animation: google.maps.Animation.DROP,
	  position: {lat: 22.3816, lng: 114.2733}
	});
    marker1.addListener('click', function() {
		infowindow.open(mapz, marker1);
	});	  
	
	marker2 = new google.maps.Marker({
	  map: mapz,
	  draggable: false,
	  animation: google.maps.Animation.DROP,
	  position: {lat: 22.2770, lng: 114.176937}
	});
    marker2.addListener('click', function() {
		infowindow.open(mapz, marker2);
	});	  
	
	marker3 = new google.maps.Marker({
	  map: mapz,
	  draggable: false,
	  animation: google.maps.Animation.DROP,
	  position: {lat: 22.3584, lng: 114.1070}
	});
    marker3.addListener('click', function() {
		infowindow.open(mapz, marker3);
	});	

	marker4 = new google.maps.Marker({
	  map: mapz,
	  draggable: false,
	  animation: google.maps.Animation.DROP,
	  position: {lat: 22.3916, lng: 113.9709}
	});
    marker4.addListener('click', function() {
		infowindow.open(mapz, marker4);
	});
}


var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Tuen Mun</h1>'+
  '<div id="bodyContent">'+
  '<p>This area is safe to visit.</p>'+
  '</div>'+
  '</div>';
  
var infowindow = new google.maps.InfoWindow({
	content: contentString
});

//function toggleBounce() {
//	if (marker.getAnimation() !== null) {
//	  marker.setAnimation(null);
//	} else {
//	  marker.setAnimation(google.maps.Animation.BOUNCE);
//	}
//}

$( document ).on("pageshow", "#homePage", function() {
	console.log("initMap");
	initMap();
});

=======
>>>>>>> master
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
<<<<<<< HEAD

=======
>>>>>>> master
  var mapOptions = {
    zoom: 20,
    center: new google.maps.LatLng(mapLatitude, mapLongitude)
  };
<<<<<<< HEAD

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var infowindow = new google.maps.InfoWindow({
    content: "This is my content"
  });
=======
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
>>>>>>> master

	var marker = new google.maps.Marker({
	    position: myLatlng,
	    map: map,
<<<<<<< HEAD
	    title: "You are here!",
	});

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
=======
	    title:"You are here!"
	});
>>>>>>> master
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

