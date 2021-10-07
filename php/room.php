<?php
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
$room_no = isset($_GET['roomId'])?$_GET['roomId']:'';
$pwd = isset($_GET['pwd'])?$_GET['pwd']:'';
$nologin = isset($_GET['nologin'])?intval($_GET['nologin']):0;
$disp_name = isset($app->loggedInUser)?$app->loggedInUser->displayname:'Unknown';

$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$idx = strpos($url, strrchr($url, '/'));
$indexPhp = substr($url, 0, $idx+1).'index.php';
$roomPhp = substr($url, 0, $idx+1).'room.php';

$videoHost = TRUE;
$videoPart = TRUE;
$meeting = new Meeting($app, $room_no);
if (isset($meeting->meeting_id)) {
	$meetingId = $meeting->meeting_id;
	$cryptSeed = $meeting->crypt_seed;
	$authMethod = $meeting->auth_method;
	$isPrivate = $meeting->private;
	$host = $meeting->host->user_id;
	$skipPass = $meeting->skipPass;
	$starttime = $meeting->start;
	$finishtime = $meeting->finish;
	$recordMeeting = $meeting->rec_local;
	$videoHost = $meeting->video_host;
	$videoPart = $meeting->video_part;
	$hostUserId = $meeting->host->user_id;
	if ($authMethod == "meeting" && !empty($pwd)) {
		$cipher = "aes-256-cbc";
		if (!in_array($cipher, openssl_get_cipher_methods())) {
			$cipher = openssl_get_cipher_methods()[0];
		}
		$rawText = openssl_decrypt($pwd, $cipher, $cryptSeed);
	}
error_log('isPrivate = '.$isPrivate);
	if (!$isPrivate) {
		$stmt = $app->mysqli->prepare("SELECT count(*) from ht_meeting_days where n_meeting = ? and date(d_date) = date(now())");
		if (!$stmt) {
			syslog(LOG_ERR, __FILE__.'('.__LINE__."): Query failed (" . $app->mysqli->error . ")");
error_log('jump to index at '.__LINE__);
			header("Location: ".$indexPhp);
			die();
		}
		$stmt->bind_param('i', $meetingId);
		$stmt->execute();
		$stmt->bind_result($count);
		if (!$stmt->fetch() || $count == 0) {
			$meetingnotfound = TRUE;
		}
		$stmt->close();
	}
} else {
	$meetingnotfound = TRUE;
}

$isHost = isset($app->loggedInUser)&&($host == $app->loggedInUser->user_id);

if (!isset($meetingnotfound)) {
	if (!isset($rawText)) {
		$authMethod = "login";
	} else {
		$parts = explode('#', $rawText);
		if (count($parts) < 2) {
			$authMethod = "login";
		} else {
			if (count($parts) >= 3) {
				$email = $parts[0];
				$ip = $_SERVER["REMOTE_ADDR"];
				$pass = $parts[2];
			} else {
				$email = $parts[0];
				$pass = $parts[1];
				$ip = $_SERVER["REMOTE_ADDR"];
			}
		}
	}

	$ip_match = false;
	if (!isset($email) || !isset($ip) || !isset($pass)) {
		$authMethod = "login";
	} else {
		$stmt = $app->mysqli->prepare("SELECT n_user, c_access_ip from ht_user where c_login = ? and c_pass = ?");
		if (!$stmt) {
			syslog(LOG_ERR, __FILE__.'('.__LINE__."): Query failed (" . $app->mysqli->error() . ")");
			header("Location: ".$indexPhp);
			die();
		}
		$stmt->bind_param('ss', $email, $pass);
		$stmt->execute();
		$stmt->bind_result($userid, $gotip);
		if ($stmt->fetch()) {
			$ip_match = ($ip == $gotip);
		}
		$stmt->close();

		if (!isset($app->loggedInUser) && $ip_match && isset($email) && isset($pass)) {
		  $data = array(
			//'roomid' => $room_id,
		  	'mailaddr' => $email,
			'password' => $pass
		  );
		  $url = './login.php';
		  $ch = curl_init($url);

		  curl_setopt($ch, CURLOPT_POST, TRUE);                            //POSTで送信
		  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));    //データをセット
		  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);                    //受け取ったデータを変数に
		  $html = curl_exec($ch);

		  if (!curl_errno($ch)) {        //curlでエラー発生
				curl_close($ch);
				$result = json_decode($html);
				if ($result && intval($result['result']) == 0) {
					setcookie("room_access_key", $result['result_string']);
					setcookie("room_".$room_no, $result['result_string']);
					header('Location: '.$roomPhp.'?roomId='.$room_no.'&pwd='.urlencode($pwd).'&nologin=1');
					die();
				} else {
					syslog(LOG_ERR, __FILE__.'('.__LINE__."): login error: " . $result['result_string']);
error_log('jump to index at '.__LINE__);
					header("Location: ".$indexPhp);
					die();
				}
		  } else {
				syslog(LOG_ERR, __FILE__.'('.__LINE__."): Curl error: " . curl_errno($ch));
error_log('jump to index at '.__LINE__);
				header("Location: ".$indexPhp);
				curl_close($ch);
				die();
			}
		/*
		} else if (isset($app->loggedInUser) && $app->loggedInUser->user_id != $userid) {
			syslog(LOG_ERR, __FILE__.'('.__LINE__."): Logged in user and pwd are not match");
			header("Location: ".$indexPhp);
			die();
		*/
		}

		if ($authMethod == "meeting") {
			$stmt = $app->mysqli->prepare("SELECT c_status from ht_meeting_users where n_meeting = ? and n_user = ?");
			if (!$stmt) {
				syslog(LOG_ERR, __FILE__.'('.__LINE__."): Query failed (" . $app->mysqli->error() . ")");
error_log('jump to index at '.__LINE__);
				header("Location: ".$indexPhp);
				die();
			}
			$stmt->bind_param('ii', $meetingId, $userid);
			$stmt->execute();
			$stmt->bind_result($status);
			if (!$stmt->fetch()) {
				syslog(LOG_ERR, __FILE__.'('.__LINE__."): user #".$userid." is not a member of this meeting.");
error_log('jump to index at '.__LINE__);
				header("Location: ".$indexPhp);
				$stmt->close();
				die();
			}
			$stmt->close();
		}
	}
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Room Video Chat</title>
<link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
<link rel="stylesheet" href="css/demo.css" type="text/css" />
<link rel="stylesheet" href="css/toastr.css" type="text/css" />
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css">
<style>
	#showmenu:hover,
	#showmenu:active,
	#showmenu:focus{
	  outline: none;
	}
	#showmenu::-moz-focus-inner{ /*Firefox用*/
	  border: none;
	}
