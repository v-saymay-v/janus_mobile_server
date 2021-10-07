<?php
require_once("models/languages/ja.php");
require_once("models/class.mail.php");
require_once("models/funcs.php");
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
  $data = array("result" => array("error" => "ログインされていません", "changed" => false, "status" => "1"));
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$userId = $_POST['userId'];
$oldHostKey = $_POST['oldHostKey'];
$newHostKey = $_POST['newHostKey'];
$db_table_prefix = "ht_";

$websiteName = $app->loggedInUser->companyname;
$emailAddress = $app->loggedInUser->email;

$stmt = $app->mysqli->prepare("UPDATE ".$db_table_prefix."user T1
  SET T1.`c_host_key` = ?
  WHERE T1.`n_user` = ?");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
  $data = array("result" => array("error" => "SQLエラー", "changed" => false));
  header('Content-Type: application/json');
  $data = json_encode($data);
  echo $data;
  die();
}
$stmt->bind_param("si", $newHostKey, $userId);
$result = $stmt->execute();
$affected = $stmt->affected_rows;
$stmt->close();

if ($affected > 0) {
//Success, user details have been updated in the db now mail this information out.
  $data = array("result" => array("error" => false, "changed" => true));
} else {
  $data = array("result" => array("error" => "古いホストキーが間違っています", "changed" => false));
}
$data = json_encode($data);
if ($data){
  header('Content-Type: application/json');
  echo $data;
} else {
  http_response_code(500);
}
?>
