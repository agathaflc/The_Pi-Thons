/////// HOME PAGE ///////

var LocationData = [
	// 0    	 1        	2			3			4			5 		6
    // lat     long        name		MQ2_level	MQ2_status	r_level r_status
    [22.3816, 114.2733, "Sai Kung", 	10, 		"safe",		0,		"safe"], 
    [22.2770, 114.176937, "Wan Chai", 	0, 		"safe",		0,		"safe"], 
    [22.3584, 114.1070, "Tsing Yi", 	0, 		"safe",		0,		"safe"], 
    [22.3916, 113.9709, "Tuen Mun", 	0, 		"safe",		0,		"safe"], 
];

var dummyData = [
	// lat     long        name		MQ2_level	MQ2_status	r_level r_status
	[22.3133, 114.2258, "Kwun Tong", 	0, 		"unsafe",		0,		"safe"],
	[22.3225, 114.1706, "Mong Kok", 	0, 		"safe",		0,		"safe"],
	[22.2940, 114.1712, "Tsim Sha Tsui",0, 		"safe",		0,		"safe"],
	[22.3133, 114.0433, "Disneyland", 	0, 		"safe",		0,		"safe"],
	[22.3089, 113.9144, "Airport", 		0, 		"safe",		0,		"unsafe"],
	[22.3750, 114.1833, "Sha Tin", 		0, 		"safe",		0,		"safe"],
	[22.2819, 114.1581, "Central", 		0, 		"safe",		0,		"safe"],
	[22.5144, 114.0657, "Lok Ma Chau", 	0, 		"unsafe",		0,		"safe"],
	[22.442707, 114.128334, "Lam Tsuen",0, 		"safe",		0,		"safe"],
	[22.3969, 114.1959, "Fo Tan", 		0, 		"safe",		0,		"safe"],
	[22.3748, 114.1861, "Che Kung Temple Station",0,"safe",	0,		"safe"],
	[22.3686, 114.1131, "Tsuen Wan", 	0, 		"safe",		0,		"safe"],
	[22.3549, 114.0840, "Kwai Tsing", 	0, 		"safe",		0,		"safe"],
	[22.4456, 114.0222, "Yuen Long", 	0, 		"safe",		0,		"safe"],
	[22.3167, 114.1833, "Kowloon City", 0, 		"unsafe",		0,		"unsafe"],
	[22.3531, 114.1871, "Lion Rock", 	0, 		"safe",		0,		"safe"],
	[22.3307, 114.1622, "Sham Shui Po", 0, 		"safe",		0,		"safe"],
	[22.3335, 114.1969, "Wong Tai Sin",	0, 		"unsafe",		0,		"safe"],
	[22.2459, 114.1759, "Ocean Park", 	0, 		"safe",		0,		"safe"],
	[22.4508, 114.1642, "Tai Po", 		0, 		"unsafe",		0,		"safe"],
	[22.4221, 114.2324, "Ma On Shan", 	0, 		"safe",		0,		"safe"],
	[22.3154, 114.2193, "Ngau Tau Kok", 0, 		"unsafe",		0,		"safe"],
	[22.3038, 114.1830, "Hung Hom", 	0, 		"safe",		0,		"safe"],
	[22.2700, 114.2400, "Chai Wan", 	0, 		"safe",		0,		"unsafe"],
	[22.2789, 114.2289, "Shau Kei Wan Station",0,"safe",	0,		"safe"],
	[22.3224, 114.2580, "Po Lam", 		0, 		"safe",		0,		"safe"],
	[22.2950, 114.2710, "Lohas Park", 	0, 		"safe",		0,		"safe"],
	[22.3549, 114.0840, "Kwai Tsing", 	0, 		"safe",		0,		"safe"],
	[22.4456, 114.0222, "Yuenn Long", 	0, 		"safe",		0,		"safe"],
	[22.2775, 114.2392, "Heng Fa Chuen",0, 		"unsafe",		0,		"safe"],
	[22.3068, 114.2330, "Lam Tin", 		0, 		"unsafe",		0,		"safe"],
	[22.3130, 114.1705, "Yau Ma Tei", 	0, 		"safe",		0,		"safe"],
	[22.3412, 114.2011, "Diamond Hill",	0, 		"safe",		0,		"unsafe"],
	[22.2869, 113.9436, "Tung Chung", 	0, 		"unsafe",		0,		"safe"],
	[22.2000, 114.1167, "Lamma Island", 0, 		"safe",		0,		"safe"],
	[22.4511, 114.1611, "Tai Wo Station",0, 	"safe",		0,		"safe"],
	
];

