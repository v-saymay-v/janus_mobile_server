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
$userId = $_GET['id'];
$newuser = false;

if ($userId == "new") {
  $newuser = true;
  $userdetails = array('id' => 0, 'company_id' => $loggedInUser->company_id, 'user_name' => '',
              'display_name' => '', 'password' => '', 'email' => '', 'activation_token' => '',
              'division' => '', 'last_activation_request' => null, 'lost_password_request' => 0,
              'active' => $emailActivation?0:1, 'sign_up_stamp' => 0, 'last_sign_in_stamp' => 0);
} else {
  //Check if selected user exists
  if(!userIdExists($userId)){
    header("Location: admin_users.php");
    die();
  }
  $userdetails = fetchUserDetails($mysqli, NULL, NULL, NULL, $userId); //Fetch user details
}

$divisions = array();
$division = $userdetails['division'];
$stmt = $mysqli->prepare("SELECT
  n_group as id,
  c_name as name
  FROM ".$db_table_prefix."group
  WHERE b_admin = 0");
if ($stmt) {
  $stmt->execute();
  $stmt->bind_result($id, $name);
  while ($stmt->fetch()) {
    $divisions[$id] = $name;
  }
  $stmt->close();
}

//Forms posted
if(!empty($_POST))
{
  beginTransact();
  //Delete selected account
  if(!empty($_POST['delete'])){
    $deletions = $_POST['delete'];
    if ($deletion_count = deleteUsers($deletions)) {
      $successes[] = lang("ACCOUNT_DELETIONS_SUCCESSFUL", array($deletion_count));
    }
    else {
      $errors[] = lang("SQL_ERROR");
    }
  }
  else
  {
    if ($newuser) {
      $userdetails = createUser($loggedInUser->company_id);
      $userId = $userdetails['id'];
    }
    //Update display name
    if ($userdetails['display_name'] != $_POST['display']){
      $displayname = trim($_POST['display']);

      if(minMaxRange(2,64,$displayname))
      {
        $errors[] = lang("ACCOUNT_DISPLAY_CHAR_LIMIT",array(2,64));
      }
      else {
        if (updateDisplayName($userId, $displayname)){
          $successes[] = lang("ACCOUNT_DISPLAYNAME_UPDATED", array($displayname));
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      }
    }
    else {
      $displayname = $userdetails['display_name'];
    }
    
    //Activate account
    if(isset($_POST['activate']) && $_POST['activate'] == "activate"){
      //if (setUserActive($userdetails['activation_token'])){
      if (setUserActiveById($userId)){
        $successes[] = lang("ACCOUNT_MANUALLY_ACTIVATED", array($displayname));
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }
    
    //Update email
    if ($userdetails['email'] != $_POST['email']){
      $email = trim($_POST["email"]);

      //Validate email
      if(!isValidEmail($email))
      {
        $errors[] = lang("ACCOUNT_INVALID_EMAIL");
      }
      elseif(emailExists($mysqli, $email))
      {
        $errors[] = lang("ACCOUNT_EMAIL_IN_USE",array($email));
      }
      else {
        if (updateEmail($userId, $email)){
          $successes[] = lang("ACCOUNT_EMAIL_UPDATED");
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      }
    }

    //Update meeting id
    if ($userdetails['meeting'] != $_POST['meeting']) {
      $meeting = trim($_POST["meeting"]);
      if (empty($meeting)) {
        $meeting = generateRandomNumber();
      }
      //Validate email
      if (strlen($meeting) != 11) {
        $errors[] = lang("ACCOUNT_MEETING_ID_LIMIT",array(11));
      }
      else if(!isValidMeetingId($meeting))
      {
        $errors[] = lang("ACCOUNT_INVALID_MEETING_ID");
      }
      elseif(meetingIdExists($meeting))
      {
        $errors[] = lang("ACCOUNT_MEETING_ID_IN_USE",array($meeting));
      }
      else {
        if (updateMeetingId($userId, $meeting)){
          $successes[] = lang("ACCOUNT_MEETING_ID_UPDATED");
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      }
    }

    if ($newuser) {
      if ($_POST['password'] == '') {
        $errors[] = lang("ACCOUNT_SPECIFY_PASSWORD");
      } else if ($_POST['password'] == $_POST['confirm']){
        $password = trim($_POST["password"]);

        if (updatePassword($userId, $password)){
          $successes[] = lang("ACCOUNT_PASSWORD_UPDATED");
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      } else {
        $errors[] = lang("ACCOUNT_PASS_MISMATCH");
      }
    }

    //Update title
    if ($userdetails['division'] != $_POST['division']){
      $division = trim($_POST['division']);

      if (empty($division)) {
        $errors[] = lang("ACCOUNT_DIVISION_NOT_SELECTED");
      }
      else if (updateDivision($userId, $division)){
        $successes[] = lang("ACCOUNT_DIVISION_UPDATED", array ($displayname, $division));
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }

    //Remove permission level
    if(!empty($_POST['removePermission'])){
      $remove = $_POST['removePermission'];
      if ($deletion_count = removePermission($remove, $userId)){
        $successes[] = lang("ACCOUNT_PERMISSION_REMOVED", array ($deletion_count));
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }

    if(!empty($_POST['addPermission'])){
      $add = $_POST['addPermission'];
      if ($addition_count = addPermission($add, $userId)){
        $successes[] = lang("ACCOUNT_PERMISSION_ADDED", array ($addition_count));
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }

    if (count($errors) > 0) {
      rollbackTransact();
    } else {
      commitTransact();
    }

    $userdetails = fetchUserDetails($mysqli, NULL, NULL, NULL, $userId);
  }
}

if ($emailActivation && $newuser && isset($email)) {
  header("Location: resend-activation.php?email=".urlencode($email));
  die();
}
$userPermission = fetchUserPermissions($userId);
$permissionData = fetchAllPermissions();
?>


<div id="page-wrapper">

<div class="container-fluid">

  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12">
      <h1 class="page-header">
        <?php
        if ($userId != 'new') {
          echo "Edit User";
        } else {
          echo "New User";
        } ?>
      </h1>
      <!-- CONTENT GOES HERE -->

      <?php
      echo resultBlock($errors,$successes);
      ?>

      <form name="adminUser" action="<?php echo $_SERVER['PHP_SELF']."?id=".$userId ?>" method="post">
      <table class="table">
      <tr>
        <td>
          <h3><?php echo $lang["ADMIN_USER_PHP_USER_INFORMATION"] ?></h3>
          <div id="regbox">
            <?php
            if ($userId != 'new') { ?>
              <p>
                <label>ID:</label>
                <?php echo $userId/*$userdetails['id'];*/ ?>
              </p>
              <p>
                <label><?php echo $lang["ADMIN_USER_PHP_EMAIL"] ?>:
                <input class="form-control" type="text" name="email" value="<?php echo $userdetails['email'] ?>" /></label>
              </p>
            <?php
            } else { ?>
              <p>
                <label><?php echo $lang["ADMIN_USER_PHP_EMAIL"] ?>:
                <input class="form-control" type="text" name="email" value="<?php echo $userdetails['email'] ?>" /></label>
              </p>
              <p>
                <label><?php echo $lang["ADMIN_USER_PHP_PASSWORD"] ?>:
                <input class="form-control" type="password" name="password" value="" /></label>
              </p>
              <p>
                <label><?php echo $lang["ADMIN_USER_PHP_PASSWORD_CONFIRM"] ?>:
                <input class="form-control" type="password" name="confirm" value="" /></label>
              </p>
            <?php
            } ?>

            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_DISPLAY_NAME"] ?>:
              <input class="form-control" type="text" name="display" value="<?php echo $userdetails['display_name'] ?>" /></label>
            </p>

            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_PERSONAL_MEETING_ID"] ?>:
              <input class="form-control" type="text" name="meeting" value="<?php echo $userdetails['meeting'] ?>" /></label>
            </p>
            
            <?php
            if ($userId != 'new') { ?>
            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_ACTIVE"] ?>:</label>
              <?php
            //Display activation link, if account inactive
              if ($userdetails['active'] == '1'){
                echo "Yes";
              } else {
                echo "No"; ?>
            </p>
            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_ACTIVATE"] ?>:</label>
              <input type='checkbox' name='activate' id='activate' value='activate'>
            </p>
            <?php
              }
            } else { ?>
            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_ACTIVATE"] ?>:</label>
              <input type='checkbox' name='activate' id='activate' value='activate' checked>
            </p>
            <?php
            } ?>

            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_DIVISION"] ?>:
              <select class="form-control" name="division">
            <?php
              if ($division == 0) {?>
                <option value="">--</option>
            <?php
              }
              foreach ($divisions as $id => $name) {
            ?>
                <option value="<?php echo $id ?>"<?php echo($id==$division?" selected":"") ?>><?php echo $name ?></option>
            <?php
              } ?>
              </select></label>

              <?php //BuildDivisionCombo($division) ?>
              <!--
              <button>＋</button>
              -->
            </p>

            <?php
            if ($userId != 'new') { ?>
            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_SIGN_UP"] ?>: </label>
              <?php
              if (empty($userdetails['sign_up_stamp'])) {
                echo "Never";
              } else {
                echo date("j M, Y", $userdetails['sign_up_stamp']);
              } ?>
            </p>
            <?php
            } ?>

            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_LAST_SIGN_IN"] ?>: </label>
              <?php
              //Last sign in, interpretation
              if (empty($userdetails['last_sign_in_stamp'])){
                echo "Never";
              }
              else {
                echo date("j M, Y", $userdetails['last_sign_in_stamp']);
              } ?>
            </p>

            <?php
            if ($userId != 'new') { ?>
            <p>
              <label><?php echo $lang["ADMIN_USER_PHP_DELETE"] ?>:</label>
              <input type="checkbox" name="delete[<?php $userdetails['id'] ?>]" id="delete[<?php echo $userdetails['id'] ?>]" value="<?php echo $userdetails['id'] ?>">
            </p>
            <?php
            } ?>
            <p>
              <label>&nbsp;</label>
              <?php
            if ($userId != 'new') { ?>
              <input class='btn btn-primary' type='submit' value='<?php echo $lang["ADMIN_USER_PHP_UPDATE"] ?>' class='submit' />
              <?php
            } else {?>
              <input class='btn btn-primary' type='submit' value='<?php echo $lang["ADMIN_USER_PHP_ADD"] ?>' class='submit' />
            <?php
            } ?>
            </p>
          </div>
        </td>
      </tr>
      </table>
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
