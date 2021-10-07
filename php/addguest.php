<?php
require_once("app.php");

function error_die($line, $mess, $stmt = null)
{
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

$session = $_POST['token'];
$organization = $_POST['organization'];
$name = $_POST['name'];
$email = $_POST['email'];

$app = new room_app($session);
if (!isset($app->loggedInUser)) {
	error_die(__LINE__, "ログインされていません");
}

$pass = generateRandomString();
$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare(
	"INSERT INTO ht_user
	(`c_first_name`,`c_disp_name`,`c_login`,`c_pass`,`n_group`,`b_guest`)
	values
	(?, ?, ?, password(?), 2, 1)");
if (!$stmt) {
	error_die(__LINE__, "ゲストの追加に失敗しました");
}
$stmt->bind_param("ssss", $organization, $name, $email, $pass);
$result = $stmt->execute();
if (!$result) {
	error_die(__LINE__, "ゲストの追加に失敗しました", $stmt);
}
$user_id = $app->mysqli->insert_id;
$stmt->close();

$stmt = $app->mysqli->prepare(
	"INSERT INTO ht_janusmobile
	(`n_user`,`e_type`)
	 values
	(?, 'guest')");
if (!$stmt) {
	error_die(__LINE__, "ゲストの追加に失敗しました");
}
$stmt->bind_param("i", $user_id);
$result = $stmt->execute();
if (!$result) {
	error_die(__LINE__, "ゲストの追加に失敗しました", $stmt);
}
$stmt->close();

$app->mysqli->commit();

$data = array("result" => 0, "userid" => $user_id, "result_string" => "ゲストを追加しました");
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
