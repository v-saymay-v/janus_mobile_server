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
if(!empty($_POST))
{
	$cfgId = array();
	$newSettings = $_POST['settings'];

	//Validate new site name
	if ($newSettings[1] != $websiteName) {
		$newWebsiteName = $newSettings[1];
		if(minMaxRange(1,150,$newWebsiteName))
		{
			$errors[] = lang("CONFIG_NAME_CHAR_LIMIT",array(1,150));
		}
		else if (count($errors) == 0) {
			$cfgId[] = 1;
			$cfgValue[1] = $newWebsiteName;
			$websiteName = $newWebsiteName;
		}
	}

	//Validate new URL
	if ($newSettings[2] != $websiteUrl) {
		$newWebsiteUrl = $newSettings[2];
		if(minMaxRange(1,150,$newWebsiteUrl))
		{
			$errors[] = lang("CONFIG_URL_CHAR_LIMIT",array(1,150));
		}
		else if (substr($newWebsiteUrl, -1) != "/"){
			$errors[] = lang("CONFIG_INVALID_URL_END");
		}
		else if (count($errors) == 0) {
			$cfgId[] = 2;
			$cfgValue[2] = $newWebsiteUrl;
			$websiteUrl = $newWebsiteUrl;
		}
	}

	//Validate new site email address
	if ($newSettings[3] != $emailAddress) {
		$newEmail = $newSettings[3];
		if(minMaxRange(1,150,$newEmail))
		{
			$errors[] = lang("CONFIG_EMAIL_CHAR_LIMIT",array(1,150));
		}
		elseif(!isValidEmail($newEmail))
		{
			$errors[] = lang("CONFIG_EMAIL_INVALID");
		}
		else if (count($errors) == 0) {
			$cfgId[] = 3;
			$cfgValue[3] = $newEmail;
			$emailAddress = $newEmail;
		}
	}

	//Validate email activation selection
	$ea = $emailActivation?"true":"false";
	if ($newSettings[4] != $ea) {
		$newActivation = $newSettings[4];
		if($newActivation != "true" AND $newActivation != "false")
		{
			$errors[] = lang("CONFIG_ACTIVATION_TRUE_FALSE");
		}
		else if (count($errors) == 0) {
			$cfgId[] = 4;
			$cfgValue[4] = $newActivation;
			$emailActivation = ($newActivation=="true");
		}
	}

	//Validate new email activation resend threshold
	if ($newSettings[5] != $resend_activation_threshold) {
		$newResend_activation_threshold = $newSettings[5];
		if($newResend_activation_threshold > 72 OR $newResend_activation_threshold < 0)
		{
			$errors[] = lang("CONFIG_ACTIVATION_RESEND_RANGE",array(0,72));
		}
		else if (count($errors) == 0) {
			$cfgId[] = 5;
			$cfgValue[5] = $newResend_activation_threshold;
			$resend_activation_threshold = $newResend_activation_threshold;
		}
	}

	//Validate new language selection
	if ($newSettings[6] != $language) {
		$newLanguage = $newSettings[6];
		if(minMaxRange(1,150,$language))
		{
			$errors[] = lang("CONFIG_LANGUAGE_CHAR_LIMIT",array(1,150));
		}
		elseif (!file_exists($newLanguage)) {
			$errors[] = lang("CONFIG_LANGUAGE_INVALID",array($newLanguage));
		}
		else if (count($errors) == 0) {
			$cfgId[] = 6;
			$cfgValue[6] = $newLanguage;
			$language = $newLanguage;
		}
	}

	//Validate new template selection
	if ($newSettings[7] != $template) {
		$newTemplate = $newSettings[7];
		if(minMaxRange(1,150,$template))
		{
			$errors[] = lang("CONFIG_TEMPLATE_CHAR_LIMIT",array(1,150));
		}
		elseif (!file_exists($newTemplate)) {
			$errors[] = lang("CONFIG_TEMPLATE_INVALID",array($newTemplate));
		}
		else if (count($errors) == 0) {
			$cfgId[] = 7;
			$cfgValue[7] = $newTemplate;
			$template = $newTemplate;
		}
	}

	//Validate email activation selection
	if ($newSettings[8] != $showOthers) {
		$newShowOthers = $newSettings[8];
		if($newShowOthers != "true" AND $newShowOthers != "false")
		{
			$errors[] = lang("CONFIG_ACTIVATION_TRUE_FALSE");
		}
		else if (count($errors) == 0) {
			$cfgId[] = 8;
			$cfgValue[8] = $newShowOthers;
			$showOthers = $newShowOthers;
		}
	}

	//Update configuration table with new settings
	if (count($errors) == 0 AND count($cfgId) > 0) {
		updateConfig($cfgId, $cfgValue);
		$successes[] = lang("CONFIG_UPDATE_SUCCESSFUL");
	}
}

