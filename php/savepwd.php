<?php
require_once("models/languages/ja.php");
require_once("models/class.mail.php");
require_once("models/funcs.php");
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
  $data = array("result" => -1, "result_string" => "ログインされていません");
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];
$db_table_prefix = "ht_";

$websiteName = $app->loggedInUser->companyname;
$emailAddress = $app->loggedInUser->email;

$stmt = $app->mysqli->prepare("UPDATE ".$db_table_prefix."user T1
  SET T1.`c_pass` = password(?),
  T1.`c_access_key` = null,
  T1.`c_access_ip` = null
  WHERE T1.n_user = ?
  AND T1.c_pass = password(?)");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
  $data = array("result" => -1, "result_string" => "SQLエラー");
  header('Content-Type: application/json');
  $data = json_encode($data);
  echo $data;
  die();
}
$stmt->bind_param("sis", $newPassword, $app->loggedInUser->user_id, $oldPassword);
$result = $stmt->execute();
$affected = $stmt->affected_rows;
$stmt->close();

if ($affected > 0) {
//Success, user details have been updated in the db now mail this information out.
  $data = array("result" => 0, "result_string" => "パスワードを変更しました");
} else {
  $data = array("result" => -1, "result_string" => "旧パスワードが間違っています");
}
$data = json_encode($data);
if ($data){
  header('Content-Type: application/json');
  echo $data;
} else {
  http_response_code(500);
}
?>
