<?php
include('../../data/room/db_connect.php');
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
  error_die(__LINE__, "ログインされていません");
}

$server = $_POST['server'];
$username = $_POST['username'];
$authuser = $_POST['authuser'];
$password = $_POST['password'];
$displayname = $_POST['displayname'];
$registerset = $_POST['registerset'];

$stmt = $app->mysqli->prepare("SELECT count(*) from `ht_sipsetting` where `n_user` = ?");
if (!$stmt) {
  error_die(__LINE__, "ボイスメールの保存に失敗しました");
}
$stmt->bind_param('i', $app->loggedInUser->user_id);
$stmt->execute();
$stmt->bind_result($cnt);
$stmt->fetch();
$stmt->close();

$app->mysqli->begin_transaction();
if ($cnt > 0) {
  $stmt = $app->mysqli->prepare(
    "UPDATE `ht_sipsetting` set
    `c_registrar`=?,`c_identity`=?,`c_username`=?,`c_dispname`=?,`c_password`=aes_encrypt(?,?),`c_mode`=?
    WHERE `n_user` = ?");
  if (!$stmt) {
    error_die(__LINE__, "ボイスメールの保存に失敗しました");
  }
  $stmt->bind_param('sssssssi', $server, $username, $authuser, $displayname, $password, $db_key, $registerset, $app->loggedInUser->user_id);
} else {
  $stmt = $app->mysqli->prepare(
    "INSERT INTO `ht_sipsetting`
     (`n_user`,`c_registrar`,`c_identity`,`c_username`,`c_dispname`,`c_password`,`c_mode`)
     values
     (?, ?, ?, ?, ?, aes_encrypt(?,?), ?)");
   if (!$stmt) {
     error_die(__LINE__, "ボイスメールの保存に失敗しました");
   }
   $stmt->bind_param('isssssss', $app->loggedInUser->user_id, $server, $username, $authuser, $displayname, $password, $db_key, $registerset);
}
$result = $stmt->execute();
if (!$result) {
  error_die(__LINE__, "ボイスメールの保存に失敗しました", $stmt);
}
$stmt->close();
$app->mysqli->commit();

$data = array("result" => 0, "result_string" => "SIP設定を保存しました");
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
