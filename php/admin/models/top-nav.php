<?php
/*
UserSpice 2.5.6
by Dan Hoover at http://UserSpice.com

based on
UserCake Version: 2.0.2


UserCake created by: Adam Davis
UserCake V2.0 designed by: Jonathan Cassels

Please note that this version uses technology that some consider
to be outdated. This version is designed as a cosmetic upgrade for
users of 2.0.2 and as a path towards development of version 3.0 and beyond
*/
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Room</title>

  <!-- Bootstrap Core CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom CSS -->
  <link href="css/sb-admin.css" rel="stylesheet">
	<style>
	nav {
			padding-top: 20px;
			padding-left: 15.5em;
			padding-right: 10.5em;
	}
  </style>

  <!-- Custom Fonts -->
  <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="css/custom.css" rel="stylesheet">
</head>

<body>
  <div id="wrapper">
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <!-- This is the responsive menu. Feel Free to use it! -->
        <a class="navbar-brand" href="index.php"><?php echo $lang["TOP_NAV_PHP_APP_NAME"] ?></a>
      </div>
      <!-- Top Menu Items -->
      <ul class="nav navbar-right top-nav">
        <div class="form-group">
	<?php
  if(isUserLoggedIn()) { ?>
          <a href='../index.php' class='btn btn-primary'><?php echo $lang["TOP_NAV_PHP_ACCOUNT_INFO"] ?></a> 
          <a href='logout.php' class='btn btn-danger'><?php echo $lang["TOP_NAV_PHP_SIGN_OUT"] ?></a>
  <?php
  } else { ?>
          <p>
            <a href='../index.php' class='btn btn-success'><?php echo $lang["TOP_NAV_PHP_SIGN_IN"] ?></a>
          </p>
  <?php
  } ?>
        </div>
      </ul>
