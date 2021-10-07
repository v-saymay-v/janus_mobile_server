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
if (!$loggedInUser->is_admin) {
  syslog(LOG_ERR, "Not an admin user in account.php");
  header("Location: ../index.php");
  die();
}
?>
<?php require_once("models/top-nav.php"); ?>

<!-- If you are going to include the sidebar, do it here -->
<?php require_once("models/left-nav.php"); ?>
  </div>
  <!-- /.navbar-collapse -->
</nav>
<!-- PHP GOES HERE -->

    <div id="page-wrapper">
      <div class="container-fluid">
          <!-- Page Heading -->
          <div class="row">
              <div class="col-lg-12">
                  <h1 class="page-header"><?php echo $loggedInUser->displayname ?></h1>
                  <!-- CONTENT GOES HERE -->
<?php
$stamp = $loggedInUser->signupTimeStamp();
echo "
Hey, $loggedInUser->companyname. This is an example secure page designed to demonstrate some of the basic features of UserSpice. Just so you know, your title at the moment is $loggedInUser->title, and that can be changed in the admin panel. You registered this account on " . date("M d, Y", $stamp) . ".
";
?>
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
