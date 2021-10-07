<?php
require_once("models/class.user.php");
require_once("app.php");
$app = new room_app();

$room = $_POST['roomid'];
$pass = $_POST['password'];

if (empty($room) || empty($pass)) {
	$data = array("result" => -1, "result_string" => "ログイン情報が指定されていません");
} else {
	$sql = "select c_title from ht_meeting where c_meeting = '".$room."' and c_pass = '".$pass."'";
	$query_result = $app->mysqli->query($sql);
	if ($query_result) {
		$row = $query_result->fetch_array();
		if ($row) {
			$title = $row['c_title'];
		} else {
			$data = array("result" => -1, "result_string" => "room IDまたはパスワードに誤りがあります");
		}
		$query_result->close();
	}
	if (isset($title)) {
		$data = array("result" => 0, "result_string" => $title);
	}
}

$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
