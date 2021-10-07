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
	error_die(__LINE__, "ログインされていません");
}

$stmt = $app->mysqli->prepare(
  "select c_tag
  ,T1.n_from
	,T1.n_to
  ,T2.c_disp_name
  ,T3.c_disp_name
  ,date(T1.d_create)
	,T1.d_read
   from ht_voicemail T1
  ,ht_user T2
  ,ht_user T3
  where T2.n_user = T1.n_from
  and T3.n_user = T1.n_to
	and (T1.n_from = ? or T1.n_to = ?)
  order by T1.d_create desc");
if ($stmt) {
  $stmt->bind_param('ii', $app->loggedInUser->user_id, $app->loggedInUser->user_id);
  $stmt->execute();
  $stmt->bind_result($tag, $fromId, $toId, $fromName, $toName, $create, $read);
  $mails = array();
  while ($stmt->fetch()) {
		$name = ($fromId==$app->loggedInUser->user_id?$toName:$fromName);
		$isRead = empty($read)?'未':'済';
		$make = ($fromId==$app->loggedInUser->user_id?'送信':'受信');

    $mail = array("tag" => $tag, "make" => $make, "name" => $name, "create" => $create, "read" => $isRead);
    $mails[] = $mail;
  }
  $stmt->close();
} else {
	error_die(__LINE__, "メール一覧の取得に失敗しました");
}

$data = array("result" => 0, "mails" => $mails);
$data = json_encode($data);
if ($data) {
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
