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

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare(
    "select T1.n_user
    ,T3.n_company
    ,T1.c_disp_name
    ,T3.c_name
    ,T5.c_snsid
    ,T1.c_meeting
    ,T1.c_subscription
    ,T5.c_push_token
    ,T6.c_pass
    ,T5.c_photo_url
    ,T1.c_login
    ,T1.b_guest
     from ht_user T1 left join ht_meeting T6 on T6.c_meeting = T1.c_meeting
    ,ht_user T2
    ,ht_group T3
    ,ht_group T4
    ,ht_janusmobile T5
    where (T1.b_delete = 0 or T1.b_delete is null)
    and T5.n_user = T1.n_user
    and T1.n_group = T3.n_group
    and T3.n_company = T4.n_company
    and T4.n_group= T2.n_group
    and T2.n_user = ?
    order by T1.n_user");
if (!$stmt) {
    error_die(__LINE__, "メンバー一覧の取得に失敗しました");
}
$stmt->bind_param('i', $app->loggedInUser->user_id);
$stmt->execute();
$stmt->bind_result($userid, $companyid, $username, $groupname, $snsid, $roomid, $sub, $push, $roompass, $photo, $email, $isguest);
$members = array();
while ($stmt->fetch()) {
    $member = array(
        "userid" => $userid,
        "companyid" => $companyid,
        "username" => $username,
        "groupname" => $groupname,
        "email" => $email,
        "photo" => $photo,
        "snsid" => $snsid,
        "roomid" => $roomid,
        "roompass" => $roompass,
        "isguest" => $isguest,
        "cancall" => !empty($sub)||!empty($push)
    );
    $members[] = $member;
}
$stmt->close();

$data = array("result" => 0, "members" => $members);
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
