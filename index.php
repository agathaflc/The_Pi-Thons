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

<div data-role="page" id="homePage">
	<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<h1>This is the home page</h1>
	</div>

	<?php include("footer.php") ?>
		<div id="mapHome">mapHome</div>
	<!--?php include_once("footer.php"); ?-->
	</div>
</div>

<div data-role="page" id="aboutPage">
	<?php include("header.php") ?>

	<div role="main" class="ui-content">
		<h1>This is the about page</h1>
	</div>
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
</body>
</html>