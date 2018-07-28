<?php
	session_start();
	if(!$_SESSION['type']){
		header('location:index.php?login=not_a_DM');
	}
	$contractClass = htmlspecialchars($_POST["class"]);
	if($contractClass != "Choose a Type"){
		$doc = new DOMDocument();
		$doc->preserveWhiteSpace = false;
		$doc->formatOutput = true;
		$doc->Load('contracts.xml');
		//get root
		$root = $doc->getElementsByTagName("contracts")->item(0);
		//create contract tag
		$contract = $doc->createElement("contract");
		$contract->setAttribute("class", $contractClass);
		$title = $doc->createElement("name");
		$titleNode = new DOMText(htmlspecialchars($_POST["title"]));
		$title->appendChild($titleNode);
		$description = $doc->createElement("description");
		$descriptionNode = new DOMText(htmlspecialchars($_POST["description"]));
		$description->appendChild($descriptionNode);
		//append the kiddies
		$contract->appendChild($title);
		$contract->appendChild($description);
		$root->appendChild($contract);
		$doc->save('contracts.xml');
		header("location: ../followers.php?panic=success");
	} else { ?>
		<html>
			<head>
				<title>ERROR</title>
			</head>
			<body>
				<h1>Uh oh!</h1>
				<p>There was an error with the contract you tried to post.</p>
				<p>Did you make sure to select a class for the contract?</p>
			</body>
		</html>
	<?php
	}
?>