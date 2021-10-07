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
<!-- /.navbar-collapse -->
</nav>
<!-- PHP GOES HERE -->
<?php
//Forms posted
$email = $_GET["email"];
if(!empty($_POST) && $emailActivation)
{
	$email = $_POST["email"];
	//$username = $_POST["username"];

	//Perform some validation
	//Feel free to edit / change as required
	if(trim($email) == "")
	{
		$errors[] = lang("ACCOUNT_SPECIFY_EMAIL");
	}
	//Check to ensure email is in the correct format / in the db
	else if(!isValidEmail($email) || !emailExists($mysqli, $email))
	{
		$errors[] = lang("ACCOUNT_INVALID_EMAIL");
	}
	if(count($errors) == 0)
	{
			$userdetails = fetchUserDetails($mysqli, NULL, $email);

			//See if the user's account is activation
			if($userdetails["active"]==1)
			{
				$errors[] = lang("ACCOUNT_ALREADY_ACTIVE");
			}
			else
			{
				if ($resend_activation_threshold == 0) {
					$hours_diff = 0;
				}
				else {
					$last_request = $userdetails["last_activation_request"];
					$hours_diff = round((time()-$last_request) / (3600*$resend_activation_threshold),0);
				}

				if($resend_activation_threshold!=0 && $hours_diff <= $resend_activation_threshold)
				{
					$errors[] = lang("ACCOUNT_LINK_ALREADY_SENT",array($resend_activation_threshold));
				}
				else
				{
					//For security create a new activation url;
					$new_activation_token = generateActivationToken($mysqli);

					if(!updateLastActivationRequest($mysqli,$new_activation_token,$email))
					{
						$errors[] = lang("SQL_ERROR");
					}
					else
					{
						$mail = new userCakeMail();

						$activation_url = $websiteUrl."activate-account.php?token=".$new_activation_token;

						//Setup our custom hooks
						$hooks = array(
							"searchStrs" => array("#ACTIVATION-URL#","#USERNAME#"),
							"subjectStrs" => array($activation_url,$userdetails["display_name"])
							);

						if(!$mail->newTemplateMsg("resend-activation.txt",$hooks))
						{
							$errors[] = lang("MAIL_TEMPLATE_BUILD_ERROR");
						}
						else
						{
							if(!$mail->sendMail($userdetails["email"],"Activate your ".$websiteName." Account"))
							{
								$errors[] = lang("MAIL_ERROR");
							}
							else
							{
								//Success, user details have been updated in the db now mail this information out.
								$successes[] = lang("ACCOUNT_NEW_ACTIVATION_SENT");
							}
						}
					}
				}
			}
	}
}

//Prevent the user visiting the logged in page if he/she is already logged in
if(isUserLoggedIn()) { header("Location: ../index.php"); die(); }
?>
  <div id="page-wrapper">
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">
            <?php echo $lang["RESEND_ACTIVATION_PHP_RESEND_ACTIVATION"] ?>
        	</h1>
<!-- CONTENT GOES HERE -->
<?php
echo resultBlock($errors,$successes);
?>

					<div id='regbox'>

<?php
//Show disabled if email activation not required
if(!$emailActivation)
{
  echo lang("FEATURE_DISABLED");
}
else
{ ?>
						<form name='resendActivation' action='<?php echo $_SERVER['PHP_SELF'] ?>' method='post'>
					  <p>
						  <label><?php echo $lang["RESEND_ACTIVATION_EMAIL"] ?>:</label>
						  <input class='form-control' type='text' name='email' value='<?php echo $email ?>' />
					  </p>
					  <p>
						  <label>&nbsp;</label>
						  <input class='btn btn-primary' type='submit' value='Submit' class='submit' />
					  </p>
					  </form>";
<?php
} ?>

        	</div>
      </div>
    <!-- /.row -->
    </div>
  <!-- /.container-fluid -->
  </div>
  <!-- /#page-wrapper -->

</div>
<!-- /#wrapper -->
<!-- footer -->
<?php require_once("models/footer.php"); ?>
