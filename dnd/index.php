<?php
	session_start();
?>
<!DOCTYPE html>
<HTML>
	<head>
		<title>Welcome to the World of DnD</title>
		<link href="map.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="map.js"> </script>
		<meta charset="UTF-8">
		<link rel="icon" href="images/sword.ico" type="image/x-icon">
	</head>
	<body>
		<div id="loginBar">
			<?php 
				if(isset($_SESSION['user'])){
			?>
				<p> Welcome, <?=$_SESSION['user']?>! 
					Your current web score is: <?=$_SESSION['logins']?></p>
			<?php 
			} else {
			?>
			<input placeholder="username" id="username"
				<?php if(isset($_COOKIE['DnDProfile'])){
					echo($_COOKIE['DnDProfile']);
					list($user,$pass) = explode('|', $_SESSION['DnDProfile']);?>
				value="<?= $user ?>"	
				<?php } ?>
			>
			<input placeholder="password" type="password" id="passBox"
			 <?php if(isset($_COOKIE['DnDProfile'])){ ?>
				value="<?= $pass ?>"	
				<?php } ?>
			>
			<input type="button" value="login" id="logButton">
			<input type="checkbox" id="rememberme">
			remember me!
			<?php } ?>
		</div>
		<h1> Welcome to The World! </h1>
		<h2 id="countdown"> Thanks for coming! </h2>
		<div id="selecter">
			<select id="plane">
				<option> Home </option>
				<option> Fey </option>
				<!-- From the icelandic for "funeral," the plain on which Mike runs DM experiments -->
				<option> Jaroarfor </option>
				<option> Underdark </option>
			</select>
		</div>
		<div class="content" id="container"> 
		<img id="atlas" src="images/world%20map.png" align=center alt="World Map" usemap="#countries">
		</div>
		<div class = "content" id = "overview">
		</div>
		<div class = "content" id = "cities">
		</div>
		<map id = "countries" name = "countries">
		<area shape = "circle" coords = "400, 0, 80" id = "tychicus">
		<area shape = "circle" coords = "575, 30, 50" id = "argonis">
		<area shape = "circle" coords = "590, 100, 30" id = "griv">
		<area shape = "circle" coords = "580, 200, 50" id = "realm%20of%20the%20tieflings">
		<area shape = "circle" coords = "500, 140, 50" id = "united%20goblin%20kingdoms">
		<area shape = "circle" coords = "200, 20, 100" id = "gnomerigon">
		<area shape = "circle" coords = "250, 160, 55" id = "dargeenbaron">
		<area shape = "circle" coords = "395, 280, 110" id = "united%20territories%20of%20harloh">
		<area shape = "circle" coords = "500, 500, 110" id = "elven%20assembly">
		<area shape = "circle" coords = "605, 400, 25"  id = "eladrin%20republic">
		<area shape = "circle" coords = "310, 445, 55"  id = "empire%20of%20light">
		<area shape = "circle" coords = "315, 565, 60" id = "htalftreen">
		<area shape = "circle" coords = "175, 520, 70" id = "dwargoric">
		<area shape = "circle" coords = "185, 410, 30" id = "the%20dwarven%20republic">
		<area shape = "circle" coords = "30, 260, 40" id = "university%20capitol">
		</map>
		<div class="content" id="toolbar">
			<a href="followers.php" title="To experimental Follower coordination center"> 
				<img src="images/follower%20button.png" alt="Followers"/>
			</a> 
			<a href="rules/rules.html" title="To The Rules Index"> 
				<img src="images/rules%20button.png" alt="Rules"/>
			</a>
			<a href="adventures/adventures.php" title = "To ADVENTURE!!!!">
				<img src="images/adventure%20button.png" alt="ADVENTURE!"/>
			</a>
			<a href="past/pclore.html" title = "To Player Character Lore">
				<img src="images/player%20button.png" alt="Player Character Lore"/>
			</a>
			<a href="past/flore.html" title = "To Follower Lore">
				<img src="images/follower%20lore%20button.png" alt="Follower Lore"/>
			</a>
			<a href="tychicus/tychicus.html" title = "To The Home Country!">
				<img src="images/tychicus%20button.png" alt="To The Home Country!"/>
			</a>
			<a href="past/past.php" title = "To The records of Past Contracts!">
				<img src="images/past%20button.png" alt="To The Past!"/>
			</a>
			<?php
			if(isset($_SESSION['type']) && !strcasecmp($_SESSION['type'],"dungeonmaster")){ ?>
				<a href="dm/hub.php" title="To DungeonMaster HUB"> 
				<img src="images/dm%20button.png" alt="DM Hub"/>
			</a>
			<?php } ?>
		</div>
	</body>
</HTML>