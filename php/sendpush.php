<?php
require 'vendor/autoload.php'; // この行を追加
require 'models/funcs.php';
include('../../data/room/db_connect.php');
include('../../data/room/sns_keys.php');
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
  syslog(LOG_ERR, $line.":".$app->mysqli->error);
  error_log($line.": ".$mess);
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
	$data = array("result" => -1, "result_string" => "ログインされていません");
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

$sendto = $_POST['sendto'];
$message = $_POST['message'];

//error_log(var_export(VAPID::createVapidKeys(), TRUE));

$stmt = $app->mysqli->prepare(
  "SELECT T1.`c_subscription`
  ,T2.`c_push_token`
  ,T2.`c_voip_token`
  ,T2.`b_debug_token`
  ,T2.`e_os`
   from `ht_user` T1
  ,`ht_janusmobile` T2
   where T2.`n_user` = T1.`n_user`
   and T1.`n_user` = ?");
if (!$stmt) {
  error_die(__LINE__, "クエリに失敗しました");
}
$stmt->bind_param('i', $sendto);
$stmt->execute();
$stmt->bind_result($subscription, $pushtoken, $voiptoken, $debug, $os);
$stmt->fetch();
$stmt->close();

if ($os == "web") {
  if (!empty($subscription)) {
    $data = array("result" => 0, "result_string" => "通知を送信しました");
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
    $json = array("title" => "Room通知", "body" => $message, "tag" => $tag);
    $report = $webPush->sendOneNotification($sub, json_encode($json));

    // handle eventual errors here, and remove the subscription from your server if it is expired
    $endpoint = $report->getRequest()->getUri()->__toString();
    if ($report->isSuccess()) {
      error_log("[v] Message sent successfully for subscription {$endpoint}.");

      $app->mysqli->begin_transaction();
      $stmt = $app->mysqli->prepare("INSERT INTO `ht_videocall` (`c_tag`, `n_from`, `n_to`, `d_create`, `d_notice`) values (?, ?, ?, now(), now())");
      if (!$stmt) {
        error_die(__LINE__, "クエリに失敗しました");
      }
      $stmt->bind_param('sii', $tag, $app->loggedInUser->user_id, $sendto);
      $stmt->execute();
      $stmt->close();
      $app->mysqli->commit();
    } else {
      error_log("[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}");
      $data = array("result" => -1, "result_string" => "通知の送信に失敗しました");
    }
  } else {
    $data = array("result" => -1, "result_string" => "指定されたユーザーは通知を承認していません");
  }
} else {
  if (empty($pushtoken)) {
    error_die(__LINE__, "指定されたユーザーは通知を承認していません");
  }

  $stmt = $app->mysqli->prepare("SELECT `c_photo_url` from `ht_janusmobile` where `n_user` = ?");
  if (!$stmt) {
    error_die(__LINE__, "クエリに失敗しました");
  }
  $stmt->bind_param('i', $app->loggedInUser->user_id);
  $stmt->execute();
  $stmt->bind_result($photo);
  $stmt->fetch();
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
    
    $payload = Payload::create()->setAlert($alert);
    
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
    /*
    foreach ($responses as $response) {
        // The device token
        $response->getDeviceToken();
        // A canonical UUID that is the unique ID for the notification. E.g. 123e4567-e89b-12d3-a456-4266554400a0
        $response->getApnsId();
        
        // Status code. E.g. 200 (Success), 410 (The device token is no longer active for the topic.)
        $response->getStatusCode();
        // E.g. The device token is no longer active for the topic.
        $response->getReasonPhrase();
        // E.g. Unregistered
        $response->getErrorReason();
        // E.g. The device token is inactive for the specified topic.
        $response->getErrorDescription();
        $response->get410Timestamp();
    }
    */
    if ($response->getStatusCode() != 200) {
      $pusherror = $response->getErrorReason().':'.$response->getErrorDescription();
    }
  } else {
    $client = new \Fcm\FcmClient($FCM_Server_Key, $FCM_Sender_ID);
    $notification = new \Fcm\Push\Notification();

    $notification
        ->addRecipient($pushtoken)
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
        //error_log(var_export($notification->getBody(), TRUE));
    $response = $client->send($notification);
    if (isset($response['error'])) {
      $pusherror = $response['error'];
    }
  }

  if (isset($pusherror)) {
    error_die(__LINE__, $pusherror);
  } else {
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
  $data = array("result" => 0, "result_string" => "通知を送信しました");
}

$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}

?>