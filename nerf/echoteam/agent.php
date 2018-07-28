<!DOCTYPE HTML>
<HTML>
	<head>
	<?php 
		$agent = "unknown";
		if(isset($_GET["agent"])) {
			$agent = $_GET["agent"];
		}
		if(file_exists($agent . "/info.txt")) {
			list($name, $number, $bio1, $bio2) = file($agent . "/info.txt");
		} else {
			list($name, $number, $bio1, $bio2) = file("unknown/info.txt");
		}
	?>
	<title> ECHO TEAM - <?=$agent?> </title>
	<Link rel="StyleSheet" href="echo.css" type="text/css">
	<Script src="Agent.js"></script>
	
	</head>
	<body>
		<div class="container">
			<h1> ECHO TEAM </h1>
			<h3> <?=$name?> </h3>
			<div class="mugshot">
				<?php if(file_exists("images/members/" . $agent . ".jpg")) { ?>
				<img src="images/members/<?=$_GET["agent"]?>.jpg" alt="<?=$name ?>" class="mugshot"
					title="<?=$name?>" />
				<?php } else { ?>
				<img src="images/members/unknown.jpg" alt="photo unavailable!" class="mugshot"
					title="photo unavailable!">
				<?php } ?>
				<p> <?=$number?>: <?=$name?> </p>
			</div>
			<div class="bio">
				<dl>
				<?php
					$stats = array("Feild Stats|Unavailable");
					if(file_exists($agent . "/stats.txt")){
						$stats = file($agent . "/stats.txt");
					}
					foreach($stats as $stat) {
						list($dt, $dd) = explode("|",$stat);
				?>
					<dt><?=$dt?>:</dt>
					<dd> <?=$dd?> </dd>
				<?php } ?>
				</dl>
				<p><?=$bio1?></p>
				<p><?=$bio2?></p>
			</div>
			<div class="medals">
				<h3> Medals </h3>
				<?php medals($agent) ?>
			</div>
			<div class="history">
				<?php history($agent) ?>
				
			</div>
			<div class="links">
				<p> <a href="index.html"> home </a> </p>
			</div>
		</div>
	</body>
</HTML>
<?php 
 function medals($agent){
					if(file_exists($agent . "/medals.txt")) {
					$medals = file($agent . "/medals.txt");
					if(trim($medals[0])) {
						$infected = "Infected";
					} else {
						$infected = "Infect";
					}
					if(trim($medals[1])) {
						$sock = "Socked";
					} else {
						$sock = "Sock";
					}
					if(trim($medals[2])) {
						$stun = "Stunned";
					} else {
						$stun = "Stun";
					}
					if(trim($medals[3])) {
						$super = "supered";
					} else {
						$super = "super";
					}
					if(trim($medals[4])) {
						$krypton = "kryptonited";
					} else {
						$krypton = "kryptonite";
					}
					if(trim($medals[5])) {
						$oz = "ozed";
					} else {
						$oz = "oz";
					}
					if(trim($medals[6])) {
						$gaurd = "gaurded";
					} else {
						$gaurd = "gaurd";
					}
					if(trim($medals[7])) {
						$mon = "mondayed";
					} else {
						$mon = "monday";
					}
				?>
				<img src="images/medals/<?=$infected?>.png" alt="Infected Medal" title="Tagged a human and ate their brains!" class="medal">
				<img src="images/medals/<?=$sock?>.png" alt="Socked Medal" title="Stunned a zombie with a sock!" class="medal">
				<img src="images/medals/<?=$stun?>.png" alt="Stunned Medal" title="Stunned a zombie with a Nerf Gun!" class="medal">
				<img src="images/medals/<?=$super?>.png" alt="Super Medal" title="Eaten 10 Brains!" class="medal">
				<img src="images/medals/<?=$krypton?>.png" alt="Kryptonite Medal" title="Stun a Super Zombie!" class="medal">
				<img src="images/medals/<?=$oz?>.png" alt="The Wizard Medal" title="Stun an Original Zombie!" class="medal">
				<img src="images/medals/<?=$gaurd?>.png" alt="Gaurdian Angel Medal" title="Save a fellow Echo Agent from a near-death experience!" class="medal">
				<img src="images/medals/<?=$mon?>.png" alt="Monday Medal" title="Survive a day in the apocalypse!" class="medal">
				<?php 
					} else {
				?>
				<p> Official Records of service in action unlisted. </p>
				<?php }
 }
?>

<?php 
 function history($agent){
					if(file_exists($agent . "/history.txt")) {
					$history = file($agent . "/history.txt");
					foreach($history as $lines) { 
						list($quarter, $survived, $stunned, $eaten, $used) = explode("|",$lines);
					?>
						<h3><?=$quarter?></h3>
						<dl>
							<dt>Survived until:</dt>
							<dd><?=$survived?></dd>
							<dt>Zombies Stunned:</dt>
							<dd><?=$stunned?></dd>
							<dt>Brains Eaten:</dt>
							<dd class="brainsEaten"> <?=$eaten?></dd>
							<dt>Main weapon:</dt>
							<dd><?=$used?></dd>
						</dl>
				<?php
						}
					} else {
				?>
				<p> Previous deployment records unlisted. </p>
				<?php }
 }
?>