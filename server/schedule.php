<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="jp-JP">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# zoomvideocall: http://ogp.me/ns/fb/zoomvideocall#">
<title>ミーティングを予定 - Room</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0">
<link type="text/css" rel="stylesheet" href="common/reset.css">
<link type="text/css" rel="stylesheet" href="common/common.css">
<link type="text/css" rel="stylesheet" href="common/form_layout.css">

<link type="text/css" rel="stylesheet" href="common/all.css">
<link rel="stylesheet" type="text/css" href="common/select2.css">
<link rel="stylesheet" type="text/css" href="common/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="common/meeting.css">
<link rel="stylesheet" type="text/css" href="common/style.css">
<link rel="stylesheet" type="text/css" href="common/hr-vue-component.css">
<link rel="stylesheet" type="text/css" href="common/upload.css">
<link rel="stylesheet" type="text/css" href="common/common4whenAndDuring.css">
<link rel="stylesheet" type="text/css" href="common/unite-style-for-form.css">
<link rel="stylesheet" type="text/css" href="common/meeting4interpretation.css">
<link rel="stylesheet" type="text/css" href="common/meeting_delete_dialog.css">
<link rel="stylesheet" type="text/css" href="common/notification.css">
<link rel="stylesheet" type="text/css" href="common/hr-components.css">
<link rel="stylesheet" type="text/css" href="common/layout.css">
<style>
#content_container {
  padding-top:8px;
}
@media(max-width:480px) {
  #content_container {
    padding-top:58px;
  }
}
@media screen and (min-width :767px) {
  #content_container{
    padding-top:90px;
  }
}
@media screen and (min-width :1024px) {
  #content_container{
    padding-top:128px;
  }
}
</style>
<!--
<script src="common/csrf_js"></script>
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'country': 'jp'
});
//ZOOM-163677
window.sctyName = '{"TW":"country.TW-TW","CN":"country.CN"}';
</script>
<script type="text/javascript">
var resourceAccountIdRoutingURl = "";
resourceAccountIdRoutingURl = resourceAccountIdRoutingURl==""?undefined:resourceAccountIdRoutingURl;
</script>
-->
<script>
var isFreeAccount = true;
var SB = {
  version: '4.0.94019.0710.536cac72',
  contextPath: '',
  baseUrl: 'https://room.asj.ne.jp',
  baseStaticUrl: 'https://room.asj.ne.jp',
  loggedIn: true,
  stype: '100',
  sourceFrom: '0',
  user: {
    userType: '1',
    userRole: '0',
    firstName: '',
    email: 'admin@asj.ad.jp'
  },
  fbLoggedIn: false,
  fbAppkey: '113289095462482',
  fbAppPage: 'https://apps.facebook.com/zoomvideocall/',
  fbScope: 'email,public_profile',
  pardotPaymentUrl : 'https://go.pardot.com/l/84442/2015-07-23/mw5t',
  pardotBuyUrl : 'https://go.pardot.com/l/84442/2015-07-14/4xht',
  pardotSubscriptionUrl : 'https://go.pardot.com/l/84442/2015-07-23/mv5y',
  pardotActivateUserUrl : 'https://go.pardot.com/l/84442/2015-10-23/mspcv',
  noSignup: 'false',
  languagePref: 'jp-JP',
  isGDPRCountry: false
};
</script>
<script type="text/javascript" src="common/all.js"></script>
<script type="text/javascript" src="common/jquery.js"></script>
<script type="text/javascript" src="common/jquery-ui.js"></script>
<script type="text/javascript" src="common/jquery-datepicker-acc.js"></script>
<script type="text/javascript" src="common/date_time_common.js"></script>
<script type="text/javascript" src="common/date_time.js"></script>
<script type="text/javascript" src="common/meetings.js"></script>
<script type="text/javascript" src="common/lodash.js"></script>
<script type="text/javascript" src="common/upload.js"></script>
<script type="text/javascript" src="common/interpretation.js"></script>
<script type="text/javascript" src="common/select2.js"></script>
<script type="text/javascript" src="common/combobox.js"></script>
<script type="text/javascript" src="common/hr_plugin.js"></script>
<script type="text/javascript" src="common/vue.js"></script>
<script type="text/javascript" src="common/hr-components.js"></script>
<script type="text/javascript" src="common/new_recurrence_tools.js"></script>
<script type="text/javascript" src="common/public_calendar_warning.js"></script>
<script type="text/javascript" src="common/vue-dragging.js"></script>
<script type="text/javascript" src="common/breakoutRoomDialog.js"></script>
<script type="text/javascript" src="common/meeting-vue.js"></script>
<script type="text/javascript" src="common/password.js"></script>
<script async="" id="__ada" data-handle="zoom" src="common/embed.js"></script>
<script async="" id="ze-snippet" src="common/snippet.js"> </script>
<script type="text/javascript" src="common/wootric-sdk.js"></script>
<script type="text/javascript" src="common/pbxSideMenu.js"></script>
<script type="text/javascript" src="common/notification.js"></script>
<script type="text/javascript" src="common/form_custom.js"></script>
<script type="text/javascript" src="common/member_add.js"></script>
<script type="text/javascript" src="janus.js" ></script>
<script type="text/javascript" src="videocall.js" ></script>
<script type="text/javascript">
$.datepicker._lastInput = '1970-01-01';
jQuery(function($){
  $.datepicker.regional['jp-JP'] = {
    closeText: '完了',
    prevText: '前へ',
    nextText: '次へ',
    currentText: "今日",
    monthNames: ['1月','2月','3月','4月','5月','6月', '7月','8月','9月','10月','11月','12月'],
    monthNamesShort: ['1月','2月','3月','4月','5月','6月', '7月','8月','9月','10月','11月','12月'],
    dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    dayNamesShort: ['日','月','火','水','木','金','土'],
    dayNamesMin: ['日','月','火','水','木','金','土'],
    weekHeader: '週',
    dateFormat: 'mm/dd/yy'
  };
  $.extend($.datepicker.regional['jp-JP'], {showMonthAfterYear: true});
  $.datepicker.setDefaults($.datepicker.regional['jp-JP']);
  $.datepickeracc._monthNames = ['1月','2月','3月','4月','5月','6月', '7月','8月','9月','10月','11月','12月'];
});

