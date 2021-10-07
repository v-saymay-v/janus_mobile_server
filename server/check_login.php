<?php
require_once("app.php");
require_once("check_session.php");

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

$token = urldecode($_POST['token']);
$secret = urldecode($_POST['secret']);
$session = urldecode($_POST['session']);
$meeting_type = $_POST['type'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$server = '';
$hotbiz = '';
$snsid = '';
if ($meeting_type == 'hotbiz') {
    $stmt = $app->mysqli->prepare(
        "select T4.c_hotbiz_server
		,T4.c_hotbiz_name
		,T1.c_snsid
		 from ht_janusmobile T1
		,ht_user T2
		,ht_group T3
		,ht_company T4
		 where T1.c_login_token = ?
		 and T2.n_user = T1.n_user
		 and T3.n_group = T2.n_group
		 and T4.n_company = T3.n_company");
    if (!$stmt) {
        error_die(__LINE__, "セッションの取得に失敗しました");
    }
    $stmt->bind_param('s', $token);
    $stmt->execute();
    $stmt->bind_result($server, $hotbiz, $snsid);
    if (!$stmt->fetch()) {
        error_die(__LINE__, "セッションが見つかりませんでした", $stmt);
    }
    $stmt->close();
}

$check = new CheckSession($meeting_type, $token, $secret);
if (!$check->checkValid($server, $hotbiz, $snsid)) {
	error_die(__LINE__, $meeting_type."のトークンに誤りがあります");
}

$app->addIPaddress();

$mails = $check->getMails();
$data = json_encode(array("result" => 0, "result_string" => "", "snsid" => isset($snsid)?$snsid:'', "mails" => $mails?$mails:array()));
header('Content-Type: application/json');
echo $data;
?>
