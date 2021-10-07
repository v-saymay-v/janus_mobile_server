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
$group = $_GET['group'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$app->mysqli->begin_transaction();

$stmt = $app->mysqli->prepare("select max(n_seq) from ht_group where n_company = ? for update");
if (!$stmt) {
    error_die(__LINE__, "組織の追加に失敗しました");
}
$stmt->bind_param('i', $app->loggedInUser->company_id);
if (!$stmt->execute()) {
    error_die(__LINE__, "クエリに失敗しました", $stmt);
}
if (!$stmt->bind_result($seq)) {
    error_die(__LINE__, "クエリに失敗しました", $stmt);
}
if (!$stmt->fetch()) {
	$seq = 0;
}
$stmt->close();

$stmt = $app->mysqli->prepare(
    " insert into ht_group (n_company,c_name,n_parent,n_seq,d_create)".
    " values (?, ?, 0, ?, now())");
$seq += 1;
$stmt->bind_param('isi', $app->loggedInUser->company_id, $group, $seq);
if (!$stmt->execute()) {
    error_die(__LINE__, "クエリに失敗しました", $stmt);
}
$group_id = $app->mysqli->insert_id;
$stmt->close();

$app->mysqli->commit();

$data = array("result" => 0, "group_id" => $group_id, "group_name" => $group, "seq" => $seq+1);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
