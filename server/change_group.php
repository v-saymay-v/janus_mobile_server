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

$session = urldecode($_GET['token']);
$company_id = $_GET['company'];
$group_id = $_GET['group'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}
if (!empty($company_id) && $app->loggedInUser->company_id != $company_id) {
    error_die(__LINE__, "ログイン情報に誤りがあります");
}

$app->mysqli->begin_transaction();

$stmt = $app->mysqli->prepare("update ht_user set n_group = ? where n_user = ?");
$stmt->bind_param('ii', $group_id, $app->loggedInUser->user_id);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->close();

$app->mysqli->commit();

$data = array("result" => 0, "group_id" => $group_id);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
