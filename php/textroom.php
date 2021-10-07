<?php
require_once("app.php");
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Room Text Chat</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.4.0/cerulean/bootstrap.min.css" type="text/css"/>
<link rel="stylesheet" href="css/demo.css" type="text/css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css"/>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/6.4.0/adapter.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.0/bootbox.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.min.js"></script>
<script type="text/javascript" src="janus.js" ></script>
<script>
<?php
$app = new room_app();
if (!isset($app->loggedInUser)) {
?>
	window.close();
<?php
} else {
?>
var myroom = <?php echo intval($_GET['myroom']) ?>;
var myusername = '<?php echo $_GET['myname'] ?>';
var myid = <?php echo intval($_GET['myid']) ?>;
$(function() {
	$(".navbar-static-top").load("navbar.html", function() {
		$(".navbar-static-top li.dropdown").addClass("active");
		$(".navbar-static-top a[href='textroomtest.html']").parent().addClass("active");
	});
	$(".footer").load("footer.html");
});
<?php
}
?>
</script>
<script type="text/javascript" src="textroom.js"></script>
</head>
<body>

<!--
<a href="https://github.com/meetecho/janus-gateway"><img style="position: absolute; top: 0; left: 0; border: 0; z-index: 1001;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png" alt="Fork me on GitHub"></a>

<nav class="navbar navbar-default navbar-static-top"></nav>
-->

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="page-header">
				<h1>Roomチャット
					<!--
					<button class="btn btn-default" autocomplete="off" id="start">Start</button>
					-->
				</h1>
			</div>
			<!--
			<div class="container" id="details">
				<div class="row">
					<div class="col-md-12">
						<h3>Demo details</h3>
						<p>The Text Room demo is a simple example of how you can use this text
						broadcasting plugin, which uses Data Channels, to implement something
						similar to a chatroom. More specifically, the demo allows you to join
						a previously created and configured text room together with other
						participants, and send/receive public and private messages to
						individual participants. To send messages on the chatroom, just type
						your text and send. To send private messages to individual participants,
						click the participant name in the list on the right and a custom dialog
						will appear.</p>
						<p>To try the demo, just insert a username to join the room. This will
						add you to chatroom, and allow you to interact with the other participants.</p>
						<p>Notice that this is just a very basic demo, and that is just one of
						the several different ways you can use this plugin for. The plugin
						actually allows you to join multiple rooms at the same time, and also
						to forward incoming messages to the room to external components. This
						makes it a useful tool whenever you have to interact with third party
						applications and exchange text data.</p>
						<p>Press the <code>Start</code> button above to launch the demo.</p>
					</div>
				</div>
			</div>
			<div class="container hide" id="roomjoin">
				<div class="row">
					<span class="label label-info" id="you"></span>
					<div class="col-md-12" id="controls">
						<div class="input-group margin-bottom-md hide" id="registernow">
							<span class="input-group-addon">@</span>
							<input class="form-control" type="text" placeholder="Choose a display name" autocomplete="off" id="username" onkeypress="return checkEnter(this, event);" />
							<span class="input-group-btn">
								<button class="btn btn-success" autocomplete="off" id="register">Join the room</button>
							</span>
						</div>
					</div>
				</div>
			</div>
			-->
			<div class="container hide" id="room">
				<div class="row">
					<div class="col-md-4">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">参加者 <span class="label label-info hide" id="participant"></span></h3>
							</div>
							<div class="panel-body">
								<ul id="list" class="list-group">
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Roomチャット</h3>
							</div>
							<div class="panel-body relative" style="overflow-x: auto;" id="chatroom">
							</div>
							<div class="panel-footer">
								<div class="input-group margin-bottom-sm">
									<span class="input-group-addon"><i class="fa fa-cloud-upload fa-fw"></i></span>
									<input class="form-control" type="text" placeholder="Write a chatroom message" autocomplete="off" id="datasend" onkeypress="return checkEnter(this, event);" disabled />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--
	<hr>
	<div class="footer"></div>
	-->
</div>

</body>
</html>
