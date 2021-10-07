// We make use of this 'server' variable to provide the address of the
// REST Janus API. By default, in this example we assume that Janus is
// co-located with the web server hosting the HTML pages but listening
// on a different port (8088, the default for HTTP in Janus), which is
// why we make use of the 'window.location.hostname' base address. Since
// Janus can also do HTTPS, and considering we don't really want to make
// use of HTTP for Janus if your demos are served on HTTPS, we also rely
// on the 'window.location.protocol' prefix to build the variable, in
// particular to also change the port used to contact Janus (8088 for
// HTTP and 8089 for HTTPS, if enabled).
// In case you place Janus behind an Apache frontend (as we did on the
// online demos at http://janus.conf.meetecho.com) you can just use a
// relative path for the variable, e.g.:
//
// 		var server = "/janus";
//
// which will take care of this on its own.
//
//
// If you want to use the WebSockets frontend to Janus, instead, you'll
// have to pass a different kind of address, e.g.:
//
// 		var server = "ws://" + window.location.hostname + ":8188";
//
// Of course this assumes that support for WebSockets has been built in
// when compiling the server. WebSockets support has not been tested
// as much as the REST API, so handle with care!
//
//
// If you have multiple options available, and want to let the library
// autodetect the best way to contact your server (or pool of servers),
// you can also pass an array of servers, e.g., to provide alternative
// means of access (e.g., try WebSockets first and, if that fails, fall
// back to plain HTTP) or just have failover servers:
//
//		var server = [
//			"ws://" + window.location.hostname + ":8188",
//			"/janus"
//		];
//
// This will tell the library to try connecting to each of the servers
// in the presented order. The first working server will be used for
// the whole session.
//
var server = null;
if(window.location.protocol === 'http:')
	server = "http://" + window.location.hostname + ":8088/janus";
else
	server = "https://" + window.location.hostname + ":8089/janus";

var janus = null;
var sfutest = null;
var screentest = null;
var screenrecv = null;
var textroom = null;
var opaqueId = "videoroom-"+Janus.randomString(12);
var sharingId = "screensharing-"+Janus.randomString(12);
var textchatId = "textroom-"+Janus.randomString(12);

var source = null;
var capture = "screen";
var role = "listener";
//var sharefeed = null;
var sharedetaching = false;
var setlocaldesc = false;
var launchingshare = false;
//var myroom = 1234;	// Demo room
var myusername = null;
var myid = null;
var mystream = null;
// We use this other ID just to map our subscriptions to us
var mypvtid = null;
var hostid = null;
var spinner = null;
var shareid = null;
var publishshare = false;
var shareallowed = 0;
var chatwindow = null;

var feeds = [];
var bitrateTimer = [];
var audioContexts = [];
var scriptProcessors = [];
var participants = {}
var transactions = {}

var doSimulcast = (getQueryStringValue("simulcast") === "yes" || getQueryStringValue("simulcast") === "true");
var doSimulcast2 = (getQueryStringValue("simulcast2") === "yes" || getQueryStringValue("simulcast2") === "true");

function resetTransform() {
	$('#roomuser').css('display', '');
	$('#room').css('width', '');
	$('#videos').css('top', '');
	$('#videos').css('bottom', '');
	$('#videos').css('width', '');
	$('#videos').css('height', '');
	$('#videos').css('position', '');
	$('#videos').css('flex-wrap', '');
	$('#videos').css('flex-grow', '');
	$('#videos').css('flex-direction', '');
	$('#videos').css('overflow-x', '');
	$('#videos').css('overflow-y', '');
	$('.videos-col').css('min-width', '');
	$('.videos-col').css('min-height', '');
	$('.videos-col').css('width', '');

	$('#videos').removeClass('bottom-video');
	$('#videos').removeClass('right-video');
}

function transformBottom() {
	resetTransform();

	$('#room').css('width', '100vw');
	$('#videos').css('flex-wrap', 'nowrap');
	$('#videos').css('flex-grow', '1');
	$('#videos').css('overflow-x', 'auto');
	$('#videos').css('bottom', '0px');
	$('#videos').css('position', 'fixed');
	$('#videos').css('width', '100vw');
	$('.videos-col').css('min-width', '20%');

	$('#videos').removeClass('right-video');
	$('#videos').addClass('bottom-video');
}

function transformRight() {
	resetTransform();

	$('#roomuser').css('display', 'flex');
	$('#roomuser').css('align-items', 'flex-start');
	$('#room').css('width', '100vw');
	$('#room').css('height', '100vh');
	$('#videos').css('width', '18vw');
	$('#videos').css('height', '100vh');
	$('#videos').css('top', '0px');
	$('#videos').css('right', '0px');
	$('#videos').css('position', 'fixed');
	$('#videos').css('flex-wrap', 'nowrap');
	$('#videos').css('flex-direction', 'column');
	$('#videos').css('overflow-y', 'auto');

	var height = Math.floor($('.videos-col .panel-heading').height() + $('.videos-col .panel-body').height()) + 10;
	$('.videos-col').css('width', '100%');
	$('.videos-col').css('min-height', height+'px');

	$('#videos').removeClass('bottom-video');
	$('#videos').addClass('right-video');
}

function bootboxalert(mess, callback) {
	if ('bootbox_alert' in window) {
		bootbox_alert(mess, callback);
	} else {
		bootbox.alert(mess, callback);
	}
}

function clickPresenter() {
	var parts = this.id.split('_');
	var presenter = parts[1];
	var message = {
		textroom: "announcement",
		transaction: Janus.randomString(12),
		room: parseInt($('#myroom').val(), 10),
		secret: $('#videoRoomPass').val(),
		text: '%room_command%presenter='+presenter
	};
	textroom.data({
		text: JSON.stringify(message),
		error: function(reason) {
			bootboxalert(reason);
		},
		success: function() { }
	});
}

function clickAllowJoin() {
	var parts = this.id.split('_');
	var allowedUser = parts[1];
	var message = {
		textroom: "announcement",
		transaction: Janus.randomString(12),
		room: parseInt($('#myroom').val(), 10),
		secret: $('#videoRoomPass').val(),
		text: '%room_command%allowjoin='+allowedUser
	};
	textroom.data({
		text: JSON.stringify(message),
		error: function(reason) {
			bootboxalert(reason);
		},
		success: function() { }
	});
}

function JumpToIndex() {
	window.location.href = index_php;
}

function destroyJanus() {
	if ($('#is_host').val() === 'true') {
		var destroy = {
			"request" : "destroy",
			"room" : parseInt($('#myroom').val(), 10),
			"secret" : $('#videoRoomPass').val(),
		};
		sfutest.send({ message: destroy, success: function() {
			var destroy = {
				"textroom" : "destroy",
				"room" : parseInt($('#myroom').val(), 10),
				"secret" : $('#videoRoomPass').val(),
			};
			textroom.data({
				text: JSON.stringify(destroy),
				error: function(reason) {
					bootboxalert(reason);
				},
				success: function() {
					janus.destroy();
				}
			});				
		}});
	} else {
		janus.destroy();
	}
}

function setStreamControlled(target) {
	/**
	* Create a new audio context and build a stream source,
	* stream destination and a gain node. Pass the stream into
	* the mediaStreamSource so we can use it in the Web Audio API.
	*/
	const context = new AudioContext();
	const mediaStreamSource = context.createMediaStreamSource(target);
	const mediaStreamDestination = context.createMediaStreamDestination();
	const gainNode = context.createGain();
	//const javascriptNode = context.createScriptProcessor(2048, 1, 1);

	/**
	* Connect the stream to the gainNode so that all audio
	* passes through the gain and can be controlled by it.
	* Then pass the stream from the gain to the mediaStreamDestination
	* which can pass it back to the RTC client.
	*/
	mediaStreamSource.connect(gainNode);
	gainNode.connect(mediaStreamDestination);
	//mediaStreamSource.connect(javascriptNode);

	/**
	* The mediaStreamDestination.stream outputs a MediaStream object
	* containing a single AudioMediaStreamTrack. Add the video track
	* to the new stream to rejoin the video with the controlled audio.
	*/
	// Get the videoTracks from the stream.
	const videoTracks = target.getVideoTracks();
	const controlledStream = mediaStreamDestination.stream;
	for (const videoTrack of videoTracks) {
		controlledStream.addTrack(videoTrack);
	}

	/**
	* Change the gain levels on the input selector.
	*/
	$('#inputLevelSelector').val(Math.floor(gainNode.gain.value*50));
	$('#inputLevelSelector').change(event => {
		gainNode.gain.value = event.target.value/50;
	});

	/*
	javascriptNode.onaudioprocess = function(event) {
		const input = event.inputBuffer.getChannelData(0);
		let i;
		let sum = 0.0;
		for (i = 0; i < input.length; ++i) {
			sum += input[i] * input[i];
		}
		$('#instantlocal').val(Math.sqrt(sum / input.length));
	};
	*/

	/**
	* Use the stream that went through the gainNode. This
	* is the same stream but with altered input volume levels.
	*/
	//localVideo.srcObject = controlledStream;
	//localStream = controlledStream;
	//sfutest.webrtcStuff.pc.addStream(controlledStream);
	mystream = controlledStream;
	return controlledStream;
}

function readCookie(name) {
	var equal = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(equal) == 0) return c.substring(equal.length, c.length);
	}
	return null;
}
  
function readUserList() {
	const data = new FormData();
	data.set('fnc', 'videocall');
	fetch("./getuserlist.php", {
		method: 'POST',
		cache: 'no-cache',
		credentials:'include',
		body: data
	}).then((res) => res.json()).then((response) => {
		if (response.result == 0) {
			for (var mp in response.result_string) {
				var name = response.result_string[mp];
				var idx = name.indexOf('_');
				var userid = name.substring(0, idx);
				var username = name.substring(idx+1);
				$('#waitjoin').append('<li><a id ="join_'+userid+'">'+username+'</a></li>');
				$('#waitjoin a').click(function(){
					var session = readCookie('room_access_key');
					var parts = this.id.split('_');
					var user = parts[1];
					fetch("./joinroomrequest.php?askto="+user+"&token"+session, {
						method: 'GET',
						cache: 'no-cache',
						credentials:'include',
					}).then((res) => res.json()).then((response) => {
					});
				});
			}
		}
	});
}

