<?php
require_once("models/languages/ja.php");
require_once("models/class.mail.php");
require_once("models/funcs.php");
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
  $data = array("result" => 1, "result_string" => "ログインされていません");
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$userId = $_POST['userId'];
$meetingId = $_POST['meetingId'];

$stmt = $app->mysqli->prepare("UPDATE ht_meeting_users T1
  SET T1.`c_status` = 'allowed'
  WHERE T1.`n_user` = ?
  AND T1.`n_meeting` = ?");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
  $data = array("result" => 1, "result_string" => "SQLエラー");
  header('Content-Type: application/json');
  $data = json_encode($data);
  echo $data;
  die();
}
$stmt->bind_param("ii", $userId, $meetingId);
$stmt->execute();
$stmt->close();

$data = array("result" => 0, "result_string" => "ミーティングへの参加を許可しました");
$data = json_encode($data);
if ($data){
  header('Content-Type: application/json');
  echo $data;
} else {
  http_response_code(500);
}
?>
