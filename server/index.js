$(window).on('load', function() {
	function errorDialog(mess, jumpto) {
		$('#errormess').html(mess);
		var dialog = $("#error-dialog").dialog({
			modal:true, //モーダル表示
			title:"エラー", //タイトル
			resizable: false,
	    width: "auto",
			buttons: { //ボタン
				"確認": function() {
					dialog.dialog("close");
					if (jumpto && jumpto != '') {
						location.href = jumpto;
					}
				}
			}
		});
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

	$(window).on('beforeunload', function(event) {
		if ('destroyVoiceMail' in window) {
			destroyVoiceMail();
		}
		if ('destroyVideoCall' in window) {
			destroyVideoCall();
		}
		if ('sipDestroy' in window) {
			sipDestroy();
		}
	});

	/*
	function infoDialog(mess, jumpto) {
		$('#errormess').html(mess);
		var dialog = $("#error-dialog").dialog({
			modal:true, //モーダル表示
			title:"情報", //タイトル
			resizable: false,
	    width: "auto",
			buttons: { //ボタン
				"確認": function() {
					dialog.dialog("close");
					if (jumpto && jumpto != '') {
						location.href = jumpto;
					}
				}
			}
		});
	}
	*/

	function voiceMailDialog(sendid, sendname) {
		var dialog = $("#voicemail").dialog({
			modal: true, //モーダル表示
			title: sendname+"さんにボイスメールを残す", //タイトル
			resizable: false,
	    width: "auto",
			buttons: { //ボタン
				"閉じる": function() {
					dialog.dialog("close");
				}
			}
		});
	}

	$(".profile_content_container .z-row-action>a.edit[data-edit='change-email-detail']").click(function() {
	//$('#change-email-detail').click(function() {
	//function click_change_email_detail() {
		$(".change-email-detail").show().prev().hide();
		$(".change-email-detail").find("#newEmail").focus();
		$(this).hide();
		return false;
	//}
	});
	$('#locale-list-toggle').click(function() {
		$('#locale-list-div').toggleClass('hide');
		if ($('#locale-list-div').hasClass('hide')) {
			$('#locale-list-div').hide();
		} else {
			$('#locale-list-div').show();
		}
	});
	$('.locale-list-span').parent().click(function() {
		$('#locale-list').val($(this).text());
		$('#locale-list-div').addClass('hide').hide();
	})

	$('#country-list-toggle').click(function() {
		$('#country-list-div').toggleClass('hide');
		if ($('#country-list-div').hasClass('hide')) {
			$('#country-list-div').hide();
		} else {
			$('#country-list-div').show();
		}
	});
	$('.country-list-span').parent().click(function() {
		$('#country-list').val($(this).text());
		$('#country-list-div').addClass('hide').hide();
	})

	$('#timezone-list-toggle').click(function() {
		$('#timezone-list-div').toggleClass('hide');
		if ($('#timezone-list-div').hasClass('hide')) {
			$('#timezone-list-div').hide();
		} else {
			$('#timezone-list-div').show();
		}
	});
	$('.item-timezone-span').parent().click(function() {
		$('#timezone-list').val($(this).text());
		$('#timezone-list-div').addClass('hide').hide();
	})

	$('#custom-select-toggle').click(function() {
		$('#custom-select-div').toggleClass('hide');
		if ($('#custom-select-div').hasClass('hide')) {
			$('#custom-select-div').hide();
		} else {
			$('#custom-select-div').show();
		}
	});
	$('.profile-date-format').parent().click(function() {
		$('#custom-select').val($(this).text());
		$('#custom-select-div').addClass('hide').hide();
	});

	$('#ringtone')[0].volume = 0.5;
	$('#ringbacktone')[0].volume = 0.5;

	$("#btnUnsubscribe").click(function() {
		var parentObj = $(this).closest("#pic");
		parentObj.removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", false);
		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
			serviceWorkerRegistration.unregister().then(function(result) {
				if (result) {
					console.log("サービスワーカーを解除しました");
				} else {
					console.log("サービスワーカーを解除に失敗しました");
				}
			}).catch(function(err) {
				console.log(err);
			});
			serviceWorkerRegistration.pushManager.getSubscription().then(function(pushSubscription) {
				if (!pushSubscription) {
					console.log("pushSubscription が見つかりませんでした。");
				} else {
					const result = pushSubscription.unsubscribe();
					if (result) {
						console.log("登録解除に成功しました");
					} else {
						console.log("登録解除に失敗しました");
					}
					const data = new FormData();
					data.set('userid', $('#user_id').val());
					fetch("./unsubscribe.php", {
						method: "POST",
						credentials:'include',
						body: data
					});
				}
			}).catch(function(err){
				console.log(err);
			});
		}).catch(function(err) {
			console.log(err);
		});
		return false;
	});

	$('#personcalling').click(function() {
		$('#personcalling').parent().addClass("open");
		return false;
	})

	$('#cancelvideocall').click(function() {
		var tag = $('#cancelvideocall').attr('name');
		const data = new FormData();
		data.set('tag', tag);
		fetch("./answerpush.php", {
			method: 'POST',
			cache: 'no-cache',
			credentials:'include',
			body: data
		}).then((res) => res.json()).then((response) => {
			if (response.result == 0) {
				$('#makevideocall').css('display', 'inline-block');
				$('#videocalling').css('display', 'none');
				$.removeCookie("calling_tag");
				$.removeCookie("calling_name");
			}
		});
	})

	var waitCalling = null;
	function openVideoCall() {
		$('#videocall').dialog({
			modal: false, //モーダル表示
			title: "ビデオコール", //タイトル
			resizable: false,
			width: "auto",
			buttons: {
				'切断': function() {
					if (waitCalling) {
						clearInterval(waitCalling);
						waitCalling = null;
					}
					doHangup();
					$('#videocall').dialog('close');
				}
			}
		});
	}

	function onClickVideoDropdown() {
		var root = $(this);
		var name = $(this).parent().attr('name');
		var idx = name.indexOf('_');
		var online = name.substring(0, idx);
		var userid = name.substring(idx+1);
		$("#btnVideoCall").parent().removeClass("open");
		if (online === 'online') {
			$('#callingto').text(root.text());
			$('#makevideocall').removeClass('is-active');
			$('#makevideocall').css('display', 'none');
			$('#videocalling').css('display', 'inline-block');
			openVideoCall();
			var callto = userid+'_'+root.text();
			doCall(callto);
		} else {
			const data = new FormData();
			data.set('sendto', userid);
			data.set('message', $('#displayName').val()+'さんからRoomビデオコールの通知がありました');
			fetch("./sendpush.php", {
				method: 'POST',
				cache: 'no-cache',
				credentials:'include',
				body: data
			}).then((res) => res.json()).then((response) => {
				if (response.result != 0) {
					errorDialog(response.result_string, null);
				} else {
					$('#callingto').text(root.text());
					$('#makevideocall').removeClass('is-active');
					$('#makevideocall').css('display', 'none');
					$('#videocalling').css('display', 'inline-block');
					openVideoCall();
					$('#cancelvideocall').attr('name', response.result_string);
					$.cookie('calling_id', userid);
					$.cookie('calling_tag', response.result_string);
					$.cookie('calling_name', root.text());
					if (videoCallUserList) {
						waitCalling = setInterval(videoCallUserList, 3000);
					}
				}
			});
		}
		return false;
	}

	if (!$('#isAdmin').val() == 'true' && jscd.os != 'iOS' && jscd.os != 'iPadOS') {
		checkServiceWorkerRegistered('notification-dialog', $('#user_id').val(),
			function(err) {
				errorDialog(err, null);
			}, function(mess){
				//infoDialog(mess, null);
			});
	}

	attachedcb = function() {
		registerUsername($('#user_id').val()+'_'+$('#displayName').val());
		//if (videoCallUserList)
		//	videoCallUserList();
	};

	acceptcallcb = function() {
		try {
			$('#calling-dlg').dialog('close');
		} catch (e) {
			console.error(e);			
		}
	}

	gotuserlistcb = function(list) {
		$('#videocallDropdown').empty();
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
					var dtclass = 'class="list_ttl"';
					var name = response.result_string[mp];
					var idx = name.indexOf('_');
					var userid = name.substring(0, idx);
					if (list.indexOf(name) >= 0) {
						dtclass = 'class="list_ttl online" name="online_'+userid+'"';
						if (userid == $.cookie('calling_id')) {
							var tag = $('#cancelvideocall').attr('name');
							const data = new FormData();
							data.set('tag', $.cookie('calling_tag'));
							fetch("./answerpush.php", {
								method: 'POST',
								cache: 'no-cache',
								credentials:'include',
								body: data
							}).then((res) => res.json()).then((response) => {
								$('#callingto').text($.cookie("calling_name"));
								$('#makevideocall').css('display', 'inline-block');
								$('#videocalling').css('display', 'none');
								name = $.cookie("calling_id")+'_'+$.cookie("calling_name");
								$.removeCookie("calling_id");
								$.removeCookie("calling_tag");
								$.removeCookie("calling_name");
								if (waitCalling) {
									clearInterval(waitCalling);
									waitCalling = null;
								}
								openVideoCall();
								doCall(name);
							});
						}
					} else {
						dtclass = 'class="list_ttl" name="offline_'+userid+'"';
					}
					var html = '<li '+dtclass+'><a href="javascript:;">'+name.substring(idx+1)+'</a></li>';
					$('#videocallDropdown').append(html);
				}
			} else {
				for (var mp in list) {
					var name = decodeURI(list[mp]);
					var idx = name.indexOf('_');
					var userid = name.substring(0, idx);
					var html = '<li class="list_ttl online" name="online_'+userid+'"><a href="javascript:0">'+name.substring(idx+1)+'</a></li>';
					$('#videocallDropdown').append(html);
				}
			}
			$("#videocallDropdown a").click(onClickVideoDropdown);
		});

		incommingCallDialog = function(yourname, successcb, dangercb) {
			$('#incoming-from').text(yourname);
			$('#incoming-call-dlg').dialog({
				modal: true, //モーダル表示
				title: "ビデオコール呼び出し", //タイトル
				resizable: false,
				width: "auto",
				buttons: {
					'応答': function() {
						successcb();
						$('#incoming-call-dlg').dialog('close');
						openVideoCall();
					},
					'拒否': function() {
						dangercb();
						$('#incoming-call-dlg').dialog('close');
					}
				}
			});
		};

		openCallingDialog = function(cancelcb) {
			$('#calling-dlg').dialog({
				modal: true, //モーダル表示
				title: "ビデオコール呼び出し", //タイトル
				resizable: false,
				width: "auto",
				buttons: {
					'切断': function() {
						cancelcb();
						$('#calling-dlg').dialog('close');
						$('#videocall').dialog('close');
					}
				}
			});
		};

		closeCallingDialog = function() {
			$('#calling-dlg').dialog('close');
			$('#videocall').dialog('close');
			$('#makevideocall').css('display', 'inline-block');
			$('#videocalling').css('display', 'none');
		};
	};

	$("#makevideocall").click(function() {
		if (videoCallUserList)
			videoCallUserList();
	});

	const data = new FormData();
	data.set('fnc', 'voicemail');
	fetch("./getuserlist.php", {
		method: 'POST',
		cache: 'no-cache',
		credentials:'include',
		body: data
	}).then((res) => res.json()).then((response) => {
		if (response.result == 0) {
			try {
				var users = response.result_string;
				for (var idx in users) {
					var user = users[idx];
					var html = '<li class="list_ttl"><a href="javascript:0" name="user_'+user['userid']+'">'+user['name']+'</a></li>';
					$('#voicemailDropdown').append(html);
				}
				$("#voicemailDropdown a").click(function() {
					var root = $(this);
					$("#btnVideoCall").parent().removeClass("open");
					var name = root.attr('name');
					var idx = name.indexOf('_');
					var userid = name.substring(idx+1);
					voiceMailRecorded = function(url) {
						const data = new FormData();
						data.set('sendto', userid);
						data.set('url', url);
						fetch("./registervoicemail.php", {
							method: 'POST',
							cache: 'no-cache',
							credentials:'include',
							body: data
						}).then((res) => res.json()).then((response) => {
							if (response.result == 0) {
								$('.listenvoicemail').attr('name', response.tag);
								$('#downloadvoicemail').attr('name', response.tag);
							} else {
								errorDialog(response.result_string);
							}
						});
					};
					voiceMailDialog(userid, root.text());
				});
			} catch (exp) {
				errorDialog(exp);
			}
		} else {
			errorDialog(response.result_string);
		}
	});

	if ($('#voiceMailTag').val() != '') {
		$("playvoicemail").dialog({
			modal: true, //モーダル表示
			title: "ボイスメール再生", //タイトル
			resizable: false,
			width: "auto",
			buttons: {
				'再生': function() {
					$('#playvoicemail button').attr('name', $('#voiceMailTag').val());
					$('#playvoicemail button').trigger('click');
				},
				'閉じる': function() {
					$("playvoicemail").dialog('close');
				}
			}
		});
	}

	$("#sipSetting").click(function() {
		$("#siplogin").dialog({
			modal: true, //モーダル表示
			title: "SIP設定", //タイトル
			resizable: true,
			width: "800px",
			buttons: {
				'登録': function() {
					window.sipRegisterUsername(function(error) {
						if (!error) {
							const data = new FormData();
							data.set('server', $('#server').val());
							data.set('username', $('#username').val());
							data.set('authuser', $('#authuser').val());
							data.set('displayname', $('#sipdispname').val());
							data.set('password', $('#sipassword').val());
							data.set('registerset', $('input[name=regoption]:checked').val());
							fetch('./registersipsetting.php', {method: 'POST', cache: 'no-cache', credentials:'include', body: data})
							.then(response => response.json())
							.then(data => {
								if (data.result != 0) {
									errorDialog(data.result_string);
								}
							})
							.catch((reason) => {
								errorDialog(reason);
							});
							$("#siplogin").dialog('close');
						}
					});
				},
				'閉じる': function() {
					$("#siplogin").dialog('close');
				}
			}
		});
	});

	$('#addhelper').click(window.sipAddHelper);
	$('#sipcall').click(window.sipDoCall);
	$('#makeSipCall').click(function() {
		$("#sipcalldlg").dialog({
			modal: true, //モーダル表示
			title: "IP電話をかける", //タイトル
			resizable: true,
			width: "800px",
			buttons: {
				'Close': function() {
					$("#sipcalldlg").dialog('close');
				}
			}
		});
	});

	$("#btnVideoCallList").click(function() {
		var parentObj = $(this).closest("#pic");
		parentObj.removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", false);
		fetch('./getvideocalllist.php', {method: 'GET', cache: 'no-cache'})
		.then(response => response.json())
		.then(data => {
			if (data.result != 0) {
				errorDialog(data.result_string);
			} else {
				$('#videocalls').empty();
				for (var idx in data.calls) {
					const call = data.calls[idx];
					$('#videocalls').append(
						'<div class="clearfix">'+
						'	<div class="list-col mtg-checkbox">&nbsp;</div>'+
						'	<div class="list-col mtg-id">'+call['make']+'</div>'+
						'	<div class="list-col mtg-topic">'+call['name']+'</div>'+
						'	<div class="list-col mtg-date">'+call['create']+' <span class="sorting sort-headers"></span></a></div>'+
						'	<div class="list-col mtg-id">'+call['answered']+'</div>'+
						'	<div class="list-col mtg-action">'+
						'		<button class="btn btn-default btn-sm recallvideo" data-id="'+call['tag']+'">コール</button>'+
						'		<button class="btn btn-default btn-sm delvideocall" data-id="'+call['tag']+'">削除</button>'+
						'	</div>'+
						'</div>');
				}
				$('#videocalllist').dialog({
					modal: true, //モーダル表示
					title: "ビデオコールリスト", //タイトル
					resizable: false,
					width: "800",
					height: "600",
					buttons: {
						'閉じる': function() {
							$("#videocalllist").dialog('close');
						}
					}
				});
			}
		})
		.catch((reason) => {
			errorDialog(reason);
		});
	});

	$("#btnVoiceMailList").click(function() {
		var parentObj = $(this).closest("#pic");
		parentObj.removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", false);
		fetch('./getvoicemaillist.php', {method: 'GET', cache: 'no-cache'})
		.then(response => response.json())
		.then(data => {
			if (data.result != 0) {
				errorDialog(data.result_string);
			} else {
				$('#voicemails').empty();
				for (var idx in data.mails) {
					const mail = data.mails[idx];
					$('#voicemails').append(
						'<div class="clearfix">'+
						'	<div class="list-col mtg-checkbox">&nbsp;</div>'+
						'	<div class="list-col mtg-id">'+mail['make']+'</div>'+
						'	<div class="list-col mtg-topic">'+mail['name']+'</div>'+
						'	<div class="list-col mtg-date">'+mail['create']+' <span class="sorting sort-headers"></span></a></div>'+
						'	<div class="list-col mtg-id">'+mail['read']+'</div>'+
						'	<div class="list-col mtg-action">'+
						'		<button class="btn btn-default btn-sm recallvideo" data-id="'+mail['tag']+'">再生</button>'+
						'		<button class="btn btn-default btn-sm delvideocall" data-id="'+mail['tag']+'">削除</button>'+
						'	</div>'+
						'</div>');
				}
				$('#voicemaillist').dialog({
					modal: true, //モーダル表示
					title: "ボイスメールリスト", //タイトル
					resizable: false,
					width: "800",
					height: "600",
					buttons: {
						'閉じる': function() {
							$("#voicemaillist").dialog('close');
						}
					}
				});
			}
		})
		.catch((reason) => {
			errorDialog(reason);
		});
	});

	$(".js-mark-button-show").click(function() {
		var aG = $(this).closest(".js-mark-scope");
		aG.find(".js-mark-label").hide();
		aG.find(".js-real-label").show();
		//$(this).css('display', 'none');	// hide();
		this.style.display = 'none';
		$(this).siblings(".js-mark-button-hide").show()
	});
	$(".js-mark-button-hide").click(function() {
		var aG = $(this).closest(".js-mark-scope");
		aG.find(".js-mark-label").show();
		aG.find(".js-real-label").hide();
		$(this).hide();
		$(this).siblings(".js-mark-button-show").show()
	});

	const photoSize = 116;
	var jcrop = null;
	var initJcrop = false;
	var fileSubmit = null;
	var fileUploadDialog = $("#changePictureDialog");
	var errorMessageArea = fileUploadDialog.find(".alert-danger");
	var originalImg = fileUploadDialog.find(".original-container img");
	var previewImg = fileUploadDialog.find(".preview-container img");

	function errorMess(errCode) {
		if (errCode == 0) {
			errorMessageArea.empty().hide();
		} else {
			if (errCode == 1) {
				errorMessageArea.text("JPG、JPEG、GIF、PNGファイルのみをアップロードできます").show();
			} else {
				if (errCode == 2) {
					errorMessageArea.text("アップロードできるファイルのサイズは最大5MBです").show();
				} else {
					errorMessageArea.text("エラーコード：" + " " + errCode).show();
				}
			}
		}
	}

	function destroyJcrop() {
		if (jcrop) {
			jcrop.destroy()
		}
	}

	function facebookOrGoogle(aG) {
		if (!aG) {
			return false;
		}
		return (aG.indexOf("facebook.com") != -1 || aG.indexOf("googleusercontent.com") != -1);
	}

	function isNotValidPicFile(file, errorFun, sizeLimit, formatLimt) {
		var errCode = 0;
		var result = false;
		formatLimt = formatLimt || /.*\.(gif|jpe?g|png)$/i;
		sizeLimit = sizeLimit || 2 * 1024 * 1024;
		if (!formatLimt.test(file.name)) {
			errCode = 1;
			result = true;
		}
		if ((file.size && file.size > sizeLimit)) {
			errCode = 2;
			result = true;
		}
		errorFun(errCode, sizeLimit);
		return result;
	}

	function fileUploaded(aG) {
		if (originalImg.attr("src") == aG && !a(aG)) {
			startJcrop();
			return
		}
		originalImg.parent().find(".loading").show();
		originalImg.removeAttr("style");
		originalImg.attr("src", aG);
		previewImg.attr("src", aG);
		originalImg.one("load", function() {
			if (!facebookOrGoogle(aG)) {
				startJcrop();
			}
			originalImg.parent().find(".loading").hide();
		});
		originalImg.one("error", function() {
			originalImg.parent().find(".loading").hide();
		});
	}

	function startJcrop() {
    var imgWidth = null;
    var imgHeight = null;

    function onjcropchange(rect) {
      if (parseInt(rect.w) > 0) {
        var wid = photoSize / rect.w;
        var hei = photoSize / rect.h;
        previewImg.css({
          width: Math.round(wid * imgWidth) + "px",
          height: Math.round(hei * imgHeight) + "px",
          marginLeft: "-" + Math.round(wid * rect.x) + "px",
          marginTop: "-" + Math.round(hei * rect.y) + "px"
        })
      }
    }

    originalImg.Jcrop({
      aspectRatio: 1,
      boxWidth: 400,
      boxHeight: 300,
      onChange: onjcropchange,
      onSelect: onjcropchange
    }, function() {
      jcrop = this;
      imgWidth = originalImg.width();
      imgHeight = originalImg.height();
      var size = photoSize;
      if (imgHeight > photoSize*2) {
        size = imgHeight / 2
      }
      var left = Math.round((imgWidth - size) / 2);
      var top = Math.round((imgHeight - size) / 2);
      jcrop.setSelect([left, top, left + size, top + size])
    });
		initJcrop = true;
	}

	$("#file").fileupload({
		dataType: "json",
		paramName: "file",
		formData: {
			userId: $('#user_id').val()
		},
		add: function(aH, aG) {
			if (isNotValidPicFile(aG.files[0], errorMess)) {
				return;
			}
			fileUploadDialog.find(".upload-msg").show();
			fileSubmit = aG.submit();
		},
		progress: function(aI, aH) {
			var aG = parseInt(aH.loaded / aH.total * 100, 10);
			fileUploadDialog.find(".progress .progress-bar").css("width", aG + "%");
			fileUploadDialog.find(".upload-msg").hide();
			fileUploadDialog.find(".fileupload-progress").show();
		},
		done: function(aH, aG) {
			if (aG.result.status) {
				if (initJcrop) {
					destroyJcrop();
				}
				window.setTimeout(function() {
					fileUploaded(aG.result.result)
				}, 100);
			} else {
				errorMessageArea.text(aG.result.errorMessage ? aG.result.errorMessage : "不明のエラーです！").show();
			}
		},
		fail: function(aH, aG) {
			if (aG.errorThrown !== "abort") {
				errorMessageArea.text("エラー：" + " " + aG.errorThrown).show()
			}
		},
		always: function(aH, aG) {
			fileUploadDialog.find(".upload-msg").hide();
			fileUploadDialog.find(".fileupload-progress").hide();
			fileSubmit = null;
		}
	});

	$('.change-picture').click(function() {
		$('#changePictureDialog').dialog({
			modal: true, //モーダル表示
			title: "写真を変更する", //タイトル
			resizable: false,
			width: "auto",
			buttons: {
				'アップロード': function() {
					$('#file').trigger('click');
				},
				'保存': function() {
					if (!jcrop) {
						$("#changePictureDialog").dialog('close');
            return;
	        }
	        var aH = jcrop.tellSelect();
	        if (!aH || aH.w <= 0 || aH.h <= 0) {
            errorMessageArea.text("四角のエリアを選んで画像を切り取ってください。").show();
            return;
	        }
					const data = new FormData();
		      data.set('file', originalImg.attr('src'));
		      data.set('x', Math.round(isNaN(aH.x) ? 0 : aH.x));
					data.set('y', Math.round(isNaN(aH.y) ? 0 : aH.y));
					data.set('w', Math.round(isNaN(aH.w) ? photoSize : aH.w));
					data.set('h', Math.round(isNaN(aH.h) ? photoSize : aH.h));
		      fetch('./savephoto.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
		      .then((res) => res.json())
		      .then((response) => {
						if (response.result == 0) {
	            var aJ = Math.floor(Math.random() * 10000);
	            //$(".my-profile .profile-pic img").attr("src", response.url + "?type=large&_=" + aJ).attr("cp", "1");
							//$("#headerPic").attr("src", response.url + "?_=" + aJ)
							$(".my-profile .profile-pic img").attr("src", response.url);
	            $("#headerPic").attr("src", response.url);
	            $(".ui-dialog-buttonpane button:first").addClass("pull-left");
							$("#changePictureDialog").dialog('close');
						} else {
							errorMessageArea.text(response.result_string).show();
						}
					});
					$("#changePictureDialog").dialog('close');
				},
				'キャンセル': function() {
					$("#changePictureDialog").dialog('close');
				}
			},
			open: function() {
				$(".ui-dialog-buttonpane button:first").addClass("pull-left");
			}
		});
	});

  $('.form_item a.edit').click(function() {
    $(this).parent().parent().find('.detail_info_msg').addClass('hide');
    $(this).parent().parent().find('.detail_error_msg').addClass('hide');
    $(this).parent().parent().find('.edit').addClass('hide').hide(); //css('display', 'none');
    $(this).parent().parent().find('.save').removeClass('save').addClass('save-clear').show(); //css('display', 'inline-block');

    $("#info-form").validate({
      rules: {
        displayName: {
          required: true,
          maxlength: 128
        },
        jobTitle: {
          maxlength: 64
        }
      },
      submitHandler: function() {
        const oldDisplayName = $('#oldDisplayName').val();
        const displayName = $('#displayName').val();
        const oldJobTitle = $('#oldJobTitle').val();
        const jobTitle = $('#jobTitle').val();
        const oldGroupid = $('#oldGroupid').val();
        const groupid = $('#groupid').val();
        if (oldDisplayName === displayName && oldJobTitle === jobTitle) {
          $("#info-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
          $("#info-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
          return;
        }
        const data = new FormData();
        data.set('mode', 'nametitle');
        data.set('displayName', displayName);
				data.set('groupid', groupid);
				data.set('groupName', $('#groupid option:selected').text());
        data.set('jobTitle', jobTitle);
        fetch('./updateuserinfo.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
        .then((res) => res.json())
        .then((response) => {
          if (response.result == 0) {
            $('#dispDisplayName').text(displayName);
						$('#dispGroup').text($('#groupid option:selected').text());
						$("#groupid").val(groupid);
            $('#dispJobTitle').text(jobTitle);
            $('#oldDisplayName').text(displayName);
            $('#oldJobTitle').text(jobTitle);
            $('#oldgroupid').text(groupid);
            $("#info-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
            $("#info-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
          } else {
            $('#info-form .detail_error_msg').text(response.result_string);
            $('#info-form .detail_error_msg').removeClass('hide');
          }
        }).catch((reason) => {
          $('#info-form .detail_error_msg').text(reason);
          $('#info-form .detail_error_msg').removeClass('hide');
        });
      }
    });
  });

  $("#meeting-form").validate({
    rules: {
      meetingId: {
        required: true,
        minlength: 11,
        maxlength: 11
      }
    },
    submitHandler: function() {
      const oldMeetingId = $('#oldMeetingId').val();
      const meetingId = $('#meetingId').val();
      if (oldMeetingId === meetingId) {
        $("#meeting-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
        $("#meeting-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        return;
      }
      const data = new FormData();
      data.set('mode', 'meeting');
      data.set('meetingId', meetingId);
      fetch('./updateuserinfo.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
      .then((res) => res.json())
      .then((response) => {
        if (response.result == 0) {
          $('#dispRealMeeting').text(meetingId);
          $('#dispMarkMeeting').text('*******'+meetingId.substring(7));
          $('#oldMeetingId').text(meetingId);
          $("#meeting-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
          $("#meeting-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        } else {
          $('#meeting-form .detail_error_msg').text(response.result_string);
          $('#meeting-form .detail_error_msg').removeClass('hide');
        }
      }).catch((reason) => {
        $('#meeting-form .detail_error_msg').text(reason);
        $('#meeting-form .detail_error_msg').removeClass('hide');
      });
    }
  });

  $("#mail-form").validate({
    rules: {
      newEmail: {
        required: true,
        email: true,
        maxlength: 128
      },
      verifyPassword: {
        required: true,
        maxlength: 255
      }
    },
    submitHandler: function() {
      const oldEmail = $('#oldEmail').val();
      const newEmail = $('#newEmail').val();
      const password = $('#verifyPassword').val();
      if (oldEmail === newEmail) {
        $("#mail-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
        $("#mail-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        return;
      }
      const data = new FormData();
      data.set('mode', 'change');
      data.set('newEmail', newEmail);
      data.set('password', password);
      fetch('./change_email.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
      .then((res) => res.json())
      .then((response) => {
        if (response.result == 0) {
          const parts = newEmail.split('@');
          $('#change-new-email-mark').text('***'+parts[0].substring(3)+'@'+parts[1]);
          $('#change-new-email-real').text(newEmail);
          $("#mail-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
          $("#mail-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
          $('#change_email_after').dialog({
            modal: true, //モーダル表示
      			title: "メールアドレス変更", //タイトル
      			resizable: false,
      	    width: "auto",
      			buttons: { //ボタン
              "確認メールを再送信": function() {
                data.set('mode', 'change');
                data.set('newEmail', newEmail);
                data.set('password', password);
                fetch('./change_email.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
                .then((res) => res.json())
                .then((response) => {
                  $('#change_email_after').dialog("close");
                  $('#mail-form .detail_info_msg').text(response.result_string);
                  $('#mail-form .detail_info_msg').removeClass('hide');
                }).catch((reason) => {
                  $('#mail-form .detail_error_msg').text(reason);
                  $('#mail-form .detail_error_msg').removeClass('hide');
                });
              },
              "このリクエストをキャンセルする": function() {
                data.set('mode', 'cancel');
                data.set('newEmail', newEmail);
                data.set('password', password);
                fetch('./change_email.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
                .then((res) => res.json())
                .then((response) => {
                  $('#change_email_after').dialog("close");
                  $('#mail-form .detail_info_msg').text(response.result_string);
                  $('#mail-form .detail_info_msg').removeClass('hide');
                }).catch((reason) => {
                  $('#mail-form .detail_error_msg').text(reason);
                  $('#mail-form .detail_error_msg').removeClass('hide');
                });
              },
              "閉じる": function() {
                $('#change_email_after').dialog("close");
              }
      			}
          });
        } else {
          $('#mail-form .detail_error_msg').text(response.result_string);
          $('#mail-form .detail_error_msg').removeClass('hide');
        }
      }).catch((reason) => {
        $('#mail-form .detail_error_msg').text(reason);
        $('#mail-form .detail_error_msg').removeClass('hide');
      });
    }
  });

  $("#date-form").validate({
    rules: {
    },
    submitHandler: function() {
      const oldDateFormat = $('#oldDateFormat').val();
      const dateFormat = $('#dateFormat').val();
      if (oldDateFormat === dateFormat) {
        $("#date-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
        $("#date-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        return;
      }
      const data = new FormData();
      data.set('mode', 'date');
      data.set('dateFormat', dateFormat);
      fetch('./updateuserinfo.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
      .then((res) => res.json())
      .then((response) => {
        if (response.result == 0) {
          $('#oldDateFormat').text(dateFormat);
          $("#date-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
          $("#date-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        } else {
          $('#date-form .detail_error_msg').text(response.result_string);
          $('#date-form .detail_error_msg').removeClass('hide');
        }
      }).catch((reason) => {
        $('#date-form .detail_error_msg').text(reason);
        $('#date-form .detail_error_msg').removeClass('hide');
      });
    }
  });

  $("#pass-form").validate({
    rules: {
      oldPassword: {
        required: true,
        maxlength: 255
      },
      newPassword: {
        required: true,
        minlength: 8,
        maxlength: 255
      },
      confirmPassword: {
        required: true,
        equalTo: '[name=newPassword]',
        maxlength: 255
      }
    },
    submitHandler: function() {
      const oldPassword = $('#oldPassword').val();
      const newPassword = $('#newPassword').val();
      if (oldPassword === newPassword) {
        $("#pass-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
        $("#pass-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        return;
      }
      const data = new FormData();
      data.set('oldPassword', oldPassword);
      data.set('newPassword', newPassword);
      fetch('./savepwd.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
      .then((res) => res.json())
      .then((response) => {
        if (response.result == 0) {
          $("#pass-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
          $("#pass-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
          $('#pass-form .detail_info_msg').text(response.result_string);
          $('#pass-form .detail_info_msg').removeClass('hide');
        } else {
          $('#pass-form .detail_error_msg').text(response.result_string);
          $('#pass-form .detail_error_msg').removeClass('hide');
        }
      }).catch((reason) => {
        $('#pass-form .detail_error_msg').text(reason);
        $('#pass-form .detail_error_msg').removeClass('hide');
      });
    }
  });

  $("#host-form").validate({
    rules: {
      newHostKey: {
        required: true,
        minlength: 6,
        maxlength: 8
      }
    },
    submitHandler: function() {
      const oldHostKey = $('#oldHostKey').val();
      const newHostKey = $('#newHostKey').val();
      if (oldHostKey === newHostKey) {
        $("#host-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
        $("#host-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        return;
      }
      const data = new FormData();
      data.set('mode', 'hostkey');
      data.set('oldHostKey', oldHostKey);
      data.set('hostKey', newHostKey);
      fetch('./updateuserinfo.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
      .then((res) => res.json())
      .then((response) => {
        if (response.result == 0) {
          $("#host-form").find('.edit').removeClass('hide').show(); //css('display', 'none');
          $("#host-form").find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
        } else {
          $('#host-form .detail_error_msg').text(response.result_string);
          $('#host-form .detail_error_msg').removeClass('hide');
        }
      }).catch((reason) => {
        $('#host-form .detail_error_msg').text(reason);
        $('#host-form .detail_error_msg').removeClass('hide');
      });
    }
  });

  $('.form_item a.submit').click(function() {
    const form = $(this).attr('name');
    $('#'+form).submit();
  });

  $('.form_item a.cancel').click(function() {
    $(this).parent().parent().find('.edit').removeClass('hide').show(); //css('display', 'none');
    $(this).parent().parent().find('.save-clear').removeClass('save-clear').addClass('save').hide(); //css('display', 'inline-block');
  });

  if ($('#sipServer').val() !='' && $('#sipUsername').val() != '' && $('#sipAuthuser').val() != '' && $('#sipDisplayname').val() != '' && $('#sipPassword').val() != '') {
  	window.setSipcallSetupCB(function() {
  		window.sipLogin($('#sipServer').val(), $('#sipUsername').val(), $('#sipAuthuser').val(), $('#sipDisplayname').val(), $('#sipPassword').val(), $('#sipRegisterset').val(),
  			function() {
  			},
  			function(error) {
  				errorDialog(error);
  			});
  	});
  }
});
