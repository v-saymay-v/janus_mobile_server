<?php
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
	$data = array("status" => FALSE, "errorMessage" => "ログインされていません");
	header('Content-Type: application/json');
	$data = json_encode($data);
	echo $data;
	die();
}

if (is_uploaded_file($_FILES['file']['tmp_name'])) {
	if (filesize($_FILES['file']['tmp_name'] > 5*1024*1024)) {
		$data = array("status" => FALSE, "result" => 2, "errorMessage" => "アップロードできるファイルのサイズは最大5MBです");
  	$data = json_encode($data);
		if ($data){
			header('Content-Type: application/json');
			echo $data;
		} else {
			http_response_code(500);
		}
	}
  //一字ファイルを保存ファイルにコピーできたか
  $tmp_name = strrchr($_FILES['file']['tmp_name'], '/');
  if (move_uploaded_file($_FILES['file']['tmp_name'], __DIR__."/upload".$tmp_name)) {
    //正常
    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $file = strrchr($actual_link, '/');
    $data = array("status" => TRUE, "result" => substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/upload'.$tmp_name);
    header('Content-Type: application/json');
    $data = json_encode($data);
    echo $data;
  } else {
    //コピーに失敗（だいたい、ディレクトリがないか、パーミッションエラー）
    $data = array("status" => FALSE, "errorMessage" => "ファイル保存に失敗しました");
  	$data = json_encode($data);
		if ($data){
			header('Content-Type: application/json');
			echo $data;
		} else {
			http_response_code(500);
		}
  }
} else {
  //そもそもファイルが来ていない。
  $data = array("status" => FALSE, "errorMessage" => "アップロードされていません");
  $data = json_encode($data);
	if ($data){
		header('Content-Type: application/json');
		echo $data;
	} else {
		http_response_code(500);
	}
}
?>
