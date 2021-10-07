<?php
require_once ("app.php");

function error_die($line, $mess, $stmt = null) {
	global $app;

	error_log($line.":".$mess."(".$app->mysqli->error.")");
	syslog(LOG_ERR, $line."(".$line."): ".$mess."(".$app->mysqli->error.")");
	if ($stmt) {
		$stmt->close();
	}
	$app->mysqli->rollback();

	$data = array("result" => -1, "result_string" => $line.":".$mess);
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$userid = $_POST['user'];
$token = urldecode($_POST['token']);
$voip = $_POST['voip'];
$debug = $_POST['debug'];

$app = new room_app($token);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare(
	" update ht_janusmobile set".
	" `c_voip_token` = ?".
	",`b_debug_token` = ?".
	" where `n_user` = ?");
if (!$stmt) {
	error_die(__LINE__, "クエリに失敗しました", $stmt);
}
$stmt->bind_param("sii", $voip, $debug, $app->loggedInUser->user_id);
if (!$stmt->execute()) {
	error_die(__LINE__, "クエリに失敗しました", $stmt);
}
$app->mysqli->commit();

$data = array("result" => 0, "result_string" => "保存しました");
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
