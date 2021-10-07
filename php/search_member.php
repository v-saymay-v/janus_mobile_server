<?php
require_once("app.php");
$app = new room_app();

function outputdata($data)
{
  $data = json_encode($data);
  if ($data) {
    header('Content-Type: application/json');
    echo $data;
  } else {
  	http_response_code(500);
  }
}

if (isset($app->loggedInUser)) {
  $group_id = $_POST['group'];
  $stmt = $app->mysqli->prepare("SELECT
		T1.n_user as id,
    T1.c_disp_name as username,
    T2.c_name as groupname
		FROM ht_user T1,ht_group T2
		WHERE T1.n_group = T2.n_group
    AND (T1.b_admin = 0 or T1.b_admin is null)
    AND (T1.b_delete = 0 or T1.b_delete is null)
    AND T2.n_group = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$app->mysqli->error);
    outputdata(array());
		die();
	}
	$data = array();
  $stmt->bind_param("i", $group_id);
	$stmt->execute();
	$stmt->bind_result($id, $name, $group);
	while ($stmt->fetch()) {
		$data[] = array('id' => $id, 'name' => $name, 'group' => $group);
	}
	$stmt->close();
}
else {
  syslog(LOG_ERR, __LINE__.": no cookie");
  $data = array();
}
outputdata($data);
?>
