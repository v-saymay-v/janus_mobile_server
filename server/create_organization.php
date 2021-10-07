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
$company = $_GET['company'];
$hotbiz = $_GET['hotbiz'];
$host = $_GET['host'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$app->mysqli->begin_transaction();

$stmt = $app->mysqli->prepare("select max(n_seq) from ht_company for update");
if (!$stmt) {
    error_die(__LINE__, "組織の追加に失敗しました");
}
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->bind_result($seq);
$stmt->close();

$stmt = $app->mysqli->prepare(
    " insert into ht_company (c_name,c_hotbiz_server,c_hotbiz_name,n_seq,d_create)".
    " values (?, ?, ?, ?, now()");
$stmt->bind_param('sssi', $company, $hotbiz, $host, $seq+1);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$company_id = $app->mysqli->insert_id();
$stmt->close();

$stmt = $app->mysqli->prepare("select max(n_seq) from ht_group where n_company = ? for update");
if (!$stmt) {
    error_die(__LINE__, "組織の追加に失敗しました");
}
$stmt->bind_param('i', $company_id);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
if (!$stmt->bind_result($seq)) {
    $seq = 0;
}
$stmt->close();

$stmt = $app->mysqli->prepare(
    " insert into ht_group (n_company,c_name,n_parent,n_seq,d_create)".
    " values (?, '管理者', 0, ?, now())");
$stmt->bind_param('ii', $company_id, $seq+1);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$group_id = $app->mysqli->insert_id();
$stmt->close();

$stmt = $app->mysqli->prepare("update ht_user set n_group = ? where n_user = ?");
$stmt->bind_param('ii', $group_id, $app->loggedInUser->user_id);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
if (!$stmt->bind_result($seq)) {
    $seq = 0;
}
$stmt->close();

$app->mysqli->commit();

$data = array("result" => 0, "group_id" => $group_id, "company_id" => $company_id);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