$(document).ready(function() {
	var askUnload = false;
	var stopClicked = false;

	function makeTransform() {
		if ($('#videos').hasClass('bottom-video')) {
			transformRight();
		} else if ($('#videos').hasClass('right-video')) {
			transformBottom();
		}
	}
	$('.videos-row .col-md-4').css('padding-right', '0px');
	$('.videos-row .col-md-4').css('padding-left', '0px');
	$('#trans-test').click(makeTransform);

	// Initialize the library (all console debuggers enabled)
	Janus.init({debug: "all", callback: function() {
		$('#start').on('click', function() {
			var finish_asked = false;
			readUserList();
			$(window).on('beforeunload', function(event) {
				var leave = {
					textroom: "leave",
					room: parseInt($('#myroom').val(), 10),
					pin: $('#videoRoomPin').val(),
				}
				textroom.data({ text: JSON.stringify(leave) });
				screentest.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() } });
				if (screenrecv) {
					screenrecv.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() } });
				}
				sfutest.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() }, success: function() {
					destroyJanus();
				}});
			});
			// Use a button to start the demo
			$(this).attr('disabled', true).unbind('click');
			// Make sure the browser supports WebRTC
			if(!Janus.isWebrtcSupported()) {
				bootboxalert("No WebRTC support... ");
				return;
			}
			// Create session
			janus = new Janus({
				server: server,
				success: function() {
					// Attach to VideoRoom plugin
					janus.attach({
						plugin: "janus.plugin.videoroom",
						opaqueId: opaqueId,
						success: function(pluginHandle) {
							$('#details').remove();
							sfutest = pluginHandle;
							Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
							Janus.log("  -- This is a publisher/manager");
							// Prepare the username registration
							//$('#videojoin').removeClass('hide').show();
							//$('#registernow').removeClass('hide').show();
							$('#togglechat').removeClass('hide').show();
							if (!jscd.mobile)
								$('#startshare').removeClass('hide').show();
							$('#register').click(registerUsername);
							if (!jscd.mobile)
								$('#startshare').click(preShareScreen);
							$('#username').focus();
							$('#start').removeAttr('disabled').html("退室").click(function() {
								if ($('#is_host').val() === 'true') {
									var thiz = this;
									var mess = 'ホストが退室すると、ミーティングが終了します。このまま退室しますか？';
									bootbox.confirm(mess, function(which) {
										if (which) {
											var message = {
												textroom: "announcement",
												transaction: Janus.randomString(12),
												room: parseInt($('#myroom').val(), 10),
												secret: $('#videoRoomPass').val(),
												text: '%room_command%endofthisroom='+myid
											};
											textroom.data({
												text: JSON.stringify(message),
												error: function(reason) {
													bootboxalert(reason);
												},
												success: function() {
													finish_asked = true;
													/// 現在のDateオブジェクト作成
													var d = new Date();
													// 日付を文字列にフォーマットする
													var formatted = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
													const data = new FormData();
													data.set('meetingid', $('#meetingid').val());
													data.set('date', formatted);
													fetch('./finishmeeting.php', {method: 'POST', cache: 'no-cache', credentials:'include', body: data})
													.then(res => res.json())
													.then(response => {
														if (response.result != 0) {
															bootboxalert(response.result_string);
														} else {
															sfutest.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() }, success: function() {
																$(thiz).attr('disabled', true);
																stopClicked = true;
																destroyJanus();
															}});
														}
													})
													.catch((reason) => {
														bootboxalert(reason);
													});
												}
											});
										} else {
											$(thiz).attr('disabled', true);
											stopClicked = true;
											sfutest.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() }, success: function() {
												destroyJanus();
											}});
										}
									});
								} else {
									finish_asked = $('#is_private').val()==='true';
									$(this).attr('disabled', true);
									sfutest.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() }, success: function() {
										stopClicked = true;
										janus.destroy();
									}});
								}
							});
							$('#togglechat').click(function() {
								if ($('#textroom').dialog('isOpen')) {
									$('#textroom').dialog('close');
									$('#togglechat').html('チャット表示');
								} else {
									$('#textroom').dialog('open');
									$('#togglechat').html('チャット隠す');
								}
							});
							$("#textroom").dialog({
								modal: false, //モーダル表示
								autoOpen: false,
								title: "テキストチャット", //タイトル
								resizable: true,
						    width: "920px",
								open: function() {
									$('#textroom').css('display', 'flex');
									$('.ui-dialog .ui-dialog-titlebar-close').css('background-image', 'url("./images/close_cross_icon.png")');
									$('.ui-dialog .ui-dialog-titlebar-close').css('background-size', '16px 16px');
									$('.ui-dialog .ui-dialog-titlebar-close').css('background-color','rgba(255,255,255,0.3)');
									$('.ui-dialog .ui-dialog-titlebar-close').css('background-blend-mode','lighten');
								},
								close: function() {
									$('#togglechat').html('チャット表示');
								}
							});
							$('.info-icon').click(function() {
								var id = this.id.substr('info'.length);
								$('#curres'+id).toggleClass('hide');
								if(Janus.webRTCAdapter.browserDetails.browser === "chrome" ||
										Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
										Janus.webRTCAdapter.browserDetails.browser === "safari") {
									$('#curbitrate'+id).toggleClass('hide');
								}
							});
							$('#register').trigger('click');
						},
						error: function(error) {
							Janus.error("  -- Error attaching plugin...", error);
							bootboxalert("Error attaching plugin... " + error);
						},
						consentDialog: function(on) {
							Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
							if(on) {
								// Darken screen and show hint
								$.blockUI({
									//message: '<div><img src="up_arrow.png"/></div>',
									message: '<div>カメラとマイクの使用を許可してください</div>',
									css: {
										border: 'none',
										padding: '15px',
										backgroundColor: 'transparent',
										color: '#aaa',
										top: '10px',
										left: (navigator.mozGetUserMedia ? '-100px' : '300px')
									} });
							} else {
								// Restore screen
								$.unblockUI();
							}
						},
						iceState: function(state) {
							Janus.log("ICE state changed to " + state);
						},
						mediaState: function(medium, on) {
							Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
						},
						webrtcState: function(on) {
							Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
							$("#videolocal").parent().parent().unblock();
							if(!on)
								return;
							$('#publish').remove();
							// This controls allows us to override the global room bitrate cap
							$('#bitrate').parent().parent().removeClass('hide').show();
							$('#bitrate a').click(function() {
								var id = $(this).attr("id");
								var bitrate = parseInt(id)*1000;
								if(bitrate === 0) {
									Janus.log("Not limiting bandwidth via REMB");
								} else {
									Janus.log("Capping bandwidth to " + bitrate + " via REMB");
								}
								$('#bitrateset').html($(this).html() + '<span class="caret"></span>').parent().removeClass('open');
								sfutest.send({
									message: {
										request: "configure",
										secret: $('#videoRoomPass').val(),
										pin: $('#videoRoomPin').val(),
										bitrate: bitrate,
										success: function(result) {
											Janus.log("successfully configured");
										}
									}
								});
								return false;
							});
							const videoTracks = mystream.getVideoTracks();
							if(!videoTracks || videoTracks.length === 0) {
								Janus.listDevices(function (devices) {
									devices.some(function(device) {
										if (device.kind === 'videoinput') {
											var id = device.deviceId;
											if (mystream) {
												mystream.getTracks().forEach(track => {
													track.stop();
												});
											}
											const constraints = {
												audio: true,
												video: {deviceId: id ? {exact: id} : undefined}
											};
											navigator.mediaDevices.getUserMedia(constraints)
											.then(function(stream){
												Janus.attachMediaStream($('#myvideo').get(0), setStreamControlled(stream));
												const videoTracks = mystream.getVideoTracks();
												if (videoTracks && videoTracks.length > 0) {
													$('#videolocal .no-video-container').remove();
													$('#myvideo').removeClass('hide').show();
												}
											})
											.catch(function(error){
												Janus.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
											});
											return true;
										}
									});
								}, { audio: false, video: true });
							}
						},
						onmessage: function(msg, jsep) {
							Janus.debug(" ::: Got a message (publisher) :::", msg);
							var event = msg["videoroom"];
							Janus.debug("Event: " + event);
							if (event) {
								if (event === "joined") {
									// Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
									myid = msg["id"];
									mypvtid = msg["private_id"];
									Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
									publishOwnFeed(true);
									// Any new feed to attach to?
									if (msg["publishers"]) {
										var list = msg["publishers"];
										Janus.debug("Got a list of available publishers/feeds:", list);
										for (var f in list) {
											var id = list[f]["id"];
											var display = list[f]["display"];
											var audio = list[f]["audio_codec"];
											var video = list[f]["video_codec"];
											if (!/_share$/.test(display)) {
												Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
												newRemoteFeed(id, display, audio, video);
											} else /*if (role === "listener")*/ {
												Janus.debug("  >> [" + id + "] " + display);
												newRemoteShare(id, display);
											}
										}
									}
									$('#presenter').append('<li><a href="#" id="user_' + myid + '">' + $('#username').val() + '</a></li>');
									$('#presenter a').click(clickPresenter);
									registerTextName();
								} else if(event === "destroyed") {
									// The room has been destroyed
									Janus.warn("The room has been destroyed!");
									bootboxalert("ミーティングが強制終了されました", async function() {
										await JumpToIndex();
									});
								} else if(event === "event") {
									// Any new feed to attach to?
									if(msg["publishers"]) {
										var list = msg["publishers"];
										Janus.debug("Got a list of available publishers/feeds:", list);
										for(var f in list) {
											var id = list[f]["id"];
											var display = list[f]["display"];
											var audio = list[f]["audio_codec"];
											var video = list[f]["video_codec"];
											if(!/_share$/.test(display)) {
												Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
												newRemoteFeed(id, display, audio, video);
											} else if (role === "listener") {
												Janus.debug("  >> [" + id + "] " + display);
												newRemoteShare(id, display);
											}
										}
									} else if(msg["leaving"]) {
										// One of the publishers has gone away?
										var leaving = msg["leaving"];
										Janus.log("Publisher left: " + leaving);
										var rf = null;
										for(var i=1; i<100; i++) {
											if(feeds[i] && feeds[i].rfid == leaving) {
												rf = feeds[i];
												break;
											}
										}
										if (rf != null) {
											Janus.debug("Feed " + rf.rfid + " (" + rf.rfdisplay + ") has left the room, detaching");
											$('#remote'+rf.rfindex).empty().hide();
											$('#videoremote'+rf.rfindex).empty();
											feeds[rf.rfindex] = null;
											rf.detach();
										}
									} else if(msg["unpublished"]) {
										// One of the publishers has unpublished?
										var unpublished = msg["unpublished"];
										if (screenrecv && 'rfid' in screenrecv && screenrecv.rfid == unpublished) {
											cleanUpShare();
										} else {
											Janus.log("Publisher left: " + unpublished);
											if(unpublished === 'ok') {
												// That's us
												sfutest.hangup();
												return;
											}
											var rf = null;
											for(var i=1; i<100; i++) {
												if(feeds[i] && feeds[i].rfid == unpublished) {
													rf = feeds[i];
													break;
												}
											}
											if (rf != null) {
												Janus.debug("Feed " + rf.rfid + " (" + rf.rfdisplay + ") has left the room, detaching");
												$('#remote'+rf.rfindex).empty().hide();
												$('#videoremote'+rf.rfindex).empty();
												feeds[rf.rfindex] = null;
												rf.detach();
											}
										}
									} else if(msg["error"]) {
										if(msg["error_code"] === 426) {
											// This is a "no such room" error: give a more meaningful description
											bootboxalert(
												"<p>Apparently room <code>" + $('#myroom').val() + "</code> (the one this demo uses as a test room) " +
												"does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
												"configuration file? If not, make sure you copy the details of room <code>" + $('#myroom').val() + "</code> " +
												"from that sample in your current configuration file, then restart Janus and try again."
											);
										} else {
											bootboxalert(msg["error"]);
										}
									}
								}
							}
							if(jsep) {
								Janus.debug("Handling SDP as well...", jsep);
								sfutest.handleRemoteJsep({ jsep: jsep });
								// Check if any of the media we wanted to publish has
								// been rejected (e.g., wrong or unsupported codec)
								var audio = msg["audio_codec"];
								if(mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
									// Audio has been rejected
									toastr.warning("Our audio stream has been rejected, viewers won't hear us");
								}
								var video = msg["video_codec"];
								if(mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
									// Video has been rejected
									toastr.warning("Our video stream has been rejected, viewers won't see us");
									// Hide the webcam video
									$('#myvideo').hide();
									$('#videolocal').append(
										'<div class="no-video-container">' +
											'<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
											'<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
										'</div>');
								}
								setlocaldesc = true;
							}
						},
						onlocalstream: function(stream) {
							Janus.debug(" ::: Got a local stream :::", stream);

							//$('#videojoin').hide();
							$('#videos').removeClass('hide').show();
							if($('#myvideo').length === 0) {
								//$('#videolocal').append('<video class="rounded centered" id="myvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
								$('#videolocal').append('<video class="centered" id="myvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
								//$('#videolocal').append('<div class="meter-body relative"><meter id="instantlocal" max="1" value="0" style="width: 100%; position: absolute; bottom: 0px"></meter></div>');
								// Add a 'mute' button
								$('#videolocal').append('<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 5px;">音声オフ</button>');
								$('#mute').click(toggleMute);
								// Add an 'unpublish' button
								$('#videolocal').append('<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 5px;">映像オフ</button>');
								$('#unpublish').click(unpublishOwnFeed);
							}
							$('#publisher').removeClass('hide').html(decodeURI(myusername)).show();

							Janus.attachMediaStream($('#myvideo').get(0), setStreamControlled(stream)/*stream*/);

							$("#myvideo").get(0).muted = "muted";
							if(sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
									sfutest.webrtcStuff.pc.iceConnectionState !== "connected") {
								$("#videolocal").parent().parent().block({
									message: '<b>Publishing...</b>',
									css: {
										border: 'none',
										backgroundColor: 'transparent',
										color: 'white'
									}
								});
							}

							const videoTracks = mystream.getVideoTracks();
							if(!videoTracks || videoTracks.length === 0) {
								// No webcam
								$('#myvideo').hide();
								if($('#videolocal .no-video-container').length === 0) {
									$('#videolocal').append(
										'<div class="no-video-container">' +
											'<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
											'<span class="no-video-text">No webcam available</span>' +
										'</div>');
								}
							} else {
								$('#videolocal .no-video-container').remove();
								$('#myvideo').removeClass('hide').show();
							}

							var webrtcDevices = {};
							function addDevice(device) {
								if (device.kind === 'audioinput') {
									var id = device.deviceId;
									var label = device.label || 'microphone'; // label is available for https
									$('#mic-list').append('<li><a href="#" id="' + id + '">' + label + '</a></li>');
									webrtcDevices[id] = device;
								} else if (device.kind === 'videoinput') {
									var id = device.deviceId;
									var label = device.label || 'camera'; // label is available for https
									$('#camera-list').append('<li><a href="#" id="' + id + '">' + label + '</a></li>');
									webrtcDevices[id] = device;
							 	} else if (device.kind === 'audiooutput') {
									var id = device.deviceId;
									var label = device.label || 'speaker'; // label is available for https
									$('#speaker-list').append('<li><a href="#" id="' + id + '">' + label + '</a></li>');
									webrtcDevices[id] = device;
						  	} else {
						    	Janus.error('UNKNOWN Device kind:', device.kind);
								}
							}
							function gotDevices(devices) {
								$('#mic-list').empty();
								$('#camera-list').empty();
								$('#speaker-list').empty();
								devices.forEach(function(device) {
									addDevice(device);
								});
								$('#speaker-list a').click(function() {
									$('#myvideo').get(0).setSinkId(this.id)
									.then(() => {
										Janus.debug('Success, audio output device attached: ', this.id);
									})
									.catch(error => {
										let errorMessage = error;
										if (error.name === 'SecurityError') {
											errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
										}
										Janus.error(errorMessage);
									});
								});
								$('#camera-list a').click(function() {
									if (mystream) {
										mystream.getTracks().forEach(track => {
								    		track.stop();
								    	});
									}
									const constraints = {
								    	audio: true,
								    	video: {deviceId: this.id ? {exact: this.id} : undefined}
									};
									navigator.mediaDevices.getUserMedia(constraints)
									.then(function(stream){
										Janus.attachMediaStream($('#myvideo').get(0), setStreamControlled(stream));
										const videoTracks = mystream.getVideoTracks();
										if (videoTracks && videoTracks.length > 0) {
											$('#videolocal .no-video-container').remove();
											$('#myvideo').removeClass('hide').show();
										}
										// Refresh button list in case labels have become available
										return navigator.mediaDevices.enumerateDevices();
									})
									.then(async function(devices){
										await gotDevices(devices);
									})
									.catch(function(error){
										Janus.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
									});
								});
								$('#mic-list a').click(function() {
									if (mystream) {
								    	mystream.getTracks().forEach(track => {
								    		track.stop();
								    	});
									}
									const constraints = {
								    	audio: {deviceId: this.id ? {exact: this.id} : undefined},
								    	video: true
									};
									navigator.mediaDevices.getUserMedia(constraints)
									.then(function(stream){
										Janus.attachMediaStream($('#myvideo').get(0), setStreamControlled(stream)/*stream*/);
									  // Refresh button list in case labels have become available
									  return navigator.mediaDevices.enumerateDevices();
									})
									.then(async function(devices){
										await gotDevices(devices);
									})
									.catch(function(error){
										Janus.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
									});
								});
							}
							Janus.listDevices(gotDevices, { audio: true, video: true });
						},
						onremotestream: function(stream) {
							// The publisher stream is sendonly, we don't expect anything here
						},
						oncleanup: function() {
							Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
							mystream = null;
							$('#videolocal').html('<button id="publish" class="btn btn-primary">Publish</button>');
							//$('#publish').click(function() { publishOwnFeed(true); });
							$("#videolocal").parent().parent().unblock();
							$('#bitrate').parent().parent().addClass('hide');
							$('#bitrate a').unbind('click');
						}
					});

					attachShareHandle();
					attachTextHandle();
				},
				error: function(error) {
					Janus.error(error);
					bootboxalert(error, async function() {
						//await JumpToIndex();
					});
				},
				destroyed: async function() {
					if (stopClicked)
						await JumpToIndex();
				}
			});
		});
		$('#start').trigger("click");
	}});
});

