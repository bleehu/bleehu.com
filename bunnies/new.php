<!DOCTYPE HTML>
<html>
	<head>
		<title> Bunnies Online - New Bunny </title>
		<link href="bunnies.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<h1> Bunnies Online </h1>
		<h2> Make Your Bunny! </h2>
		<div id="pic">
			<div id="bunnydiv">
				<img src="images/bunnies/bunny.png" alt="a bunny" title="default bunny" />
			</div>
		</div>
		<form action="new.php" method="POST">
		<fieldset>
			<legend> Color Your Bunny </legend>
			<input type="range" name="redslide" min="1" max="225"> <p id="red"></p>
			<input type="range" name="greenslide" min="1" max="225"> <p id="green"></p>
			<input type="range" name="blueslide" min="1" max="225"> <p id="blue"></p>
		</fieldset>
		</form>
	</body>
</html>