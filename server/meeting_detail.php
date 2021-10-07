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

function meeting_users($meeting) {
	global $app;

    $stmt = $app->mysqli->prepare(
        "select T1.n_user
        ,T2.c_disp_name
        ,T2.c_login
        ,T2.b_guest
         from ht_meeting_users T1
        ,ht_user T2
         where T2.n_user = T1.n_user
         and T1.n_meeting = ?");
    if (!$stmt) {
        error_die(__LINE__, "参加者一覧の取得に失敗しました");
    }
    $stmt->bind_param('i', $meeting);
    $stmt->execute();
    $stmt->bind_result($userid, $username, $email, $isguest);
    $users = array();
    while ($stmt->fetch()) {
        $user = array("userid" => $userid, "username" => $username, "email" => $email, "isguest" => $isguest);
        $users[] = $user;
    }
    $stmt->close();
    return $users;
}

$session = urldecode($_GET['token']);
$meeting_type = $_GET['type'];
$meeting_no = $_GET['meeting'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare(
    "select T1.`c_pass`
    ,T1.`c_title`
    ,T1.`c_memo`
    ,T1.`d_start`
    ,T1.`n_minutes`
    ,T1.`c_repeat`
    ,T1.`n_daily_every`
    ,T1.`n_weekly_every`
    ,T1.`c_weekly_dotw`
    ,T1.`n_monthly_every`
    ,T1.`c_monthly_by`
    ,T1.`n_monthly_day`
    ,T1.`n_monthly_numof`
    ,T1.`c_monthly_dotw`
    ,T1.`c_with_pmi`
    ,T1.`c_end_by`
    ,T1.`d_limit`
    ,T1.`n_times`
    ,T1.`b_skip_pass`
    ,T1.`b_video_host`
    ,T1.`b_video_part`
    ,T1.`b_mute_begin`
    ,T1.`b_rec_local`
    ,T1.`n_meeting`
     from ht_meeting T1
     where T1.c_meeting = ?");
if (!$stmt) {
    error_die(__LINE__, "ミーティング一覧の取得に失敗しました");
}
$stmt->bind_param('s', $meeting_no);
$stmt->execute();
$stmt->bind_result($pass, $title, $memo, $start, $duration, $repeat, $dailyEvery, $weeklyEvery, $weeklyDotw,
    $monthlyEvery, $monthlyBy, $monthlyDay, $monthlyNumof, $monthlyDotw, $withPmi, $endBy, $limit, $times,
    $skipPass, $videoHost, $videoPart, $muteBegin, $recLocal, $meetingId);
$meeting = array();
if ($stmt->fetch()) {
    $meetdate = new DateTime($start);
    $limitdate = new DateTime($limit);
    $meeting = array(
        'meeting_no' => $meeting_no,
        'title' => $title,
        'memo' => $memo,
        'ampm' => $meetdate->format('A'),
        'date_time' => $meetdate->format('Y-m-d H:i:s'),
        'duration' => $duration,
        'recurrence_type' => $repeat,
        'daily_interval' => $dailyEvery,
        'weekly_interval' => $weeklyEvery,
        'weekly_dotw' => $weeklyDotw,
        'monthly_interval' => $monthlyEvery,
        'monthly_by' => $monthlyBy,
        'monthly_day' => $monthlyDay,
        'monthly_weekday_index' => $monthlyNumof,
        'monthly_week_day' => $monthlyDotw,
        'end_by' => $endBy,
        'end_date' => $limitdate->format('Y-m-d H:i:s'),
        'end_times' => $times,
        'schedule_with_pmi' => $withPmi,
        'which_pass' => $skipPass=='1'?'login':'meeting',
        'meeting_pass' => $pass,
        'video_host' => $videoHost,
        'video_participants' => $videoPart,
        'mute_upon_entry' => $muteBegin,
        'autorec_local' => $recLocal,
        'meeting_id' => $meetingId
    );
}
$stmt->close();

$users = meeting_users($meetingId);
$meeting['attendees'] = $users;

$data = array("result" => 0, "meeting" => $meeting);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
