<?php
		session_start();
		if($_SESSION['user']){
			$comment = htmlspecialchars($_POST['comment']);
			$pattern = '/[\n]/';
			$replacement = '<br/>';
			$newComment = preg_replace($pattern, $replacement, $comment);
			$pattern = '/[\|]/';
			$replacement = 'I';
			$newComment = preg_replace($pattern, $replacement, $newComment);
			$newString = "\n" . $_SESSION['user'] . "|" . $newComment;
			
			file_put_contents("discussion.txt", $newString, FILE_APPEND);
			
			//increment web score
			$users = file('../profiles.txt');
			for($n = 0; $n < count($users); $n++){
				list($user,$password,$logins,$type) = explode('|',$users[$n]);
				$user = strtolower($user);
				$pass = strtolower($pass);
				if($user == $_SESSION['user']){
						$logins += 5;
						$_SESSION['logins'] = $logins;
						$users[$n] = $user . '|' . $password . '|' . (int)$logins . '|' . $type;
						//update users to increment logins
						file_put_contents('../profiles.txt', $users);
					}
			}
			file_put_contents('../profiles.txt',$users);
			//end increment
			
			header("location: ../followers.php");
			
		} else {
		header("HTTP/1.0 403 Forbidden");
		}
		?>
<html>
	<head>
	</head>
	<body>
		<p>Something weird happened. Please tell Mike H.</p>
		<p>Are you signed in?</p>
		<p>You should head back to the <a href="followers.php"> followers page</a>.</p>
	</body>
</html>