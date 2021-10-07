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

$session = urldecode($_POST['token']);
$app = new room_app($session);
if (!isset($app->loggedInUser)) {
    error_die(__LINE__, "セッションの有効期限が切れています");
}

$app->mysqli->begin_transaction();

$idx = 1;
while ($_POST['order'.$idx]) {
    $order = $_POST['order'.$idx];
    $idseq = explode(':', $order);
    $stmt = $app->mysqli->prepare("update ht_group set n_seq = ? where n_group = ?");
    if (!$stmt) {
        error_die(__LINE__, "クエリに失敗しました");
    }
    $stmt->bind_param('ii', $idseq[1], $idseq[0]);
    if (!$stmt->execute()) {
        error_die(__LINE__, "クエリに失敗しました", $stmt);
    }
    $stmt->close();
    ++$idx;
}

$app->mysqli->commit();

$data = array("result" => 0, "result_string" => "並び替えました");
header('Content-Type: application/json');
$data = json_encode($data);
echo $data;
?>
