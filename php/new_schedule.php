<?php
require_once("models/funcs.php");
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
$meeting_no = isset($_POST['meeting_no'])?$_POST['meeting_no']:NULL;
$title = $_POST['title'];
$memo = $_POST['memo'];
$ampm = $_POST['ampm'];
$dateTime = $_POST['date_time'];
$duration = $_POST['duration'];
$recurrenceType = $_POST['recurrence_type'];
$dailyInterval = $_POST['daily_interval'];
$weeklyInterval = $_POST['weekly_interval'];
$monthlyInterval = $_POST['monthly_interval'];
$weeklyDays = $_POST['weekly_dotw'];
$monthlyBy = $_POST['monthly_by'];
$monthlyDay = $_POST['monthly_day'];
$monthlyIndex = $_POST['monthly_weekday_index'];
$monthlyWeekDay = $_POST['monthly_week_day'];
$endBy = $_POST['end_by'];
$endDate = $_POST['end_date'];
$endTimes = $_POST['end_times'];
$roomUsers = $_POST['room_users'];
if (is_array($roomUsers)) {
	$users = $roomUsers[0];
	$users = str_replace('[', '', $users);
	$users = str_replace(']', '', $users);
	$roomUsers = explode(',', $users);
}
error_log(var_export($roomUsers,TRUE));
$withPMI = $_POST['schedule_with_pmi'];
$whichPass = $_POST['which_pass'];
$meetingPass = $_POST['meeting_pass'];
$videoHost = $_POST['video_host'];
$videoParticipants = $_POST['video_participants'];
$muteEntry = $_POST['mute_upon_entry'];
$autorecLocal = $_POST['autorec_local'];
$meeting_type = $_POST['meeting_type'];
$from_mobile = $_POST['from_mobile'];

if ($ampm == 'PM') {
	$date = new DateTime($dateTime);
	$date->add(new DateInterval('PT12H'));
	$dateTime = $date->format('Y-m-d H:i:s');
}

$cryptSeed = generateHash(getUniqueCode());
$duration_split = explode(':', $duration);
if (count($duration_split) > 1) {
	$minutes = intval($duration_split[0])*60 + intval($duration_split[1]);
} else {
	$minutes = intval($duration_split[0]);
}

$endDateTime = new DateTime($endDate);
$oneday_interval = new DateInterval('P1D');

if (empty($endDate)) {
	$date = new DateTime();
	$endDate = $date->format('Y-m-d H:i:s');
}

$meeting_days = array();
if ($recurrenceType != 'norepeat') {
	switch ($recurrenceType) {
		case 'daily':
			$pattern = 'P'.$dailyInterval.'D';
			$interval = new DateInterval($pattern);
			$eDate = new DateTime($dateTime);
			while (true) {
				$meeting_days[] = new DateTime($eDate->FORMAT('Y-m-d'));
				if ($endBy == 'end_times') {
					$endDate = $eDate->format('Y-m-d');
				}
				$eDate->add($interval);
				if ($endBy == 'end_times' && count($meeting_days) >= $endTimes) {
					break;
				} else if ($endBy == 'end_datetime' && $eDate > $endDateTime) {
					break;
				}
			}
			break;
		case 'weekly':
			$dotw = explode(',', $weeklyDays);
			$pattern = 'P'.($weeklyInterval*7).'D';
			$interval = new DateInterval($pattern);
			$eDate = new DateTime($dateTime);
			$exit = false;
			while (!$exit) {
				$c = new DateTime($eDate->format('Y-m-d'));
				for ($i = 0; $i < 7; ++$i) {
					$d = strtolower($c->format('D'));
					if (in_array($d, $dotw)) {
						$meeting_days[] = new DateTime($c->format('Y-m-d'));
						if ($endBy == 'end_times') {
							$endDate = $c->format('Y-m-d');
						}
					}
					$c->add($oneday_interval);
					if ($endBy == 'end_times' && count($meeting_days) >= $endTimes) {
						$exit = true;
						break;
					} else if ($endBy == 'end_datetime' && $c > $endDateTime) {
						$exit = true;
						break;
					}
				}
				$eDate->add($interval);
			}
			break;
		case 'monthly':
			$pattern = 'P'.$monthlyInterval.'M';
			$interval = new DateInterval($pattern);
			$eDate = new DateTime($dateTime);
			$exit = false;
			while (!$exit) {
				$lastDate = intval(date('d', strtotime('last day of ' . $eDate->format('Y-m'))));
				$c = new DateTime($eDate->format('Y-m-d'));
				$o = 1;
				for ($i = 1; $i <= $lastDate; ++$i) {
					if ($monthlyBy == 'bymonthday') {
						if (intval($c->format('d')) == intval($monthlyDay)) {
							if ($endBy == 'end_times') {
								$endDate = $c->format('Y-m-d');
							}
							$meeting_days[] = new DateTime($c->format('Y-m-d'));
							break;
						}
					} else {
						if (strtolower($c->format('D')) == $monthlyWeekDay) {
							if ($o == intval($monthlyIndex)) {
								if ($endBy == 'end_times') {
									$endDate = $c->format('Y-m-d');
								}
								$meeting_days[] = new DateTime($c->format('Y-m-d'));
								break;
							}
							++$o;
						}
					}
					$c->add($oneday_interval);
					if ($endBy == 'end_times' && count($meeting_days) >= $endTimes) {
						$exit = true;
						break;
					} else if ($endBy == 'end_datetime' && $c > $endDateTime) {
						$exit = true;
						break;
					}
				}
				$eDate->add($interval);
			}
			break;
	}
}

