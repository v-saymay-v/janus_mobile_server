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

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$app->mysqli->begin_transaction();

$stmt = $app->mysqli->prepare("update ht_comapny set c_name = ? where n_company = ?");
if (!$stmt) {
    error_die(__LINE__, "組織の追加に失敗しました");
}
$stmt->bind_param('si', $company, $app->loggedInUser->company_id);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->close();

$app->mysqli->commit();

$data = array("result" => 0, "company_id" => $app->loggedInUser->company_id, "company_name" => $company);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
