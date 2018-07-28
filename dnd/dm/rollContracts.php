<?php
	session_start();
	if($_SESSION["user"]){
	$followersDoc = new DOMDocument();
	$followersDoc->preserveWhiteSpace = false;
	$followersDoc->formatOutput = true;
	$followersDoc->Load('../followers/followers.xml');
	$followersArray = $followersDoc->getElementsByTagName("follower");
	
	$contractsDoc = new DOMDocument();
	$contractsDoc->preserveWhiteSpace = false;
	$contractsDoc->formatOutput = true;
	$contractsDoc->Load('../followers/contracts.xml');
	$contracts = $contractsDoc->getElementsByTagName("contract");
	
	$unwrittenDoc = new DOMDocument();
	$unwrittenDoc->preserveWhiteSpace = false;
	$unwrittenDoc->formatOutput = true;
	$unwrittenDoc->Load('unwritten.xml');
	$unwrittenRoot = $unwrittenDoc->getElementsByTagName("root")->item(0);
	
	foreach ($contracts as $contract_n){
		#create new contract tag
		$missionTitle = $contract_n->getElementsByTagName("name")->item(0)->nodeValue;
		
		#acrue all followers on mission
		$adventurers = array();
		$roll = 0;
		foreach ($followersArray as $follower_n){
			$followerContract = $follower_n->getElementsByTagName("mission")->item(0)->nodeValue;
			
			if($followerContract == $missionTitle){
				$adventurers[] = $follower_n;
				$roll += rand(1,20);
			}
		}
		
		#if anyone did the contract, submit to-write form
		if($roll > 0){
			#collect relevant mission info
			$missionDescription = $contract_n->getElementsByTagName("description")->item(0)->nodeValue;
			$contractors = "";
			foreach($adventurers as $i){
				$contractors .= ($i->getAttribute("name")) . ", ";
			}
		
			#construct and append
			$newContract = $unwrittenDoc->createElement('contract','');
			$newContract->setAttribute("title", $missionTitle);
			$newContract->setAttribute("roll", $roll);
			$newDescription  = $unwrittenDoc->createElement('prompt',$missionDescription);
			$newFollowers = $unwrittenDoc->createElement('followers', $contractors);
			$newContract->appendChild($newDescription);
			$newContract->appendChild($newFollowers);
			$unwrittenRoot->appendChild($newContract);
		}
	}
	$unwrittenDoc->save('unwritten.xml');
	header('location: hub.php?panic=success'); ?> 
	
	</body>
	</html>
	
	<?php
	} else { ?>
	<html>
		<head>
			<title>Please Log in</title>
		</head>
		<body>
			<h2>Please log in.</h2>
		</body>
	</html>
	<?php
	}
?>