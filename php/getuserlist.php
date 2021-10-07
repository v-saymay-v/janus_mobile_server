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

$app = new room_app();
if (!isset($app->loggedInUser)) {
	$error_die(__LINE__, "ログインされていません")
}

$fnc = $_POST['fnc'];

switch ($fnc) {
case 'videocall':
	$stmt = $app->mysqli->prepare(
		"SELECT T1.`n_user`
		,T1.`c_disp_name`
		 from `ht_user` T1
		 left join `ht_janusmobile` T2 on T2.`n_user` = T1.`n_user`
		 where (T1.`c_subscription` is not null or T2.`c_push_token` is not null)
		 and (T1.`b_delete` = 0 or T1.`b_delete` is null)
		 and (T1.`b_admin` = 0 or T1.`b_admin` is null)");
	break;
case 'voicemail':
	$stmt = $app->mysqli->prepare(
		"SELECT `n_user`
		,`c_disp_name`
		 from `ht_user`
		 where `c_subscription` is not null
		 and (`b_delete` = 0 or `b_delete` is null)
		 and (`b_admin` = 0 or `b_admin` is null)");
	break;
default:
	$stmt = $app->mysqli->prepare("SELECT `n_user`,`c_disp_name` from `ht_user` where (`b_delete` = 0 or `b_delete` is null) and (`b_admin` = 0 or `b_admin` is null)");
}
if (!$stmt) {
  error_die(__LINE__, "サブスクリプションの追加に失敗しました");
}
$stmt->execute();
switch ($fnc) {
case 'videocall':
	$stmt->bind_result($userid, $dispname);
	break;
case 'voicemail':
	$stmt->bind_result($userid, $dispname);
	break;
default:
	$stmt->bind_result($userid, $dispname);
}
$users = array();
while ($stmt->fetch()) {
	switch ($fnc) {
	case 'videocall':
  	$users[] = $userid.'_'.$dispname;
		break;
	case 'voicemail':
		$users[] = array("userid" => "$userid", "name" => $dispname);
		break;
	default:
		$users[] = array("userid" => "$userid", "name" => $dispname);
	}
}
$stmt->close();

$data = array("result" => 0, "result_string" => $users);
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
