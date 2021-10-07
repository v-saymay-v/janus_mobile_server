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
$meeting_type = isset($_GET['type'])?$_GET['type']:'upcoming';

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
<title>マイミーティング - HotRoom</title>
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
  $("#meetings a.delete").click(function() {
    var meeting = $(this).attr("data-id");
    var host = $(this).attr("data-host");
    var topic = $(this).attr("data-topic");
    var date = $(this).attr("data-date");
    var time = $(this).attr("data-time");
    var duration = $(this).attr("data-duration");
    const data = new FormData();
    data.set('meeting', meeting);
    fetch('./meetingInfo.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
    .then((res) => res.json())
    .then((response) => {
      if (response.result == 0) {
        function handleMeeting(command, option) {
          const data = new FormData();
          data.set('id', meeting);
          data.set('command', command);
          data.set('option', option);
          data.set('date', date);
          data.set('sendMail', $('#option_send_mail').is(':checked')?'true':'false');
          data.set('subject', $('#send_mail_body .subject').val());
          data.set('mailBody', $('#send_mail_body .mailbody').text());
          fetch('./meetingHandle.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
          .then((res) => res.json())
          .then((response) => {
            if (response.result == 0) {
              $("#deleteMeetingDialog").dialog('close');
              window.href.reload();
            } else {
              $('#deleteMeetingDialog .alert-danger').removeClass('hide').show();
              $('#deleteMeetingDialog .alert-danger').text(response.result_string);
            }
          }).catch((reason) => {
            $('#deleteMeetingDialog .alert-danger').removeClass('hide').show();
            $('#deleteMeetingDialog .alert-danger').text(response.reason);
          });
        }

        var count = response.registrants;
        $('#deleteTopic .topic').text(topic);
        $('#deleteTopic').removeClass('hide').show();
        $('#deleteTime .time').text(time+' から '+Math.floor(duration/60)+'時間');
        $('#deleteTime').removeClass('hide').show();
        $('#send_mail_body .subject').val(response.display_subject);
        $('#send_mail_body .mailbody').text(response.display_body);
        $('#deleteMeetingDialog .alert-danger').addClass('hide').hide();
        if ($('#meeting_type').val() == 'previous') {
          $('#deleteMeetingDialog .send_mail').addClass('hide').hide();
        } else {
          $('#deleteMeetingDialog .send_mail').removeClass('hide').show();
        }

        $("#deleteMeetingDialog").dialog({
          modal: true, //モーダル表示
          title: "ミーティングを削除", //タイトル
          resizable: false,
          width: "auto",
          height: "auto",
          open: function() {
            $("#option_send_mail").on("change", function() {
              if ($(this).prop("checked")) {
                $("#send_mail_body").removeClass("hide").show()
              } else {
                $("#send_mail_body").addClass("hide").hide()
              }
            });
          },
          buttons: { //ボタン
            "終了": function() {
              handleMeeting('end');
            },
            "削除": function() {
              handleMeeting('delete', 'all');
            },
            "この予定のみ削除":  function() {
              handleMeeting('delete', 'one');
            },
            "すべての予定を削除": function() {
              handleMeeting('delete', 'all');
            },
            "キャンセル": function() {
              $("#deleteMeetingDialog").dialog('close');
            }
      		}
      	});
        if ($('#user_id').val() != host || $('#meeting_type').val() == 'previous') {
          $('#deleteMeetingDialog').siblings('.ui-dialog-buttonpane').find('button').eq(0).hide();
        }
        if (count <= 1) {
          $('#deleteMeetingDialog').siblings('.ui-dialog-buttonpane').find('button').eq(2).hide();
          $('#deleteMeetingDialog').siblings('.ui-dialog-buttonpane').find('button').eq(3).hide();
        } else {
          $('#deleteMeetingDialog').siblings('.ui-dialog-buttonpane').find('button').eq(1).hide();
        }
      } else {
      }
    }).catch((reason) => {
    });
  });
<?php
}
?>
});
</script>
</head>
<body>
  <input type="hidden" id="meeting_type" value="<?php echo $meeting_type ?>">
<?php
include('dialog.php');
include('sidenav.php');
include('header.php');
?>
<div id="deleteMeetingDialog" class="dialog-div">
  <div class="alert-danger hide"></div>
  <div class="noregistrants" style="margin-bottom:16px;">
    <div id="deleteTopic" class="hide">
      <label class="meeting-delete-header-base">トピック</label> <span class="topic"></span>
    </div>
    <div id="deleteTime" class="hide">
      <label class="meeting-delete-header-base">時間</label> <span class="time"></span>
    </div>
  </div>
  <div>
    <div class="send_mail">
      <div>
        <label for="option_send_mail">&nbsp;&nbsp;&nbsp;登録者にミーティングのキャンセルメールを送信</label>
        <input type="checkbox" id="option_send_mail" name="option_send_mail" value="1" checked="checked">
      </div>
    </div>
    <div id="send_mail_body" class="send_mail" style="background-color: #F1F4F4;">
      <div>
        <label for="subject" class="meeting-delete-header-font">件名</label>
        <input type="text" placeholder="ミーティングキャンセルメールの件名を入力してください。" maxlength="200" name="subject" class="subject">
      </div>
      <div>
        <label for="mailbody" class="meeting-delete-header-font" style="height: 34px; padding: 5px 0px;">本文</label>
        <textarea placeholder="ミーティングキャンセルメールの本文を入力してください。" maxlength="1024" rows="4" name="mailbody" class="mailbody"></textarea>
      </div>
    </div>
  </div>
