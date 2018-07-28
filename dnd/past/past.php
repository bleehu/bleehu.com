<?php
	session_start();
	//the above loads the session variables. It must be the first thing on a page.
?>
<!DOCTYPE html>
<html>
<head>
		<title>Past Actions</title>
		<link href="past.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="past.js"> </script>
		<meta charset="UTF-8">
		<link rel="icon" href="../images/sword.ico" type="image/x-icon">
</head>
<body>
		<div id="loginBar">
			<?php 
				if(isset($_SESSION['user'])){
			?>
				<p> Welcome, <?=$_SESSION['user']?> </p>
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
		<div id = "past" class = "content">
		<!--Javascript puts stuff here-->
		</div>
		<!--Begin discussion board-->
		<div class="content">
			<h3>Discussion Board</h3>
			<p>This is a place to discuss recent events, suggest new contracts and 
				request clarification on status reports. PLEASE PLEASE PLEASE 
				SUGGEST NEW CONTRACTS!!!</p>
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
		
		<!--Link bar-->
		<div class="content" id="toolbar">
			<a href="../index.php" title="To World Map"> 
				<img src="../images/world%20map%20button.png" alt="Followers"/>
			</a>
			<a href="../followers.php" title="To experimental Follower coordination center"> 
				<img src="../images/follower%20button.png" alt="World Map"/>
			</a> 
			<a href="../rules/rules.html" title="To The Rules Index"> 
				<img src="../images/rules%20button.png" alt="Rules"/>
			</a>
			<a href="../adventures/adventures.php" title = "To ADVENTURE!!!!">
				<img src="../images/adventure%20button.png" alt="ADVENTURE!"/>
			</a>
			<a href="pclore.html" title = "To Player Character Lore">
				<img src="../images/player%20button.png" alt="Player Character Lore"/>
			</a>
			<a href="flore.html" title = "To Follower Lore">
				<img src="../images/follower%20lore%20button.png" alt="Follower Lore"/>
			</a>
			<a href="../tychicus/tychicus.html" title = "To The Home Country!">
				<img src="../images/tychicus%20button.png" alt="To The Home Country!"/>
			</a>
			<a href="../past/past.php" title = "To The records of Past Contracts!">
				<img src="../images/past%20button.png" alt="To The Past!"/>
			</a>
			<?php
			//DM button only appears if DM is logged in.
			if(isset($_SESSION['type']) && !strcasecmp($_SESSION['type'],"dungeonmaster")){ ?>
				<a href="../dm/hub.php" title="To DungeonMaster HUB"> 
				<img src="../images/dm%20button.png" alt="DM Hub"/>
			</a>
			<?php } ?>
		</div>
</body>
</html>