function preShareScreen() {
	if(!Janus.isExtensionEnabled()) {
		bootboxalert("You're using Chrome but don't have the screensharing extension installed: click <b><a href='https://chrome.google.com/webstore/detail/janus-webrtc-screensharin/hapfgfdkleiggjjpfpenajgdnfckjpaj' target='_blank'>here</a></b> to do so", async function() {
			//await JumpToIndex();
		});
		return;
	}
	capture = "window";
	shareScreen();
}

function shareScreen() {
	role = "publisher";
	if (publishshare) {
		screentest.createOffer({
			media: { video: capture, audioSend: false, videoRecv: false },	// Screen sharing Publishers are sendonly
			success: function(jsep) {
				Janus.debug("Got publisher SDP!", jsep);
				$('#startshare').addClass('hide').hide();
				//$('#trans-test').addClass('hide').hide();
				//$('#closeshare').removeClass('hide').show();
				$('#closesharelocal').click(function() {
					resetMainWinLocal();
				});
				var publish = { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), audio: true, video: true };
				screentest.send({ message: publish, jsep: jsep});
			},
			error: function(error) {
				Janus.error("WebRTC error:", error);
				//bootbox.alert("WebRTC error... " + error.message);
				if (jscd.browser == 'Firefox') {
					bootboxalert("画面共有が許可されていない可能性があります。<br>画面をリロードしてみてください。");
				}
				resetMainWinLocal();
			}
		});
	} else {
		// Create a new room
		var username = myusername + '_share';
		var register = {
			request: "join",
			room: parseInt($('#myroom').val(), 10),
			pin: $('#videoRoomPin').val(),
			ptype: "publisher",
			display: username
		};
		screentest.send({ message: register});
	}
}