$skipPass = $whichPass=='login'?1:0;
$app->mysqli->begin_transaction();
if (!empty($meeting_no)) {
	$stmt = $app->mysqli->prepare("select n_meeting from ht_meeting where c_meeting = ?");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$stmt->bind_param('s', $meeting_no);
	$stmt->execute();
	$stmt->bind_result($meeting_id);
	$stmt->fetch();
	$stmt->close();

	$stmt = $app->mysqli->prepare(
		"UPDATE ht_meeting set
		`n_host`=?,`c_pass`=?,`c_crypt_seed`=?,`c_auth_method`='meeting',`c_title`=?,`c_memo`=?
		,`d_start`=?,`n_minutes`=?,`c_repeat`=?,`n_daily_every`=?,`n_weekly_every`=?
		,`c_weekly_dotw`=?,`n_monthly_every`=?,`c_monthly_by`=?,`n_monthly_day`=?
		,`n_monthly_numof`=?,`c_monthly_dotw`=?,`c_end_by`=?,`d_limit`=?,`n_times`=?,`b_skip_pass`=?
		,`b_video_host`=?,`b_video_part`=?,`b_mute_begin`=?,`b_rec_local`=?,`c_with_pmi`=?
		WHERE c_meeting = ?");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$stmt->bind_param("isssssisiisisiisssiiiiiiss", $app->loggedInUser->user_id,
					$meetingPass, $cryptSeed, $title, $memo, $dateTime,
					$minutes, $recurrenceType, $dailyInterval, $weeklyInterval,
					$weeklyDays, $monthlyInterval, $monthlyBy, $monthlyDay,
					$monthlyIndex, $monthlyWeekDay, $endBy, $endDate, $endTimes, $skipPass,
					$videoHost, $videoParticipants, $muteEntry, $autorecLocal, $withPMI, $meeting_no);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
	}
	$stmt->close();
} else {
	$meeting_no = generateRandomNumber();
	if ($withPMI == 'on' && !empty($app->loggedInUser->privateroom)) {
		$meeting_no = $app->loggedInUser->privateroom;
	}
	error_log(var_export($dateTime,TRUE));
	$stmt = $app->mysqli->prepare(
		"INSERT INTO ht_meeting
		(`n_host`,`c_meeting`,`c_pass`,`c_crypt_seed`,`c_auth_method`,`c_title`,`c_memo`
		,`d_start`,`n_minutes`,`c_repeat`,`n_daily_every`,`n_weekly_every`
		,`c_weekly_dotw`,`n_monthly_every`,`c_monthly_by`,`n_monthly_day`
		,`n_monthly_numof`,`c_monthly_dotw`,`c_end_by`,`d_limit`,`n_times`,`b_skip_pass`
		,`b_video_host`,`b_video_part`,`b_mute_begin`,`b_rec_local`,`c_with_pmi`)
		VALUES (?,?,?,?,'meeting',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$stmt->bind_param("issssssisiisisiisssiiiiiis", $app->loggedInUser->user_id,
					$meeting_no, $meetingPass, $cryptSeed, $title, $memo, $dateTime,
					$minutes, $recurrenceType, $dailyInterval, $weeklyInterval,
					$weeklyDays, $monthlyInterval, $monthlyBy, $monthlyDay,
					$monthlyIndex, $monthlyWeekDay, $endBy, $endDate, $endTimes, $skipPass,
					$videoHost, $videoParticipants, $muteEntry, $autorecLocal, $withPMI);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
	}
	$meeting_id = $app->mysqli->insert_id;
	$stmt->close();
}

if ($meeting_no) {
	$stmt = $app->mysqli->prepare("delete from ht_meeting_users where n_meeting = ?");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$stmt->bind_param('i', $meeting_id);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
	}
	$stmt->close();
}
foreach ($roomUsers as $user) {
	//error_log(var_export($user,TRUE));
	$user = trim($user);
	$stmt = $app->mysqli->prepare("insert into ht_meeting_users (n_meeting, n_user, c_status) values (?, ?, ?)");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$status = $whichPass=='login'?'waiting':'allowed';
	$stmt->bind_param('iis', $meeting_id, $user, $status);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
	}
	$stmt->close();
}

