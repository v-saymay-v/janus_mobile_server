<?php
require_once ("models/class.user.php");
require_once ("models/funcs.php");
require_once ("app.php");
require_once ("check_session.php");

function error_die($mess, $line, $stmt = null) {
	global $app;

	error_log($line.":".$mess."(".$app->mysqli->error.")");
	syslog(LOG_ERR, __FILE__."(".$line."): ".$app->mysqli->error);
	if ($stmt) {
		$stmt->close();
	}
	$app->mysqli->rollback();

	$data = array("result" => -1, "result_string" => $line.":".$mess);
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

function getImageFromURL($url, $uid, $token, &$mime, &$data) {
	if ($uid && $token) {
		$cookie = "LOGINID=".$uid.";";
		$cookie .= " LOGINKEY=".$token.";";
		$cookie .= " VideoChat=".$token.";";
	}
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.1 Safari/537.11');
	if (isset($cookie)) {
		curl_setopt(CURLOPT_HTTPHEADER, array('Cookie: '.$cookie));
	}
	$res = curl_exec($ch);
	$rescode = curl_getinfo($ch, CURLINFO_HTTP_CODE); 
	curl_close($ch) ;
	
	if ($rescode === 200) {
		$dir = posix_getpwuid(posix_geteuid())['dir'];
		$tmpfname = tempnam($dir, "tmp");
		$fh = fopen($tmpfname, "wb");
		fwrite($res);
		fclose($fh);
	
		$type = exif_imagetype($mime);
		$mime = image_type_to_mime_type($type);
		$img = file_get_contents($tmpfname);
		$en = base64_encode($img);
		$data = 'data:' . $mime . ';base64,' . $en;
		unlink($tmpfname);
		return TRUE;
	}
	$mime = "";
	$data = "";
	return FALSE;
}

/*
function generateRandomString($length = 8) {
	$number = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGIJKLMNOPQRSTUVWXWZ';
	$numberLength = strlen($number);
	$randomNumber = '';
	for ($i = 0; $i < $length; $i++) {
		$randomNumber .= $number[rand(0, $numberLength - 1)];
	}
	return $randomNumber;
}
*/

$app = new room_app();

$os = $_POST['os'];
$type = $_POST['type'];
$push = $_POST['push'];
$apns = $_POST['apns'];
$voip = $_POST['voip'];
$debug = $_POST['debug'];
$token = $_POST['token'];
$secret = $_POST['secret'];
$uid = $_POST['uid'];
$name = $_POST['name'];
$email = $_POST['email'];
$photo = $_POST['photo'];
$cover = $_POST['cover'];

$parsed = parse_url($photo);
$host = $parsed['host'];
$path = $parsed['path'];
$parts = explode('/', $path);
$hotbiz = $parts[1];

$check = new CheckSession($type, $token, $secret);
if (!$check->checkValid($host, $hotbiz, $uid)) {
	error_die($type."のトークンに誤りがあります", __LINE__);
}
$mails = $check->getMails();

getImageFromURL($photo, $type=="hotbiz"?$uid:null, $type=="hotbiz"?$token:null, $photo_mime, $photo_data);
getImageFromURL($cover, null, null, $cover_mime, $cover_data);

$stmt = $app->mysqli->prepare(
	" select T1.n_user".
	",T1.c_date_format".
	",T1.b_guest".
	",T1.c_meeting".
	",T3.c_pass".
	",T4.n_group".
	",T4.c_name".
	",T5.n_company".
	",T5.c_name".
	",T1.b_admin".
	" from ht_user T1".
	" left join ht_meeting T3 on T3.c_meeting = T1.c_meeting".
	" left join ht_group T4 on T4.n_group = T1.n_group".
	" left join ht_company T5 on T5.n_company = T4.n_company".
	",ht_janusmobile T2".
	" where T2.n_user = T1.n_user".
	" and T2.c_snsid = ?".
	" and T2.e_type = ?");
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
$stmt->bind_param("ss", $uid, $type);
$stmt->execute();
$stmt->bind_result($user_id, $date_fromat, $is_guest, $my_room, $room_pass, $group_id, $group_name, $company_id, $company_name, $is_admin);
if ($stmt->fetch()) {
}
$stmt->close();

$seed = $os.$type.$push;
if (!empty($token)) {
	$seed .= $token;
}
if (!empty($secret)) {
	$seed .= $secret;
}
if (!empty($email)) {
	$seed .= $email;
}
$hash = password_hash($seed, PASSWORD_BCRYPT, array('cost' => 16));
if (isset($user_id)) {
	$app->mysqli->begin_transaction();
	$stmt = $app->mysqli->prepare(
		" update ht_user T1".
		",ht_janusmobile T2 set".
		" T1.`c_access_key` = ?".
		",T1.`d_signin` = now()".
		",T1.`c_photo` = ?".
		",T1.`c_photo_type` = ?".
		",T1.`b_delete` = 0".
		",T1.`d_delete` = null".
		",T2.`c_push_token` = ?".
		",T2.`c_apns_token` = ?".
		",T2.`c_voip_token` = ?".
		",T2.`b_debug_token` = ?".
		",T2.`c_snsid` = ?".
		",T2.`e_type` = ?".
		",T2.`e_os` = ?".
		",T2.`c_login_token` = ?".
		",T2.`c_login_secret` = ?".
		",T2.`c_photo_url` = ?".
		",T2.`c_cover` = ?".
		",T2.`c_cover_url` = ?".
		",T2.`c_cover_type` = ?".
		" where T2.`n_user` = T1.`n_user`".
		" and T1.`n_user` = ?");
	if (!$stmt) {
		error_die("クエリに失敗しました", __LINE__, $stmt);
	}
	if (empty($uid)) {
		$uid = "0";
	}
	$stmt->bind_param("ssssssiissssssssi",
		$hash, $photo_data, $photo_mime, $push, $apns, $voip, $debug, $uid,
		$type, $os, $token, $secret, $photo, $cover_data, $cover,
		$cover_mime, $user_id);
	if (!$stmt->execute()) {
		error_die("クエリに失敗しました", __LINE__, $stmt);
	}

	if (!empty($email)) {
		$stmt = $app->mysqli->prepare(
			"update `ht_user` set `c_login` = ? where `n_user` = ?");
		if (!$stmt) {
			error_die("クエリに失敗しました", __LINE__, $stmt);
		}
		$stmt->bind_param("si", $email, $user_id);
		if (!$stmt->execute()) {
			error_die("クエリに失敗しました", __LINE__, $stmt);
		}
	}

	$app->mysqli->commit();
	$app->addIPaddress();

	$data = json_encode(array("result" => 0, "new_user" => FALSE, "result_string" => $hash,
		"user_id" => $user_id, "my_room" => $my_room, "room_pass" => $room_pass, "mails" => $mails?$mails:array(),
		"group_id" => $group_id, "group_name" => $group_name, "company_id" => $company_id, "company_name" => $company_name,
		"is_admin" => $is_admin));
	header('Content-Type: application/json');
	echo $data;
	die();
}

$stmt = $app->mysqli->prepare("select n_group from ht_group where b_free = 1"); 
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
$stmt->execute();
$stmt->bind_result($free_group);
if (!$stmt->fetch()) {
	error_die("グループが見つかりません", __LINE__);
}
$stmt->close();

$is_admin = "0";
if ($type == 'hotbiz') {
	$stmt = $app->mysqli->prepare("select n_company,c_name from ht_company where c_hotbiz_name = ?");
	if (!$stmt) {
		error_die("クエリに失敗しました", __LINE__);
	}
	$stmt->bind_param("s", $hotbiz);
	$stmt->execute();
	$stmt->bind_result($company_id, $company_name);
	if ($stmt->fetch()) {
	}
	$stmt->close();

	if (isset($company_id) && $company_id) {
		$is_admin = "1";
	}
}

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare(
	"insert into ht_user (`n_group`,`c_login`,`c_access_key`,`c_photo`,`c_photo_type`,`d_signin`,`c_disp_name`,`c_meeting`,`d_create`,`c_access_ip`,'b_admin')".
	"values (?, ?, ?, ?, ?, now(), ?, ?, now(), ?, ?)");
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
$my_room = generateRandomNumber();
$stmt->bind_param("issssssss",
	$free_group, $email, $hash, $photo_data, $photo_mime,
	$name, $my_room, $_SERVER["REMOTE_ADDR"], $is_admin);
if(!$stmt->execute()) {
	error_die("クエリに失敗しました", __LINE__, $stmt);
}
$user_id = $app->mysqli->insert_id;
$stmt->close();

$stmt = $app->mysqli->prepare(
	"insert into ht_janusmobile (`n_user`,`c_snsid`,`e_type`,`e_os`,`c_push_token`,`c_apns_token`,`c_voip_token`,`c_login_token`,`c_login_secret`,`c_photo_url`,`c_cover`,`c_cover_url`,`c_cover_type`, `b_debug_token`)".
	"values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
error_log("type = ".var_export($type, TRUE)."\n");
if (empty($uid)) {
	$uid = "0";
}
$stmt->bind_param("issssssssssssi",
	$user_id, $uid, $type, $os, $push, $apns, $voip, $token, $secret, $photo, $cover_data, $cover, $cover_mime, $debug);
if(!$stmt->execute()) {
	error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->close();

$pass = generateRandomString();
$stmt = $app->mysqli->prepare("INSERT INTO ht_meeting (n_host, c_meeting, c_pass, b_private) values (?, ?, ?, 1)");
if (!$stmt) {
	error_die("クエリに失敗しました", __LINE__);
}
$stmt->bind_param("iss", $user_id, $my_room, $pass);
if(!$stmt->execute()) {
	error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->close();

if ($type == 'hotbiz' && (!isset($company_id) || !$company_id)) {
	$stmt = $app->mysqli->prepare("INSERT INTO ht_company (c_name, c_hotbiz_name, c_hotbiz_server) values (?, ?, ?)");
	if (!$stmt) {
		error_die("クエリに失敗しました", __LINE__);
	}
	$stmt->bind_param("sss", $hotbiz, $hotbiz, $host);
	if(!$stmt->execute()) {
		error_die("クエリに失敗しました", __LINE__, $stmt);
	}
	$stmt->close();

	$company_id = $app->mysqli->insert_id;
	$company_name = $hotbiz;
}

$data = json_encode(array("result" => 0, "new_user" => TRUE, "result_string" => $hash, "user_id" => $user_id, "my_room" => $my_room,
	"mails" => $mails?$mails:array(), "company_id" => isset($company_id)?$company_id:"", "company_name" => isset($company_name)?$company_name:"",
	"is_admin" => $is_admin));
if ($data){
	$app->mysqli->commit();
	$app->addIPaddress();
	header('Content-Type: application/json');
	echo $data;
} else {
	$app->mysqli->rollback();
	http_response_code(500);
}
?>
