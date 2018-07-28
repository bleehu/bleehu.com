<!DOCTYPE HTML>
<HTML>
	<head>
		<title>ECHO TEAM - GUNS</title>
		<Link id="style" rel="StyleSheet" href="echo.css" type="text/css">
		<script src="Agent.js"></script>
	</head>
	<body>
	<div class="container">
		<h1> ECHO TEAM </h1>
		<h3> GUNS </h3>
		<div id="ticker"> </div>
		<?php
			$globs = glob("guns/*");
			$guns = array();
			foreach($globs as $glob){
				if(is_dir($glob)){
					$guns[] = $glob;
				}
			}
		?>
		<div class="links"> 
			<div>
			<?php for($i = 0; $i < count($guns); $i++){
				$gun = explode("/",$guns[$i]);
				$gun = $gun[1];
				if($i % 3 == 0){ ?>
				<ul>
					<?php } ?>
				
					<li><a href="#<?= $gun?>"> 	<?= $gun?>	</a></li>
					<?php if($i % 3 == 2){ ?>
				</ul>
					<?php }} ?>
				<ul>
					<li><a href="index.html"> 	HOME 		</a></li>
				</ul>
			</div>
			<img src="images/logo.png" ID="logo" alt="ECHO TEAM LOGO">
		</div>
		<?php foreach ($guns as $glob){
		$gun = explode("/",$glob);
		$gun = $gun[1];
		$bottomline = file("guns/" . $gun . "/bottom line.txt");
		$fullname = file_get_contents("guns/" . $gun . "/name.txt");
		$paragraphs = file("guns/" . $gun . "/content.txt");
		?>
		<div class="gun content" id="<?= $gun ?>">
			<h2> <?=$gun?> </h2>
			<img src="images/guns/<?=$gun?>.jpg" alt="<?=$fullname?>" title="<?=$fullname?>"/>
			<?php foreach($paragraphs as $p){ ?>
				<p> <?= $p ?> </p>
			<?php } ?>
					<div class="bottomline">
						<ul>
						<?php foreach($bottomline as $line){ ?>
							<li> <?= $line ?> </li>
							<?php } ?>
						</ul>
					</div>
		</div> <?php } ?>
		
		<div>
			<button onclick="switchTheme()"> Theme </button>
			<p> <a href="#ticker"> back to top </a> </p>
		</div>
	</div>
	</body>
</HTML>