<?php
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
  $data = array("result" => -1, "result_string" => "ログインされていません");
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$meeting = $_POST['meeting'];

$stmt = $app->mysqli->prepare("select n_meeting,c_title,d_start from ht_meeting where c_meeting=?");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
  $data = array("result" => -1, "result_string" => $app->mysqli->error);
  header('Content-Type: application/json');
  $data = json_encode($data);
  echo $data;
  die();
}
$stmt->bind_param("s", $meeting);
$stmt->execute();
$stmt->bind_result($meetingId, $title, $datetime);
$stmt->fetch();
$stmt->close();

$stmt = $app->mysqli->prepare("SELECT count(*) FROM ht_meeting_days WHERE n_meeting = ?");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
  $data = array("result" => -1, "result_string" => $app->mysqli->error);
  header('Content-Type: application/json');
  $data = json_encode($data);
  echo $data;
  die();
}
$stmt->bind_param("i", $meetingId);
$result = $stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

$dt = new DateTime($datetime);
$body = "都合により、下記のミーティングは中止といたします。\r\n".
        "\r\n".
        "トピック：".$title."\r\n".
        "日時：".$dt->format('Y年n月j日 h:i A')."\r\n";

$data = array("result" => 0, "registrants" => $count, "display_body" => $body, "display_subject" => "ミーティング中止のお知らせ");
$data = json_encode($data);
if ($data){
  header('Content-Type: application/json');
  echo $data;
} else {
  http_response_code(500);
}
?>