</div>

<main>
	<div class="content">
		<div id="meeting_tab_container" class="content_tab_box">
			<ul class="content_tab nav nav-tabs zm-tabnav">
				<li class="<?php echo $meeting_type=='previous'?'':'is-active' ?>"><a href="./meeting.php?type=upcoming">開催待ちのミーティング</a></li>
				<li class="<?php echo $meeting_type=='previous'?'is-active':'' ?>"><a href="./meeting.php?type=previous">終了したミーティング</a></li>
				<li><a href="./meeting_personal.php?meeting=<?php echo isset($app->loggedInUser)?$app->loggedInUser->privateroom:'' ?>">パーソナルミーティング</a></li>
			</ul>
		</div>
		<div class="tab_item">
			<div class="btn_nomal" style="text-align: center;"><a role="button" type="button" class="btn btn-primary schedule" href="./schedule.php">新しいミーティングをスケジュールする</a></div>
			<table id="meetings" class="content_list">
				<thead>
					<tr>
						<th class="list_ttl list-col mtg-date"><a href="javascript:;" class="sort-headers" data="startTime">開始時刻</a></th>
						<th class="list_ttl list-col mtg-topic"><a href="javascript:;" class="sort-headers" data="topic">トピック</a></th>
						<th class="list_ttl list-col mtg-id">ミーティングID</th>
            <th class="list_ttl list-col mtg-button">操作</th>
					</tr>
				</thead>
				<tbody>
<?php
$stmt = $app->mysqli->prepare(
  "select T1.n_meeting
	,T1.c_meeting
  ,T1.c_title
  ,T2.d_date
  ,T1.n_minutes
	,T1.n_host
	,T1.b_private
	,T1.c_crypt_seed
	,T1.c_auth_method
   from ht_meeting T1
  ,ht_meeting_days T2
  ,ht_meeting_users T3
  where T2.d_finish is ".($meeting_type=='previous'?'not ':'')."null
  and T1.n_meeting = T3.n_meeting
  and T2.n_meeting = T3.n_meeting
  and T3.n_user = ?
  order by T2.d_date desc");
if ($stmt) {
  $today = new DateTime();
	$cipher = "aes-256-cbc";
	if (!in_array($cipher, openssl_get_cipher_methods())) {
		$cipher = openssl_get_cipher_methods()[0];
	}
  $stmt->bind_param('i', $app->loggedInUser->user_id);
  $stmt->execute();
  $stmt->bind_result($meetingId, $meetingNo, $title, $date, $duration, $host, $private, $cryptSeed, $authMethod);
  while ($stmt->fetch()) {
    $meetdate = new DateTime($date);
    $diff = $today->diff($meetdate);
    switch ($diff->days) {
      case -1:
        $name = '昨日';
        break;
      case 0:
        $name = '今日';
        break;
      case 1:
        $name = '明日';
        break;
      default:
        $name =  $meetdate->format('Y年n月j日');
        break;
    }
		$href = "./room.php?roomId=".$meetingNo;
		if (!$private && $authMethod == 'meeting') {
			$plaintext = $app->loggedInUser->email.'#'.$app->loggedInUser->hash_pw;
			$ciphertext = openssl_encrypt($plaintext, $cipher, $cryptSeed);
			$href .= "&pwd=".urlencode($ciphertext);
		}
?>
					<tr id="meeting_<?php echo $meetingNo ?>">
						<td class="list_ttl list-col mtg-date" data-label="開始時刻"><a href="javascript:;" class="sort-headers" data="startTime"><?php echo $meetdate->format('n/j h:i A') ?></a></td>
						<td class="list_ttl list-col mtg-topic" data-label="トピック"><a href="./meeting_personal.php?meeting=<?php echo $meetingNo ?>" class="sort-headers" data="topic"><?php echo $title ?></a></td>
						<td class="list_ttl list-col mtg-id" data-label="ミーティングID"><?php echo $meetingNo ?></td>
            <td class="list_ttl list-col mtg-button" data-label="操作">
<?php
    if ($meeting_type != 'previous') {
?>
							<a role="button" type="button" class="btn btn-primary" href="<?php echo $href ?>" class="btn btn-default start">開始</a>
<?php
    }
?>
						  <a role="button" type="button" class="btn btn-primary delete" href="javascript:;"
                data-id="<?php echo $meetingNo ?>"
                data-host="<?php echo $host ?>"
                data-topic="<?php echo $title ?>"
                data-date="<?php echo $meetdate->format('Y-m-d') ?>"
                data-time="<?php echo $meetdate->format('Y年n月j日 h:i A') ?>"
                data-duration="<?php echo $duration ?>">削除</a>
            </td>
					</tr>
<?php
  }
  $stmt->close();
}
?>
				</tbody>
			</table>
		</div>
		<div class="notes_box">
			<p class="notes_ttl">カレンダーからミーティングの予定を直接入れることができるので時間を節約できます。</p>
			<ul class="notes_list">
				<li class="notes_list_item"><img src="images/outlook.png" alt="">Microsoft Outlookプラグイン</li>
				<li class="notes_list_item"><img src="images/chrome.gif" alt="">Chromeエクステンション</li>
				<li class="notes_list_item"><img src="images/firefox.gif" alt="">Firefoxアドオン</li>
			</ul>
		</div>
	</div>
</main>
</body>
</html>
