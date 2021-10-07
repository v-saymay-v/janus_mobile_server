<?php
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
$privateroom = isset($app->loggedInUser->privateroom)?$app->loggedInUser->privateroom:'';
$meeting_id = isset($_GET['meeting'])?$_GET['meeting']:$privateroom;

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
<title>ミーティング情報 - Zoom</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0">
<link type="text/css" rel="stylesheet" href="meeting_files/all.css">
<link rel="stylesheet" type="text/css" href="meeting_files/select2.css">
<link rel="stylesheet" type="text/css" href="meeting_files/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="meeting_files/zm-form.css">
<link rel="stylesheet" type="text/css" href="meeting_files/meeting.css">
<link rel="stylesheet" type="text/css" href="meeting_files/style.css">
<link rel="stylesheet" type="text/css" href="meeting_files/zm-vue-component.css">
<link rel="stylesheet" type="text/css" href="meeting_files/common4whenAndDuring.css">
<link rel="stylesheet" href="meeting_files/notification.css">
<link rel="stylesheet" type="text/css" href="meeting_files/zoom-components.css">
<link rel="stylesheet" type="text/css" href="meeting_files/popup-captcha.css">
<style type="text/css">
.ada-embed-button-container--not-draggable{position:fixed;bottom:24px;right:24px;z-index:10000}
.ada-embed-button-container--loading{display:none}
.ada-embed-button-container .ada-embed-button{width:44px;height:44px;border-radius:50%;position:absolute;bottom:0;right:0;cursor:pointer;border:1px solid rgba(0,0,0,.05);transition:.12s ease;box-shadow:0 2px 4px rgba(0,0,0,.1);visibility:visible;padding:0;margin:0;min-width:0;max-width:none;min-height:0;max-height:none;overflow:hidden}
.ada-embed-button-container .ada-embed-button__icon{width:100%;height:100%;top:0;left:0;padding:17%;position:absolute;z-index:10010;box-sizing:border-box}
.ada-embed-button-container .ada-embed-button__icon svg{width:100%!important;height:100%!important}
.ada-embed-button-container .ada-embed-button__icon--hide{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-name:dialogue-fade;animation-name:dialogue-fade}
.ada-embed-button-container .ada-embed-button__emoji{position:absolute;top:0;left:0;z-index:10010;width:100%;height:100%}
.ada-embed-button-container .ada-embed-button__emoji--show{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-name:emoji-bounce;animation-name:emoji-bounce;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}
.ada-embed-button-container .ada-embed-notification{border-radius:50%;position:absolute;bottom:31px;right:-4px;border-style:solid;border-color:#ff3b30;background-color:#fff;box-sizing:border-box;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-name:notification-fade-in;animation-name:notification-fade-in}
@-webkit-keyframes emoji-bounce{
	0%{transform:translateY(60px)}
	10%{transform:translateY(0)}
	17%{transform:rotate(-12deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}23%{transform:rotate(18deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
	30%{transform:rotate(0deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}80%{transform:translateY(0)}
	90%{transform:translateY(3px)}
	to{transform:translateY(-60px)}
}
@keyframes emoji-bounce{
	0%{transform:translateY(60px)}
	10%{transform:translateY(0)}
	17%{transform:rotate(-12deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
	23%{transform:rotate(18deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}30%{transform:rotate(0deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}
	80%{transform:translateY(0)}
	90%{transform:translateY(3px)}
	to{transform:translateY(-60px)}
}
@-webkit-keyframes notification-fade-in{0%{opacity:0;transform:scale3d(0,0,0)}to{opacity:1;transform:scaleX(1)}}
@keyframes notification-fade-in{0%{opacity:0;transform:scale3d(0,0,0)}to{opacity:1;transform:scaleX(1)}}
@-webkit-keyframes dialogue-fade{0%{opacity:1;transform:scaleX(1)}10%{opacity:0;transform:scale3d(0,0,0)}90%{opacity:0;transform:scale3d(0,0,0)}to{opacity:1;transform:scaleX(1)}}
@keyframes dialogue-fade{0%{opacity:1;transform:scaleX(1)}10%{opacity:0;transform:scale3d(0,0,0)}90%{opacity:0;transform:scale3d(0,0,0)}to{opacity:1;transform:scaleX(1)}}
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
	height:auto;max-height:100px;
	overflow:hidden;font-size:16px;
	resize:none;
	word-break:break-word;
	text-align:left;
	min-width:44px
}
@-webkit-keyframes messageBlowup{0%{transform:scale3d(0,0,0);visibility:visible;opacity:0}60%{transform:scale3d(1.1,1.1,1.1);visibility:visible;opacity:1}to{transform:scaleX(1);visibility:visible;opacity:1}}
@keyframes messageBlowup{0%{transform:scale3d(0,0,0);visibility:visible;opacity:0}60%{transform:scale3d(1.1,1.1,1.1);visibility:visible;opacity:1}to{transform:scaleX(1);visibility:visible;opacity:1}}
@-webkit-keyframes messageBlowdown{0%{visibility:visible;transform:scaleX(1);opacity:1}25%{visibility:visible;transform:scaleX(1);opacity:1}50%{visibility:visible;transform:scale3d(1.1,1.1,1.1);opacity:1}to{visibility:hidden;transform:scale3d(0,0,0);opacity:1}}
@keyframes messageBlowdown{0%{visibility:visible;transform:scaleX(1);opacity:1}25%{visibility:visible;transform:scaleX(1);opacity:1}50%{visibility:visible;transform:scale3d(1.1,1.1,1.1);opacity:1}to{visibility:hidden;transform:scale3d(0,0,0);opacity:1}}
</style>
<style type="text/css">
.ada-embed-iframe{
	outline:none;border:0;width:100%;height:100%
}
</style>
<style type="text/css">
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
	transform:translate(375px);
	opacity:0
}
.ada-embed-drawer__mask{
	display:block;
	position:fixed;
	top:0;
	left:0;
	transition:visibility .2s ease,opacity .2s ease;
	visibility:visible;
	opacity:1;
	z-index:9998;
	background-color:rgba(0,0,0,.16)!important;
	width:100%;
	height:100%;
	pointer-events:all
}
.ada-embed-drawer--hidden .ada-embed-drawer__mask{
	visibility:hidden;
	opacity:0;
	pointer-events:none
}
.ada-embed-drawer--hidden.ada-embed-drawer--isIE9 .ada-embed-drawer__mask{
	display:none
}
.ada-embed-drawer--hidden.ada-embed-drawer--mobile-overlay .ada-embed-drawer__iframe-container{
	transform:translate(100vw)
}
.ada-embed-drawer--mobile-overlay .ada-embed-drawer__iframe-container{
	max-width:none;
	height:100%;
	min-height:100%
}
</style>
<style type="text/css">
.ada-embed-app{
	color:#3c3c3f;
	font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
	font-size:16px
}
.ada-embed-app--inside-parent{
	height:100%
}
</style>
<style>
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
</style>
<style>
[v-cloak]{
display:none !important;
}
</style>
<style>
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
</style>
<style>
.has-error .help-block-streamUrl {
color: #FF1E5A;
}
.zm-icon-warning-outline {
color: #F26D21;
}
</style>
<style>
/*#create-room .zm-button--small, .zm-button--small.is-round{*/
/*padding:0 8px;*/
/*}*/
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
/*#create-room .main-content .members-col .has-member li .zm-button{*/
/*display: none;*/
/*float: right;*/
/*}*/
/*#create-room .main-content .members-col .has-member li .zm-button:last-of-type{*/
/*margin-right: 8px;*/
/*margin-left: 0;*/
/*}*/
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
/*only view style*/
/*#create-room.view-room .main-content .room-col li:hover .number{*/
/*display: block;*/
/*}*/
/*#create-room.view-room .main-content .members-col h4{*/
/*cursor: default;*/
/*}*/
/*#create-room.view-room .main-content .members-col h4:hover{*/
/*background: none;*/
/*border: none;*/
/*}*/
/*#create-room.view-room .main-content .members-col .has-member li.active,*/
/*#create-room.view-room .main-content .members-col .has-member li:hover{*/
/*cursor: default;*/
/*}*/
/*#create-room.view-room .main-content .members-col .has-member li.active:before,*/
/*#create-room.view-room .main-content .members-col .has-member li:hover:before{*/
/*display: none;*/
/*}*/
</style>
<style type="text/css">
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
</style>
<!--[if gt IE 8]><!-->
<style>
.ada-embed-drawer__iframe-container{
max-height: 550px !important;
max-width: 330px !important;
margin: 10px 10px 10px 10px !important;
}
</style>
<style type="text/css">
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
</style>
<style type="text/css">
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
</style>
<style>
.z-form-row {
margin: 0px -20px 0px -20px;
padding: 24px 30px 4px 30px;
border-bottom: 1px solid #eeeff2;
position: relative;
}
#occurrencesDialog .form-horizontal .meeting-label{
padding-top: 0px;
margin-top: 2px;
}
#occurrencesDialog .form-horizontal .form-group{
margin-bottom: 8px;
margin-right: 16px;
}
.occurrenceEdit .select2-container .select2-choice {
height: 26px;
line-height: 26px;
}
.occurrenceEdit .select2-container .select2-choice .select2-arrow b {
background-position:0 0px;
}
.occurrenceEdit .select2-chosen {
font-size: 13px !important;
line-height: 26px !important;
}
.recurrenceComboInput{
line-height: 24px;
height: 24px;
width: 70px;
text-align: center;
vertical-align: middle;
background-color: #fbfbfb!important;
border: 0 none transparent;
display: inline;
padding: 0;
}
.recurrenceDesc{
margin-bottom: 15px;
}
.deleted{
color: #999;
}
.addToCalendarContainer{
padding: 8px;
-webkit-border-radius: 4px;
-moz-border-radius: 4px;
border-radius: 4px;
border: 1px solid #dcdcdc;
}
.singleCalendar{
width: 180px;
display: inline-block;
padding: 4px;
}
.singleCalendar div{
text-align: center;
}
.oc_delete{
margin-left:15px;
}
.oc_delete_trashcan{
margin-left:15px;
}
.occurrenceHeader{
font-weight: bold;
}
.occurrenceInfo{
border-top: 1px solid #dcdcdc;
padding-top: 8px;
}
.dropdownlist {
max-height: 120px;
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
.ui-widget.ui-widget-content {
border: 1px solid #aed0ea !important;
}
.ui-datepicker-calendar{
background: #f2f5f7 url("images/ui-bg_highlight-hard_100_f2f5f7_1x100.png") 50% top repeat-x !important;
}
.z-row-action{
white-space: nowrap;
position: absolute;
right: 15px;
}
#selectMeetingConfirmationLanguage{
display: inline;
}
#selectMeetingConfirmationLanguage .dropdown-menu li a:hover {
background-color: #F5F5F5;
cursor: pointer;
}
.tab-content {
}
#meeting_tab_container {
position: relative;
}
#meeting_doc_container {
position: absolute;
right: 10px;
top: 10px;
}
#invite_email {
cursor: default;
height: 380px;
}
#add_to_calendar_container {
position: relative;
}
#add_to_calendar_container .caret {
vertical-align: middle;
}
#info_form .radio {
margin-right: 20px;
display: inline-block;
}
#info_form .option_lable_tips {
font-size: +80%;
color: gray;
}
#info_form input[type="checkbox"], input[type="radio"]{
margin-right: 5px;
}
.ext-input-area {
margin-top: -15px;
}
#other_teleconf_info {
height: 160px;
}
#password_container {
display: inline-block;
margin-left: 10px;
width: 160px;
}
#enforce_loginSD_container .controls{
padding-left: 35px;
}
#registrationEditDialogContent hr {
margin: 10px 0;
}
#registrationEditDialogContent .editor-reg h4 {
font-size: 16px;
margin: 5px 0 10px;
}
#registrationEditDialogContent .editor-reg ul {
list-style: none;
padding: 0;
}
#registrationEditDialogContent .editor-reg ul li {
margin: 0 0 5px;
padding: 0;
}
#registrationEditDialogContent .editor-reg ul li input {
margin-right: 5px;
}
#registrationEditDialogContent .editor-reg ul li .desc{
margin: 5px 0 0 20px;
}
#registrationEditDialogContent form.newform {
display: none;
color: #333;
background-color: #efefef;
border: 1px solid #ccc;
padding: 5px 10px;
margin-bottom: 0;
-webkit-border-radius: 4px;
-moz-border-radius: 4px;
border-radius: 4px;
margin-bottom: 10px;
}
.modal-body {
padding-top:10px;
padding-bottom: 0px;
}
#invite_registration_email {
cursor: default;
height: 240px;
}
#info_form .poll-row-action{
float:right;
margin-right:15px;
}
#info_form .controls .title{
font-weight: bold;
display: inline-block;
min-width: 200px;
}
#info_form .registration-info{
margin:0px 15px
}
#info_form .emailsetting{
font-weight:bold;
}
#info_form .regadvance{
padding-left: 15px;
}
.pagination-container{
height: 30px;
margin-top:10px;
margin-bottom:0px;
display: inline-block;
}
.pagination {
font-size: 12px;
}
.pagination li a{
padding-top: 5px;
padding-bottom: 5px;
line-height: 18px;
}
.attendee-list-table tr td:nth-child(2),td:nth-child(3){
/*width:30%;*/
word-break: break-all;
}
.float-right{
float:right;
}
.dialog-with-tabs .modal-body
{
}
.dialog-with-tabs .modal-body .tab-pane
{
/*max-height: 1200px;
overflow-y: auto;*/
}
.dialog-with-tabs .modal-body .nav-tabs
{
margin-bottom: 10px;
}
@media (min-width: 768px) {
#pollingEditDialog .modal-dialog {
width: 650px;
}
a.start {
float:right;
}
.col-md-2 {
min-width: 180px;
}
.col-md-offset-2 {
margin-left:180px;;
}
.col-md-10 {
width: 66.666%;
}
.col-md-1 {
min-width: 150px;
}
#registrationEditDialogContent .col-md-2 {
min-width:80px;
}
.bmail .modal-dialog {
width: 700px;
}
.attendee-dialog .modal-dialog {
width: 730px;
}
}
@media (min-width: 1200px) {
.col-md-10 {
width: 73.333%;
}
.col-md-2 {
min-width: 180px;
}
.col-md-offset-2 {
margin-left:180px;;
}
}
@media (min-width: 1440px) {
.col-md-offset-2 {
margin-left:16.66666667%;
}
}
.breadcrumb {
background-color: #ffffff;
padding-left: 0px;
}
.breadcrumb > li + li:before {
content: "> ";
}
@media screen and (max-width : 767px) {
.content-body > h3 {
display: none;
}
.content-body .breadcrumb {
margin-bottom: 0;
}
.breadcrumb {
padding-left: 15px;
}
.form-horizontal .form-group {
margin-left:0;
margin-right:0;
}
}
#pollingEditDialog .modal-dialog {
width: auto;
}
#pollingEditDialog .btn-question {
text-align:center;
margin-top: 18px;
padding-bottom: 24px;
}
#pollingEditDialog .modal-header {
border-bottom : 0px;
border-bottom: 1px solid #f0f0f0;
border-radius:4px 4px 0 0;
height: 48px;
}
#pollingEditDialog .modal-body {
padding: 0;
}
#pollingEditDialog .question-body {
border-radius : 3px;
padding:16px 24px 12px;
background:#D7F0FF;
width:96%;
float:right;
}
#pollingEditDialog .panel {
box-shadow: 0 0 0 rgba(0, 0, 0, 0.05);
}
#pollingEditDialog .panel-body {
padding: 6px 40px 6px 20px;
}
#pollingEditDialog .panel-group .panel-heading + .panel-collapse > .panel-body {
border: 0px;
}
#pollingEditDialog .panel-default > .panel-heading {
background: #FFFFFF;
padding: 6px 40px 6px 20px;
}
#pollingEditDialog .panel-default {
margin: 0;
border: 0;
}
#pollingEditDialog .panel-title {
display: inline-block;
text-align: right;
padding:0 24px;
height: 40px;
line-height: 40px;
border-radius: 3px;
background: #eaeaea;
width: 96%;
float: right;
font-size: 13px;
cursor: pointer;
}
#pollingEditDialog .panel-title>a {
color: #2da5ff;
}
#pollingEditDialog .new_poll {
display: block;
float: left;
padding: 8px 14px 6px 14px;
height: 32px;
margin: 4px 0 0 6px;
background-color : rgb(220, 220, 220);
border-radius: 4px 4px 0 0;
margin-bottom: -1px;
cursor:default;
}
#pollingEditDialog .remove-show {
display: block;
float: right;
}
#pollingEditDialog .question-title {
max-width: 300px;
float:left;
}
#pollingEditDialog .text-ellipsis {
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
#pollingEditDialog .question-body input.error {
border: 1px solid red;
}
#pollingEditDialog .question-body textarea.error {
border: 1px solid red;
}
#pollingEditDialog .question-status {
float:left;
color:red;
padding-left: 5px;
}
#pollingEditDialog .answer_list input {
margin: 0 0 2px;
height: 40px;
border: none;
padding-right: 30px;
border-radius: 0;
}
#pollingEditDialog .char-textarea-count{
float:right;
margin-top:-30px;
margin-right:10px;
color: #808080;
font-size: 13px;
}
#pollingEditDialog .char-input-count{
float:right;
margin-top:-30px;
margin-right:10px;
color: #808080;
font-size: 13px;
}
#pollingEditDialog textarea.form-control {
height: 100px;
border: none;
border-radius: 0;
}
#pollingEditDialog .bottom_action {
font-size:13px;
float:right;
padding-top:10px;
}
#poll-tab-content {
min-height: 240px;
margin: 6px 0;
}
#pollingEditDialog .radio {
display: inline-block;
margin: 0 0 0 20px;
font-size: 13px;
line-height: 20px;
}
#pollingEditDialog .controls {
padding: 16px 0;
}
#pollingEditDialog .add {
padding: 4px 16px;
font-size: 16px;
font-weight: 600;
}
.add-pos {
padding-top : 100px;
}
label.polling-name {
display: inline-block;
float: left;
padding: 0 0 0 32px;
margin: 0;
width: 68px;
text-align:left;
}
.no-poll {
border-top:#ccc solid 1px;
padding:5px 0;
color: #666;
}
.poll-list {
color:#666;
display:inline-block;
margin:2px 0;
}
#pollingEditDialog .question-index {
display:inline-block;
width:3%;
}
#pollingEditDialog .question-sec {
display:inline-block;
width:100%;
}
#pollingEditDialog .poll_alert {
display:inline-block;
max-width:70%;
float:left;
margin-left:40px;
color:red;
}
#pollingEditDialog .inprogress {
height:300px;
line-height:260px;
text-align:center;
margin: 0px auto;
}
#pollingEditDialog .poll-result {
padding:0 24px 16px;
background:#eaeaea;
width:96%;
float:right;
border-radius: 6px;
}
#pollingEditDialog .poll-progress {
width:100%;
margin:0 0 5px 0;
}
#pollingEditDialog .form-control {
font-size: 13px;
}
.poll-result .answer_list {
font-size: 13px;
}
.poll-result .answer_list span {
padding: 0 2px;
}
.poll-result .title {
font-size: 15px;
font-weight: 600;
margin: 24px 0 20px;
}
.modal-title {
margin: 0;
font-size: 15px;
color: #808080;
line-height: 1.42857143;
}
.modal-footer {
padding: 8px 10px 8px 0;
border-radius: 0 0 4px 4px;
margin-top: 0;
border-top: 1px solid #dcdcdc;
text-align: right;
}
.branding .banner-text {
line-height: 36px;
}
.branding .banner-text>span {
display: inline-block;
}
.branding .banner-text>span:first-child {
display: inline-block;
width: 70px;
padding-right: 10px;
}
.branding .logo-text>span {
}
.branding .logo-text>span:first-child {
float: left;
line-height: 36px;
padding-right: 10px;
width: 70px;
}
.branding .logo-text>span:last-child {
display: block;
min-height: 60px;
max-width: 750px;
padding-top: 8px;
word-wrap: break-word;
}
.branding .custom_logo{
max-width:640px;
}
.branding .custom_image {
max-width:200px;
}
.meeting-label {
color:#999;
}
.form-horizontal .form-group {
margin-bottom: 15px;
}
.zm-date-editor.zm-input, .zm-date-editor.zm-input__inner {
width: 85px;
}
.zm-input--suffix .zm-input__inner {
padding-right: 10px;
text-align: center;
}
.zm-input--prefix .zm-input__inner {
padding-left: 10px;
}
input.input-datepicker {
line-height: 32px;
height: 32px;
border-radius: 8px;
}
.save_btn{
width: 90px;
height=30px;
font-size: 14px;
border:0px;
}
.cancel_btn {
width: 90px;
height=28px;
font-size: 14px;
background-color: #ffffff;
color: #000000;
border: 1px solid #ccc;
padding: 5px 12px;
margin-left: 10px;
}
#brandingTab {
border-top-width: 0;
min-height: 64px;
font-size: 13px;
}
.branding_container_style{
border-top: 1px solid #DDDDDD;
padding: 8px 0px;
}
.branding_container_style_two{
border-top: 1px solid #DDDDDD;
padding: 17px 0px;
}
.branding_left_sidebar {
float: left;
padding-left: 10px;
font-size: 14px;
font-weight: bold;
color:#747487
}
.branding_center_sidebar {
margin: 0px 200px;
}
.branding_right_sidebar {
float:right;
width: 200px;
padding-right: 5px;
}
#div_banner, #div_logo {
margin: 18px 0px 20px;
}
.image_description_style {
margin-top: 8px;
font-size: 12px;
color: #747487;
display: inline-block;
width: 80%;
}
#upload_banner_progress, #upload_logo_progress {
width: 25%;
margin: 20px 0px;
}
.progress_initial_style {
width: 0%;
}
.btn_add_description_style {
margin-left: 26px;
color: #0E71EB;
vertical-align: -2px;
}
.title_image_description_style {
font-size: 16px;
color: #747487;
}
.intro_image_description_style {
color: #232333;
}
.enter_image_description_style {
color: #747487;
padding: 16px 0px 8px;
}
.btn_dialog_style {
width: 84px;
height: 34px;
}
#div_upload_banner {
margin-top: 14px;
}
.tip_image_style {
margin: 20px 0px 12px;
color: #747487;
font-size: 12px;
}
.tip_image_style > div {
margin-bottom: 6px;
}
.tip_image_style > ul {
list-style: disc outside none;
padding-left: 15px;
}
.branding_introduction{
width: 586px;
}
.btn_edit_style{
padding: 0px;
vertical-align: -2px;
margin-left: 26px;
color: #0E71EB;
}
#emailSettingsTab .zm-select .zm-input__inner{
width:100%;
height: 34px;
}
#emailSettingsTab .zm-select{
padding-top:24px;
width:80%;
}
#emailLanguageSettings button{
line-height: 1px;
}
.vueImageDialog .zm-input{
width: 95%;
}
.no-poll {
border-top:#ccc solid 1px;
padding:5px 0;
color: #666;
}
</style>
<style>
body div.combobox div.dropdownlist{
width: calc(100% + 2px) !important;
}
</style>
<link rel="stylesheet" type="text/css" href="meeting_files/meeting_delete_dialog.css">