function resetMainWin() {
	var unpublish = { request: "unpublish", pin: $('#videoRoomPin').val() };
	screentest.send({ message: unpublish, success: function() {
		$('#screencapture').empty();
		$("#screencapture").parent().unblock();
		if (shareallowed == myid || shareallowed == 0) {
			if (!jscd.mobile)
				$('#startshare').removeClass('hide').show();
		}
		$('#trans-test').addClass('hide').hide();
		$('#room').hide();
		resetTransform();
		role = "listener";
	}});
}

function resetMainWinLocal() {
	var unpublish = { request: "unpublish", pin: $('#videoRoomPin').val() };
	screentest.send({ message: unpublish, success: function() {
		$('#videolocalshare').empty();
		$("#videolocalshare").parent().unblock();
		if (shareallowed == myid || shareallowed == 0) {
			if (!jscd.mobile)
				$('#startshare').removeClass('hide').show();
		}
		//$('#trans-test').addClass('hide').hide();
		//$('#room').hide();
		$('#localshareframe').addClass('hide').hide();
		//resetTransform();
		role = "listener";
	}});
}

function cleanUpShare(restart) {
	if (screenrecv) {
		var unpublish = { request: "leave"/*"stop"*/, pin: $('#videoRoomPin').val() };
		screenrecv.send({ message: unpublish, success: function() {
			$('#screencapture').empty();
			$("#screencapture").parent().unblock();
			if (shareallowed == myid || shareallowed == 0) {
				if (!jscd.mobile)
					$('#startshare').removeClass('hide').show();
			}
			$('#trans-test').addClass('hide').hide();
			$('#room').hide();
			resetTransform();
			screenrecv = null;
			source = null;
		}});
	}
}

function cleanUpShareLocal(restart) {
	if (screenrecv) {
		var unpublish = { request: "leave"/*"stop"*/, pin: $('#videoRoomPin').val() };
		screenrecv.send({ message: unpublish, success: function() {
			$('#videolocalshare').empty();
			$("#videolocalshare").parent().unblock();
			if (shareallowed == myid || shareallowed == 0) {
				if (!jscd.mobile)
					$('#startshare').removeClass('hide').show();
			}
			//$('#trans-test').addClass('hide').hide();
			//$('#room').hide();
			$('#localshareframe').addClass('hide').hide();
			//resetTransform();
			screenrecv = null;
			source = null;
		}});
	}
}

function attachShareHandle() {
	janus.attach({
		plugin: "janus.plugin.videoroom",
		opaqueId: sharingId,
		success: function(pluginHandle) {
			screentest = pluginHandle;
			Janus.log("Plugin attached! (" + screentest.getPlugin() + ", id=" + screentest.getId() + ")");
		},
		error: function(error) {
			Janus.error("  -- Error attaching plugin...", error);
			bootboxalert("Error attaching plugin... " + error);
		},
		consentDialog: function(on) {
			Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
			/*
			if(on) {
				// Darken screen
				$.blockUI({
					message: '',
					css: {
						border: 'none',
						padding: '15px',
						backgroundColor: 'transparent',
						color: '#aaa'
					}
				});
			} else {
				// Restore screen
				$.unblockUI();
			}
			*/
		},
		iceState: function(state) {
			Janus.log("ICE state changed to " + state);
		},
		mediaState: function(medium, on) {
			Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
			if (!on) {
				resetMainWinLocal();
			}
		},
		webrtcState: function(on) {
			Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
			//$("#screencapture").parent().unblock();
			$("#videolocalshare").parent().unblock();
			if (on) {
				//$('#trans-test').removeClass('hide').show();
				//transformRight();
			}
		},
		onmessage: function(msg, jsep) {
			Janus.debug(" ::: Got a message (publisher) :::", msg);
			var event = msg["videoroom"];
			Janus.debug("Event: " + event);
			if(event) {
				if(event === "joined") {
					//myid = msg["id"];
					//$('#session').html(myroom);
					//$('#title').html(msg["description"]);
					$('#title').html("共有中");
					Janus.log("Successfully joined room " + msg["room"] + " with ID " + msg["id"]);
					if (role === "publisher") {
						// This is our session, publish our stream
						shareid = msg["id"];
						Janus.debug("Negotiating WebRTC stream for our screen (capture " + capture + ")");
						screentest.createOffer({
							media: { video: capture, audioSend: false, videoRecv: false },	// Screen sharing Publishers are sendonly
							success: function(jsep) {
								Janus.debug("Got publisher SDP!", jsep);
								$('#startshare').addClass('hide').hide();
								//$('#closeshare').removeClass('hide').show();
								$('#closesharelocal').click(function() {
									resetMainWinLocal();
								});
								var publish = { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), audio: true, video: true };
								screentest.send({ message: publish, jsep: jsep, success: function() {
								}});
							},
							error: function(error) {
								Janus.error("WebRTC error:", error);
								if (jscd.browser == 'Firefox') {
									bootboxalert("画面共有が許可されていない可能性があります。<br>画面をリロードしてみてください。");
								}
								/*
								bootbox.alert("WebRTC error... " + error.message);
								resetMainWin();
								*/
							}
						});
						publishshare = true;
					} else if(msg["publishers"]) {
						// We're just watching a session, any feed to attach to?
						var list = msg["publishers"];
						Janus.debug("Got a list of available publishers/feeds:", list);
						for(var f in list) {
							var id = list[f]["id"];
							var display = list[f]["display"];
							Janus.debug("  >> [" + id + "] " + display);
							if (/_share$/.test(display)) {
								newRemoteShare(id, display);
							}
						}
					}
				} else if(event === "event") {
					// Any feed to attach to?
					if(role === "listener" && msg["publishers"]) {
						var list = msg["publishers"];
						Janus.debug("Got a list of available publishers/feeds:", list);
						for(var f in list) {
							var id = list[f]["id"];
							var display = list[f]["display"];
							Janus.debug("  >> [" + id + "] " + display);
							if (/_share$/.test(display)) {
								newRemoteShare(id, display)
							}
						}
					} else if(msg["leaving"]) {
						// One of the publishers has gone away?
						var leaving = msg["leaving"];
						Janus.log("Publisher left: " + leaving);
						if(role === "listener" && msg["leaving"] === source) {
							cleanUpShareLocal();
							bootboxalert("The screen sharing session is over, the publisher left");
						}
					} else if (msg["error"]) {
						if (role === "listener" && msg['error_code'] != 435) {
							cleanUpShareLocal();
							bootboxalert(msg["error"]);
						}
					}
				}
			}
			if(jsep) {
				Janus.debug("Handling SDP as well...", jsep);
				screentest.handleRemoteJsep({ jsep: jsep });
			}
		},
		onlocalstream: function(stream) {
			Janus.debug(" ::: Got a local stream :::", stream);
			//$('#room').removeClass('hide').show();
			$('#localshareframe').removeClass('hide').show();
			if($('#screenvideo').length === 0) {
				//$('#screencapture').append('<video class="rounded centered" id="screenvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
				//$('#screencapture').append('<video class="centered" id="screenvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
				$('#videolocalshare').append('<video class="centered" id="screenvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
			}
			Janus.attachMediaStream($('#screenvideo').get(0), stream);
			if(screentest.webrtcStuff.pc.iceConnectionState !== "completed" &&
					screentest.webrtcStuff.pc.iceConnectionState !== "connected") {
				//$("#screencapture").parent().block({
				$("#videolocalshare").parent().block({
					message: '<b>Publishing...</b>',
					css: {
						border: 'none',
						backgroundColor: 'transparent',
						color: 'white'
					}
				});
			}
		},
		onremotestream: function(stream) {
			// The publisher stream is sendonly, we don't expect anything here
		},
		oncleanup: function() {
			Janus.log(" ::: Got a cleanup notification :::");
			if(role === "listener")
				cleanUpShareLocal();
		}
	});
}

