<?php
include('app.php');

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

$app = new room_app();

$os = $_POST['os'];
$push = $_POST['push'];
$voip = $_POST['voip'];
$apns = $_POST['apns'];
$gid = $_POST['gid'];
$mid = $_POST['mid'];
$pwd = $_POST['pwd'];
$debug = $_POST['debug'];
$type = "guest";
$group_id = 2;
$company_id = 2;

$cipher = "aes-256-cbc";
if (!in_array($cipher, openssl_get_cipher_methods())) {
	$cipher = openssl_get_cipher_methods()[0];
}

$stmt = $app->mysqli->prepare("select c_crypt_seed from ht_meeting where n_meeting = ?");
$stmt->bind_param("i", $mid);
$stmt->execute();
$stmt->bind_result($cryptSeed);
$stmt->fetch();
$stmt->close();

$plaintext = openssl_decrypt($pwd, $cipher, $cryptSeed);
$parts = explode("#", $plaintext);
$email = $parts[0];
$pass = $parts[1];

//error_log("select count(*) from ht_user where n_user = ".$gid." and c_login = '".$email."' and c_pass = '".$pass."'");
$stmt = $app->mysqli->prepare(
    "select c_first_name
    ,c_disp_name
     from ht_user
     where n_user = ".$gid."
     and c_login = '".$email."'
     and c_pass = '".$pass."'");
/*
    "select count(*)
     from ht_user
     where n_user = ?
     and c_login = ?
     and c_pass = ?");
*/
if (!$stmt) {
    error_die("クエリに失敗しました", __LINE__);
}
//$stmt->bind_param("iss", $gid, $mail, $pass);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__);
}
$stmt->bind_result($company, $disp);
if (!$stmt->fetch()) {
    error_die("一致するユーザーが見つかりません", __LINE__);
}
$stmt->close();

//error_log('count = '.$count);
/*
if ($count < 1) {
    error_die("一致するユーザーが見つかりません", __LINE__);
}
*/

$seed = $os.$type.$push.$email.$pass;
$hash = password_hash($seed, PASSWORD_BCRYPT, array('cost' => 16));

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare(
    " update ht_user T1".
    ",ht_janusmobile T2 set".
    " T1.`c_access_key` = ?".
    ",T1.`d_signin` = now()".
    ",T1.`b_delete` = 0".
    ",T1.`d_delete` = null".
    ",T2.`c_push_token` = ?".
    ",T2.`c_apns_token` = ?".
    ",T2.`c_voip_token` = ?".
    ",T2.`b_debug_token` = ?".
    ",T2.`e_type` = 'guest'".
    ",T2.`e_os` = ?".
    " where T2.`n_user` = T1.`n_user`".
    " and T1.`n_user` = ?");
if (!$stmt) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}
$stmt->bind_param("ssssisi",
    $hash, $push, $apns, $voip, $debug, $os, $gid);
if (!$stmt->execute()) {
    error_die("クエリに失敗しました", __LINE__, $stmt);
}

$app->mysqli->commit();
$app->addIPaddress();

$data = json_encode(array("result" => 0, "new_user" => FALSE, "result_string" => $hash,
    "user_id" => $gid, "my_room" => '', "room_pass" => '', "mails" => array($email),
    "disp_name" => $disp, "group_id" => $group_id, "group_name" => '無所属',
    "company_id" => $company_id, "company_name" => $company,
    "is_admin" => false));
header('Content-Type: application/json');
echo $data;
?>
