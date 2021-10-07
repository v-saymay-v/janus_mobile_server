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
  error_die(__LINE__."not logged in");
  header('Location: index.php');
	die();
}

$tag = isset($_GET['tag'])?$_GET['tag']:(isset($_POST['tag'])?$_POST['tag']:'');

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare("UPDATE `ht_voicemail` set `d_read` = now() where c_tag = ?");
if (!$stmt) {
  error_die(__LINE__, "failed to listen voicemail");
}
$stmt->bind_param('s', $tag);
$result = $stmt->execute();
$stmt->close();

if ($result) {
  $app->mysqli->commit();
} else {
  $app->mysqli->rollback();
}

header('Location: index.php?voicemailtag='+$tag);
?>