function attachTextHandle() {
	// Attach to TextRoom plugin
	janus.attach({
		plugin: "janus.plugin.textroom",
		opaqueId: textchatId,
		success: function(pluginHandle) {
			textroom = pluginHandle;
			Janus.log("Plugin attached! (" + textroom.getPlugin() + ", id=" + textroom.getId() + ")");
			// Setup the DataChannel
			var body = { request: "setup", pin: $('#videoRoomPin').val() };
			Janus.debug("Sending message:", body);
			textroom.send({ message: body });
		},
		error: function(error) {
			Janus.error("  -- Error attaching plugin...", error);
			bootboxalert("Error attaching plugin... " + error);
		},
		iceState: function(state) {
			Janus.log("ICE state changed to " + state);
		},
		mediaState: function(medium, on) {
			Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
		},
		webrtcState: function(on) {
			Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
		},
		onmessage: function(msg, jsep) {
			Janus.debug(" ::: Got a message :::", msg);
			if(msg["error"]) {
				bootboxalert(msg["error"]);
			}
			if(jsep) {
				// Answer
				textroom.createAnswer({
					jsep: jsep,
					media: { audio: false, video: false, data: true },	// We only use datachannels
					success: function(jsep) {
						Janus.debug("Got SDP!", jsep);
						var body = { request: "ack", pin: $('#videoRoomPin').val() };
						textroom.send({ message: body, jsep: jsep });

						var participants = {
							"request" : "listparticipants",
							"pin": $('#videoRoomPin').val(),
							"room" : parseInt($('#myroom').val(), 10)
						}
						sfutest.send({
							message: participants,
							success: function(result) {
								Janus.log("successfully listed");
								for (var idx in result.participants) {
									var user = result.participants[idx];
									if (user.publisher) {
										//sharefeed = parseInt(user.id);
										var message = {
											textroom: "announcement",
											transaction: Janus.randomString(12),
											room: parseInt($('#myroom').val(), 10),
											secret: $('#videoRoomPass').val(),
											text: '%room_command%areyouahost='+user.id
										};
										textroom.data({
											text: JSON.stringify(message),
											error: function(reason) {
												bootboxalert(reason);
											},
											success: function() {
												Janus.log("successfully anounced");
											}
										});
									}
								}
							}
						});
					},
					error: function(error) {
						Janus.error("WebRTC error:", error);
						bootboxalert("WebRTC error... " + error.message);
					}
				});
			}
		},
		ondataopen: function(data) {
			Janus.log("The DataChannel is available!");
			// Prompt for a display name to join the default room
			/*
			$('#roomjoin').removeClass('hide').show();
			$('#registernow').removeClass('hide').show();
			$('#register').click(registerUsername);
			$('#username').focus();
			*/
		},
		ondata: function(data) {
			Janus.debug("We got data from the DataChannel!", data);
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
				//if ($('#chatdiv').hasClass('hide')) {
				//	$('#chatdiv').removeClass('hide').show();
				//	$('#togglechat').html('チャット隠す');
				//}
				if (!$('#textroom').dialog('isOpen')) {
					$('#textroom').dialog('open');
					$('#togglechat').html('チャット隠す');
				}
				var msg = json["text"];
				msg = msg.replace(new RegExp('<', 'g'), '&lt');
				msg = msg.replace(new RegExp('>', 'g'), '&gt');
				msg = msg.replace(new RegExp('\r', 'g'), '');
				msg = msg.replace(new RegExp('\n', 'g'), '<br>');
				var from = json["from"];
				var dateString = getDateString(json["date"]);
				var whisper = json["whisper"];
				if (whisper === true) {
					// Private message
					$('#chatroom').append('<p class="fas" style="color: purple; display: block">[' + dateString + '] <b>[' + participants[from] + 'さんからプライベート]</b> ' + msg + '<a href="javascript:;" id="lp' + from + '">[返信]</a></p>');
					$('#lp' + from).click(function() {
						var username = $(this).attr('id').split("lp")[1];
						sendPrivateMsg(username);
					});
					$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
				} else {
					// Public message
					$('#chatroom').append('<p class="fas" style="display: block">[' + dateString + '] <b>' + participants[from] + ':</b> ' + msg + '</p>');
					$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
				}
			} else if (what === "announcement") {
				// Room announcement
				var msg = json["text"];
				var myArray = /^%room_command%(.*)/.exec(msg);
				if (Array.isArray(myArray)) {
					var cmds = myArray[1].split('=');
					if (cmds.length > 1 && cmds[0] === 'presenter') {
						if (parseInt(cmds[1], 10) == 0) {
							shareallowed = null;
							if ($('#startshare').hasClass('hide')) {
								if (!jscd.mobile)
									$('#startshare').removeClass('hide').show();
							}
						} else if (parseInt(cmds[1], 10) == myid) {
							shareallowed = myid;
							if ($('#startshare').hasClass('hide')) {
								if (!jscd.mobile)
									$('#startshare').removeClass('hide').show();
							}
						} else {
							shareallowed = parseInt(cmds[1], 10);
							if (!$('#startshare').hasClass('hide')) {
								$('#startshare').addClass('hide').hide();
							}
						}
					} else if (cmds.length > 1 && cmds[0] === 'waiting') {
						if ($('#allowjoin').hasClass('hide')) {
							$('#allowjoin').removeClass('hide').show();
						}
						$('#waitallow').append('<li><a id ="allow_'+cmds[1]+'">'+participants[cmds[1]]+'</a></li>');
						$('#waitallow a').click(clickAllowJoin);
					} else if (cmds.length > 1 && cmds[0] === 'finish_waiting') {
						$('#allow_'+cmds[1]).parent().remove();
						if ($('#waitallow li').length == 0) {
							$('#allowjoin').addClass('hide').hide();
						}
					} else if (cmds.length > 1 && cmds[0] === 'endofthisroom') {
						if ($('#is_host').val() !== 'true') {
							finish_asked = $('#is_private').val()==='true';
							$(this).attr('disabled', true);
							stopClicked = true;
							sfutest.send({ message: { request: 'leave', pin: $('#videoRoomPin').val() }, success: async function() {
								destroyJanus();
								await JumpToIndex();
							}});
						}
					} else if (cmds.length > 1 && cmds[0] === 'areyouahost') {
						const uid = parseInt(cmds[1], 10);
						if ($('#is_host').val() === 'true' && myid === uid) {
							var message = {
								textroom: "announcement",
								transaction: Janus.randomString(12),
								room: parseInt($('#myroom').val(), 10),
								secret: $('#videoRoomPass').val(),
								text: '%room_command%hostjoined='+uid
							};
							textroom.data({
								text: JSON.stringify(message),
								error: function(reason) {
									bootboxalert(reason);
								},
								success: function() {
								}
							});
						}
					} else if (cmds.length > 1 && cmds[0] === 'hostjoined') {
						hostid = parseInt(cmds[1], 10);
					}
				} else {
					//if ($('#chatdiv').hasClass('hide')) {
					//	$('#chatdiv').removeClass('hide').show();
					//	$('#togglechat').html('チャット隠す');
					//}
					if (!$('#textroom').dialog('isOpen')) {
						$('#textroom').dialog('open');
						$('#togglechat').html('チャット隠す');
					}
					msg = msg.replace(new RegExp('<', 'g'), '&lt');
					msg = msg.replace(new RegExp('>', 'g'), '&gt');
					var dateString = getDateString(json["date"]);
					$('#chatroom').append('<p class="fas" style="color: purple;">[' + dateString + '] <i>' + msg + '</i>');
					$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
				}
			} else if(what === "join") {
				// Somebody joined
				var username = json["username"];
				var display = json["display"];
				participants[username] = display ? display : username;
				if(parseInt(username, 10) !== myid && $('#rp' + username).length === 0) {
					// Add to the participants list
					$('#list').append('<li id="rp' + username + '" class="list-group-item">' + participants[username] + '</li>');
					$('#rp' + username).css('cursor', 'pointer').click(function() {
						var username = $(this).attr('id').split("rp")[1];
						sendPrivateMsg(username);
					});
				}
				$('#chatroom').append('<p style="color: green;">[' + getDateString() + '] <i>' + participants[username] + 'さんが参加しました</i></p>');
				$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
			} else if(what === "leave") {
				// Somebody left
				var username = json["username"];
				var when = new Date();
				$('#rp' + username).remove();
				$('#chatroom').append('<p style="color: green;">[' + getDateString() + '] <i>' + participants[username] + 'さんが退室しました</i></p>');
				$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
				delete participants[username];
			} else if(what === "kicked") {
				// Somebody was kicked
				var username = json["username"];
				var when = new Date();
				$('#rp' + username).remove();
				$('#chatroom').append('<p style="color: green;">[' + getDateString() + '] <i>' + participants[username] + 'さんが追い出されました</i></p>');
				$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
				delete participants[username];
				if(username === myid) {
					bootboxalert("You have been kicked from the room", function() {
						//window.location.reload();
					});
				}
			} else if(what === "destroyed") {
				if(json["room"] !== parseInt($('#myroom').val(), 10))
					return;
				// Room was destroyed, goodbye!
				Janus.warn("The room has been destroyed!");
				bootboxalert("このチャットルームは閉じられました", function() {
					//window.location.reload();
				});
			}
		},
		oncleanup: function() {
			Janus.log(" ::: Got a cleanup notification :::");
			$('#datasend').attr('disabled', true);
		}
	});
}

function realRegisterUsername() {
	// Try a registration
	$('#username').attr('disabled', true);
	$('#register').attr('disabled', true).unbind('click');
	var username = encodeURI($('#username').val());
	if(username === "") {
		$('#you')
			.removeClass().addClass('label label-warning')
			.html("Insert your display name (e.g., pippo)");
		$('#username').removeAttr('disabled');
		$('#register').removeAttr('disabled').click(registerUsername);
		return;
	}
	if(/[^\%a-zA-Z0-9]/.test(username)) {
		$('#you')
			.removeClass().addClass('label label-warning')
			.html('Input is not alphanumeric');
		$('#username').removeAttr('disabled').val("");
		$('#register').removeAttr('disabled').click(registerUsername);
		return;
	}

	var register = {
		request: "join",
		room: parseInt($('#myroom').val(), 10),
		pin: $('#videoRoomPin').val(),
		ptype: "publisher",
		display: username
	};
	myusername = username;
	sfutest.send({
		message: register,
		success: function(result) {
			Janus.log("joined successfully");
		},
		error: function(error) {
			destroyJanus();
			bootboxalert(error);
		}
	});
}

function registerUsername() {
	if($('#username').length === 0) {
		// Create fields to register
		$('#register').click(registerUsername);
		$('#username').focus();
	} else {
		var isexists = {
			"request" : "exists",
			//"pin": $('#videoRoomPin').val(),
			"room" : parseInt($('#myroom').val(), 10)
		};
		sfutest.send({
			message: isexists,
			success: function(result) {
				if ('exists' in result && result.exists) {
					realRegisterUsername();
				} else {
					var subscribe = {
						request: "create",
						room: parseInt($('#myroom').val(), 10),
						secret: $('#videoRoomPass').val(),
						pin: $('#videoRoomPin').val(),
						permanent: false,
						is_private_id: true,
						record: $('#record_meeting').val==='true',
						rec_dir: '/home/janus/share/video',
						publishers: 200
					};
					// In case you don't want to receive audio, video or data, even if the
					// publisher is sending them, set the 'offer_audio', 'offer_video' or
					// 'offer_data' properties to false (they're true by default), e.g.:
					// 		subscribe["offer_video"] = false;
					// For example, if the publisher is VP8 and this is Safari, let's avoid video
					sfutest.send({
						message: subscribe,
						success: function(result) {
							if ('error_code' in result && result.error_code) {
								Janus.error("  -- Error attaching plugin...", result.error);
							} else {
								realRegisterUsername();
							}
						}
					});
				}
			},
		});
	}
}