$languages = getLanguageFiles(); //Retrieve list of language files
$templates = getTemplateFiles(); //Retrieve list of template files
$permissionData = fetchAllPermissions(); //Retrieve list of all permission levels
?>







        <div id="page-wrapper">
          <!-- Main jumbotron for a primary marketing message or call to action -->

          <!-- <div class="jumbotron">
          <div class="container">
          <h1>Jumbotron!!!</h1>
          <p>This is a great area to highlight something.</p>
          <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
          </div>
          </div> -->

            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            <?php echo $lang["ADMIN_CONFINGRATION_PHP_ADMIN_CONFINGRATION"] ?>
                        </h1>
<!-- CONTENT GOES HERE -->
<?php
echo resultBlock($errors,$successes);
?>

<div id="regbox">
<form name="adminConfiguration" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
<p>
<label><?php echo $lang["ADMIN_CONFINGRATION_PHP_WEBSITE_NAME"] ?>:</label>
<input class="form-control" type="text" name="settings[<?php echo $settings['website_name']['id'] ?>]" value="<?php echo $websiteName ?>" />
</p>

<p>
<label><?php echo $lang["ADMIN_CONFINGRATION_PHP_WEBSITE_URL"] ?>:</label>
<input type="text" class="form-control" name="settings[<?php echo $settings['website_url']['id'] ?>]" value="<?php echo $websiteUrl ?>" />
</p>

<p>
<label><?php echo $lang["ADMIN_CONFINGRATION_PHP_EMAIL"] ?>:</label>
<input class="form-control"  type="text" name="settings[<?php echo $settings['email']['id'] ?>]" value="<?php echo $emailAddress ?>" />
</p>

<p>
<label><?php echo $lang["ADMIN_CONFINGRATION_PHP_ACTIVATION_THRESHOLD"] ?>:</label>
<input class="form-control" type="text" name="settings[<?php echo $settings['resend_activation_threshold']['id'] ?>]" value="<?php echo $resend_activation_threshold ?>" />
</p>

<p>
<label><?php echo $lang["ADMIN_CONFINGRATION_PHP_LANGUAGE"] ?>:</label>
<select class="form-control" name="settings[<?php echo $settings['language']['id'] ?>]">
<?php
//Display language options
foreach ($languages as $optLang){
	if ($optLang == $language){ ?>
		<option value="<?php echo $optLang ?>" selected><?php echo $optLang ?></option>
<?php
	}
	else { ?>
		<option value="<?php echo $optLang ?>"><?php echo $optLang ?></option>
<?php
	}
}
?>
</select>
</p>

<p>
<label><?php echo $lang["ADMIN_CONFINGRATION_PHP_EMAIL_ACTIVATION"] ?>:</label>
<select class="form-control" name="settings[<?php echo $settings['activation']['id'] ?>]">
<?php
//Display email activation options
if ($emailActivation) { ?>
	<option value="true" selected>True</option>
	<option value="false">False</option>
<?php
}
else { ?>
	<option value="true">True</option>
	<option value="false" selected>False</option>
<?php
} ?>
</select>
</p>

<p>
<label><? echo $lang["ADMIN_CONFINGRATION_PHP_SHOW_OTHERS"] ?>:</label>
<select class="form-control" name="settings[<?php echo $settings['show_others']['id'] ?>]">
<?php
//Display email activation options
if ($showOthers == "true"){ ?>
	<option value="true" selected>True</option>
	<option value="false">False</option>
<?php
}
else { ?>
	<option value="true">True</option>
	<option value="false" selected>False</option>
<?php
} ?>
</select>
</p>

<p>
<label><? echo $lang["ADMIN_CONFINGRATION_PHP_TEMPLATE"] ?>:</label>
<select class="form-control" name="settings[<?php echo $settings['template']['id'] ?>]">
<?php
//Display template options
foreach ($templates as $temp){
	if ($temp == $template){ ?>
		<option value="<?php echo $temp ?>" selected><?php echo $temp ?></option>
<?php
	}
	else { ?>
		<option value="<?php echo $temp ?>"><?php echo $temp ?></option>
<?php
	}
} ?>
</select>
</p>

<input  class="btn btn-primary" type="submit" name="Submit" value="Submit" />
</form>









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
