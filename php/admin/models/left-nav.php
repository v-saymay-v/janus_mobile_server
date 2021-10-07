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
<!-- This needs to be secured -->
<?php //if (!securePage($_SERVER['PHP_SELF'])){die();} ?>

<div class='collapse navbar-collapse navbar-ex1-collapse'>
  <ul class='nav navbar-nav side-nav'>

<?php
//Links for logged in user
if (isUserLoggedIn()) {
?>
    <li>
        <a href='../index.php'><i class='fa fa-fw fa-dashboard'></i> <?php echo $lang["LEFT_NAV_PHP_ACCOUNT_HOME"] ?></a>
    </li>
    <li>
        <a href='user_settings.php'><i class='fa fa-fw fa-pencil-square-o'></i> <?php echo $lang["LEFT_NAV_PHP_USER_SETTING"] ?></a>
    </li>
<?php
	//Links for permission level 2 (default admin)
	if ($loggedInUser->checkPermission(array(2))) {
?>
    <li>
        <a href='admin_configuration.php'><i class='fa fa-fw fa-wrench'></i> <?php echo $lang["LEFT_NAV_PHP_ADMIN_CONFIGURATION"] ?></a>
    </li>
    <li>
        <a href='admin_companies.php'><i class='fa fa-fw fa-users'></i> <?php echo $lang["LEFT_NAV_PHP_ADMIN_COMPANIES"] ?></a>
    </li>
    <li>
        <a href='../roomadmin.php'><i class='fa fa-fw fa-users'></i> <?php echo $lang["LEFT_NAV_PHP_ADMIN_ROOMS"] ?></a>
    </li>
<?php
  } else if ($loggedInUser->checkPermission(array(1))) {
 ?>
    <li>
        <a href='admin_departs.php'><i class='fa fa-fw fa-users'></i> <?php echo $lang["LEFT_NAV_PHP_ADMIN_DEPARTS"] ?></a>
    </li>
    <li>
        <a href='admin_users.php'><i class='fa fa-fw fa-users'></i> <?php echo $lang["LEFT_NAV_PHP_ADMIN_USERS"] ?></a>
    </li>
<?php
  }
?>
    <li>
      <a href='logout.php'><i class='fa fa-fw fa-angellist'></i> <?php echo $lang["LEFT_NAV_PHP_LOGOUT"] ?></a>
    </li>
<?php
//Links for users not logged in
} else {
?>
    <li>
      <a href='forgot-password.php'><i class='fa fa-fw fa-wrench'></i> <?php echo $lang["LEFT_NAV_PHP_FORGOT_PASSWORD"] ?></a>
    </li>
<?php
  	if ($emailActivation)
  	{
 ?>
   <li><a href="resend-activation.php"><?php echo $lang["LEFT_NAV_PHP_RESEND_ACTIVATION_EMAIL"] ?></a></li>
<?php
  	}
}
?>
  </ul>