function publishOwnFeed(useAudio) {
	var dt = new Date();
	var YYYY = dt.getFullYear();
	var MM = dt.getMonth()+1;
	var DD = dt.getDate();
	const useVideo = $('#is_host').val()==='true'?($('#video_host').val()==='true'):($('#video_part').val()==='true');
	$('#publish').attr('disabled', true).unbind('click');
	sfutest.createOffer({
		// Add data:true here if you want to publish datachannels as well
		media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: useVideo },	// Publishers are sendonly
		// If you want to test simulcasting (Chrome and Firefox only), then
		// pass a ?simulcast=true when opening this demo page: it will turn
		// the following 'simulcast' property to pass to janus.js to true
		simulcast: doSimulcast,
		simulcast2: doSimulcast2,
		success: function(jsep) {
			Janus.debug("Got publisher SDP!", jsep);
			var publish = {
				request: "configure",
				pin: $('#videoRoomPin').val(),
				secret: $('#videoRoomPass').val(),
				audio: useAudio,
				video: true,
				bitrate: 1024,
				record: $('#record_meeting').val()==='true',
				filename: $('#myroom').val()+'_'+$('#userid').val()+'_'+YYYY+MM+DD
			};
			// You can force a specific codec to use when publishing by using the
			// audiocodec and videocodec properties, for instance:
			// 		publish["audiocodec"] = "opus"
			// to force Opus as the audio codec to use, or:
			// 		publish["videocodec"] = "vp9"
			// to force VP9 as the videocodec to use. In both case, though, forcing
			// a codec will only work if: (1) the codec is actually in the SDP (and
			// so the browser supports it), and (2) the codec is in the list of
			// allowed codecs in a room. With respect to the point (2) above,
			// refer to the text in janus.plugin.videoroom.jcfg for more details
			sfutest.send({ message: publish, pin: $('#videoRoomPin').val(), jsep: jsep, success: function(result){
				Janus.log("successfully configured");
			} });
		},
		error: function(error) {
			Janus.error("WebRTC error:", error);
			if(useAudio) {
				 publishOwnFeed(false);
			} else {
				bootboxalert("WebRTC error... " + error.message);
				$('#publish').removeAttr('disabled').click(function() { publishOwnFeed(true); });
			}
		}
	});
}

function toggleMute() {
	var muted = sfutest.isAudioMuted();
	Janus.log((muted ? "Unmuting" : "Muting") + " local audio...");
	if(muted)
		sfutest.unmuteAudio();
	else
		sfutest.muteAudio();
	muted = sfutest.isAudioMuted();
	$('#mute').html(muted ? "音声オン" : "音声オフ");
}

function unpublishOwnFeed() {
	var muted = sfutest.isVideoMuted();
	Janus.log((muted ? "Unmuting" : "Muting") + " local video...");
	if(muted)
		sfutest.unmuteVideo();
	else
		sfutest.muteVideo();
	muted = sfutest.isVideoMuted();
	$('#unpublish').html(muted ? "映像オン" : "映像オフ");
}

