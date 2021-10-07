<?php
require_once("app.php");
require_once("meeting_class.php");
require_once("groups_class.php");
$app = new room_app();
if (isset($app->loggedInUser)
	&& $app->loggedInUser->user_id != 0
  && $app->loggedInUser->is_admin
	&& $app->loggedInUser->is_master)
{
	header("Location: admin/admin_companies.php");
	die();
} else if (!isset($app->loggedInUser)) {
	header("Location: index.php");
	die();
}
$meeting_id = isset($_GET['meeting'])?$_GET['meeting']:'';

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$file = strrchr($actual_link, '/');
$photo_image = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/images/user.png';

if (isset($app->loggedInUser)) {
	$stmt = $app->mysqli->prepare("select `c_photo` from `ht_user` where n_user = ?");
	if ($stmt) {
		$stmt->bind_param('i', $app->loggedInUser->user_id);
		$stmt->execute();
		$stmt->bind_result($photo_image);
		if (!$stmt->fetch() || empty($photo_image)) {
			$photo_image = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/images/user.png';
		}
		$stmt->close();
	}
}
?>
<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="jp-JP"><head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# zoomvideocall: http://ogp.me/ns/fb/zoomvideocall#">
<title>ミーティングをスケジュールする - Zoom</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0">
<link type="text/css" rel="stylesheet" href="schedule_files/reset.css">
<link type="text/css" rel="stylesheet" href="schedule_files/common.css">
<link type="text/css" rel="stylesheet" href="schedule_files/form_layout.css">

<link type="text/css" rel="stylesheet" href="schedule_files/all.css">
<link rel="stylesheet" type="text/css" href="schedule_files/select2.css">
<link rel="stylesheet" type="text/css" href="schedule_files/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="schedule_files/meeting.css">
<link rel="stylesheet" type="text/css" href="schedule_files/style.css">
<link rel="stylesheet" type="text/css" href="schedule_files/zm-vue-component.css">
<link rel="stylesheet" type="text/css" href="schedule_files/upload.css">
<link rel="stylesheet" type="text/css" href="schedule_files/common4whenAndDuring.css">
<link rel="stylesheet" type="text/css" href="schedule_files/unite-style-for-form.css">
<link rel="stylesheet" type="text/css" href="schedule_files/meeting4interpretation.css">
<link rel="stylesheet" type="text/css" href="schedule_files/meeting_delete_dialog.css">

<style type="text/css">
.z-form-row {
	margin: 0px -20px 0px -20px;
	padding: 24px 30px 4px 30px;
	border-bottom: 1px solid #eeeff2;
	position: relative;
}
.tsp-enbale-tip {
	padding: 10px 10px 0 10px;
	margin-top: 10px;
	font-size: 13px;
	width: 100%;
	max-width: 600px;
	border-radius: 3px;
	background-color: #dff0d8;
	color: #3c763c;
}
#recurrenceDialog {
	margin-bottom: 0px;
}
#recurrenceDialog .form-horizontal .control-label{
	padding-top: 0px;
	margin-top: 2px;
}
#recurrenceDialog .form-horizontal .form-group {
	margin-left: 0px;
}
#recurrence_desc {
	font-weight: bold;
}
#startTime, #ampm, #dailyInterval, #weeklyInterval, #monthlyInterval, #endTimes {
	width: 70px;
}
input[type=number] {
	-moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	margin: 0;
}
.recurrence_desc{
	margin-top: -16px;
	margin-bottom: 24px;
}
.tab-content {
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
}
#meeting_tab_container {
	position: relative;
}
#meeting_doc_container .doc {
	position: absolute;
	right: 10px;
	bottom: 10px;
}
.ui-datepicker {
	font-size: 11px;
	line-height: 12px;
}
.ui-datepicker select {
	font-size: 11px;
	height: 20px;
	line-height: 12px;
	padding-top: 1px;
	padding-bottom: 1px;
}
.ui-datepicker-trigger {
	cursor: pointer;
	margin-left: 2px;
}
#start_date {
	cursor: pointer;
}
#start_time, #start_time_2, #duration_hr, #duration_min {
	width: 70px;
}
#enforce_loginSD_container .controls{
	padding-left: 35px;
}
#schedule_form .radio {
	margin-right: 20px;
	display: inline-block;
}
#schedule_form .option_lable_tips {
	font-size: +80%;
	color: gray;
}
#schedule_form input[type="checkbox"], input[type="radio"]{
	margin-right: 5px;
}
#rm_notice{margin-top:12px;margin-left:30px}
	.ext-input-area {
	margin-top: -15px;
}
#other_teleconf_info {
	height: 160px;
}
.form-group-password{
	margin-bottom: 15px;
}
#label_option_password {
	line-height: 20px;
	height: 36px;
}
#password_container {
	display: none;
	margin-left: 10px;
	width: 160px;
}
@media screen and (max-width : 768px) {
	.form-horizontal .form-group {
		margin-left: 0;
		margin-right: 0;
	}
	.content-body ol.breadcrumb {
		display: none;
	}
}
@media (min-width: 768px) {
	.col-md-1 {
		min-width: 150px;
	}
	.col-md-2 {
		min-width: 180px;
	}
	.col-md-10 {
		width: 66.666%;
	}
}
@media (min-width: 1200px) {
	.col-md-10 {
		width: 73.333%;
	}
}
.breadcrumb {
	background-color: #ffffff;
	padding-left: 0px;
}
.breadcrumb > li + li:before {
	content: "> ";
}
.meeting-label {
	color:#747487;
	padding-top:7px;
	padding-bottom: 0px;
}
.recurrence-label{
	padding-left: 0px;
	margin-left: 0px;
}
.interval-error{
	padding-left:16px;
	color : #FF0000;
}
.times-error{
	color : #FF0000;
}
.select2-choice:hover,.select2-choice:focus{
	text-decoration: none;
}
#interpretation_option .has-error .form-control,
#interpretation_option .has-error .form-control:focus {
	border-color: #BABACC;
}
#meeting_password_tips .success {
	color: #3C763D;
	list-style-type: none;
}
#meeting_password_tips .zm-icon-ok {
	display: none;
}
#meeting_password_tips .success .zm-icon-ok {
	display: inline-block;
}

body div.combobox div.dropdownlist{
	width: calc(100% + 2px) !important;
}

<link rel="stylesheet" href="schedule_files/notification.css">
<link rel="stylesheet" type="text/css" href="schedule_files/zoom-components.css">
<link rel="stylesheet" type="text/css" href="schedule_files/popup-captcha.css">

<style type="text/css">
.ada-embed-button-container--not-draggable{
  position:fixed;
  bottom:24px;
  right:24px;
  z-index:10000
}
.ada-embed-button-container--loading{
  display:none
}
.ada-embed-button-container .ada-embed-button{
  width:44px;
  height:44px;
  border-radius:50%;
  position:absolute;
  bottom:0;
  right:0;
  cursor:pointer;
  border:1px solid rgba(0,0,0,.05);
  transition:.12s ease;
  box-shadow:0 2px 4px rgba(0,0,0,.1);
  visibility:visible;
  padding:0;
  margin:0;
  min-width:0;
  max-width:none;
  min-height:0;
  max-height:none;
  overflow:hidden
  }