$(window).on("load", function() {
	attachedcb = function() {
		registerUsername('2_管理者');
	};
	
	acceptcallcb = function() {
		loadBlockUI(function() {
			$('#videocall').removeClass('hide').show();
		});
		$('#hangup').click(function(){
			doHangup();
			$('#videocall').addClass('hide').hide();
		})
	}

	if ($("#interpreters_info").length > 0) {
		window.interpreterInfoVue = new Vue({
			el: "#interpreters_info",
			data: {
				list: interpreterInfos,
				id: currentId,
				languages: languageInfos
			},
			methods: {
				addInterpreter: function() {
					this.list.push({
						id: this.id,
						email: "",
						firstLanguage: "US",
						secondLanguage: ""
					});
					this.id = this.id + 1;
					this.$nextTick(function() {
						var a = $("input[name='interpreter_email']").length;
						if (a >= 1) {
							a = a - 1;
							this.$refs.inputEmail[a].focus()
						}
					})
				},
				deleteInterpreter: function(a) {
					this.list.splice(a, 1);
					$("#add_interpreter_button").focus()
				},
				generatorId: function(a) {
					return "interpreter_" + a
				},
				getClassName: function(a) {
					return "language-" + this.languages[a].key.toLowerCase() + "-button language-button"
				},
				genEmailId: function(a) {
					return "interpreter_email_" + a
				},
				getFirLanguageId: function(a) {
					return "first_Language_" + a
				},
				getSecLanguageId: function(a) {
					return "second_language_" + a
				},
				selectChange: function() {},
				convertNative: function(e) {
					var a = e.split("\\u");
					var b = a[0];
					for (var c = 1; c < a.length; c++) {
						var d = a[c];
						b += String.fromCharCode(parseInt("0x" + d.substring(0, 4)));
						if (d.length > 4) {
							b += d.substring(4, d.length)
						}
					}
					return b
				}
			},
			mounted: function() {
				$("#interpreters_info").removeClass("hideme")
			}
		})
	};

  var isCDNblocked = readCookie("_zm_cdn_blocked");
  var blk = "unlog_blk";
  var unblk = "unlog_unblk";
  blk = "log_blk";
  unblk = "log_unblk";
  if (isCDNblocked === null || (isCDNblocked !== blk && isCDNblocked !== unblk)) {
    var image = new Image();
    delCookie("_zm_cdn_blocked");
    var timer = setTimeout(function () {
      image.onload = null;
      createCookie("_zm_cdn_blocked", blk, 0.25);
      window.location.reload(true);
    }, 10000);
    image.onload = function () {
      clearTimeout(timer);
      createCookie("_zm_cdn_blocked", unblk, 0.25);
    };
    image.onerror = function () {
      clearTimeout(timer);
      createCookie("_zm_cdn_blocked", blk, 0.25);
      window.location.reload(true);
    };
    var url = document.getElementById("detect").value;
    image.src = url;
  }

	$('#recurrenceType').on('change', function(e) {
		recurrenceTypeVue.recurrenceType = $('#recurrenceType').val();
		RecurrenceTools.recurrenceTypeChanged(e);
	})

	$('#save-meeting').on('click', function(e) {
		const data = new FormData();
		data.set('title', document.querySelector('#topic').value);
		data.set('memo', document.querySelector('#agenda').value);

		if ($('#start_date').length > 0) {
			var ampm = $('#start_time_2');
			data.set('ampm', ampm);
			var fmt = $.cookie("_zm_date_format");
			try {
				var dt = $.datepicker.parseDate(fmt, $('#start_date').val());
				var tm = $('#start_time').val();
				var dtm = $.datepicker.formatDate("yy-mm-dd", dt) + ' ' + tm + ':00';
				data.set('date_time', dtm);
			} catch (b) {
				refreshDateFormatCookie()
			}
		} else {
			data.set('ampm', 'AM');
			data.set('date_time', '1971-01-01 00:00:00');
		}

		var duration = '01:00:00';
		if ($('#duration_hr').length > 0) {
			duration = $('#duration_hr').val() + ':' + $('#duration_min').val() + ':00';
		}
		data.set('duration', duration);

		if ($('#recurrenceType').length > 0) {
			var rt = $('#recurrenceType').val().toLowerCase();
			if (!$('#option_rm')[0].checked) {
				rt = 'norepeat';
			}
		} else {
			rt = 'norepeat';
		}
		data.set('recurrence_type', rt);

		var di = $('#dailyInterval').val();
		data.set('daily_interval', di);

		var wi = $('#weeklyInterval').val();
		data.set('weekly_interval', wi);

		var mi = $('#monthlyInterval').val();
		data.set('monthly_interval', mi);

		var weekdays = '';
		var days = document.getElementsByName('weeklyWeekDays');
		for (var idx = 0; idx < days.length; ++idx) {
			var day = days[idx];
			if (day.checked) {
				switch (day.value) {
					case '1':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'sun';
						break;
					case '2':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'mon';
						break;
					case '3':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'tue';
						break;
					case '4':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'wed';
						break;
					case '5':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'thu';
						break;
					case '6':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'fri';
						break;
					case '7':
						if (weekdays != '') {
							weekdays += ',';
						}
						weekdays += 'sat';
						break;
				}
			}
		}
		data.set('weekly_dotw', weekdays);

		var monthlyBy = 'byday';
		if ($('#byMonyhDay').length > 0) {
			var bmd = $('#byMonyhDay').prop('checked');
			var bwd = $('#byWeekDay').prop('checked');
			if (bmd) {
				monthlyBy = $('#byMonyhDay').val().toLowerCase();
			} else {
				monthlyBy = $('#byWeekDay').val().toLowerCase();
			}
		}
		data.set('monthly_by', monthlyBy);

		var monthlyDay = '1';
		if ($('monthlyByDay').length > 0) {
			monthlyDay = $('monthlyByDay').val();
		}
		data.set('monthly_day', monthlyDay);

		var dayIndex = '1';
		if ($('#montlyByWeekdayIndex').length > 0) {
			dayIndex = $('#montlyByWeekdayIndex').val();
		}
		data.set('monthly_weekday_index', dayIndex);

		var weekDay = 'sun';
		if ($('#montlyByWeekday').length > 0) {
			weekDay = $('#montlyByWeekday').val();
		}
		data.set('monthly_week_day', weekDay);

		var endBy = 'end_datetime';
		if ($('#endByDateTime').length > 0) {
			var ebdt = $('#endByDateTime').prop('checked');
			var ebtm = $('#endByTimes').prop('checked');
			if (ebdt) {
				endBy = $('#endByDateTime').val().toLowerCase();
			} else {
				endBy = $('#endByTimes').val().toLowerCase();
			}
		}
		data.set('end_by', endBy);

		if ($('#endDate').length > 0) {
			try {
				var dt = $.datepicker.parseDate(fmt, $('#endDate').val());
				var dtm = $.datepicker.formatDate("yy-mm-dd", dt) + ' 23:59:59';
				data.set('end_date', dtm);
			} catch (b) {
				refreshDateFormatCookie()
			}
		} else {
			data.set('end_date', '');
		}

		var endTimes = '1';
		if ($('#endTimes').length > 0) {
			endTimes = $('#endTimes').val();
		}
		data.set('end_times', endTimes);

		var users = $('ul.member_addlist#member_add_list li');
		if (users.length > 0) {
			for (var idx = 0; idx < users.length; ++idx) {
				var user = users[idx];
				if (data.get('room_users[]')) {
					data.append('room_users[]', user.value);
				} else {
					data.set('room_users[]', user.value);
				}
			}
		} else {
			data.set('room_users[]', '2');
		}

		var schedulewithpmi;
		var ooti = $('#optionOneTimeId').prop('checked');
		var oswp = $('#optionScheduleWithPMI').prop('checked');
		if (ooti) {
			schedulewithpmi = $('#optionOneTimeId').val();
		} else {
			schedulewithpmi = $('#optionScheduleWithPMI').val();
		}
		data.set('schedule_with_pmi', schedulewithpmi);

		var whichPass;
		var mp = $('#meeting_password').prop('checked');
		var lp = $('#login_password').prop('checked');
		if (mp) {
			whichPass = $('#meeting_password').val();
		} else {
			whichPass = $('#login_password').val();
		}
		data.set('which_pass', whichPass);

		var meetingPass = $('#meeting_pass').val();
		data.set('meeting_pass', meetingPass);

		var videoHost;
		var ovhn = $('#option_video_host_on').prop('checked');
		var ovhf = $('#option_video_host_off').prop('checked');
		if (ovhn) {
			videoHost = $('#option_video_host_on').val();
		} else {
			videoHost = $('#option_video_host_off').val();
		}
		data.set('video_host', videoHost);

		var videoParticipants;
		var ovpn = $('#option_video_participant_on').prop('checked');
		var ovpf = $('#option_video_participant_off').prop('checked');
		if (ovpn) {
			videoParticipants = $('#option_video_participant_on').val();
		} else {
			videoParticipants = $('#option_video_participant_off').val();
		}
		data.set('video_participants', videoParticipants);

		var omue = $('#option_mute_upon_entry').prop('checked');
		data.set('mute_upon_entry', omue?'1':'0');

		var oal = $('#option_autorec_local').prop('checked');
		data.set('autorec_local', oal?'1':'0');

		fetch('./new_schedule.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
		.then((res) => res.json())
		.then((response) => {
			if (response.result == 0) {
				//infoDialog('登録完了', response.result_string, 'schedule.php');
				SB.showSuccessMsg($.i18n.get("meeting.schedule_success"));
			} else {
				SB.alert(response.result_string);
			}
		}).catch((reason) => {
			SB.alert(reason);
		});
	});

	/* check meeting password rule */
  $("#meeting_pass").keyup(function(event){
    var keyCode = event.keyCode;
    // tab || shift
    if (keyCode == 9 || keyCode == 16) {
      return;
    }
    $("#meetingPassTipsAudio").text("");
    // ArrowDown
    if (keyCode == 40) {
      $("#meetingPassTipsAudio").text(tipsAudio);
    }
    checkPassword($(this));
  });
  $("#meeting_pass").focusin(function(){
    checkPassword($("#meeting_pass"));
    $("#meetingPassTipsAudio").text(tipsAudio);
    $(this).attr("aria-describedby", "meetingPassTipsAudio");
    $("#weakPasswordDetectionTips").hide();
    $("#password_container").removeClass("has-error");
  });
  $("#meeting_pass").blur(function(){
    if (!$(this).val()) {
      $("#passwordErrorTips").hide();
    } else if (passErrorCount > 0) {
      $("#passwordErrorTips").show();
    }
    $("#weakPasswordDetectionTips").hide();
    $("#password_container").removeClass("has-error");
  });
  $("#optionScheduleWithPMI").click(function(){
    $("#passwordErrorTips").hide();
    $("#weakPasswordDetectionTips").hide();
    $("#password_container").removeClass("has-error");
    });
    $("#option_password").click(function () {
    $("#passwordErrorTips").hide();
    $("#weakPasswordDetectionTips").hide();
    $("#password_container").removeClass("has-error");
  });
	$('.dropdown-language').delegate('.dropdown-menu a' , 'click', function(e) {
    var userId = 'YZesY2FvTZ6di73I3_yVug';
    var locale = $(this).data('locale');
    if (userId != "") {
      SB.post3({
        url: '/profile/saveLocale',
        data: {userId: userId, locale: locale},
        success: function(response) {}
      });
    }
  });
	renderNotification();
});

function ready(callback) {
  if (document.readyState !== 'loading') callback();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  else document.attachEvent('onreadystatechange', function () {
    if (document.readyState === 'complete') callback();
  });
}
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();
  }
  else var expires = "";
  //document.cookie = name + "=" + value + expires + "; path=/; secure=true; domain=" + ".zoom.us";
	document.cookie = name + "=" + value + expires + "; path=/; secure=true";
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
function delCookie(name) {
  createCookie(name,"",-1);
}
</script>
<script src="common/i18n.js"></script>
<script src="common/timezones.js"></script>
<script type="application/javascript">
var myDisablePMI = false;
var disablePMI = myDisablePMI;
var times = ["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];
var hours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
var minutes = ["0","15","30","45"];
var timezones = [];
_.forEach(timeZones,function (value, key) {
  timezones.push({"key": key, "val": value});
});
var RecurrenceTools = {};
new Vue({
  el:"#password_container",
  data:{},
  mounted: function () {
    this.$nextTick(function () {
      $("#password_container").css("display", "inline-block");
      $("#password_container .zm-popover__reference").attr("tabindex", "-1");
    })
  }
});
var passErrorCount = 0;
// onlyNumberRule：Only allow numeric password
var onlyNumberRule = $("#onlyNumberRule").val();
// lengthRule：Have at least {0} characters
var lengthRule = $("#lengthRule").val();
// alpabetRule：Have at least 1 letter (a, b, c...)
var alpabetRule = $("#alpabetRule").val();
// numberRule：Have at least 1 number (1, 2, 3...)
var numberRule = $("#numberRule").val();
// specialRule：Have at least 1 special character (!, @, #...)
var specialRule = $("#specialRule").val();
// upperAndLowerCharRule: Include both Upper case and Lower case characters
var upperAndLowerCharRule = $("#upperAndLowerCharRule").val();
// consecutiveRule: Cannot contain consecutive characters (e.g. “11111”, “12345”, “abcde”, or “qwert”)
var consecutiveRule = $("#consecutiveRule").val();
// tips audio
var tipsAudio = "";

function checkPassword(passInput) {
  passErrorCount = 0;
  if (!$("#option_password").prop('checked')) {
    return
  }
  var passIsOk;
  tipsAudio = $("#pwdMust").text();
  if (onlyNumberRule == 'true') {
    passIsOk = SB.validateOnlyNumberRule(passInput, $(".onlyNumberRule"));
    if (!passIsOk) {
      passErrorCount++;
      tipsAudio += $(".onlyNumberRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".onlyNumberRule").text() + "[Met]";
    }
  }
  if (lengthRule > 0) {
    passIsOk = SB.validateLengthRule(passInput, $(".lengthRule"), lengthRule);
    if (!passIsOk) {
      passErrorCount++;
      tipsAudio += $(".lengthRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".lengthRule").text() + "[Met]";
    }
  }
  if (alpabetRule == 'true') {
    passIsOk = SB.validateAlpabetRule(passInput, $(".alpabetRule"));
    if (!passIsOk) {
      passErrorCount++;
      tipsAudio += $(".alpabetRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".alpabetRule").text() + "[Met]";
    }
  }
  if (numberRule == 'true') {
    passIsOk = SB.validateNumberRule(passInput, $(".numberRule"));
    if (!passIsOk) {
      passErrorCount++;
      tipsAudio += $(".numberRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".numberRule").text() + "[Met]";
    }
  }
  if (specialRule == 'true') {
    passIsOk = SB.validateSpecialRule(passInput, $(".specialRule"));
    if (!passIsOk) {
      passErrorCount++;
      tipsAudio += $(".specialRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".specialRule").text() + "[Met]";
    }
  }
  if (upperAndLowerCharRule == 'true'){
    passIsOk = SB.validateCombineRule(passInput, $(".upperAndLowerCharRule"));
    if(!passIsOk){
      passErrorCount++;
      tipsAudio += $(".upperAndLowerCharRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".upperAndLowerCharRule").text() + "[Met]";
    }
  }
  if (consecutiveRule > 0){
    passIsOk = SB.validateNewConsecutiveRule(passInput, $(".consecutiveRule"), consecutiveRule, true);
    tipsAudio += $("#pwdMustNot").text();
    if(!passIsOk){
      passErrorCount++;
      tipsAudio += $(".consecutiveRule").text() + "[Not Met]";
    } else {
      tipsAudio += $(".consecutiveRule").text() + "[Met]";
    }
  }
  if (passErrorCount == 0) {
    $("#passwordErrorTips").hide();
  }
}
</script>

<script type="application/javascript">
var languages = {"US":"英語","CN":"中国語","JP":"日本語","DE":"ドイツ語","FR":"フランス語","RU":"ロシア語","PT":"ポルトガル語","ES":"スペイン語","KR":"韓国語","IT":"Italian","VN":"Vietnamese"};
var languageInfos = [];
_.forEach(languages,function (value, key) {
  languageInfos.push({"key": key, "val": value});
});
var interpreterInfos = [{id :1, email:'', firstLanguage:'US', secondLanguage:''}];
var currentId=2;
var mockRoomList = {};
var roomList=[];
_.forEach(mockRoomList,function (value, key) {
  roomList.push({"name": key, "value": value});
});
</script>

<!--[if gt IE 8]><!-->
<script type="text/javascript">
var urlMapping = {
  "/profile" : "my_profile",
  "/meeting" : "my_meetings",
  "/recording" : "my_recordings",
  "/join" : "join_meeting",
  "/j" : "join_meeting",
  "/signup" : "signup_newuser",
  "/forgot_password" : "forgot_password",
  "/billing" : "account_billing",
  "/webinar/list" : "my_webinar"
};
window.zESettings = {webWidget: {}};
window.zESettings.webWidget.chat = {};
window.zESettings.webWidget.chat.connectOnPageLoad=false;
window.adaSettings = {
  adaReadyCallback: function (props) {
    if (props.isRolledOut === false) {
      setTimeout(function(){
        try {
          document.getElementById('ada-embed').style.display = 'none';
          document.querySelector('.ada-embed-button-container').style.display = 'none';
        } catch (error) {}
        window.zESettings.webWidget.authenticate = {
          chat: {
            jwtFn: function(callback) {
              var isIE = false;
              if (isIE) {
                $.ajax({
                  type: "GET",
                  url: "/zendesk/chat_jwt",
                  dataType: 'text',
                  success: function(response) {
                    callback(response);
                  }
                });
              } else {
                fetch("/zendesk/chat_jwt", {
                  method: 'get',
                  headers: {"X-Requested-With": "XMLHttpRequest"}
                }).then(function(res) {
                  res.text().then(function(jwt) {
                    callback(jwt);
                  });
                });
              }
            }
          }
        };
        window.zESettings.webWidget.chat.suppress = true;
        zE(function() {
          zE.identify({
            name: "管理者",
            email: "admin@asj.ad.jp"
          });
          zE.activateIpm();
          zE.setLocale('ja');
          if (urlMapping['\/meeting/schedule']){
            zE.setHelpCenterSuggestions({ labels: [urlMapping['\/meeting/schedule']] });
          } else {
            var execUrl = /\/j\/(\d+)(\?\w+=[^ ]*)?/ig.exec('\/meeting/schedule');
            if (execUrl && execUrl.length){
              zE.setHelpCenterSuggestions({ labels: ['join_meeting'] });
            }
          }
        });
      });
    } else {
      zE('webWidget', 'hide');
    }
  },
  authCallback: function(callback) {
    var isIE = false;
    if (isIE) {
      $.ajax({
        type: "GET",
        url: "/zendesk/chat_jwt",
        dataType: 'text',
        success: function(response) {
          callback(response);
        }
      });
    } else {
      fetch("/zendesk/chat_jwt").then(function(res) {
        res.text().then(function(jwt){
          callback(jwt);
        });
      });
    }
  },
  hideMask: true,
  crossWindowPersistence: {enabled: true,domain: ".asj.ne.jp"},
  styles: "*{font-size: 14px !important;}",
  language: "ja",
  metaFields: {
    name: "管理者",
    email: "admin@asj.ad.jp",
    userRole: "オーナー",
    accountType: "free",
    support_chat: false,
    group: "support",
    country: "jp"
  }
}
</script>
<script type="text/javascript">
window.wootricSettings = {
email: "admin@asj.ad.jp", // TODO: The current logged in user's email address. OPTIONAL
  created_at: "1558938123", // ZOOM-89023 Update needed: "created_at" Key in Wootric Snippet
  account_token: "NPS-0487a3ac", // This is your unique account token.
  properties: {
  pricing: "Grey",
  domain: "",
  age: "412",
  baa: "Red",
  paidhostnum: "0",
  zoomroomsnum: "0",
  audio: "Red",
  webinar: "Red",
  lmcapacity: "Red",
  sso: "Red",
  managedomain: "Red",
  zoomphone:"Red",
  zoomrooms:"Red"
  }
};
window.wootric('run');
</script>
<!--<![endif]-->
<script type="text/javascript">
/*Past Due Invoice Message*/
SB.showPastDueMessage();
var cookieLang = $.cookie('_zm_lang');
if (cookieLang == "" || cookieLang == null) {
  $.cookie('_zm_lang', "jp-JP", {expires: 365, path: '/', secure: true});
}
</script>
<script type="text/javascript">
function getNotice(notice) {
  var priorityClass = '';
  switch (notice.color) {
    case '1':
    	priorityClass = 'notice-low';
    	break;
    case '2':
    	priorityClass = 'notice-medium';
    	break;
    case '3':
    	priorityClass = 'notice-high';
    	break;
    default:
    	priorityClass = 'notice-low';
    	break;
  }
  return '<div id=' + notice.id + ' class="notice-wrapper">' +
    '<div class="notice-container ' + priorityClass + '" aria-labelledby="noticeTitle" aria-describedby="noticeContent" tabindex="0" role="contentinfo">' +
    '<div class="notice-main-content" id="noticeContent">' +
    '<div class="notice-title" id="noticeTitle">' + notice.title + '</div>' +
    ' ' + notice.content +
    '</div>' +
    '<button class="notice-close" data-id=' + notice.id + ' tabindex="0" aria-label="Close Notice"></button>' +
    '</div>' +
    '</div>';
}
function renderNotification() {
	/*
  SB.post("/marketnotice/bar", {},
  function(response) {
    if (response.result !== null && response.result.length !== 0 && response.status) {
      var noticeSlot = $('#notice-slot');
      response.result.forEach(function(item){
        var notice = getNotice(item);
        noticeSlot.append(notice);
      })
      noticeSlot.find('.notice-wrapper').slideToggle('1000');
      setTimeout(function () {
        $(document).trigger('notice-show');
      }, 1000)
      $('.notice-close').click(function(event) {
        var noticeId = event.target.getAttribute('data-id');
        SB.post("/marketnotice/close", {id: noticeId});
        var noticeWrapper = $('#' + noticeId);
        noticeWrapper.slideToggle('1000');
        setTimeout(function() {
          noticeWrapper.remove();
          $(document).trigger('notice-hide');
        }, 1000);
      });
    }
  });
	*/
}
</script>
<script type="text/javascript">
window.setModel = {
  defaultAuth:"",
  defaultAuthId:"",
  defaultType:-1,
  authInfoList:[],
  authDomain:"",
  authDomainPart:"",
  deleteAuthName:"",
  authDomainLength:0,
  authMethodLength:1,
  lockedAuth:false,
  authCheck:false,
  isUserSettingOpen:false,
  featureWatermarkEnabled:false,
  featureAudioWatermarkEnabled:false,
  JBHPriorStartMeeting:'0',
  isSingle:false
};
</script>
<script type="text/javascript">
$(function(){
  if(!('flex' in document.documentElement.style)){
    addClass(document.body, 'ie-lower');
  }
  var is_show_personal_admin = true;
  var topEl = document.getElementById('sidemenu');
  var personalNavList = document.getElementById('personal-nav-list');
  var adminNavList = document.getElementById("admin-nav-list");
  var sideNavs = document.querySelectorAll('.side-nav');
  sideNavs = [].slice.call(sideNavs);
  var keyCode = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    home: 36,
    end: 35,
    space: 32,
    enter: 13
  }
  sideNavs.forEach(function (sideNav, index) {
    var ul = sideNav.querySelector('.zm-sidenav');
    if (ul) {
      var navItems = ul.querySelectorAll('.nav-item');
      if (!is_show_personal_admin && navItems.length) {
        addClass(sideNav, 'nav-show-list');
        navItems = [].slice.call(navItems);
        navItems.forEach(function (navItem) {
          personalNavList.appendChild(navItem);
        })
      }
      navItems = ul.querySelectorAll('.nav-item');
      // don't remove element if sideNav has attribute 'jsnoremove'
      var couldRemove = !sideNav.getAttribute('jsnoremove')
      if (!navItems.length && couldRemove) {
        adminNavList.removeChild(sideNav);
        if (!adminNavList.querySelectorAll('dd').length) {
          topEl.removeChild(adminNavList);
          topEl.removeChild(document.getElementById('admin-nav-title'));
        }
      }
    }
  });
  if(is_show_personal_admin){
    var sideNavsTitles = document.querySelectorAll('.side-nav-title');
    sideNavsTitles = [].slice.call(sideNavsTitles);
    sideNavsTitles.forEach(function(title){
      addClass(title, 'nav-title-show');
    })
  }
  function prevFocus(currentNode, flag) {
    var prevNode = flag ? currentNode : currentNode.previousElementSibling;
    if(prevNode){
      if(prevNode.tagName === 'LI'){
        prevNode.querySelector('a').focus();
      } else if(prevNode.tagName === 'DD'){
        var headerNode = prevNode.querySelector(".nav-header");
        if(headerNode){
          if(!hasClass(prevNode, 'nav-active')){
            headerNode.focus();
          } else {
            prevNode.querySelector("ul").querySelector('li:last-of-type').querySelector('a').focus();
          }
        } else {
          prevNode.querySelector('a').focus();
        }
      } else if(hasClass(prevNode, 'nav-header')){
        if(hasClass(prevNode.parentNode, "nav-show-list")){
          prevFocus(prevNode.parentNode.parentNode);
        } else {
          prevNode.focus();
        }
      } else if(prevNode.tagName === 'UL'){
        prevNode.querySelector('li:last-of-type').querySelector('a').focus();
      }
    } else {
      var parentNode = currentNode.parentNode;
      if(parentNode.previousElementSibling){
        prevNode = parentNode.previousElementSibling;
        if(prevNode.tagName === 'H4'){
          prevNode = prevNode.previousElementSibling;
          if(prevNode){
            prevFocus(prevNode, true);
          }
        } else {
          if(hasClass(prevNode, 'nav-header')){
            if(hasClass(prevNode.parentNode, 'nav-show-list')){
              var dlNode = prevNode.parentNode.parentNode;
              if(dlNode.tagName === 'DL'){
                prevFocus(dlNode.previousElementSibling);
              }
            } else {
              prevNode.focus();
            }
          } else {
            if(prevNode.tagName === 'DD'){
              prevFocus(prevNode, true);
            }
          }
        }
      } else {
        var ddNode = parentNode.parentNode;
        prevFocus(ddNode);
      }
    }
  }
  function nextFocus(currentNode, flag) {
    var nextNode = flag ? currentNode : currentNode.nextElementSibling;
    if(nextNode){
      if(nextNode.tagName === 'LI'){
        nextNode.querySelector('a').focus();
      } else if(nextNode.tagName === 'DD'){
        var headerNode = nextNode.querySelector(".nav-header");
        if(headerNode){
          if(!hasClass(nextNode, 'nav-show-list')){
            headerNode.focus();
          } else {
            nextNode.querySelector("ul").querySelector('li:first-of-type').querySelector('a').focus();
          }
        } else {
          nextNode.querySelector('a').focus();
        }
      } else if(nextNode.tagName === 'UL'){
        if(hasClass(nextNode.parentNode, 'nav-active')){
          nextNode.querySelector('li:first-of-type').querySelector('a').focus();
        } else {
          var ddNode = nextNode.parentNode;
          nextFocus(ddNode);
        }
      }
    } else {
      var parentNode = currentNode.parentNode;
      if(parentNode.nextElementSibling){
        nextNode = parentNode.nextElementSibling;
        if(nextNode.tagName === 'H4'){
          nextNode = nextNode.nextElementSibling;
        }
        if(nextNode.tagName === 'DL') {
          var ddNode = nextNode.querySelector("dd:first-of-type");
          nextFocus(ddNode, true)
        } else if(nextNode.tagName === 'UL'){
          var ddNode = nextNode.parentNode;
          nextFocus(ddNode);
        }
      } else {
        var ddNode = parentNode.parentNode;
        nextFocus(ddNode);
      }
    }
  }
  function firstItemFocus(sideNav) {
    sideNav.querySelector('li:first-of-type').querySelector('a').focus();
  }
  function hasClass(el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
  }
  function addClass(el, className) {
    if (hasClass(el, className)) {
      return;
    }
    var newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  }
  function removeClass(el, className) {
    if (!hasClass(el, className)) {
      return;
    }
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    el.className = el.className.replace(reg, ' ');
  }
  var activeItem = topEl.querySelector('li.active');
  if(activeItem){
    var el = activeItem.parentNode.parentNode;
    addClass(el, 'nav-active');
    activeItem.querySelector('a').setAttribute('aria-describedby', 'current-page-describedby');
  }
  var toggleNav = function (targetEL) {
    var parentEl = targetEL.parentNode;
    if(!!parentEl.getAttribute('jsnoremove')){
      // don't toggle the element with attribute 'jsnoremove' and has no children
      if(!parentEl.querySelector('.nav-list li')) return
    }
    if (hasClass(parentEl, 'nav-active')) {
      removeClass(parentEl, 'nav-active');
      targetEL.setAttribute('aria-expanded', false);
    } else {
      addClass(parentEl, 'nav-active');
      targetEL.setAttribute('aria-expanded', true);
    }
  }
  var headers = document.querySelectorAll(".nav-header");
  for(var index = 0; index < headers.length; index++){
    headers[index].onclick = function (event) {
      toggleNav(this);
      event.stopPropagation();
      event.preventDefault();
    }
    headers[index].onkeydown = function (event) {
      switch (event.keyCode) {
        case keyCode.enter:
        case keyCode.space:
        case keyCode.left:
        toggleNav(this);
        event.stopPropagation();
        event.preventDefault();
        break;
        case keyCode.right:
        if(hasClass(this.parentNode, 'nav-active')){
          firstItemFocus(this.parentNode)
        } else {
          toggleNav(this);
        }
        break;
      }
    }
  }
  function handleHome() {
    var profileMenu = personalNavList.querySelector('li:first-child');
    profileMenu.querySelector('a') && profileMenu.querySelector('a').focus();
  }
  function handleEnd() {
    var lastSideNav = topEl.querySelector('.side-nav:last-of-type');
    if(lastSideNav){
      if(hasClass(lastSideNav, 'nav-active')){
        var ul = lastSideNav.querySelector('.zm-sidenav');
        var navItem = ul.querySelector('.nav-item:last-child');
        navItem.querySelector('a').focus();
      } else {
        var header = lastSideNav.querySelector('.nav-header');
        header && header.focus();
      }
    } else {
      var lastMenu = personalNavList.querySelector('li:last-child');
      lastMenu.querySelector('a') && lastMenu.querySelector('a').focus();
    }
  }
  function handleUp(event) {
    if(hasClass(event.target, 'nav-header')){
      prevFocus(event.target);
    } else {
      prevFocus(event.target.parentNode);
    }
  }
  function handleDown(event) {
    if(hasClass(event.target, 'nav-header')){
      nextFocus(event.target);
    } else {
      nextFocus(event.target.parentNode);
    }
  }
  function handleLeft(event) {
    if(event.target.tagName === 'A' && event.target.parentNode.tagName === 'LI'){
      var ddNode = event.target.parentNode.parentNode.parentNode;
      if(ddNode.tagName === 'DD'){
        var headerNode = ddNode.querySelector('.nav-header');
        headerNode.focus();
      }
    }
  }
  topEl.onclick = function (event) {
    removeClass(this, 'key-press-mark');
  }
  topEl.onkeydown = function (event) {
    addClass(topEl, 'key-press-mark');
    switch (event.keyCode) {
      case keyCode.home:
      handleHome();
      break;
      case keyCode.end:
      handleEnd();
      event.stopPropagation();
      event.preventDefault();
      break;
      case keyCode.up:
      handleUp(event);
      break;
      case keyCode.down:
      handleDown(event);
      event.stopPropagation();
      event.preventDefault();
      break;
      case keyCode.left:
      handleLeft(event);
      break;
      default:
      break;
    }
  }
});
function changeTspTip(isLoadPage) {
  try {
    var tspToolTip = document.getElementById("tsp-tooltip");
    if(!tspToolTip) {
      return;
    }
    var localStorage = window.localStorage;
    if (!localStorage) {
      return;
    }
    var hideTip = localStorage.getItem("hideTSPtooltip");
    if (!hideTip) {
      if (isLoadPage) {
        tspToolTip.className = "";
      } else {
        localStorage.setItem("hideTSPtooltip", "true");
        tspToolTip.className = "hideme";
      }
    }
  } catch (error){
	}
}
changeTspTip(true);
</script>
<script>
bootStrapPBXMenu({
  PbxVersionSwitch:{"pbx_1_6_0":true},
  Domain:'https://room.asj.ne.jp',
  IsAccountSetupPBX:false,
  APIVer:'v2'
},
{
  "response":{
    "cloudpbx.api.error.alreadey_assigned":"ユーザー{0}は割り当て済みです",
    "cloudpbx.api.error.not_paid_user":"基本ユーザーにはZoom Phoneにアクセスする権限がありません",
    "cloudpbx.new_telephone.no":"いいえ",
    "cloudpbx.api.error.user_not_exists":"ユーザー{0}は存在しません",
    "cloudpbx.new_telephone.confirmation":"確定",
    "cloudpbx.nodata":"データがありません",
    "cloudpbx.report.audit.log":"オペレーションログ",
    "cloudpbx.new_telephone.e911.confirm":"{{getSelectNumber()}}をあなたの会社電話番号に選択しますか?",
    "cloudpbx.new_telephone.label.houseNumberExample":"たとえば、「550 S SAN PEDRO ST」という住所の「550」は家屋番号です",
    "cloudpbx.sidemenu.calllog":"通話記録",
    "cloudpbx.new_telephone.setup_success":"正常に作成しました",
    "cloudpbx.new_telephone.cannot_user_extension_number":"この内線番号は使用できません",
    "cloudpbx.sidemenu.users":"ユーザーとルーム",
    "cloudpbx.new_telephone.placeholder.exntension_number":"内線番号(3～5桁の番号)",
    "cloudpbx.setup_user.setup_success":"セットアップ完了",
    "cloudpbx.setup_user.title":"Zoom Phoneの内線の簡単設定",
    "cloudpbx.new_telephone.yes":"はい",
    "cloudpbx.new_telephone.label.zip":"Zip/郵便番号",
    "cloudpbx.new_telephone.e911.zip":"Zipコード(郵便番号)を入力してください",
    "cloudpbx.new_telephone.label.streetAddress":"通り住所",
    "cloudpbx.webhook.notification.voice_mail":"新しい音声メールが1件あります",
    "cloudpbx.sidemenu.top.telephone.beta":"ベータ",
    "cloudpbx.new_telephone.done":"完了",
    "cloudpbx.new_telephone.e911.house_number":"家屋番号(番地)を入力してください",
    "cloudpbx.new_telephone.label.addressLine2Placeholder":"建物 #、フロア #、ユニット #、その他を入力",
    "cloudpbx.api.error.not_enable_pbx":"ご利用のアカウントはZoom Phoneプランを購入していません",
    "cloudpbx.new_telephone.e911.desc":"<p>住所は、次のステップで会社電話番号の購入を成功させる要因であるため、住所が正しいことを確認してください</p>",
    "cloudpbx.setup_user.select_title":"国名と地域コードを選択",
    "cloudpbx.new_telephone.placeholder.timezone":"タイムゾーン",
    "cloudpbx.error.invalid_extension_number":"内線番号は101～99999の範囲内で入力する必要があります",
    "cloudpbx.new_telephone.label.state":"州/都道府県",
    "cloudpbx.setup_user.number_show":"会社電話番号{0}、内線番号{1}",
    "cloudpbx.sidemenu.settings":"会社情報",
    "cloudpbx.new_telephone.label.errTip.title":"この住所は検証できませんでした。",
    "cloudpbx.api.error.dictionary.location":"州/都道府県ID ({0})を使って位置情報を取得できません",
    "cloudpbx.api.error.already_enable_pbx":"ご利用のアカウントはZoom Phoneプランを購入済みです",
    "cloudpbx.report.audit.log.detail":"1か月以内に管理者の操作を監査してください",
    "cloudpbx.api.error.some_zoom_user_not_exists":"一部のユーザーがZoomに存在しません。ページを更新して再試行するか、弊社サポートにご連絡ください。",
    "cloudpbx.new_telephone.e911.street_suffix":"通り名のサフィックスを入力してください",
    "cloudpbx.new_telephone.e911.state_id":"州名(都道府県)を入力してください",
    "cloudpbx.new_telephone.label.errTip.desc":"住所を確認して再度送信することができます。",
    "cloudpbx.api.error.can_not_delete_user":"このユーザーは、コールキュー担当者または自動受付担当者であるため、削除することはできません。",
    "cloudpbx.api.error.no_owner":"ご利用のアカウントは利用できません",
    "cloudpbx.sidemenu.services":"サービス",
    "cloudpbx.sidemenu.top.telephone":"Zoom Phone",
    "cloudpbx.setup_user.number_placeholder":"1～6桁の数字を入力する",
    "cloudpbx.sidemenu.dashboard":"QoSダッシュボード",
    "cloudpbx.api.error.create_jwt_exception":"JWTトークンの作成に失敗しました",
    "cloudpbx.new_telephone.label.preDirectional":"通り名の前に付ける方角",
    "cloudpbx.new_telephone.number_type.local":"ローカル",
    "cloudpbx.new_telephone.placeholder.loading":"読み込み中...",
    "cloudpbx.api.error.phonenumber.reserve":"電話番号の予約に失敗しました",
    "cloudpbx.api.error.fail_retrieve_user":"未割り当てのpbxユーザー情報を取得できません",
    "cloudpbx.new_telephone.main_company.desc":"<p>既存の会社番号を保持するために、詳細についてサポートにお問い合わせください。</p>",
    "cloudpbx.setup_user.select_country":"国/地域を選択",
    "cloudpbx.new_telephone.placeholder.select_area":"エリアを選択",
    "cloudpbx.new_telephone.label.optional":"(オプション)",
    "cloudpbx.new_telephone.label.houseNumber":"家屋番号(番地)",
    "cloudpbx.new_telephone.label.addressLine2":"住所2",
    "cloudpbx.report.user.report.detail":"一定の時間範囲における電話システムの使用状況を表示してください",
    "cloudpbx.report.user.report":"電話システム",
    "cloudpbx.new_telephone.e911.country_id":"国/地域を選択してください",
    "cloudpbx.new_telephone.e911.city":"都市名(市区町村)を入力してください",
    "cloudpbx.sidemenu.phonesdevices":"電話機とデバイス",
    "cloudpbx.new_telephone.title":"会社主電話番号を選択してください",
    "cloudpbx.sidemenu.telephone_management":"電話システム管理",
    "cloudpbx.new_telephone.title.number":"番号を選択",
    "cloudpbx.new_telephone.placeholder.select_number":"番号を選択",
    "cloudpbx.setup_user.timezone":"タイムゾーンを設定します。後でマイプロフィールで変更することもできます",
    "cloudpbx.new_telephone.label.streetSuffix":"通りのサフィックス",
    "cloudpbx.new_telephone.number_type.free":"無料通話",
    "cloudpbx.api.error.fail_get_pbx_plan_info":"アカウントのpbxプラン情報の取得に失敗しました",
    "cloudpbx.new_telephone.label.houseNumberPlaceholder":"最大6桁",
    "cloudpbx.sidemenu.setup":"セットアップ",
    "cloudpbx.api.error.can_not_change_user":"このユーザーは、コールキュー担当者または自動受付担当者であるため、変更することはできません。",
    "cloudpbx.new_telephone.label.street":"通り",
    "cloudpbx.api.error.user_not_enable_pbx":"Zoom Phoneにアクセスする権限がありません",
    "cloudpbx.api.error.not_enough_available_licenses":"使用可能なライセンスがありません",
    "cloudpbx.new_telephone.next":"次へ",
    "cloudpbx.group.enterpincode":"最大6桁",
    "cloudpbx.sidemenu.auto-receptionists":"自動受付",
    "cloudpbx.new_telephone.label.country":"国/地域",
    "cloudpbx.newtelephone.header":"ようこそ! Zoom Phoneのセットアップはほんの数分で完了します。",
    "cloudpbx.new_telephone.e911.pre_directional":"通り名の前に付ける方角を入力してください",
    "cloudpbx.sidemenu.my.telephone":"電話",
    "cloudpbx.new_telephone.placeholder.select_state":"選択",
    "cloudpbx.error.activate_param_invalid":"すべてのフィールドは記入必須です",
    "cloudpbx.api.error.dictionary.state":"国ID ({0})を使って州名/都道府県を取得できません",
    "cloudpbx.setup_user.pincode":"電話で音声メールを流すためにPINコードを設定してください。",
    "cloudpbx.webhook.notification.cancel_call":"キャンセルされた着信があります",
    "cloudpbx.api.error.phonenumber.lookup":"電話番号の取得に失敗しました",
    "cloudpbx.sidemenu.phonenumbers":"電話番号",
    "cloudpbx.caller.extension":"内線",
    "cloudpbx.new_telephone.label.city":"都市名(市区町村)",
    "cloudpbx.caller.name.4":"直通番号",
    "cloudpbx.caller.name.2":"会社追加電話番号",
    "cloudpbx.new_telephone.title.extension_number":"所有者の内線番号を指定する",
    "cloudpbx.caller.name.1":"会社主電話番号",
    "cloudpbx.api.error.dictionary.country":"国の取得に失敗しました",
    "cloudpbx.new_telephone.e911.stree_name":"通り名を入力してください",
    "cloudpbx.caller.name.6":"電話番号",
    "cloudpbx.api.error.phonenumber.already_bind":"電話番号{0}は他のユーザーに既にバインドされています",
    "cloudpbx.new_telephone.e911.title":"会社主電話番号を入力してください",
    "cloudpbx.webhook.notification.incoming_call":"着信があります",
    "cloudpbx.api.error.can_not_invite_user":"このユーザーは、コールキュー担当者または自動受付担当者であるため、招待を受けることはできません。",
    "cloudpbx.sidemenu.groups":"呼び出しキュー"},
  "lang":"jp_JP"
})
</script>
</head>
<body class="fullwidth" data-cd=".asj.ne.jp">
<input type="hidden" id="zm_date_format" value="">
<div class="total-main-content">
  <div id="skiptocontent">
    <a role="complementary" aria-label="skip" href="#the-main-content">メインコンテンツまでスキップ</a>
  </div>
  <div id="header_container" class=" loggedin  zoom-newhd">
    <div id="header_outer" class="container clearfix  zoom-newhd">
      <div id="header" class="navbar navbar-default navbar-fixed-top">
        <div id="black-topbar" class="hidden-xs noanimate" role="navigation" aria-label="Resources">
          <div class="container" role="menubar">
            <ul class="list-inline pull-right" role="menubar">
              <li role="none" class="dropdown" id="resources" aria-haspopup="true">
                <a id="btnResouces" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">リソース <span class="caret"></span></a>
                <ul id="resourcesDropdown" class="dropdown-menu">
                  <li class="visible-xs divider" role="presentation"></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="container" role="banner">
          <div class="navbar-header ">
            <!--
            <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button" value="navbar">
              <span class="sr-only">ナビゲーションを起動</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <ul class="list-inline pull-right visible-xs" style="line-height: 50px;">
              <li style="padding-right: 15px;">
								<a href="./join.php" target="_blank">参加する</a>
							</li>
              <li style="padding-right: 15px;">
																<a id="mobile-host-btn" href="./room.php?roomId=3225366794&displayName=%E7%AE%A1%E7%90%86%E8%80%85" target="_blank">開催する</a>
							</li>
            </ul>
            -->
            <div class="left">
              <a class="imglink" href="./index.php"><img class="logo" src="common/RoomLogo.png" alt="Zoomのロゴ"></a>
            </div>
          </div>
          <div>
            <div class="navbar-collapse collapse" id="navbar">
              <ul class="nav navbar-nav" role="navigation" aria-label="product information">
                <li class="visible-xs divider" role="presentation"></li>
                <li role="none" class="dropdown mobile-hide" id="solution" aria-haspopup="true"></li>
                <li class="dropdown mobile-products" id="solution" aria-haspopup="true"></li>
                <li class="visible-xs divider mobile-hide" role="presentation"></li>
                <li role="none" class="dropdown mobile-industries" id="solution" aria-haspopup="true"></li>
                <li class="visible-xs divider" role="presentation"></li>
                <li role="none"></li>
                <li class="visible-xs divider" role="presentation"></li>
                <li role="none"></li>
                <li class="visible-xs divider" role="presentation"></li>
              </ul>
              <ul class="nav navbar-nav navbar-right" role="navigation" aria-label="meetings">
								<li><a role="menuitem" id="btnJoinMeeting" tracking-id="headerMenuJoin" tracking-category="NavHeader" class="hidden-xs" href="./room.php?roomId=3225366794" onclick="ga('send', 'event', 'product', 'click-nav-joinmeeting', 'Header Nav Join a Meeting');">ミーティングを開催 </a></li>
                <li class="visible-xs divider" role="presentation"></li>
								<li role="none" class="pic" id="pic">
                  <a href="javascript:;" role="button" id="avator-profile" class="profile-pic hidden-xs" aria-label="管理者, 基本" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="profile-menu">
                    <img id="headerPic" src="common/user.png" alt="電話">
                  </a>
                  <div class="profile-menu" id="profile-menu" aria-labelledby="avator-profile" tabindex="0">
                    <span class="profile-user-type hidden-xs" role="none">基本</span>
                    <a id="profile-menu-item-profile" role="menuitem" aria-label="Go to profile" href="./index.php" class="profile avator-menu-item" tabindex="-1">
                      <span class="hidden-xs">
                        <b>管理者</b>
												admin@asj.ad.jp                      </span>
                      <span class="visible-xs">
                        マイプロフィール
                      </span>
                    </a>
                    <div class="divider" role="none"></div>
                    <a href="logout.php" role="menuitem" class="rr btn-logout avator-menu-item" tabindex="-1">サインアウト</a>
                  </div>
                </li>
                <li class="visible-xs divider" role="presentation"></li><li role="none" class="signin"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="header_login" class="hideme">
        <ul></ul>
      </div>
    </div>
  </div>
  <div id="content_container" class="zoom-newcontent ">
    <!--
    <div id="pastdue_msg" class="past_due_msg hideme" style="display:none">
      <div style="display: flex">
        <div id="pay_us_meow_div">
          <img src="common/pay_us_meow.png" alt="今すぐ支払いますか？" align="left">
        </div>
        <div id="pastdue_msg_content"></div>
        <a class="close" data-dismiss="alert" id="past_due_msg_close">×</a>
      </div>
    </div>
    -->
    <div id="content_success_msg" role="alert" aria-live="assertive" class="alert alert-success hideme zoom-newmessage"></div>
    <div id="content" class="main-content">
      <div id="notice-slot"></div>
      <div class="mini-layout schedule-meeting-page" id="meetings">
        <div class="mini-layout-body">
          <div class="row">
            <div class="nav-menu" role="navigation" aria-label="side navigation">
              <div class="sidebar-menu">
                <a href="javascript:;" data-target="#sidemenu" aria-expanded="false" data-toggle="collapse">
                  <span class="">ミーティング</span>
                  <button aria-controls="navbar" aria-expanded="false" data-target="#sidemenu" data-toggle="collapse" class="sidebar-toggle collapsed" type="button">
                    <i class="glyphicon glyphicon-chevron-right"><span class="sr-only">sidemenu</span></i>
                  </button>
                </a>
              </div>
              <aside id="sidemenu" class="sidebar-collapse collapse nav-active">
                <h2 role="separator" class="side-nav-title nav-title-show" id="personal-nav-title">個人</h2>
                <ul class="nav nav-list zm-sidenav" role="group" aria-labelledby="personal-labelledby" id="personal-nav-list">
                  <li role="none" class="">
                    <a role="menuitem" tracking-id="leftNavProfile" tracking-category="NavPersonal" href="index.php">プロフィール</a>
                  </li>
                  <li role="none" class="active">
                    <a role="menuitem" tracking-id="leftNavMeetings" tracking-category="NavPersonal" href="meeting.php" aria-describedby="current-page-describedby">ミーティング</a>
                  </li>
									<!--
                  <li role="none" class="">
                    <a role="menuitem" tracking-id="leftNavRecording" tracking-category="NavPersonal" href="./recording.php">記録</a>
                  </li>
                  <li role="none" class="">
                    <a role="menuitem" tracking-id="leftNavSettings" tracking-category="NavPersonal" href="./setting.php">設定</a>
                  </li>
									-->
                </ul>
		            <h2 role="separator" class="side-nav-title nav-title-show" id="admin-nav-title">管理者</h2>
		            <dl class="nav nav-list zm-sidenav" role="group" aria-labelledby="admin-labelledby" id="admin-nav-list">
		              <dd role="none" class="side-nav">
		                <span role="menuitem" tabindex="0" class="nav-header" aria-haspopup="true" aria-expanded="false">
		                  <span class="nav-header-icon"><i class="zm-icon-right"></i></span>
		                  <span class="nav-header-title" id="user-heading-title">ユーザー管理</span>
		                </span>
		                <ul class="nav nav-list zm-sidenav" role="group" aria-labelledby="user-heading-title">
		                  <li role="none" class="nav-item ">
		                    <a role="menuitem" tracking-id="leftNavUsers" tracking-category="NavAdmin" href="admin/admin_users.php">ユーザー</a>
		                  </li>
		                  <li role="none" class="nav-item ">
		                    <a role="menuitem" tracking-id="leftNavGroups" tracking-category="NavAdmin" href="admin/admin_departs.php">グループ管理</a>
		                  </li>
		                </ul>
		              </dd>
		              <dd role="none" class="side-nav">
		                <span role="menuitem" tabindex="0" class="nav-header" aria-haspopup="true" aria-expanded="false">
		                  <span class="nav-header-icon"><i class="zm-icon-right"></i></span>
		                  <span class="nav-header-title" id="zoomrooms-heading-title">ルーム管理</span>
		                </span>
		              </dd>
		              <dd role="none" class="side-nav">
		                <span role="menuitem" tabindex="0" class="nav-header" aria-haspopup="true" aria-expanded="false">
		                  <span class="nav-header-icon"><i class="zm-icon-right"></i></span>
		                  <span class="nav-header-title" id="account-heading-title">アカウント管理</span>
		                </span>
		              </dd>
		              <dd role="none" class="side-nav">
		                <span role="menuitem" class="nav-header" tabindex="0" aria-haspopup="true" aria-expanded="false">
		                  <span class="nav-header-icon"><i class="zm-icon-right"></i></span>
		                  <span class="nav-header-title" id="advance-heading-title">詳細</span>
		                </span>
		              </dd>
		            </dl>
		          </aside>
		          <span class="sr-only" id="personal-labelledby">パーソナルメニューリスト</span>
		          <span class="sr-only" id="admin-labelledby">管理者メニューリスト</span>
		          <span class="sr-only" id="current-page-describedby">現在のページ</span>
		        </div>
		        <div class="content-body" role="main" aria-label="main content">
		          <div class="HiddenText"><a id="the-main-content" tabindex="-1"></a></div>
		          <h1 class="offscreen">Meeting Schedule Page</h1>
		          <ul class="breadcrumb">
		            <li>
									<a href="./meeting.php?type=upcoming">マイミーティング</a>
								</li>
		            <li>ミーティングを予定</li>
		          </ul>
		          <h3 style="padding-bottom: 10px;"><span>ミーティングを予定</span></h3>
		          <div id="zm_plugin_chrome" class="hideme plugin-tip" style="width: 100%;padding:10px 5px;">
		            <div class="promote-plugin">
		              <div class="tool-title"><i class="status-icon zm-hide-tip"></i>このメッセージを二度と表示しない</div>
		              <div class="row tool-items">
		                <div class="col-md-12 col-xs-12">
		                  <div class="tool-icon"><i class="icon chrome"></i></div>
		                  <div class="tool-info">
		                    <div>Zoom用Chromeプラグイン</div>
		                    <div>Chromeプラグインを利用して、GoogleカレンダーからZoomミーティングを直接スケジュールします。&nbsp;
												</div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		          <div id="zm_plugin_firefox" class="hideme plugin-tip" style="width: 100%;padding:10px 5px;">
		            <div class="promote-plugin">
		              <div class="tool-title"><i class="status-icon zm-hide-tip"></i>このメッセージを二度と表示しない</div>
		              <div class="row tool-items">
		                <div class="col-md-12 col-xs-12">
		                  <div class="tool-icon"><i class="icon firefox"></i></div>
		                  <div class="tool-info">
		                    <div>Zoom用Firefoxプラグイン</div>
		                    <div>Firefoxプラグインを利用して、Zoomミーティングを直接スケジュールします。&nbsp;
												</div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		          <div id="zm_plugin_outlook" class="hideme plugin-tip" style="width: 100%;padding:10px 5px;">
		            <div class="promote-plugin">
		              <div class="tool-title"><i class="status-icon zm-hide-tip"></i>このメッセージを二度と表示しない</div>
		              <div class="row tool-items">
		                <div class="col-md-12 col-xs-12">
		                  <div class="tool-icon"><i class="icon outlook"></i></div>
		                  <div class="tool-info">
		                    <div>Zoom用Outlookプラグイン</div>
		                    <div>Outlookプラグインを利用して、OutlookからZoomミーティングを直接スケジュールします。&nbsp;
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		          <div class="admin-content">
		            <div id="success_msg" class="alert alert-success hideme"></div>
		            <div id="error_msg" class="alert alert-danger hideme"></div>

								<div class="row">
									<div class="col-md-12">
										<div class="container hide" id="videocall">
											<div id="videos" class="hide">
												<div class="col-md-6">
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">ローカル
																<div class="btn-group btn-group-xs pull-right hide">
																	<button class="btn btn-danger" autocomplete="off" id="toggleaudio">音声オフ</button>
																	<button class="btn btn-danger" autocomplete="off" id="togglevideo">映像オフ</button>
																	<div class="btn-group btn-group-xs">
																		<button autocomplete="off" id="bitrateset" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
																			送信帯域<span class="caret"></span>
																		</button>
																		<ul id="bitrate" class="dropdown-menu">
																			<li><a href="#" id="0">無制限</a></li>
																			<li><a href="#" id="128">最大128kbit</a></li>
																			<li><a href="#" id="256">最大256kbit</a></li>
																			<li><a href="#" id="512">最大512kbit</a></li>
																			<li><a href="#" id="1024">最大1mbit</a></li>
																			<li><a href="#" id="1500">最大1.5mbit</a></li>
																			<li><a href="#" id="2000">最大2mbit</a></li>
																		</ul>
																	</div>
																</div>
															</h3>
														</div>
														<div class="panel-body" id="videoleft"></div>
													</div>
													<div class="input-group margin-bottom-sm">
														<span class="input-group-addon"><i class="fa fa-cloud-upload fa-fw"></i></span>
														<input class="form-control" type="text" placeholder="Write a DataChannel message to your peer" autocomplete="off" id="datasend" onkeypress="return checkEnter(this, event);" disabled />
													</div>
												</div>
												<div class="col-md-6">
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title">リモート <span class="label label-info hide" id="callee"></span> <span class="label label-primary hide" id="curres"></span> <span class="label label-info hide" id="curbitrate"></span></h3>
														</div>
														<div class="panel-body" id="videoright"></div>
													</div>
													<div class="input-group margin-bottom-sm">
														<span class="input-group-addon"><i class="fa fa-cloud-download fa-fw"></i></span>
														<input class="form-control" type="text" id="datarecv" disabled />
													</div>
												</div>
												<div class="col-md-6">
													<a href="javascript:;" class="btn btn-primary submit" onclick="doHangup()"><span>切断</span></a>
												</div>
											</div>
										</div>
									</div>
								</div>

		            <form id="schedule_form" class="form-horizontal" action="javascript:;" novalidate="novalidate">
		              <div class="z-form-row" style="padding-top: 10px;">
		                <div class="form-group">
		                  <label class="meeting-label col-md-2" for="topic">トピック</label>
		                  <div class="controls col-md-5">
		                    <input type="text" id="topic" name="topic" maxlength="200" value="マイミーティング" class="form-control">
		                  </div>
		                </div>
		                <div class="form-group">
		                  <label class="meeting-label col-md-2" for="agenda">説明（任意）</label>
		                  <div class="controls col-md-5">
		                    <textarea class="sch-desc form-control" id="agenda" name="agenda" maxlength="2000" placeholder="ウェビナーの説明を入力"></textarea>
		                  </div>
		                </div>
		              </div>
		              <div class="z-form-row">
		                <div id="mt_time">
		                  <div class="form-group">
		                    <label class="meeting-label col-md-2">開催日時</label>
		                    <div class="controls col-md-10 static">
		                      <input aria-label="start date" type="text" id="start_date" name="start_date" class="input-datepicker hasDatepicker" style="display:inline-block;" value="2020/10/29">
		                      <button type="button" class="ui-datepicker-trigger" aria-label="Date picker クリックして別の日を選択">
		                        <img src="common/calendar.gif" alt="クリックして別の日を選択" title="クリックして別の日を選択">
		                      </button> &nbsp;
		                      <div class="time-select">
		                        <label class="sr-only" for="start_time" aria-label="start time">start time</label>
		                        <div class="zm-select">
															<select id="start_time">
																<option value="">選択してください</option>
																<option id="select-item-start_time-0" value="00:00"><span class="real-label-span">0:00</span></option>
																<option id="select-item-start_time-1" value="00:30"><span class="real-label-span">0:30</span></option>
																<option id="select-item-start_time-2" value="01:00"><span class="real-label-span">1:00</span></option>
																<option id="select-item-start_time-3" value="01:30"><span class="real-label-span">1:30</span></option>
																<option id="select-item-start_time-4" value="02:00" selected="selected"><span class="real-label-span">2:00</span></option>
																<option id="select-item-start_time-5" value="02:30"><span class="real-label-span">2:30</span></option>
																<option id="select-item-start_time-6" value="03:00"><span class="real-label-span">3:00</span></option>
																<option id="select-item-start_time-7" value="03:30"><span class="real-label-span">3:30</span></option>
																<option id="select-item-start_time-8" value="04:00"><span class="real-label-span">4:00</span></option>
																<option id="select-item-start_time-9" value="04:30"><span class="real-label-span">4:30</span></option>
																<option id="select-item-start_time-10" value="05:00"><span class="real-label-span">5:00</span></option>
																<option id="select-item-start_time-11" value="05:30"><span class="real-label-span">5:30</span></option>
																<option id="select-item-start_time-12" value="06:00"><span class="real-label-span">6:00</span></option>
																<option id="select-item-start_time-13" value="06:30"><span class="real-label-span">6:30</span></option>
																<option id="select-item-start_time-14" value="07:00"><span class="real-label-span">7:00</span></option>
																<option id="select-item-start_time-15" value="07:30"><span class="real-label-span">7:30</span></option>
																<option id="select-item-start_time-16" value="08:00"><span class="real-label-span">8:00</span></option>
																<option id="select-item-start_time-17" value="08:30"><span class="real-label-span">8:30</span></option>
																<option id="select-item-start_time-18" value="09:00"><span class="real-label-span">9:00</span></option>
																<option id="select-item-start_time-19" value="09:30"><span class="real-label-span">9:30</span></option>
																<option id="select-item-start_time-20" value="10:00"><span class="real-label-span">10:00</span></option>
																<option id="select-item-start_time-21" value="10:30"><span class="real-label-span">10:30</span></option>
																<option id="select-item-start_time-22" value="11:00"><span class="real-label-span">11:00</span></option>
																<option id="select-item-start_time-23" value="11:30"><span class="real-label-span">11:30</span></option>
															</select>
		                        </div>
		                      </div>
		                      <div class="short-select">
		                        <div class="zm-select">
															<select id="start_time_2">
																<option value="">選択してください</option>
																<option value="AM">午前</option>
																<option value="PM" selected="selected">午後</option>
															</select>
		                        </div>
		                        <span style="color: #FF1E5A;" for="start_time" class="has-error help-block webinar-error-time" role="alert"></span>
		                      </div>
		                    </div>
		                    <div class="form-group">
		                      <div class="meeting-label col-md-2" id="duration">所要時間</div>
		                      <div class="controls col-md-10 static short-select duration-controls">
		                        <div class="zm-select duration-select">
															<select id="duration_hr">
																																<option id="select-item-duration_hr-0" value="00">0</option>
																																<option id="select-item-duration_hr-1" value="01" selected="selected">1</option>
																																<option id="select-item-duration_hr-2" value="02">2</option>
																																<option id="select-item-duration_hr-3" value="03">3</option>
																																<option id="select-item-duration_hr-4" value="04">4</option>
																																<option id="select-item-duration_hr-5" value="05">5</option>
																																<option id="select-item-duration_hr-6" value="06">6</option>
																																<option id="select-item-duration_hr-7" value="07">7</option>
																																<option id="select-item-duration_hr-8" value="08">8</option>
																																<option id="select-item-duration_hr-9" value="09">9</option>
																																<option id="select-item-duration_hr-10" value="10">10</option>
																																<option id="select-item-duration_hr-11" value="11">11</option>
																																<option id="select-item-duration_hr-12" value="12">12</option>
																																<option id="select-item-duration_hr-13" value="13">13</option>
																																<option id="select-item-duration_hr-14" value="14">14</option>
																																<option id="select-item-duration_hr-15" value="15">15</option>
																																<option id="select-item-duration_hr-16" value="16">16</option>
																																<option id="select-item-duration_hr-17" value="17">17</option>
																																<option id="select-item-duration_hr-18" value="18">18</option>
																																<option id="select-item-duration_hr-19" value="19">19</option>
																																<option id="select-item-duration_hr-20" value="20">20</option>
																																<option id="select-item-duration_hr-21" value="21">21</option>
																																<option id="select-item-duration_hr-22" value="22">22</option>
																																<option id="select-item-duration_hr-23" value="23">23</option>
																																<option id="select-item-duration_hr-24" value="24">24</option>
																															</select>
		                        </div>
		                        <span class="zm-select-unit" id="hr-unit" aria-label="hours">時間</span>
		                        <div class="zm-select duration-select">
															<select id="duration_min">
																<option id="select-item-duration_min-0" value="00" selected="selected">0</option>
																<option id="select-item-duration_min-1" value="15">15</option>
																<option id="select-item-duration_min-2" value="30">30</option>
																<option id="select-item-duration_min-3" value="45">45</option>
															</select>
		                        </div>
		                        <span class="zm-select-unit" id="min-unit" aria-label="minutes">分</span>
		                      </div>
		                    </div>
		                  </div>
		                  <div class="form-group">
		                    <div class="control-label col-md-2"></div>
		                    <div class="controls col-md-10">
		                      <label class="checkbox" for="option_rm">
		                        <input type="checkbox" id="option_rm" name="option_rm" value="on">定期ミーティング&nbsp;&nbsp;
		                        <span class="recurrence_desc hideme" id="recurrence_desc">いつでも</span>
		                      </label>
		                    </div>
		                  </div>
		                  <div id="recurrenceDialog" class="hideme">
		                    <div class="form-group" style="margin-bottom: 0px;">
		                      <div class="control-label col-md-2"></div>
		                      <div class="controls col-md-10">
		                        <div class="alert alert-danger hideme"></div>
		                        <div class="form-horizontal">
		                          <div class="form-group">
		                            <label for="recurrenceType" class="recurrence-label col-sm-2">再実施</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="recurrenceType">
																			<option id="select-item-recurrenceType-0" value="DAILY">毎日</option>
																			<option id="select-item-recurrenceType-1" value="WEEKLY">週ごと</option>
																			<option id="select-item-recurrenceType-2" value="MONTHLY">毎月</option>
																		</select>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal daily hideme">
		                          <div class="form-group">
		                            <label id="dailyInterval-label" class="recurrence-label col-sm-2">次の頻度でリピート</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="dailyInterval">
																																						<option id="select-item-dailyInterval-1" value="1" checked="checked">1</option>
																																						<option id="select-item-dailyInterval-2" value="2">2</option>
																																						<option id="select-item-dailyInterval-3" value="3">3</option>
																																						<option id="select-item-dailyInterval-4" value="4">4</option>
																																						<option id="select-item-dailyInterval-5" value="5">5</option>
																																						<option id="select-item-dailyInterval-6" value="6">6</option>
																																						<option id="select-item-dailyInterval-7" value="7">7</option>
																																						<option id="select-item-dailyInterval-8" value="8">8</option>
																																						<option id="select-item-dailyInterval-9" value="9">9</option>
																																						<option id="select-item-dailyInterval-10" value="10">10</option>
																																						<option id="select-item-dailyInterval-11" value="11">11</option>
																																						<option id="select-item-dailyInterval-12" value="12">12</option>
																																						<option id="select-item-dailyInterval-13" value="13">13</option>
																																						<option id="select-item-dailyInterval-14" value="14">14</option>
																																						<option id="select-item-dailyInterval-15" value="15">15</option>
																																					</select>
																		<span id="day-unit" class="zm-select-unit">日</span>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal weekly hideme">
		                          <div class="form-group">
		                            <label id="weeklyInterval-label" class="recurrence-label col-sm-2">次の頻度でリピート</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="weeklyInterval">
																																						<option id="select-item-weeklyInterval-1" value="1" checked="checked">1</option>
																																						<option id="select-item-weeklyInterval-2" value="2">2</option>
																																						<option id="select-item-weeklyInterval-3" value="3">3</option>
																																						<option id="select-item-weeklyInterval-4" value="4">4</option>
																																						<option id="select-item-weeklyInterval-5" value="5">5</option>
																																						<option id="select-item-weeklyInterval-6" value="6">6</option>
																																						<option id="select-item-weeklyInterval-7" value="7">7</option>
																																						<option id="select-item-weeklyInterval-8" value="8">8</option>
																																						<option id="select-item-weeklyInterval-9" value="9">9</option>
																																						<option id="select-item-weeklyInterval-10" value="10">10</option>
																																						<option id="select-item-weeklyInterval-11" value="11">11</option>
																																						<option id="select-item-weeklyInterval-12" value="12">12</option>
																																					</select>
		                              </div>
		                              <span id="week-unit" class="zm-select-unit">週間</span>
																</div>
															</div>
														</div>
														<div class="form-horizontal monthly hideme">
		                          <div class="form-group">
		                            <label id="monthlyInterval-label" for="monthlyInterval" class="recurrence-label col-sm-2">次の頻度でリピート</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="monthlyInterval">
																			<option id="select-item-monthlyInterval-0" value="0">1</option>
																			<option id="select-item-monthlyInterval-1" value="1" checked="checked">2</option>
																			<option id="select-item-monthlyInterval-2" value="2">3</option>
																		</select>
																		<span id="month-unit" class="zm-select-unit">ヶ月</span>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal weekly hideme">
		                          <div class="form-group">
		                            <label for="weeklyWeekDays" class="recurrence-label col-sm-2">実施</label>
		                            <div class="controls col-sm-9">
		                              <input type="checkbox" id="weeklyWeekDays0" name="weeklyWeekDays" value="1">日曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays1" name="weeklyWeekDays" value="2">月曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays2" name="weeklyWeekDays" value="3">火曜&nbsp;&nbsp;&nbsp;&nbsp;nbsp;
		                              <input type="checkbox" id="weeklyWeekDays3" name="weeklyWeekDays" value="4">水曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays4" name="weeklyWeekDays" value="5">木曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays5" name="weeklyWeekDays" value="6">金曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays6" name="weeklyWeekDays" value="7">土曜
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal monthly hideme">
		                          <div class="form-group">
		                            <label for="monthlyBy" class="recurrence-label col-sm-2">実施</label>
		                            <div class="controls col-sm-9">
		                              <div class="form-group">
																		<div class="zm-select">
		                                	<input type="radio" id="byMonyhDay" name="monthlyBy" value="BYMONTHDAY">毎月
		                                	<label for="monthlyByDay" class="recurrence-label col-sm-2 sr-only">実施</label>
																			<select id="monthlyByDay">
																																								<option id="select-item-monthlyByDay-0" value="1">1</li>
																																								<option id="select-item-monthlyByDay-1" value="2">2</li>
																																								<option id="select-item-monthlyByDay-2" value="3">3</li>
																																								<option id="select-item-monthlyByDay-3" value="4">4</li>
																																								<option id="select-item-monthlyByDay-4" value="5">5</li>
																																								<option id="select-item-monthlyByDay-5" value="6">6</li>
																																								<option id="select-item-monthlyByDay-6" value="7">7</li>
																																								<option id="select-item-monthlyByDay-7" value="8">8</li>
																																								<option id="select-item-monthlyByDay-8" value="9">9</li>
																																								<option id="select-item-monthlyByDay-9" value="10">10</li>
																																								<option id="select-item-monthlyByDay-10" value="11">11</li>
																																								<option id="select-item-monthlyByDay-11" value="12">12</li>
																																								<option id="select-item-monthlyByDay-12" value="13">13</li>
																																								<option id="select-item-monthlyByDay-13" value="14">14</li>
																																								<option id="select-item-monthlyByDay-14" value="15">15</li>
																																								<option id="select-item-monthlyByDay-15" value="16">16</li>
																																								<option id="select-item-monthlyByDay-16" value="17">17</li>
																																								<option id="select-item-monthlyByDay-17" value="18">18</li>
																																								<option id="select-item-monthlyByDay-18" value="19">19</li>
																																								<option id="select-item-monthlyByDay-19" value="20">20</li>
																																								<option id="select-item-monthlyByDay-20" value="21">21</li>
																																								<option id="select-item-monthlyByDay-21" value="22">22</li>
																																								<option id="select-item-monthlyByDay-22" value="23">23</li>
																																								<option id="select-item-monthlyByDay-23" value="24">24</li>
																																								<option id="select-item-monthlyByDay-24" value="25">25</li>
																																								<option id="select-item-monthlyByDay-25" value="26">26</li>
																																								<option id="select-item-monthlyByDay-26" value="27">27</li>
																																								<option id="select-item-monthlyByDay-27" value="28">28</li>
																																								<option id="select-item-monthlyByDay-28" value="29">29</li>
																																								<option id="select-item-monthlyByDay-29" value="30">30</li>
																																								<option id="select-item-monthlyByDay-30" value="31">31</li>
																																							</select>日
		                                </div>
		                              </div>
		                              <div class="form-group" style="margin-bottom: 0px;">
																		<div class="zm-select">
		                                	<input type="radio" id="byWeekDay" name="monthlyBy" value="BYDAY">&nbsp;
		                                	<label for="montlyByWeekdayIndex" class="recurrence-label col-sm-2 sr-only">実施</label>
																			<select id="montlyByWeekdayIndex">
																				<option id="select-item-montlyByWeekdayIndex-0" value="1">第1</option>
																				<option id="select-item-montlyByWeekdayIndex-1" value="2">第2</option>
																				<option id="select-item-montlyByWeekdayIndex-2" value="3">第3</option>
																				<option id="select-item-montlyByWeekdayIndex-3" value="4">第4</option>
																				<option id="select-item-montlyByWeekdayIndex-4" value="5">第5</option>
																			</select>
		                                	<label for="montlyByWeekday" class="recurrence-label col-sm-2 sr-only">実施</label>
																			<select id="montlyByWeekday">
																				<option id="select-item-montlyByWeekday-0" value="sun">日曜日</option>
																				<option id="select-item-montlyByWeekday-1" value="mon">月曜日</option>
																				<option id="select-item-montlyByWeekday-2" value="tue">火曜日</option>
																				<option id="select-item-montlyByWeekday-3" value="wed">水曜日</option>
																				<option id="select-item-montlyByWeekday-4" value="thu">木曜日</option>
																				<option id="select-item-montlyByWeekday-5" value="fri">金曜日</option>
																				<option id="select-item-montlyByWeekday-6" value="sat">土曜日</option>
																			</select>
		                                </div>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal notclassic">
		                          <div class="form-group clearfix">
		                            <label id="endTimes-label" for="endDate" class="recurrence-label col-sm-2">終了日</label>
		                            <div class="controls col-sm-9">
		                              <div class="form-group" style="margin-bottom: 0px;">
		                                <input type="radio" id="endByDateTime" name="endBy" value="END_DATETIME" checked="checked">期限
		                                <input type="text" id="endDate" name="endDate" class="input-datepicker hasDatepicker" value="2020/10/29">
		                                <button type="button" class="ui-datepicker-trigger">
		                                  <img src="common/calendar.gif" alt="クリックして別の日を選択" title="クリックして別の日を選択">
		                                </button>
		                                &nbsp;&nbsp;&nbsp;&nbsp;
		                                <div style="display: inline-block;">
		                                  <div class="zm-select">
																				<input type="radio" id="endByTimes" name="endBy" value="END_TIMES">合計
																				<select id="endTimes">
																																										<option id="select-item-endTimes-0" value="1" selected="selected">1</option>
																																										<option id="select-item-endTimes-1" value="2">2</option>
																																										<option id="select-item-endTimes-2" value="3">3</option>
																																										<option id="select-item-endTimes-3" value="4">4</option>
																																										<option id="select-item-endTimes-4" value="5">5</option>
																																										<option id="select-item-endTimes-5" value="6">6</option>
																																										<option id="select-item-endTimes-6" value="7">7</option>
																																										<option id="select-item-endTimes-7" value="8">8</option>
																																										<option id="select-item-endTimes-8" value="9">9</option>
																																										<option id="select-item-endTimes-9" value="10">10</option>
																																										<option id="select-item-endTimes-10" value="11">11</option>
																																										<option id="select-item-endTimes-11" value="12">12</option>
																																										<option id="select-item-endTimes-12" value="13">13</option>
																																										<option id="select-item-endTimes-13" value="14">14</option>
																																										<option id="select-item-endTimes-14" value="15">15</option>
																																										<option id="select-item-endTimes-15" value="16">16</option>
																																										<option id="select-item-endTimes-16" value="17">17</option>
																																										<option id="select-item-endTimes-17" value="18">18</option>
																																										<option id="select-item-endTimes-18" value="19">19</option>
																																										<option id="select-item-endTimes-19" value="20">20</option>
																																										<option id="select-item-endTimes-20" value="21">21</option>
																																									</select>回実施
		                                  </div>
		                                </div>
		                              </div>
		                              <div class="form-group hideme">
		                                <input type="radio" name="endBy" value="NO_END" aria-label="終了日なし">終了なし
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		                <div class="meeting-options-section" style="position: relative">
		                  <div id="mock-meeting-memberss-section" class="simplemodal-overlay hideme" style="position: absolute;background-color: #ffffff; left: 0px; top: 0px; z-index: 200; opacity: 0.5; height: 100%; width: 100%;"></div>
		                  <div class="z-form-row" id="withMembers">
		                    <div class="form-group">
		                      <label class="meeting-label col-md-2" id="meeting_id_Section">参加メンバー</label>
		                      <div class="controls col-md-10">

		                        <div id="member_add_form" class="form_select">
		                          <p id="#member_add" name="add_member" class="formbtn_open select_member">メンバー追加</p>
		                          <input type="submit" name="del_member" id="delete" class="formbtn" value="削除する">
		                          <ul class="member_addlist" id="member_add_list">
		                            <li value="2">
		                              <span class="list_delete" value="2"><a href="#" id="member2">削除</a></span>
		                              <span class="list_name">管理者</span>
		                              <span class="list_department"></span>
		                            </li>
															</ul>
		                          <input type="hidden" name="member_selected_group" id="member_selected_group" value="2">
		                          <input type="hidden" name="member" value="2">
		                        </div>

		                      </div>
		                    </div>
		                  </div>
		                  <div class="comarea">
												<!--メンバー追加　ウィンドウ-->
												<div id="member_add" class="form_editbox invisible">
													<p class="li_close">閉じる</p>
													<p class="li_title">追加メンバーの選択</p>
													<div class="select_editbox">
														<div class="select_cotegory membercotegory">
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(1)" class="active" onclick="searchMember(1)"><span class="cf_title">ルート</span></a></p></li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(71)" class="active" onclick="searchMember(71)"><span class="cf_title">eFusions</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(80)" class="active" onclick="searchMember(80)"><span class="cf_title">ASJ</span></a></p></li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(5)" class="active" onclick="searchMember(5)"><span class="cf_title">デザイン部</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(7)" class="active" onclick="searchMember(7)"><span class="cf_title">総務部</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(22)" class="active" onclick="searchMember(22)"><span class="cf_title">ASUSA</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(42)" class="active" onclick="searchMember(42)"><span class="cf_title">内部監査室</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(43)" class="active" onclick="searchMember(43)"><span class="cf_title">社長室</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(47)" class="active" onclick="searchMember(47)"><span class="cf_title">研究開発室</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(63)" class="active" onclick="searchMember(63)"><span class="cf_title">経営会議</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(78)" class="active" onclick="searchMember(78)"><span class="cf_title">ＣＳ部</span></a></p></li>
      													</ul>
                                  </li>
                                  <li>
      													<ul class="folderbox selected">
                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember(79)" class="active" onclick="searchMember(79)"><span class="cf_title">サーバー運用部</span></a></p></li>
      													</ul>
                                  </li>
      													</ul>
                                  </li>
      													</ul>
														</div>

														<div class="select_list_r">
															<table class="tab_list">
															<tr>
																<th class="tab_list_check"><label class="label-checkbox"><input type="checkbox" name="allmember_checkbox" value="" id="allmember-checkbox" class="checkbox"><span class="lever"></span></label></th>
																<th class="tab_list_name">氏　名</th>
																<th class="tab_list_department">所属部署</th>
															</tr>
															</table>
															<div class="list_rollbox">
																<table class="tab_rollbox" id="member_list"></table>
															</div>
														</div>
													</div>
													<p class="li_add"><input type="button" name="add_member" id="add_member" class="formbtn" value="&raquo;&nbsp;追加する"></p>
												</div>
												<!--メンバー追加　ウィンドウ ここまで-->
											</div>
		                </div>
		                <div class="meeting-options-section" style="position: relative">
		                  <div id="mock-meeting-options-section" class="simplemodal-overlay hideme" style="position: absolute;background-color: #ffffff; left: 0px; top: 0px; z-index: 200; opacity: 0.5; height: 100%; width: 100%;"></div>
		                  <div class="z-form-row" id="withPMI">
		                    <div class="form-group">
		                      <label class="meeting-label col-md-2" id="meeting_id_Section">ミーティングID </label>
		                      <div class="controls col-md-10">
		                        <div role="radiogroup" aria-describedby="meeting_id_Section">
		                          <label class="radio">
		                            <input type="radio" id="optionOneTimeId" name="option_schedulewithpmi" value="off"checked="checked">自動的に生成
		                          </label>
		                          <label class="radio">
		                            <input type="radio" id="optionScheduleWithPMI" name="option_schedulewithpmi" value="on">
		                            <span id="withPmiSpan">個人ミーティングID 3225366794</span>
		                          </label>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                  <div class="z-form-row">
		                    <div class="form-group form-group-password">
		                      <label class="meeting-label col-md-2">ミーティングパスワード</label>
		                      <div class="controls col-md-10">
		                        <label id="label_option_password" class="checkbox-inline" for="meeting_password">
		                          <input type="radio" id="meeting_password" name="option_password" checked="checked" value="meeting">ミーティングパスワードを必要とする
		                        </label>
		                        <div id="password_container" style="display: inline-block;">
		                          <label for="meeting_pass" id="passwordLabel" style="display: inline; margin-bottom: 0px;">
		                            <span class="sr-only">ミーティングパスワードを必要とする</span>
		                          </label>
		                          <input type="text" id="meeting_pass" name="meeting_pass" placeholder="パスワードを入力" maxlength="10" autocomplete="off" class="form-control hideme" style="display: inline;" value="ORM6u2yP">
														</div>
		                        <div>
		                          <span id="passwordErrorTips" role="alert" style="display:none; padding-left: 20px; color: #DE2828">Password does not meet requirements</span>
		                          <span id="weakPasswordDetectionTips" role="alert" style="display:none; padding-left: 20px; color: #DE2828">Enter a stronger password</span>
		                        </div>
		                        <span style="display:none;" id="error_password" for="meeting_pass" class="has-error help-block"></span>
		                      </div>
		                    </div>
		                    <div class="form-group pmi-change-warning hideme" role="alert" style="margin-bottom: 2px; display: none;">
		                      <div class="col-md-2">
		                      </div>
		                      <div class="controls col-md-10">
		                        <div class="alert">
		                          <span>
		                            このミーティングのスケジューリング後、ここで変更する設定はパーソナルミーティングIDのあるすべてのスケジューリング済みのミーティングに対して適用されます。
		                            <a class="revert-pmi-change" href="javascript:;" style="color: #0C63CE;margin-left: 5px;" role="button">設定を元に戻す</a>
		                          </span>
		                        </div>
		                      </div>
		                    </div>
												<div class="form-group form-group-password">
		                      <label class="meeting-label col-md-2"></label>
		                      <div class="controls col-md-10">
		                        <label id="label_option_password" class="checkbox-inline" for="login_password">
		                          <input type="radio" id="login_password" name="option_password" value="login">ミーティングパスワードを自動入力する(入室するにはホストの許可が必要となります)
		                        </label>
		                      </div>
		                    </div>
		                  </div>
		                  <div class="z-form-row">
		                    <div id="meetingVideo">
		                      <div class="form-group">
		                        <label class="meeting-label col-md-2" id="host_video">ビデオ</label>
		                        <div class="controls col-md-10">
		                          <label id="host_video_text" class="meeting-label col-md-2" style="padding-left: 0px;" title="ミーティングに参加するとホストのビデオが自動的に開始されます。">ホスト</label>
		                          <div role="radiogroup" aria-labelledby="host_video">
		                            <label aria-labelledby="host_video host_video_text option_video_host_on_txt" class="radio" id="option_video_host_on_txt" for="option_video_host_on">
																	<input type="radio" id="option_video_host_on" name="option_video_host" value="1" checked="checked">オン
																</label>
		                            <label aria-labelledby="host_video host_video_text option_video_host_off_txt" class="radio" id="option_video_host_off_txt" for="option_video_host_off">
																	<input type="radio" id="option_video_host_off" name="option_video_host" value="0">オフ
																</label>
		                          </div>
		                        </div>
		                      </div>
		                      <div class="form-group">
		                        <label class="meeting-label col-md-2" id="participant_video"></label>
		                        <div class="controls col-md-10">
		                          <label id="participant_video_text" class="meeting-label col-md-2" style="padding-left: 0px;" title="ミーティングへの参加時に自動的に参加者の動画を開始します。">参加者</label>
		                          <div role="radiogroup" aria-labelledby="participant_video">
		                            <label aria-labelledby="host_video participant_video_text option_video_participant_on_txt" class="radio" id="option_video_participant_on_txt" for="option_video_participant_on">
																	<input type="radio" id="option_video_participant_on" name="option_video_participants" value="1" checked="checked">オン
																</label>
		                            <label aria-labelledby="host_video participant_video_text option_video_participant_off_txt" class="radio" id="option_video_participant_off_txt" for="option_video_participant_off">
																	<input type="radio" id="option_video_participant_off" name="option_video_participants" value="0">オフ
																</label>
		                          </div>
		                        </div>
		                      </div>
		                      <div class="form-group pmi-change-warning hideme" role="alert" style="margin-bottom: 2px; display: none;">
		                        <div class="col-md-2">
		                        </div>
		                        <div class="controls col-md-10">
		                          <div class="alert">
		                            <span>
		                              このミーティングのスケジューリング後、ここで変更する設定はパーソナルミーティングIDのあるすべてのスケジューリング済みのミーティングに対して適用されます。
																	<a class="revert-pmi-change" href="javascript:;" style="color: #0C63CE;margin-left: 5px;" role="button">設定を元に戻す</a>
		                            </span>
		                          </div>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                  <div class="z-form-row">
		                    <div id="meetingOptions">
		                      <fieldset>
		                        <legend class="options-legend">
		                          <div class="meeting-label col-md-2" style="padding-left: 0px">ミーティングオプション</div>
		                        </legend>
														<!--
		                        <div class="form-group">
		                          <div class="meeting-label col-md-2"></div>
		                          <div class="controls col-md-5">
		                            <label class="checkbox" for="option_jbh" style="display:inline-block;">
		                              <input type="checkbox" id="option_jbh" name="option_jbh">ホストの前の参加を有効にする
		                            </label>
		                          </div>
		                        </div>
														-->
		                        <div class="form-group">
		                          <div class="meeting-label col-md-2"></div>
		                          <div class="controls col-md-5">
		                            <label class="checkbox" for="option_mute_upon_entry">
																	<input type="checkbox" class="m_option_chk" id="option_mute_upon_entry" name="option_mute_upon_entry">入室時に参加者をミュートにする
		                              <a class="btn-feature btn-feature-icon btn-feature-version" href="javascript:void()" aria-label="この機能は、3.5.63382.0829以降のバージョンでのみご利用いただけます。">
		                                <span class="version-inner">この機能は、3.5.63382.0829以降のバージョンでのみご利用いただけます。</span>
		                              </a>
		                            </label>
		                          </div>
		                        </div>
		                        <script type="text/x-template" id="edit-domain-dialog">
		                          <div id="edit-domain">
		                            <zm-dialog
		                              width="640px"
		                              aria-label="View/Edit all domains"
		                              aria-labelledby="editDomainTitle"
		                              :visible.sync="editDomainDialogVisible">
		                              <div slot="title" id="editDomainTitle">
		                                <h3 class="title-domain">ドメインを表示/編集</h3>
		                              </div>
		                              <p id="editDomainDesc" class="title-domain-tip">次の指定ドメインでZoomにサインインします</p>
		                              <div class="main-content">
		                                <zm-input
		                                  :disabled="lockedAuth"
		                                  type="textarea"
		                                  autosize
		                                  v-model="domain">
		                                </zm-input>
		                                <span v-show="hasErrorDomain" class="has-error help-block error-domain">有効なドメインを入力してください。複数のドメインはカンマで区切ってください。</span>
		                              </div>
		                              <div slot="footer" class="dialog-footer">
		                                <zm-button v-show="!lockedAuth" plain focusFirst @click="cancelDomains">キャンセル</zm-button>
		                                <zm-button v-show="!lockedAuth" type="primary" @click="saveDomains">保存</zm-button>
		                                <zm-button v-show="lockedAuth" @click="cancelDomains">閉じる</zm-button>
		                              </div>
		                            </zm-dialog>
		                          </div>
		                        </script>
														<!--
		                        <div class="form-group " id="showWaitingRoom">
		                          <div class="meeting-label col-md-2"></div>
		                          <div class="controls col-md-5">
		                            <label class="checkbox" for="option_waiting_room">
		                              <input type="checkbox" class="m_option_chk" id="option_waiting_room" name="option_waiting_room" checked="checked">待機室を有効にする
		                            </label>
		                          </div>
		                        </div>
														-->
		                        <div class="form-group" id="meet-autorec">
		                          <div class="meeting-label col-md-2"></div>
		                          <div class="controls col-md-10">
		                            <label class="checkbox" for="option_autorec">
																	<input type="checkbox" id="option_autorec" name="option_autorec">
		                              <span>ミーティングを自動記録</span>
		                            </label>
		                            <div class="sub-options" style="display:none;">
		                              <label class="radio" for="option_autorec_local">
																		<input type="radio" id="option_autorec_local" name="option_autorec_val" value="local">サーバー上
																	</label>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-group hideme" id="meet-dcs">
		                          <div class="meeting-label col-md-2"></div>
		                          <div class="controls col-md-10">
		                            <label for="option_additional_dcs" class="checkbox">
		                              <input type="checkbox" id="option_additional_dcs" name="option_additional_dcs">
		                              <span>Enable additional data center regions for this meeting</span>
		                            </label>
		                            <div id="additionalDcSubOption" class="subOptions hideme" style="width: 356px; margin-top: 8px; padding-left: 20px;">
		                              <span id="additionalDCError" for="option_additional_dcs" class="has-error help-block" style="display: none; color: rgb(222, 40, 40);">Select at least 1 region</span>
		                            </div>
		                          </div>
		                        </div>
		                      </fieldset>
		                    </div>
		                  </div>
		                  <div class="z-form-row hideme">
		                    <div id="interpretation_option">
		                      <div class="form-group" style="margin-bottom: 19px;">
		                        <label class="meeting-label col-md-2">通訳</label>
		                        <div class="controls col-md-10">
		                          <label id="label_option_interpretation_enable" class="checkbox-inline" for="option_interpretation_enable">
		                            <input type="checkbox" id="option_interpretation_enable" name="option_interpretation_enable">言語通訳を有効にする
		                            <a class="btn-feature btn-feature-icon btn-feature-version" href="javascript:void()" aria-label="この機能は4.5.0以降のバージョンでのみ利用できます。">
		                              <span class="version-inner">この機能は4.5.0以降のバージョンでのみ利用できます。</span>
		                            </a>
		                          </label>
		                        </div>
		                      </div>
		                      <div id="interpreters_info" class="" style="display: none;">
		                        <div id="interpreter_0" class="form-group interpreter">
		                          <label class="meeting-label col-md-2"></label>
		                          <div class="controls col-md-6">
		                            <input type="text" name="interpreter_email" id="interpreter_email_0" placeholder="john@company.com" aria-label="Interpreter Email" class="form-control" style="display: inline-block; width: 35%; margin-right: 5px;">
		                            <div class="zm-select language-select">
		                              <!---->
		                              <div class="zm-select-input">
		                                <!---->
		                                <input role="combobox" aria-owns="first_Language_0-popup-list" aria-controls="first_Language_0-popup-list" aria-autocomplete="both" aria-expanded="false" aria-haspopup="true" type="text" placeholder="選択してください" name="first_language" readonly="readonly" id="first_Language_0" aria-label="Source language" class="zm-select-input__inner" value="英語">
		                                <button tabindex="-1" type="button" aria-label="オプションを表示する" class="zm-select-toggle">
		                                  <i class="zm-select__caret zm-input__icon zm-icon-up"></i>
		                                </button>
		                              </div>
		                              <div class="zm-select-dropdown zm-popper" style="width: auto; display: none;">
		                                <div class="zm-scrollbar" style="">
		                                  <div class="zm-select-dropdown__wrap zm-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
		                                    <div class="zm-scrollbar__view">
		                                      <ul role="listbox" tabindex="-1" id="first_Language_0-popup-list" class="zm-select-dropdown__list">
		                                        <!---->
		                                        <li id="select-item-first_Language_0-0" role="option" aria-selected="true" aria-label="英語" tabindex="0" class="zm-select-dropdown__item selected hover" option-id="1-first-US"><div class="interpretation-language-icon"><span class="interpretation-language-font">EN</span></div> <p class="language-text">英語</p></li>
		                                        <li id="select-item-first_Language_0-1" role="option" aria-label="中国語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-CN"><div class="interpretation-language-icon"><span class="interpretation-language-font">中</span></div> <p class="language-text">中国語</p></li>
		                                        <li id="select-item-first_Language_0-2" role="option" aria-label="日本語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-JP"><div class="interpretation-language-icon"><span class="interpretation-language-font">あ</span></div> <p class="language-text">日本語</p></li>
		                                        <li id="select-item-first_Language_0-3" role="option" aria-label="ドイツ語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-DE"><div class="interpretation-language-icon"><span class="interpretation-language-font">DE</span></div> <p class="language-text">ドイツ語</p></li>
		                                        <li id="select-item-first_Language_0-4" role="option" aria-label="フランス語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-FR"><div class="interpretation-language-icon"><span class="interpretation-language-font">FR</span></div> <p class="language-text">フランス語</p></li>
		                                        <li id="select-item-first_Language_0-5" role="option" aria-label="ロシア語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-RU"><div class="interpretation-language-icon"><span class="interpretation-language-font">RU</span></div> <p class="language-text">ロシア語</p></li>
		                                        <li id="select-item-first_Language_0-6" role="option" aria-label="ポルトガル語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-PT"><div class="interpretation-language-icon"><span class="interpretation-language-font">PT</span></div> <p class="language-text">ポルトガル語</p></li>
		                                        <li id="select-item-first_Language_0-7" role="option" aria-label="スペイン語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-ES"><div class="interpretation-language-icon"><span class="interpretation-language-font">ES</span></div> <p class="language-text">スペイン語</p></li>
		                                        <li id="select-item-first_Language_0-8" role="option" aria-label="韓国語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-KR"><div class="interpretation-language-icon"><span class="interpretation-language-font">?</span></div> <p class="language-text">韓国語</p></li>
		                                        <!---->
		                                        <!---->
		                                      </ul>
		                                    </div>
		                                  </div>
		                                  <div class="zm-scrollbar__bar is-horizontal">
		                                    <div class="zm-scrollbar__thumb" style="transform: translateX(0%);"></div>
		                                  </div>
		                                  <div class="zm-scrollbar__bar is-vertical">
		                                    <div class="zm-scrollbar__thumb" style="transform: translateY(0%);"></div>
		                                  </div>
		                                </div>
		                                <!---->
		                              </div>
		                            </div>
		                            <i class="zm-icon-swap" style="font-size: 18px; vertical-align: middle;"></i>
		                            <div class="zm-select language-select">
		                              <div class="zm-select-input">
		                                <input role="combobox" aria-owns="second_language_0-popup-list" aria-controls="second_language_0-popup-list" aria-autocomplete="both" aria-expanded="false" aria-haspopup="true" type="text" placeholder="Language" name="second_language" readonly="readonly" id="second_language_0" aria-label="Target language" class="zm-select-input__inner">
		                                <button tabindex="-1" type="button" aria-label="オプションを表示する" class="zm-select-toggle">
		                                  <i class="zm-select__caret zm-input__icon zm-icon-up"></i>
		                                </button>
		                              </div>
		                              <div class="zm-select-dropdown zm-popper" style="width: auto; display: none;">
		                                <div class="zm-scrollbar" style="">
		                                  <div class="zm-select-dropdown__wrap zm-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
		                                    <div class="zm-scrollbar__view">
		                                      <ul role="listbox" tabindex="-1" id="second_language_0-popup-list" class="zm-select-dropdown__list">
		                                        <!---->
		                                        <li id="select-item-second_language_0-0" role="option" aria-label="英語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-US"><div class="interpretation-language-icon"><span class="interpretation-language-font">EN</span></div> <p class="language-text">英語</p></li>
		                                        <li id="select-item-second_language_0-1" role="option" aria-label="中国語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-CN"><div class="interpretation-language-icon"><span class="interpretation-language-font">中</span></div> <p class="language-text">中国語</p></li>
		                                        <li id="select-item-second_language_0-2" role="option" aria-label="日本語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-JP"><div class="interpretation-language-icon"><span class="interpretation-language-font">あ</span></div> <p class="language-text">日本語</p></li>
		                                        <li id="select-item-second_language_0-3" role="option" aria-label="ドイツ語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-DE"><div class="interpretation-language-icon"><span class="interpretation-language-font">DE</span></div> <p class="language-text">ドイツ語</p></li>
		                                        <li id="select-item-second_language_0-4" role="option" aria-label="フランス語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-FR"><div class="interpretation-language-icon"><span class="interpretation-language-font">FR</span></div> <p class="language-text">フランス語</p></li>
		                                        <li id="select-item-second_language_0-5" role="option" aria-label="ロシア語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-RU"><div class="interpretation-language-icon"><span class="interpretation-language-font">RU</span></div> <p class="language-text">ロシア語</p></li>
		                                        <li id="select-item-second_language_0-6" role="option" aria-label="ポルトガル語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-PT"><div class="interpretation-language-icon"><span class="interpretation-language-font">PT</span></div> <p class="language-text">ポルトガル語</p></li>
		                                        <li id="select-item-second_language_0-7" role="option" aria-label="スペイン語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-ES"><div class="interpretation-language-icon"><span class="interpretation-language-font">ES</span></div> <p class="language-text">スペイン語</p></li>
		                                        <li id="select-item-second_language_0-8" role="option" aria-label="韓国語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-KR"><div class="interpretation-language-icon"><span class="interpretation-language-font">?</span></div> <p class="language-text">韓国語</p></li>
		                                      </ul>
		                                    </div>
		                                  </div>
		                                  <div class="zm-scrollbar__bar is-horizontal">
		                                    <div class="zm-scrollbar__thumb" style="transform: translateX(0%);"></div>
		                                  </div>
		                                  <div class="zm-scrollbar__bar is-vertical">
		                                    <div class="zm-scrollbar__thumb" style="transform: translateY(0%);"></div>
		                                  </div>
		                                </div>
		                              </div>
		                            </div>
		                            <div style="display: inline-block;">
		                              <button type="button" class="zm-button--default zm-button--small zm-button" id="delete_interpreter_button" aria-label="通訳者を削除" style="border: medium none; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; padding: 0px 5px;">
		                                <span class="zm-button__slot">
		                                  <i class="zm-icon-close"></i>
		                                </span>
		                              </button>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-group">
		                          <label class="meeting-label col-md-2"></label>
		                          <div class="controls col-md-10">
		                            <button type="button" class="icon-btn zm-button--link zm-button--text zm-button--small zm-button" id="add_interpreter_button" aria-label="通訳者を追加">
		                              <span class="zm-button__slot"><i class="zm-icon-add"></i>
		                                <span class="zm-button__slot">通訳者を追加</span>
		                              </span>
		                            </button>
		                          </div>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		                <div class="z-form-row" style="border-bottom-color: transparent;">
		                  <div class="form-group">
		                    <div class="meeting-label col-md-2"></div>
		                    <div class="controls col-md-10">
		                      <button id="save-meeting" class="btn btn-primary btn-lg submit">保存</button>
		                      <a role="button" class="btn btn-default btn-lg" href="./meeting.php?type=upcoming">キャンセル</a>
		                    </div>
		                  </div>
		                </div>
		                <input type="hidden" name="ZOOM-CSRFTOKEN" value="AB1C-AKZY-3OJH-7W43-QESI-EDVA-I8K7-3T19">
		              </form>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		    <form id="roomSystemDialog" class="modaldialog hideme form-horizontal" action="javascript:;" autocomplete="off" novalidate="novalidate">
		      <div class="modal-dialog">
		        <div class="modal-content">
		          <div class="modal-header clearfix">
		            <button type="button" class="close simplemodal-close">×</button>
		            <h3>H.323/SIPルームシステムからミーティングに参加する</h3>
		          </div>
		          <div class="modal-body">
		            <div class="alert alert-danger hideme"></div>
		            <div class="form-group confno">
		              <div class="controls">
		                <label for="pairing_meeting"><span class="sr-only">ミーティングID</span></label>
		                <input id="pairing_meeting" name="pairing_meeting" type="text" class="form-control input-lg confno pairing-input" autocomplete="off" maxlength="13" placeholder="ミーティングID">
		              </div>
		              <div class="controls">
		                <p class="desc">ミーティングIDは9、10、または11桁の数字でなければなりません</p>
		              </div>
		            </div>
		            <div class="form-group">
		              <div class="controls">
		                <label for="pairing_code"><span class="sr-only">ペアリングコード</span></label>
		                <input id="pairing_code" name="pairing_code" type="text" class="form-control input-lg pairing-input" autocomplete="off" maxlength="5" placeholder="ペアリングコード">
		              </div>
		              <div class="controls">
		                <p class="desc">ビデオ会議システム画面に表示されるペアリングコード</p>
		              </div>
		            </div>
		            <div class="form-group" id="pmpasswordFields">
		              <div class="controls">
		                <label for="pairing_meeting_password"><span class="sr-only">ミーティング用パスワード</span></label>
		                <input id="pairing_meeting_password" name="pairing_meeting_password" type="password" class="form-control input-lg pairing-input" autocomplete="off" maxlength="10" placeholder="ミーティング用パスワード">
		              </div>
								</div>
							</div>
		          <div class="modal-footer">
		            <div class="controls">
		              <button id="btnPairSubmit" type="submit" class="btn btn-primary user submit">接続</button>
		            </div>
		          </div>
		        </div>
		      </div>
		      <input type="hidden" name="ZOOM-CSRFTOKEN" value="AB1C-AKZY-3OJH-7W43-QESI-EDVA-I8K7-3T19">
				</form>
			</div>
		</div>
    <div id="video_dialog" role="alertdialog" class="noheaderfooterdialog modaldialog hideme">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header clearfix">
            <div class="modal-title"></div>
            <button class="close simplemodal-close" aria-label="close">×</button>
          </div>
          <div class="modal-body">
            <div class="modal-body-container">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer_container" role="contentinfo">
      <div class="">
        <div id="footer-new">
          <div class="footer-body">
            <div class="ft-nav">
              <div class="ft-about">
                <div class="h4" role="heading" aria-level="2"></div>
              </div>
              <div class="ft-download" style="">
                <div class="h4" role="heading" aria-level="2"></div>
              </div>
              <div class="ft-sales">
                <div class="h4" role="heading" aria-level="2"></div>
              </div>
              <div class="ft-support">
                <div class="h4" role="heading" aria-level="2"></div>
              </div>
              <!--
              <div class="cm-language">
                <div class="h4" role="heading" aria-level="2"><span style="color:#eaeaea;">言語</span></div>
                <ul class="clearfix">
                  <li>
                    <div class="dropdown-language dropdown" role="presentation">
                      <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-haspopup="true">
                        <span>日本語</span>
                        <span class="caret"></span>
                      </a>
                      <ul class="dropdown-menu pull-right">
                        <li class=""><a href="javascript:;" data-locale="en-US">English</a></li>
                        <li class=""><a href="javascript:;" data-locale="es-ES">Espanol</a></li>
                        <li class=""><a href="javascript:;" data-locale="de-DE">Deutsch</a></li>
                        <li class=""><a href="javascript:;" data-locale="zh-CN">?体中文</a></li>
                        <li class=""><a href="javascript:;" data-locale="zh-TW">繁體中文</a></li>
                        <li class=""><a href="javascript:;" data-locale="fr-FR">Francais</a></li>
                        <li class=""><a href="javascript:;" data-locale="pt-PT">Portuguese</a></li>
                        <li class="active"><a href="javascript:;" data-locale="jp-JP">日本語</a></li>
                        <li class=""><a href="javascript:;" data-locale="ru-RU">Русский</a></li>
                        <li class=""><a href="javascript:;" data-locale="ko-KO">???</a></li>
                        <li class=""><a href="javascript:;" data-locale="it-IT">Italiano</a></li>
                        <li class=""><a href="javascript:;" data-locale="vi-VN">Ti?ng Vi?t</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <input type="hidden" id="cookie_currency" value="JPY">
                <div class="h4" role="heading" aria-level="2"><span style="color:#eaeaea;">通貨</span></div>
                <ul class="clearfix">
                  <li>
                    <div class="dropdown-currency dropdown" role="presentation">
                      <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-haspopup="true">
                        <span>日本円￥</span>
                        <span class="caret"></span>
                      </a>
                      <ul class="dropdown-menu pull-right">
                        <li class=""><a href="javascript:;" data-currency="USD">米ドル $</a></li>
                        <li class=""><a href="javascript:;" data-currency="AUD">豪ドル $</a></li>
                        <li class=""><a href="javascript:;" data-currency="EUR">ユーロ ?</a></li>
                        <li class=""><a href="javascript:;" data-currency="GBP">英ポンド ￡</a></li>
                        <li class="active"><a href="javascript:;" data-currency="JPY">日本円￥</a></li>
                        <li class=""><a href="javascript:;" data-currency="CAD">カナダドル（$）</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              -->
            </div>
            <div class="footer-copyright">
              <div class="info">
                <a id="teconsent" style="display: none;"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: relative;min-height: 80px;" id="stopgap-warpper">
        <div id="consent_blackbar" style="position:fixed; bottom: 0;width: 100%;z-index: 1000;"></div>
      </div>
    </div>
    <div id="fb-root"></div>
    <input type="hidden" id="__platformCheck" value="">
    <div id="notification"></div>
    <input type="hidden" id="detect" value="./images/cdn-detect.png">

    <!-- 不要 -->
    <script type="text/x-template" id="breakout-room-create-dialog">
      <div id="create-room" :class="[isView ? 'view-room':'']">
        <zm-dialog
          width="640px"
          :visible.sync="visible"
          aria-label="Breakout Room Assignment"
          aria-labelledby="crateRoomTitle">
          <div slot="title" id="crateRoomTitle">
            <h3>ブレイクアウトルーム割り当て</h3>
            <div class="participants-rooms">
              {{list.length}} ルーム, {{totalMember}} 参加者
            </div>
          </div>
          <p id="crateRoomDesc">メールを追加することにより、ブレイクアウトルームに参加者を割り当てます。最大50のブレイクアウトルームを作成し、最大で合計200名の参加者を割り当てられます。</p>
          <div class="main-content" v-loading="breRoomLoading" :element-loading-text="breRoomVerify" element-loading-spinner="zm-icon-loading">
            <div class="room-col">
              <h4>
                <span>Rooms</span>
                <zm-button type="icon" icon="zm-icon-add" @click="addRooms" :disabled="disenable" aria-label="Add a room">
                  <span class="sr-only">ルーム追加ボタン</span>
                </zm-button>
              </h4>
              <div class="room-data">
                <div class="empty-alert" v-if="noList">
                  <p>グループなし</p>
                  <span>+をクリックしてルームを追加</span>
                </div>
                <div v-else>
                  <ul role="listbox"
                    aria-label="Breakout Room list"
                    id="roomList"
                    class="origin-list">
                    <li
                      tabindex="0"
                      v-for="(item,index) in list"
                      :class="['clearfix',activeRoom === index ? 'active': '', roomHoverIndex === index ? 'hover': '']"
                      @click="selectRoom(item,index)"
                      @focusin="roomHoverIndex = index"
                      @keyup="roomHoverIndex = index"
                      @focusout="roomHoverIndex = -1"
                      @mouseenter="roomHoverIndex = index"
                      @mouseleave="roomHoverIndex = -1">
                      <span class="name">{{item.name}}</span>
                      <span class="number">{{item.value.length}}</span>
                      <zm-button type="icon" icon="zm-icon-delete" @click="deleteRoom(index)" :aria-label="'Delete ' + item.name"><span class="sr-only">Delete</span></zm-button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="members-col">
              <div v-if="!noList">
                <h4 v-if="!isEditName" @click.enter="isEditName = true">
                  <span>{{members.name}}</span>
                  <zm-button type="icon" icon="zm-icon-edit" aria-label="edit room name">編集</zm-button>
                </h4>
                <div class="edit-name" v-else>
                  <zm-input autofocus maxlength="50" v-model="members.name" label="edit room name" @keyup.enter.native="saveName" @blur="saveName"></zm-input>
                </div>
                <div class="edit-member">
                  <zm-autocomplete
                    ref="roomInput"
                    v-model="addMember"
                    value-key="email"
                    :maxlength="245"
                    :trigger-on-focus="false"
                    :fetch-suggestions="searchAsync"
                    @keydown.native.enter.prevent="appendMember"
                    @input.native="errorMsg = ''"
                    placeholder="Add participants"
                    @select="handleSelect">
                    <template slot-scope="props">
                      {{props.item.displayName}}
                    </template>
                  </zm-autocomplete>
                  <p role="alert" class="add-member-error" v-html="errorMsg"></p>
                </div>
                <div class="empty-content" v-if="showMemberEmpty">
                  <div class="empty-alert" >
                    <p>参加者なし</p>
                  </div>
                </div>
                <div class="has-member" v-if="members.value && members.value.length > 0">
                  <div class="member-data">
                    <div class="member-list">
                      <ul
                        ref="memberList"
                        role="listbox"
                        id="memberList"
                        class="origin-list">
                          <li v-for="(item,index) in members.value"
                            :class="[hoverIndex === index ? 'active': '']"
                            v-dragging="{ list: members.value, item: item, group: 'item' }"
                            @keyup="hoverIndex = index"
                            @keyup.up.self.prevent="itemKeyUp(index, $event)"
                            @keyup.down.self.prevent="itemKeyDown(index, $event)"
                            :key="item"
                            :title="item"
                            tabindex="0"
                            @focusin="hoverIndex = index"
                            @focusout="leave"
                            @mouseenter="hoverIndex = index"
                            @mouseleave="hoverFlag && leave()">
                            <p>{{item}}</p>
                            <div class="action">
                              <zm-popover
                                v-show="list.length > 1"
                                width="188"
                                trigger="click"
                                @show="hoverFlag = false"
                                @hide="hoverFlag = true"
                                placement="right-start">
                                <div class="move-to-content">
                                  <ul class="move-to-ul">
                                    <li tabindex="0" v-for="member in moveToRooms" @click.enter="moveToOther(member,item,index)">{{member.name}}</li>
                                  </ul>
                                </div>
                                <zm-button v-show="list.length > 1" slot="reference" type="small" icon="zm-icon-move-to" plain>移動先</zm-button>
                              </zm-popover>
                              <zm-button type="small" plain @click="removeCurrentMember(index)">削除</zm-button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <zm-button v-if="!isView" type="link" class="upload-link" @click="openCsvDialog">CSVからのインポート</zm-button>
              <zm-button v-else type="link" class="export-btn" @click="exportAsCsv">CSVとしてエクスポート</zm-button>
              <zm-button plain @click="cancelBreakoutRoom" focusFirst>キャンセル</zm-button>
              <zm-button
                type="primary"
                @click="saveRoomList"
                :disabled="noList || moreLength || hasClicked">
                保存
              </zm-button>
          </div>
        </zm-dialog>
      </div>
    </script>
    <!-- -->

    <!--
    <div id="upcomingMeetingDialog" class="modaldialog hideme upcomingMeeting-feature-dialog">
      <input type="hidden" name="mtg_length" id="mtg_length">
      <input type="hidden" name="mtg_length1" id="mtg_length1">
      <input type="hidden" name="start_url" id="start_url">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header clearfix">
            <button class="close simplemodal-close" aria-label="close">×</button>
            <h4 tabindex="-1" id="upcoming-meeting-title" class="meeting-delete-header-font" style="display: inline-block;">次回のミーティング</h4>
          </div>
          <div class="modal-body">
            <div class="form-group" style="margin-bottom:16px;">
              <div id="one-mtg" class="controls hideme" style="margin-bottom:18px;">このミーティングを開始しますか?</div>
              <div id="more-mtg" class="controls hideme" style="margin-bottom:18px;">これらのミーティングのいずれかを開始しますか?</div>
              <div id="mtgs">
              </div>
              <div id="viwe-more" class="controls hideme"><a href="./meeting.php">さらに表示...</a></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary submit" id="scheduleMtg" style="background-color: #fff;color: #232333;border-color: #747487">新しいミーティングを開始</button>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>

  <div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">
    <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
      <a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="Prev"><span class="ui-icon ui-icon-circle-triangle-w">Prev</span></a>
      <a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="Next"><span class="ui-icon ui-icon-circle-triangle-e">Next</span></a>
      <div class="ui-datepicker-title">
        <span class="ui-datepicker-month">July</span>&nbsp;
        <span class="ui-datepicker-year">2020</span>
      </div>
    </div>
    <table class="ui-datepicker-calendar">
      <thead>
        <tr>
          <th scope="col" class="ui-datepicker-week-end"><span title="Sunday">Su</span></th>
          <th scope="col"><span title="Monday">Mo</span></th>
          <th scope="col"><span title="Tuesday">Tu</span></th>
          <th scope="col"><span title="Wednesday">We</span></th>
          <th scope="col"><span title="Thursday">Th</span></th>
          <th scope="col"><span title="Friday">Fr</span></th>
          <th scope="col" class="ui-datepicker-week-end"><span title="Saturday">Sa</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
          <td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
          <td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">1</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">2</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">3</span></td>
          <td class=" ui-datepicker-week-end ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">4</span></td>
        </tr>
        <tr>
          <td class=" ui-datepicker-week-end ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">5</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">6</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">7</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">8</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">9</span></td>
          <td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">10</span></td>
          <td class=" ui-datepicker-week-end ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">11</span></td>
        </tr>
        <tr>
          <td class=" ui-datepicker-week-end ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">12</span></td>
          <td class=" ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today" data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default ui-state-highlight ui-state-active ui-state-hover" href="#">13</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">14</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">15</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">16</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">17</a></td>
          <td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">18</a></td>
        </tr>
        <tr>
          <td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">19</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">20</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">21</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">22</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">23</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">24</a></td>
          <td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">25</a></td>
        </tr>
        <tr>
          <td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">26</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">27</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">28</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">29</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">30</a></td>
          <td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2020"><a class="ui-state-default" href="#">31</a></td>
          <td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
        </tr>
      </tbody>
    </table>
    <div class="ui-datepicker-buttonpane ui-widget-content">
      <button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">Today</button>
      <button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>
    </div>
  </div>
  <div id="ada-embed" class="ada-embed-app">
    <div>
      <div class="ada-embed-drawer ada-embed-drawer--hidden">
        <div class="ada-embed-drawer__iframe-container" role="dialog" aria-hidden="true"></div>
      </div>
      <div>
        <div class="ada-embed-button-container ada-embed-button-container--not-draggable">
          <button title="Open Support Chat" accesskey="9" class="ada-embed-button" style="width: 56px; height: 56px; background-color: #14A579;">
            <span style="" class="isvg loaded ada-embed-button__icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="28" fill="#14A579"></circle>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8008 22.7477V31.3905C13.8008 34.5726 16.3674 37.1523 19.5335 37.1523H23.8249C23.8299 37.1523 23.8346 37.155 23.8372 37.1593L26.9036 42.296C27.4602 43.2284 28.8048 43.2284 29.3615 42.296L31.8058 38.2013C32.1943 37.5505 32.8941 37.1523 33.6492 37.1523H36.7316C39.8977 37.1523 42.4643 34.5726 42.4643 31.3905V22.7477C42.4643 19.5655 39.8977 16.9858 36.7316 16.9858H19.5335C16.3674 16.9858 13.8008 19.5655 13.8008 22.7477Z" fill="white"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