function newRemoteFeed(id, display, audio, video) {
	// A new feed has been published, create a new plugin handle and attach to it as a subscriber
	var remoteFeed = null;
	var videoPlaing = false;
	janus.attach({
		plugin: "janus.plugin.videoroom",
		opaqueId: opaqueId,
		success: function(pluginHandle) {
			remoteFeed = pluginHandle;
			remoteFeed.simulcastStarted = false;
			Janus.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
			Janus.log("  -- This is a subscriber");
			// We wait for the plugin to send us an offer
			var subscribe = {
				request: "join",
				room: parseInt($('#myroom').val(), 10),
				pin: $('#videoRoomPin').val(),
				ptype: "subscriber",
				feed: id,
				private_id: mypvtid
			};
			// In case you don't want to receive audio, video or data, even if the
			// publisher is sending them, set the 'offer_audio', 'offer_video' or
			// 'offer_data' properties to false (they're true by default), e.g.:
			// 		subscribe["offer_video"] = false;
			// For example, if the publisher is VP8 and this is Safari, let's avoid video
			if(Janus.webRTCAdapter.browserDetails.browser === "safari" &&
					(video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
				if(video)
					video = video.toUpperCase()
				toastr.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
				subscribe["offer_video"] = false;
			}
			remoteFeed.videoCodec = video;
			remoteFeed.send({ message: subscribe });
		},
		error: function(error) {
			Janus.error("  -- Error attaching plugin...", error);
			bootboxalert("Error attaching plugin... " + error);
		},
		onmessage: function(msg, jsep) {
			Janus.debug(" ::: Got a message (subscriber) :::", msg);
			var event = msg["videoroom"];
			Janus.debug("Event: " + event);
			if(msg["error"]) {
				bootboxalert(msg["error"]);
			} else if(event) {
				if(event === "attached") {
					// Subscriber created and attached
					for(var i=1; i<100; i++) {
						if(!feeds[i]) {
							feeds[i] = remoteFeed;
							remoteFeed.rfindex = i;
							break;
						}
					}
					remoteFeed.rfid = msg["id"];
					remoteFeed.rfdisplay = msg["display"];
					if(!remoteFeed.spinner) {
						var target = document.getElementById('videoremote'+remoteFeed.rfindex);
						remoteFeed.spinner = new Spinner({top:100}).spin(target);
					} else {
						remoteFeed.spinner.spin();
					}
					Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
					$('#remote'+remoteFeed.rfindex).removeClass('hide').html(decodeURI(remoteFeed.rfdisplay)).show();

					if ($('#is_host').val() !== 'true' && !hostid) {
						var message = {
							textroom: "announcement",
							transaction: Janus.randomString(12),
							room: parseInt($('#myroom').val(), 10),
							secret: $('#videoRoomPass').val(),
							text: '%room_command%areyouahost='+msg["id"]
						};
						textroom.data({
							text: JSON.stringify(message),
							error: function(reason) {
								bootboxalert(reason);
							},
							success: function() {
							}
						});
					}
				} else if(event === "event") {
					// Check if we got an event on a simulcast-related event from this publisher
					var substream = msg["substream"];
					var temporal = msg["temporal"];
					if((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
						if(!remoteFeed.simulcastStarted) {
							remoteFeed.simulcastStarted = true;
							// Add some new buttons
							addSimulcastButtons(remoteFeed.rfindex, remoteFeed.videoCodec === "vp8" || remoteFeed.videoCodec === "h264");
						}
						// We just received notice that there's been a switch, update the buttons
						updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
					}
				} else {
					// What has just happened?
				}
			}
			if(jsep) {
				Janus.debug("Handling SDP as well...", jsep);
				// Answer and attach
				remoteFeed.createAnswer({
					jsep: jsep,
					// Add data:true here if you want to subscribe to datachannels as well
					// (obviously only works if the publisher offered them in the first place)
					media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
					success: function(jsep) {
						Janus.debug("Got SDP!", jsep);
						var body = { request: "start", room: parseInt($('#myroom').val(), 10), pin: $('#videoRoomPin').val() };
						remoteFeed.send({ message: body, jsep: jsep });
					},
					error: function(error) {
						Janus.error("WebRTC error:", error);
						bootboxalert("WebRTC error... " + error.message);
					}
				});
			}
		},
		iceState: function(state) {
			Janus.log("ICE state of this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") changed to " + state);
		},
		webrtcState: function(on) {
			Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
		},
		onlocalstream: function(stream) {
			// The subscriber stream is recvonly, we don't expect anything here
		},
		onremotestream: function(stream) {
			Janus.debug("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
			var addButtons = false;
			if($('#remotevideo'+remoteFeed.rfindex).length === 0) {
				addButtons = true;
				$('#remoteframe'+remoteFeed.rfindex).removeClass('hide');
				// No remote video yet
				//$('#videoremote'+remoteFeed.rfindex).append('<video class="rounded centered" id="waitingvideo' + remoteFeed.rfindex + '" width=320 height=240 />');
				$('#videoremote'+remoteFeed.rfindex).append('<video class="centered" id="waitingvideo' + remoteFeed.rfindex + '" width=320 height=240 />');
				//$('#videoremote'+remoteFeed.rfindex).append('<video class="rounded centered relative hide" id="remotevideo' + remoteFeed.rfindex + '" width="100%" height="100%" autoplay playsinline/>');
				$('#videoremote'+remoteFeed.rfindex).append('<video class="centered relative hide" id="remotevideo' + remoteFeed.rfindex + '" width="100%" height="100%" autoplay playsinline/>');
				$('#videoremote'+remoteFeed.rfindex).append('<div class="meter-body relative"><meter id="instant'+remoteFeed.rfindex+'" max="1" value="0" style="width: 100%; position: absolute; bottom: 0px"></meter></div>');
				$('#videoremote'+remoteFeed.rfindex).append(
					'<span class="label label-primary hide" id="curres'+remoteFeed.rfindex+'" style="position: absolute; bottom: 0px; left: 0px; margin: 5px;"></span>' +
					'<span class="label label-info hide" id="curbitrate'+remoteFeed.rfindex+'" style="position: absolute; bottom: 0px; right: 0px; margin: 5px;"></span>');
				$('.info-icon').css('cursor','pointer');
				// Show the video, hide the spinner and show the resolution when we get a playing event
				$("#remotevideo"+remoteFeed.rfindex).bind("playing", function () {
					videoPlaing = true;
					if(remoteFeed.spinner)
						remoteFeed.spinner.stop();
					remoteFeed.spinner = null;
					$('#waitingvideo'+remoteFeed.rfindex).remove();
					if(this.videoWidth)
						$('#remotevideo'+remoteFeed.rfindex).removeClass('hide').show();
					var width = this.videoWidth;
					var height = this.videoHeight;
					if(Janus.webRTCAdapter.browserDetails.browser === "firefox") {
						// Firefox Stable has a bug: width and height are not immediately available after a playing
						setTimeout(function() {
							var width = $("#remotevideo"+remoteFeed.rfindex).get(0).videoWidth;
							var height = $("#remotevideo"+remoteFeed.rfindex).get(0).videoHeight;
							$('#curres'+remoteFeed.rfindex)/*.removeClass('hide')*/.text(width+'x'+height)/*.show()*/;
						}, 2000);
					}

					var context;
					try {
				    window.AudioContext = window.AudioContext || window.webkitAudioContext;
				    context = new AudioContext();
				  } catch (e) {
				    alert('Web Audio API not supported.');
						return;
				  }
					var microphone = context.createMediaStreamSource(stream);
					var javascriptNode = context.createScriptProcessor(2048, 1, 1);

					microphone.connect(javascriptNode);
					//analyser.connect(javascriptNode);
					javascriptNode.connect(context.destination);

					//audioContexts[remoteFeed.rfindex] = context; // NEW!!
					scriptProcessors[remoteFeed.rfindex] = javascriptNode;

					scriptProcessors[remoteFeed.rfindex].onaudioprocess = function(event) {
						const input = event.inputBuffer.getChannelData(0);
						let i;
						let sum = 0.0;
						for (i = 0; i < input.length; ++i) {
							sum += input[i] * input[i];
						}
						$('#instant'+remoteFeed.rfindex).val(Math.sqrt(sum / input.length));
					}
				});
				function checkVideoPlaing() {
					if (!videoPlaing) {
						Janus.attachMediaStream($('#remotevideo'+remoteFeed.rfindex).get(0), stream);
						setTimeout(checkVideoPlaing, 3000);
					}
				}
				setTimeout(checkVideoPlaing, 5000);
			}
			Janus.attachMediaStream($('#remotevideo'+remoteFeed.rfindex).get(0), stream);
			const videoTracks = stream.getVideoTracks();
			if(!videoTracks || videoTracks.length === 0) {
				// No remote video
				$('#remotevideo'+remoteFeed.rfindex).hide();
				if($('#videoremote'+remoteFeed.rfindex + ' .no-video-container').length === 0) {
					$('#videoremote'+remoteFeed.rfindex).append(
						'<div class="no-video-container">' +
							'<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
							'<span class="no-video-text">No remote video available</span>' +
						'</div>');
				}
			} else {
				$('#videoremote'+remoteFeed.rfindex+ ' .no-video-container').remove();
				$('#remotevideo'+remoteFeed.rfindex).removeClass('hide').show();
			}
			if(!addButtons)
				return;
			if(Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
					Janus.webRTCAdapter.browserDetails.browser === "safari") {
				//$('#curbitrate'+remoteFeed.rfindex).removeClass('hide').show();
				bitrateTimer[remoteFeed.rfindex] = setInterval(function() {
					// Display updated bitrate, if supported
					var bitrate = remoteFeed.getBitrate();
					$('#curbitrate'+remoteFeed.rfindex).text(bitrate);
					// Check if the resolution changed too
					var width = $("#remotevideo"+remoteFeed.rfindex).get(0).videoWidth;
					var height = $("#remotevideo"+remoteFeed.rfindex).get(0).videoHeight;
					if(width > 0 && height > 0)
						$('#curres'+remoteFeed.rfindex)/*.removeClass('hide')*/.text(width+'x'+height)/*.show()*/;
				}, 1000);
			}
			$('#presenter').append('<li><a href="#" id="user_' + remoteFeed.rfid + '">' + decodeURI(remoteFeed.rfdisplay) + '</a></li>');
			$('#presenter a').click(clickPresenter);
		},
		oncleanup: async function() {
			Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
			if(remoteFeed.spinner)
				remoteFeed.spinner.stop();
			remoteFeed.spinner = null;
			$('#remotevideo'+remoteFeed.rfindex).remove();
			$('#waitingvideo'+remoteFeed.rfindex).remove();
			$('#novideo'+remoteFeed.rfindex).remove();
			$('#curbitrate'+remoteFeed.rfindex).remove();
			$('#curres'+remoteFeed.rfindex).remove();
			if(bitrateTimer[remoteFeed.rfindex])
				clearInterval(bitrateTimer[remoteFeed.rfindex]);
			bitrateTimer[remoteFeed.rfindex] = null;
			remoteFeed.simulcastStarted = false;
			$('#simulcast'+remoteFeed.rfindex).remove();
			$('#remoteframe'+remoteFeed.rfindex).addClass('hide');
			$('#presenter #user_'+id).remove();
		}
	});
}

function newRemoteShare(id, display) {
	// A new feed has been published, create a new plugin handle and attach to it as a listener
	if (source)
		return;
	source = id;
	janus.attach({
		plugin: "janus.plugin.videoroom",
		opaqueId: sharingId,
		success: function(pluginHandle) {
			screenrecv = pluginHandle;
			Janus.log("Plugin attached! (" + screenrecv.getPlugin() + ", id=" + screenrecv.getId() + ")");
			Janus.log("  -- This is a subscriber");
			// We wait for the plugin to send us an offer
			role = "listener";
			var username = myusername + '_share';
			var listen = {
				request: "join",
				room: parseInt($('#myroom').val(), 10),
				pin: $('#videoRoomPin').val(),
				//ptype: "listener",
				ptype: "subscriber",
				feed: id,
				display: username
			};
			screenrecv.send({ message: listen });
		},
		error: function(error) {
			Janus.error("  -- Error attaching plugin...", error);
			bootboxalert("Error attaching plugin... " + error);
		},
		onmessage: function(msg, jsep) {
			Janus.debug(" ::: Got a message (listener) :::", msg);
			var event = msg["videoroom"];
			Janus.debug("Event: " + event);
			if(event) {
				if(event === "attached") {
					// Subscriber created and attached
					if(!spinner) {
						var target = document.getElementById('#screencapture');
						spinner = new Spinner({top:100}).spin(target);
					} else {
						spinner.spin();
					}
					Janus.log("Successfully attached to feed " + id + " (" + display + ") in room " + msg["room"]);
					$('#screenmenu').hide();
					$('#room').removeClass('hide').show();
					screenrecv.rfid = msg["id"];
					screenrecv.rfdisplay = msg["display"];
					var parts = screenrecv.rfdisplay.split('_');
					$('#title').html(decodeURI(parts[0]));
				} else {
					// What has just happened?
				}
			}
			if(jsep) {
				Janus.debug("Handling SDP as well...", jsep);
				// Answer and attach
				screenrecv.createAnswer({
					jsep: jsep,
					media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
					success: function(jsep) {
						Janus.debug("Got SDP!", jsep);
						var body = { request: "start", room: parseInt($('#myroom').val(), 10), pin: $('#videoRoomPin').val() };
						screenrecv.send({ message: body, jsep: jsep, success: function() {
							$('#startshare').addClass('hide').hide();
							$('#trans-test').addClass('hide').hide();
							$('#closeshare').addClass('hide').hide();
						}});
					},
					error: function(error) {
						Janus.error("WebRTC error:", error);
						bootboxalert("WebRTC error... " + error.message);
						cleanUpShare();
					}
				});
			}
		},
		onlocalstream: function(stream) {
			// The subscriber stream is recvonly, we don't expect anything here
		},
		onremotestream: function(stream) {
			if($('#screenvideo').length === 0) {
				// No remote video yet
				//$('#screencapture').append('<video class="rounded centered" id="waitingvideo" width="100%" height="100%" />');
				$('#screencapture').append('<video class="centered" id="waitingvideo" width="100%" height="100%" />');
				//$('#screencapture').append('<video class="rounded centered hide" id="screenvideo" width="100%" height="100%" autoplay playsinline/>');
				$('#screencapture').append('<video class="centered hide" id="screenvideo" width="100%" height="100%" autoplay playsinline/>');
				// Show the video, hide the spinner and show the resolution when we get a playing event
				//$("#screenvideo").bind("playing", function () {
				if(Janus.webRTCAdapter.browserDetails.browser === "safari") {
					$("#screenvideo").on("loadedmetadata", function () {
						$("#screenvideo")[0].play();
						$('#waitingvideo').remove();
						$('#screenvideo').removeClass('hide');
						if(spinner)
							spinner.stop();
						spinner = null;
						$('#trans-test').removeClass('hide').show();
						transformRight();
					});
				} else {
					$("#screenvideo").on("playing", function () {
						$('#waitingvideo').remove();
						$('#screenvideo').removeClass('hide');
						if(spinner)
							spinner.stop();
						spinner = null;
						$('#trans-test').removeClass('hide').show();
						transformRight();
					});
				}
			}
			Janus.attachMediaStream($('#screenvideo').get(0), stream);
		},
		oncleanup: function() {
			Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
			$('#waitingvideo').remove();
			if(spinner)
				spinner.stop();
			spinner = null;
		}
	});
}

function realRegisterTextName() {
	var transaction = Janus.randomString(12);
	var register = {
		textroom: "join",
		transaction: transaction,
		room: parseInt($('#myroom').val(), 10),
		pin: $('#videoRoomPin').val(),
		username: myid+'',
		display: decodeURI(myusername)
	};
	transactions[transaction] = function(response) {
		if(response["textroom"] === "error") {
			// Something went wrong
			if(response["error_code"] === 417) {
				// This is a "no such room" error: give a more meaningful description
				bootboxalert(
					"<p>Apparently room <code>" + $('#myroom').val() + "</code> (the one this demo uses as a test room) " +
					"does not exist...</p><p>Do you have an updated <code>janus.plugin.textroom.jcfg</code> " +
					"configuration file? If not, make sure you copy the details of room <code>" + $('#myroom').val() + "</code> " +
					"from that sample in your current configuration file, then restart Janus and try again."
				);
			} else {
				var destroy = {
					"textroom" : "destroy",
					"room" : parseInt($('#myroom').val(), 10),
					"secret" : $('#videoRoomPass').val(),
				};
				textroom.data({
					text: JSON.stringify(destroy),
					error: function(reason) {
						bootboxalert(reason);
					},
					success: function() {
						bootboxalert(response["error"]);
					}
				});				
			}
			return;
		}
		// We're in
		//$('#textroom').removeClass('hide').show();
		$('#participant').removeClass('hide').html(decodeURI(myusername)).show();
		$('#chatroom').css('height', ($(window).height()-720)+"px");
		$('#datasend').removeAttr('disabled');
		// Any participants already in?
		console.log("Participants:", response.participants);
		if(response.participants && response.participants.length > 0) {
			for(var i in response.participants) {
				var p = response.participants[i];
				participants[p.username] = p.display ? p.display : p.username;
				if(parseInt(p.username, 10) !== myid && $('#rp' + p.username).length === 0) {
					// Add to the participants list
					$('#list').append('<li id="rp' + p.username + '" class="list-group-item">' + participants[p.username] + '</li>');
					$('#rp' + p.username).css('cursor', 'pointer').click(function() {
						var username = $(this).attr('id').split("rp")[1];
						sendPrivateMsg(username);
					});
				}
				$('#chatroom').append('<p style="color: green;">[' + getDateString() + '] <i>' + participants[p.username] + ' さんが参加しました</i></p>');
				$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
			}
		}
	};
	textroom.data({
		text: JSON.stringify(register),
		success: function() {
			Janus.log("textroom successfully registered");
			if ($('#is_host').val() === 'true') {
				var message = {
					textroom: "announcement",
					transaction: Janus.randomString(12),
					room: parseInt($('#myroom').val(), 10),
					secret: $('#videoRoomPass').val(),
					text: '%room_command%hostjoined='+myid
				};
				textroom.data({
					text: JSON.stringify(message),
					error: function(reason) {
						bootboxalert(reason);
					},
					success: function() { }
				});
			}
		},
		error: function(reason) {
			bootboxalert(reason);
		}
	});
}

function registerTextName() {
	var exists = {
		request: "exists",
		room: parseInt($('#myroom').val(), 10),
	};
	textroom.send({
		message: exists,
		success: function(result) {
			if (result['textroom'] === 'success') {
				if (result['exists']) {
					realRegisterTextName();
				} else {
					var subscribe = {
						request: "create",
						room: parseInt($('#myroom').val(), 10),
						secret: $('#videoRoomPass').val(),
						pin: $('#videoRoomPin').val(),
						permanent: false,
						is_private_id: true
					};
					// In case you don't want to receive audio, video or data, even if the
					// publisher is sending them, set the 'offer_audio', 'offer_video' or
					// 'offer_data' properties to false (they're true by default), e.g.:
					// 		subscribe["offer_video"] = false;
					// For example, if the publisher is VP8 and this is Safari, let's avoid video
					textroom.send({
						message: subscribe,
						success: function(result) {
							realRegisterTextName();
						}
					});
				}
			}
		}
	});
}

function sendPrivateMsg(username) {
	var display = participants[username];
	if(display) {
		bootbox.prompt(display + 'さんにプライベートメッセージ送信', function(result) {
			if(result && result !== "") {
				var message = {
					textroom: "message",
					transaction: Janus.randomString(12),
					room: parseInt($('#myroom').val(), 10),
					to: username,
					text: result
				};
				textroom.data({
					text: JSON.stringify(message),
					error: function(reason) {
						bootboxalert(reason);
					},
					success: function() {
						$('#chatroom').append('<p style="color: purple;">[' + getDateString() + '] <b>[' + display + 'さんにプライベート]</b> ' + result);
						$('#chatroom').get(0).scrollTop = $('#chatroom').get(0).scrollHeight;
					}
				});
			}
		});
	}
}

function checkEnter(field, event) {
	var theCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if(theCode == 13) {
		sendData();
		return false;
	} else {
		return true;
	}
}

function sendData() {
	var data = $('#datasend').val();
	if(data === "") {
		bootboxalert('送信するメッセージを入力してください');
		return;
	}
	var message = {
		textroom: "message",
		transaction: Janus.randomString(12),
		room: parseInt($('#myroom').val(), 10),
 		text: data,
	};
	// Note: messages are always acknowledged by default. This means that you'll
	// always receive a confirmation back that the message has been received by the
	// server and forwarded to the recipients. If you do not want this to happen,
	// just add an ack:false property to the message above, and server won't send
	// you a response (meaning you just have to hope it succeeded).
	textroom.data({
		text: JSON.stringify(message),
		error: function(reason) {
			bootboxalert(reason);
		},
		success: function() {
			$('#datasend').val('');
		}
	});
}

// Helper to format times
function getDateString(jsonDate) {
	var when = new Date();
	if(jsonDate) {
		when = new Date(Date.parse(jsonDate));
	}
	var dateString =
			("0" + when.getUTCHours()).slice(-2) + ":" +
			("0" + when.getUTCMinutes()).slice(-2) + ":" +
			("0" + when.getUTCSeconds()).slice(-2);
	return dateString;
}

function randomNumber(len) {
  var charSet = '0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
  	var randomPoz = Math.floor(Math.random() * charSet.length);
  	randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

// Helper to parse query string
function getQueryStringValue(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Helpers to create Simulcast-related UI, if enabled
function addSimulcastButtons(feed, temporal) {
	var index = feed;
	$('#remote'+index).parent().append(
		'<div id="simulcast'+index+'" class="btn-group-vertical btn-group-vertical-xs pull-right">' +
		'	<div class"row">' +
		'		<div class="btn-group btn-group-xs" style="width: 100%">' +
		'			<button id="sl'+index+'-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to higher quality" style="width: 33%">SL 2</button>' +
		'			<button id="sl'+index+'-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to normal quality" style="width: 33%">SL 1</button>' +
		'			<button id="sl'+index+'-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to lower quality" style="width: 34%">SL 0</button>' +
		'		</div>' +
		'	</div>' +
		'	<div class"row">' +
		'		<div class="btn-group btn-group-xs hide" style="width: 100%">' +
		'			<button id="tl'+index+'-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 2" style="width: 34%">TL 2</button>' +
		'			<button id="tl'+index+'-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 1" style="width: 33%">TL 1</button>' +
		'			<button id="tl'+index+'-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 0" style="width: 33%">TL 0</button>' +
		'		</div>' +
		'	</div>' +
		'</div>'
	);
	// Enable the simulcast selection buttons
	$('#sl' + index + '-0').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching simulcast substream, wait for it... (lower quality)", null, {timeOut: 2000});
			if(!$('#sl' + index + '-2').hasClass('btn-success'))
				$('#sl' + index + '-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#sl' + index + '-1').hasClass('btn-success'))
				$('#sl' + index + '-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#sl' + index + '-0').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			feeds[index].send({ message: { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), substream: 0, secret: $('#videoRoomPass').val() }});
		});
	$('#sl' + index + '-1').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching simulcast substream, wait for it... (normal quality)", null, {timeOut: 2000});
			if(!$('#sl' + index + '-2').hasClass('btn-success'))
				$('#sl' + index + '-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#sl' + index + '-1').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#sl' + index + '-0').hasClass('btn-success'))
				$('#sl' + index + '-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			feeds[index].send({ message: { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), substream: 1, secret: $('#videoRoomPass').val() }});
		});
	$('#sl' + index + '-2').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching simulcast substream, wait for it... (higher quality)", null, {timeOut: 2000});
			$('#sl' + index + '-2').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#sl' + index + '-1').hasClass('btn-success'))
				$('#sl' + index + '-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#sl' + index + '-0').hasClass('btn-success'))
				$('#sl' + index + '-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			feeds[index].send({ message: { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), substream: 2, secret: $('#videoRoomPass').val() }});
		});
	if(!temporal)	// No temporal layer support
		return;
	$('#tl' + index + '-0').parent().removeClass('hide');
	$('#tl' + index + '-0').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping simulcast temporal layer, wait for it... (lowest FPS)", null, {timeOut: 2000});
			if(!$('#tl' + index + '-2').hasClass('btn-success'))
				$('#tl' + index + '-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#tl' + index + '-1').hasClass('btn-success'))
				$('#tl' + index + '-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#tl' + index + '-0').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			feeds[index].send({ message: { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), temporal: 0, secret: $('#videoRoomPass').val() }});
		});
	$('#tl' + index + '-1').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping simulcast temporal layer, wait for it... (medium FPS)", null, {timeOut: 2000});
			if(!$('#tl' + index + '-2').hasClass('btn-success'))
				$('#tl' + index + '-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#tl' + index + '-1').removeClass('btn-primary btn-info').addClass('btn-info');
			if(!$('#tl' + index + '-0').hasClass('btn-success'))
				$('#tl' + index + '-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			feeds[index].send({ message: { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), temporal: 1, secret: $('#videoRoomPass').val() }});
		});
	$('#tl' + index + '-2').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping simulcast temporal layer, wait for it... (highest FPS)", null, {timeOut: 2000});
			$('#tl' + index + '-2').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#tl' + index + '-1').hasClass('btn-success'))
				$('#tl' + index + '-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#tl' + index + '-0').hasClass('btn-success'))
				$('#tl' + index + '-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			feeds[index].send({ message: { request: "configure", secret: $('#videoRoomPass').val(), pin: $('#videoRoomPin').val(), temporal: 2, secret: $('#videoRoomPass').val() }});
		});
}

