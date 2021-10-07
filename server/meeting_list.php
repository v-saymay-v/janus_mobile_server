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
$meeting_type = $_GET['type'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare(
    "select T1.c_meeting
    ,T1.c_title
    ,T2.d_date
    ,T1.n_minutes
    ,T4.c_disp_name
    ,T1.n_meeting
    ,T1.d_start
     from ht_meeting T1
    ,ht_meeting_days T2
    ,ht_meeting_users T3
    ,ht_user T4
    where T2.d_finish is ".($meeting_type=='previous'?'not ':'')."null
    and T4.n_user = T1.n_host
    and T1.n_meeting = T3.n_meeting
    and T2.n_meeting = T3.n_meeting
    and T3.n_user = ?
    order by T2.d_date desc");
if (!$stmt) {
    error_die(__LINE__, "ミーティング一覧の取得に失敗しました");
}
$stmt->bind_param('i', $app->loggedInUser->user_id);
$stmt->execute();
$stmt->bind_result($meetingNo, $title, $date, $duration, $host, $meetingId, $start);
$meetings = array();
while ($stmt->fetch()) {
    $meetdate = new DateTime($date);
    $startdate = new DateTime($start);
    $meeting = array("meeting" => $meetingNo, "title" => $title, "start" => $meetdate->format('Y-m-d').' '.$startdate->format('H:i:s'), "duration" => $duration, "host" => $host);
    $meetings[] = $meeting;
}
$stmt->close();

$data = array("result" => 0, "meetings" => $meetings);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
