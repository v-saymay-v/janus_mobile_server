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
function BuildOneCombo($gid) {
  global $mysqli,$db_table_prefix,$db_key;
?>
    <select class="form-control" name="parent">
      <option value="">--</option>
      <option value="1"<?php echo($gid==1?" selected":"") ?>>ルート</option>
<?php
  $stmt = $mysqli->prepare("SELECT
    n_group as id,
    c_name as name
    FROM ".$db_table_prefix."group
    WHERE b_admin = 0");
  if ($stmt) {
    $stmt->execute();
    $stmt->bind_result($id, $name);

    while ($stmt->fetch()){
?>
      <option value="<?php echo $id ?>"<?php echo($id==$gid?" selected":"") ?>><?php echo $name ?></option>
<?php
    }
    $stmt->close();
  } else {
    syslog(LOG_ERR, $mysqli->error);
  } ?>
    </select>
    <br />
<?php
}

function BuildDivisionCombo($gid) {
  global $mysqli,$db_table_prefix,$db_key,$newuser,$userId;
  if ($gid == "new") {
    BuildOneCombo(0);
  } else {
    BuildOneCombo($gid);
  }
}

$userId = $_GET['id'];

if ($userId == 'new') {
  $userdetails = array('id' => 0, 'name' => '', 'parent' => 0, 'tree' => '');
} else {
  //Check if selected user exists
  if(!departIdExists($userId)){
    header("Location: admin_departs.php");
    die();
  }
  $userdetails = fetchDepartDetails($userId); //Fetch user details
}

//Forms posted
if(!empty($_POST))
{
  beginTransact();
  //Delete selected account
  if(!empty($_POST['delete'])){
    $deletions = $_POST['delete'];
    if ($deletion_count = deleteDeparts($deletions)) {
      $successes[] = lang("ACCOUNT_DELETIONS_SUCCESSFUL", array($deletion_count));
    }
    else {
      $errors[] = lang("SQL_ERROR");
    }
  }
  else
  {
    if ($userId == 'new') {
      $userdetails = createDepart($loggedInUser->company_id);
      $userId = $userdetails['id'];
    }

    //Update email
    if ($userdetails['name'] != $_POST['name']){
      $name = trim($_POST["name"]);
      if (updateDepartName($userId, $name)){
        $successes[] = lang("ACCOUNT_DEPART_UPDATED");
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }

    if ($userdetails['parent'] != $_POST['parent']){
      $parent = trim($_POST["parent"]);

      syslog(LOG_ERR, "new parent => ".$parent); 
      if (updateDepartParent($userId, $parent)){
        $successes[] = lang("ACCOUNT_DEPART_UPDATED");
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }

    if (count($errors) > 0) {
      rollbackTransact();
    } else {
      beginTransact();
    }

    $userdetails = fetchDepartDetails($userId);
  }
}
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
          <h3><?php echo $lang["ADMIN_DEPART_PHP_DEPART_INFORMATION"] ?></h3>
          <div id="regbox">
            <?php
            if ($userId != 'new') { ?>
              <p>
                <label>ID:</label>
                <?php echo $userdetails['id']; ?>
              </p>
            <?php
            } ?>

            <p>
              <label><?php echo $lang["ADMIN_DEPART_PHP_NAME"] ?>:
              <input class="form-control" type="text" name="name" value="<?php echo $userdetails['name'] ?>" /></label>
            </p>

            <p>
              <label><?php echo $lang["ADMIN_DEPART_PHP_PARENT"] ?>:
              <?php BuildDivisionCombo($userdetails['parent']) ?>
              </label>
            </p>

            <?php
            if ($userId != 'new') { ?>
            <p>
              <label><?php echo $lang["ADMIN_DEPART_PHP_DELETE"] ?>:</label>
              <input type="checkbox" name="delete[<?php $userdetails['id'] ?>]" id="delete[<?php echo $userdetails['id'] ?>]" value="<?php echo $userdetails['id'] ?>">
            </p>
            <?php
            } ?>
            <p>
              <label>&nbsp;</label>
            <?php
            if ($userId != 'new') { ?>
              <input class='btn btn-primary' type='submit' value='<?php echo $lang["ADMIN_DEPART_PHP_UPDATE"] ?>' class='submit' />
            <?php
            } else {?>
              <input class='btn btn-primary' type='submit' value='<?php echo $lang["ADMIN_DEPART_PHP_ADD"] ?>' class='submit' />
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