// Data for graphs
var saikung_mq2 = []

var dummy = false; // If it's false, we don't show the dummy data
var map;
 
/* function showHello(){
	alert("hello");
} */

function MergeJSON (o, ob) {
      for (var z in ob) {
           o[z] = ob[z];
      }
      return o;
}
	
function fetch_json()
{
	console.log("fetch_json");
	//var finalObj = [];
	$.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/currentsaikung.json", function(data)
	{
		// Update data for Sai Kung
		LocationData[0][3] = data[0].MQ2_level; // Set level of mq2
		LocationData[0][4] = data[0].MQ2_status;
		LocationData[0][5] = data[0].radiation_level; // Set level of radiation
		LocationData[0][6] = data[0].radiation_status;
	});
	$.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/currentwanchai.json", function(data)
	{
		// Update data for Wan Chai
		LocationData[1][3] = data[0].MQ2_level; // Set level of mq2
		LocationData[1][4] = data[0].MQ2_status;
		LocationData[1][5] = data[0].radiation_level; // Set level of radiation
		LocationData[1][6] = data[0].radiation_status;
	});	
	$.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/currenttsingyi.json", function(data)
	{
		// Update data for Tuen Mun
		LocationData[2][3] = data[0].MQ2_level; // Set level of mq2
		LocationData[2][4] = data[0].MQ2_status;
		LocationData[2][5] = data[0].radiation_level; // Set level of radiation
		LocationData[2][6] = data[0].radiation_status;
	});
	$.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/currenttuenmun.json", function(data)
	{
		// Update data for Tsing Yi
		LocationData[3][3] = data[0].MQ2_level; // Set level of mq2
		LocationData[3][4] = data[0].MQ2_status;
		LocationData[3][5] = data[0].radiation_level; // Set level of radiation
		LocationData[3][6] = data[0].radiation_status;
	});		

	/*
	$.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/current.json", function(data){
		var i;
		for (i=0; i<data.length; i++)
		{
			if (data[i].name == "saikung")
			{
				LocationData[0][3] = data[i].MQ2_level; // Set level of mq2
				LocationData[0][4] = data[i].MQ2_status;
				LocationData[0][5] = data[i].radiation_level; // Set level of radiation
				LocationData[0][6] = data[i].radiation_status;
			}
			else if (data[i].name == "wanchai")
			{
				LocationData[1][3] = data[i].MQ2_level; // Set level of mq2
				LocationData[1][4] = data[i].MQ2_status;
				LocationData[1][5] = data[i].radiation_level; // Set level of radiation
				LocationData[1][6] = data[i].radiation_status;
			}
			else if (data[i].name == "tuenmun")
			{
				LocationData[2][3] = data[i].MQ2_level; // Set level of mq2
				LocationData[2][4] = data[i].MQ2_status;
				LocationData[2][5] = data[i].radiation_level; // Set level of radiation
				LocationData[2][6] = data[i].radiation_status;
			}
			else if (data[i].name == "tsingyi")
			{
				LocationData[3][3] = data[i].MQ2_level; // Set level of mq2
				LocationData[3][4] = data[i].MQ2_status;
				LocationData[3][5] = data[i].radiation_level; // Set level of radiation
				LocationData[3][6] = data[i].radiation_status;
			}
		}
	}); */
}

/* $(document).ready(function() { 
// http request 

}); */

var markers = [];
var dummyMarkers = [];

