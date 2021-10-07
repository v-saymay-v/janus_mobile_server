<?
include("construct.php");

function ErrorPage() {
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width">
<meta name="format-detection" content="telephone=no, email=no, address=no">
<title>ログイン BusinessCardManagement- 株式会社ASJ</title>
<link rel="icon" href="common/images/favicon.ico" type="image/x-icon">
<!-- CSS -->
<link rel="stylesheet" href="common/css/reset.css">
<link rel="stylesheet" href="common/css/login.css">
<!-- JAVASCRIPT -->
<script src="common/js/jquery-3.3.1.min.js"></script>

</head>
<body class="bg-login">
<div class="sp-wrap">
	<div class="page-login">
		<h1 class="page_ttl"><img src="common/images/logo02.png" alt="ロゴ"></h1>
		<div class="login_dl">
			<dl>
				<dt>ログイン結果</dt>
				<dd>ログインに失敗しました</dd>
			</dl>
		</div>
	</div>
</div>
</body>
</html>
<?
}

if (isset($_POST['login'])) {
	$mailaddr = $_POST['mailaddr'];
	$password = $_POST['password'];

	$sql = "select distinct"
			." T1.n_user as user_id"
			.",T1.e_type as type"
			.",T1.c_login_token as token"
			.",T1.e_os as os"
			.",T1.c_device_token as device"
			.",T1.c_push_token as push"
			." from bt_users T1,bt_cards T2"
			." where T2.n_user = T1.n_user"
			." and T2.b_mine != 0"
			." and T1.b_admin = 0"
			." and aes_decrypt(T2.c_mail,'".$dbkey."') = '".$mailaddr."'"
			." and aes_decrypt(T1.c_password,'".$dbkey."') = '".$password."'";

	$result = mysqli_query($db,$sql);
	if (!$result) {
		ErrorPage();
		return;
	}
	$rec = mysqli_fetch_array($result);
	$cnt = mysqli_num_rows($result);

	if ($cnt == 1) {
		$user_id = $rec['user_id'];
		$type = $rec['type'];
		$token = $rec['token'];
		$os = $rec['os'];
		$device = $rec['device'];
		$push = $rec['push'];
		mysqli_free_result($result);
		$session = md5($user_id . $type . $token . microtime()) . md5($os . $device . $push . microtime());
		$sql = "update bt_users set c_session = '$session' where n_user = $user_id";
		$result = mysqli_query($db, $sql);
		if (!$result) {
			ErrorPage();
			return;
		}
		setcookie("uin", $session, 0);
		header("Location: index.php");
	} else {
		mysqli_free_result($result);
		ErrorPage();
	}
} else {
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width">
<meta name="format-detection" content="telephone=no, email=no, address=no">
<title>ログイン BusinessCardManagement- 株式会社ASJ</title>
<link rel="icon" href="common/images/favicon.ico" type="image/x-icon">
<!-- CSS -->
<link rel="stylesheet" href="common/css/reset.css">
<link rel="stylesheet" href="common/css/login.css">
<!-- JAVASCRIPT -->
<script src="common/js/jquery-3.3.1.min.js"></script>

</head>
<body class="bg-login">

<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
<div class="sp-wrap">
	<div class="page-login">
		<h1 class="page_ttl"><img src="common/images/logo02.png" alt="ロゴ"></h1>
		<div class="login_dl">
			<dl>
				<dt>メールアドレス</dt>
				<dd><input type="text" name="mailaddr" value=""></dd>
			</dl>
			<dl>
				<dt>パスワード</dt>
				<dd><input type="password" name="password" value=""></dd>
			</dl>
		</div>
		<div class="btn_area">
			<button name="login" class="login_btn" type="submit">ログイン</button>
		</div>
	</div>
</div>
</form>

</body>
</html>
<?
}
?>
