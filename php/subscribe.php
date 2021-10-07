<?php
$userid = $_POST['userid'];
$subscription = $_POST['subscription'];

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

$stmt = $app->mysqli->prepare("SELECT `n_user`,`c_subscription` from `ht_user` where `n_user` = ?");
if (!$stmt) {
  error_die(__LINE__, "サブスクリプションの追加に失敗しました");
}
$stmt->bind_param('i', $userid);
$stmt->execute();
$stmt->bind_result($userid, $cursubscription);
$stmt->fetch();
$stmt->close();

if (empty($cursubscription)) {
  $app->mysqli->begin_transaction();
  $stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_subscription` = ? WHERE `n_user` = ?");
	if (!$stmt) {
		error_die(__LINE__, "サブスクリプションの追加に失敗しました");
	}
  $stmt->bind_param("si", $subscription, $userid);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "サブスクリプションの追加に失敗しました", $stmt);
	}
	$stmt->close();
  $app->mysqli->commit();
}

$data = array("result" => 0, "result_string" => "サブスクリプションを保存しました");
$data = json_encode($data);
if ($data) {
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
