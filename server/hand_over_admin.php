<?php
include('../../data/room/sns_keys.php');
include('../../data/room/db_connect.php');
require 'vendor/autoload.php';
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
    syslog(LOG_ERR, $line.":".$app->mysqli->error);
	if ($stmt) {
		$stmt->close();
	}
	$app->mysqli->rollback();
?>
<!DOCTYPE html>
<html lang="jp-JP">
<head>
<title>管理者の設定</title>
</head>
<body>
<?php echo $mess ?>
</body>
</html>
<?
	die();
}

$session = urldecode($_GET['session']);
$allow = $_GET['allow'];
$mail = $_GET['mail'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

//error_log('groupId = '.$app->loggedInUser->group_id);
//error_log('userId = '.$app->loggedInUser->user_id);

$stmt = $app->mysqli->prepare(
    "select T2.c_push_token
    ,T1.c_subscription
    ,T2.e_type
    ,T2.e_os
    ,T2.c_voip_token
    ,T2.b_debug_token
    ,T1.n_user
     from ht_user T1
     left join ht_janusmobile T2
     on T1.n_user = T1.n_user
     where T1.c_login = ?");
if (!$stmt) {
    error_die(__LINE__, "メンバー一覧の取得に失敗しました");
}
$stmt->bind_param('s', $mail);
$stmt->execute();
$stmt->bind_result($push, $subscription, $type, $os, $voiptoken, $debug, $user_id);
if (!$stmt->fetch()) {
    error_die(__LINE__, "送信先が見つかりませんでした", $stmt);
}
$stmt->close();

if ($allow == 'yes') {
    $app->mysqli->begin_transaction();
    $stmt = $app->mysqli->prepare("update ht_user set b_admin = 1 where n_user = ?");
    if (!$stmt) {
        error_die(__LINE__, "メンバー一覧の取得に失敗しました");
    }
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $app->mysqli->prepare(
        "update ht_user set b_admin = 0 where n_user = ?");
    if (!$stmt) {
        error_die(__LINE__, "メンバー一覧の取得に失敗しました");
    }
    $stmt->bind_param('i', $app->loggedInUser->user_id);
    $stmt->execute();
    $stmt->close();
	$app->mysqli->commit();
}

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
    $json = array("title" => "管理者委譲", "body" => $allow=='yes'?'管理者の移譲が承認されました':'管理者の移譲が否認されました', "tag" => $tag);
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

    $client = new \Fcm\FcmClient($FCM_Server_Key, $FCM_Sender_ID);
    $notification = new \Fcm\Push\Notification();
    
    $notification
        ->addRecipient($push)
        ->setColor('#20F037')
        ->setSound("default")
        ->addData("command", "makemenewadmin")
        ->addData("allowed", $allow);
    $response = $client->send($notification);

    if (isset($response['error'])) {
        error_die(__LINE__, "Push通知に失敗しました(".$response['error'].")");
    }
}
?>
<!DOCTYPE html>
<html lang="jp-JP">
<head>
<title>管理者の設定</title>
</head>
<body>
<?php echo $allow=='yes'?'管理者の移譲を承認しました':'管理者の移譲を否認しました' ?>
</body>
</html>