</style>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/6.4.0/adapter.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.0/bootbox.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>
<!-- Place your kit's code here -->
<script type="text/javascript" src="https://kit.fontawesome.com/c5acfa41c5.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="js/jscd.js" ></script>
<script type="text/javascript" src="js/janus.js" ></script>
<script type="text/javascript" src="js/jquery.md5.js" ></script>
<script type="text/javascript" src="js/registerServiceWorker.js" ></script>
<?php
//if (isset($app->loggedInUser) && !isset($meetingnotfound) && empty($finishtime)) {
?>
<!--
<script>
const myroom = parseInt('<?php //echo $room_no ?>', 10);	// Demo room
const meetingid = parseInt('<?php //echo $meetingId ?>', 10);
const userid = parseInt('<?php //echo $app->loggedInUser->user_id ?>', 10);
const is_host = <?php //echo $isHost?'true':'false' ?>;
const is_private = <?php //echo $isPrivate?'true':'false' ?>;
const video_host = <?php //echo $videoHost?'true':'false' ?>;
const video_part = <?php //echo $videoPart?'true':'false' ?>;
const record_meeting = <?php //echo isset($recordMeeting)&&intval($recordMeeting)>0?'true':'false' ?>;
var videoRoomPass = null;
var videoRoomPin = null;
</script>
-->
<?php
//}
?>
<script>
const index_php = '<?php echo $indexPhp ?>';
$(window).on('load', function() {
	function locationHref(jumpto) {
		location.href = jumpto;
	}

	window.bootbox_alert = function(mess, callback) {
		if ($('#bootbox-alert').length == 0) {
			$('body').append(
				'<div id="bootbox-alert" class="dialog-div">' +
				'  <p><span id="errormess">'+mess+'</span></p>' +
				'</div>');
		}
		$('#bootbox-alert').dialog({
			modal:true, //モーダル表示
			title:"エラー", //タイトル
			resizable: false,
	    width: "auto",
			buttons: { //ボタン
				"確認": function() {
					$('#bootbox-alert').dialog("close");
					if (callback) {
						callback();
					}
				}
			}
		});
	};

<?php
if (isset($meetingnotfound)) {
?>
	errorDialog('本日、このミーティングは予定されていません', index_php);
	return;
<?php
}
?>
	function errorDialog(mess, jumpto) {
		$('#errormess').html(mess);
		$("#error-dialog").dialog({
			modal:true, //モーダル表示
			title:"エラー", //タイトル
			resizable: false,
	    width: "auto",
			buttons: { //ボタン
				"確認": async function() {
					//if (jumpto)
					//	await locationHref(jumpto);
					$("#error-dialog").dialog('close');
				}
			},
			close: async function() {
				if (jumpto)
					await locationHref(jumpto);
			}
		});
	}

	$('#showmenu').click(function() {
		$('.top-button').toggleClass('hide');
	});

	function xmur3(str) {
		for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
	    h = Math.imul(h ^ str.charCodeAt(i), 3432918353), h = h << 13 | h >>> 19;
		return function() {
			h = Math.imul(h ^ h >>> 16, 2246822507);
			h = Math.imul(h ^ h >>> 13, 3266489909);
			return (h ^= h >>> 16) >>> 0;
		}
	}

	function loadScript(url, callback) {
	    // adding the script tag to the head as suggested before
	   var head = document.getElementsByTagName('head')[0];
	   var script = document.createElement('script');
	   script.type = 'text/javascript';
	   script.src = url;

	   // then bind the event to the callback function
	   // there are several events for cross browser compatibility
	   script.onreadystatechange = callback;
	   script.onload = callback;

	   // fire the loading
	   head.appendChild(script);
	}
<?php
if (!isset($meetingnotfound) && !empty($finishtime)) {
?>
	errorDialog('このミーティングは終了しています', index_php);
	return;
<?php
}
$now = new DateTime();
//$datetime = new DateTime($starttime);
$diff = $now->diff($starttime);
if (!$diff->invert && ($diff->y || $diff->m || $diff->d || $diff->h || $diff->i > 10)) {
	$str = 'ミーティング開始時間は '.$starttime->format('G').'時'.$starttime->format('i').'分 です。';
?>
	errorDialog('<?php echo $str ?>', index_php);
	return;
<?php
}

if (!isset($meetingnotfound) && empty($finishtime) && isset($app->loggedInUser) && $authMethod == "login") {
?>
	const videoRoomPass = '<?php echo $meeting->pass ?>';
	//var seed = xmur3(videoRoomPass);
	//const videoRoomPin = seed()+'';
	const videoRoomPin = $.md5('<?php echo $room_no ?>', videoRoomPass);
	$('#videoRoomPass').val(videoRoomPass);
	$('#videoRoomPin').val(videoRoomPin);
	loadScript("js/room.js", function() {
		if (jscd.os != 'iOS' && jscd.os != 'iPadOS') {
			checkServiceWorkerRegistered('notification-dialog', '<?php echo $app->loggedInUser->user_id ?>', errorDialog, function() {
				$('#waitallow a').click(clickAllowJoin);
				if ($('#myvideo').length == 0) {
					$('#start').trigger("click");
				}
			});
		} else {
			$('#waitallow a').click(clickAllowJoin);
			if ($('#myvideo').length == 0) {
				$('#start').trigger("click");
			}
		}
	});
<?php
} else if (!isset($meetingnotfound) &&
					empty($finishtime) &&
					isset($app->loggedInUser) &&
					array_key_exists('room_'.$room_no, $_COOKIE) &&
					$_COOKIE['room_'.$room_no] == $app->loggedInUser->hash) {
?>
	const videoRoomPass = '<?php echo $meeting->pass ?>';
	//var seed = xmur3(videoRoomPass);
	//const videoRoomPin = seed()+'';
	const videoRoomPin = $.md5('<?php echo $room_no ?>', videoRoomPass);
	$('#videoRoomPass').val(videoRoomPass);
	$('#videoRoomPin').val(videoRoomPin);
	loadScript("js/room.js", function() {
		if (jscd.os != 'iOS' && jscd.os != 'iPadOS') {
			checkServiceWorkerRegistered('notification-dialog', '<?php echo $app->loggedInUser->user_id ?>', errorDialog, function() {
				$('#waitallow a').click(clickAllowJoin);
				if ($('#myvideo').length == 0) {
					$('#start').trigger("click");
				}
			});
		} else {
			$('#waitallow a').click(clickAllowJoin);
			if ($('#myvideo').length == 0) {
				$('#start').trigger("click");
			}
		}
	});
	//return;
<?php
} else if (!isset($meetingnotfound) && empty($finishtime) && isset($app->loggedInUser) && $isHost) {
?>
	const videoRoomPass = '<?php echo $meeting->pass ?>';
	//var seed = xmur3(videoRoomPass);
	//const videoRoomPin = seed()+'';
	const videoRoomPin = $.md5('<?php echo $room_no ?>', videoRoomPass);
	$('#videoRoomPass').val(videoRoomPass);
	$('#videoRoomPin').val(videoRoomPin);
	loadScript("js/room.js", function() {
		if (jscd.os != 'iOS' && jscd.os != 'iPadOS') {
			checkServiceWorkerRegistered('notification-dialog', '<?php echo $app->loggedInUser->user_id ?>', errorDialog, function() {
				$('#waitallow a').click(clickAllowJoin);
				if ($('#myvideo').length == 0) {
					$('#start').trigger("click");
				}
			});
		} else {
			$('#waitallow a').click(clickAllowJoin);
			if ($('#myvideo').length == 0) {
				$('#start').trigger("click");
			}
		}
	});
<?php
} else if (!isset($meetingnotfound) && empty($finishtime)) {
	if (!isset($app->loggedInUser) || !$ip_match) {
		if (!$ip_match) {
?>
	$('#pass_mess').html("初めてのアクセスの場合、<br>ログインする必要があります");
<?php
		} else {
?>
	$('#pass_mess').html("入室するにはログインする必要があります");
<?php
		}
?>
	var login_trigger = 0;
	$("#login-dialog").dialog({
		modal:true, //モーダル表示
		title:"HotRoomにログイン", //タイトル
		resizable: false,
    width: "auto",
		buttons: { //ボタン
			"ログイン": function() {
				login_trigger = 1;
				const data = new FormData();
				data.set('mailaddr', document.querySelector('#mailaddr').value);
				data.set('password', document.querySelector('#password').value);
				data.set('roomid', '<?php echo $room_no ?>');

				fetch('./login.php', {method: 'POST', cache: 'no-cache', credentials:'include', body: data})
				.then((res) => res.json())
				.then(async function(response) {
					$("#login-dialog").dialog("close");
					if (response.result == 0) {
						$.cookie("room_access_key", response.result_string);
<?php
		if (!isset($app->loggedInUser)) {
?>
						await locationHref("<?php echo $roomPhp?>?roomId=<?php echo $room_no ?>&pwd=<?php echo urlencode($pwd) ?>&nologin=1");
<?php
		} else {
?>
						$.cookie('room_'+myroom, response.result_string);
						const videoRoomPass = '<?php echo $meeting->pass ?>';
						//var seed = xmur3(videoRoomPass);
						//const videoRoomPin = seed()+'';
						const videoRoomPin = $.md5('<?php echo $room_no ?>', videoRoomPass);
						$('#videoRoomPass').val(videoRoomPass);
						$('#videoRoomPin').val(videoRoomPin);
						loadScript("js/room.js", function() {
							if (jscd.os != 'iOS' && jscd.os != 'iPadOS') {
								checkServiceWorkerRegistered('notification-dialog', response.user_id, errorDialog, function() {
									$('#waitallow a').click(clickAllowJoin);
									if ($('#myvideo').length == 0) {
										$('#start').trigger("click");
									}
								});
							} else {
								$('#waitallow a').click(clickAllowJoin);
								if ($('#myvideo').length == 0) {
									$('#start').trigger("click");
								}
							}
						});
<?php
		}
?>
					} else {
						errorDialog(response.result_string, index_php);
					}
				}).catch((reason) => {
					$("#login-dialog").dialog("close");
					errorDialog(reason, index_php);
				});
			},
			"キャンセル": async function() {
				await locationHref(index_php);
			}
		},
		close: async function() {
			if (login_trigger == 0) {
				await locationHef("<?php echo $roomPhp ?>");
			}
		}
	});
<?php
	} else if ($authMethod == "meeting" ) {
		if (intval($skipPass) == 0) {
?>
	var login_trigger = 0;
	$("#room-dialog").dialog({
		modal:true, //モーダル表示
		title:"ミーティングに参加", //タイトル
		resizable: false,
    width: "auto",
		buttons: { //ボタン
			"参加": function() {
				login_trigger = 1;
				$(this).dialog("close");
				const data = new FormData();
				data.set('roomid', '<?php echo $room_no ?>');
				data.set('password', $('#roompass').val());

				fetch('./roomlogin.php', {method: 'POST', cache: 'no-cache', credentials:'include', body: data})
				.then((res) => res.json())
				.then((response) => {
					$(this).dialog("close");
					if (response.result != 0) {
						errorDialog(response.result_string, index_php);
					} else {
						$.cookie('room_'+myroom, '<?php echo $app->loggedInUser->hash ?>');
						const videoRoomPass = $('#roompass').val();
						//var seed = xmur3(videoRoomPass);
						//const videoRoomPin = seed()+'';
						const videoRoomPin = $.md5('<?php echo $room_no ?>', videoRoomPass);
						$('#videoRoomPass').val(videoRoomPass);
						$('#videoRoomPin').val(videoRoomPin);
						loadScript("js/room.js", function() {
							if (jscd.os != 'iOS' && jscd.os != 'iPadOS') {
								checkServiceWorkerRegistered('notification-dialog', '<?php echo $app->loggedInUser->user_id ?>', errorDialog, function() {
									$('#waitallow a').click(clickAllowJoin);
									if ($('#myvideo').length == 0) {
										$('#start').trigger("click");
									}
								});
							} else {
								$('#waitallow a').click(clickAllowJoin);
								if ($('#myvideo').length == 0) {
									$('#start').trigger("click");
								}
							}
						});
					}
				}).catch((reason) => {
					$("#room-dialog").dialog("close");
					errorDialog(reason, index_php);
				});
			},
			"中止": async function() {
				login_trigger = 2;
				$("#room-dialog").dialog("close");
				await locationHref(index_php);
			}
		},
		close: async function() {
			if (login_trigger == 0) {
				await locationHref("<?php echo $roomPhp ?>");
			}
		}
	});
<?php
		} else if (!$isHost && $status == 'waiting') {
?>
	const textchatId = "textroom-"+Janus.randomString(12);
	var janus = null;
	var myTextRoom = null;
	var participants = {}
	var transactions = {}
	var server = "https://" + window.location.hostname + ":8089/janus";

	Janus.init({debug: "all", callback: function() {
		janus = new Janus({
			server: server,
			success: function() {
			// Attach to TextRoom plugin
				janus.attach({
					plugin: "janus.plugin.textroom",
					opaqueId: textchatId,
					success: function(pluginHandle) {
						myTextroom = pluginHandle;
						// Setup the DataChannel
						var body = { request: "setup" };
						myTextroom.send({ message: body });
					},
					error: function(error) {
						console.error("  -- Error attaching plugin...", error);
					},
					iceState: function(state) {
						console.log("ICE state changed to " + state);
					},
					mediaState: function(medium, on) {
						console.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
					},
					webrtcState: function(on) {
						console.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
					},
					onmessage: function(msg, jsep) {
						if(msg["error"]) {
							errorDialog(msg["error"]);
						}
						if(jsep) {
							// Answer
							myTextroom.createAnswer({
								jsep: jsep,
								media: { audio: false, video: false, data: true },	// We only use datachannels
								success: function(jsep) {
									var body = { request: "ack" };
									myTextroom.send({ message: body, jsep: jsep });
									myRegisterTextName();
								},
								error: function(error) {
									console.error("WebRTC error:", error);
									errorDialog("WebRTC error... " + error.message);
								}
							});
						}
					},
					ondataopen: function(data) {
						console.log("The DataChannel is available!");
					},
					ondata: function(data) {
						//~ $('#datarecv').val(data);
						var json = JSON.parse(data);
						var transaction = json["transaction"];
						if(transactions[transaction]) {
							// Someone was waiting for this
							transactions[transaction](json);
							delete transactions[transaction];
							return;
						}
						var what = json["textroom"];
						if(what === "message") {
							// Incoming message: public or private?
							var msg = json["text"];
							var whisper = json["whisper"];
							console.log((whisper?'whisper ':'')+'message from '+json["from"]+': '+msg);
						} else if(what === "announcement") {
							// Room announcement
							var msg = json["text"];
							var myArray = /^%room_command%(.*)/.exec(msg);
							if (Array.isArray(myArray)) {
								var cmds = myArray[1].split('=');
								if (cmds.length > 1 && cmds[0] === 'allowjoin') {
									if (cmds[1] == '<?php echo $userid ?>') {
										$("#wait-dialog").dialog('close');
										finishWaiting();
										const videoRoomPass = '<?php echo $meeting->pass ?>';
										//var seed = xmur3(videoRoomPass);
										//const videoRoomPin = seed()+'';
										const videoRoomPin = $.md5('<?php echo $room_no ?>', videoRoomPass);
										$('#videoRoomPass').val(videoRoomPass);
										$('#videoRoomPin').val(videoRoomPin);
										loadScript("js/room.js", function() {
											if ($('#myvideo').length == 0) {
												$('#start').trigger("click");
											}
										});
									}
								} else if (cmds.length > 1 && cmds[0] === 'hostjoined') {
									startWaiting();
								}
							} else {
								console.log('announcement: '+msg);
							}
						} else if(what === "join") {
							// Somebody joined
							var username = json["username"];
							var display = json["display"];
							console.log(display ? display : username + ' is joined');
						} else if(what === "leave") {
							// Somebody left
							var username = json["username"];
							var display = json["display"];
							console.log(display ? display : username + ' is left');
						} else if(what === "kicked") {
							// Somebody was kicked
							var username = json["username"];
							var when = new Date();
							var display = json["display"];
							console.log(display ? display : username + ' is kicked');
						} else if(what === "destroyed") {
							if(json["room"] !== myroom)
								return;
							// Room was destroyed, goodbye!
							errorDialog("The room has been destroyed");
						}
					},
					oncleanup: function() {
						console.log(" ::: Got a cleanup notification :::");
					}
				});
			}
		});
	}});

	function myRegisterTextName() {
		var subscribe = {
			request: "create",
			room: myroom,
			permanent: false,
			is_private_id: true
		};
		myTextroom.send({
			message: subscribe,
			success: function(result) {
				var transaction = Janus.randomString(12);
				var register = {
					textroom: "join",
					transaction: transaction,
					room: myroom,
					username: '<?php echo $userid ?>',
					display: '<?php echo $disp_name ?>'
				};
				transactions[transaction] = function(response) {
					if(response["textroom"] === "error") {
						// Something went wrong
						if(response["error_code"] === 417) {
							// This is a "no such room" error: give a more meaningful description
							errorDialog(
								"<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
								"does not exist...</p><p>Do you have an updated <code>janus.plugin.textroom.jcfg</code> " +
								"configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
								"from that sample in your current configuration file, then restart Janus and try again."
							);
						} else {
							errorDialog(response["error"]);
						}
						return;
					}
					// We're in
					// Any participants already in?
					console.log("Participants:", response.participants);
					if(response.participants && response.participants.length > 0) {
						for(var i in response.participants) {
							var p = response.participants[i];
							participants[p.username] = p.display ? p.display : p.username;
						}
					}
					startWaiting();
				};
				myTextroom.data({
					text: JSON.stringify(register),
					error: function(reason) {
						errorDialog(reason);
					}
				});
			}
		});
	}

	function startWaiting() {
		var message = {
			textroom: "announcement",
			transaction: Janus.randomString(12),
			room: myroom,
			text: '%room_command%waiting=<?php echo $userid ?>'
		};
		myTextroom.data({
			text: JSON.stringify(message),
			error: function(reason) { errorDialog(reason); },
			success: function() { }
		});
	}

	function finishWaiting() {
		var message = {
			textroom: "announcement",
			transaction: Janus.randomString(12),
			room: myroom,
			text: '%room_command%finish_waiting=<?php echo $userid ?>'
		};
		myTextroom.data({
			text: JSON.stringify(message),
			error: function(reason) { errorDialog(reason); },
			success: function() {
				const data = new FormData();
				data.set('userId', '<?php echo $userid ?>');
				data.set('meetingId', '<?php echo $meetingId ?>');
				fetch('./allowJoin.php', { method: 'POST', cache: 'no-cache', credentials:'include', body: data })
				.then((res) => res.json())
				.then((response) => {
					if (response.result != 0) {
						errorDialog(response.result_string);
					} else {
						var register = {
							textroom: "leave",
							room: myroom
						};
						myTextroom.data({
							text: JSON.stringify(message),
							error: function(reason) { errorDialog(reason); },
							success: function() { }
						});
					}
				}).catch((reason) => {
					errorDialog(reason);
				});
			}
		});
	}
	$("#wait-dialog").dialog({
		modal:true, //モーダル表示
		title:"待機中", //タイトル
		resizable: false,
		width: "auto",
		buttons: { //ボタン
			"中止": async function() {
				$(this).dialog("close");
				await locationHref(index_php);
			}
		}
	});
<?php
		}
	}
}
?>
});
</script>
</head>
<body>
<?php
if (isset($app->loggedInUser) && !isset($meetingnotfound) && empty($finishtime)) {
?>
<input type="hidden" id="myroom" value="<?php echo $room_no ?>">
<input type="hidden" id="meetingid" value="<?php echo $meetingId ?>">
<input type="hidden" id="userid" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->user_id:'0' ?>">
<input type="hidden" id="is_host" value="<?php echo $isHost?'true':'false' ?>">
<input type="hidden" id="is_private" value="<?php echo $isPrivate?'true':'false' ?>">
<input type="hidden" id="video_host" value="<?php echo $videoHost?'true':'false' ?>">
<input type="hidden" id="video_part" value="<?php echo $videoPart?'true':'false' ?>">
<input type="hidden" id="record_meeting" value="<?php echo isset($recordMeeting)&&intval($recordMeeting)>0?'true':'false' ?>">
<input type="hidden" id="videoRoomPass" value="">
<input type="hidden" id="videoRoomPin" value="">
<?php
}
?>
<div id="login-dialog" style="display: none">
	<p id="pass_mess" />
	<p><input id="mailaddr" type="email" placeholder="メールアドレス"></p>
	<p><input id="password" type="password" placeholder="パスワード"></p>
