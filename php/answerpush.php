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

if (isset($_GET['session'])) {
	$session = $_GET['session'];
} else if (isset($_POST['session'])) {
	$session = $_POST['session'];
}
$app = new room_app(isset($session)?$session:'');
if (!isset($app->loggedInUser)) {
	error_die(__LINE__, "ログインされていません");
}

$tag = isset($_GET['tag'])?$_GET['tag']:(isset($_POST['tag'])?$_POST['tag']:'');

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare("UPDATE `ht_videocall` set `d_finish` = now() where c_tag = ?");
if (!$stmt) {
  error_die(__LINE__, "ビデオコールの応答に失敗しました");
}
$stmt->bind_param('s', $tag);
$result = $stmt->execute();
$stmt->close();

if ($result && isset($_GET['tag'])) {
	$app->mysqli->begin_transaction();
	$stmt = $app->mysqli->prepare("UPDATE `ht_videocall` set `d_answer` = now() where c_tag = ?");
	if (!$stmt) {
	  error_die(__LINE__, "ビデオコールの応答に失敗しました");
	}
	$stmt->bind_param('s', $tag);
	$result = $stmt->execute();
	$stmt->close();
}
if ($result) {
  $app->mysqli->commit();
} else {
  $app->mysqli->rollback();
}

if (isset($_POST['tag'])) {
  $data = array("result" => 0, "result_string" => "ビデオコールをキャンセルしました");
  $data = json_encode($data);
	if ($data){
		header('Content-Type: application/json');
		echo $data;
	} else {
		http_response_code(500);
	}
} else {
  header('Location: index.php');
}
?>
