<?php
require_once("app.php");

function error_die($line, $mess, $stmt=null) {
  global $app;

	error_log($line.":".$mess."(".$app->mysqli->error.")");
  syslog(LOG_ERR, $line.":".$app->mysqli->error);
  if ($stmt) {
    $stmt->close();
  }

  $data = array("result_string" => -1, "result_string" => $mess);
  header('Content-Type: application/json');
  $data = json_encode($data);
  echo $data;
  die();
}

$app = new room_app();
if (!isset($app->loggedInUser)) {
  error_die(__LINE__, "ログインされていません");
}

$meeting = $_POST['id'];
$command = $_POST['command'];
$option = $_POST['option'];
$date = $_POST['date'];
$sendMail = $_POST['sendMail']=='true'?TRUE:FALSE;
$subject = $_POST['subject'];
$mailBody = $_POST['mailBody'];

$stmt = $app->mysqli->prepare("select n_meeting from ht_meeting where c_meeting=?");
if (!$stmt) {
  error_die(__LINE__, "クエリに失敗しました");
}
$stmt->bind_param("s", $meeting);
$stmt->execute();
$stmt->bind_result($meetingId);
$stmt->fetch();
$stmt->close();

if ($command == 'delete') {
  $userids = array();
  if ($sendMail) {
    $stmt = $app->mysqli->prepare("SELECT n_user FROM ht_meeting_users WHERE n_meeting = ?");
    if (!$stmt) {
      error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param("i", $meetingId);
    $result = $stmt->execute();
    $stmt->bind_result($userid);
    while ($stmt->fetch()) {
      $userids[] = $userid;
    }
    $stmt->close();
  }

  $app->mysqli->begin_transaction();

  if ($option == "all") {
    $stmt = $app->mysqli->prepare("DELETE FROM ht_meeting WHERE n_meeting = ?");
    if (!$stmt) {
      error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param("i", $meetingId);
    $result = $stmt->execute();
    $stmt->close();

    $stmt = $app->mysqli->prepare("DELETE FROM ht_meeting_users WHERE n_meeting = ?");
    if (!$stmt) {
      error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param("i", $meetingId);
    $result = $stmt->execute();
    $stmt->close();
    
    $stmt = $app->mysqli->prepare("DELETE FROM ht_meeting_days WHERE n_meeting = ?");
    if (!$stmt) {
      error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param("i", $meetingId);
    $result = $stmt->execute();
    $stmt->close();
  } else {
    $stmt = $app->mysqli->prepare("DELETE FROM ht_meeting_days WHERE n_meeting = ? and date(d_date) = ?");
    if (!$stmt) {
      error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param("i", $meetingId, $date);
    $result = $stmt->execute();
    $stmt->close();
  }
  $app->mysqli->commit();

  if ($sendMail) {
    $subject = mb_convert_encoding($subject, "ISO-2022-JP","AUTO");
    $subject = mb_encode_mimeheader($subject);
    $sendmail_params  = "-f".$app->loggedInUser->email;
    $body = mb_convert_encoding($mailBody, "ISO-2022-JP", "AUTO");
    foreach ($userids as $userid) {
      $stmt = $app->mysqli->prepare("SELECT c_login,c_disp_name FROM ht_user WHERE n_user = ?");
      if ($stmt) {
        $stmt->bind_param("i", $userid);
        $result = $stmt->execute();
        $stmt->bind_result($email, $name);
        if ($stmt->fetch()) {
          $headers  = "MIME-Version: 1.0 \n" ;
          $headers .= "From: ".mb_encode_mimeheader(mb_convert_encoding($app->loggedInUser->displayname,"ISO-2022-JP","AUTO"))."<".$app->loggedInUser->email."> \n";
          $headers .= "To: ".mb_encode_mimeheader(mb_convert_encoding($name,"ISO-2022-JP","AUTO"))."<".$email."> \n";
          $headers .= "Reply-To: ".mb_encode_mimeheader (mb_convert_encoding($app->loggedInUser->displayname,"ISO-2022-JP","AUTO"))."<".$app->loggedInUser->email."> \n";
          $headers .= "Content-Type: text/plain;charset=ISO-2022-JP \n";
          mail($email, $subject, $body, $headers, $sendmail_params);
        }
        $stmt->close();
      }
    }
  }
  $data = array("result" => 0, "result_string" => "ミーティングを削除しました");
} else if ($command == 'end') {
	$app->mysqli->begin_transaction();

  $stmt = $app->mysqli->prepare("UPDATE ht_meeting_days SET d_finish = now() WHERE date(d_date) = ? and n_meeting = ?");
  if (!$stmt) {
    error_die(__LINE__, "クエリに失敗しました");
  }
  $stmt->bind_param("si", $date, $meetingId);
	$result = $stmt->execute();
  $stmt->close();

	$app->mysqli->commit();
	$data = array("result" => 0, "result_string" => "ミーティングは終了しました");
}

$data = json_encode($data);
if ($data){
  header('Content-Type: application/json');
  echo $data;
} else {
  http_response_code(500);
}
echo $data;
?>
