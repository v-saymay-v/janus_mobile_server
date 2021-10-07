<?php
include('/var/www/html/hotroom/vendor/autoload.php'); // この行を追加
include('/var/www/data/room/db_connect.php');

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

//CLI以外の起動を防ぐ
if (PHP_SAPI !== 'cli')
{
  die();
}
 
//pidファイルへのパス
define('PID_FILE_PATH', '/var/run/room/pushdaemon.pid');

$mysqli = null;
 
/**
 * $pathで示された.pidが示すプロセスが現在実行中かどうか判定する
 * このメソッドの副作用として、ファイルは存在するがプロセスが実行中でない場合は
 * ファイルを削除するので注意
 * @param string $path
 * @return bool
 */
function is_process($path = PID_FILE_PATH)
{
  //そもそも.pidファイルが見つからない場合はFALSEを返す
  if ( ! file_exists($path))
  {
    return FALSE;
  }
 
  //pidが指し示すプロセスが実行中か確認する($statusにintが入ってくる)
  $pid = trim(file_get_contents($path));
  system("ps {$pid} ", $status);
 
  //既存のプロセスが無ければファイルを削除しつつFALSEを返す
  if ($status)
  {
    unlink($path);
    return FALSE;
  }
 
  //既存のプロセスが実行中と判定
  return TRUE;
}
 
/**
 * 現在のプロセスIDを$pathに上書き保存する
 * $pathで示されるファイルが無ければ新規作成する
 * 成功可否がboolで返る
 * @param string $path
 * @return bool
 */
function set_pid_file($path = PID_FILE_PATH)
{
  //現在のプロセスIDを取得する
  $processID = getmypid();
 
  //$pathに上書き(無ければ新規作成)する
  $fp = fopen($path, 'w');
  $result = fwrite($fp, $processID, strlen($processID));
  fclose($fp);
 
  //fwriteの返り値によって成功/失敗を判定して返す
  return $result === FALSE ? FALSE : TRUE ;
}
 
/**
 * $pathで指定されたファイルに$textを追記する
 * $textの先頭に日付、末端に改行を勝手に入れる
 * @param string $path
 * @param string $text
 * @return bool
 */