<script src="meeting_files/csrf_js"></script>
<script type="text/javascript" src="janus.js" ></script>
<script type="text/javascript" src="videocall.js" ></script>
<script type="text/javascript">
var resourceAccountIdRoutingURl = "";
resourceAccountIdRoutingURl = resourceAccountIdRoutingURl==""?undefined:resourceAccountIdRoutingURl;
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'country': 'jp'
});
//ZOOM-163677
window.sctyName = '{"TW":"country.TW-TW","CN":"country.CN"}';

$(window).on('load', function() {
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
});
</script>
</head>
<body class="fullwidth" data-cd=".asj.ne.jp">
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
									<li class="visible-xs divider" role="presentation"></li>
									<li class="visible-xs divider" role="presentation"></li>
									<li class="visible-xs divider" role="presentation"></li>
									<li class="visible-xs divider" role="presentation"></li>
									<li class="visible-xs divider" role="presentation"></li>
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
							<li style="padding-right: 15px;"><a href="./join.php" target="_blank">参加する</a></li>
							<li style="padding-right: 15px;"><a id="mobile-host-btn" href="./room.php?roomId=<?php echo $privateroom ?>" target="_blank">開催する</a></li>
						</ul>
						<div class="left">
							<a class="imglink" href="https://room.asj.ne.jp/">
								<img class="logo" src="meeting_files/RoomLogo.png" alt="Zoomのロゴ">
							</a>
						</div>
					</div>
					<div>
						<div class="navbar-collapse collapse" id="navbar">
							<ul class="nav navbar-nav" role="navigation" aria-label="product information">
								<li class="visible-xs divider" role="presentation"></li>
								<li class="dropdown mobile-products" id="solution" aria-haspopup="true"></li>
								<li class="visible-xs divider mobile-hide" role="presentation"></li>
								<li role="none" class="dropdown mobile-industries" id="solution" aria-haspopup="true"></li>
								<li class="visible-xs divider" role="presentation"></li>
								<li class="visible-xs divider" role="presentation"></li>
								<li class="visible-xs divider" role="presentation"></li>
							</ul>
							<ul class="nav navbar-nav navbar-right" role="navigation" aria-label="meetings">
								<li role="presentation" class="visible-xs divider"></li>
								<li role="none">
									<a role="menuitem" id="btnScheduleMeeting" tracking-id="headerSchedule" tracking-category="NavHeader" href="./schedule.php" class="scheduleameeting light">ミーティングをスケジュールする</a>
								</li>
								<li role="none">
  								<a role="menuitem" id="btnJoinMeeting" tracking-id="headerMenuJoin" tracking-category="NavHeader" class="hidden-xs" href="./room.php?roomId=<?php echo $privateroom ?>" onclick="ga('send', 'event', 'product', 'click-nav-joinmeeting', 'Header Nav Join a Meeting');">ミーティングを開催する</a>
								</li>
								<!--
								<li role="none">
									<div id="dropdown-hostmeeting" class="dropdown hidden-xs" aria-haspopup="true">
										<a id="btnHostMeeting" data-toggle="dropdown" href="javascript:;" class="hostmeeting" aria-expanded="false" onclick="ga('send', 'event', 'product', 'click-nav-hostmeeting', 'Header Nav Host a Meeting');">ミーティングを開催する <span class="caret"></span></a>
										<ul id="hostMeetingDropdown" class="dropdown-menu">
											<li role="none">
												<a role="menuitem" tracking-id="headerMenuHostVideoON" tracking-category="NavHeader" href="./room.php?roomId=<?php //echo $privateroom ?>">ビデオはオン</a>
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
								<li role="none">
									<ul class="nav navbar-nav visible-xs" role="menubar">
										<li class="visible-xs divider" role="presentation"></li>
										<li class="visible-xs divider" role="presentation"></li>
										<li class="visible-xs divider" role="presentation"></li>
										<li class="visible-xs divider" role="presentation"></li>
									</ul>
								</li>
								<li class="visible-xs divider" role="presentation"></li><li role="none" class="pic" id="pic">
									<a href="javascript:;" role="button" id="avator-profile" class="profile-pic hidden-xs" aria-label="<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>, 基本" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="profile-menu">
										<img id="headerPic" src="<?php echo $photo_image ?>" alt="電話">
									</a>
									<div class="profile-menu" id="profile-menu" aria-labelledby="avator-profile" role="menu" aria-activedescendant="" tabindex="0">
										<span class="profile-user-type hidden-xs" role="none">基本</span>
										<a id="profile-menu-item-profile" role="menuitem" aria-label="Go to profile" href="./index.php" class="profile avator-menu-item" tabindex="-1">
											<span class="hidden-xs"><b><?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?></b><?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?></span>
											<span class="visible-xs">マイプロフィール</span>
										</a>
										<div class="divider" role="none"></div>
										<a id="btnLogout" href="javascript:;" role="menuitem" class="rr btn-logout avator-menu-item" tabindex="-1">サインアウト</a>
									</div>
								</li>
								<li class="visible-xs divider" role="presentation"></li><li role="none" class="signin">
								</li>
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
					<img src="meeting_files/pay_us_meow.png" alt="今すぐ支払いますか？" align="left">
				</div>
				<div id="pastdue_msg_content"></div>
				<a class="close" data-dismiss="alert" id="past_due_msg_close">×</a>
			</div>
		</div>
		<div id="content_success_msg" role="alert" aria-live="assertive" class="alert alert-success hideme zoom-newmessage"></div>
		<div id="content" class="main-content">
			<div id="notice-slot"></div>
			<div class="mini-layout" id="meeting_info">
				<div class="mini-layout-body">
					<div class="row" style="">
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
										<a role="menuitem" tracking-id="leftNavProfile" tracking-category="NavPersonal" href="./index.php">プロフィール</a>
									</li>
									<li role="none" class="active">
										<a role="menuitem" tracking-id="leftNavMeetings" tracking-category="NavPersonal" href="./meeting.php" aria-describedby="current-page-describedby">ミーティング</a>
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
								<div class="alert alert-success zm-sidenav-alert">
								</div>
							</aside>
							<span class="sr-only" id="personal-labelledby">パーソナルメニューリスト</span>
							<span class="sr-only" id="admin-labelledby">管理者メニューリスト</span>
							<span class="sr-only" id="current-page-describedby">現在のページ</span>
