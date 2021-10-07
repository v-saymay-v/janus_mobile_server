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
if(!empty($_POST))
{
  $deletions = $_POST['delete'];
  if ($deletion_count = deleteDeparts($deletions)){
    $successes[] = lang("ACCOUNT_DELETIONS_SUCCESSFUL", array($deletion_count));
  }
  else {
    $errors[] = lang("SQL_ERROR");
  }
}

$userData = fetchAllDeparts(); //Fetch information for all users
?>

<div id="page-wrapper">

<div class="container-fluid">

  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12">
      <h1 class="page-header">
        <?php echo $lang["ADMIN_DEPARTS_PHP_ADMIN_DEPARTS"] ?>
      </h1>
      <!-- CONTENT GOES HERE -->

      <?php
      echo resultBlock($errors,$successes);
      ?>

      <form name='adminUsers' action='<?php echo $_SERVER['PHP_SELF'] ?>' method='post'>
      <table class='table table-hover'>
      <tr>
        <th><?php echo $lang["ADMIN_DEPARTS_PHP_DELETE"] ?></th>
        <th><?php echo $lang["ADMIN_DEPARTS_PHP_NAME"] ?></th>
        <th><?php echo $lang["ADMIN_DEPARTS_PHP_TREE"] ?></th>
      </tr>

      <?php
      //Cycle through users
      foreach ($userData as $v1) { ?>
        <tr>
          <td><input type='checkbox' name='delete[<?php echo $v1['id'] ?>]' id='delete[<?php echo $v1['id'] ?>]' value='<?php echo $v1['id'] ?>'></td>
          <td><a href='admin_depart.php?id=<?php echo $v1['id'] ?>'><?php echo $v1['name'] ?></a></td>
          <td><?php echo $v1['tree'] ?></td>
        </tr>
      <?php
      } ?>

      </table>
      <input class="btn btn-primary" type="submit" name="Submit" value="<?php echo $lang["ADMIN_DEPARTS_PHP_DELETE"] ?>" />
      <input class="btn btn-primary" type="button" name="Add" value="<?php echo $lang["ADMIN_DEPARTS_PHP_ADD"] ?>" onclick="location.href='admin_depart.php?id=new'" />
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
