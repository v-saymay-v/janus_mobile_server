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
	$data = array("result" => -1, "result_string" => $mess);
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$app = new room_app();
if (!isset($app->loggedInUser)) {
	error_die(__LINE__, "ログインされていません");
}

$userid = $_POST['userid'];

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_subscription` = NULL WHERE `n_user` = ?");
if (!$stmt) {
  error_die(__LINE__, "サブスクリプションの追加に失敗しました");
}
$stmt->bind_param("i", $userid);
$result = $stmt->execute();
if (!$result) {
  error_die(__LINE__, "サブスクリプションの追加に失敗しました", $stmt);
}
$stmt->close();
$app->mysqli->commit();

$data = array("result" => 0, "result_string" => "サブスクリプションを解除しました");
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
