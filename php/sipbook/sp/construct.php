<?
$smart_phone = 1;
include("../config/config.php");
include("../include/translations.inc.php");
include("../include/guess.inc.php");
include("../include/mailer.inc.php");

// Check for any mistakes (Debugging)
error_reporting(E_NOTICE);
// http://www.php.net/ini.core
// * short_open_tag  	"0"
// * register_globals  	"0"

// Increase memory to upload bigger photos
ini_set("memory_limit", "128M");

// Suppress caching, force refresh on every reload.
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

// Activate compression, if disabled in ".htaccess"
if( ini_get('zlib.output_compression') != 1
   && isset($compression_level)
   && $compression_level > 0) {
  ini_set('zlib.output_compression_level', $compression_level);
  ob_start('ob_gzhandler');
}

if(isset($_POST['logout'])) {
  setcookie("uin", "logged-out", 0);
  setcookie("PHPSESSID", "", 0);
  header("Location: index.php");
  return;
}

// --- Connect to DB, retry 5 times ---
for ($i = 0; $i < 5; $i++) {

  $level = error_reporting();
  error_reporting(E_ERROR);
  $db = mysqli_connect("$dbserver", "$dbuser", "$dbpass");
  error_reporting($level);

  $errno = mysqli_errno($db);
  if ($errno == 1040 || $errno == 1226 || $errno == 1203) {
      sleep(1);
  }  else {
      break;
  }
}
mysqli_select_db($db, "$dbname");

$settings = array();
$res = mysqli_query($db, "SELECT id, name, value FROM bt_configuration");
while ($row = mysqli_fetch_array($res)) {
  $name = $row['name'];
	$settings[$name] = array('id' => $row['id'], 'name' => $row['name'], 'value' => $row['value']);
}
mysqli_free_result($res);

foreach($_REQUEST as $key => $value) {
	if (is_array($value)) {
		foreach($value as $entry)	{
			${$key}[] = strip_tags($entry);
		}
	} else {
  	// ${$key} = htmlspecialchars($value); --chatelao-20071121, doesn't work with Chinese Characters
  	${$key} = strip_tags($value);
  }
  // TBD: prevent SQL-Injection
}

$comp_id = 0;
$user_id = 0;
$admin_id = 0;
$username = '';
$fullname = '';
$compname = '';
$compdiv = '';
$comptitle = '';
$selfphoto = '';
$phototype = '';
$selfpriority = '';
$amiactivated = 0;
$user_priority = 'C';

function CheckLoggedIn() {

  global $db, $dbkey, $comp_id, $user_id, $admin_id, $username, $fullname, $compname;
  global $compdiv, $comptitle, $selfphoto, $phototype, $selfpriority, $amiactivated;
  global $user_priority;

  $session = $_COOKIE['uin'];
  if (empty($session)) {
  	return false;
  }

  $sql = "select distinct"
  	." T1.n_company as comp_id"
    .",T1.n_user as user_id"
  	.",aes_decrypt(T2.c_mail,'".$dbkey."') as username"
  	.",aes_decrypt(T2.c_fullname,'".$dbkey."') as fullname"
  	.",aes_decrypt(T2.c_organization,'".$dbkey."') as company"
  	.",aes_decrypt(T2.c_division,'".$dbkey."') as division"
  	.",aes_decrypt(T2.c_title,'".$dbkey."') as title"
  	.",aes_decrypt(T2.c_photo,'".$dbkey."') as photo"
  	.",T2.c_phototype as phototype"
  	.",T2.c_authority as priority"
  	.",T1.b_active as active"
  	." from bt_users T1, bt_cards T2"
  	." where T2.n_user = T1.n_user and T2.b_mine != 0 and T1.b_admin = 0 and T1.c_session = '".$session."'";

  $result = mysqli_query($db,$sql);
  if (!$result) {
    error_log(mysqli_error($db));
    return false;
  }
  $rec = mysqli_fetch_array($result);
  $cnt = mysqli_num_rows($result);

  if ($cnt != 1) {
    mysqli_free_result($result);
  	return false;
  }

  $comp_id = $rec['comp_id'];
  $user_id = $rec['user_id'];
  $username = $rec['username'];
  $fullname = $rec['fullname'];
  $compname = $rec['company'];
  $compdiv = $rec['division'];
  $comptitle = $rec['title'];
  $selfphoto = $rec['photo'];
  $phototype = $rec['phototype'];
  $selfpriority = $rec['priority'];
  $amiactivated = $rec['active'];
  mysqli_free_result($result);

  $sql = "SELECT T1.n_user as admin from bt_users T1 where T1.b_admin!=0 and T1.n_company='$comp_id'";
  $res = mysqli_query($db, $sql);
  $row = mysqli_fetch_array($result);
  $admin_id = $row["admin"];
  mysqli_free_result($result);

  return true;
}

function getIndexPhp() {
  $start = 0;
  $sortby = 'byname';
  $sortdir = 'asc';
  $searchstring = '';
  if (isset($_SESSION)) {
    $start = $_SESSION['startsp'];
    $sortby = $_SESSION['sortbysp'];
    $sortdir = $_SESSION['sortdirsp'];
    $searchstring = $_SESSION['searchstringsp'];
  }
  return "index.php?sortby=".$sortby."&sortdir=".$sortdir."&searchstring=".$searchstring."&start=".$start;
}
?>
