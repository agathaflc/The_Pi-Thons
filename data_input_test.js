<!DOCTYPE html>
<html> <head>
  <script src="//code.jquery.com/jquery-2.1.4.min.js">
  </script>
</head>
<body>
  <h1>Such a bright day!</h1>
  <h1>Hot hot hot!</h1>
  <script>
  	var books= []; // Array that will contain all books 
$(document).ready(function() { 
	// http request 
	$.getJSON("http://ihome.ust.hk/~maresdhayana/cgi-bin/tmp.txt", function(data) { 
		$.each(data, function(i, val){ 
			books.push(val); 
		}); 
	alert(books) ; }); 
});
  </script>
</body>
</html>


