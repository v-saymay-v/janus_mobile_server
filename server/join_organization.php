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
<title>組織への参加</title>
</head>
<body>
<?php echo $mess ?>
</body>
</html>
<?
	die();
}

$session = urldecode($_GET['session']);
$mail = $_GET['mail'];
$allow = $_GET['allow'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$stmt = $app->mysqli->prepare(
    "select T2.c_push_token
    ,T1.c_subscription
    ,T2.e_type
    ,T2.e_os
    ,T2.c_voip_token
    ,T2.b_debug_token
     from ht_user T1
     left join ht_janusmobile T2
     on T1.n_user = T2.n_user
     where T2.n_user = ?");
if (!$stmt) {
    error_die(__LINE__, "メンバー一覧の取得に失敗しました");
}
$stmt->bind_param('i', $app->loggedInUser->user_id);
$stmt->execute();
$stmt->bind_result($push, $subscription, $type, $os, $voiptoken, $debug);
if (!$stmt->fetch()) {
    error_die(__LINE__, "送信先が見つかりませんでした", $stmt);
}
$stmt->close();

if ($allow=='yes') {
    $stmt = $app->mysqli->prepare(
        "select T2.n_company
        from ht_user T1
        ,ht_group T2
        where T2.n_group = T1.n_group
        and T1.c_login = ?");
    if (!$stmt) {
        error_die(__LINE__, "メンバー一覧の取得に失敗しました");
    }
    $stmt->bind_param('s', $mail);
    $stmt->execute();
    $stmt->bind_result($company_id);
    if (!$stmt->fetch()) {
        error_die(__LINE__, "送信先が見つかりませんでした", $stmt);
    }
    $stmt->close();
        
    $app->mysqli->begin_transaction();

    $stmt = $app->mysqli->prepare("select max(n_seq) from ht_group where n_company = ? for update");
    if (!$stmt) {
        error_die(__LINE__, "組織の追加に失敗しました");
    }
    $stmt->bind_param('i', $company_id);
    if (!$stmt->execute()) {
        error_die("クエリに失敗しました", __LINE__, $stmt);
    }
    if (!$stmt->bind_result($seq)) {
        $seq = 0;
    }
    $stmt->close();

    $group_name = "新規グループ";

    $stmt = $app->mysqli->prepare(
        " insert into ht_group (n_company,c_name,n_parent,n_seq,d_create)".
        " values (?, ?, 0, ?, now())");
    $stmt->bind_param('isi', $company_id, $group_name, $seq+1);
    if (!$stmt->execute()) {
        error_die("クエリに失敗しました", __LINE__, $stmt);
    }
    $group_id = $app->mysqli->insert_id();
    $stmt->close();

    $stmt = $app->mysqli->prepare("update ht_user set n_group = ? where n_user = ?");
    $stmt->bind_param('ii', $group_id, $app->loggedInUser->user_id);
    if (!$stmt->execute()) {
        error_die("クエリに失敗しました", __LINE__, $stmt);
    }
    if (!$stmt->bind_result($seq)) {
        $seq = 0;
    }
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
    $json = array("title" => "組織参加依頼", "body" => $allow=='yes'?'組織への参加が承諾されました':'組織への参加が拒否されました', "tag" => $tag);
    $report = $webPush->sendOneNotification($sub, json_encode($json));
  
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
        ->addData("command", "joinorganization")
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
<title>組織への参加</title>
</head>
<body>
<?php echo $allow=='yes'?'組織への参加を承諾しました':'組織への参加を拒否しました' ?>
</body>
</html>
