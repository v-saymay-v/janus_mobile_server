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

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare("select count(*) from ht_user where n_group = ?");
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
$stmt->bind_param('i', $group_id);
$stmt->execute();
$stmt->bind_result($count);
if (!$stmt->fetch()) {
    error_die(__LINE__, "グループが見つかりませんでした", $stmt);
}
$stmt->close();

if ($count > 0) {
    error_die(__LINE__, "指定されたグループに属するユーザーが存在するため削除できません");
}

$app->mysqli->begin_transaction();

$stmt = $app->mysqli->prepare("delete from ht_group where n_group = ?");
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
$stmt->bind_param('i', $group_id);
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
