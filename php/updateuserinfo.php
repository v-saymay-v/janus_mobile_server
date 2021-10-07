<?php
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
$displayName = isset($_POST['displayName'])?$_POST['displayName']:'';
$jobTitle = isset($_POST['jobTitle'])?$_POST['jobTitle']:'';
$groupid = isset($_POST['groupid'])?$_POST['groupid']:'';
$groupName = isset($_POST['groupName'])?$_POST['groupName']:'';
$meetingId = isset($_POST['meetingId'])?$_POST['meetingId']:'';
$dateFormat = isset($_POST['dateFormat'])?$_POST['dateFormat']:'';
$hostKey = isset($_POST['hostKey'])?$_POST['hostKey']:'';

$stmt = NULL;
$app->mysqli->begin_transaction();
switch ($mode) {
  case 'nametitle':
    $stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_disp_name` = ?,`c_job_title` = ?,`n_group` = ? WHERE `n_user` = ?");
    if (!$stmt) {
      error_die(__LINE__, "ユーザー情報の保存に失敗しました");
    }
    $stmt->bind_param('ssii', $displayName, $jobTitle, $groupid, $app->loggedInUser->user_id);
		$app->loggedInUser->displayname = $displayName;
		$app->loggedInUser->group_id = $groupid;
		$app->loggedInUser->groupname = $groupName;
		$app->loggedInUser->jobTitle = $jobTitle;
    break;
  case 'meeting':
    $stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_meeting`= ? WHERE `n_user` = ?");
    if (!$stmt) {
      error_die(__LINE__, "ユーザー情報の保存に失敗しました");
    }
    $stmt->bind_param('si', $meetingId, $app->loggedInUser->user_id);
		$app->loggedInUser->privateroom = $meetingId;
    break;
  case 'date':
    $stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_date_format`= ? WHERE `n_user` = ?");
    if (!$stmt) {
      error_die(__LINE__, "ユーザー情報の保存に失敗しました");
    }
    $stmt->bind_param('si', $dateFormat, $app->loggedInUser->user_id);
		convDateFormat($dateFormat, $php_format, $js_format);
		$app->loggedInUser->dateformat = $dateFormat;
		$app->loggedInUser->jsformat = $js_format;
		$app->loggedInUser->phpformat = $php_format;
    break;
  case 'hostkey':
    $stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_host_key`= ? WHERE `n_user` = ?");
    if (!$stmt) {
      error_die(__LINE__, "ユーザー情報の保存に失敗しました");
    }
    $stmt->bind_param('si', $hostKey, $app->loggedInUser->user_id);
		$app->loggedInUser->hostkey = $hostKey;
    break;
  default:
    error_die(__LINE__, "ユーザー情報の保存に失敗しました");
}
if ($stmt) {
	$result = $stmt->execute();
	if (!$result) {
	  error_die(__LINE__, "ユーザー情報の保存に失敗しました", $stmt);
	}
	$stmt->close();
}
$app->mysqli->commit();

$_SESSION["userCakeUser"] = $app->loggedInUser;

$data = array("result" => 0, "result_string" => "ユーザー情報を保存しました");
$data = json_encode($data);
if ($data){
  header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