</div>

<div id="room-dialog" style="display: none">
	<p><input id="roompass" type="password" placeholder="ルームパスワード"></p>
</div>

<div id="wait-dialog" style="display: none">
	<p>ホストのミーティング参加承認を待っています</p>
</div>

<div id="notification-dialog" style="display: none">
  <p><span>Roomビデオコールの通知を受け取るため、通知機能を許可してください</span></p>
</div>

<div id="error-dialog" style="display: none">
	<p><span id="errormess"></span></p>
</div>

<div class="row" style="position: absolute; margin: 5px; z-index: 100; position: fixed;">
	<div class="btn-group btn-group-xs" style="opacity:0.7;">
		<button id="showmenu" class="menu-buttons" autocomplete="off" style="background-color: transparent; border-width: 0px;">
			<img width="32" height="32" src="./images/menu_3_line.png"></img>
		</button>
	</div>
	<div id="nowrecording" class="btn-group btn-group-xs hide" style="opacity:0.7;">
		<img width="32" height="32" src="./images/recording.png"></img>
		<!--
		Icons made by <a href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
		-->
	</div>
	<div class="btn-group btn-group-xs top-button hide">
		<button id="selectpresenter" autocomplete="off" class="btn btn-primary dropdown-toggle<?php echo $isHost?'':' hide' ?>" data-toggle="dropdown">
			発表者選択<span class="caret"></span>
		</button>
		<ul id="presenter" class="dropdown-menu" role="menu">
			<li><a href="#" id="user_0">全員許可</a></li>
		</ul>
	</div>
	<div class="btn-group btn-group-xs top-button hide">
		<button id="allowjoin" autocomplete="off" class="btn btn-primary dropdown-toggle<?php echo $isHost&&isset($status)&&$status=='waiting'?'':' hide' ?>" data-toggle="dropdown">
			入室許可<span class="caret"></span>
		</button>
		<ul id="waitallow" class="dropdown-menu" role="menu">
		</ul>
	</div>
	<div class="btn-group btn-group-xs top-button hide">
		<button id="select-camera" autocomplete="off" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
			カメラ<span class="caret"></span>
		</button>
		<ul id="camera-list" class="dropdown-menu" role="menu">
		</ul>
	</div>
	<div class="btn-group btn-group-xs top-button hide">
		<button id="select-speaker" autocomplete="off" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
			スピーカー<span class="caret"></span>
		</button>
		<ul id="speaker-list" class="dropdown-menu" role="menu">
		</ul>
	</div>
	<div class="btn-group btn-group-xs top-button hide">
		<button id="select-mic" autocomplete="off" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
			マイク<span class="caret"></span>
		</button>
		<ul id="mic-list" class="dropdown-menu" role="menu">
		</ul>
	</div>
	<div class="btn-group btn-group-xs top-button hide" style="opacity:0.7;">
		<button id="startrecording" autocomplete="off" class="menu-buttons hide" style="background-color: transparent; border-width: 0px;">
			<img width="32" height="32" src="./images/rec-start-300x300.png"></img>
		</button>
	</div>
	<div class="btn-group btn-group-xs top-button hide" style="opacity:0.7;">
		<button id="stoprecording" autocomplete="off" class="menu-buttons hide" style="background-color: transparent; border-width: 0px;">
			<img width="32" height="32" src="./images/rec-stop.png"></img>
		</button>
	</div>
	<div class="btn-group btn-group-xs top-button hide">
		<button id="joinrequest" autocomplete="off" class="btn btn-primary dropdown-toggle<?php echo $isHost?'':' hide' ?>" data-toggle="dropdown">
			参加要請<span class="caret"></span>
		</button>
		<ul id="waitjoin" class="dropdown-menu" role="menu">
		</ul>
	</div>
	<div class="top-button hide" style="opacity:0.7;">
	  <input type="range" id="inputLevelSelector" name="inputLevelSelector" min="0" max="100">
	  <label for="inputLevelSelector">マイク音量</label>
	</div>