.ada-embed-button-container .ada-embed-button__icon{width:100%;height:100%;top:0;left:0;padding:17%;position:absolute;z-index:10010;box-sizing:border-box}
.ada-embed-button-container .ada-embed-button__icon svg{width:100%!important;height:100%!important}
.ada-embed-button-container .ada-embed-button__icon--hide{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-name:dialogue-fade;animation-name:dialogue-fade}
.ada-embed-button-container .ada-embed-button__emoji{position:absolute;top:0;left:0;z-index:10010;width:100%;height:100%}
.ada-embed-button-container .ada-embed-button__emoji--show{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-name:emoji-bounce;animation-name:emoji-bounce;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}
.ada-embed-button-container .ada-embed-notification{
  border-radius:50%;
  position:absolute;
  bottom:31px;
  right:-4px;
  border-style:solid;
  border-color:#ff3b30;
  background-color:#fff;
  box-sizing:border-box;
  -webkit-animation-duration:.5s;
  animation-duration:.5s;
  -webkit-animation-name:notification-fade-in;
  animation-name:notification-fade-in
}
@-webkit-keyframes emoji-bounce{
  0%{transform:translateY(60px)}
  10%{transform:translateY(0)}
  17%{transform:rotate(-12deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
  23%{transform:rotate(18deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
  30%{transform:rotate(0deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
  80%{transform:translateY(0)}
  90%{transform:translateY(3px)}
  to{transform:translateY(-60px)}
}
@keyframes emoji-bounce{
  0%{transform:translateY(60px)}
  10%{transform:translateY(0)}
  17%{transform:rotate(-12deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
  23%{transform:rotate(18deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
  30%{transform:rotate(0deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
  80%{transform:translateY(0)}
  90%{transform:translateY(3px)}
  to{transform:translateY(-60px)}
}
@-webkit-keyframes notification-fade-in{
  0%{opacity:0;transform:scale3d(0,0,0)}
  to{opacity:1;transform:scaleX(1)}
}
@keyframes notification-fade-in{
  0%{opacity:0;transform:scale3d(0,0,0)}
  to{opacity:1;transform:scaleX(1)}
}
@-webkit-keyframes dialogue-fade{
  0%{opacity:1;transform:scaleX(1)}
  10%{opacity:0;transform:scale3d(0,0,0)}
  90%{opacity:0;transform:scale3d(0,0,0)}
  to{opacity:1;transform:scaleX(1)}
}
@keyframes dialogue-fade{
  0%{opacity:1;transform:scaleX(1)}
  10%{opacity:0;transform:scale3d(0,0,0)}
  90%{opacity:0;transform:scale3d(0,0,0)}
  to{opacity:1;transform:scaleX(1)}
}
</style>
<style type="text/css">
.ada-embed-intro-blurb{position:fixed;opacity:0;max-width:224px;z-index:10000;visibility:hidden}
.ada-embed-intro-blurb--not-draggable{position:fixed;right:76px;bottom:24px}
.ada-embed-intro-blurb--show{-webkit-animation:messageBlowup 1s forwards;animation:messageBlowup 1s forwards}
.ada-embed-intro-blurb--hide{-webkit-animation:messageBlowdown .5s forwards;animation:messageBlowdown .5s forwards}
.ada-embed-intro-blurb--large{right:88px}
.ada-embed-intro-blurb--x-large{right:104px}
.ada-embed-intro-blurb__dismiss-button{
  position:absolute;
  top:-8px;
  transition:opacity .18s;
  opacity:0;
  border:0;
  border-radius:50%;
  background-image:url("https://static.ada.support/Clear.svg");
  background-repeat:no-repeat;
  background-position:50%;
  background-size:18px;
  cursor:pointer;
  width:16px;
  height:16px;
  -webkit-filter:drop-shadow(0 0 2px rgba(2,14,29,.08));
  filter:drop-shadow(0 0 2px rgba(2,14,29,.08));
  pointer-events:none;background-color:transparent
}
.ada-embed-intro-blurb__dismiss-button--mobile-show{top:-24px}
.ada-embed-intro-blurb__dismiss-button:focus{opacity:1;pointer-events:all}
.ada-embed-intro-blurb:hover .ada-embed-intro-blurb__dismiss-button,.ada-embed-intro-blurb__dismiss-button--mobile-show{opacity:1!important;pointer-events:all;margin:0 13px;left:-13px}
.ada-embed-intro-blurb__dismiss-button--mobile-show~.ada-embed-intro-blurb__message{margin:0}
.ada-embed-intro-blurb__message{
  margin-bottom:0;
  border:0;
  border-radius:12px;
  box-shadow:0 2px 9px 0 rgba(2,11,41,.08),0 0 0 1px rgba(4,33,66,.02);
  background-color:#fff;
  cursor:pointer;
  padding:8px 12px;
  width:auto;max-width:224px;
  height:auto;
  max-height:100px;
  overflow:hidden;
  font-size:16px;
  resize:none;
  word-break:break-word;
  text-align:left;
  min-width:44px
}
@-webkit-keyframes messageBlowup{
  0%{transform:scale3d(0,0,0);visibility:visible;opacity:0}
  60%{transform:scale3d(1.1,1.1,1.1);visibility:visible;opacity:1}
  to{transform:scaleX(1);visibility:visible;opacity:1}
}
@keyframes messageBlowup{
  0%{transform:scale3d(0,0,0);visibility:visible;opacity:0}
  60%{transform:scale3d(1.1,1.1,1.1);visibility:visible;opacity:1}
  to{transform:scaleX(1);visibility:visible;opacity:1}
}
@-webkit-keyframes messageBlowdown{
  0%{visibility:visible;transform:scaleX(1);opacity:1}
  25%{visibility:visible;transform:scaleX(1);opacity:1}
  50%{visibility:visible;transform:scale3d(1.1,1.1,1.1);opacity:1}
  to{visibility:hidden;transform:scale3d(0,0,0);opacity:1}
}
@keyframes messageBlowdown{
  0%{visibility:visible;transform:scaleX(1);opacity:1}
  25%{visibility:visible;transform:scaleX(1);opacity:1}
  50%{visibility:visible;transform:scale3d(1.1,1.1,1.1);opacity:1}
  to{visibility:hidden;transform:scale3d(0,0,0);opacity:1}
}
.ada-embed-iframe{
	outline:none;border:0;width:100%;height:100%
}
.ada-embed-drawer__iframe-container{
  display:block;
  position:fixed;
  right:0;
  bottom:0;
  transform:translate(0);
  transition:transform .2s ease,opacity .2s ease;
  z-index:9999;
  box-shadow:-1px 0 0 rgba(0,0,0,.1),-3px 0 9px rgba(0,0,0,.15);
  background-color:#fff;
  width:100%;
  max-width:375px;
  height:100vh;
  overflow:initial;
  pointer-events:all;
  box-sizing:border-box
}
.ada-embed-drawer--hidden .ada-embed-drawer__iframe-container{
	transform:translate(375px);opacity:0
}
.ada-embed-drawer__mask{
	display:block;position:fixed;top:0;left:0;transition:visibility .2s ease,opacity .2s ease;visibility:visible;opacity:1;z-index:9998;background-color:rgba(0,0,0,.16)!important;width:100%;height:100%;pointer-events:all
}
.ada-embed-drawer--hidden .ada-embed-drawer__mask{
	visibility:hidden;opacity:0;pointer-events:none
}
.ada-embed-drawer--hidden.ada-embed-drawer--isIE9 .ada-embed-drawer__mask{
	display:none
}
.ada-embed-drawer--hidden.ada-embed-drawer--mobile-overlay .ada-embed-drawer__iframe-container{
	transform:translate(100vw)
}
.ada-embed-drawer--mobile-overlay .ada-embed-drawer__iframe-container{
	max-width:none;height:100%;min-height:100%
}
.ada-embed-app{
	color:#3c3c3f;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px
}
.ada-embed-app--inside-parent{
	height:100%
}
.beta {
	color:#EB5A5A;
	font-size:11px;
}
#tsp-tooltip{
	left:100%;
	top: -11px;
	position: absolute;
	z-index: 100;
	width: 320px;
	color: #747487;
	padding: 10px 20px;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 0px 3px 1px rgba(0,0,0,.3);
	-webkit-box-shadow: 0 0px 3px 1px rgba(0,0,0,.3);
	box-sizing: border-box;
}
#tsp-tooltip .close {
	position: absolute;
	top:10px;
	right: 15px;
}
#tsp-tooltip .tip-left{
	background: #ffffff;
	position: absolute;
	width: 12px;
	height: 12px;
	left: -6px;
	top: 25px;
	border-radius: 3px;
	border-top: 1px solid #e0dfdf;
	border-right: 1px solid #e0dfdf;
	box-shadow: 0 -1px 3px rgba(0,0,0,.3);
	-webkit-box-shadow: 0 -1px 3px rgba(0,0,0,.3);
	transform: matrix(-0.71, -0.71, 0.7, -0.71, 0, 0);
}
#tsp-tooltip .tip-left-top{
	background: #ffffff;
	position: absolute;
	width: 10px;
	height: 20px;
	top: 20px;
	left: 0px;
}
.switch-back-ma {
	position: absolute;
	left: 0;
	top: 0;
	width: 300px;
	background: #FCF6ED;
	padding: 16px 24px;
	border-bottom: 1px solid rgba(135, 101, 45, 0.19);
}
.switch-back-ma .zm-icon-left{
	position: relative;
	bottom: 0;
	right: 5px;
	color: #0E71EB;
}
.switch-back-ma a {
	display: inline-block;
	margin-bottom: 16px;
}
.switch-back-ma span {
	color: #775111;
}
.switch-back-ma span b {
	white-space: nowrap;
}
.switch-back-ma.placeholder {
	visibility: hidden;
	position: relative;
}
.promote-plugin {
	background-color: #F2F2F2;
	min-height:90px;
	border-radius: 3px;
	padding: 10px 25px;
}
.tool-title {
	font-size: 12px;
	font-weight: normal;
	color: #333;
	float: right;
}
.tool-items > div{
	font-size: 0;
}
.tool-items > div > .tool-icon {
	display: inline-block;
	vertical-align: middle;
	width: 40px;
	margin-right: 20px;
}
.tool-items > div > .tool-icon > i.icon{
	/*
	background: transparent url("https://us02st2.zoom.us/static/94019/image/plugin_sprite.png") no-repeat;
	*/
	background-size: 120px;
	display:inline-block;
	width: 40px;
	height: 40px;
}
.tool-items > div > .tool-icon > i.icon.chrome{
	background-position: -80px -24px;
}
.tool-items > div > .tool-icon > i.icon.firefox{
	background-position: 0 -24px;
}
.tool-items > div > .tool-icon > i.icon.outlook{
	background-position: -40px -24px;
}
.tool-items > div > .tool-info {
	display:inline-block;
	vertical-align: middle;
	font-size: 14px;
}
.tool-items > div > .tool-info > div:first-child {
	color: #4a4a4a;
	font-weight: 600;
	font-size: 16px;
	font-style: normal;
}
.tool-items > div > .tool-info > div > a {
	color: #0C63CE;
	font-size: 14px;
	font-weight: normal;
}
.tool-items > div > .tool-icon > a {
	padding-right: 15px;
}
@media screen and (max-width : 767px) {
	.promote-plugin {
		padding: 10px;
	}
}
i.status-icon {
	/*
	background: transparent url("https://us02st2.zoom.us/static/94019/image/settings/no.png") no-repeat scroll 0 0;
	*/
	background-size: cover;
	float: left;
	height: 10px;
	margin-left: -8px;
	margin-right: 4px;
	margin-top: 3px;
	width: 10px;
	cursor: pointer;
}
.freemeeting-tip {
	border-radius: 3px;
	background-color: rgba(254, 116, 37, 0.1);
	border: solid 1px #fe7425;
	padding: 15px;
	margin-top: -8px;
}
.freemeeting-tip a {
	color: #FF7800;
}
.freemeeting-tip label {
	color: #666;
	font-size: 12px;
}
.freemeeting-tip input[type=checkbox] {
	margin-top: 3px;
}
@media (min-width: 1200px) {
	#free_meeting_40mins_tip .col-md-10 {
		width: 620px;
	}
}
.title-domain {
	font-family: Lato;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
}
.title-domain-tip {
	font-family: Lato;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
}
.error-domain {
	color:#FF1E5A;
}
[v-cloak]{
	display:none !important;
}
#trackfieldDiv .combobox div.dropdownlist {
	height: 106px;
	width: calc(100% + 2px);
	border: solid 1px #2D8CFF;
	border-top: none;
}
#trackfieldDiv .combobox div.dropdownlist>a {
	text-align: left !important;
	padding-left: 12px !important;
}
#trackfieldDiv .combobox input {
	float: left;
	border: 0 none;
}
#trackfieldDiv .combobox {
	width: 230px;
}
#trackfieldDiv .combobox_active {
	border: solid 1px #2D8CFF;
	border-bottom: solid 1px #FFF;
}
#trackfieldDiv .combobox .dropdownlist a.light {
	background-color: #2D8CFF;
}
#trackfieldDiv i {
	color: red;
	margin-right: 5px;
}
#trackfieldDiv .fieldtext {
	width: 210px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
#trackfieldDiv .meeting-label{
	color: #747487;
	padding-top: 12px;
	padding-bottom: 0px;
}
@media screen and (max-width: 767px) {
	.navbar-signup-header .navbar-header {
		display: block;
		float: left;
		border: none;
	}
	.navbar-signup-header .collapse {
		display: block;
	}
	#header_container .container > .navbar-collapse {
		background-color: #fff;
		border: none;
	}
	#header_outer .navbar-signup-header .navbar-collapse .navbar-right {
		float: right;
		margin-top: 4px;
	}
}
#create-room .zm-button.is-disabled,#create-room .zm-button.is-disabled:focus,#create-room .zm-button.is-disabled:hover{
	color: #BABACC !important;
}
#create-room #crateRoomTitle h3,#create-room #crateRoomTitle .participants-rooms{
	display: inline-block;
}
#create-room #crateRoomTitle h3{
	margin:0;
	font-size: 24px;
	font-weight: bold;
}
#create-room #crateRoomTitle .participants-rooms{
	background: #F7F7FA;
	border-radius: 8px;
	font-size: 13px;
	line-height: 18px;
	padding:6px 12px;
	margin-left: 5px;
}
#create-room #crateRoomDesc{
	font-size: 15px;
	line-height: 22px;
	display: flex;
	align-items: center;
	margin-bottom: 17px;
}
#create-room .main-content{
	border:1px solid #EDEDF4;
	border-radius: 8px;
	display: flex;
	flex-direction: row;
	height: 380px;
}
#create-room .main-content .room-col,#create-room .main-content .members-col{
	height: 100%;
}
#create-room .main-content .room-col{
	width: 37.5%;
	border-right: 1px solid #EDEDF4;
	position: relative;
}
#create-room .main-content .room-col h4{
	font-size: 16px;
	font-weight: bold;
	line-height: 19px;
	padding: 24px 21px 6px 24px;
}
#create-room .main-content .room-col .room-data{
	height: calc(100% - 62px);
	overflow: auto;
}
#create-room .main-content .room-col h4 .zm-button{
	color: #747487;
	font-size: 12px;
	float: right;
}
#create-room .main-content .empty-content{
	height: calc(100% - 72px);
	position: relative;
}
#create-room .main-content .empty-alert{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 100%;
	text-align: center;
}
#create-room .main-content .room-col .empty-alert p{
	font-weight: bold;
	font-size: 16px;
	line-height: 19px;
}
#create-room .main-content .room-col .empty-alert span{
	display: block;
	font-size: 13px;
	line-height: 23px;
	color: #747487;
}
#create-room .main-content .room-col ul{
	padding:0 12px;
}
#create-room .main-content .room-col li{
	margin-bottom: 4px;
	padding: 4px 12px;
	cursor: pointer;
	font-size: 15px;
	line-height: 24px;
	height: 32px;
	overflow: hidden;
	position: relative;
}
#create-room .main-content .room-col li.hover,#create-room .main-content .room-col li:focus{
	background-color: #F7F7FA;
	border-radius: 8px;
}
#create-room .main-content .room-col li.active{
	background: #0E71EB;
	border-radius: 8px;
	color: #fff;
}
#create-room .main-content .room-col li.active .number,#create-room .main-content .room-col li.active .zm-button{
	color: #fff;
	background: #0E71EB;
}
#create-room .main-content .room-col li.active .zm-button:hover,#create-room .main-content .room-col li.active .zm-button:hover{
	color: #fff;
	background: #0E71EB;
}
#create-room .main-content .room-col li.hover .zm-button,#create-room .main-content .room-col li .zm-button:hover, #create-room .main-content .room-col li .zm-button:focus{
	display: block;
}
#create-room .main-content .room-col li.hover .number,#create-room .main-content .room-col li .zm-button:hover .number, #create-room .main-content .room-col li .zm-button:focus .number{
	display: none;
}
#create-room .main-content .room-col .name{
	font-weight: 500;
	float: left;
}
#create-room .main-content .room-col .number{
	font-weight: 600;
	float: right;
	color: #747487;
	min-width: 24px;
	text-align: center;
	position: absolute;
	right: 0;
	background:#fff;
}
#create-room .main-content .room-col li .zm-button{
	position: absolute;
	right: 0;
	display: none;
	background: #fff;
}
#create-room .main-content .members-col{
	padding:0;
	position: relative;
	width: calc(100% - 37.5%);
}
#create-room .main-content .members-col>div{
	height: 100%;
}
#create-room .main-content .members-col h4{
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	margin: 24px 21px 0 20px;
	height: 24px;
	padding: 0 4px;
	cursor: pointer;
	display: inline-block;
}
#create-room .main-content .members-col h4:hover,#create-room .main-content .members-col h4:focus{
	background: #f7f7fa;
	border-radius: 6px;
}
#create-room .main-content .members-col h4 .zm-button{
	opacity: 0;
	vertical-align: bottom;
}
#create-room .main-content .members-col h4:hover .zm-button,#create-room .main-content .members-col h4 .zm-button:hover,#create-room .main-content .members-col h4 .zm-button:focus{
	opacity: 1;
}
#create-room .main-content .members-col .edit-name{
	padding: 20px 21px 0 24px;
}
#create-room .main-content .members-col .edit-member{
	padding: 8px 21px 0 24px;
}
#create-room .main-content .members-col .edit-member .zm-autocomplete{
	width: 100%;
}
#create-room .main-content .members-col .edit-member .add-member-error{
	color: #E02828;
	font-size: 14px;
	margin:5px 21px 0 0;
}
#create-room .main-content .members-col .edit-member .submit-btn{
	padding-top: 10px;
}
#create-room .main-content .members-col .empty-alert p{
	font-size: 13px;
	line-height: 16px;
	color: #747487;
	margin-bottom: 12px;
}
#create-room .main-content .members-col .has-member{
	padding-left: 10px;
	height: 100%;
}
#create-room .main-content .members-col .has-member .member-data{
	padding-right: 21px;
	height: calc(100% - 72px);
	overflow: auto;
}
#create-room .main-content .members-col .has-member .add-member{
	margin:16px 0 0 14px;
}
#create-room .main-content .members-col .has-member ul{
	padding:16px 4px 4px;
}
#create-room .main-content .members-col .has-member li{
	font-size: 13px;
	padding: 4px 4px 4px 16px;
	position: relative;
	margin-bottom: 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
