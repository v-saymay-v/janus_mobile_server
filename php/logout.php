<?php
/*
UserSpice 2.5.6
by Dan Hoover at http://UserSpice.com

based on
UserCake Version: 2.0.2


UserCake created by: Adam Davis
UserCake V2.0 designed by: Jonathan Cassels

Please note that this version uses technology that some consider
to be outdated. This version is designed as a cosmetic upgrade for
users of 2.0.2 and as a path towards development of version 3.0 and beyond
*/

require_once("app.php");
$app = new room_app();
if (isset($app->loggedInUser)) {
	$app->mysqli->begin_transaction();
	$stmt = $app->mysqli->prepare("UPDATE ht_user SET c_access_key=null,c_access_ip=null WHERE n_user=?");
	$stmt->bind_param("i", $app->loggedInUser->user_id);
	$stmt->execute();
	$stmt->close();
	$app->mysqli->commit();
	$app->loggedInUser->userLogOut();
	header("Location: index.php");
	//die();
} else {
?>
<!DOCTYPE html>
<html lang="jp-JP">
<head>
<title>ログアウト - Room</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<html>
<body>
ログインされていません。
</body>
</html>
<?php
}
?>