// Sets the map on all DUMMY markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < dummyMarkers.length; i++) {
    dummyMarkers[i].setMap(map);
  }
  console.log("showMarkers");
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  console.log("clearMarkers");
}

function initialize()
{
    map = 
        new google.maps.Map(document.getElementById('mapHome'));    
	var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
	
	markers = [];
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
			optimized: false,
            //animation: google.maps.Animation.DROP,
            title: p[2],
			// change icon image
			icon: (p[4] != "safe" || p[6] != "safe") ? "http://www.imageupload.co.uk/images/2016/03/17/flashing_red_orangee93bb.gif":"http://maps.google.com/mapfiles/marker_grey.png",
			customMQ2: p[3],
			MQ2_sd: p[4],
			customRadiation: p[5],
			radiation_sd: p[6]
        });
		markers.push(marker);
		var contentString = '<div id="content">'+
		  '<div id="siteNotice">'+
		  '</div>'+
		  
		  '<div id="bodyContent">'+
		  '<p>Smoke level: </p>'+
		  '</div>'+
		  '</div>';
		//var x = 3;
		//console.log(p[3]);
        // allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', function() {
			//console.log(p[3]);
			//var p = LocationData[i];
            infowindow.setContent('<h3><b>' + this.title + '</b></h3>' + 
            	'<p> Smoke/gas level: ' + this.customMQ2 + ' <b>(' + this.MQ2_sd + ')</b>' + '</br>' +
            	'Radiation level: ' + this.customRadiation + '  µSv <b>(' + this.radiation_sd + ')</b>' +'</p>');
			//infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
		
		google.maps.event.addDomListener(window, 'load', initialize);

/* 		google.maps.event.addListener(marker, 'click', (function(mm, tt) {
			return function() {
				infowindow.setContent(tt);
				infowindow.open(map, mm);
			}
		})(marker, p[2])); */
    }
	
	// initialize dummy markers
	for (var i in dummyData)
	{
		var p = dummyData[i];
		var latlng = new google.maps.LatLng(p[0], p[1]);
		bounds.extend(latlng);
		
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			draggable: false,
			optimized: false,
			//animation: google.maps.Animation.DROP,
			title: p[2] + " " + p[3],
			// change icon image
			icon: (p[4] != "safe" || p[6] != "safe") ? "http://www.imageupload.co.uk/images/2016/03/17/flashing_red_orangee93bb.gif":"http://maps.google.com/mapfiles/marker_grey.png",
			customInfo: "Smoke and radiation level"
		});
		dummyMarkers.push(marker);
		var contentString = '<div id="content">'+p[3]+'</div>';
	 
		// allow each marker to have an info window
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(this.title + '<p>' +this.customInfo + '</p>');
			//infowindow.setContent(contentString);
			infowindow.open(map, this);
		});
		
		google.maps.event.addDomListener(window, 'load', initialize);
	}
	
    // automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
	
	// when we don't want to show dummy data (dummy == false), hide the dummy markers
	if(!dummy)
	{
		clearMarkers();
	}
	
	//setInterval("displayMarkers(LocationData, map)", 3000);
}
 
function updateMarker(markers, LocationData)
{
	console.log("updateMarker");
	var n = markers.length;
	//console.log("n = " + n);
	var i;
	for (i=0; i<n; i++)
	{
		//console.log(i);
		var p = LocationData[i];
		var yes = (p[4] != "safe" || p[6] != "safe")
		//console.log(yes);
		markers[i].setIcon((p[4] != "safe" || p[6] != "safe") ? "http://www.imageupload.co.uk/images/2016/03/17/flashing_red_orangee93bb.gif":"http://maps.google.com/mapfiles/marker_grey.png"); 
		//console.log(p[4] + p[6])
	}
}

function start_timer()
{
	fetch_json();
	setInterval("fetch_json()", 3000);
	setInterval("updateMarker(markers, LocationData)", 3000);
}

$(document).ready(function() { start_timer(); })

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
  initialize();
});


/////// geolocationPage ///////
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

/////// map page ///////
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

/////// directionsPage ///////
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