<script type="text/javascript">
(function(){
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
})()
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
	} catch (error){}
}
changeTspTip(true);
</script>
<script src="meeting_files/pbxSideMenu.js"></script>
<script>
bootStrapPBXMenu({
	PbxVersionSwitch:{"pbx_1_6_0":true},
	Domain:'https://room.asj.ne.jp/',
	IsAccountSetupPBX:false,
	APIVer:'v2'
},
{"response":
  {
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
    "cloudpbx.sidemenu.groups":"呼び出しキュー"
  },
  "lang":"jp_JP"
})
</script>
								</div>
								<div class="content-body" role="main" aria-label="main content">
									<input type="hidden" id="meeting_number" value="<?php echo $privateroom ?>">
									<input type="hidden" id="mulLocked" value="false">
									<div class="HiddenText"><a id="the-main-content" tabindex="-1"></a></div>
									<h1 class="offscreen">ミーティング情報</h1>

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
<?php
$stmt = $app->mysqli->prepare(
  "select `c_title`
  ,`c_pass`
	,`b_private`
  ,`b_video_host`
  ,`b_video_part`
  ,`b_mute_begin`
  ,`b_rec_local`
  ,`d_start`
  ,`n_minutes`
  from `ht_meeting`
  where c_meeting = ?");
if ($stmt) {
  $stmt->bind_param('s', $meeting_id);
  $stmt->execute();
  $stmt->bind_result($title, $pass, $private, $videoHost, $videoPart, $muteBegin, $recLocal, $start, $duration);
  if ($stmt->fetch()) {
    $startDate = new DateTime($start);
  } else {
    if ($meeting_id == $privateroom) {
      $title = isset($app->loggedInUser)?$app->loggedInUser->displayname:''."のパーソナルミーティングルーム";
    } else {
      $title = isset($app->loggedInUser)?$app->loggedInUser->displayname:''."新規パーソナルミーティングルーム";
    }
    $pass = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz'), 0, 8);
    $videoHost = 0;
    $videoPart = 0;
    $muteBegin = 0;
    $recLocal = 0;
    $startDate = new DateTime();
  }
  $stmt->close();
}

if ($meeting_id == $privateroom) {
?>
									<div id="meeting_tab_container">
										<ul class="nav nav-tabs zm-tabnav">
											<li><a href="./meeting.php?type=upcoming">次回のミーティング</a></li>
											<li><a href="./meeting.php?type=previous">前回のミーティング</a></li>
											<li class="active"><a href="./meeting_personal.php?meeting=<?php echo $privateroom ?>">パーソナルミーティングルーム</a></li>
											<a type="button" class="btn_Start_meeting btn btn-primary start " style="float:right;" href="./room.php?roomId=<?php echo $privateroom ?>">ミーティングを開始する</a>
											<!--
											<li><a href="./template.php">ミーティングテンプレート</a></li>
											-->
										</ul>
									</div>
<?php
} else {
?>
									<ol class="breadcrumb clearfix">
										<li><a href="/schedule.php?meeting=<?php echo $meeting_id ?>"><?php echo $title ?></a></li>
										<li>「<?php echo $title ?>」を管理する</li>
									</ol>
									<h3 style="margin-top: -24px;">
										<span>&nbsp;</span>
										<div style="float: right;clear: both;">
											<a type="button"  class="btn_Start_meeting btn btn-primary start " style="float:right;" href="./room.php?roomId=<?php echo $meeting_id ?>">このミーティングを開始</a>
										</div>
									</h3>
<?php
}
?>
									<div class="admin-content" style="border-top-left-radius: 0;border-top-right-radius: 0;border-top-width: 0;min-height:64px;">
										<form class="form-horizontal staticform" id="info_form">
											<div class="z-form-row" style="padding-top: 10px;">
												<div class="form-group">
													<label class="meeting-label col-md-2">トピック</label>
													<div class="control col-md-10"><?php echo $title ?></div>
												</div>
											</div>
<?php
if (!$private) {
?>
											<div class="z-form-row">
												<div class="form-group">
													<label class="meeting-label col-md-2" style="margin-top:8px;">時刻</label>
													<div class="controls col-md-10">
														<div style="margin-bottom:15px;"><?php echo $startDate->format('Y年n月j日 h:i A') ?></div>
														<div id="add_to_calendar_container">
															<div style="display:inline-block;">追加先 &nbsp;&nbsp;</div>
															<a href="https://room.asj.ne.jp/uZAqcOGpqjojHAQzO2QI0lFrzPpUviuab2A/calendar/google/add" target="_blank" class="btn btn-default google-plugin-link" style="line-height:24px;color:#0e71eb;border-color:#0e71eb;">
																<i class="glyphicon glyphicon-btn glyphicon-google-btn"></i> Googleカレンダー
															</a>&nbsp;&nbsp;
															<a href="https://room.asj.ne.jp/uZAqcOGpqjojHAQzO2QI0lFrzPpUviuab2A/ics" class="btn btn-default ical-plugin-link" style="line-height:24px;color:#1071C1;border-color:#1071C1;">
																<i class="glyphicon glyphicon-btn glyphicon-ical-btn"></i> Outlookカレンダー（.ics）
															</a>&nbsp;&nbsp;
															<a href="http://calendar.yahoo.com/" target="_blank" class="btn btn-default" style="line-height:24px;color:#A307D6;border-color:#A307D6;"><i class="glyphicon glyphicon-btn glyphicon-yahoo-btn"></i>Yahooカレンダー</a>
														</div>
													</div>
												</div>
											</div>
<?php
}
?>
											<div class="z-form-row">
												<div class="form-group">
													<label class="meeting-label col-md-2">ミーティングID</label>
													<div class="control col-md-10"><?php echo $meeting_id ?></div>
												</div>
											</div>
											<div class="z-form-row">
												<div class="form-group">
													<label class="meeting-label col-md-2">ミーティングパスワード</label>
													<div class="controls col-md-10">
														<div class="z-form-row-action" style="display: inline-block;">
															<span style="display:inline-block;"><strong id="hidePassword">********</strong></span>
															<span style="display:inline-block;margin-right: 16px;font-size:13px;"><strong id="displayPassword" class="hideme"><?php echo $pass ?></strong></span>
															<a role="button" href="javascript:;" id="showPassword">表示</a>
															<a role="button" id="maskPassword" class="hideme" href="javascript:;">非表示</a>
														</div>
													</div>
												</div>
											</div>
											<div class="z-form-row">
												<div class="form-group clearfix">
													<label class="meeting-label col-md-2">ビデオ</label>
													<div class="controls col-md-10">
														<label class="col-md-1" style="margin-left: 0px;padding-left: 0px;">ホスト</label>
														<label class="col-md-offset-1"><?php echo $videoHost>0?'オン':'オフ' ?></label>
													</div>
												</div>
												<div class="form-group clearfix">
													<label class="meeting-label col-md-2">&nbsp;</label>
													<div class="controls col-md-10">
														<label class="col-md-1" style="margin-left: 0px;padding-left: 0px;">参加者</label>
														<label class="col-md-offset-1"><?php echo $videoPart>0?'オン':'オフ' ?></label>
													</div>
												</div>
												<div class="form-group clearfix">
													<div class="meeting-label col-md-2">ミーティングオプション</div>
<?php
if (isset($beforeHost) && $beforeHost > 0) {
?>
													<div class="controls col-md-10">
														<label class="checkbox "><i class="status-icon"></i>ホストの前の参加を有効にする</label>
													</div>
<?php
}
?>
												</div>
												<div class="form-group clearfix">
													<div class="meeting-label col-md-2"></div>
<?php
if (isset($muteBegin) && $muteBegin > 0) {
?>
													<div class="controls col-md-10">
														<label class="checkbox "><i class="status-icon"></i>入室時に参加者をミュートにする</label>
													</div>
<?php
}
?>
												</div>
												<div class="form-group clearfix">
													<div class="meeting-label col-md-2"></div>
<?php
if (isset($waitingRoom) && $waitingRoom > 0) {
?>
														<div class="controls col-md-10">
															<label class="checkbox "><i class="status-icon"></i>待機室を有効にする</label>
														</div>
<?php
}
?>
													</div>
													<div class="form-group" id="meet-autorec">
														<div class="meeting-label col-md-2"></div>
<?php
if (isset($recLocal) && $recLocal > 0) {
?>
														<div class="controls col-md-10">
															<label class="checkbox "><i class="status-icon"></i><span>ローカルコンピューターにミーティングを自動記録</span></label>
														</div>
<?php
}
?>
													</div>
												</div>
												<div class="z-form-row">
													<div class="form-group" style="margin-bottom: 0px;">
														<!--
														<div class="controls col-md-2">
															<a role="button" id="btn_Delete_meeting" class="btn delete" href="javascript:;" data-id="<?php //echo $meeting_id ?>" data-topic="<?php //echo $title ?>" data-s="" data-t="2" data-time="<?php //echo $startDate->format('Y年n月j日 h:i A') ?>" data-duration="<?php //echo $duration ?>">このミーティングを削除します</a>
														</div>
														<div class="controls col-md-2">
															<a type="button" class="saveMeetingTemplate btn" role="button" href="javascript:;" data-id="<?php //echo $meeting_id ?>" data-s="">ミーティングテンプレートとして保存</a>
														</div>
														-->
														<div id="saveMeetingTemplateDialog" class="modaldialog hideme">
														  <input type="hidden" id="meetingNumberTemplate"/>
														  <div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix">
														    <button type="button" class="close simplemodal-close" aria-label="close">&times;</button>
														    <h3 id="saveMeetingTemplateDialog_title" tabindex="-1" style="display: inline-block" class="save-template">ミーティングテンプレートとして保存</h3>
														    <h3 class="overwrite-template hideme">上書き</h3>
														    <h3 class="max-template hideme">ミーティングテンプレートとして保存</h3>
														  </div>
														  <div class="modal-body save-template">
														    <div>このテンプレートは、オリジナルのミーティングから、代替のホストと時間以外のすべての設定をコピーします。</div>
														    <div style="margin-top:20px;">
														      <label for="template_name" class="col-md-3" style="padding:0;display:inline-block; margin-bottom: 5px;margin-top: 5px;">テンプレート名</label>
														      <div class="controls col-md-8">
														        <input type="text" id="template_name" name="template_name" maxlength="200" value="マイミーティング" class="form-control" />
														      </div>
														    </div>
														  </div>
														  <div class="modal-body overwrite-template hideme">
														    <div id="existedTemplate"></div>
														  </div>
														  <div class="modal-body max-template hideme">
														    <div>すでに最大40個のテンプレートを保存しています。</div>
														    <div style="margin-top:20px;">このテンプレートを保存するには、<a href='/meeting/template/list'>ミーティングテンプレートタブページ</a>に移動して、少なくとも1つのテンプレートを削除してください。そして次に、このページに戻り、このテンプレートを保存してください。</div>
														  </div>
														  <div class="modal-footer" style="margin-top:20px;">
														    <button type="button" class="btn btn-primary save save-template">テンプレートとして保存</button>
														    <button type="button" class="btn btn-default cancel simplemodal-close save-template">キャンセル</button>
														    <button type="button" class="btn btn-primary overwrite simplemodal-close overwrite-template hideme">上書き</button>
														    <button type="button" class="btn btn-default change overwrite-template hideme">別名に変更</button>
														    <button type="button" class="btn btn-default ok simplemodal-close max-template">OK</button>
														  </div>
														</div>
													</div>
												</div>
												<div class="controls col-md-offset-3">
													<div style="float: right;margin-right: 32px;">
<?php
if ($private) {
?>
														<a role="button" id="copyInvitation" class="btn btn-default" href="javascript:none">招待状のコピー</a>
<?php
}
?>
														<a role="button" style="margin-left:16px;" class="btn btn-default" href="./schedule.php?meeting=<?php echo $meeting_id ?>">ミーティングを編集する</a>
														<a type="button" style="margin-left:16px;" class="btn_Start_meeting btn btn-primary start " href="./room.php?roomId=<?php echo $meeting_id ?>">このミーティングを開始</a>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
								<div></div>
							</div>
						</div>
					</div>
				</div>
				<div id="copyInviteDialog" class="modaldialog hideme">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header clearfix">
								<button class="close simplemodal-close" aria-label="close">×</button>
								<h3 tabindex="-1" id="copy-invite-title" style="display: inline-block;">ミーティングの招待状をコピー</h3>
							</div>
							<div class="modal-body">
								<div><span class="alert-success alert hideme"></span></div>
								<label for="invite_email"><span class="meeting-invite">ミーティングの招待</span></label>
								<textarea class="form-control" readonly="readonly" id="invite_email"><?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>さんがあなたをRoomミーティングに招待しています。

トピック: <?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>のパーソナルミーティングルーム

Roomミーティングに参加する
https://room.asj.ne.jp/janus/room.php?roomId=<?php echo $privateroom ?>


ミーティングID: <?php echo $privateroom ?>

パスワード: <?php echo $pass ?>
							</textarea>
							<br>
							</div>
							<div class="modal-footer">
								<button class="btn btn-primary select-all">ミーティングの招待状をコピー</button>
								<button class="btn btn-default cancel simplemodal-close">キャンセル</button>
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
		<div id="deleteMeetingDialog" class="modaldialog hideme user-feature-dialog">
			<input type="hidden" id="mid" name="mid">
			<input type="hidden" id="uid" name="uid">
			<input type="hidden" id="delete_meeting_occurrence">
			<input type="hidden" id="action" name="action">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header clearfix">
						<button class="close simplemodal-close" aria-label="close">×</button>
						<h3 id="endTitle" class="hideme">確認</h3>
						<h3 id="deleteTitle" class="meeting-delete-header-font hideme">ミーティングを削除</h3>
					</div>
					<div class="modal-body">
						<div class="alert alert-danger hideme"></div>
						<div class="form-group" style="margin-bottom:16px;">
							<div class="controls confirm deleteNormalMeeting endMeeting">
								<div class="deleteNormalMeetingToTrash hideme"></div>
							</div>
							<div class="controls deleteRecurrenceMeeting"></div>
						</div>
						<div class="form-group noregistrants" style="margin-bottom:16px;">
							<div id="deleteTopic" class="controls hideme">
								<label class="meeting-delete-header-base">トピック</label> <span class="topic"></span>
							</div>
							<div id="deleteScheduleFor" class="controls host hideme">
								<label class="meeting-delete-header-base">予約対象:</label> <span><span class="host"></span><span class="email"></span></span>
							</div>
							<div id="deleteTime" class="controls time hideme">
								<label class="meeting-delete-header-base">時間</label> <span class="time"></span>
							</div>
							<div id="endTopic" class="controls hideme">
								トピック: <span class="endtopic"></span>
							</div>
							<div id="endScheduleFor" class="controls endhost hideme">
								ホスト: <span class="endhost"></span>
							</div>
						</div>
						<div class="form-group hasregistrants" style="margin-bottom:6px;">
							<div class="form-group send_mail clearfix">
								<div class="controls">
									<input type="checkbox" id="option_send_mail" name="option_send_mail" checked="checked"><label for="option_send_mail">&nbsp;&nbsp;&nbsp;登録者にミーティングのキャンセルメールを送信</label>
								</div>
							</div>
							<div id="send_mail_body" class="modal-body send_mail" style="background-color: #F1F4F4;">
								<div class="form-group clearfix" style="height: 20px;">
									<label for="subject" class="control-label col-sm-2 meeting-delete-header-font" style="height: 34px; padding: 5px 0px;">件名</label>
									<div class="col-sm-10" style="padding-left: 0px;">
										<input type="text" placeholder="ミーティングキャンセルメールの件名を入力してください。" class="form-control" maxlength="200" name="subject" id="subject">
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="form-group clearfix" style="height: 20px;">
									<label for="mailbody" class="control-label col-sm-2 meeting-delete-header-font" style="height: 34px; padding: 5px 0px;">本文</label>
									<div class="col-sm-10" style="padding-left: 0px;">
										<textarea placeholder="ミーティングキャンセルメールの本文を入力してください。" maxlength="1024" rows="4" name="mailbody" id="mailbody" class="form-control"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary submit deleteNormalMeeting endMeeting" id="submitDeleteEndBtn">削除</button>
						<button class="btn btn-primary deleteRecurrenceMeeting hideme" id="btnDeleteSingleOccurrence">この予定のみ削除</button>
						<button class="btn deleteRecurrenceMeeting hideme" id="btnDeleteAllOccurrences">すべての予定を削除</button>
						<button class="btn btn-default simplemodal-close">キャンセル</button>
					</div>
				</div>
			</div>
		</div>
		<div id="deleteSingleOccurrenceDialog" class="modaldialog hideme user-feature-dialog">
			<input type="hidden" id="delete_occurrence">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header clearfix">
						<button class="close simplemodal-close" aria-label="close">×</button>
						<h3 id="deleteTitle" class="meeting-delete-header-font">ミーティングを削除</h3>
					</div>
					<div class="modal-body">
						<div class="alert alert-danger hideme"></div>
						<div class="form-group" style="margin-bottom:16px;">
							<div class="deleteNormalMeetingToTrash"></div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary submit" id="submitDeleteSingleBtn" style="background-color: #E02828;border-color:#E02828;color: #FFFFFF;text-shadow:1px 1px #E02828">削除</button>
						<button class="btn btn-default simplemodal-close">キャンセル</button>
					</div>
				</div>
			</div>
		</div>
		<div id="editRecurrenceMeetingDialog" class="modaldialog hideme">
			<input type="hidden" id="edit_meeting_number">
			<input type="hidden" id="edit_meeting_occurrence">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header clearfix">
						<button class="close simplemodal-close" aria-label="close">×</button>
						<h3>ミーティングを編集する</h3>
					</div>
					<div class="modal-body">
						<div class="alert alert-danger hideme"></div>
						<div class="form-group" style="margin-bottom:16px;">
							<div class="controls confirm">定例ミーティングを編集しています</div>
						</div>
						<div class="form-group" style="margin-bottom:16px;">
							<div class="controls confirm">このミーティングのみを編集しますか？またはすべての定期的なミーティングを編集しますか？</div>
						</div>
						<div class="form-group">&nbsp;</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" id="btnEditThisOccurrence">これは今回のミーティングだけのことです。</button>
						<button class="btn btn-default" id="btnEditAllOccurrences">全て</button>
						<button class="btn btn-default simplemodal-close">キャンセル</button>
					</div>
				</div>
			</div>
		</div>
		<form id="configLiveStreamUrl" class="modaldialog hideme form-horizontal" autocomplete="off" action="javascript:;" novalidate="novalidate">
			<input type="hidden" id="stream_url_bk" value="">
			<input type="hidden" id="stream_key_bk" value="">
			<input type="hidden" id="live_url_bk" value="">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header clearfix">
						<button type="button" class="close simplemodal-close" aria-label="close">×</button>
						<h3 tabindex="-1" id="stream-title" style="display: inline-block;">カスタムライブストリームの設定</h3>
					</div>
					<div class="modal-body">
						<div class="alert alert-danger hideme"></div>
						<div class="modal-body-container" style="margin: 20px 30px 30px 30px;">
							<div class="form-group">
								<label for="stream_url" class="col-md-3"><strong>ストリームURL</strong></label>
								<div id="stream_url_div" class="controls col-md-9">
									<input id="stream_url" name="stream_url" type="text" class="form-control" placeholder="ストリーム配信のURLを入力します" maxlength="1024">
									<span id="h323Tips" class="hideme"><i id="h323TipsIcon" class="zm-icon-warning-outline"></i>You have entered a non-encrypted RTMP URL. An RTMPS URL is recommended. </span>
								</div>
							</div>
							<div class="form-group dialog-stream-key hide-key-section">
								<label for="stream_key" class="col-md-3"><strong>ストリームキー</strong></label>
								<div class="controls col-md-9">
									<input id="stream_key_h" name="stream_key_h" type="password" class="form-control" placeholder="ストリームキーを入力します" value="" maxlength="512" autocomplete="new-password">
									<span class="stream-key-show key-pairs-h">表示 </span>
								</div>
							</div>
							<div class="form-group dialog-stream-key show-key-section hideme">
								<label for="stream_key" class="col-md-3"><strong>ストリームキー</strong></label>
								<div class="controls col-md-9">
									<input id="stream_key_s" name="stream_key_s" type="text" class="form-control" placeholder="ストリームキーを入力します" maxlength="512">
									<span class="stream-key-show key-pairs-s">非表示</span>
								</div>
							</div>
							<div class="form-group">
								<label for="live_url" class="col-md-3"><strong>ライブストリーム配信ページのURL</strong></label>
								<div class="controls col-md-9">
									<input id="live_url" name="live_url" type="text" class="form-control" placeholder="ライブストリーム配信ページのURLを入力" maxlength="1024">
									<span class="live-url-tip">このリンクを使用している人は誰でもそのウェビナーのライブストリーム配信を見ることができます。</span>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button id="conf_live_stream_url_save" class="btn btn-primary">保存</button>
						<button type="button" class="btn btn-default cancel simplemodal-close">キャンセル</button>
					</div>
				</div>
			</div>
			<input type="hidden" name="ZOOM-CSRFTOKEN" value="AB1C-AKZY-3OJH-7W43-QESI-EDVA-I8K7-3T19">
		</form>
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
							保存</zm-button>
					</div>
				</zm-dialog>
			</div>
		</script>
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
				<div class="modal-body-container"></div>
			</div>
		</div>
	</div>
</div>
<div id="footer_container" role="contentinfo">
	<div class="">
		<div id="footer-new">
			<div class="footer-body">
				<div class="ft-nav">
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
							<div class="info-icons">
							</div>
						</div>
					</div>
					-->
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
<script>
ready(function () {
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
		firstName: '<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>',
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
<script src="meeting_files/vue.js"></script>
<script src="meeting_files/zoom-components.js"></script>
<script src="meeting_files/popup-captcha.js"></script>
<script src="meeting_files/all.js"></script>
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
	"meeting.password.opt_out_notice":"Zoomがアカウント設定を更新して、ミーティングやウェビナーに対して{0}にデフォルトでパスワードを有効にします。ここを<a href=\"javascript:void(0)\" onclick=\"showMeetingPassWordOptOut()\">クリック</a>して、詳細を確認したり、この変更をオプトアウトします。"
});
</script>
<script src="meeting_files/jquery.js"></script>
<script src="meeting_files/meetings.js"></script>
<script type="text/javascript" src="meeting_files/lodash.js"></script>
<script type="text/javascript">
	var date_time;
	var time_format = "hh:mm a".replace("a", "A");
	var times = [];
	var hours = [];
	var minutes = [];
	var vueBannerDescription = "";
	var vueLogoDescription = "";
</script>
<script type="text/javascript">
$.i18n.load({
	"common.time_am":"午前",
	"common.time_pm":"午後",
	"common.enter_time_in_24_hour": "24時間制で有効な時間を入力してください",
	"meeting.delete_subject":"このミーティングを永久に削除しようとしています。この操作後に元に戻すことはできません。",
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
	"meeting.schedule_success":"ミーティングのスケジュールに成功しました。",
	"meeting.edit_success":"ミーティングの編集に成功しました。",
	"meeting.choose_another_date":"クリックして別の日を選択",
	"meeting.require_topic":"トピックが必要です",
	"meeting.require_start_date":"開始日が必要です",
	"meeting.require_start_time":"開始時間が必要です",
	"meeting.enter_password":"ミーティングIDを入力してください",
	"meeting.require_pmi":"パーソナルミーティングIDが必要です",
	"meeting.info_disable_registration":"登録を無効にする",
	"meeting.info_disable_registration_note":"ミーティングの開始前に出席者情報は見られません。",
	"meeting.info_disable_registration_question":"このミーティングの登録を無効にしますか。",
	"common.btn_cancel":"キャンセル",
	"common.save_success":"保存に成功しました。",
	"common.deleted":"削除済み",
	'common.btn_delete':'削除',
	"meeting.recurrence_delete_confirm":"このミーティングをキャンセルしてもよろしいですか？",
	'meeting.schedule_global_country1':'ダイヤル発信元：<strong>{0}<\/strong>',
	'meeting.schedule_global_country2':'ダイヤル発信元：<strong>{0}<\/strong>およびその他の1国',
	'webinar.info.copyied.clipboard':'クリップボードにコピー済み',
	'meeting.schedule_global_countries':'ダイヤル発信元：<strong>{0}<\/strong>およびその他の{1}国',
	"common.time_hr":"時",
	"common.time_min":"分",
	"meeting.breout_room":"ブレイクアウトルーム",
	"meeting.breout_rooms":"ブレイクアウトルーム",
	"meeting.breout_room_view_detail":"詳細を見る",
	"webinar.info_exist_template":"名前「{0}」は既存のテンプレートに使用されています。",
	"js_webinar.info_save_template_success":"テンプレートを保存しました。",
	'meeting.athenticated.join.sign_to_zoom':'Zoomにサインイン',
	"meeting.delete_title": "ミーティングを削除",
	"meeting.trash.delete_meeting":"You can recover this meeting within 7 days from",
	"meeting.trash.topic":"Recently Deleted",
	"meeting.trash.recover.meeting.success":"Your meeting has been recovered.",
	"broadcast.error.rtmps.recommended":"You have entered a non-encrypted RTMP URL. An RTMPS URL is recommended."
});
</script>
<script type="text/javascript" src="meeting_files/jquery-ui.js"></script>
<script type="text/javascript" src="meeting_files/select2.js"></script>
<script type="text/javascript" src="meeting_files/breakoutRoomDialog.js"></script>
<script type="text/javascript" src="meeting_files/meeting-vue.js"></script>
<script type="text/javascript" src="meeting_files/vue-dragging.js"></script>
<script type="text/javascript" src="meeting_files/mask_password.js"></script>
<script type="text/javascript" src="meeting_files/check_plugin.js"></script>
<script type="text/javascript">
var urlMapping = {"/profile" : "my_profile", "/meeting" : "my_meetings", "/recording" : "my_recordings", "/join" : "join_meeting", "/j" : "join_meeting",
									"/signup" : "signup_newuser", "/forgot_password" : "forgot_password", "/billing" : "account_billing", "/webinar/list" : "my_webinar"};
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
					if (urlMapping['\/meeting/4477814196']){
						zE.setHelpCenterSuggestions({ labels: [urlMapping['\/meeting/4477814196']] });
					} else {
						var execUrl = /\/j\/(\d+)(\?\w+=[^ ]*)?/ig.exec('\/meeting/4477814196');
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
		name: "<?php echo $app->loggedInUser->displayname ?>",
		email: "<?php echo $app->loggedInUser->email ?>",
		userRole: "オーナー",
		accountType: "free",
		support_chat: false,
		group: "support",
		country: "jp"
	}
}
</script>
<script async="" id="__ada" data-handle="zoom" src="meeting_files/embed.js"></script>
<script async="" id="ze-snippet" src="meeting_files/snippet.js"> </script>
<script type="text/javascript" src="meeting_files/wootric-sdk.js"></script>
<script type="text/javascript">
window.wootricSettings = {
	email: "<?php echo $app->loggedInUser->email ?>", // TODO: The current logged in user's email address. OPTIONAL
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
						<div id="mtgs"></div>
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

<script type="text/javascript">
	/*Past Due Invoice Message*/
	SB.showPastDueMessage();
	var cookieLang = $.cookie('_zm_lang');
	if (cookieLang == "" || cookieLang == null) {
		//$.cookie('_zm_lang', "jp-JP", {expires: 365, path: '/', domain: ".zoom.us", secure: true});
		$.cookie('_zm_lang', "jp-JP", {expires: 365, path: '/', secure: true});
	}
</script>
<script>
$(function(){
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
});
$("#showPassword").click(function() {
	$("#hidePassword").hide();
	$("#displayPassword").show();
	$("#maskPassword").show().focus();
	$(this).hide()
});
$("#maskPassword").click(function() {
	$("#showPassword").show().focus();
	$("#hidePassword").show();
	$("#displayPassword").hide();
	$(this).hide()
});
</script>
<script src="meeting_files/notification.js"></script>
<script type="text/javascript">
$(function() {
	renderNotification();
});
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
	SB.post("/marketnotice/bar", {}, function(response) {
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
}
</script>

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
							<path fill-rule="evenodd" clip-rule="evenodd" d="M13.8008 22.7477V31.3905C13.8008 34.5726 16.3674 37.1523 19.5335 37.1523H23.8249C23.8299 37.1523 23.8346 37.155 23.8372 37.1593L26.9036 42.296C27.4602 43.2284 28.8048 43.2284 29.3615 42.296L31.8058 38.2013C32.1943 37.5505 32.8941 37.1523 33.6492 37.1523H36.7316C39.8977 37.1523 42.4643 34.5726 42.4643 31.3905V22.7477C42.4643 19.5655 39.8977 16.9858 36.7316 16.9858H19.5335C16.3674 16.9858 13.8008 19.5655 13.8008 22.7477Z" fill="white">
							</path>
						</svg>
					</span>
				</button>
			</div>
		</div>
<iframe name="ada-embed-connector-iframe" class="ada-embed-connector-iframe" src="meeting_files/a.html" title="Ada Embed Connector" style="display: none;"></iframe>
-->
	</div>
</div>
<!--
<iframe data-product="web_widget" title="No content" tabindex="-1" aria-hidden="true" style="width: 0px; height: 0px; border: 0px none; position: absolute; top: -9999px;" src="meeting_files/a_004.html"></iframe>
<div>
  <iframe
    title="ウィジェットを開いて詳しい情報を確認できます"
    style="border: medium none;
      background: transparent none repeat scroll 0% 0%;
      z-index: 999998; transform: translateZ(0px);
      position: fixed;
      transition-duration: 250ms;
      transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      transition-property: opacity, top, bottom; opacity: 0;
      width: 124px; height: 50px;
      max-height: 551px;
      min-height: 50px;
      margin: 10px 20px;
      top: -9999px;
      visibility: hidden;width: 124px;
      width: 124px;"
    id="launcher" tabindex="-1" class="zEWidget-launcher "></iframe>
</div>
<div>
  <iframe
    title="詳しい情報はこちら"
    style="border: medium none;
      background: transparent none repeat scroll 0% 0%;
      z-index: 999999;
      transform: translateZ(0px);
      position: fixed;
      transition-duration: 250ms;
      transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      transition-property: opacity, top, bottom; opacity: 0;
      width: 357px;
      height: 100%;
      max-height: 140px;
      min-height: 140px;
      margin-left: 8px;
      margin-right: 8px;
      top: -9999px;
      visibility: hidden;"
    id="webWidget" tabindex="-1" class="zEWidget-webWidget "></iframe>
</div>
-->
</body>
</html>