if ($meeting_no) {
	$stmt = $app->mysqli->prepare("delete from ht_meeting_days where n_meeting = ?");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$stmt->bind_param('i', $meeting_id);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
	}
	$stmt->close();
}
if ($recurrenceType == 'norepeat') {
	$stmt = $app->mysqli->prepare("insert into ht_meeting_days (n_meeting, d_date) values (?, ?)");
	if (!$stmt) {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
	$stmt->bind_param('is', $meeting_id, $dateTime);
	$result = $stmt->execute();
	if (!$result) {
		error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
	}
	$stmt->close();
} else {
	foreach ($meeting_days as $day) {
		$stmt = $app->mysqli->prepare("insert into ht_meeting_days (n_meeting, d_date) values (?, ?)");
		if (!$stmt) {
			error_die(__LINE__, "ルームの追加に失敗しました");
		}
		$d = $day->format('Y-m-d');
		$stmt->bind_param('is', $meeting_id, $d);
		$result = $stmt->execute();
		if (!$result) {
			error_die(__LINE__, "ルームの追加に失敗しました", $stmt);
		}
		$stmt->close();
	}
}

$app->mysqli->commit();

$cipher = "aes-256-cbc";
if (!in_array($cipher, openssl_get_cipher_methods())) {
	$cipher = openssl_get_cipher_methods()[0];
}

$subject = mb_convert_encoding("HotRoomミーティングの開催予定", "ISO-2022-JP", "AUTO");
$subject = mb_encode_mimeheader($subject);

$dt = new DateTime($dateTime);
$bodys = array (
	"下記日時にミーティングを開催します。",
	"",
	"開催日時: ".$dt->format('Y年n月j日 G時i分'),
	"",
	"JanusMobileミーティングに参加する",
	"",
	"",
	$whichPass=='meeting'?"ルームパスワード: ".$meetingPass:"入室するにはホストの許可が必要です。\n初めてご利用になる場合、メールアドレスとパスワードによる認証が必要です。",
	"",
	"JanusMobile開発チーム"
);

$headers  = "MIME-Version: 1.0 \n" ;
$headers .= "From: " .
       "".mb_encode_mimeheader (mb_convert_encoding($app->loggedInUser->displayname,"ISO-2022-JP","AUTO")) ."" .
       "<".$app->loggedInUser->email."> \n";
$headers .= "Reply-To: " .
       "".mb_encode_mimeheader (mb_convert_encoding($app->loggedInUser->displayname,"ISO-2022-JP","AUTO")) ."" .
       "<".$app->loggedInUser->email."> \n";
$headers .= "Content-Type: text/plain;charset=ISO-2022-JP \n";

$subject_guest = mb_convert_encoding("HotRoomゲスト登録のお願い", "ISO-2022-JP", "AUTO");
$subject_guest = mb_encode_mimeheader($subject_guest);

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$file = strrchr($actual_link, '/');
if ($from_mobile) {
	$register_guest = 'janus-server://guest?cmd=login';
	$invite_mess = "Janusミーティングに招待されました。\nミーティングに参加するためにはApp StoreまたはGoogle Playから「JanusMobile」をインストールし、下記のURLにアクセスしてください\n";
} else {
	$register_guest = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/registerguest.php';
	$invite_mess = "Janusミーティングに招待されました。\nミーティングに参加するためには下記のURLにアクセスしてください\n";
}
$bodys_guest = array (
	"organization",
	" 様",
	"",
	$invite_mess,
	"",
	$register_guest,
	"",
	$whichPass=='meeting'?"ルームパスワード: ".$meetingPass:"入室するにはホストの許可が必要です。\n初めてご利用になる場合、メールアドレスとパスワードによる認証が必要です。",
	"",
	"JanusMobile開発チーム"
);

$headers_guest  = "MIME-Version: 1.0 \n" ;
$headers_guest .= "From: " .
       "".mb_encode_mimeheader (mb_convert_encoding("HotRoom管理者","ISO-2022-JP","AUTO")) ."" .
       "<admin@asj.ad.jp> \n";
$headers_guest .= "Reply-To: " .
       "".mb_encode_mimeheader (mb_convert_encoding("返信不可","ISO-2022-JP","AUTO")) ."" .
       "<no-reply@asj.ad.jp> \n";
$headers_guest .= "Content-Type: text/plain;charset=ISO-2022-JP \n";

$sendmail_params  = "-f".$app->loggedInUser->email;

mb_language("ja");

$mail_sent = true;
foreach ($roomUsers as $user) {
	$user = trim($user);
	$stmt = $app->mysqli->prepare("select c_login,c_pass,c_disp_name,b_guest,c_first_name from ht_user where n_user = ?");
	if ($stmt) {
		$stmt->bind_param('i', $user);
		$stmt->execute();
		$stmt->bind_result($email, $pass, $dispname,$is_guest,$organization);
		while ($stmt->fetch()) {
			$plaintext = $email.'#'.$pass;
			$ciphertext = openssl_encrypt($plaintext, $cipher, $cryptSeed);
			if ($is_guest) {
				$bodys_guest[0] = $organization;
				$bodys_guest[1] = $dispname.' 様';
				$bodys_guest[5] = $register_guest.'&gid='.$user.'&mid='.$meeting_id.'&pwd='.$ciphertext;
				$body = mb_convert_encoding(join("\r\n", $bodys_guest), "ISO-2022-JP", "AUTO");
				if (!mail($email, $subject_guest, $body, $headers_guest, $sendmail_params)) {
					$mail_sent = false;
				}
			} else {
				$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
				$idx = strpos($url, strrchr($url, '/'));
				if (empty($meeting_no)) {
					$st = $app->mysqli->prepare("select c_meeting from ht_meeting where n_meeting = ?");
					if ($st) {
						$st->bind_param('i', $meeting_id);
						$st->execute();
						$st->bind_result($meeting_no);
						if ($st->fetch()) {
						}
						$st->close();
					}
				}
				if ($from_mobile) {
					$bodys[5] = 'janus-mobile://enter?roomId='.$meeting_no;
				} else {
					$bodys[5] = substr($url, 0, $idx+1).'room.php?roomId='.$meeting_no.'&pwd='.urlencode($ciphertext);
				}
				$body = mb_convert_encoding(join("\r\n", $bodys), "ISO-2022-JP", "AUTO");
				if (!mail($email, $subject, $body, $headers, $sendmail_params)) {
					$mail_sent = false;
				}
			}
			//mb_send_mail($email, $subject , $body, $headers);
		}
		$stmt->close();
	} else {
		error_die(__LINE__, "ルームの追加に失敗しました");
	}
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

if ($mail_sent) {
	$data = array("result" => 0, "result_string" => "ルームを追加しました", "meetings" => $meetings);
} else {
	$data = array("result" => 0, "result_string" => "ルームを追加しましたが、メール送信に失敗しました。", "meetings" => $meetings);
}
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
