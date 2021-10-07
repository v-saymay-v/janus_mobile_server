<?php
require_once("models/class.user.php");
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
	$data = array("result" => -1, "result_string" => "ログインされていません");
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$meetingid = $_POST['meetingid'];
$date = $_POST['date'];

if (empty($meetingid)) {
	$data = array("result" => -1, "result_string" => "ログイン情報が指定されていません");
} else {
	$users = array();
	$stmt = $app->mysqli->prepare("SELECT T1.n_user from ht_meeting_users T1,ht_user T2 where T2.n_user = T1.n_user and T2.b_guest != 0 and T1.n_meeting = ?");
	if (!$stmt) {
    syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
    $data = array("result" => -1, "result_string" => $app->mysqli->error);
    header('Content-Type: application/json');
    $data = json_encode($data);
    echo $data;
    die();
  }
	$stmt->bind_param("i", $meetingid);
  $result = $stmt->execute();
	$stmt->bind_result($userid);
	while($stmt->fetch()) {
		$users[] = $userid;
	}
	$stmt->close();

	$app->mysqli->begin_transaction();

  $stmt = $app->mysqli->prepare("UPDATE ht_meeting_days SET d_finish = now() WHERE date(d_date) = ? and n_meeting = ?");
  if (!$stmt) {
    syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
    $app->mysqli->rollback();
    $data = array("result" => -1, "result_string" => $app->mysqli->error);
    header('Content-Type: application/json');
    $data = json_encode($data);
    echo $data;
    die();
  }
  $stmt->bind_param("si", $date, $meetingid);
	$result = $stmt->execute();
  $stmt->close();

	foreach($users as $userid) {
		$stmt = $app->mysqli->prepare("DELETE from ht_meeting_users WHERE n_meeting = ? and n_user = ?");
		if ($stmt) {
			$stmt->bind_param("ii", $meetingid, $userid);
			$result = $stmt->execute();
			$stmt->close();
		}
		$stmt = $app->mysqli->prepare("DELETE from ht_user WHERE n_user = ?");
		if ($stmt) {
			$stmt->bind_param("i", $userid);
			$result = $stmt->execute();
			$stmt->close();
		}
	}

	$app->mysqli->commit();

	$data = array("result" => 0, "result_string" => "ミーティングは終了しました");
}

$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