#create-room .main-content .members-col .has-member li>p{
	line-height: 24px;
	margin: 0;
	display: inline-block;
}
#create-room .main-content .members-col .has-member li:before{
	display: none;
	content: '';
	position: absolute;
	height: 14px;
	width: 8px;
	left: 2px;
	z-index: 200;
	margin-top: 8px;
	line-height: 24px;
	/*
	background: url(https://us02st3.zoom.us/static/94019/image/draft.png) no-repeat 0 0;
	*/
}
#create-room .main-content .members-col .has-member .action {
	padding-left: 8px;
	position: absolute;
	right: 2px;
	top: 50%;
	transform: translateY(-50%);
	background: #fff;
	display: none;
}
#create-room .main-content .members-col .has-member li.active,
#create-room .main-content .members-col .has-member li:hover{
	cursor: move;
	cursor: move;
}
#create-room .main-content .members-col .has-member li.dragging .action,#create-room .main-content .members-col .has-member li.dragging:before{
	display: none;
}
#create-room .main-content .members-col .has-member li.active:before,
#create-room .main-content .members-col .has-member li.active .action{
	display: block;
}
.move-to-content{
	max-height: 340px;
	overflow: auto;
}
.move-to-ul li{
	font-size: 15px;
	line-height: 32px;
	margin-bottom: 6px;
	cursor: pointer;
	padding: 0 12px;
}
.move-to-ul li:hover,.move-to-ul li:focus,.move-to-ul li:active{
	background-color: #e7f1fd;
}
#create-room .upload-link{
	float: left;
}
#create-room .export-btn{
	float: left;
	color: #747487;
}
#create-room .export-btn:focus, #create-room .export-btn:hover {
	color: #295ebd;
}
.notice-wrapper {
	width: 100%;
	display: none;
	position: relative;
	margin-bottom: 3px;
}
.notice-container {
	padding: 24px 48px 24px 24px;
}
@media only screen and (max-width: 768px) {
	.notice-container {
		padding: 10px 25px;
	}
}
@media only screen and (max-width: 414px) {
	.notice-container {
		padding: 10px 20px;
	}
}
.notice-container div {
	display: inline-block;
}
.notice-title {
	font-weight: bold;
	line-height: 150%;
}
.notice-medium {
	background-color: #FCF6ED;
	color: #775111;
}
.notice-low {
	background-color: #E4F7EB;
	color: #1C7E41;
}
.notice-high {
	background-color: #FFE8E8;
	color: #B22424;
}
.notice-container a {
	color: #0065F2;
	font-weight: bold;
	text-decoration: none;
}
.notice-main-content {
	padding-right: 24px;
}
.notice-close {
	position: absolute;
	top: 10px;
	right: 23px;
	font-size: 30px;
	color: #232333;
	cursor: pointer;
	border: none;
	background: transparent;
}
.notice-close:before {
	content: '\00d7';
}
.optout-notice-wrapper {
	width: 100%;
	display: none;
	position: relative;
}
.optout-notice-container {
	padding: 24px 48px 24px 24px;
}
.meeting-disabledpmi-alert{
	min-width:415px;
}
.meeting-edit-disabledpmi-alert{
	min-width:553px;
}
.meeting-edit-disabledpmi-alert p,.meeting-disabledpmi-alert p{
	line-height: inherit;
}
@media only screen and (max-width: 414px) {
	.optout-notice-container {
		padding: 10px 20px;
	}
}
.optout-notice-container div {
	display: inline-block;
}
.optout-notice-title {
	font-weight: bold;
	line-height: 150%;
}
.optout-notice-medium {
	background-color: #FCF6ED;
	color: #775111;
}
.optout-notice-low {
	background-color: #E4F7EB;
	color: #1C7E41;
}
.optout-notice-high {
	background-color: #FFE8E8;
	color: #B22424;
}
.optout-notice-container a {
	color: #0065F2;
	font-weight: bold;
	text-decoration: none;
}
.optout-notice-content {
	padding-right: 24px;
}
.optout-notice-close {
	position: absolute;
	top: 10px;
	right: 23px;
	font-size: 30px;
	color: #232333;
	cursor: pointer;
	border: none;
	background: transparent;
}
.optout-notice-close:before {
	content: '\00d7';
}
#content_container.content_container_hide_header{
	padding-top:0px;
}
.body_hide_footer{
	background: #fff;
}
button.ui-datepicker-trigger {
	background-color: transparent !important;
	border: none !important;
}
</style>
<style>
.ada-embed-drawer__iframe-container{
max-height: 550px !important;
max-width: 330px !important;
margin: 10px 10px 10px 10px !important;
}
</style>

<script src="schedule_files/csrf_js"></script>
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
    firstName: '<?php echo isset($app->loggedInUser)?$app->loggedInUser->firstname:'' ?>',
    email: '<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>'
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
<script type="text/javascript" src="schedule_files/all.js"></script>
<script type="text/javascript" src="schedule_files/jquery.js"></script>
<script type="text/javascript" src="schedule_files/jquery-ui.js"></script>
<script type="text/javascript" src="schedule_files/jquery-datepicker-acc.js"></script>
<script type="text/javascript" src="schedule_files/date_time_common.js"></script>
<script type="text/javascript" src="schedule_files/date_time.js"></script>
<script type="text/javascript" src="schedule_files/meetings.js"></script>
<script type="text/javascript" src="schedule_files/lodash.js"></script>
<script type="text/javascript" src="schedule_files/upload.js"></script>
<script type="text/javascript" src="schedule_files/interpretation.js"></script>
<script type="text/javascript" src="schedule_files/select2.js"></script>
<script type="text/javascript" src="schedule_files/combobox.js"></script>
<script type="text/javascript" src="schedule_files/zoom_plugin.js"></script>
<script type="text/javascript" src="schedule_files/vue.js"></script>
<script type="text/javascript" src="schedule_files/zoom-components.js"></script>
<script type="text/javascript" src="schedule_files/popup-captcha.js"></script>
<script type="text/javascript" src="schedule_files/new_recurrence_tools.js"></script>
<script type="text/javascript" src="schedule_files/public_calendar_warning.js"></script>
<script type="text/javascript" src="schedule_files/vue-dragging.js"></script>
<script type="text/javascript" src="schedule_files/breakoutRoomDialog.js"></script>
<script type="text/javascript" src="schedule_files/meeting-vue.js"></script>
<script type="text/javascript" src="schedule_files/password.js"></script>
<!--
<script async="" id="__ada" data-handle="zoom" src="schedule_files/embed.js"></script>
-->
<script async="" id="ze-snippet" src="schedule_files/snippet.js"> </script>
<script type="text/javascript" src="schedule_files/wootric-sdk.js"></script>
<script type="text/javascript" src="schedule_files/pbxSideMenu.js"></script>
<script type="text/javascript" src="schedule_files/notification.js"></script>
<script type="text/javascript" src="schedule_files/form_custom.js"></script>
<script type="text/javascript" src="schedule_files/member_add.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.0/bootbox.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/6.4.0/adapter.js"></script>
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

