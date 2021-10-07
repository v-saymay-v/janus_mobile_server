<?php
require_once("app.php");

$app = new room_app();
if (isset($app->loggedInUser)) {
  $stmt = $app->mysqli->prepare("select `c_photo`,`c_photo_type` from `ht_user` where n_user = ?");
  if ($stmt) {
    $stmt->bind_param('i', $app->loggedInUser->user_id);
    $stmt->execute();
    $stmt->bind_result($photo, $type);
    if ($stmt->fetch() && !empty($photo)) {
      header('Content-Type: text/plain');
      echo $photo;
      /*
      // Trim all Spaces
      $data = trim($photo);
      
      $newData = "";
      for($i = 0; $i < strlen($data); $i += 4) {
        $newData .= $data{$i} . $data{$i + 1};
      }
      
      $newData = pack("H*", $newData);
      $im = imagecreatefromstring($newData);

      header('Content-Type: '.$type);
      switch($type) {
        case "image/gif":
          imagegif($im);
          break;
        case "image/jpeg":
          imagejpeg($im);
          break;
        case "image/png":
          imagepng($im);
          break;
        case "image/webp":
          imagewebp($im);
          break;
      }
      imagedestroy($im);
      */

      $stmt->close();
      die();
    }
    $stmt->close();
  }
}

$name = __DIR__."/images/user.png";
$im = imagecreatefrompng($name);

header('Content-Type: image/png');
imagepng($im);
imagedestroy($im);
?>
