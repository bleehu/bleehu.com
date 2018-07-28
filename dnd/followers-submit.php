<?php
		session_start();
		if($_SESSION['user']){
			$doc = new DOMDocument();
			$doc->preserveWhiteSpace = false;
			$doc->formatOutput = true;
			$doc->Load('followers/followers.xml');
			
			$followers = $doc->getElementsByTagName("follower");
			$follower = null;
			
			foreach($followers as $potential){
				if(strcasecmp($potential->getAttribute('name'),$_POST["follower"]) == 0)
				{
					$follower = $potential;
				}
			}
			if($follower == null){ ?>
				<html>
					<head>
						<meta charset="UTF-8">
						<title> ERROR! Follower Not Found! </title>
					</head>
					<body>
						<h1>Follower not found error!</h1>
						<p>could not find follower: "<?=$_POST['follower']?>" in follower files!</p>
						<p>You should head back to the <a href="followers.php"> followers page</a>.</p>
					</body>
				</html>
			<?php }
			$mission = $follower->getElementsByTagName("mission")->item(0);
			$missionNode = new DOMText(htmlspecialchars($_POST["contract"]));
			$mission->appendChild($missionNode);
			
			$doc->save('followers/followers.xml');
			
			//increment web score
			$users = file('profiles.txt');
			for($n = 0; $n < count($users); $n++){
				list($user,$password,$logins,$type) = explode('|',$users[$n]);
				$user = strtolower($user);
				$pass = strtolower($pass);
				if($user == $_SESSION['user']){
						$logins += 15;
						$_SESSION['logins'] = $logins;
						$users[$n] = $user . '|' . $password . '|' . (int)$logins . '|' . $type;
						//update users to increment logins
						file_put_contents('profiles.txt', $users);
					}
			}
			file_put_contents('profiles.txt',$users);
			//end increment
			
			header("location: followers.php?panic=success");
		} else {
		header("HTTP/1.0 403 Forbidden");
		}
		?>
<html>
	<head>
	</head>
	<body>
		<p>Something weird happened. Please tell Mike H.</p>
		<?php
		if($mission){
			echo("<p>" . $mission . "</p>");
		}
		if($mission){
			echo("<p>" . $mission . "</p>");
		}
		if($mission){
			echo("<p>" . $mission . "</p>");
		}
		?>
		<p>You should head back to the <a href="followers.php"> followers page</a>.</p>
	</body>
</html>