function updateSimulcastButtons(feed, substream, temporal) {
	// Check the substream
	var index = feed;
	if(substream === 0) {
		toastr.success("Switched simulcast substream! (lower quality)", null, {timeOut: 2000});
		$('#sl' + index + '-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl' + index + '-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl' + index + '-0').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
	} else if(substream === 1) {
		toastr.success("Switched simulcast substream! (normal quality)", null, {timeOut: 2000});
		$('#sl' + index + '-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl' + index + '-1').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#sl' + index + '-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	} else if(substream === 2) {
		toastr.success("Switched simulcast substream! (higher quality)", null, {timeOut: 2000});
		$('#sl' + index + '-2').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#sl' + index + '-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl' + index + '-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	}
	// Check the temporal layer
	if(temporal === 0) {
		toastr.success("Capped simulcast temporal layer! (lowest FPS)", null, {timeOut: 2000});
		$('#tl' + index + '-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl' + index + '-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl' + index + '-0').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
	} else if(temporal === 1) {
		toastr.success("Capped simulcast temporal layer! (medium FPS)", null, {timeOut: 2000});
		$('#tl' + index + '-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl' + index + '-1').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#tl' + index + '-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	} else if(temporal === 2) {
		toastr.success("Capped simulcast temporal layer! (highest FPS)", null, {timeOut: 2000});
		$('#tl' + index + '-2').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#tl' + index + '-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl' + index + '-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	}
}
