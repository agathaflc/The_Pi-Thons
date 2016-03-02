#!/usr/local/bin/php

<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
	<link rel="stylesheet" href="geolocation.css" />
</head>
<body>
<<<<<<< HEAD

<div data-role="page" id="homePage">
	<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<div id="mapHome">mapHome</div>
	<!--?php include_once("footer.php"); ?-->
	</div>
</div>

<div data-role="page" id="aboutPage">
	<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<h1>This is the about page</h1>
	</div>

	<!--?php include_once("footer.php"); ?-->
</div>

<!-- Start of first page -->
<div data-role="page" id="geoPage">
=======
<!-- Start of first page -->
<div data-role="page" id="homePage">
>>>>>>> master

	<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<p>Geolocation Page</p>
<<<<<<< HEAD
		<div id="geoLocation">Click the button below to get your location!</div>
		<button id="getGeolocation">Get My Location</button>
	</div><!-- /content -->

	<!--?php include_once("footer.php"); ?-->
=======
		<div id="geoLocation">geoLocation</div>
		<button id="getGeolocation">get geolocation</button>
	</div><!-- /content -->

	<?php include("footer.php") ?>
>>>>>>> master
</div><!-- /page -->

<!-- Start of second page -->
<div data-role="page" id="mapPage">

<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<div id="map-canvas">map-canvas</div>
	</div><!-- /content -->

<<<<<<< HEAD
	<!--?php include_once("footer.php"); ?-->
=======
	<?php include("footer.php") ?>
>>>>>>> master
</div><!-- /page -->

<!-- Start of third page -->
<div data-role="page" id="directionsPage">

<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<div id="directions-canvas">directions-canvas</div>
	</div><!-- /content -->

<<<<<<< HEAD
	<!--?php include_once("footer.php"); ?-->
</div>

<div data-role="page" id="contactPage">
	<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<h1>This is the contact page</h1>
	</div>

	<!--?php include_once("footer.php"); ?-->
</div>

<!-- /page -->
=======
	<?php include("footer.php") ?>
</div><!-- /page -->
>>>>>>> master
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTZea67jn4YSPIGu0dNTHRyB1jnvo1Q00"></script>
    <script src="geolocation.js"></script>
</body>
</html>