</div>

<div class="row" style="height: 100vh; margin-left: 0px; margin-right: 0px">
	<div id="textroom" style="display: none">
		<div class="panel panel-default">
			<div class="panel-heading" style="white-space: nowrap">
				<h3 class="panel-title">参加者 <span class="label label-info hide" id="participant"></span></h3>
			</div>
			<div class="panel-body">
				<ul id="list" class="list-group">
				</ul>
			</div>
		</div>
		<div class="panel panel-default" style="margin-left: 10px; width: 100%">
			<div class="panel-heading">
				<h3 class="panel-title">チャットルーム</h3>
			</div>
			<div class="panel-body relative" style="overflow-x: auto;" id="chatroom">
			</div>
			<div class="panel-footer">
				<div class="input-group margin-bottom-sm">
					<span class="input-group-addon"><i class="fa fa-cloud-upload fa-fw"></i></span>
					<input class="form-control" type="text" placeholder="全員への公開メッセージを入力(Enterで送信)" autocomplete="off" id="datasend" onkeypress="return checkEnter(this, event);" disabled />
					<!--
					<textarea class="form-control" placeholder="Write a chatroom message" autocomplete="off" id="datasend" style="width:95%" disabled></textarea>
					<button id="sendmess" style="width:5%; height:100%" onclick="return checkEnter(document.getElementById('datasend'), event);">send</button>
					-->
				</div>
			</div>
		</div>
	</div>

	<div class="row" id="roomuser" style="margin-left: 0px; margin-right: 0px">
		<div class="row hide" id="room" style="margin-left: 0px; margin-right: 0px; bottom: 0px">
			<div class="panel panel-default" style="position: relative">
				<div class="panel-heading">
					<h3 class="panel-title">
						画面共有
						<span class="label label-info" id="title"></span>
						<span class="label label-success" id="session"></span>
						<a href="#" class="BidModal_hideButton" id="closeshare">閉じる</a>
					</h3>
				</div>
				<div class="panel-body relative" id="screencapture"></div>
			</div>
		</div>

		<div class="row hide" id="videos">
			<div class="col-md-4 videos-col hide" id="localshareframe">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<span class="label label-info" id="localshare">画面共有中</span>
							<div class="pull-right info-icon" id="info0" style="width: 24px; height: 24px;">
								<a href="javascript:;" id="closesharelocal">
									<img src="./images/close_cross_icon.png" width="24" height="24">
								</a>
							</div>
						</h3>
					</div>
					<div class="panel-body relative" id="videolocalshare">
					</div>
				</div>
			</div>
			<div class="col-md-4 videos-col">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<span class="label label-primary hide" id="publisher"></span>
							<div class="btn-group btn-group-xs pull-right hide">
								<div class="btn-group btn-group-xs">
									<button id="bitrateset" autocomplete="off" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
										送信帯域<span class="caret"></span>
									</button>
									<ul id="bitrate" class="dropdown-menu" role="menu">
										<li><a href="#" id="0">制限なし</a></li>
										<li><a href="#" id="128">最大128KB</a></li>
										<li><a href="#" id="256">最大256KB</a></li>
										<li><a href="#" id="512">最大512KB</a></li>
										<li><a href="#" id="1024">最大1MB</a></li>
										<li><a href="#" id="1500">最大1.5MB</a></li>
										<li><a href="#" id="2000">最大2MB</a></li>
									</ul>
								</div>
							</div>
						</h3>
					</div>
					<div class="panel-body relative" id="videolocal"></div>
				</div>
			</div>
