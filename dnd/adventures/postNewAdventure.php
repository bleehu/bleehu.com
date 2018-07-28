<?php
	session_start();
	$doc = new DOMDocument();
	$doc->preserveWhiteSpace = false;
	$doc->formatOutput = true;
	$doc->Load('adventures.xml');
	//get root
	$root = $doc->getElementsByTagName("adventures")->item(0);
	//create adventure tag
	$adventure = $doc->createElement("adventure");
	$adventure->setAttribute("class", "hard");
	$title = $doc->createElement("name");
	$titleNode = new DOMText(htmlspecialchars($_POST["title"]));
	$title->appendChild($titleNode);
	$size = $doc->createElement("size");
	$sizeNode = new DOMText(htmlspecialchars($_POST["size"]));
	$size->appendChild($sizeNode);
	$start = $doc->createElement("location");
	$startNode = new DOMText(htmlspecialchars($_POST["start"]));
	$start->appendChild($startNode);
	$description = $doc->createElement("description");
	$descriptionNode = new DOMText(htmlspecialchars($_POST["description"]));
	$description->appendChild($descriptionNode);
	//append the kiddies
	$adventure->appendChild($title);
	$adventure->appendChild($size);
	$adventure->appendChild($start);
	$adventure->appendChild($description);
	$root->appendChild($adventure);
	$doc->save('adventures.xml');
	header("location: adventures.php?panic=success");
?>