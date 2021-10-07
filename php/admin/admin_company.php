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
$id = $_GET['id'];

if ($id == 'new') {
  $companydetails = array('id' => $id, 'comp_name' => '', 'memo' => '', 'admin_login' => '', 'admin_pass' => '', 'admin_name' => lang("ADMIN_COMPS_PHP_ADMIN_DEFAULT"), 'last_sign_in_stamp' => 0);
} else {
  //Check if selected user exists
  if(!companyIdExists($id)){
    header("Location: admin_companies.php");
    die();
  }

  $companydetails = fetchCompanyDetails($id); //Fetch user details
}

//Forms posted
if(!empty($_POST))
{
  beginTransact();
  //Delete selected account
  if(!empty($_POST['delete'])){
    $deletions = $_POST['delete'];
    if ($deletion_count = deleteCompanies($deletions)) {
      $successes[] = lang("ACCOUNT_DELETIONS_SUCCESSFUL", array($deletion_count));
    }
    else {
      $errors[] = lang("SQL_ERROR");
    }
  }
  else
  {
    if ($id == 'new') {
      $companydetails = createCompany();
    }
    //Update display name
    if ($companydetails['comp_name'] != $_POST['comp_name']){
      $companyname = trim($_POST['comp_name']);

      if (minMaxRange(2,128,$companyname))
      {
        $errors[] = lang("ACCOUNT_DISPLAY_CHAR_LIMIT",array(2,128));
      }
      else {
        if (updateCompanyName($companydetails['id'], $companyname)){
          $successes[] = lang("ACCOUNT_DISPLAYNAME_UPDATED", array($companyname));
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      }

    }

    //Activate account
    if($companydetails['memo'] != $_POST['memo']) {
      $companymemo = trim($_POST['memo']);

      if (updateCompanyMemo($companydetails['id'], $companymemo)) {
        $successes[] = lang("ACCOUNT_MEMO_UPDATED");
      }
      else {
        $errors[] = lang("SQL_ERROR");
      }
    }

    //Update email
    if ($companydetails['admin_login'] != $_POST['admin_login']){
      $adminlogin = trim($_POST["admin_login"]);

      //Validate email
      if(!isValidEmail($adminlogin))
      {
        $errors[] = lang("ACCOUNT_INVALID_EMAIL");
      }
      elseif(adminLoginExists($adminlogin))
      {
        $errors[] = lang("ACCOUNT_EMAIL_IN_USE",array($adminlogin));
      }
      else {
        if (updateAdminLogin($companydetails['id'], $adminlogin)) {
          $successes[] = lang("ACCOUNT_DISPLAYNAME_UPDATED", array($adminlogin));
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      }
    }

    if ($companydetails['admin_name'] != $_POST['admin_name']){
      $adminname = trim($_POST["admin_name"]);

      if(minMaxRange(2,128,$adminname))
      {
        $errors[] = lang("ACCOUNT_DISPLAY_CHAR_LIMIT",array(2,128));
      }
      else {
        if (updateAdminName($companydetails['id'], $adminname)) {
          $successes[] = lang("ACCOUNT_DISPLAYNAME_UPDATED", array($adminname));
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      }
    }

    if ($id == 'new') {
      if ($_POST['password'] == '') {
        $errors[] = lang("ACCOUNT_SPECIFY_PASSWORD");
      } else if ($_POST['password'] == $_POST['confirm']) {
        $password = trim($_POST["password"]);

        if (updateAdminPass($companydetails['id'], $password)){
          $successes[] = lang("ACCOUNT_PASSWORD_UPDATED");
        }
        else {
          $errors[] = lang("SQL_ERROR");
        }
      } else {
        $errors[] = lang("ACCOUNT_PASS_MISMATCH");
      }
    }

    if (count($errors) > 0) {
      rollbackTransact();
    } else {
      commitTransact();
    }

    if ($id == 'new') {
      $id = $companydetails['id'];
    }
    $companydetails = fetchCompanyDetails($id);
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
            if ($id != 'new') {
              echo "会社情報編集";
            } else {
              echo "新規会社登録";
            } ?>
          </h1>
          <!-- CONTENT GOES HERE -->

          <?php
          echo resultBlock($errors, $successes);
          ?>

          <form name="adminUser" action="<?php echo $_SERVER['PHP_SELF']."?id=".$id ?>" method="post">
          <table class="table">
          <tr>
            <td>
              <h3><?php echo $lang["ADMIN_USER_PHP_USER_INFORMATION"] ?></h3>
              <div id="regbox">
                <?php
                if ($id != 'new') { ?>
                <p>
                  <label>ID:</label>
                  <?php echo $companydetails['id']; ?>
                </p>
                <?php
                } ?>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_COMPANY_NAME"] ?>:
                    <input class="form-control" type="text" name="comp_name" value="<?php echo $companydetails['comp_name'] ?>" />
                  </label>
                </p>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_ADMIN_LOGIN"] ?>:
                    <input class="form-control" type="email" name="admin_login" value="<?php echo $companydetails['admin_login'] ?>" placeholder="admin@yourcompany.co.jp" />
                  </label>
                </p>
                <?php
                if ($id == 'new') { ?>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_ADMIN_PASS"] ?>:
                    <input class="form-control" type="password" name="password" value="" />
                  </label>
                </p>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_ADMIN_PASS_CONFIRM"] ?>:
                    <input class="form-control" type="password" name="confirm" value="" />
                  </label>
                </p>
                <?php
                } ?>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_ADMIN_NAME"] ?>:
                    <input class="form-control" type="text" name="admin_name" value="<?php echo $companydetails['admin_name'] ?>" />
                  </label>
                </p>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_MEMO"] ?>:
                  <textarea class="form-control" name="memo"><?php echo $companydetails['memo'] ?></textarea>
                  </label>
                </p>

                <?php
                if ($id != 'new') { ?>
                <p>
                  <label><?php echo $lang["ADMIN_COMPS_PHP_LAST_SIGN_IN"] ?>: </label>
                  <?php
                  //Last sign in, interpretation
                  if ($companydetails['last_sign_in_stamp'] == 0) {
                    echo "Never";
                  }
                  else {
                    echo date("j M, Y", $companydetails['last_sign_in_stamp']);
                  } ?>
                </p>

                <p>
                  <label><?php echo $lang["ADMIN_USER_PHP_DELETE"] ?>:</label>
                  <input type="checkbox" name="delete[<?php $companydetails['id'] ?>]" id="delete[<?php echo $companydetails['id'] ?>]" value="<?php echo $companydetails['id'] ?>">
                </p>
                <?php
                } ?>
                <p>
                  <label>&nbsp;</label>
                  <?php
                if ($id != 'new') { ?>
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