<?php
	for ($seq = 1; $seq < 100; ++$seq) {
?>
			<div class="col-md-4 videos-col hide" id="remoteframe<?php echo $seq ?>">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<span class="label label-info hide" id="remote<?php echo $seq ?>"></span>
							<div class="pull-right info-icon" id="info<?php echo $seq ?>" style="width: 24px; height: 24px;"><img src="./images/icons8-info.svg"></img></div>
						</h3>
					</div>
					<div class="panel-body relative" id="videoremote<?php echo $seq ?>">
					</div>
				</div>
			</div>
<?php
	}
?>
		</div>
	</div>

	<div class="row" id="header-div">
		<div class="page-header">
			<button class="btn btn-default" autocomplete="off" id="start">入室</button>
			<button class="btn btn-default hide" autocomplete="off" id="togglechat">チャットを表示</button>
			<button class="btn btn-success hide" autocomplete="off" id="startshare">画面共有</button>
			<button class="btn btn-default hide" autocomplete="off" id="trans-test">表示位置変更</button>
		</div>

		<div class="container hide" id="videojoin">
			<div class="row">
				<span class="label label-info" id="you"></span>
				<div class="col-md-12" id="controls">
					<div class="input-group margin-bottom-md hide" id="registernow">
						<span class="input-group-addon">@</span>
						<input autocomplete="off" class="form-control" type="text" placeholder="Choose a display name" id="username" value="<?php echo $disp_name ?>" readonly />
						<span class="input-group-btn">
							<button class="btn btn-success" autocomplete="off" id="register">Join the room</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>
