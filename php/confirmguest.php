<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>HotRoomゲスト登録</title>
</head>
<body>
<?php
include('../../data/room/db_connect.php');

ini_set("default_charset", "UTF-8");
ini_set("mbstring.http_output", "UTF-8");
ini_set("mbstring.internal_encoding", "UTF-8");

mb_language("Japanese");
mb_internal_encoding("UTF-8");
mb_detect_order("ASCII,UTF-8,EUC-JP,JIS,SJIS");

date_default_timezone_set('Asia/Tokyo');

$gid = $_GET['gid'];
$pwd = $_GET['pwd'];

openlog("RoomLog",  LOG_CONS|LOG_PERROR|LOG_PID, LOG_USER);

$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($mysqli->connect_errno) {
  syslog(LOG_ERR, __FILE__.'('.__LINE__."): Could not connect to " . $db_name . "(" . mysqli_error() . ")");
  die("Could not connect to " . $db_name);
}

#$stmt = $mysqli->prepare("SELECT c_login,c_pass,aes_decrypt(from_base64(c_photo), ?) from ht_user where n_user = ?");
$stmt = $mysqli->prepare("SELECT c_login, c_pass from ht_user where n_user = ?");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$mysqli->error);
  die("Query failed");
}
#$stmt->bind_param("si", $db_key, $gid);
$stmt->bind_param("i", $gid);
$stmt->execute();
$stmt->bind_result($email, $seed);
$stmt->fetch();
$stmt->close();

$cipher = "aes-256-cbc";
if (!in_array($cipher, openssl_get_cipher_methods())) {
  $cipher = openssl_get_cipher_methods()[0];
}
$plaintext = openssl_decrypt($pwd, $cipher, $seed);

$ar = explode('#', $plaintext);
if ($ar[0] != $email || $ar[1] != $seed) {
?>
  <p>登録内容とキーが一致しません。</p>
<?php
  $mysqli->close();
  die();
}

$stmt = $mysqli->prepare("SELECT T1.c_meeting,T1.c_pass,T1.c_auth_method,T1.d_start,T1.c_crypt_seed from ht_meeting T1,ht_meeting_users T2 where T1.n_meeting = T2.n_meeting and T2.n_user = ?");
if (!$stmt) {
  syslog(LOG_ERR, __LINE__.":".$mysqli->error);
  die("Query failed");
}
$stmt->bind_param("i", $gid);
$stmt->execute();
$stmt->bind_result($meetingNo, $meetingPass, $whichPass, $dateTime, $cryptSeed);
$stmt->fetch();
$stmt->close();

$cipher = "aes-256-cbc";
if (!in_array($cipher, openssl_get_cipher_methods())) {
	$cipher = openssl_get_cipher_methods()[0];
}

$subject = mb_convert_encoding("HotRoomミーティングの開催予定", "ISO-2022-JP", "AUTO");
$subject = mb_encode_mimeheader($subject);

$dt = new DateTime($dateTime);
$bodys = array (
	"開催日時: ".$dt->format('Y年n月j日 G時i分'),
	"Roomミーティングに参加する",
	"",
	"",
  "メールアドレス：".$email,
  "ログインパスワード：".$pass,
	$whichPass=='meeting'?"ルームパスワード: ".$meetingPass:"入室するにはホストの許可が必要です。\n初めてご利用になる場合、メールアドレスとパスワードによる認証が必要です。"
);

$headers  = "MIME-Version: 1.0 \n" ;
$headers .= "From: " .
       "".mb_encode_mimeheader(mb_convert_encoding("HotRoom管理者","ISO-2022-JP","AUTO")) ."" .
       "<admin@asj.ad.jp> \n";
$headers .= "Reply-To: " .
       "".mb_encode_mimeheader(mb_convert_encoding("返信不可","ISO-2022-JP","AUTO")) ."" .
       "<no-reply@asj.ad.jp> \n";
$headers .= "Content-Type: text/plain;charset=ISO-2022-JP \n";

$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$idx = strpos($url, strrchr($url, '/'));
$plaintext = $email.'#'.$seed;
$ciphertext = openssl_encrypt($plaintext, $cipher, $cryptSeed);
$bodys[2] = substr($url, 0, $idx+1).'room.php?roomId='.$meetingNo.'&pwd='.urlencode($ciphertext);
$body = mb_convert_encoding(join("\r\n", $bodys), "ISO-2022-JP", "AUTO");
if (!mail($email, $subject, $body, $headers, $sendmail_params)) {
?>
  <p>メール送信に失敗しました。</p>
<?php
} else {
?>
  <p>登録されたメールアドレスに、HotRoomミーティングに参加するために必要な情報を送信しました。</p>
<?php
}
closelog();
$mysqli->close();
?>
</body>
</html>
