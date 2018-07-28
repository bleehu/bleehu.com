<?php
session_start();
?>
<html>
	<head>
		<title> Adventures </title>
		<script type="text/javascript" src="adventures.js"></script>
		<link rel="stylesheet" type="text/css" href="adventures.css"></link>
		<link rel="icon" href="../images/sword.ico" type="image/x-icon">
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
	<h1> Available Adventures</h1>
	<div class = "content" id = "adventures">
	</div>
	<h1> DM days available </h1>
	<div class = "content" id = "days">
	</div>
	<h1> Suggestions</h1>
	<div class = "content" id = "suggestions">
		<form name= "suggestion">
		<h3> Adventure Name </h3>
		<input name = "name" type="text" maxlength= 100; size = 40>
		<h3> Encounter count </h3>
		<input name = "encounters" type="text" maxlength= 100; size = 40>
		<h3> Description </h3>
		<textarea name = "description" ></textarea>
		<input type = "button" value = "submit" id = "submit">
		</form>
	</div>
	<!-- begin discussion board -->
	<h1>Discussion Board</h1>
	<div class="content">
		<p>This is a place to discuss upcoming adventures and attendance. The suggestion 
			box should be operational soon, so we'd prefer you not post suggested 
			adventures here.</p>
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
	<!-- end discussion board -->
	<div class="content" id="toolbar">
			<a href="../followers.php" title="To experimental Follower coordination center"> 
				<img src="../images/follower%20button.png" alt="Followers"/>
			</a> 
			<a href="../rules/rules.html" title="To The Rules Index"> 
				<img src="../images/rules%20button.png" alt="Rules"/>
			</a>
			<a href="../adventures/adventures.php" title = "To ADVENTURE!!!!">
				<img src="../images/adventure%20button.png" alt="ADVENTURE!"/>
			</a>
			<a href="../past/pclore.html" title = "To Player Character Lore">
				<img src="../images/player%20button.png" alt="Player Character Lore"/>
			</a>
			<a href="../past/flore.html" title = "To Follower Lore">
				<img src="../images/follower%20lore%20button.png" alt="Follower Lore"/>
			</a>
			<a href="../tychicus/tychicus.html" title = "To The Home Country!">
				<img src="../images/tychicus%20button.png" alt="To The Home Country!"/>
			</a>
			<a href="../index.php" title = "To The Home Country!">
				<img src="../images/world%20map%20button.png" alt="To The Home Country!"/>
			</a>
			<a href="../past/past.php" title = "To The records of Past Contracts!">
				<img src="../images/past%20button.png" alt="To The Past!"/>
			</a>
			<?php
			if(isset($_SESSION['type']) && !strcasecmp($_SESSION['type'],"dungeonmaster")){ ?>
				<a href="../dm/hub.php" title="To DungeonMaster HUB"> 
				<img src="../images/dm%20button.png" alt="DM Hub"/>
			</a>
			<?php } ?>
	</div>
</body>
</HTML>