var formSaved = false;
$(window).on('beforeunload', function(event) {
	if (!formSaved) {
		$('ul.member_addlist#member_add_list li').each(function(index, user) {
			if (user.name == 'guest') {
				const data = new FormData();
				data.set('userid', user.value);
				fetch('./deleteguest.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
				.then((res) => res.json())
				.then((response) => {
					if (response.result == 0) {
					} else {
						SB.alert(response.result_string);
					}
				}).catch((reason) => {
					SB.alert(reason);
				});
			}
		});
	}
});

$(window).on("load", function() {
	attachedcb = function() {
		registerUsername('<?php echo $app->loggedInUser->user_id.'_'.$app->loggedInUser->displayname ?>');
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
<?php
if (!empty($meeting_id)) {
?>
		data.set('meeting_no', '<?php echo $meeting_id ?>');
<?php
}
?>
		data.set('title', document.querySelector('#topic').value);
		data.set('memo', document.querySelector('#agenda').value);

		if ($('#start_date').length > 0) {
			var ampm = $('#start_time_2').val();
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
			data.set('room_users[]', '<?php echo $app->loggedInUser->user_id ?>');
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

		/*
		$("#waiting-dialog").dialog({
			modal: true, //モーダル表示
			title: "処理中", //タイトル
			resizable: false,
			width: "auto"
		});
		*/
		SB.showSuccessMsg($.i18n.get("meeting.schedule_process"));
		fetch('./new_schedule.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
		.then((res) => res.json())
		.then((response) => {
			//$("#waiting-dialog").dialog('close');
			if (response.result == 0) {
				//infoDialog('登録完了', response.result_string, 'schedule.php');
<?php
if (empty($meeting_id)) {
?>
				SB.showSuccessMsg($.i18n.get("meeting.schedule_success"));
<?php
} else {
?>
				SB.showSuccessMsg($.i18n.get("meeting.edit_success"));
<?php
}
?>
				formSaved = true;
			} else {
				SB.alert(response.result_string);
			}
		}).catch((reason) => {
			//$("#waiting-dialog").dialog('close');
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
<script>
$.i18n.load({
  "common.btn_close": "閉じる",
  "common.btn_yes": "はい",
  "common.btn_no": "いいえ",
  "common.title.prompt": "即時",
  "common.title.confirmation": "確認",
  "common.unknown_error": "不明のエラーです！",
  "common.error": "エラー",
  "common.enter_time_in_12_hour": "有効な時間を12時間でを入力してください",
  "common.tips": "ヒント、Enterを押して展開してください",
  "jquery.validation_required":"このフィールドは必須です。",
  "jquery.validation_remote":"このフィールドを直してください。",
  "jquery.validation_email":"有効なメールアドレスを入力してください。",
  "jquery.validation_url":"有効なURLを入力してください。",
  "jquery.validation_date":"有効な日付を入力してください。",
  "jquery.validation_dateISO":"有効な日付（ISO）を入力してください。",
  "jquery.validation_number":"有効な数を入力してください。",
  "jquery.validation_digits":"桁数だけ入力してください。",
  "jquery.validation_creditcard":"有効なクレジットカード番号を入力してください。",
  "jquery.validation_equalTo":"同じ値を再入力してください。",
  "jquery.validation_maxlength":"{0}字未満を入力してください。",
  "jquery.validation_minlength":"{0}字以上を入力してください。",
  "jquery.validation_rangelength":"{0}字と{1}字の長さの間にある値を入力してください。",
  "jquery.validation_range":"{0}と{1}の間の値を入力してください。",
  "jquery.validation_max":"{0}以下の値を入力してください。",
  "jquery.validation_min":"{0}以上の値を入力してください。",
  "billing.pastdue.notice":"支払期日超過通知",
  "billing.pastdue.balance_new":"お客様のアカウントには{0}{1}の未払い残高があります。",
  "billing.pastdue.terminate_time":"残高が支払われない場合、アカウントタイプが{0}の基本プランに変更されます。",
  "billing.pastdue.terminate_soon":"残高が支払われない場合、アカウントタイプが基本プランに近日中に変更されます。",
  "billing.pastdue.this_means":"この場合、現在ご利用の多くの機能が利用できなくなります。",
  "billing.pastdue.pay_online":"<a href=\"/billing/report\" onClick=\"ga('send', 'event', 'billing', 'click-pastdue-paynow-link', 'Past Due Notification Pay Now Link');\">こちらをクリック</a>してオンラインで支払うか、1-888-799-9666まで電話で今すぐお問合せいただき、サービスの中断を回避してください。",
  "billing.pastdue.contact_sales":"サービスをシームレスに行うために、今すぐ<a href=\"/contactsales\" target=\"_blank\">営業担当者に連絡</a>するか1.888.799.9666まで電話してください。",
  "meeting.upcoming_meetings":"次回のミーティング",
  "meeting.current.start_this_meeting":"このミーティングを開始しますか?",
  "meeting.current.start_these_meetings":"これらのミーティングのいずれかを開始しますか?",
  "meeting.current.view_more":"さらに表示...",
  "meeting.current.start_new_meeting":"新しいミーティングを開始",
  "meeting.password.opt_out_acceptChange_success":"パスワードはアカウントに対して{0}にデフォルトで有効になります。",
  "meeting.password.opt_out_success":"パスワードはアカウントに対してデフォルトで有効になりません。",
  "meeting.opt_out_desc.zr_upgrade1":"パスワードはアカウントに対して{0}にデフォルトで有効になります。",
  "meeting.opt_out_desc.zr_upgrade2":"<a href=\"/location\">Zoom RoomsとZoom Roomsコントローラ</a>を最新バージョンにアップグレードし、参加したときに最適なエクスペリエンスを得られるようにすることを推奨します。",
  "meeting.password.opt_out_notice_title":"重要な更新",
  "meeting.password.opt_out_notice":"Zoomがアカウント設定を更新して、ミーティングやウェビナーに対して{0}にデフォルトでパスワードを有効にします。ここを<a href=\"javascript:void(0)\" onclick=\"showMeetingPassWordOptOut()\">クリック</a>して、詳細を確認したり、この変更をオプトアウトします。",
  "common.time_am":"午前",
  "common.time_pm":"午後",
  "common.enter_time_in_24_hour": "24時間制で有効な時間を入力してください",
  "meeting.email_separate_by_semicolon":"有効なメールアドレスを入力してください。複数のメールはカンマで区切ってください。",
  "meeting.email_domain_separate_by_semicolon":"有効なドメインを入力してください。複数のドメインはカンマで区切ってください。",
  "meeting.confirm_delete":"このミーティングを削除してもよろしいですか？",
  "meeting.confirm_end": "このミーティングを本当に終了しますか。",
  "meeting.invite_oper_step":"招待状を選択し、コピーして貼り付けてください。",
  "meeting.invite_copy_method":"Ctrl + Cを押すか右クリックをしてクリップボードにコピーします。",
  "meeting.invalid_meeting_id":"有効なミーティングIDを入力してください",
  "meeting.join_h323_success":"H.323/SIPルームシステムは参加に成功しました",
  "meeting.require_password":"ミーティングパスワードが必要です",
  "common.unknown_error":"不明のエラーです！",
	"meeting.schedule_process":"ミーティングのスケジュール中です。",
  "meeting.schedule_success":"ミーティングのスケジュールに成功しました。",
  "meeting.edit_success":"ミーティングの編集に成功しました。",
  "meeting.choose_another_date":"クリックして別の日を選択",
  "meeting.require_topic":"トピックが必要です",
  "meeting.require_start_date":"開始日が必要です",
  "meeting.require_start_time":"開始時間が必要です",
  "meeting.enter_password":"ミーティングIDを入力してください",
  "meeting.require_pmi":"パーソナルミーティングIDが必要です",
  'empty.trackfield.error':'このフィールドは必須です。',
  'pac.account_1_settings':'アカウント1の設定を利用',
  'pac.account_2_settings':'アカウント2の設定を利用',
  'pac.select_copy_paste':'招待状を選択し、コピーして貼り付けてください。',
  "meeting.schedule_options_use_pmi":"個人ミーティングID {0}",
  'common.btn_cancel':'キャンセル',
  'common.btn_ok':'OK',
  'meeting.pmi_with_jbh_meeting_pwd_confirm_info':'貴方のアカウントは「ホストの前に参加を可能とする」オプションを選択するには、{0} ({1})パスワードを必要とします。',
  'meeting.schedule_global_country1':'ダイヤル発信元：<strong>{0}<\/strong>',
  'meeting.schedule_global_country2':'ダイヤル発信元：<strong>{0}<\/strong>およびその他の1国',
  'meeting.schedule_global_countries':'ダイヤル発信元：<strong>{0}<\/strong>およびその他の{1}国',
  'common.locked_by_admin':'設定はロックされ、変更できません。あなたのミーティングはすべて、この設定を使用します。',
  'common.btn_close':'閉じる',
  'account.management.domian_examples':'例：company.com、school.edu',
  'meeting.show_how_many_domains_add':'{0}ドメインを追加しました。',
  'webinar.recurrence_type_weekly':'週ごと',
  'webinar.recurrence_type_daily':'毎日',
  'webinar.recurrence_type_monthly':'毎月',
  'webinar.recurrence_type_classic':'固定時刻なし',
  'webinar.recurrence_first':'1回目',
  'webinar.recurrence_second':'2回目',
  'webinar.recurrence_third':'3回目',
  'webinar.recurrence_fourth':'4回目',
  'webinar.recurrence_last':'この月の',
  'webinar.sunday':'日曜日',
  'webinar.monday':'月曜日',
  'webinar.tuesday':'火曜日',
  'webinar.wednesday':'水曜日',
  'webinar.thursday':'木曜日',
  'webinar.friday':'金曜日',
  'webinar.saturday':'土曜日',
  'meeting.require_email':'メールアドレスを入力してください',
  'meeting.interpretation_language':'言語を選択してください',
  'meeting.repeat_email':'他のメールアドレスを入力してください',
  'meeting.repeat_language':'他の言語を選択してください',
  'meeting.breout_room_edit_title':'ブレイクアウトルーム割り当て',
  'meeting.breout_room_edit_max_room_participants':'メールを追加することにより、ブレイクアウトルームに参加者を割り当てます。最大50のブレイクアウトルームを作成し、最大で合計200名の参加者を割り当てられます。',
  'meeting.breout_room_add_room':'ルーム追加ボタン',
  'meeting.breout_room_no_group':'グループなし',
  'meeting.breout_room_no_participants':'参加者なし',
  'meeting.breout_room_add_room_click':'+をクリックしてルームを追加',
  'meeting.breout_room_add_participants':'参加者を追加',
  'meeting.breout_room_add_members':'メンバーを追加...',
  'meeting.breout_room_move_to':'移動先',
  'meeting.breout_room_participants':'参加者',
  'meeting.breout_room_rooms':'ルーム',
  'zoomrooms.rooms':'Rooms',
  'account.settings.bandwidthLimit.dialog.upload.tip1':'CSVファイルをドラッグアンドドロップ',
  'account.settings.bandwidthLimit.dialog.upload.tip2':'または、<button type=\"button\" tabindex=\"0\">参照<\/button>してファイルを選択してください',
  'meeting.breout_room_tip':'ヒント：最大50のブレイクアウトルームを作成し、最大で合計200名の参加者を割り当てられます。',
  'meeting.breout_room_requirements':'CSV形式要件：ブレイクアウトルーム名, メール。クリックして、テンプレートを<a href=\"/meeting/downloadBreoutRoomTemplate\">ダウンロード<\/a>してください。',
  'meeting.breout_room_room_verify_file':'参加者のメールアドレスの確認中...',
  'meeting.breout_room_room_import_file':'ファイルのインポート中...',
  'meeting.jbh.prior.time.unlimited':'Anytime',
  'meeting.jbh.prior.time.set':'{0} minutes',
  'meeting.athenticated.join.sign_to_zoom':'Zoomにサインイン',
  'meeting.schedule.disabled.alert':'Your Personal Meeting ID is disabled <a style=\"margin-left:12px;\" href=\"/profile/setting\" target=\"_blank\">Change Settings<\/a>',
  'meeting.schedule.for.disabled.alert':'{0}\'s Personal Meeting ID is disabled'
});
</script>
<script type="application/javascript">
var myDisablePMI = false;
var disablePMI = myDisablePMI;
var times = ["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];
var hours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
var minutes = ["0","15","30","45"];
var timezonesStr = {
  "Pacific/Midway":"(GMT-11:00) ミッドウェー島、サモア",
  "Pacific/Pago_Pago":"(GMT-11:00) パゴパゴ",
  "Pacific/Honolulu":"(GMT-10:00) ハワイ",
  "America/Anchorage":"(GMT-8:00) アラスカ州",
  "America/Juneau":"(GMT-8:00) ジュノー",
  "America/Vancouver":"(GMT-7:00) バンクーバー",
  "America/Los_Angeles":"(GMT-7:00) 太平洋標準時（米国およびカナダ）",
  "America/Tijuana":"(GMT-7:00) ティファナ",
  "America/Phoenix":"(GMT-7:00) アリゾナ州",
  "America/Edmonton":"(GMT-6:00) エドモントン",
  "America/Denver":"(GMT-6:00) 山地標準時（米国およびカナダ）",
  "America/Mazatlan":"(GMT-6:00) マサトラン",
  "America/Regina":"(GMT-6:00) サスカチュワン州",
  "America/Guatemala":"(GMT-6:00) グアテマラ",
  "America/El_Salvador":"(GMT-6:00) エルサルバドル",
  "America/Managua":"(GMT-6:00) マナグア",
  "America/Costa_Rica":"(GMT-6:00) コスタリカ",
  "America/Tegucigalpa":"(GMT-6:00) テグシガルパ",
  "America/Chihuahua":"(GMT-6:00) チワワ",
  "America/Winnipeg":"(GMT-5:00) ウィニペグ",
  "America/Chicago":"(GMT-5:00) 中部標準時（米国およびカナダ）",
  "America/Mexico_City":"(GMT-5:00) メキシコシティ",
  "America/Panama":"(GMT-5:00) パナマ",
  "America/Bogota":"(GMT-5:00) ボゴタ",
  "America/Lima":"(GMT-5:00) リマ",
  "America/Monterrey":"(GMT-5:00) モンテレー",
  "America/Montreal":"(GMT-4:00) モントリオール",
  "America/New_York":"(GMT-4:00) 東部標準時（米国およびカナダ）",
  "America/Indianapolis":"(GMT-4:00) インディアナ（東部）",
  "America/Puerto_Rico":"(GMT-4:00) プエルトリコ",
  "America/Caracas":"(GMT-4:00) カラカス",
  "America/Santiago":"(GMT-4:00) サンティアゴ",
  "America/La_Paz":"(GMT-4:00) ラパス",
  "America/Guyana":"(GMT-4:00) ガイアナ",
  "America/Halifax":"(GMT-3:00) ハリファックス",
  "America/Montevideo":"(GMT-3:00) モンテビデオ",
  "America/Araguaina":"(GMT-3:00) レシフェ",
  "America/Argentina/Buenos_Aires":"(GMT-3:00) ブエノスアイレス、ジョージタウン",
  "America/Sao_Paulo":"(GMT-3:00) サンパウロ",
  "Canada/Atlantic":"(GMT-3:00) 大西洋標準時（カナダ）",
  "America/St_Johns":"(GMT-2:30) ニューファンドランド・ラブラドール州",
  "America/Godthab":"(GMT-2:00) グリーンランド",
  "Atlantic/Cape_Verde":"(GMT-1:00) カーボベルデ諸島",
  "Atlantic/Azores":"(GMT+0:00) アゾレス諸島",
  "UTC":"(GMT+0:00) 標準時UTC",
  "Etc/Greenwich":"(GMT+0:00) グリニッジ標準時",
  "Atlantic/Reykjavik":"(GMT+0:00) レイキャビク",
  "Africa/Nouakchott":"(GMT+0:00) ヌアクショット",
  "Europe/Dublin":"(GMT+1:00) ダブリン",
  "Europe/London":"(GMT+1:00) ロンドン",
  "Europe/Lisbon":"(GMT+1:00) リスボン",
  "Africa/Casablanca":"(GMT+1:00) カサブランカ",
  "Africa/Bangui":"(GMT+1:00) 西中央アフリカ",
  "Africa/Algiers":"(GMT+1:00) アルジェ",
  "Africa/Tunis":"(GMT+1:00) チュニス",
  "Europe/Belgrade":"(GMT+2:00) ベオグラード、ブラチスラバ、リュブリャナ",
  "CET":"(GMT+2:00) サラエボ、スコピエ、ザグレブ",
  "Europe/Oslo":"(GMT+2:00) オスロ",
  "Europe/Copenhagen":"(GMT+2:00) コペンハーゲン",
  "Europe/Brussels":"(GMT+2:00) ブリュッセル",
  "Europe/Berlin":"(GMT+2:00) アムステルダム、ベルリン、ローマ、ストックホルム、ウィーン",
  "Europe/Amsterdam":"(GMT+2:00) アムステルダム",
  "Europe/Rome":"(GMT+2:00) ローマ",
  "Europe/Stockholm":"(GMT+2:00) ストックホルム",
  "Europe/Vienna":"(GMT+2:00) ウィーン",
  "Europe/Luxembourg":"(GMT+2:00) ルクセンブルク",
  "Europe/Paris":"(GMT+2:00) パリ",
  "Europe/Zurich":"(GMT+2:00) チューリッヒ",
  "Europe/Madrid":"(GMT+2:00) マドリード",
  "Africa/Harare":"(GMT+2:00) ハラレ、プレトリア",
  "Europe/Warsaw":"(GMT+2:00) ワルシャワ",
  "Europe/Prague":"(GMT+2:00) プラハ ブラチスラヴァ",
  "Europe/Budapest":"(GMT+2:00) ブダペスト",
  "Africa/Tripoli":"(GMT+2:00) トリポリ",
  "Africa/Cairo":"(GMT+2:00) カイロ",
  "Africa/Johannesburg":"(GMT+2:00) ヨハネスブルグ",
  "Africa/Khartoum":"(GMT+2:00) ハルツーム",
  "Europe/Helsinki":"(GMT+3:00) ヘルシンキ",
  "Africa/Nairobi":"(GMT+3:00) ナイロビ",
  "Europe/Sofia":"(GMT+3:00) ソフィア",
  "Europe/Istanbul":"(GMT+3:00) イスタンブール",
  "Europe/Athens":"(GMT+3:00) アテネ",
  "Europe/Bucharest":"(GMT+3:00) ブカレスト",
  "Asia/Nicosia":"(GMT+3:00) ニコシア",
  "Asia/Beirut":"(GMT+3:00) ベイルート",
  "Asia/Damascus":"(GMT+3:00) ダマスカス",
  "Asia/Jerusalem":"(GMT+3:00) エルサレム",
  "Asia/Amman":"(GMT+3:00) アンマン",
  "Europe/Moscow":"(GMT+3:00) モスクワ",
  "Asia/Baghdad":"(GMT+3:00) バグダッド",
  "Asia/Kuwait":"(GMT+3:00) クウェート",
  "Asia/Riyadh":"(GMT+3:00) リヤド",
  "Asia/Bahrain":"(GMT+3:00) バーレーン",
  "Asia/Qatar":"(GMT+3:00) カタール",
  "Asia/Aden":"(GMT+3:00) アデン",
  "Africa/Djibouti":"(GMT+3:00) ジブチ",
  "Africa/Mogadishu":"(GMT+3:00) モガディシュ",
  "Europe/Kiev":"(GMT+3:00) キエフ",
  "Europe/Minsk":"(GMT+3:00) ミンスク",
  "Asia/Dubai":"(GMT+4:00) ドバイ",
  "Asia/Muscat":"(GMT+4:00) マスカット",
  "Asia/Baku":"(GMT+4:00) バクー、トビリシ、エレバン",
  "Asia/Tehran":"(GMT+4:30) テヘラン",
  "Asia/Kabul":"(GMT+4:30) カブール",
  "Asia/Yekaterinburg":"(GMT+5:00) エカテリンブルク",
  "Asia/Tashkent":"(GMT+5:00) イスラマバード、カラチ、タシケント",
  "Asia/Calcutta":"(GMT+5:30) インド",
  "Asia/Kolkata":"(GMT+5:30) ムンバイ、コルカタ、ニューデリー",
  "Asia/Kathmandu":"(GMT+5:45) カトマンズ",
  "Asia/Almaty":"(GMT+6:00) アルマトイ",
  "Asia/Dacca":"(GMT+6:00) ダッカ",
  "Asia/Dhaka":"(GMT+6:00) アスタナ、ダッカ",
  "Asia/Rangoon":"(GMT+6:30) ラングーン",
  "Asia/Novosibirsk":"(GMT+7:00) ノボシビルスク",
  "Asia/Krasnoyarsk":"(GMT+7:00) クラスノヤルスク",
  "Asia/Bangkok":"(GMT+7:00) バンコク",
  "Asia/Saigon":"(GMT+7:00) ベトナム",
  "Asia/Jakarta":"(GMT+7:00) ジャカルタ",
  "Asia/Irkutsk":"(GMT+8:00) イルクーツク、ウランバートル",
  "Asia/Shanghai":"(GMT+8:00) 北京、上海",
  "Asia/Hong_Kong":"(GMT+8:00) 香港",
  "Asia/Taipei":"(GMT+8:00) 台北",
  "Asia/Kuala_Lumpur":"(GMT+8:00) クアラルンプール",
  "Asia/Singapore":"(GMT+8:00) シンガポール",
  "Australia/Perth":"(GMT+8:00) パース",
  "Asia/Yakutsk":"(GMT+9:00) ヤクーツク",
  "Asia/Seoul":"(GMT+9:00) ソウル",
  "Asia/Tokyo":"(GMT+9:00) 大阪、札幌、東京",
  "Australia/Darwin":"(GMT+9:30) ダーウィン",
  "Australia/Adelaide":"(GMT+9:30) アデレード",
  "Asia/Vladivostok":"(GMT+10:00) ウラジオストク",
  "Pacific/Port_Moresby":"(GMT+10:00) グアム、ポートモレスビー",
  "Australia/Brisbane":"(GMT+10:00) ブリスベン",
  "Australia/Sydney":"(GMT+10:00) キャンベラ、メルボルン、シドニー",
  "Australia/Hobart":"(GMT+10:00) ホバート",
  "Asia/Magadan":"(GMT+11:00) マガダン",
  "SST":"(GMT+11:00) ソロモン諸島",
  "Pacific/Noumea":"(GMT+11:00) ニューカレドニア",
  "Asia/Kamchatka":"(GMT+12:00) カムチャッカ半島",
  "Pacific/Fiji":"(GMT+12:00) フィジー諸島、マーシャル諸島",
  "Pacific/Auckland":"(GMT+12:00) オークランド、ウェリントン",
  "Pacific/Apia":"(GMT+13:00) サモア独立国"
};
var timezones = [];
_.forEach(timezonesStr,function (value, key) {
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
            name: "<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>",
            email: "<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>"
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
    name: "<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>",
    email: "<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>",
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
email: "<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>", // TODO: The current logged in user's email address. OPTIONAL
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
<div class="total-main-content">
  <div id="skiptocontent">
    <a role="complementary" aria-label="skip" href="#the-main-content">メインコンテンツまでスキップ</a>
  </div>
	<form id="waiting-dialog" class="modaldialog hideme form-horizontal" action="javascript:;" autocomplete="off" novalidate="novalidate">
		<div>ミーティングを作成し、メールを送信しています。</div>
	</form>
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
								<?php
								$pr = isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'';
								$dn = isset($app->loggedInUser->displayname)?urlencode($app->loggedInUser->displayname):'';
								?>
								<a id="mobile-host-btn" href="./room.php?roomId=<?php echo $pr ?>" target="_blank">開催する</a>
							</li>
            </ul>
            <div class="left">
              <a class="imglink" href="./index.php"><img class="logo" src="schedule_files/RoomLogo.png" alt="Zoomのロゴ"></a>
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
								<!--
                <li role="presentation" class="visible-xs divider"></li>
                <li role="none"><a role="menuitem" id="btnScheduleMeeting" tracking-id="headerSchedule" tracking-category="NavHeader" href="./schedule.php" class="scheduleameeting light">ミーティングをスケジュールする</a></li>
                <li role="none"><a role="menuitem" id="btnJoinMeeting" tracking-id="headerMenuJoin" tracking-category="NavHeader" class="hidden-xs" href="./join.php" onclick="ga('send', 'event', 'product', 'click-nav-joinmeeting', 'Header Nav Join a Meeting');">ミーティングに参加する</a></li>
								-->
								<?php
								$pr = isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'';
								?>
								<li><a role="menuitem" id="btnJoinMeeting" tracking-id="headerMenuJoin" tracking-category="NavHeader" class="hidden-xs" href="./room.php?roomId=<?php echo $pr ?>" onclick="ga('send', 'event', 'product', 'click-nav-joinmeeting', 'Header Nav Join a Meeting');">ミーティングを開催する </a></li>
								<!--
                <li role="none">
                  <div id="dropdown-hostmeeting" class="dropdown hidden-xs" aria-haspopup="true">
                    <a id="btnHostMeeting" data-toggle="dropdown" href="javascript:;" class="hostmeeting" aria-expanded="false" onclick="ga('send', 'event', 'product', 'click-nav-hostmeeting', 'Header Nav Host a Meeting');">ミーティングを開催する <span class="caret"></span></a>
                    <ul id="hostMeetingDropdown" class="dropdown-menu">
                      <li role="none">
												<?php
												//$pr = isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'';
												//$dn = isset($app->loggedInUser->displayname)?urlencode($app->loggedInUser->displayname):'';
												?>
                        <a role="menuitem" tracking-id="headerMenuHostVideoON" tracking-category="NavHeader" href="./room.php?roomId=<?php //echo $pr ?>&displayName=<?php //echo $dn ?>">ビデオはオン</a>
                      </li>
                      <li role="none">
                        <a role="menuitem" tracking-id="headerMenuHostVideoOFF" tracking-category="NavHeader" href="./webmeeting.php">ビデオはオフ</a>
                      </li>
                      <li role="none">
                        <a role="menuitem" tracking-id="headerMenuScreenShare" tracking-category="NavHeader" href="./sharemeeting.php">画面共有のみ</a>
                      </li>
                    </ul>
                  </div>
                </li>
								-->
                <li class="visible-xs divider" role="presentation"></li>
								<li role="none" class="pic" id="pic">
                  <a href="javascript:;" role="button" id="avator-profile" class="profile-pic hidden-xs" aria-label="<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>, 基本" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="profile-menu">
                    <img id="headerPic" src="<?php echo $photo_image ?>" alt="電話">
                  </a>
                  <div class="profile-menu" id="profile-menu" aria-labelledby="avator-profile" tabindex="0">
                    <span class="profile-user-type hidden-xs" role="none">基本</span>
                    <a id="profile-menu-item-profile" role="menuitem" aria-label="Go to profile" href="./index.php" class="profile avator-menu-item" tabindex="-1">
                      <span class="hidden-xs">
                        <b><?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?></b>
												<?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>
                      </span>
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
    <div id="pastdue_msg" class="past_due_msg hideme" style="display:none">
      <div style="display: flex">
        <div id="pay_us_meow_div">
          <img src="schedule_files/pay_us_meow.png" alt="今すぐ支払いますか？" align="left">
        </div>
        <div id="pastdue_msg_content"></div>
        <a class="close" data-dismiss="alert" id="past_due_msg_close">×</a>
      </div>
    </div>
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
<?php
if (isset($app->loggedInUser) && $app->loggedInUser->is_admin) {
?>
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
<?php
}
?>
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
		            <li>ミーティングをスケジュールする</li>
		          </ul>
		          <h3 style="padding-bottom: 10px;"><span>ミーティングをスケジュールする</span></h3>
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
<?php
// 特定の日付がその月の何番目の週かを取得
function getWeekNo($y,$m,$d){
		// 曜日。フルスペル形式。SundayからSaturday
		$l = date("l",mktime(0,0,0,$m,$d,$y));
		// 月。フルスペルの文字。January から December
		$f = date("F",mktime(0,0,0,$m,$d,$y));
		// 例えば date("j",strtotime("first Sunday of June 2019")) は 2
		if(date("j",strtotime("first  {$l} of {$f} {$y}"))==$d) return 1;
		if(date("j",strtotime("second {$l} of {$f} {$y}"))==$d) return 2;
		if(date("j",strtotime("third  {$l} of {$f} {$y}"))==$d) return 3;
		if(date("j",strtotime("fourth {$l} of {$f} {$y}"))==$d) return 4;
		if(date("j",strtotime("fifth  {$l} of {$f} {$y}"))==$d) return 5;
		return false;
}
// 本日の年月日を取得
list($y,$m,$d) = explode("-",date("Y-n-j"));

if (isset($app->loggedInUser)) {
	$fmt = $app->loggedInUser->phpformat;
} else {
	$fmt = 'Y/m/d';
}
if (!empty($meeting_id)) {
	$meeting = new Meeting($app, $meeting_id);
}
if (isset($meeting) && !$meeting->private) {
	$hour = $meeting->start->format('G');
	$minute = intval($meeting->start->format('i'));
} else {
	$hour = date('G');
	$minute = intval(date('i'));
}
$am = intval($hour) < 12;
if ($am) {
	$hour = intval($hour);
} else {
	$hour = intval($hour) - 12;
}

$topic = "マイミーティング";
$agenda = "";
$datetime = date($fmt);
$repeat = 'norepeat';
$daily_every = 1;
$weekly_every = 1;
$weekly_dotw = array();
$monthly_every = 1;
$monthly_by = 'bymonthday';
$monthly_day = intval(date('j'));
$monthly_numof = intval(getWeekNo($y,$m,$d));
$monthly_dotw = strtolower(date('D'));
$end_by = 'end_datetime';
$limit = date($fmt);
$times = 1;
$withPMI = 'off';
$whichPass = 'meeting';
$meetingPass = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz'), 0, 8);
$videoHost = TRUE;
$videoPart = TRUE;
$muteBegin = FALSE;
$recLocal = FALSE;
if (isset($meeting)) {
	$topic = $meeting->title;
	$agenda = $meeting->memo;
	$datetime = $meeting->start->format($fmt);
	$repeat = $meeting->repeat;
	$daily_every = intval($meeting->daily_every);
	$weekly_every = intval($meeting->weekly_every);
	$monthly_every = intval($meeting->monthly_every);
	$weekly_dotw = $meeting->weekly_dotw;
	$monthly_by = $meeting->monthly_by;
	$monthly_day = $meeting->monthly_day;
	$monthly_numof = $meeting->monthly_numof;
	$monthly_dotw = $meeting->monthly_dotw;
	$end_by = $meeting->end_by;
	if (gettype($meeting->limit) != "NULL") {
		$limit = $meeting->limit->format($fmt);
	}
	$times = $meeting->times;
	$withPMI = $meeting->with_pmi;
	$whichPass = $meeting->auth_method;
	$meetingPass = $meeting->pass;
	$videoHost = $meeting->video_host;
	$videoPart = $meeting->video_part;
	$muteBegin = $meeting->mute_begin;
	$recLocal = $meeting->rec_local;
}
?>
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
		                    <input type="text" id="topic" name="topic" maxlength="200" value="<?php echo $topic ?>" class="form-control">
		                  </div>
		                </div>
		                <div class="form-group">
		                  <label class="meeting-label col-md-2" for="agenda">説明（任意）</label>
		                  <div class="controls col-md-5">
		                    <textarea class="sch-desc form-control" id="agenda" name="agenda" maxlength="2000" placeholder="ウェビナーの説明を入力"><?php echo $agenda ?></textarea>
		                  </div>
		                </div>
		              </div>
		              <div class="z-form-row">
		                <div id="mt_time">
		                  <div class="form-group">
		                    <label class="meeting-label col-md-2">開催日時</label>
		                    <div class="controls col-md-10 static">
		                      <input aria-label="start date" type="text" id="start_date" name="start_date" class="input-datepicker hasDatepicker" style="display:inline-block;" value="<?php echo $datetime ?>">
		                      <button type="button" class="ui-datepicker-trigger" aria-label="Date picker クリックして別の日を選択">
		                        <img src="schedule_files/calendar.gif" alt="クリックして別の日を選択" title="クリックして別の日を選択">
		                      </button> &nbsp;
		                      <div class="time-select">
		                        <label class="sr-only" for="start_time" aria-label="start time">start time</label>
		                        <div class="zm-select">
															<select id="start_time">
																<option value="">選択してください</option>
																<option id="select-item-start_time-0" value="00:00"<?php echo ($hour==0&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">0:00</span></option>
																<option id="select-item-start_time-1" value="00:05"<?php echo ($hour==0&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">0:05</span></option>
																<option id="select-item-start_time-2" value="00:10"<?php echo ($hour==0&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">0:10</span></option>
																<option id="select-item-start_time-3" value="00:15"<?php echo ($hour==0&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">0:15</span></option>
																<option id="select-item-start_time-4" value="00:20"<?php echo ($hour==0&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">0:20</span></option>
																<option id="select-item-start_time-5" value="00:25"<?php echo ($hour==0&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">0:25</span></option>
																<option id="select-item-start_time-6" value="00:30"<?php echo ($hour==0&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">0:30</span></option>
																<option id="select-item-start_time-7" value="00:35"<?php echo ($hour==0&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">0:35</span></option>
																<option id="select-item-start_time-8" value="00:40"<?php echo ($hour==0&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">0:40</span></option>
																<option id="select-item-start_time-9" value="00:45"<?php echo ($hour==0&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">0:45</span></option>
																<option id="select-item-start_time-10" value="00:50"<?php echo ($hour==0&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">0:50</span></option>
																<option id="select-item-start_time-11" value="00:55"<?php echo ($hour==0&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">0:55</span></option>

																<option id="select-item-start_time-12" value="01:00"<?php echo ($hour==1&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">1:00</span></option>
																<option id="select-item-start_time-13" value="01:05"<?php echo ($hour==1&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">1:05</span></option>
																<option id="select-item-start_time-14" value="01:10"<?php echo ($hour==1&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">1:10</span></option>
																<option id="select-item-start_time-15" value="01:15"<?php echo ($hour==1&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">1:15</span></option>
																<option id="select-item-start_time-16" value="01:20"<?php echo ($hour==1&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">1:20</span></option>
																<option id="select-item-start_time-17" value="01:25"<?php echo ($hour==1&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">1:25</span></option>
																<option id="select-item-start_time-18" value="01:30"<?php echo ($hour==1&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">1:30</span></option>
																<option id="select-item-start_time-19" value="01:35"<?php echo ($hour==1&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">1:35</span></option>
																<option id="select-item-start_time-20" value="01:40"<?php echo ($hour==1&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">1:40</span></option>
																<option id="select-item-start_time-21" value="01:45"<?php echo ($hour==1&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">1:45</span></option>
																<option id="select-item-start_time-22" value="01:50"<?php echo ($hour==1&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">1:50</span></option>
																<option id="select-item-start_time-23" value="01:55"<?php echo ($hour==1&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">1:55</span></option>

																<option id="select-item-start_time-24" value="02:00"<?php echo ($hour==2&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">2:00</span></option>
																<option id="select-item-start_time-25" value="02:05"<?php echo ($hour==2&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">2:05</span></option>
																<option id="select-item-start_time-26" value="02:10"<?php echo ($hour==2&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">2:10</span></option>
																<option id="select-item-start_time-27" value="02:15"<?php echo ($hour==2&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">2:15</span></option>
																<option id="select-item-start_time-28" value="02:20"<?php echo ($hour==2&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">2:20</span></option>
																<option id="select-item-start_time-29" value="02:25"<?php echo ($hour==2&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">2:25</span></option>
																<option id="select-item-start_time-30" value="02:30"<?php echo ($hour==2&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">2:30</span></option>
																<option id="select-item-start_time-31" value="02:35"<?php echo ($hour==2&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">2:35</span></option>
																<option id="select-item-start_time-32" value="02:40"<?php echo ($hour==2&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">2:40</span></option>
																<option id="select-item-start_time-33" value="02:45"<?php echo ($hour==2&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">2:45</span></option>
																<option id="select-item-start_time-34" value="02:50"<?php echo ($hour==2&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">2:50</span></option>
																<option id="select-item-start_time-35" value="02:55"<?php echo ($hour==2&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">2:55</span></option>

																<option id="select-item-start_time-36" value="03:00"<?php echo ($hour==3&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">3:00</span></option>
																<option id="select-item-start_time-37" value="03:05"<?php echo ($hour==3&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">3:05</span></option>
																<option id="select-item-start_time-38" value="03:10"<?php echo ($hour==3&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">3:10</span></option>
																<option id="select-item-start_time-39" value="03:15"<?php echo ($hour==3&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">3:15</span></option>
																<option id="select-item-start_time-40" value="03:20"<?php echo ($hour==3&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">3:20</span></option>
																<option id="select-item-start_time-41" value="03:25"<?php echo ($hour==3&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">3:25</span></option>
																<option id="select-item-start_time-42" value="03:30"<?php echo ($hour==3&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">3:30</span></option>
																<option id="select-item-start_time-43" value="03:35"<?php echo ($hour==3&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">3:35</span></option>
																<option id="select-item-start_time-44" value="03:40"<?php echo ($hour==3&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">3:40</span></option>
																<option id="select-item-start_time-45" value="03:45"<?php echo ($hour==3&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">3:45</span></option>
																<option id="select-item-start_time-46" value="03:50"<?php echo ($hour==3&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">3:50</span></option>
																<option id="select-item-start_time-47" value="03:55"<?php echo ($hour==3&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">3:55</span></option>

																<option id="select-item-start_time-48" value="04:00"<?php echo ($hour==4&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">4:00</span></option>
																<option id="select-item-start_time-49" value="04:05"<?php echo ($hour==4&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">4:05</span></option>
																<option id="select-item-start_time-50" value="04:10"<?php echo ($hour==4&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">4:10</span></option>
																<option id="select-item-start_time-51" value="04:15"<?php echo ($hour==4&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">4:15</span></option>
																<option id="select-item-start_time-52" value="04:20"<?php echo ($hour==4&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">4:20</span></option>
																<option id="select-item-start_time-53" value="04:25"<?php echo ($hour==4&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">4:25</span></option>
																<option id="select-item-start_time-54" value="04:30"<?php echo ($hour==4&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">4:30</span></option>
																<option id="select-item-start_time-55" value="04:35"<?php echo ($hour==4&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">4:35</span></option>
																<option id="select-item-start_time-56" value="04:40"<?php echo ($hour==4&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">4:40</span></option>
																<option id="select-item-start_time-57" value="04:45"<?php echo ($hour==4&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">4:45</span></option>
																<option id="select-item-start_time-58" value="04:50"<?php echo ($hour==4&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">4:50</span></option>
																<option id="select-item-start_time-59" value="04:55"<?php echo ($hour==4&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">4:55</span></option>

																<option id="select-item-start_time-60" value="05:00"<?php echo ($hour==5&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">5:00</span></option>
																<option id="select-item-start_time-61" value="05:05"<?php echo ($hour==5&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">5:05</span></option>
																<option id="select-item-start_time-62" value="05:10"<?php echo ($hour==5&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">5:10</span></option>
																<option id="select-item-start_time-63" value="05:15"<?php echo ($hour==5&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">5:15</span></option>
																<option id="select-item-start_time-64" value="05:20"<?php echo ($hour==5&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">5:20</span></option>
																<option id="select-item-start_time-65" value="05:25"<?php echo ($hour==5&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">5:25</span></option>
																<option id="select-item-start_time-66" value="05:30"<?php echo ($hour==5&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">5:30</span></option>
																<option id="select-item-start_time-67" value="05:35"<?php echo ($hour==5&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">5:35</span></option>
																<option id="select-item-start_time-68" value="05:40"<?php echo ($hour==5&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">5:40</span></option>
																<option id="select-item-start_time-69" value="05:45"<?php echo ($hour==5&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">5:45</span></option>
																<option id="select-item-start_time-70" value="05:50"<?php echo ($hour==5&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">5:50</span></option>
																<option id="select-item-start_time-71" value="05:55"<?php echo ($hour==5&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">5:55</span></option>

																<option id="select-item-start_time-72" value="06:00"<?php echo ($hour==6&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">6:00</span></option>
																<option id="select-item-start_time-73" value="06:05"<?php echo ($hour==6&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">6:05</span></option>
																<option id="select-item-start_time-74" value="06:10"<?php echo ($hour==6&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">6:10</span></option>
																<option id="select-item-start_time-75" value="06:15"<?php echo ($hour==6&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">6:15</span></option>
																<option id="select-item-start_time-76" value="06:20"<?php echo ($hour==6&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">6:20</span></option>
																<option id="select-item-start_time-77" value="06:25"<?php echo ($hour==6&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">6:25</span></option>
																<option id="select-item-start_time-78" value="06:30"<?php echo ($hour==6&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">6:30</span></option>
																<option id="select-item-start_time-79" value="06:35"<?php echo ($hour==6&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">6:35</span></option>
																<option id="select-item-start_time-80" value="06:40"<?php echo ($hour==6&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">6:40</span></option>
																<option id="select-item-start_time-81" value="06:45"<?php echo ($hour==6&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">6:45</span></option>
																<option id="select-item-start_time-82" value="06:50"<?php echo ($hour==6&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">6:50</span></option>
																<option id="select-item-start_time-83" value="06:55"<?php echo ($hour==6&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">6:55</span></option>

																<option id="select-item-start_time-84" value="07:00"<?php echo ($hour==7&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">7:00</span></option>
																<option id="select-item-start_time-85" value="07:05"<?php echo ($hour==7&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">7:05</span></option>
																<option id="select-item-start_time-86" value="07:10"<?php echo ($hour==7&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">7:10</span></option>
																<option id="select-item-start_time-87" value="07:15"<?php echo ($hour==7&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">7:15</span></option>
																<option id="select-item-start_time-88" value="07:20"<?php echo ($hour==7&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">7:20</span></option>
																<option id="select-item-start_time-89" value="07:25"<?php echo ($hour==7&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">7:25</span></option>
																<option id="select-item-start_time-90" value="07:30"<?php echo ($hour==7&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">7:30</span></option>
																<option id="select-item-start_time-91" value="07:35"<?php echo ($hour==7&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">7:35</span></option>
																<option id="select-item-start_time-92" value="07:40"<?php echo ($hour==7&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">7:40</span></option>
																<option id="select-item-start_time-93" value="07:45"<?php echo ($hour==7&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">7:45</span></option>
																<option id="select-item-start_time-94" value="07:50"<?php echo ($hour==7&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">7:50</span></option>
																<option id="select-item-start_time-95" value="07:55"<?php echo ($hour==7&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">7:55</span></option>

																<option id="select-item-start_time-96" value="08:00"<?php echo ($hour==8&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">8:00</span></option>
																<option id="select-item-start_time-97" value="08:05"<?php echo ($hour==8&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">8:05</span></option>
																<option id="select-item-start_time-98" value="08:10"<?php echo ($hour==8&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">8:10</span></option>
																<option id="select-item-start_time-99" value="08:15"<?php echo ($hour==8&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">8:15</span></option>
																<option id="select-item-start_time-100" value="08:20"<?php echo ($hour==8&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">8:20</span></option>
																<option id="select-item-start_time-101" value="08:25"<?php echo ($hour==8&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">8:25</span></option>
																<option id="select-item-start_time-102" value="08:30"<?php echo ($hour==8&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">8:30</span></option>
																<option id="select-item-start_time-103" value="08:35"<?php echo ($hour==8&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">8:35</span></option>
																<option id="select-item-start_time-104" value="08:40"<?php echo ($hour==8&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">8:40</span></option>
																<option id="select-item-start_time-105" value="08:45"<?php echo ($hour==8&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">8:45</span></option>
																<option id="select-item-start_time-106" value="08:50"<?php echo ($hour==8&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">8:50</span></option>
																<option id="select-item-start_time-107" value="08:55"<?php echo ($hour==8&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">8:55</span></option>

																<option id="select-item-start_time-108" value="09:00"<?php echo ($hour==9&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">9:00</span></option>
																<option id="select-item-start_time-109" value="09:05"<?php echo ($hour==9&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">9:05</span></option>
																<option id="select-item-start_time-110" value="09:10"<?php echo ($hour==9&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">9:10</span></option>
																<option id="select-item-start_time-111" value="09:15"<?php echo ($hour==9&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">9:15</span></option>
																<option id="select-item-start_time-112" value="09:20"<?php echo ($hour==9&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">9:20</span></option>
																<option id="select-item-start_time-113" value="09:25"<?php echo ($hour==9&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">9:25</span></option>
																<option id="select-item-start_time-114" value="09:30"<?php echo ($hour==9&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">9:30</span></option>
																<option id="select-item-start_time-115" value="09:35"<?php echo ($hour==9&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">9:35</span></option>
																<option id="select-item-start_time-116" value="09:40"<?php echo ($hour==9&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">9:40</span></option>
																<option id="select-item-start_time-117" value="09:45"<?php echo ($hour==9&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">9:45</span></option>
																<option id="select-item-start_time-118" value="09:50"<?php echo ($hour==9&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">9:50</span></option>
																<option id="select-item-start_time-119" value="09:55"<?php echo ($hour==9&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">9:55</span></option>

																<option id="select-item-start_time-120" value="10:00"<?php echo ($hour==10&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">10:00</span></option>
																<option id="select-item-start_time-121" value="10:05"<?php echo ($hour==10&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">10:05</span></option>
																<option id="select-item-start_time-122" value="10:10"<?php echo ($hour==10&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">10:10</span></option>
																<option id="select-item-start_time-123" value="10:15"<?php echo ($hour==10&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">10:15</span></option>
																<option id="select-item-start_time-124" value="10:20"<?php echo ($hour==10&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">10:20</span></option>
																<option id="select-item-start_time-125" value="10:25"<?php echo ($hour==10&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">10:25</span></option>
																<option id="select-item-start_time-126" value="10:30"<?php echo ($hour==10&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">10:30</span></option>
																<option id="select-item-start_time-127" value="10:35"<?php echo ($hour==10&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">10:35</span></option>
																<option id="select-item-start_time-128" value="10:40"<?php echo ($hour==10&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">10:40</span></option>
																<option id="select-item-start_time-129" value="10:45"<?php echo ($hour==10&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">10:45</span></option>
																<option id="select-item-start_time-130" value="10:50"<?php echo ($hour==10&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">10:50</span></option>
																<option id="select-item-start_time-131" value="10:55"<?php echo ($hour==10&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">10:55</span></option>

																<option id="select-item-start_time-132" value="11:00"<?php echo ($hour==11&&$minute<5)?' selected="selected"':'' ?>><span class="real-label-span">11:00</span></option>
																<option id="select-item-start_time-133" value="11:05"<?php echo ($hour==11&&$minute<10)?' selected="selected"':'' ?>><span class="real-label-span">11:05</span></option>
																<option id="select-item-start_time-134" value="11:10"<?php echo ($hour==11&&$minute<15)?' selected="selected"':'' ?>><span class="real-label-span">11:10</span></option>
																<option id="select-item-start_time-135" value="11:15"<?php echo ($hour==11&&$minute<20)?' selected="selected"':'' ?>><span class="real-label-span">11:15</span></option>
																<option id="select-item-start_time-136" value="11:20"<?php echo ($hour==11&&$minute<25)?' selected="selected"':'' ?>><span class="real-label-span">11:20</span></option>
																<option id="select-item-start_time-137" value="11:25"<?php echo ($hour==11&&$minute<30)?' selected="selected"':'' ?>><span class="real-label-span">11:25</span></option>
																<option id="select-item-start_time-138" value="11:30"<?php echo ($hour==11&&$minute<35)?' selected="selected"':'' ?>><span class="real-label-span">11:30</span></option>
																<option id="select-item-start_time-139" value="11:35"<?php echo ($hour==11&&$minute<40)?' selected="selected"':'' ?>><span class="real-label-span">11:35</span></option>
																<option id="select-item-start_time-140" value="11:40"<?php echo ($hour==11&&$minute<45)?' selected="selected"':'' ?>><span class="real-label-span">11:40</span></option>
																<option id="select-item-start_time-141" value="11:45"<?php echo ($hour==11&&$minute<50)?' selected="selected"':'' ?>><span class="real-label-span">11:45</span></option>
																<option id="select-item-start_time-142" value="11:50"<?php echo ($hour==11&&$minute<55)?' selected="selected"':'' ?>><span class="real-label-span">11:50</span></option>
																<option id="select-item-start_time-143" value="11:55"<?php echo ($hour==11&&$minute>=55)?' selected="selected"':'' ?>><span class="real-label-span">11:55</span></option>
															</select>
		                        </div>
		                      </div>
		                      <div class="short-select">
		                        <div class="zm-select">
															<select id="start_time_2" name="start_time_2">
																<option value="">選択してください</option>
																<option value="AM"<?php echo $am?' selected="selected"':'' ?>>午前</option>
																<option value="PM"<?php echo $am?'':' selected="selected"' ?>>午後</option>
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
																<?php
																$hour = 1;
																$minute = 0;
																if (isset($meeting)) {
																	$hour = intval(floor($meeting->minutes / 60));
																	$minute = intval(floor(($meeting->minutes % 60)/15));
																}
																for ($i = 0; $i <= 24; ++$i) {
																?>
																<option id="select-item-duration_hr-<?php echo $i ?>" value="<?php echo ($i<10?'0':'').$i ?>"<?php echo ($hour==$i?' selected="selected"':'') ?>><?php echo $i ?></option>
																<?php
																}
																?>
															</select>
		                        </div>
		                        <span class="zm-select-unit" id="hr-unit" aria-label="hours">時間</span>
		                        <div class="zm-select duration-select">
															<select id="duration_min">
																<option id="select-item-duration_min-0" value="00"<?php echo ($minute==0?' selected="selected"':'') ?>>0</option>
																<option id="select-item-duration_min-1" value="15"<?php echo ($minute==1?' selected="selected"':'') ?>>15</option>
																<option id="select-item-duration_min-2" value="30"<?php echo ($minute==2?' selected="selected"':'') ?>>30</option>
																<option id="select-item-duration_min-3" value="45"<?php echo ($minute==3?' selected="selected"':'') ?>>45</option>
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
		                        <input type="checkbox" id="option_rm" name="option_rm" value="on"<?php echo ($repeat!='norepeat'?' checked="checked"':'') ?>>定期ミーティング&nbsp;&nbsp;
		                        <span class="recurrence_desc hideme" id="recurrence_desc">いつでも</span>
		                      </label>
		                    </div>
		                  </div>
		                  <div id="recurrenceDialog" class="<?php echo ($repeat=='norepeat'?'hideme':'') ?>">
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
																			<option id="select-item-recurrenceType-0" value="DAILY"<?php echo ($repeat=='daily'?' selected="selected"':'') ?>>毎日</option>
																			<option id="select-item-recurrenceType-1" value="WEEKLY"<?php echo ($repeat=='weekly'?' selected="selected"':'') ?>>週ごと</option>
																			<option id="select-item-recurrenceType-2" value="MONTHLY"<?php echo ($repeat=='monthly'?' selected="selected"':'') ?>>毎月</option>
																		</select>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal daily<?php echo ($repeat!='daily'?' hideme':'') ?>">
		                          <div class="form-group">
		                            <label id="dailyInterval-label" class="recurrence-label col-sm-2">次の頻度でリピート</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="dailyInterval">
																			<?php for ($i = 1; $i <= 15; ++$i) { ?>
																			<option id="select-item-dailyInterval-<?php echo $i ?>" value="<?php echo $i ?>"<?php echo ($daily_every==$i?' checked="checked"':'') ?>><?php echo $i ?></option>
																			<?php } ?>
																		</select>
																		<span id="day-unit" class="zm-select-unit">日</span>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal weekly<?php echo ($repeat!='weekly'?' hideme':'') ?>">
		                          <div class="form-group">
		                            <label id="weeklyInterval-label" class="recurrence-label col-sm-2">次の頻度でリピート</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="weeklyInterval">
																			<?php for ($i = 1; $i <= 12; ++$i) { ?>
																			<option id="select-item-weeklyInterval-<?php echo $i ?>" value="<?php echo $i ?>"<?php echo ($weekly_every==$i?' checked="checked"':'') ?>><?php echo $i ?></option>
																			<?php } ?>
																		</select>
		                              </div>
		                              <span id="week-unit" class="zm-select-unit">週間</span>
																</div>
															</div>
														</div>
														<div class="form-horizontal monthly<?php echo ($repeat!='monthly'?' hideme':'') ?>">
		                          <div class="form-group">
		                            <label id="monthlyInterval-label" for="monthlyInterval" class="recurrence-label col-sm-2">次の頻度でリピート</label>
		                            <div class="controls col-sm-9">
		                              <div class="zm-select">
																		<select id="monthlyInterval">
																			<option id="select-item-monthlyInterval-0" value="0"<?php echo ($monthly_every==0?' checked="checked"':'') ?>>1</option>
																			<option id="select-item-monthlyInterval-1" value="1"<?php echo ($monthly_every==1?' checked="checked"':'') ?>>2</option>
																			<option id="select-item-monthlyInterval-2" value="2"<?php echo ($monthly_every==2?' checked="checked"':'') ?>>3</option>
																		</select>
																		<span id="month-unit" class="zm-select-unit">ヶ月</span>
		                              </div>
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal weekly<?php echo ($repeat!='weekly'?' hideme':'') ?>">
		                          <div class="form-group">
		                            <label for="weeklyWeekDays" class="recurrence-label col-sm-2">実施</label>
		                            <div class="controls col-sm-9">
		                              <input type="checkbox" id="weeklyWeekDays0" name="weeklyWeekDays" value="1"<?php echo (in_array('sun',$weekly_dotw)?' checked="checked"':'') ?>>日曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays1" name="weeklyWeekDays" value="2"<?php echo (in_array('mon',$weekly_dotw)?' checked="checked"':'') ?>>月曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays2" name="weeklyWeekDays" value="3"<?php echo (in_array('tue',$weekly_dotw)?' checked="checked"':'') ?>>火曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays3" name="weeklyWeekDays" value="4"<?php echo (in_array('wed',$weekly_dotw)?' checked="checked"':'') ?>>水曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays4" name="weeklyWeekDays" value="5"<?php echo (in_array('thu',$weekly_dotw)?' checked="checked"':'') ?>>木曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays5" name="weeklyWeekDays" value="6"<?php echo (in_array('fri',$weekly_dotw)?' checked="checked"':'') ?>>金曜&nbsp;&nbsp;&nbsp;&nbsp;
		                              <input type="checkbox" id="weeklyWeekDays6" name="weeklyWeekDays" value="7"<?php echo (in_array('sat',$weekly_dotw)?' checked="checked"':'') ?>>土曜
		                            </div>
		                          </div>
		                        </div>
		                        <div class="form-horizontal monthly<?php echo ($repeat!='monthly'?' hideme':'') ?>">
		                          <div class="form-group">
		                            <label for="monthlyBy" class="recurrence-label col-sm-2">実施</label>
		                            <div class="controls col-sm-9">
		                              <div class="form-group">
																		<div class="zm-select">
		                                	<input type="radio" id="byMonyhDay" name="monthlyBy" value="BYMONTHDAY"<?php $monthly_by=='bymonthday'?' checked="checked"':'' ?>>毎月
		                                	<label for="monthlyByDay" class="recurrence-label col-sm-2 sr-only">実施</label>
																			<select id="monthlyByDay">
																				<?php for ($i = 0; $i <= 30; ++$i) { ?>
																				<option id="select-item-monthlyByDay-<?php echo $i ?>" value="<?php echo $i+1 ?>"<?php $monthly_day==$i+1?' selected="selected"':'' ?>><?php echo $i+1 ?></li>
																				<?php } ?>
																			</select>日
		                                </div>
		                              </div>
		                              <div class="form-group" style="margin-bottom: 0px;">
																		<div class="zm-select">
		                                	<input type="radio" id="byWeekDay" name="monthlyBy" value="BYDAY"<?php $monthly_by=='byday'?' checked="checked"':'' ?>>&nbsp;
		                                	<label for="montlyByWeekdayIndex" class="recurrence-label col-sm-2 sr-only">実施</label>
																			<select id="montlyByWeekdayIndex">
																				<option id="select-item-montlyByWeekdayIndex-0" value="1"<?php $monthly_numof==1?' selected="selected"':'' ?>>第1</option>
																				<option id="select-item-montlyByWeekdayIndex-1" value="2"<?php $monthly_numof==2?' selected="selected"':'' ?>>第2</option>
																				<option id="select-item-montlyByWeekdayIndex-2" value="3"<?php $monthly_numof==3?' selected="selected"':'' ?>>第3</option>
																				<option id="select-item-montlyByWeekdayIndex-3" value="4"<?php $monthly_numof==4?' selected="selected"':'' ?>>第4</option>
																				<option id="select-item-montlyByWeekdayIndex-4" value="5"<?php $monthly_numof==5?' selected="selected"':'' ?>>第5</option>
																			</select>
		                                	<label for="montlyByWeekday" class="recurrence-label col-sm-2 sr-only">実施</label>
																			<select id="montlyByWeekday">
																				<option id="select-item-montlyByWeekday-0" value="sun"<?php $monthly_dotw=='sun'?' selected="selected"':'' ?>>日曜日</option>
																				<option id="select-item-montlyByWeekday-1" value="mon"<?php $monthly_dotw=='mon'?' selected="selected"':'' ?>>月曜日</option>
																				<option id="select-item-montlyByWeekday-2" value="tue"<?php $monthly_dotw=='tue'?' selected="selected"':'' ?>>火曜日</option>
																				<option id="select-item-montlyByWeekday-3" value="wed"<?php $monthly_dotw=='wed'?' selected="selected"':'' ?>>水曜日</option>
																				<option id="select-item-montlyByWeekday-4" value="thu"<?php $monthly_dotw=='thu'?' selected="selected"':'' ?>>木曜日</option>
																				<option id="select-item-montlyByWeekday-5" value="fri"<?php $monthly_dotw=='fri'?' selected="selected"':'' ?>>金曜日</option>
																				<option id="select-item-montlyByWeekday-6" value="sat"<?php $monthly_dotw=='sat'?' selected="selected"':'' ?>>土曜日</option>
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
		                                <input type="radio" id="endByDateTime" name="endBy" value="END_DATETIME"<?php echo ($end_by=='end_datetime'?' checked="checked"':'') ?>>期限
		                                <input type="text" id="endDate" name="endDate" class="input-datepicker hasDatepicker" value="<?php echo $limit ?>">
		                                <button type="button" class="ui-datepicker-trigger">
		                                  <img src="schedule_files/calendar.gif" alt="クリックして別の日を選択" title="クリックして別の日を選択">
		                                </button>
		                                &nbsp;&nbsp;&nbsp;&nbsp;
		                                <div style="display: inline-block;">
		                                  <div class="zm-select">
																				<input type="radio" id="endByTimes" name="endBy" value="END_TIMES"<?php echo ($end_by=='end_times'?' checked="checked"':'') ?>>合計
																				<select id="endTimes">
																					<?php for ($i = 0; $i <=20; ++$i) { ?>
																					<option id="select-item-endTimes-<?php echo $i ?>" value="<?php echo $i+1 ?>"<?php echo ($times==$i+1)?' selected="selected"':'' ?>><?php echo $i+1 ?></option>
																					<?php } ?>
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
<?php
	$userid = isset($app->loggedInUser)?$app->loggedInUser->user_id:'';
	$groupid = isset($app->loggedInUser)?$app->loggedInUser->group_id:'';
?>
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
<?php
	if (isset($meeting)) {
		foreach($meeting->users as $user) {
?>
																<li value="<?php echo $user->user_id ?>">
																	<span class="list_delete" value="<?php echo $user->user_id ?>"><a href="#" id="member<?php echo $user->user_id ?>">削除</a></span>
																	<span class="list_name"><?php echo $user->disp_name ?></span>
																	<span class="list_department"><?php echo $user->group->name ?></span>
																</li>
<?php
		}
	} else {
?>
		                            <li value="<?php echo $userid ?>">
		                              <span class="list_delete" value="<?php echo $app->loggedInUser->user_id ?>"><a href="#" id="member<?php echo $userid ?>">削除</a></span>
		                              <span class="list_name"><?php echo $app->loggedInUser->displayname ?></span>
		                              <span class="list_department"><?php echo $app->loggedInUser->groupname ?></span>
		                            </li>
<?php
	}
?>
															</ul>
		                          <input type="hidden" name="member_selected_group" id="member_selected_group" value="<?php echo $groupid ?>">
		                          <input type="hidden" name="member" value="<?php echo $userid ?>">
		                        </div>

														<div id="guest_add_form" class="form_select">
															<p id="#guest_add" name="add_guest" class="formbtn_open select_guest">ゲスト追加</p>
														</div>
		                      </div>
		                    </div>
		                  </div>
<?php
	$groups = new Groups($app);

	$menu = recursive_list_menu( $groups->root );
	function recursive_list_menu ( $group ) {
	  global $groupid;
	  $html = "      													<ul class=\"folderbox selected\">\n";
	  $label = $group->name;
	  $query = $group->group_id;
	  $clicked = (intval($groupid)==intval($query)?' clicked':'');
	  $html .= '                                  <li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember('.$query.')" class="active" onclick="searchMember('.$query.')"><span class="cf_title'.$clicked.'">'.$label.'</span></a></p></li>'."\n";
		foreach ( $group->children as $child ) {
	    $html .= "                                  <li>\n".recursive_list_menu( $child )."                                  </li>\n";
	  }
	  $html .= "      													</ul>\n";
	  return $html;
	}
?>
											<div class="comarea">
												<!--メンバー追加　ウィンドウ-->
												<div id="member_add" class="form_editbox invisible">
													<p class="li_close">閉じる</p>
													<p class="li_title">追加メンバーの選択</p>
													<div class="select_editbox">
														<div class="select_cotegory membercotegory">
<?php
	echo $menu;
?>
															<ul class="folderbox selected">
																<li><p class="folder_cotegory folder_opend"><a href="javascript:searchMember('0')" class="active" onclick="searchMember('0')"><span class="cf_title">ゲスト</span></a></p></li>
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

												<!--ゲスト追加　ウィンドウ-->
												<div id="guest_add" class="form_editbox invisible">
													<p class="li_close">閉じる</p>
													<p class="li_title">ゲスト追加</p>
													<div class="select_editbox">
														<ul class="">
															<li class="hideme" id="guest-error">
																<span id="guest-error-mess" style="color: red"></span>
															</li>
															<li>
																<span class="cf_title">組織名</span>
																<input type="text" id="guest_organization" />
															</li>
															<li>
																<span class="cf_title">氏名</span>
																<input type="text" id="guest_name" />
															</li>
															<li>
																<span class="cf_title">メールアドレス</span>
																<input type="text" id="guest_email" />
															</li>
														</ul>
													</div>
													<P>ゲストを追加すると、指定されたメールアドレスに、ゲスト登録のためのURLが送られます</p>
													<p class="li_add"><input type="button" name="add_member" id="add_guest" class="formbtn" value="&raquo;&nbsp;追加する"></p>
												</div>
												<!--ゲスト追加　ウィンドウ ここまで-->
											</div>
		                </div>

		                <div class="meeting-options-section" style="position: relative">
		                  <div id="mock-meeting-options-section" class="simplemodal-overlay hideme" style="position: absolute;background-color: #ffffff; left: 0px; top: 0px; z-index: 200; opacity: 0.5; height: 100%; width: 100%;"></div>
		                  <div class="z-form-row" id="withPMI">
		                    <div class="form-group">
		                      <label class="meeting-label col-md-2" id="meeting_id_Section">ミーティングID </label>
		                      <div class="controls col-md-10">
		                        <div role="radiogroup" aria-describedby="meeting_id_Section">
<?php
if (!isset($meeting) || !$meeting->private) {
?>
		                          <label class="radio">
		                            <input type="radio" id="optionOneTimeId" name="option_schedulewithpmi" value="off"<?php echo ($withPMI=='off'?'checked="checked"':'') ?>>自動的に生成
		                          </label>
		                          <label class="radio">
		                            <input type="radio" id="optionScheduleWithPMI" name="option_schedulewithpmi" value="on"<?php echo ($withPMI=='on'?'checked="checked"':'') ?>>
		                            <span id="withPmiSpan">個人ミーティングID <?php echo isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'' ?></span>
		                          </label>
<?php
} else {
?>
															<label class="radio">
																<input type="radio" id="optionScheduleWithPMI" name="option_schedulewithpmi" value="on" checked="checked" readonly="readonly">
																<span id="withPmiSpan">個人ミーティングID <?php echo isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'' ?></span>
															</label>
<?php
}
?>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                  <div class="z-form-row">
		                    <div class="form-group form-group-password">
		                      <label class="meeting-label col-md-2">ミーティングパスワード</label>
		                      <div class="controls col-md-10">
		                        <label id="label_option_password" class="checkbox-inline" for="option_password">
		                          <input type="radio" id="meeting_password" name="option_password" checked="checked" value="meeting">ミーティングパスワードを必要とする
		                        </label>
		                        <div id="password_container" style="display: inline-block;">
		                          <label for="meeting_pass" id="passwordLabel" style="display: inline; margin-bottom: 0px;">
		                            <span class="sr-only">ミーティングパスワードを必要とする</span>
		                          </label>
		                          <input type="text" id="meeting_pass" name="meeting_pass" placeholder="パスワードを入力" maxlength="10" autocomplete="off" class="form-control hideme" style="display: inline;" value="<?php echo $meetingPass ?>">
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
		                        <label id="label_option_password" class="checkbox-inline" for="option_password">
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
																	<input type="radio" id="option_video_host_on" name="option_video_host" value="1"<?php echo $videoHost?' checked="checked"':'' ?>>オン
																</label>
		                            <label aria-labelledby="host_video host_video_text option_video_host_off_txt" class="radio" id="option_video_host_off_txt" for="option_video_host_off">
																	<input type="radio" id="option_video_host_off" name="option_video_host" value="0"<?php echo !$videoHost?' checked="checked"':'' ?>>オフ
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
																	<input type="radio" id="option_video_participant_on" name="option_video_participants" value="1"<?php echo $videoPart?' checked="checked"':'' ?>>オン
																</label>
		                            <label aria-labelledby="host_video participant_video_text option_video_participant_off_txt" class="radio" id="option_video_participant_off_txt" for="option_video_participant_off">
																	<input type="radio" id="option_video_participant_off" name="option_video_participants" value="0"<?php echo !$videoPart?' checked="checked"':'' ?>>オフ
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
																	<input type="checkbox" class="m_option_chk" id="option_mute_upon_entry" name="option_mute_upon_entry"<?php echo $muteBegin?' checked="checked"':'' ?>>入室時に参加者をミュートにする
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
																	<input type="checkbox" id="option_autorec" name="option_autorec"<?php echo $recLocal?' checked="checked"':'' ?>>
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
		                                        <li id="select-item-first_Language_0-8" role="option" aria-label="韓国語" tabindex="0" class="zm-select-dropdown__item" option-id="1-first-KR"><div class="interpretation-language-icon"><span class="interpretation-language-font">한</span></div> <p class="language-text">韓国語</p></li>
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
		                                        <li id="select-item-second_language_0-8" role="option" aria-label="韓国語" tabindex="0" class="zm-select-dropdown__item" option-id="1-second-KR"><div class="interpretation-language-icon"><span class="interpretation-language-font">한</span></div> <p class="language-text">韓国語</p></li>
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
                        <li class=""><a href="javascript:;" data-locale="es-ES">Español</a></li>
                        <li class=""><a href="javascript:;" data-locale="de-DE">Deutsch</a></li>
                        <li class=""><a href="javascript:;" data-locale="zh-CN">简体中文</a></li>
                        <li class=""><a href="javascript:;" data-locale="zh-TW">繁體中文</a></li>
                        <li class=""><a href="javascript:;" data-locale="fr-FR">Français</a></li>
                        <li class=""><a href="javascript:;" data-locale="pt-PT">Portuguese</a></li>
                        <li class="active"><a href="javascript:;" data-locale="jp-JP">日本語</a></li>
                        <li class=""><a href="javascript:;" data-locale="ru-RU">Русский</a></li>
                        <li class=""><a href="javascript:;" data-locale="ko-KO">한국어</a></li>
                        <li class=""><a href="javascript:;" data-locale="it-IT">Italiano</a></li>
                        <li class=""><a href="javascript:;" data-locale="vi-VN">Tiếng Việt</a></li>
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
                        <li class=""><a href="javascript:;" data-currency="EUR">ユーロ €</a></li>
                        <li class=""><a href="javascript:;" data-currency="GBP">英ポンド £</a></li>
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
	<!--
  <div id="ada-embed" class="ada-embed-app">
    <div>
      <div class="ada-embed-drawer ada-embed-drawer--hidden">
        <div class="ada-embed-drawer__iframe-container" role="dialog" aria-hidden="true"></div>
      </div>
      <div>
        <div class="ada-embed-button-container ada-embed-button-container--not-draggable">
          <button title="Open Support Chat" accesskey="9" class="ada-embed-button" style="width: 56px; height: 56px; background-color: rgb(45, 140, 255);">
            <span style="" class="isvg loaded ada-embed-button__icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="28" fill="#2D8CFF"></circle>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8008 22.7477V31.3905C13.8008 34.5726 16.3674 37.1523 19.5335 37.1523H23.8249C23.8299 37.1523 23.8346 37.155 23.8372 37.1593L26.9036 42.296C27.4602 43.2284 28.8048 43.2284 29.3615 42.296L31.8058 38.2013C32.1943 37.5505 32.8941 37.1523 33.6492 37.1523H36.7316C39.8977 37.1523 42.4643 34.5726 42.4643 31.3905V22.7477C42.4643 19.5655 39.8977 16.9858 36.7316 16.9858H19.5335C16.3674 16.9858 13.8008 19.5655 13.8008 22.7477Z" fill="white"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
	-->
</body>
</html>
