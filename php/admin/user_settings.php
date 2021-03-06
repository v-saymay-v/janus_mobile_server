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
//Prevent the user visiting the logged in page if he is not logged in
if(!isUserLoggedIn()) { header("Location: ../index.php"); die(); }

if(!empty($_POST))
{
  $errors = array();
  $successes = array();
  $password = $_POST["password"];
  $password_new = $_POST["passwordc"];
  $password_confirm = $_POST["passwordcheck"];

  $errors = array();
  $email = $_POST["email"];

  //Perform some validation
  //Feel free to edit / change as required

  //Confirm the hashes match before updating a users password
  $entered_pass = generateHash($password,$loggedInUser->hash_pw);

  if (trim($password) == ""){
    $errors[] = lang("ACCOUNT_SPECIFY_PASSWORD");
  }
  else if($entered_pass != $loggedInUser->hash_pw)
  {
    //No match
    $errors[] = lang("ACCOUNT_PASSWORD_INVALID");
  }
  if($email != $loggedInUser->email)
  {
    if(trim($email) == "")
    {
      $errors[] = lang("ACCOUNT_SPECIFY_EMAIL");
    }
    else if(!isValidEmail($email))
    {
      $errors[] = lang("ACCOUNT_INVALID_EMAIL");
    }
    else if(emailExists($mysqli, $email))
    {
      $errors[] = lang("ACCOUNT_EMAIL_IN_USE", array($email));
    }

    //End data validation
    if(count($errors) == 0)
    {
      $loggedInUser->updateEmail($email);
      $successes[] = lang("ACCOUNT_EMAIL_UPDATED");
    }
  }

  if ($password_new != "" OR $password_confirm != "")
  {
    if(trim($password_new) == "")
    {
      $errors[] = lang("ACCOUNT_SPECIFY_NEW_PASSWORD");
    }
    else if(trim($password_confirm) == "")
    {
      $errors[] = lang("ACCOUNT_SPECIFY_CONFIRM_PASSWORD");
    }
    else if(minMaxRange(8,50,$password_new))
    {
      $errors[] = lang("ACCOUNT_NEW_PASSWORD_LENGTH",array(8,50));
    }
    else if($password_new != $password_confirm)
    {
      $errors[] = lang("ACCOUNT_PASS_MISMATCH");
    }

    //End data validation
    if(count($errors) == 0)
    {
      //Also prevent updating if someone attempts to update with the same password
      $entered_pass_new = generateHash($password_new,$loggedInUser->hash_pw);

      if($entered_pass_new == $loggedInUser->hash_pw)
      {
        //Don't update, this fool is trying to update with the same password ????????
        $errors[] = lang("ACCOUNT_PASSWORD_NOTHING_TO_UPDATE");
      }
      else
      {
        //This function will create the new hash and update the hash_pw property.
        $loggedInUser->updatePassword($password_new);
        $successes[] = lang("ACCOUNT_PASSWORD_UPDATED");
      }
    }
  }
  if(count($errors) == 0 AND count($successes) == 0){
    $errors[] = lang("NOTHING_TO_UPDATE");
  }
}
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
        <?php echo $lang["USER_SETTINGS_PHP_USER_SETTINGS"] ?>
      </h1>
      <!-- CONTENT GOES HERE -->
      <?php
      echo resultBlock($errors,$successes);
      ?>

      <div id='regbox'>
      <form name="updateAccount" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
      <p>
      <label>Password:</label>
      <input class="form-control" type="password" name="password" />
      </p>
      <p>
      <label><?php echo $lang["USER_SETTINGS_PHP_EMAIL"] ?>:</label>
      <input class="form-control" type="text" name="email" value="<?php echo $loggedInUser->email ?>" />
      </p>
      <p>
      <label><?php echo $lang["USER_SETTINGS_PHP_NEW_PASSWORD"] ?>:</label>
      <input class="form-control" type="password" name="passwordc" />
      </p>
      <p>
      <label><?php echo $lang["USER_SETTINGS_PHP_CONFIRM_PASSWORD"] ?>:</label>
      <input class="form-control" type="password" name="passwordcheck" />
      </p>
      <p>
      <label>&nbsp;</label>
      <input class="btn btn-primary" type="submit" value="Update" class="submit" />
      </p>
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
