<?php
require_once("app.php");

function error_die($line, $mess, $stmt = null)
{
	global $app;

	error_log($line.":".$mess."(".$app->mysqli->error.")");
	syslog(LOG_ERR, $line.":".$app->mysqli->error);
	if ($stmt) {
		$stmt->close();
	}
	$app->mysqli->rollback();

	$data = array("result" => -1, "result_string" => $mess);
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$session = $_POST['token'];
$userid = $_POST['userid'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
	error_die(__LINE__, "ログインされていません");
}

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare("DELETE from ht_meeting_users WHERE n_user = ?");
if ($stmt) {
  $stmt->bind_param("i", $userid);
  $result = $stmt->execute();
  $stmt->close();
} else {
  error_die(__LINE__, "ゲストの削除に失敗しました");
}
$stmt = $app->mysqli->prepare("DELETE from ht_user WHERE n_user = ?");
if ($stmt) {
  $stmt->bind_param("i", $userid);
  $result = $stmt->execute();
  $stmt->close();
} else {
  error_die(__LINE__, "ゲストの削除に失敗しました");
}
$app->mysqli->commit();

$data = array("result" => 0, "userid" => $userid, "result_string" => "ゲストを削除しました");
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
