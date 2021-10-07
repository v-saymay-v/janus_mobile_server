<?php
include('../../data/room/db_connect.php');
require_once("app.php");
require_once("meeting_class.php");
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
$privateroom = isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'';
$meeting_id = isset($_GET['meeting'])?$_GET['meeting']:$privateroom;

$this_meeting = new Meeting($app, $meeting_id);
$meeting_name = $this_meeting->private?(isset($app->loggedInUser)?$app->loggedInUser->displayname:''.'のパーソナルミーティングルーム'):$this_meeting->title;

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
<title>ミーティング情報 - HotRoom</title>
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
<script>
$(window).on('load', function() {
<?php
if (!isset($app->loggedInUser)) {
?>
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
<?php
} else {
?>
<?php
}
?>
});
</script>
</head>
<body>
<?php
include('dialog.php');
include('sidenav.php');
include('header.php');
?>
<main>
	<div class="content">
		<div id="meeting_tab_container" class="content_tab_box">
			<ul class="content_tab nav nav-tabs zm-tabnav">
				<li><a href="./meeting.php?type=upcoming">開催待ちのミーティング</a></li>
				<li><a href="./meeting.php?type=previous">終了したミーティング</a></li>
				<li class="is-active"><a href="./meeting_personal.php?meeting=<?php echo $meeting_id ?>"><?php echo $this_meeting->private?'パーソナルミーティング':'パブリックミーティング' ?></a></li>
			</ul>
		</div>
		<form class="form-horizontal staticform form tab_item" id="info_form">
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl meeting-label col-md-2">トピック</dt>
					<dd class="control col-md-10"><?php echo $meeting_name ?></dd>
				</dl>
			</div>
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl meeting-label col-md-2">時刻</dt>
					<dd>
						<?php
						if (!$this_meeting->private) {
							echo $this_meeting->start->format('Y年n月j日 A h:i');
						}
						?>
						<!--
						<dl id="add_to_calendar_container" class="form-control-static dl_table">
							<dt class="form_ttl form-control-static">追加先</dt>
							<dd>
								<ul>
									<li>
										<div class="btn_ghost_g"><a href="https://room.asj.ne.jp/uZAqcOGpqjojHAQzO2QI0lFrzPpUviuab2A/calendar/google/add" target="_blank" class="google-plugin-link" ><img src="images/icon_google.png" alt=""> Googleカレンダー</a></div>
									</li>
									<li>
										<div class="btn_ghost_g"><a href="https://room.asj.ne.jp/uZAqcOGpqjojHAQzO2QI0lFrzPpUviuab2A/ics" class="ical-plugin-link"><img src="images/icon_outlook.png" alt="">Outlookカレンダー（.ics）</a></div>
									</li>
									<li>
										<div class="btn_ghost_g"><a href="http://calendar.yahoo.com/" target="_blank"><img src="images/icon_yahoo.png" alt="">Yahooカレンダー</a></div>
									</li>
								</ul>
							</dd>
						</dl>
						-->
					</dd>
				</dl>
			</div>
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl meeting-label col-md-2">所要時間</dt>
					<?php
					$hour = floor($this_meeting->minutes / 60);
					$minute = intval($this_meeting->minutes) % 60;
					?>
					<dd class="control col-md-10"><?php echo $hour.'時間'.(empty($minute)?'':$minutes.'分') ?></dd>
				</dl>
			</div>
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl meeting-label col-md-2">ミーティングID</dt>
					<dd class="control col-md-10"><?php echo $meeting_id ?></dd>
				</dl>
			</div>
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl control-label">ミーティング<br class="is-pc"/>パスワード</dt>
					<dd>
						<div class="z-form-row-action js-mark-scope" style="display: inline-block;">
							<span style="display:inline-block;" class="js-mark-label"><strong id="hidePassword">********</strong></span>
							<span style="display: none;" class="js-real-label"><strong id="displayPassword"><?php echo $this_meeting->pass ?></strong></span>
							<div class="btn_gray js-mark-button-show"><a role="button" href="javascript:;" id="showPassword">表示</a></div>
							<div class="btn_gray js-mark-button-hide" style="display:none"><a role="button" href="javascript:;" id="maskPassword">非表示</a></div>
						</div>
					</dd>
				</dl>
			</div>
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl meeting-label col-md-2">ビデオ</dt>
					<dd>
						<dl class="form-control-static dl_table">
							<dt class="form_ttl form-control-static">ホスト</dt>
							<dd class="col-md-offset-1"><?php echo $this_meeting->video_host?'オン':'オフ' ?></dd>
						</dl>
						<dl class="form-control-static dl_table">
							<dt class="form_ttl form-control-static">参加者</dt>
							<dd class="col-md-offset-1"><?php echo $this_meeting->video_part?'オン':'オフ' ?></dd>
						</dl>
					</dd>
				</dl>
			</div>
			<div class="form_item">
				<dl class="dl_table">
					<dt class="form_ttl meeting-label col-md-2">ミーティング<br class="is-pc"/>オプション</dt>
					<dd></dd>
				</dl>
			</div>
			<div class="content_btn_box">
				<div class="btn_gray"><a role="button" href="./schedule.php?meeting=<?php echo $meeting_id ?>">ミーティングを編集</a></div>
				<div class="btn_nomal"><a type="button" class="btn_Start_meeting start " href="./room.php?roomId=<?php echo $meeting_id ?>">ミーティングを開始</a></div>
			</div>
		</form>
	</div>
</main>
</body>
</html>
