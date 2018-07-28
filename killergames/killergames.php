<!DOCTYPE html>
<html>
<head>
	<title>Killingsworth Games</title>
	<meta charset="UTF-8">
	<link href="killer.css" type="text/css" rel="stylesheet"></link>
	<script type="text/javascript" src="killer.js"> </script>
</head>
	<body>
		<div id="toolbar">
			<p><a href="#intro">
			Back to top
			</a></p>
			<h3>
			<a href="#consoletitle">
			Console
			</a>
			</h3>
			<ul>
			<li>Atari 2600 4 switch</li>
			<li>Atari 2600 Light Sixer</li>
			<li>Atari Flashback</li>
			<li>Intellivision</li>
			<li>INTV System III</li>
			<li>Gamecube</li>
			<li>Nintendo 64 A.K.A. N64</li>
			<li>Playstation A.K.A. PS1</li>
			<li>Playstation 2 A.K.A. PS2</li>
			<li>Sega Genesis Gen 2</li>
			<li>Xbox</li>
			<li>Xbox 360</li>
			</ul>

			<h3>
			<a href="#handtitle">
			Hand Held
			</a>
			</h3>
			<ul>
			<li>Game Boy A.K.A. Brick</li>
			<li>Game Boy Pocket</li>
			<li>Game Boy Color</li>
			<li>Game Boy Advance</li>
			<li>Game Gear</li>
			<li>Nintendo 3DS</li>
			<li>PSP Gen 1</li>
			</ul>
		</div>
		<h1 id="banner">Killingsworth Game Rentals</h1>
		<div id="container">
		<img src="images/logo.jpg" alt="Logo" id="logo">
			<div id="intro">
				<p>
				 E-mail me at killingsworthgames@gmail.com for any questions 
				 about the service or to find out the availability on any 
				 particular item, and I will get back to you as soon as 
				 possible. I currently only serve the Kent/Covington area, 
				 but if you live in or close to Auburn then I would highly 
				 recommend Gamebreakerz.
				</p>
				<div class="price">
					<p>Console rental for 1 month: $10 Includes:
					<ul>
					<li>1 console </li>
					<li>1 A/V cable </li>
					<li>1 power cable </li>
					<li>2 controllers </li>
					<li>1 game of your choice </li>
					</ul> </p>
					<p>Additional games are $1 each.</p>
					<p>Additional controllers are $5 each </p>
					<p>Each additional month after first month is $5 plus $1 for each game </p>
				</div>
				<div class="price">
				<p>Hand Held rental for 1 month: $10 Includes:
				<ul>
				<li>1 hand held </li>
				<li>1 set of new batteries </li>
				<li>2 games of your choice </li>
				</ul>
				</p>
				<p>Additional games are $1 each </p>
				<p>Each additional month after first month is $5 plus $1 for each game. </p>
				</div>
				<p>
				<strong>ALL RENTALS BE NO LONGER THEN 6 MONTHS. </strong>
				Any missing or broken anything will result in replacement of said thing.
				</p>
			</div>
			<h1 id="consoletitle">Consoles</h1>
		<?php
		//collect all of the things and then check for directories
		$globs = glob("consoles/*");
		$consoles = array();
		foreach($globs as $glob){
			if(is_dir($glob)){
				$temp = explode("consoles/", $glob);
				array_push($consoles,$temp[1]);
			}
		}
		//write all of the consoles
		foreach($consoles as $console){
			$path = 'consoles/' . $console . '/games.txt';
			$ispath = is_file($path);
			$gamesFile = file($path);
			?>
			<div class="console" id="<?=$console?>">
				<h2><?= $console ?></h2>
				<ul>
				<?php 
				//write all of the games
				foreach($gamesFile as $game){
					try{
						list($title, $company, $rating) = explode("|",$game);
						if($rating == ""){
							$rating = "?";
						}
					} catch (Exception $e)
					{
						$title = "ERROR";
						$rating = "ERROR";
						$company = "ERROR";
					}
				?>
				<li> 
				<strong><?= $title ?></strong> by 
				<?= $company ?>. Rated <?= $rating?> </li>
				<?php
				}
				?>
				</ul>
			</div>
		
		<?php
		}
		?>
			<!--        end of console games listing       -->
			<h1 id="handtitle">Handhelds</h1>
			<?php
			$globs = glob("handhelds/*");
		$consoles = array();
		foreach($globs as $glob){
			if(is_dir($glob)){
				$temp = explode("handhelds/", $glob);
				array_push($consoles,$temp[1]);
			}
		}
		//write all of the consoles
		foreach($consoles as $console){
			$path = 'handhelds/' . $console . '/games.txt';
			$ispath = is_file($path);
			$gamesFile = file($path);
			?>
			<div class="console" id="<?=$console?>">
				<h2><?= $console ?></h2>
				<ul>
				<?php 
				//write all of the games
				foreach($gamesFile as $game){
					try{
						list($title, $company, $rating) = explode("|",$game);
						if($rating == ""){
							$rating = "?";
						}
					} catch (Exception $e)
					{
						$title = "ERROR";
						$rating = "ERROR";
						$company = "ERROR";
					}
				?>
				<li> <strong><?= $title ?></strong> by <?= $company ?>. Rated <?= $rating?> </li>
				<?php
				}
				?>
				</ul>
			</div>
		
		<?php
		}
		?>
		</div>
	</body>
</html>