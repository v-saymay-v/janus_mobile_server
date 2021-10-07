<?php
require_once("app.php");
$app = new room_app();
if (!isset($app->loggedInUser)
  || !$app->loggedInUser->is_admin
	|| !$app->loggedInUser->is_master)
{
	header("Location: index.php");
	die();
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Janus WebRTC Server: Admin/Monitor</title>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.0/bootbox.min.js"></script>
<script type="text/javascript" src="roomadmin.js"></script>
<script>
/*
	$(function() {
		$(".navbar-static-top").load("navbar.html", function() {
			$(".navbar-static-top li.dropdown").addClass("active");
			$(".navbar-static-top a[href='admin.html']").parent().addClass("active");
		});
		$(".footer").load("footer.html");
	});
*/
</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.4.0/cerulean/bootstrap.min.css" type="text/css"/>
<link rel="stylesheet" href="css/demo.css" type="text/css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css"/>
</head>
<body>

<!--
<a href="https://github.com/meetecho/janus-gateway"><img style="position: absolute; top: 0; left: 0; border: 0; z-index: 1001;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png" alt="Fork me on GitHub"></a>
-->

<nav class="navbar navbar-default navbar-static-top">
</nav>

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="page-header">
				<h1>Janus WebRTC Server: Admin/Monitor</h1>
			</div>

			<div>
				<ul id="admintabs" class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
					<li role="presentation" class="disabled"><a href="#serverinfo" aria-controls="serverinfo" role="tab" data-toggle="tab">Server Info</a></li>
					<li role="presentation" class="disabled"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
					<li role="presentation" class="disabled"><a href="#plugins" aria-controls="plugins" role="tab" data-toggle="tab">Plugins</a></li>
					<li role="presentation" class="disabled"><a href="#handlesinfo" aria-controls="handlesinfo" role="tab" data-toggle="tab">Handles</a></li>
					<li role="presentation" class="disabled"><a href="#tokens" aria-controls="tokens" role="tab" data-toggle="tab">Stored Tokens</a></li>
				</ul>

				<div class="tab-content" style="padding: 20px;">
					<div role="tabpanel" class="tab-pane fade in active" id="home">
						<p>This is just an example of how you can build an UI on top of the
						existing <code>Admin/Monitor</code> interface. This page will only
						work as it is if you enabled the API (which is disabled by default)
						and you're using the default values. Edit the backend settings in
						the <code>admin.js</code> JavaScript code to adapt it to your
						configuration if you changed anything.</p>
						<p>The <code>Server Info</code> tab, as the name suggests, provides
						you with a view of the information related to the Janus instance
						you're using, e.g., in terms of the features that have been enabled,
						the modules that are available and so on. That's the same info you'd
						get contacting the Janus API at the <code>/janus/info</code> backend.</p>
						<p>The <code>Settings</code> tab instead allows you to inspect a
						few of the current settings in Janus (e.g., debug level and so on)
						and provides you with a way to change them dynamically.</p>
						<p>The <code>Plugins</code> tab presents the list of media plugins
						available in this Janus instance, and allows you to interact with
						them, assuming they implement the <code>handle_admin_message</code> API.</p>
						<p>The <code>Handles</code> tab allows you to browse the currently active sessions
						and handles in Janus. Selecting a specific handle will provide you
						with all the current info related to it, including plugin it is
						attached to, any plugin specific information that may be relevant,
						ICE/DTLS states, amount of data being exchanged and so on. This
						section is especially helpful when you want to debug issues with
						a PeerConnection: you can find more details in
						<a href="http://www.meetecho.com/blog/understanding-the-janus-admin-api/" target="_blank">this blog post</a>.</p>
						<p>Finally, the <code>Stored Tokens</code> tab allows you to list
						existing authentication tokens, create new ones, associate plugin
						permissions and the like. This feature will only be possible if
						you enabled the stored-token authentication mechanism in Janus, of course.</p>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="serverinfo">
						<h4>Server Info</h4>
						<div>
							<table class="table table-striped" id="server-details">
							</table>
						</div>
						<h4>Dependencies</h4>
						<div>
							<table class="table table-striped" id="server-deps">
							</table>
						</div>
						<h4>Plugins</h4>
						<div>
							<table class="table table-striped" id="server-plugins">
							</table>
						</div>
						<h4>Transports</h4>
						<div>
							<table class="table table-striped" id="server-transports">
							</table>
						</div>
						<h4>Event handlers</h4>
						<div>
							<table class="table table-striped" id="server-handlers">
							</table>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="settings">
						<h4>Settings <i id="update-settings" class="fa fa-refresh" title="Refresh settings" style="cursor: pointer;"></i></h4>
						<div>
							<table class="table table-striped" id="server-settings">
							</table>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="plugins">
						<h4>Plugins</h4>
						<div class="row">
							<div class="col-md-3">
								<table class="table" id="plugins-list">
								</table>
							</div>
							<div id="plugin-message" class="col-md-9 hide">
								<div class="row">
									<h5>Request</h5>
									<table class="table" id="plugin-request">
									</table>
								</div>
								<div class="row">
									<h5>Response</h5>
									<pre id="plugin-response"></pre>
								</div>
							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="handlesinfo">
						<div id="sessions" class="col-md-2">
							<h4>Sessions (<span id="sessions-num">0</span>) <i id="update-sessions" class="fa fa-refresh" title="Refresh list of sessions" style="cursor: pointer;"></i></h4>
							<div id="sessions-list" class="list-group">
							</div>
						</div>
						<div id="handles" class="col-md-2">
							<h4>Handles (<span id="handles-num"></span>) <i id="update-handles" class="fa fa-refresh" title="Refresh list of handles" style="cursor: pointer;"></i></h4>
							<div id="handles-list" class="list-group">
							</div>
						</div>
						<div id="info" class="col-md-8">
							<h4>Handle Info <i id="update-handle" class="fa fa-refresh" title="Refresh handle info" style="cursor: pointer;"></i></h4>
							<div id="options" class="hide">
								<label class="checkbox-inline" title="Autorefresh this info every 5s">
									<input id="autorefresh" type="checkbox" value="" title="Autorefresh this info every 5s">Autorefresh
								</label>
								<label class="checkbox-inline" title="Show information as HTML">
									<input id="prettify" type="checkbox" value="" title="Show information as HTML">Prettify
								</label>
								<label class="checkbox-inline" title="Start of stop capturing traffic to .pcap">
									<input id="capture" type="checkbox" value="" title="Start of stop capturing traffic to .pcap">
									<span id="capturetext">Start capture</span>
								</label>
							</div>
							<div id="handle-info">
							</div>
						</div>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="tokens">
						<h4>Stored Tokens <i id="update-tokens" class="fa fa-refresh" title="Refresh tokens" style="cursor: pointer;"></i></h4>
						<div>
							<table class="table table-striped" id="auth-tokens">
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<hr>
	<div class="footer">
	</div>
</div>
</body>
</html>
