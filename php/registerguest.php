<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>HotRoomゲスト登録</title>
</head>
<body>
<?php
include('../../data/room/db_connect.php');
include('app.php');

ini_set("default_charset", "UTF-8");
ini_set("mbstring.http_output", "UTF-8");
ini_set("mbstring.internal_encoding", "UTF-8");

mb_language("Japanese");
mb_internal_encoding("UTF-8");
mb_detect_order("ASCII,UTF-8,EUC-JP,JIS,SJIS");

date_default_timezone_set('Asia/Tokyo');

$location = './registerguest.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $gid = $_POST['gid'];
  $organization = $_POST['organization'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $agree = $_POST['agree'];
  $submit = $_POST['submit'];

  $gidempty = empty($gid);
  $orgempty = empty($organization);
  $nameempty = empty($name);
  $emailempty = empty($email);
  $submitempty = empty($submit);

  if ($gidempty || $orgempty || $nameempty || $emailempty || $submitempty) {
    $param = '';
    if ($gidempty) {
      $param .= '?gidempty=1';
    } else {
      $param .= '?gid='.$gid;
    }
    if ($orgempty) {
      $param .= '&orgempty=1';
    } else {
      $param .= '&organization='.urlencode($organization);
    }
    if ($nameempty) {
      $param .= '&nameempty=1';
    } else {
      $param .= '&name='.urlencode($name);
    }
    if ($emailempty) {
      $param .= '&emailempty=1';
    } else {
      $param .= '&email='.urlencode($email);
    }
    if ($submitempty) {
      $param .= '&submitempty=1';
    }
    header('Location:', $location.$param);
    die();
  }

  openlog("RoomLog",  LOG_CONS|LOG_PERROR|LOG_PID, LOG_USER);

  $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
  if ($mysqli->connect_errno) {
    syslog(LOG_ERR, __FILE__.'('.__LINE__."): Could not connect to " . $db_name . "(" . mysqli_error() . ")");
    die("Could not connect to " . $db_name);
  }

  $mysqli->begin_transaction();
  if (intval(isset($_POST['agree'])) > 0) {
    $pass = generateRandomString();

    $stmt = $mysqli->prepare("SELECT password(?)");
    if (!$stmt) {
      syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    	$mysqli->rollback();
      die("Query failed");
    }
    $stmt->bind_param("s", $pass);
    $stmt->execute();
    $stmt->bind_result($seed);
    $stmt->fetch();
    $stmt->close();

    #$stmt = $mysqli->prepare("UPDATE ht_user set c_pass = ?, c_disp_name = ?, c_first_name = ?, c_photo = to_base64(aes_encrypt(?,?)) where n_user = ? and c_login = ?");
    $stmt = $mysqli->prepare("UPDATE ht_user set c_pass = ?, c_disp_name = ?, c_first_name = ? where n_user = ? and c_login = ?");
    if (!$stmt) {
      syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    	$mysqli->rollback();
      die("Query failed");
    }
    #$stmt->bind_param("sssssis", $pass, $name, $organization, $pass, $db_key, $gid, $email);
    $stmt->bind_param("sssis", $pass, $name, $organization, $gid, $email);
    $result = $stmt->execute();
    if (!$result) {
      syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    	$mysqli->rollback();
      die("Query failed");
    }
    $affected = $mysqli->affected_rows;
    $stmt->close();

    if ($affected < 1) {
    	$mysqli->rollback();
      $param = '?gid='.$gid.'&organization='.urlencode($organization).'&name='.urlencode($name).'&email='.urlencode($email);
?>
    <p>入力内容に間違いがあるようです。<a href="<?php echo $location.$param ?>">こちら</a>からもう一度入力しなおしてみてください。</p>
<?php
      $mysqli->close();
      closelog();
      die();
    }
    $mysqli->commit();

    $cipher = "aes-256-cbc";
    if (!in_array($cipher, openssl_get_cipher_methods())) {
    	$cipher = openssl_get_cipher_methods()[0];
    }
    $plaintext = $email.'#'.$pass;
    $ciphertext = openssl_encrypt($plaintext, $cipher, $seed);

    $subject = "HotRoomゲスト本登録のお願い";
    $subject = mb_convert_encoding($subject, "ISO-2022-JP", "AUTO");
    $subject = mb_encode_mimeheader($subject);
    
    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $file = strrchr($actual_link, '/');
    $register_guest = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/confirmguest.php?gid='.$gid.'&pwd='.$ciphertext;
    
    mb_language("ja");
    
    $bodys = array (
      $organization,
      $name." 様",
      "",
      "",
    	"HotRoomミーティングのゲスト本登録を完了するため、下記のURLにアクセスしてください",
    	"",
      "",
    	$register_guest,
      "",
      "HotRoom開発チーム"
    );
    $headers  = "MIME-Version: 1.0 \n" ;
    $headers .= "From: " .
           "".mb_encode_mimeheader(mb_convert_encoding("HotRoom管理者","ISO-2022-JP","AUTO"))."".
           "<admin@asj.ad.jp> \n";
    $headers .= "Reply-To: " .
           "".mb_encode_mimeheader(mb_convert_encoding("返信不可","ISO-2022-JP","AUTO"))."".
           "<no-reply@asj.ad.jp> \n";
    $headers .= "Content-Type: text/plain;charset=ISO-2022-JP \n";
    
    $body = mb_convert_encoding(join("\r\n", $bodys), "ISO-2022-JP", "AUTO");
    if (!mail($email, $subject, $body, $headers)) {
      $param = '?gid='.$gid.'&organization='.urlencode($organization).'&name='.urlencode($name).'&email='.urlencode($email);
?>
    <p>メール送信に失敗しました。<a href="<?php echo $location.$param ?>">こちら</a>からもう一度入力しなおしてみてください。</p>
<?php
      $mysqli->close();
      closelog();
      die();
    }
?>
    <p>HotRoomのゲスト本登録を完了するためのURLを登録されたメールアドレスに送信しました。</p>
<?php
  } else {
    $stmt = $mysqli->prepare("DELETE from ht_user where n_user = ?");
    if (!$stmt) {
      syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    	$mysqli->rollback();
      die("Query failed");
    }
    $stmt->bind_param("i", $gid);
    $result = $stmt->execute();
    if (!$result) {
      syslog(LOG_ERR, __LINE__.":".$mysqli->error);
    	$mysqli->rollback();
      die("Query failed");
    }
?>
    <p>HotRoomミーティングをキャンセルしました</p>
<?php
  }
  $mysqli->close();
  closelog();
} else {
  $gid = $_GET['gid'];
?>
    <form action="./registerguest.php" method="POST">
      <input type="hidden" name="gid" value="<?php echo $gid ?>">
<?php
  if (isset($_GET['orgempty'])) {
?>
      <p style="color: red">御社名／組織名が入力されていません</p>
<?php
  }
?>
      <p>御社名または組織名：<input type="text" name="organization" value="<?php echo isset($_GET['organization'])?$_GET['organization']:'' ?>" /></p>
<?php
  if (isset($_GET['nameempty'])) {
?>
      <p style="color: red">お名前が入力されていません</p>
<?php
  }
?>
      <p>お名前：<input type="text" name="name" value="<?php echo isset($_GET['name'])?$_GET['name']:'' ?>" /></p>
<?php
  if (isset($_GET['emailempty'])) {
?>
      <p style="color: red">メールアドレスが入力されていません</p>
<?php
  }
?>
      <p>メールアドレス：<input type="text" name="email" value="<?php echo isset($_GET['email'])?$_GET['email']:'' ?>" /></p>
      <p>
        HotRoomミーティングに参加する<input type="radio" name="agree" value="1" checked="checked" />
        キャンセルする<input type="radio" name="agree" value="0" />
      </p>
      <p><input type="submit" name="submit" value="登録" /></p>
    </form>
<?php
}
?>
</body>
</html>
