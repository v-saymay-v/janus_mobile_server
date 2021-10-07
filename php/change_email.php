<?php
require_once("models/languages/ja.php");
require_once("models/class.mail.php");
require_once("models/funcs.php");
require_once("app.php");

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

$mode = $_POST['mode'];
$password = $_POST['password'];
$newEmail = $_POST['newEmail'];
$db_table_prefix = "ht_";
$mail_templates_dir = "models/mail-templates/";

if ($mode == 'change') {
  if (trim($newEmail) == "") {
    error_die(__LINE__, lang("ACCOUNT_SPECIFY_EMAIL"));
  } else if(!isValidEmail($newEmail)) {
    //Check to ensure email is in the correct format / in the db
    error_die(__LINE__, lang("ACCOUNT_INVALID_EMAIL"));
  } else if(emailExists($app->mysqli, $newEmail)) {
    error_die(__LINE__, lang("ACCOUNT_EXISTS_EMAIL"));
  }

  //For security create a new activation url;
  $new_activation_token = generateActivationToken($app->mysqli);
  if (!updateLastActivationRequest($app->mysqli, $new_activation_token, $app->loggedInUser->email, $newEmail)) {
    error_die(__LINE__, lang("SQL_ERROR"));
  } else {
    $mail = new userCakeMail();

    $url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $idx = strpos($url, strrchr($url, '/'));
    $activation_url = substr($url, 0, $idx+1)."admin/activate-account.php?token=".$new_activation_token;

    //Setup our custom hooks
    $hooks = array(
      "searchStrs" => array("#ACTIVATION-URL#","#USERNAME#"),
      "subjectStrs" => array($activation_url, $app->loggedInUser->displayname)
    );

    if (!$mail->newTemplateMsg("resend-activation.txt", $hooks)) {
      error_die(__LINE__, lang("MAIL_TEMPLATE_BUILD_ERROR"));
    } else {
      if (!$mail->sendMail($newEmail, "HotRoomアカウントの確認")) {
        error_die(__LINE__, lang("MAIL_ERROR"));
      } else {
        //Success, user details have been updated in the db now mail this information out.
        $data = array("result" => 0, "result_string" => "アクティベーションメールを送信しました");
        $data = json_encode($data);
        if ($data){
          header('Content-Type: application/json');
        	echo $data;
        } else {
        	http_response_code(500);
        }
      }
    }
  }
} else if ($mode == 'cancel') {
  $stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
    SET c_activation_token = null,
    c_last_activation_request = null,
    c_update_mail = null
    WHERE c_login = ?");
  if (!$stmt) {
    error_die(__LINE__, "クエリに失敗しました");
  }
  $stmt->bind_param("s", $email);
  $result = $stmt->execute();
  $stmt->close();

  $data = array("result" => 0, "result_string" => "アクティベーションを中止しました");
  $data = json_encode($data);
  if ($data){
    header('Content-Type: application/json');
    echo $data;
  } else {
    http_response_code(500);
  }
}
?>
