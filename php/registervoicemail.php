<?php
require 'autoload.php'; // この行を追加
require 'models/funcs.php';
include('../../data/room/db_connect.php');
require_once("app.php");

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

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

$to = $_POST['sendto'];
$url = $_POST['url'];

$stmt = $app->mysqli->prepare("SELECT `c_subscription` from `ht_user` where `n_user` = ?");
if (!$stmt) {
  error_die(__LINE__, "ボイスメールの保存に失敗しました");
}
$stmt->bind_param('i', $to);
$stmt->execute();
$stmt->bind_result($subscription);
$stmt->fetch();
$stmt->close();

if (!empty($subscription)) {
  $data = array("result" => 0, "result_string" => "通知を送信しました");
  $jsonarray = (array)json_decode($subscription);
  $sub = Subscription::create($jsonarray);
  $auth = [
    'VAPID' => [
      'subject' => 'mailto:'.$app->loggedInUser->email, // can be a mailto: or your website address
      'publicKey' => $push_public, // (recommended) uncompressed public key P-256 encoded in Base64-URL
      'privateKey' => $push_secret, // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
      //'pemFile' => 'path/to/pem', // if you have a PEM file and can link to it on your filesystem
      //'pem' => 'pemFileContent', // if you have a PEM file and want to hardcode its content
    ],
  ];
  $webPush = new WebPush($auth);
	$tag = 'voicemail_'.generateRandomNumber(16);
	$data["tag"] = $tag;
  $json = array("title" => "Room通知", "body" => $app->loggedInUser->displayname."さんからボイスメールが届いています", "tag" => $tag);
  $report = $webPush->sendOneNotification($sub, json_encode($json));

  // handle eventual errors here, and remove the subscription from your server if it is expired
  $endpoint = $report->getRequest()->getUri()->__toString();
  if ($report->isSuccess()) {
    error_log("[v] Message sent successfully for subscription {$endpoint}.");

    $idx = strrpos($url, '/');
    $filename = substr($url, $idx+1);
    $app->mysqli->begin_transaction();
    $stmt = $app->mysqli->prepare("INSERT INTO  `ht_voicemail` (`c_tag`, `n_from`,`n_to`,`c_filename`,`d_create`,`d_notice`) values (?, ?, ?, ?, now(), now())");
    if (!$stmt) {
      error_die(__LINE__, "ボイスメールの保存に失敗しました");
    }
    $stmt->bind_param('siis', $tag, $app->loggedInUser->user_id, $to, $filename);
    $result = $stmt->execute();
    if (!$result) {
      error_die(__LINE__, "ボイスメールの保存に失敗しました", $stmt);
    }
    $stmt->close();
    $app->mysqli->commit();
  } else {
    error_log("[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}");
		$data = array("result" => -1, "result_string" => "通知の送信に失敗しました");
  }
} else {
  $data = array("result" => -1, "result_string" => "指定されたユーザーは通知を承認していません");
}

$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
