<?php
	session_start();
	if($_SESSION['user']){
		#open contracts doc to save finalized contract to
		$pastDoc = new DOMDocument();
		$pastDoc->preserveWhiteSpace = false;
		$pastDoc->formatOutput = true;
		$pastDoc->Load('../past/past.xml');
		$pastRoot = $pastDoc->getElementsByTagName("past")->item(0);
		
		#open unwritten doc to erase finished file from to-do list
		$unwrittenDoc = new DOMDocument();
		$unwrittenDoc->preserveWhiteSpace = false;
		$unwrittenDoc->formatOutput = true;
		$unwrittenDoc->Load('unwritten.xml');
		$unwrittenRoot = $unwrittenDoc->getElementsByTagName("root")->item(0);
		
		#collect contract variables
		$result = $_POST['result'];
		$followers = $_POST['followers'];
		$mission = $_POST['mission'];
		$month = 10;
		
		#create finalized contract
		#story tag (unit container)
		$storyTag = $pastDoc->createElement("story");
		$storyTag->setAttribute("month", $month);
		#followers tag
		$followersTag = $pastDoc->createElement("follower");
		$followersTag->nodeValue = $followers;
		$storyTag->appendChild($followersTag);
		#contract tag
		$contractTag = $pastDoc->createElement("contract");
		$contractTag->nodeValue = $mission;
		$storyTag->appendChild($contractTag);
		#result tag
		$resultTag = $pastDoc->createElement("result");
		$resultTag->nodeValue = $result;
		$storyTag->appendChild($resultTag);
		
		$pastRoot->appendChild($storyTag);
		
		#find and remove old unwritten contract
		#find contract
		$maybeDeletes = $unwrittenDoc->getElementsByTagName("contract");
		foreach($maybeDeletes as $considering){
			$participents = $considering->getElementsByTagName('followers')->item(0);
			$partString = $participents->nodeValue;
			$pattern = '/' . $followers . '/i';
			$matches = preg_match( $pattern, $partString);
			
			if($matches){
				$deleteMe = $considering;
			}
		}
		#remove contract
		$parent = $deleteMe->parentNode;
		$parent->removeChild($deleteMe);
		
		#save changes to the documents
		$unwrittenDoc->Save('unwritten.xml');
		$pastDoc->Save('../past/past.xml');
		
		header('location: ../past/past.php');
	} else {
		ECHO("ERROR: Login fail");
	}
?>