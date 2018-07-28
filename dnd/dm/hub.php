<?php
	session_start();
	if(!$_SESSION['type']){
		header('location:index.php?login=tryagain');
	}
?>
<html>
	<head>
		<title>Welcome to the DMs Hub!</title>
		<meta charset="UTF-8"></meta>
		<link href="dm.css" rel="stylesheet"></link>
		<script type="text/javascript" src="dm.js"></script>
	</head>
	<body>
		<h1>Welcome, DungeonMaster.</h1>
		<div id="container">
			<div id="followers" class="panel">
				<!-- Javascript puts stuff here -->
				
			</div>
			
			<div id="contracts" class="panel">
				<h2>Contracts to write</h2>
				<!-- Javascript puts stuff here -->
			</div>
			<div id="newFollower" class="panel">
				<h2>Create a New Follower</h2>
				<input id="followName" placeholder="Followers name">
				<select id="followClass">
					<option>Mage</option>
					<option>Assassin</option>
					<option>Leader</option>
				</select>
				<input id="followStat0" placeholder="Stat Name">
				<input id="followStat1" placeholder="Stat Name">
				<input id="followStat2" placeholder="Stat Name">
				<input id="followNote" placeholder="notes">
				<input type="button" value="Make">
			</div>
			
			<div id="budgetPanel" class="panel">
				<h3>Budget</h3>
				<p id="budgetTotal"><strong>current budget: </strong></p>
				<p id="budgetMonth"><strong>current month: </strong></p>
				<input type="checkbox" value="arm" id="armBudgetMonth">
				<input type="button" value="advance budget month" id="budgetButton">
			</div>
			
			<div id="loadContracts" class="panel">
				<h3>Roll Contracts</h3>
				<input type="checkbox" value="arm" id="armContracts">
				<input type="button" value="Roll Contracts" id="rollButton">
			</div>
			
			<div id="newAdventures" class="panel">
				<fieldset>
					<legend>New Adventure</legend>
					<p>
						<label for="adventureTitle">Title</label>
						<input name="adventureTitle" id="adventureTitle">
					</p> <p>
						<label for="adventureSize">Party Size</label>
						<input name="adventureSize" id="adventureSize">
					</p> <p>
						<label for="adventureStart">Start Location</label>
						<input name="adventureStart" id="adventureStart">
					</p>
					<textarea name="adventureDiscription" id="adventureDiscription">The description for the adventure.</textarea>
					<input id="newAdventureButton" type="submit" 
						value="Post New Adventure">
				</fieldset>
			</div>
			
			<div id="newContract" class="panel">
				<fieldset>
					<legend>New Contract</legend>
					<p>
						<label for="contractTitle">Title</label>
						<input name="contractTitle" id="contractTitle">
					</p> 
					<select id="contractClass">
						<option value="Choose a Type">Choose a Type</option>
						<option value="assassin">Assassin</option>
						<option value="mage">Mage</option>
						<option value="leader">Leader</option>
						<option value="cleric">Cleric</option>
						<option value="player">Player</option>
					</select>
					<textarea name="contractDiscription" id="contractDiscription">The description for the contract.</textarea>
					<input id="newContractButton" type="submit" 
						value="Post New Contract">
				</fieldset>
			</div>
		</div>
		<div id="toolbar">
			<a href="../followers.php" title="To experimental Follower coordination center"> 
				<img src="../images/follower%20button.png" alt="Followers"/>
			</a> 
			<a href="../rules/rules.html" title="To The Rules Index"> 
				<img src="../images/rules%20button.png" alt="Rules"/>
			</a>
			<a href="../adventures/adventures.php" title = "To ADVENTURE!!!!">
				<img src="../images/adventure%20button.png" alt="ADVENTURE!"/>
			</a>
			<a href="../pclore.html" title = "To Player Character Lore">
				<img src="../images/player%20button.png" alt="Player Character Lore"/>
			</a>
			<a href="../flore.html" title = "To Follower Lore">
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
	</div>
	</body>
</html>