<?php
require_once("models/class.user.php");
require_once("app.php");
$app = new room_app();

$mail = $_POST['mailaddr'];
$pass = $_POST['password'];
//$room = isset($_POST['roomid'])?$_POST['roomid']:'';

if (empty($mail) || empty($pass)) {
	$data = array("result" => -1, "result_string" => "ログイン情報が指定されていません");
} else {
	$sql =
		" select T1.n_user as n_user".
		",T1.c_date_format as c_date_format".
		",T1.b_guest as b_guest".
		" from ht_user T1".
		" where T1.c_login = '".$mail."'".
		" and T1.c_pass = password('".$pass."')";
	$query_result = $app->mysqli->query($sql);
	if ($query_result) {
		$row = $query_result->fetch_array();
		if ($row) {
			$user_id = $row['n_user'];
			$date_fromat = $row['c_date_format'];
			$is_guest = $row['b_guest'];
		} else {
			$data = array("result" => -1, "result_string" => "メールアドレスまたはパスワードに誤りがあります");
		}
		$query_result->close();
	}
	if (isset($user_id)) {
		$hash = password_hash($mail.$pass, PASSWORD_BCRYPT, array('cost' => 16));
		$app->mysqli->begin_transaction();
		$sql = "update ht_user set c_access_key='".$hash."',d_signin=now() where n_user=".$user_id;
		$query_result = $app->mysqli->query($sql);
		if ($query_result) {
			$app->mysqli->commit();
			$app->addIPaddress();
			$data = array("result" => 0, "result_string" => $hash, "date_fromat" => $date_fromat, "user_id" => $user_id, "is_guest" => $is_guest);
		} else {
			syslog(LOG_ERR, "Query failed(" . $app->mysqli->error . "): ".$sql);
			$data = array("result" => -1, "result_string" => "クエリに失敗しました");
			$app->mysqli->rollback();
		}
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
