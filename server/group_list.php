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

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare(
    "select T1.n_group
    ,T1.c_name
    ,T1.n_seq
     from ht_group T1
     where T1.n_company = ?
     and T1.b_admin = 0
     and T1.b_delete = 0
     order by T1.n_seq");
if (!$stmt) {
    error_die(__LINE__, "ミーティング一覧の取得に失敗しました");
}
$stmt->bind_param('i', $company_id);
$stmt->execute();
$stmt->bind_result($group_id, $group_name, $group_seq);
$meetings = array();
while ($stmt->fetch()) {
    $meeting = array("group_id" => $group_id, "group_name" => $group_name, "group_seq" => $group_seq);
    $meetings[] = $meeting;
}
$stmt->close();

$data = array("result" => 0, "groups" => $meetings);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
