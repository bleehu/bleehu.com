<?php
	session_start();
	$users = file('profiles.txt');
	for($n = 0; $n < count($users); $n++){
		list($user,$password,$logins,$type) = explode('|',$users[$n]);
		$user = strtolower($user);
		$pass = strtolower($pass);
		if($user == $_POST['user']){
			if($password == $_POST['pass']){
				//increment logins
				$counter = (int)file_get_contents ('count.txt');
				$counter++;
				file_put_contents ('count.txt',$counter);
				
				$logins++;
				
				
				if($_POST['remember'] == 'true'){
					setcookie("DnDProfile", $user . "|" . $password, (time() * 60 * 60 * 24 * 30));
				}
				$_SESSION['user'] = trim($user);
				$_SESSION['type'] = trim($type);
				$_SESSION['logins'] = trim($logins);
				
				$users[$n] = $user . '|' . $password . '|' . (int)$logins . '|' . $type;
				//update users to increment logins
				file_put_contents ('profiles.txt',$users);
				
				header('location:index.php?login=true');
			} else { ?>
				<!DOCTYPE html>
				<html>
					<head>
						<title>DOH!</title>
						<meta charset="UTF-8">
					</head>
					<body>
						<h2> PASSWORD INCORRECT! </h2>
					</body>
				</html>
				<?php
			}
		}
	}
	echo('User not found!');
?>