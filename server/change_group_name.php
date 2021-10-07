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
$group_id = $_GET['id'];
$group_name = $_GET['group'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$app->mysqli->begin_transaction();

$stmt = $app->mysqli->prepare("update ht_group set c_name = ? where n_group = ?");
$stmt->bind_param('si', $group_name, $group_id);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->close();

$app->mysqli->commit();

$data = array("result" => 0, "group_id" => $group_id, "group_name" => $group_name);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
