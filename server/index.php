<?php
include('../../data/room/db_connect.php');
require_once("app.php");
$app = new room_app();
if (isset($app->loggedInUser)
	&& $app->loggedInUser->user_id != 0
  && $app->loggedInUser->is_admin
	&& $app->loggedInUser->is_master)
{
	header("Location: admin/admin_companies.php");
	die();
}
$videoCallingTag = isset($_COOKIE['calling_tag'])?$_COOKIE['calling_tag']:'';
$videoCallingName = isset($_COOKIE['calling_name'])?$_COOKIE['calling_name']:'';
$videoCalling = !empty($videoCallingTag)&&!empty($videoCallingName);
$voiceMailTag = isset($_GET['playvoicemail'])?$_GET['playvoicemail']:'';

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$file = strrchr($actual_link, '/');
$photo_image = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/images/img_profile.png';
$myname = substr($file, 1);

if (isset($app->loggedInUser)) {
	$stmt = $app->mysqli->prepare("select `c_photo` from `ht_user` where n_user = ?");
	if ($stmt) {
		$stmt->bind_param('i', $app->loggedInUser->user_id);
		$stmt->execute();
		$stmt->bind_result($photo_image);
		if (!$stmt->fetch() || empty($photo_image)) {
			$photo_image = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/images/img_profile.png';
		}
		$stmt->close();
	}

	$stmt = $app->mysqli->prepare("SELECT `c_registrar`,`c_identity`,`c_username`,`c_dispname`,aes_decrypt(`c_password`,?),`c_mode` from `ht_sipsetting` where n_user = ?");
	if ($stmt) {
		$stmt->bind_param('si', $db_key, $app->loggedInUser->user_id);
		$stmt->execute();
		$stmt->bind_result($sipserver, $sipusername, $sipauthuser, $sipdisplayname, $sippassword, $registerset);
		if ($stmt->fetch()) {
		}
		$stmt->close();
	}
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0">
<title>マイプロフィール - HotRoom</title>
<meta name="keywords" content="HotRoom, ビデオ会議開催, ビデオ会議, オンラインミーティング, ウェブミーティング, ビデオミーティング, クラウドミーティング, クラウドビデオ, グループビデオ通話, グループビデオチャット, 画面共有, アプリケーション共有, モビリティ, モバイルコラボレーション, デスクトップ共有, ビデオコラボレーション, グループメッセージ通信 ">
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-jcrop/0.9.15/css/jquery.Jcrop.css">
<link rel="stylesheet" type="text/css" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="index.css">
<!--
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
-->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-placeholder/2.3.1/jquery.placeholder.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/localization/messages_ja.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-jcrop/0.9.15/js/jquery.Jcrop.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/6.4.0/adapter.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.1/bootbox.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>
<script type="text/javascript" src="https://malsup.github.io/jquery.blockUI.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery.modal.js"></script>
<script type="text/javascript" src="js/janus.js"></script>
<script type="text/javascript" src="js/videocall.js" ></script>
<script type="text/javascript" src="js/voicemail.js" ></script>
<script type="text/javascript" src="js/sip.js" ></script>
<script type="text/javascript" src="js/registerServiceWorker.js" ></script>
<script type="text/javascript" src="js/jscd.js" ></script>
<script type="text/javascript" src="js/fileupload.js" ></script>
<script type="text/javascript" src="index.js"></script>
<?php
if (!isset($app->loggedInUser)) {
?>
<script>
$(window).on('load', function() {
	var dialog = $("#login-dialog").dialog({
		modal: true, //モーダル表示
		title: "Roomにログイン", //タイトル
		resizable: false,
		width: "auto",
		buttons: { //ボタン
			"ログイン": function() {
				const data = new FormData();
				data.set('mailaddr', document.querySelector('#mailaddr').value);
				data.set('password', document.querySelector('#password').value);

				fetch('./login.php', {method: 'POST', cache: 'no-cache', credentials:'include', body: data})
				.then((res) => res.json())
				.then((response) => {
					dialog.dialog("close");
					if (response.result == 0) {
						document.cookie = "room_access_key=" + response.result_string;
						checkServiceWorkerRegistered('notification-dialog', response.user_id,
							function(err) {
								errorDialog(err, 'index.php');
							}, function(mess) {
								//infoDialog(mess, null);
							});
					} else {
						errorDialog(response.result_string, 'index.php');
					}
				}).catch((reason) => {
					dialog.dialog("close");
					errorDialog(reason, 'index.php');
				});
			}
		},
		close: function() {
			location.href = 'index.php';
		}
	});
});
</script>
<?php
}
?>
</head>
<body>
<?php
include('dialog.php');
include('sidenav.php');
include('header.php');
?>
	<main>
		<div class="content form_edit">
			<div class="form_item">
				<form id="info-form">
					<dl class="dl_table">
						<dt class="form_ttl control-label my-profile" style="text-align: center;">
							<div class="img_box icon_profile"><a ui-cmd="Change" role="button" ui-cat="Web.Profile" href="javascript:;" class="profile-pic change-picture"><img width="116" height="116" src="<?php echo $photo_image ?>" alt="プロフィール画像"></a></div>
							<div class="btn_gray pic-action"><a ui-cmd="Change" role="button" ui-cat="Web.Profile" href="javascript:;" class="change-picture">変更する</a></div>
						</dt>
						<dd id="disp_info">
							<dl class="form-control-static dl_table">
								<dt class="form_ttl form-control-static displayName">表示名</dt>
								<dd class="name">
									<span class="edit" id="dispDisplayName"><?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?></span>
									<input type="hidden" id="oldDisplayName" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>">
									<input type="text" class="save" id="displayName" name="displayName" autocomplete="off" maxlength="128" placeholder="例：山田太郎" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>">
								</dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">会社</dt>
								<dd class="company"><?php echo isset($app->loggedInUser)?$app->loggedInUser->companyname:'' ?></dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">部署</dt>
								<dd class="department">
									<span class="edit" id="dispGroup"><?php echo isset($app->loggedInUser)?$app->loggedInUser->groupname:'' ?></span>
									<input type="hidden" id="oldGroupid" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->group_id:'' ?>">
									<select id="groupid" class="save">
<?php
$stmt = $app->mysqli->prepare("SELECT `n_group`,`c_name` from `ht_group` where `n_company` = ?");
if ($stmt) {
	$stmt->bind_param('i', $app->loggedInUser->company_id);
	$result = $stmt->execute();
	$stmt->bind_result($groupid, $name);
	while($stmt->fetch()) {
?>
										<option value="<?php echo $groupid ?>"<?php echo $groupid==$app->loggedInUser->group_id?' selected':'' ?>><?php echo $name ?></option>
<?php
	}
	$stmt->close();
}
?>
									</select>
								</dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">役職</dt>
								<dd class="jobTitle">
									<span class="edit" id="dispJobTitle"><?php echo isset($app->loggedInUser)?$app->loggedInUser->jobTitle:'' ?></span>
									<input type="hidden" id="oldJobTitle" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->jobTitle:'' ?>">
									<input type="text" class="save" id="jobTitle" name="jobTitle" autocomplete="off" maxlength="128" placeholder="例：部長" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->jobTitle:'' ?>">
								</dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">場所</dt>
								<dd class="location"><?php echo isset($app->loggedInUser)?$app->loggedInUser->companyaddr:'' ?></dd>
							</dl>
							<dl class="form-control-static dl_table">
								<span class="detail_info_msg" class="hide"></span>
								<span class="detail_error_msg" class="alert alert-danger hide"></span>
							</dl>
						</dd>
					</dl>
					<div class="btn_edit z-row-action">
						<a class="edit" href="javascript:;" data-edit="profile-detail">編集</a>
						<a class="submit save" style="display: none" href="javascript:;" name="info-form">変更を保存</a>
						<a class="cancel save" style="display: none" href="javascript:;">キャンセル</a>
					</div>
				</form>
			</div>

			<div class="form_item">
				<form id="meeting-form">
					<dl class="dl_table">
						<dt class="form_ttl control-label">パーソナル<br class="is-pc"/>ミーティングID</dt>
						<dd class="form-control-static">
							<p class="mypmi js-mark-scope">
								<?php
								$var = isset($app->loggedInUser)?substr_replace($app->loggedInUser->privateroom, str_repeat("*", 7), 0, 7):'';
								?>
								<strong class="js-mark-label edit" id="dispMarkMeeting"><?php echo $var ?></strong>
								<strong class="js-real-label" id="dispRealMeeting" style="display: none;"><?php echo isset($app->loggedInUser)?$app->loggedInUser->privateroom:'' ?></strong>
								<button class="btn_gray mark-button js-mark-button-show edit">表示</button>
								<button class="btn_gray mark-button js-mark-button-hide" style="display: none;">非表示</button>
								<input type="hidden" id="oldMeetingId" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->privateroom:'' ?>">
								<input type="text" class="save" id="meetingId" name="meetingId" autocomplete="off" maxlength="128" placeholder="例：12345678901" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->privateroom:'' ?>">
							</p>
							<?php
							$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
							$idx = strpos($url, strrchr($url, '/'));
							$roomPhp = substr($url, 0, $idx+1).'room.php';
							?>
							<p class="mypmiurl js-mark-scope" style="word-break: break-word;">
								<span class="js-mark-label"><?php echo $roomPhp ?>?roomId=<?php echo $var ?></span>
								<span class="js-real-label" style="display: none;"><?php echo $roomPhp ?>?roomId=<?php echo isset($app->loggedInUser)?$app->loggedInUser->privateroom:'' ?></span>
								<button class="btn_gray mark-button js-mark-button-show edit">表示</button>
								<button class="btn_gray mark-button js-mark-button-hide" style="display: none;">非表示</button>
							</p>
							<p><input id="meeting_checkbox" type="checkbox"><label for="meeting_checkbox">インスタントミーティングにこのIDを使用する</label></p>
							<p class="form-control-static dl_table">
								<span class="detail_info_msg" class="hide"></span>
								<span class="detail_error_msg" class="alert alert-danger hide"></span>
							</p>
						</dd>
					</dl>
					<div class="btn_edit z-row-action">
						<a class="edit" data-edit="meeting-detail" href="javascript:;">編集</a>
						<a class="submit save" style="display: none" href="javascript:;" name="meeting-form">変更を保存</a>
						<a class="cancel save" style="display: none" href="javascript:;">キャンセル</a>
					</div>
				</form>
			</div>

			<div id="change_email_after" style="display:none;">
				<div>
					<span id="change-new-email-mark" class="js-mark-label"></span>
					<span id="change-new-email-real" class="js-real-label" style="display: none"></span>
					<button class="btn_gray mark-button js-mark-button-show edit">表示</button>
					<button class="btn_gray mark-button js-mark-button-hide" style="display: none;">非表示</button>
					<span class="email_status" style="margin-left: 9px;">（確認保留中）</span>
				</div>
				<div>
					<P>新しいメールアドレスにメールが送信されました。ご確認ください。</p>
					<p>新しいメールアドレスが有効になるまでは、現在のメールアドレスを使用してサインインでき、</p>
					<p>通知はすべて現在のメールアドレスに送信されます。</p>
				</div>
			</div>

			<div class="form_item">
				<form id="mail-form">
					<dl class="dl_table">
						<dt class="form_ttl control-label">サインイン用<br class="is-pc"/>メールアドレス</dt>
						<dd>
							<?php
							if (isset($app->loggedInUser)) {
								$parts = explode('@', $app->loggedInUser->email);
								$var = substr_replace($parts[0], str_repeat("*", 3), 3, strlen($parts[0])-3);
								$addr = $var.'@'.$parts[1];
							} else {
								$addr = '';
							}
							?>
							<p class="login_email js-mark-scope">
								<span class="login_email js-mark-label edit" id="dispMarkEmail"><?php echo $addr ?></span>
								<span class="login_email js-real-label" id="dispRealEmail" style="display: none"><?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?></span>
								<button class="btn_gray mark-button js-mark-button-show edit">表示</button>
								<button class="btn_gray mark-button js-mark-button-hide" style="display: none;">非表示</button>
								<input type="hidden" id="oldEmail" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>">
								<input id="newEmail" name="newEmail" class="save" maxlength="128" placeholder="新しいメールアドレスを入力してください" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>">
							</p>
							<!--
							<p class="link_accounts">リンクされたアカウント：<a class="icon" href="#"><img src="images/icon_mail.png" alt=""></a></p>
							-->
							<p class="save">サインイン用メールアドレスを変更するには、パスワードを入力してください。</p>
							<dl class="form-control-static dl_table save" style="display: none">
								<dt class="form_ttl phoneLabel">パスワード</dt>
								<dd class="login_email"><input type="password" id="verifyPassword" name="verifyPassword" maxlength="255" placeholder="パスワード"></dd>
							</dl>
							<dl class="form-control-static dl_table">
								<span class="detail_info_msg" class="hide"></span>
								<span class="detail_error_msg" class="alert alert-danger hide"></span>
							</dl>
						</dd>
					</dl>
					<div class="btn_edit z-row-action">
						<a class="edit" data-edit="profile-detail" href="javascript:;">編集</a>
						<a class="submit save" style="display: none" href="javascript:;" name="mail-form">変更を保存</a>
						<a class="cancel save" style="display: none" href="javascript:;">キャンセル</a>
					</div>
				</form>
			</div>

			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl control-label">言語</dt>
					<dd class="form-control-static language-label">日本語</dd>
				</dl>
				<div class="btn_edit z-row-action">
					<a class="edit" data-edit="profile-detail" href="javascript:;" disabled>編集</a>
				</div>
			</div>

			<div class="form_item">
				<form id="date-form">
					<dl class="dl_table">
						<dt class="form_ttl control-label">日時</dt>
						<dd>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl form-control-static">タイムゾーン</dt>
								<dd>(GMT+9:00) 大阪、札幌、東京</dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl form-control-static">日付形式</dt>
								<?php
								$example = new DateTime();
								$exp = $example->format(isset($app->loggedInUser)?$app->loggedInUser->phpformat:'Y/m/d');
								?>
								<dd class="edit"><?php echo isset($app->loggedInUser)?$app->loggedInUser->dateformat:'' ?><br /><span class="notes">例：<?php echo $exp ?></span></dd>
								<dd class="save" style="display: none">
									<input  type="hidden" id="oldDateFormat" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->dateformat:'' ?>">
									<select id="dateFormat">
										<option value="mm/dd/yyyy"<?php echo $app->loggedInUser->dateformat=='mm/dd/yyyy'?' selected':'' ?>>mm/dd/yyyy&nbsp;(<?php echo $example->format('m/d/Y') ?>)</option>
										<option value="mm/dd/yy"<?php echo $app->loggedInUser->dateformat=='mm/dd/yy'?' selected':'' ?>>mm/dd/yy&nbsp;(<?php echo $example->format('m/d/y') ?>)</option>
										<option value="m/d/yyyy"<?php echo $app->loggedInUser->dateformat=='m/d/yyyy'?' selected':'' ?>>m/d/yyyy&nbsp;(<?php echo $example->format('n/j/Y') ?>)</option>
										<option value="yyyy-mm-dd"<?php echo $app->loggedInUser->dateformat=='yyyy-mm-dd'?' selected':'' ?>>yyyy-mm-dd&nbsp;(<?php echo $example->format('Y-m-d') ?>)</option>
										<option value="yy-mm-dd"<?php echo $app->loggedInUser->dateformat=='yy-mm-dd'?' selected':'' ?>>yy-mm-dd&nbsp;(<?php echo $example->format('y-m-d') ?></p></li>
										<option value="yyyy/mm/dd"<?php echo $app->loggedInUser->dateformat=='yyyy/mm/dd'?' selected':'' ?>>yyyy/mm/dd&nbsp;(<?php echo $example->format('Y/m/d') ?>)</option>
										<option value="yy/mm/dd"<?php echo $app->loggedInUser->dateformat=='yy/mm/dd'?' selected':'' ?>>yy/mm/dd&nbsp;(<?php echo $example->format('y/m/d') ?>)</option>
										<option value="yyyy/m/d"<?php echo $app->loggedInUser->dateformat=='yyyy/m/d'?' selected':'' ?>>yyyy/m/d&nbsp;(<?php echo $example->format('Y/n/j') ?>)</option>
										<option value="yy/m/d"<?php echo $app->loggedInUser->dateformat=='yy/m/d'?' selected':'' ?>>yy/m/d&nbsp;(<?php echo $example->format('y/n/j') ?>)</option>
										<option value="yyyy.mm.dd"<?php echo $app->loggedInUser->dateformat=='yyyy.mm.dd'?' selected':'' ?>>yyyy.mm.dd&nbsp;(<?php echo $example->format('Y.m.d') ?>)</option>
										<option value="yy.mm.dd"<?php echo $app->loggedInUser->dateformat=='yy.mm.dd'?' selected':'' ?>>yy.mm.dd&nbsp;(<?php echo $example->format('y.m.d') ?>)</option>
										<option value="dd/mm/yyyy"<?php echo $app->loggedInUser->dateformat=='dd/mm/yyyy'?' selected':'' ?>>dd/mm/yyyy&nbsp;(<?php echo $example->format('d/m/Y') ?>)</option>
										<option value="dd/mm/yy"<?php echo $app->loggedInUser->dateformat=='dd/mm/yy'?' selected':'' ?>>dd/mm/yy&nbsp;(<?php echo $example->format('d/m/y') ?>)</option>
										<option value="dd.mm.yyyy"<?php echo $app->loggedInUser->dateformat=='dd.mm.yyyy'?' selected':'' ?>>dd.mm.yyyy&nbsp;(<?php echo $example->format('d.m.Y') ?>)</option>
										<option value="dd.mm.yy"<?php echo $app->loggedInUser->dateformat=='dd.mm.yy'?' selected':'' ?>>dd.mm.yy&nbsp;(<?php echo $example->format('d.m.y') ?>)</option>
										<option value="d.m.yy"<?php echo $app->loggedInUser->dateformat=='d.m.yy'?' selected':'' ?>>d.m.yy&nbsp;(<?php echo $example->format('j.n.y') ?>)</option>
										<option value="dd-mm-yyyy"<?php echo $app->loggedInUser->dateformat=='dd-mm-yyyy'?' selected':'' ?>>dd-mm-yyyy&nbsp;(<?php echo $example->format('d-m-Y') ?>)</option>
										<option value="yyyy/dd/mm"<?php echo $app->loggedInUser->dateformat=='yyyy/dd/mm'?' selected':'' ?>>yyyy/dd/mm&nbsp;(<?php echo $example->format('Y/d/m') ?>)</option>
									</select>
								</dd>
							</dl>
							<!--
							<dl class="form-control-static dl_table">
								<dt class="form_ttl form-control-static">時間形式</dt>
								<dd><input id="timeformat_checkbox" type="checkbox" value="1"><label for="timeformat_checkbox">24時間制を使用</label></dd>
							</dl>
							-->
							<dl class="form-control-static dl_table">
								<span class="detail_info_msg" class="hide"></span>
								<span class="detail_error_msg" class="alert alert-danger hide"></span>
							</dl>
						</dd>
					</dl>
					<div class="btn_edit z-row-action">
						<a class="edit" data-edit="profile-detail" href="javascript:;">編集</a>
						<a class="submit save" style="display: none" href="javascript:;" name="date-form">変更を保存</a>
						<a class="cancel save" style="display: none" href="javascript:;">キャンセル</a>
					</div>
				</form>
			</div>

			<div class="form_item">
				<form id="pass-form">
					<dl class="dl_table">
						<dt class="form_ttl control-label">サインインパスワード</dt>
						<dd class="edit">
							<p class="form-control-static"><strong>********</strong></p>
						</dd>
						<dd class="save" style="display: none">
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">旧パスワード</dt>
								<dd class="location"><input type="password" id="oldPassword" name="oldPassword" class="form-control" maxlength="255" placeholder="旧パスワード"></dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">新パスワード</dt>
								<dd class="location"><input type="password" id="newPassword" name="newPassword" class="form-control" maxlength="255" placeholder="新パスワード"></dd>
							</dl>
							<dl class="form-control-static dl_table">
								<dt class="form_ttl phoneLabel">パスワード確認</dt>
								<dd class="location"><input type="password" id="confirmPassword" name="confirmPassword" class="form-control" maxlength="255" placeholder="パスワードを確認する"></dd>
							</dl>
							<dl class="form-control-static dl_table">
								<span class="detail_info_msg" class="hide"></span>
								<span class="detail_error_msg" class="alert alert-danger hide"></span>
							</dl>
						</dd>
					</dl>
					<div class="btn_edit z-row-action">
						<a class="edit" data-edit="profile-detail" href="javascript:;">編集</a>
						<a class="submit save" style="display: none" href="javascript:;" name="pass-form">変更を保存</a>
						<a class="cancel save" style="display: none" href="javascript:;">キャンセル</a>
					</div>
				</form>
			</div>

			<div class="form_item">
				<form id="host-form">
					<dl class="dl_table">
						<dt class="form_ttl control-label">ホストキー</dt>
						<dd>
							<span class="js-mark-label edit"><strong id="hideHostkey">********</strong></span>
							<span class="js-real-label"><strong id="displayHostkey" class="hideme"><?php echo isset($app->loggedInUser)?$app->loggedInUser->hostkey:'' ?></strong></span>
							<div class="btn_gray edit"><a role="button" href="javascript:;" id="showHostKey" style="">表示</a></div>
							<div class="btn_gray"><a id="maskHostKey" class="hideme" role="button" href="javascript:;" style="">非表示</a></div>
							<input type="hidden" id="oldHoskKey" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->hostkey:'' ?>">
							<input id="hostKey" name="hostKey" class="save" maxlength="8" placeholder="新しいホストキーを入力してください" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->hostkey:'' ?>">
						</dd>
					</dl>
					<div class="btn_edit z-row-action">
						<a class="edit" data-edit="profile-detail" href="javascript:;">編集</a>
						<a class="submit save" style="display: none" href="javascript:;" name="host-form">変更を保存</a>
						<a class="cancel save" style="display: none" href="javascript:;">キャンセル</a>
					</div>
				</form>
			</div>

			<!--
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl control-label">サインインデバイス</dt>
					<dd>
						<div class="btn_gray" style="margin-left: 0;"><a href="javascript:;" role="button" id="revokeToken" style="">すべてのデバイスから自分をサインアウトする</a></div>
						<a href="javascript:;" class="icon_help help learn-more-button" data-learn-more="revoketokenMore">?</a>
					</dd>
				</dl>
				<div class="btn_edit z-row-action"><a class="edit" data-edit="profile-detail" href="javascript:;">編集</a></div>
			</div>
			-->
		</div>
	</main>
</body>
</html>
