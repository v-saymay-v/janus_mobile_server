<?php
require_once("app.php");

function error_die($line, $mess, $stmt = null) {
	global $app;

	error_log($line.":".$mess."(".$app->mysqli->error.")");
  syslog(LOG_ERR, $line.":".$app->mysqli->error);
	if ($stmt) {
		$stmt->close();
	}
	$app->mysqli->rollback();

  syslog(LOG_ERR, __LINE__.": ".$mess);
  header('Location: index.php');
	die();
}

$app = new room_app();
if (!isset($app->loggedInUser)) {
  error_die(__LINE__, "not logged in");
}

$tag = isset($_GET['tag'])?$_GET['tag']:(isset($_POST['tag'])?$_POST['tag']:'');
$pairs = explode('_', $tag);

if ($pairs[0] == 'meeting') {
  header('Location: room.php?roomId='+$pairs[1]);
} else {
  header('Location: index.php');
}
?>
