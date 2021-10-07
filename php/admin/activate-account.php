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
require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
?>
<?php require_once("models/top-nav.php"); ?>

<!-- If you are going to include the sidebar, do it here -->
<?php require_once("models/left-nav.php"); ?>
</div>
</nav>

<?php
// Top Code Goes Here
//Get token param
if(isset($_GET["token"]))
{
	$token = $_GET["token"];
	if(!isset($token))
	{
		$errors[] = lang("FORGOTPASS_INVALID_TOKEN");
	}
	else if(!validateActivationToken($mysqli,$token,false)) //Check for a valid token. Must exist and active must be = 0
	{
		$errors[] = lang("ACCOUNT_TOKEN_NOT_FOUND");
	}
	else
	{
		//Activate the users account
		if(!setUserActive($token))
		{
			$errors[] = lang("SQL_ERROR");
		}
	}
}
else
{
	$errors[] = lang("FORGOTPASS_INVALID_TOKEN");
}

if(count($errors) == 0) {
	$successes[] = lang("ACCOUNT_ACTIVATION_COMPLETE");
/*
	$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	$idx = strpos($url, strrchr($url, '/'));
	$url = substr($url, 0, $idx+1);
	$idx = strpos($url, strrchr($url, '/'));
	header('Location: '.substr($url, 0, $idx+1)."index.php");
*/
}
?>
  <div id="page-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">
            <?php echo lang("ACTIVATE_ACCOUNT_PHP_ACTIVATE_ACCOUNT") ?>
          </h1>
<?php
echo resultBlock($errors,$successes);
?>
      	</div>
      </div>
    </div>
	</div>
</div>
<?php require_once("models/footer.php"); ?>
