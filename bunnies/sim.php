<?php
	if(isValid()){
		//compile bunny xml
		//---this is bad style. Switch to xml object
		$xml = "<bunny>\n<name>" . $_POST["bunny"] . "</name>\n" .
			"<age>". $_POST["age"] ."<\age>\n".
			"<\bunny>";
		
		
		//write bunny to appropriate file
		file_put_contents('bunnies/&_POST["bunny"]/bunny.text',$xml);
	} else {
		
	}
	
	function isValid(){
	if(!isset($_POST["bunny"])){
		return false;
	}
	if(!isset($_POST["age"])){
		return false;
	}
	return true;
	}
?>