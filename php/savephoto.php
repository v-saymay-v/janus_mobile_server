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

$file = $_POST['file'];
$x = $_POST['x'];
$y = $_POST['y'];
$w = $_POST['w'];
$h = $_POST['h'];

$tmp_name = strrchr($file, '/');
$name = __DIR__."/upload".$tmp_name;

$type = exif_imagetype($name);
$mime = image_type_to_mime_type($type);
switch($type) {
case IMAGETYPE_GIF:
  $im = imagecreatefromgif($name);
  $im2 = imagecrop($im, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);
  $outname = $name.'_crop.gif';
  imagegif($im2, $outname);
  break;
case IMAGETYPE_JPEG:
  $im = imagecreatefromjpeg($name);
  $im2 = imagecrop($im, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);
  $outname = $name.'_crop.jpeg';
  imagejpeg($im2, $outname);
  break;
case IMAGETYPE_PNG:
  $im = imagecreatefrompng($name);
  $im2 = imagecrop($im, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);
  $outname = $name.'_crop.png';
  imagepng($im2, $outname);
  break;
case IMAGETYPE_WEBP:
  $im = imagecreatefromwebp($name);
  $im2 = imagecrop($im, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);
  $outname = $name.'_crop.webp';
  imagewebp($im2, $outname);
  break;
default:
  error_die(__LINE__, "対応していないファイル形式です");
}
imagedestroy($im2);
imagedestroy($im);

$img = file_get_contents($outname);
$en = base64_encode($img);
$binary_data = 'data:' . $mime . ';base64,' . $en;

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare("UPDATE `ht_user` set `c_photo`=?,`c_photo_type`=? WHERE `n_user` = ?");
if (!$stmt) {
  unlink($name);
  unlink($outname);
  error_die(__LINE__, "画像の保存に失敗しました");
}
$stmt->bind_param('ssi', $binary_data, $mime, $app->loggedInUser->user_id);
$result = $stmt->execute();
if (!$result) {
  unlink($name);
  unlink($outname);
  error_die(__LINE__, "画像の保存に失敗しました", $stmt);
}
$stmt->close();
$app->mysqli->commit();

unlink($name);
unlink($outname);

$data = array("result" => 0, "url" => $binary_data);
$data = json_encode($data);
if ($data){
	header('Content-Type: application/json');
	echo $data;
} else {
	http_response_code(500);
}
?>