function append_text()
{
  global $mysqli, $push_public, $push_secret;

  $stmt = $mysqli->prepare(
    "SELECT T1.`c_tag`
    ,T2.`c_disp_name`
    ,T2.`c_login`
    ,T3.`c_subscription`
    ,T4.`e_os`
    ,T4.`c_push_token`
    ,T4.`c_photo_url`
    ,T2.`n_user`
    ,T2.`c_meeting`
     from `ht_videocall` T1
    ,`ht_user` T2
    ,`ht_user` T3
    ,`ht_janusmobile` T4
     where T2.`n_user`=T1.`n_from`
     and T4.`n_user`=T3.`n_user`
     and T3.`n_user`=T1.`n_to`
     and now() > addtime(T1.`d_notice`,'0 00:05:00.0')
     and T1.`d_finish` is null");
  if (!$stmt) {
    syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    return;
  }
  $stmt->execute();
  $stmt->bind_result($tag, $name, $mail, $subscript, $os, $fcmtoken, $photo, $userid, $number);
  $pushes = array();
  while ($stmt->fetch()) {
    $push = array("tag" => $tag, "name" => $name, "mail" => $mail, "sub" => $subscript, "os" => $os, "fcm" => $fcmtoken);
    $pushes[] = $push;
  }
  $stmt->close();

  foreach($pushes as $push) {
    if ($os == 'web' && !empty($push['sub'])) {
      $jsonarray = (array)json_decode($push['sub']);
      $sub = Subscription::create($jsonarray);
      $auth = [
        'VAPID' => [
          'subject' => 'mailto:'.$push['mail'], // can be a mailto: or your website address
          'publicKey' => $push_public, // (recommended) uncompressed public key P-256 encoded in Base64-URL
          'privateKey' => $push_secret, // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
        ],
      ];
      $webPush = new WebPush($auth);

      $message = $push['name'].'さんからRoomビデオコールの着信がありました';
      $json = array("title" => "Room通知", "body" => $message, "tag" => $push['tag']);
      $report = $webPush->sendOneNotification($sub, json_encode($json));

      // handle eventual errors here, and remove the subscription from your server if it is expired
      $endpoint = $report->getRequest()->getUri()->__toString();
      $success = $report->isSuccess();
    } else if (!empty($push['fcm'])) {
      include('/var/www/data/room/sns_keys.php');

      $client = new \Fcm\FcmClient($FCM_Server_Key, $FCM_Sender_ID);
      $notification = new \Fcm\Push\Notification();
    
      $notification
          ->addRecipient($push['fcm'])
          ->setTitle('Janus Video Call')
          ->setColor('#20F037')
          ->setSound("default")
          //->setBadge(11)
          ->addData("command", "asktojoin")
          ->addData("uuid", $tag)
          ->addData("from_id", $userid)
          ->addData("from_name", $name)
          ->addData("from_photo", $photo)
          ->addData("from_number", $number);
      //error_log(var_export($notification->getBody(), TRUE));
      $response = $client->send($notification);
      $success = !isset($response['error']);
    }

    if ($success) {
      $mysqli->begin_transaction();
      $stmt = $mysqli->prepare("UPDATE `ht_videocall` set `d_notice` = now() where c_tag = ?");
      if ($stmt) {
        $stmt->bind_param('s', $tag);
        $result = $stmt->execute();
        $stmt->close();
        if ($result) {
          $mysqli->commit();
        } else {
          syslog(LOG_ERR, __LINE__.":".$mysqli->error);
          $mysqli->rollback();
        }
      } else {
        syslog(LOG_ERR, __LINE__.":".$mysqli->error);
        $mysqli->rollback();
      }
    } else {
      if ($os == 'web') {
        syslog(LOG_ERR, __LINE__.": Message failed to sent for subscription {$endpoint}: {$report->getReason()}");
      } else {
        syslog(LOG_ERR, __LINE__.": Message failed to sent for subscription {".$push['fcm']."}: {".$response['error']."}");
      }
      $mysqli->begin_transaction();
      $stmt = $mysqli->prepare("UPDATE `ht_videocall` set `d_finish` = now() where c_tag = ?");
      if ($stmt) {
        $stmt->bind_param('s', $tag);
        $result = $stmt->execute();
        $stmt->close();
        if ($result) {
          $mysqli->commit();
        } else {
          syslog(LOG_ERR, __LINE__.":".$mysqli->error);
          $mysqli->rollback();
        }
      } else {
        syslog(LOG_ERR, __LINE__.":".$mysqli->error);
        $mysqli->rollback();
      }
    }
  }

  $stmt = $mysqli->prepare(
    "SELECT T1.`c_tag`
    ,T2.`c_disp_name`
    ,T2.`c_login`
    ,T3.`c_subscription`
     from `ht_voicemail` T1
    ,`ht_user` T2
    ,`ht_user` T3
     where T2.`n_user` = T1.`n_from`
     and T3.`n_user` = T1.`n_to`
     and now() > addtime(T1.`d_notice`,'0 00:05:00.0')
     and T1.`d_read` is null");
  if (!$stmt) {
    syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    return;
  }
  $stmt->execute();
  $stmt->bind_result($tag, $name, $mail, $subscript);
  $pushes = array();
  while ($stmt->fetch()) {
    $push = array("tag" => $tag, "name" => $name, "mail" => $mail, "sub" => $subscript);
    $pushes[] = $push;
  }
  $stmt->close();

  foreach($pushes as $push) {
    if (!empty($push['sub'])) {
      $jsonarray = (array)json_decode($push['sub']);
      $sub = Subscription::create($jsonarray);
      $auth = [
        'VAPID' => [
          'subject' => 'mailto:'.$push['mail'], // can be a mailto: or your website address
          'publicKey' => $push_public, // (recommended) uncompressed public key P-256 encoded in Base64-URL
          'privateKey' => $push_secret, // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
        ],
      ];
      $webPush = new WebPush($auth);

      $message = $push['name'].'さんからRoomボイスメールが届いています';
      $json = array("title" => "Room通知", "body" => $message, "tag" => $push['tag']);
      $report = $webPush->sendOneNotification($sub, json_encode($json));

      // handle eventual errors here, and remove the subscription from your server if it is expired
      $endpoint = $report->getRequest()->getUri()->__toString();
      if ($report->isSuccess()) {
        $mysqli->begin_transaction();
        $stmt = $mysqli->prepare("UPDATE `ht_voicemail` set `d_notice` = now() where c_tag = ?");
        if ($stmt) {
          $stmt->bind_param('s', $tag);
          $result = $stmt->execute();
          $stmt->close();
          if ($result) {
            $mysqli->commit();
          } else {
            syslog(LOG_ERR, __LINE__.":".$mysqli->error);
            $mysqli->rollback();
          }
        } else {
          syslog(LOG_ERR, __LINE__.":".$mysqli->error);
          $mysqli->rollback();
        }
      } else {
        syslog(LOG_ERR, __LINE__.": Message failed to sent for subscription {$endpoint}: {$report->getReason()}");
      }
    }
  }
}
 
/**
 * 無限ループでタスクを実行する
 * $interval秒に一回実行される
 * @param $interval
 */
function task($interval = 1)
{
  global $mysqli, $db_host, $db_user, $db_pass, $db_name;

  $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
  if ($mysqli->connect_errno) {
    syslog(LOG_ERR, __FILE__.'('.__LINE__."): Could not connect to " . $db_name . "(" . mysqli_error() . ")");
    closelog();
    exit();
  }

  //変な$intervalを防ぐ
  $interval = ! is_int($interval) || $interval < 1 ? 1 : $interval;
 
  //無限ループでタスク実行
  while (TRUE)
  {
    append_text();
    //$interval秒停止
    sleep($interval);
  }
}
 
/**
 * 処理を実行する
 * 親プロセスの場合は子を実際に起動させる
 * 子プロセスはタスクを実行する
 */
function watch()
{
  //シグナルディスパッチを発動
  pcntl_signal_dispatch();
 
  //子プロセスを生成
  $pid = pcntl_fork();
 
  //失敗時はプロセスを終了させる
  if ($pid < 0)
  {
    syslog(LOG_ERR, __LINE__.": failed to start process");
    closelog();
    exit();
  }
 
  //子プロセスの場合
  elseif ($pid === 0)
  {
    //既にこのメソッドが実行中の場合はここで処理終了
    if (is_process())
    {
      syslog(LOG_ERR, __LINE__.": process already exists");
      closelog();
      exit();
    }
 
    //pidファイルの生成
    if ( ! set_pid_file())
    {
      //.pidファイル作成の失敗
      syslog(LOG_ERR, __LINE__.": could not create .pid file");
      closelog();
      exit();
    }
 
    //タスク実行
    task(3);
  }
 
  //親プロセスの場合
  else
  {
    //ゾンビプロセスから守る
    pcntl_wait($status);
 
    //シグナルによる停止(stopWatch())でなかった場合は再起動する
    if ( ! pcntl_wifsignaled($status) && ! is_process())
    {
      watch();
      closelog();
    }
  }
 
  //シグナルディスパッチを発動
  pcntl_signal_dispatch();
}
 
//処理実行
openlog("RoomDaemon",  LOG_CONS|LOG_PERROR|LOG_PID, LOG_USER);
watch();
?>
