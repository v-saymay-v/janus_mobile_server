<?php
include('../../data/room/sns_keys.php');
include('../../data/room/db_connect.php');
require 'vendor/autoload.php';
require 'models/funcs.php';
require_once("app.php");
require_once("uuid_v4_factory.php");

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
    ,T2.c_voip_token
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
$stmt->bind_result($push, $subscription, $type, $os, $voiptoken, $debug);
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
    $tag = 'videocall_'.generateRandomNumber(16);
    $json = array("title" => "JanusMobile通知", "body" => $app->loggedInUser->displayname.'さんからRoomビデオコールの通知がありました', "tag" => $tag);
    $report = $webPush->sendOneNotification($sub, json_encode($json));
  
    // handle eventual errors here, and remove the subscription from your server if it is expired
    //$endpoint = $report->getRequest()->getUri()->__toString();
    if (!$report->isSuccess()) {
        error_die(__LINE__, "Push通知に失敗しました");
    } else {
		$app->mysqli->begin_transaction();
		$stmt = $app->mysqli->prepare("INSERT INTO `ht_videocall` (`c_tag`, `n_from`, `n_to`, `d_create`, `d_notice`) values (?, ?, ?, now(), now())");
		if (!$stmt) {
		  error_die(__LINE__, '');
		}
		$stmt->bind_param('sii', $tag, $app->loggedInUser->user_id, $askto);
		$result = $stmt->execute();
		if (!$result) {
			error_die(__LINE__, '', $stmt);
		}
		$stmt->close();
		$app->mysqli->commit();
    }
} else {
    if (empty($push)) {
        error_die(__LINE__, "Push通知を受け取れません");
    }

    $stmt = $app->mysqli->prepare(
        "select c_photo_url
         from ht_janusmobile T1
         where n_user = ?");
    if (!$stmt) {
        error_die(__LINE__, "メンバー一覧の取得に失敗しました");
    }
    $stmt->bind_param('i', $app->loggedInUser->user_id);
    $stmt->execute();
    $stmt->bind_result($photo);
    if (!$stmt->fetch()) {
        error_die(__LINE__, "送信先が見つかりませんでした", $stmt);
    }
    $stmt->close();
    
    $tag = UuidV4Factory::generate();
    if ($os == 'ios') {
        $options = [
            'key_id' => '42R5YL79HL', // The Key ID obtained from Apple developer account
            'team_id' => '7QX3T278VE', // The Team ID obtained from Apple developer account
            'app_bundle_id' => 'com.yourcompany.JanusMobile', // The bundle ID for app obtained from Apple developer account
            'private_key_path' => '../../data/room/YOUR_PRIVATE_KEY.p8', // Path to private key
            'private_key_secret' => null // Private key secret
        ];
        
        // Be aware of thing that Token will stale after one hour, so you should generate it again.
        // Can be useful when trying to send pushes during long-running tasks
        $authProvider = AuthProvider\Token::create($options);
    
        //$alert = Alert::create()->setTitle('Hello!');
        //$alert = $alert->setBody('First push notification');

        $payload = Payload::create();   //->setAlert($alert);

        //set notification sound to default
        //$payload->setSound('default');
        $payload->setContentAvailability(TRUE);
        $payload->setPushType('voip');

        //add custom value to your notification, needs to be customized
        //$payload->setCustomValue('key', 'value');
        $payload->setCustomValue("command", "asktojoin");
        $payload->setCustomValue("uuid", $tag);
        $payload->setCustomValue("from_id", $app->loggedInUser->user_id);
        $payload->setCustomValue("from_name", $app->loggedInUser->displayname);
        $payload->setCustomValue("from_photo", $photo);
        $payload->setCustomValue("from_number", $app->loggedInUser->privateroom);
        $payload->setCustomValue("caller_id", $app->loggedInUser->privateroom);
        $payload->setCustomValue("caller_name", $app->loggedInUser->displayname);
        $payload->setCustomValue("has_video", TRUE);
        $payload->setCustomValue("caller_id_type", "number");
        
        $deviceTokens = [$voiptoken];
        
        $notifications = [];
        foreach ($deviceTokens as $deviceToken) {
            $notifications[] = new Notification($payload, $deviceToken);
        }
        
        // If you have issues with ssl-verification, you can temporarily disable it. Please see attached note.
        // Disable ssl verification
        // $client = new Client($authProvider, $production = false, [CURLOPT_SSL_VERIFYPEER=>false] );
        $client = new Client($authProvider, $production = ($debug == 0));
        $client->addNotifications($notifications);
        
        $responses = $client->push(); // returns an array of ApnsResponseInterface (one Response per Notification)
        $response = $responses[0];

        if ($response->getStatusCode() != 200) {
          error_die(__LINE__, "Push通知に失敗しました(".$response->getErrorReason().':'.$response->getErrorDescription().")");
        }
    } else {
        $client = new \Fcm\FcmClient($FCM_Server_Key, $FCM_Sender_ID);
        $notification = new \Fcm\Push\Notification();
        
        $notification
            ->addRecipient($push)
            ->setColor('#20F037')
            ->setSound("default")
            //->setBadge(11)
            ->addData("command", "asktojoin")
            ->addData("uuid", $tag)
            ->addData("from_id", $app->loggedInUser->user_id)
            ->addData("from_name", $app->loggedInUser->displayname)
            ->addData("from_photo", $photo)
            ->addData("from_number", $app->loggedInUser->privateroom)
            ->addData("caller_id", $app->loggedInUser->privateroom)
            ->addData("caller_name", $app->loggedInUser->displayname)
            ->addData("has_video", TRUE)
            ->addData("caller_id_type", "number");
            $response = $client->send($notification);
        
        if (isset($response['error'])) {
            error_die(__LINE__, "Push通知に失敗しました(".$response['error'].")");
        }
    }
    $app->mysqli->begin_transaction();
    $stmt = $app->mysqli->prepare("INSERT INTO `ht_videocall` (`c_tag`, `n_from`, `n_to`, `d_create`, `d_notice`) values (?, ?, ?, now(), now())");
    if (!$stmt) {
        error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param('sii', $tag, $app->loggedInUser->user_id, $sendto);
    $stmt->execute();
    $stmt->close();
    $app->mysqli->commit();
}

$data = array("result" => 0, "result_string" => '通知を送信しました');
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
