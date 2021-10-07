<?php
include('../../data/room/sns_keys.php');
include('../../data/room/db_connect.php');
require 'vendor/autoload.php';
require 'models/funcs.php';
require_once("app.php");

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\VAPID;

use Pushok\AuthProvider;
use Pushok\Client;
use Pushok\Notification;
use Pushok\Payload;
use Pushok\Payload\Alert;

function error_die($line, $mess, $stmt = null) {
	global $app;

	error_log($line.":".$mess."(".$app->mysqli->error.")");
    syslog(LOG_ERR, $line.":".$mess.":".$app->mysqli->error);
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

$session = $_GET['token'];
$askto = $_GET['askto'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare(
    "select T2.c_push_token
    ,T1.c_subscription
    ,T2.e_type
    ,T2.e_os
    ,T2.c_apns_token
    ,T2.b_debug_token
     from ht_user T1
     left join ht_janusmobile T2
     on T1.n_user = T2.n_user
     where T2.n_user = ?");
if (!$stmt) {
    error_die(__LINE__, "メンバー一覧の取得に失敗しました");
}
$stmt->bind_param('i', $askto);
$stmt->execute();
$stmt->bind_result($push, $subscription, $type, $os, $apnstoken, $debug);
if (!$stmt->fetch()) {
    error_die(__LINE__, "送信先が見つかりませんでした", $stmt);
}
$stmt->close();

if ($os == "web") {
    if (empty($subscription)) {
        error_die(__LINE__, "Push通知を受け取れません");
    }
    $jsonarray = (array)json_decode($subscription);
    $sub = Subscription::create($jsonarray);
    $auth = [
      'VAPID' => [
        'subject' => 'mailto:'.$app->loggedInUser->email, // can be a mailto: or your website address
        'publicKey' => $push_public, // (recommended) uncompressed public key P-256 encoded in Base64-URL
        'privateKey' => $push_secret, // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
      ],
    ];
    $webPush = new WebPush($auth);
    $tag = 'meeting_'.$app->loggedInUser->privateroom;
    $json = array("title" => "JanusMobile通知", "body" => $app->loggedInUser->displayname.'さんからミーティングへの参加要請がありました', "tag" => $tag);
    $report = $webPush->sendOneNotification($sub, json_encode($json));
//error_log(var_export($jsonarray, TRUE));
//error_log(var_export($report, TRUE));
  
    // handle eventual errors here, and remove the subscription from your server if it is expired
    //$endpoint = $report->getRequest()->getUri()->__toString();
    if (!$report->isSuccess()) {
        error_die(__LINE__, "Push通知に失敗しました");
    }
} else {
    if (empty($push)) {
        error_die(__LINE__, "Push通知を受け取れません");
    }

    $stmt = $app->mysqli->prepare(
        "select T1.c_photo_url
        ,T1.c_login_token
        ,T1.c_snsid
        ,T2.c_pass
         from ht_janusmobile T1
         left join ht_meeting T2 on T2.n_host = T1.n_user and T2.b_private != 0
         where T1.n_user = ?");
    if (!$stmt) {
        error_die(__LINE__, "メンバー一覧の取得に失敗しました");
    }
    $stmt->bind_param('i', $app->loggedInUser->user_id);
    $stmt->execute();
    $stmt->bind_result($photo, $cookie, $snsid, $pass);
    if (!$stmt->fetch()) {
        error_die(__LINE__, "送信先が見つかりませんでした", $stmt);
    }
    $stmt->close();
    $client = new \Fcm\FcmClient($FCM_Server_Key, $FCM_Sender_ID);
    $notification = new \Fcm\Push\Notification();
    
    $notification
        ->addRecipient($push)
        ->setColor('#20F037')
        ->setSound("default")
        ->addData("command", "joinroomrequest")
        ->addData("meeting", $app->loggedInUser->privateroom)
        ->addData("room_pass", $pass)
        ->addData("from_id", $snsid)
        ->addData("from_name", $app->loggedInUser->displayname)
        ->addData("from_photo", $photo);
    if ($cookie)
        $notification->addData("from_cookie", $cookie);
    $response = $client->send($notification);

    if (isset($response['error'])) {
        error_die(__LINE__, "Push通知に失敗しました(".$response['error'].")");
    }
}

$data = array("result" => 0, "result_string" => '通知を送信しました');
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
