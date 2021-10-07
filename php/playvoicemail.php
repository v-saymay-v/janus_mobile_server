<?php
require_once("app.php");

$app = new room_app();
if (!isset($app->loggedInUser)) {
  header('Content-Type: audio/ogg');
  echo "";
	die();
}

$tag = isset($_GET['tag'])?$_GET['tag']:'';
if (empty($tag)) {
  header('Content-Type: audio/ogg');
  echo "";
	die();
}

$app->mysqli->begin_transaction();
$stmt = $app->mysqli->prepare("SELECT `c_filename` from `ht_voicemail` where `c_tag` = ?");
if (!$stmt) {
  header('Content-Type: audio/ogg');
  echo "";
	die();
}
$stmt->bind_param('s', $tag);
$result = $stmt->execute();
$stmt->bind_result($filename);
$stmt->fetch();
$stmt->close();

$size = filesize("/home/janus/share/audio/".$filename);
$fh = fopen("/home/janus/share/audio/".$filename, "r");
$buff = fread($fh, $size);
header('Content-Type: audio/ogg');
fwrite($fh, $buff, $size);
fflush($fh);
fclose($fh);
?>
