<?php
	session_start();
?>
<!DOCTYPE html>
<HTML>
	<head>
		<title>Welcome to the Follower Command Center!</title>
		<link href="followers/followers.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="followers.js"> </script>
		<meta charset="UTF-8"></meta>
		<link rel="icon" href="images/sword.ico" type="image/x-icon">
	</head>
<body>
	<!--login bar -->
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
		<!-- end login bar -->
	<h1> Followers </h1>
	
	<div id="container">
		<h2> Followers </h2>
		<table id="table">
			<tr>
				<th> Name </th>
				<th> Class </th>
				<th> Assignment </th>
				<th></th>
				<th>Stats</th>
				<th>Stats</th>
				<th>Stats</th>
			</tr>
			<!-- Javascript puts followers here! -->
		</table>
		<?php if(isset($_SESSION['type']) && !strcasecmp($_SESSION['type'],"dungeonmaster")){ ?>
			<input type="button" value="Advance Month (DM)" id="advance">
		<?php } ?>
		<h2>Contracts</h2>
		<h3> Assassin's Contracts</h3>
		<div id="assassinContracts">
			<!-- Javascript puts stuff here -->
		</div>
		<h3> Mage's Contracts</h3>
		<div id="MageContracts">
			<!-- Javascript puts stuff here -->
		</div>
		<h3> Leader's Contracts</h3>
		<div id="leaderContracts">
			<!-- Javascript puts stuff here -->
		</div>
		<h3> Player's Contracts</h3>
		<div id="playerContracts">
			<!-- Javascript puts stuff here -->
		</div>
		<h3>Discussion Board</h3>
		<p>This is a place where players can discuss/coordinate follower movements.
			New comments will be on top.</p>
		<fieldset>
		<textarea id="newComment"/></textarea>
		<input type="button" value="sendComment" id="submitComment"/>
		</fieldset>
		<div id="discussion"> 
			<!-- Javascript puts stuff here -->
			<?php 
				if(isset($_GET['comment'])){
			?>
					<div>
						<p>Comment Pending!!! Try hitting 'F5' to refresh!</p>
					</div>
				<?php }
			?>
		</div>
	</div>
	<div class="content" id="toolbar">
			<a href="index.php" title="To World Map"> 
				<img src="images/world%20map%20button.png" alt="Followers"/>
			</a> 
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
	<div id="hotBox">
		<ul>
			<li><a href="#loginBar">Top</a></li>
			<li><a href="#table">Followers</a></li>
			<li><a href="#assassinContracts">Assassin Contracts</a></li>
			<li><a href="#MageContracts">Mage Contracts</a></li>
			<li><a href="#leaderContracts">Leader Contracts</a></li>
			<li><a href="#playerContracts">Player Contracts</a></li>
			<li><a href="#discussion">Discussion Forum</a></li>
		</ul>
	</div>
</body>
</HTML>