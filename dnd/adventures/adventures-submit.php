<?php
		session_start();
		if($_SESSION['user']){
		$doc = new DOMDocument();
		$doc->preserveWhiteSpace = false;
		$doc->formatOutput = true;
		$doc->Load('suggestions.xml');
		//get adventure suggestions
		$adventures = $doc->getElementsByTagName("adventures");
		//get this suggestion
		$name = new DOMText(htmlspecialchars($_POST["name"]));
		$description = new DOMText(htmlspecialchars($_POST["description"]));
		//create new adventure node for them to live under
		$adventureNode = $doc->createElement("adventure");
		//create subsequent nodes
		$nameNode = $doc->createElement("name");
		$descriptionNode = $doc->createElement("description");
		//add text to nodes (nevermind, text was added to nodes in constructor)
		//$nameNode->textContent = $name;
		//$descriptionNode->textContent = $description;
		//the above changes the data in the .php file, but not in the DOM object
		$nameNode->appendChild($name);
		$descriptionNode->appendChild($description);
		//details to adventure
		$adventureNode->appendChild($nameNode);
		$adventureNode->appendChild($descriptionNode);
		$nameNode->appendChild($name);
		$descriptionNode->appendChild($description);
		//append adventure
		$adventures->item(0)->appendChild($adventureNode);
		//save the document
		$doc->save('suggestions.xml');
		header("location: adventures.php?panic=success");
		}
		?>
<html>
	<head> </head>
	<body>
	<p>Something weird happened. Please tell Daniel R.</p>
		<p>You should head back to the <a href="adventures.php"> adventure page</a>.</p>
	</body>
</html>
		
		