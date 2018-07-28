<?php
		if($_POST['pass'] == "trinity"){
			$doc = new DOMDocument();
			$doc->preserveWhiteSpace = false;
			$doc->formatOutput = true;
			$doc->Load('budget.xml');
			$items = $doc->getElementsByTagName("item");
			$root = $doc->getElementsByTagName("root")->item(0);
			$net = (int)$root->getAttribute('net');
			$month = (int)$root->getAttribute('month');
			$output = "\n---|---|---";
			
			foreach($items as $item){
				$output .= "\n";
				if($item->getAttribute('repeat')){
					$output .= "Month " . $month . ":";
				}
				$output .= $item->getElementsByTagName('name')->item(0)->textContent . "|";
				$output .= $item->getElementsByTagName('effect')->item(0)->textContent . "|";
				$net += (int)$item->getElementsByTagName('effect')->item(0)->textContent;
				$output .= '$' . $net;
				if(!$item->getAttribute('repeat')){
					$item->parentNode->removeChild($item);
				}
			}
			$month += 1;
			$root->setAttribute("month", $month);
			$root->setAttribute("net", $net);
			file_put_contents("budgetReport.txt",$output,FILE_APPEND);
			file_put_contents("budget.xml",$doc->saveXML());
			header("location:ramoth.php?authorization=success");
		} else {
		header("location:ramoth.php?authorization=fail");
		}
		header("location:ramoth.php");
	?>