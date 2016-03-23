#!/usr/local/bin/php

<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
  <link rel="stylesheet" href="geolocation.css" />
  <script src="//code.jquery.com/jquery-2.1.4.min.js">
  </script>
</head>
<body>
  <script>
  $(document).ready(function() { 
  // http request 
    $.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/current.json", function(data){
      var items = [];
      var wholeObj ="";
      var counter = 1;

      $.each( data, function( key, val ) {
        var allObjInfo = "";
        for (leftItem in val){
          objInfo =  "<ul>" + key + ". " + leftItem + ": " + val[leftItem] + "</ul>  \n";
          allObjInfo = allObjInfo + objInfo;
          counter = counter + 1;
          //everything = everything + allObjInfo;
          //$("#textDisplay").html(allObjInfo);
        }
        //document.write(allObjInfo);
        //alert(allObjInfo);
        //alert (everything);
        wholeObj = wholeObj + allObjInfo;
        //console.log("there's an error here");
      });
      //alert(items);
      $("#textDisplay").html(wholeObj);
    });
    
  });
  </script>


<div data-role="page" id="homePage">
  <?php include("header.php") ?>

  <div role="main" class="ui-content">
    <h1>This is the home page</h1>

    
    
    <div id="textDisplay">
	
  </div>
  </div>

  <!--?php include("footer.php") ?-->
    <div id="mapHome">mapHome</div>
	<button type="button" id="dummy" onclick="displayDummy()">Display dummy data</button>
  <!--?php include_once("footer.php"); ?-->
  <script>
  function displayDummy()
  {
	   dummy = !dummy;
	   if(dummy) {
		   setMapOnAll(map);
	   }
	   else
	   {
		   clearMarkers();
	   }
	   console.log("dummy = " + dummy);
  }
  </script>
  </div>
</div>

<div data-role="page" id="aboutPage">
  <?php include("header.php") ?>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> 


  <div role="main" class="ui-content">
    <h1>This is the about page</h1>
  </div>
  
  <div id="linechart_material" style="width: 900px; height: 500px"></div>
  
  <?php include("footer.php") ?>
  <!--?php include_once("footer.php"); ?-->
</div>

<!-- Start of first page -->
<div data-role="page" id="geoPage">

  <?php include("header.php") ?>

  <div role="main" class="ui-content">
    <p>Geolocation Page</p>
    <div id="geoLocation">Click the button below to get your location!</div>
    <button id="getGeolocation">Get My Location</button>
  </div><!-- /content -->

  <!--?php include_once("footer.php"); ?-->
</div><!-- /page -->

<!-- Start of second page -->
<div data-role="page" id="mapPage">

<?php include("header.php") ?>

  <div role="main" class="ui-content">
    <div id="map-canvas">map-canvas</div>
  </div><!-- /content -->

  <!--?php include_once("footer.php"); ?-->
</div><!-- /page -->

<!-- Start of third page -->
<div data-role="page" id="directionsPage">

<?php include("header.php") ?>

  <div role="main" class="ui-content">
    <div id="directions-canvas">directions-canvas</div>
  </div><!-- /content -->
  <?php include("footer.php") ?>
  <!--?php include_once("footer.php"); ?-->

</div>

<div data-role="page" id="contactPage">
  <?php include("header.php") ?>

  <div role="main" class="ui-content">
    <h1>This is the contact page</h1>
  </div>


  <?php include("footer.php") ?>

  <!--?php include_once("footer.php"); ?-->

</div>

<!-- /page -->
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTZea67jn4YSPIGu0dNTHRyB1jnvo1Q00"></script>
    <script src="geolocation.js"></script>
	<script src="display_graphs.js"></script>
</body>
</html>
