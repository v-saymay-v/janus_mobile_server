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
$hotbiz = $_GET['hotbiz'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

if ($company_id) {
    $stmt = $app->mysqli->prepare(
        "select T1.n_user
        ,T1.c_login
        ,T1.c_disp_name
         from ht_user T1
        ,ht_group T2
         where T2.n_company = ?
         and T1.n_group = T2.n_group
         and T1.b_admin != 0
         and T1.b_delete = 0");
} else {
    $stmt = $app->mysqli->prepare(
        "select T1.n_user
        ,T1.c_login
        ,T1.c_disp_name
         from ht_user T1
        ,ht_group T2
        ,ht_comapny T3
         where T3.c_hotbiz_name = ?
         and T2.n_company = T3.n_company
         and T1.n_group = T2.n_group
         and T1.b_admin != 0
         and T1.b_delete = 0");
}
if (!$stmt) {
    error_die(__LINE__, "ミーティング一覧の取得に失敗しました");
}
if ($company_id) {
    $stmt->bind_param('i', $company_id);
} else {
    $stmt->bind_param('s', $hotbiz);
}
$stmt->execute();
$stmt->bind_result($user_id, $email, $user_name);
if ($stmt->fetch()) {
    $data = array("result" => 0, "user_id" => $user_id, "user_name" => $user_name, "email" => $email);
} else {
    $data = array("result" => -1, "result_string" => "管理者が見つかりません");
}
$stmt->close();

header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
