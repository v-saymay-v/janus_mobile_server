<?php
/*
 * Core file for library and parameter handling:
 *
 * - $LastChangedDate$
 * - $Rev$
 */

include("config/config.php");

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

if (!isset($_SERVER)) $_SERVER = array();
if (!isset($_SERVER['SERVER_NAME'])) $_SERVER['SERVER_NAME'] = 'www.yourcompany.com';

if(!isset($dbuser_read)) $dbuser_read = $dbuser;
if(!isset($dbpass_read)) $dbpass_read = $dbpass;

if($read_only) {
  $dbuser = $dbuser_read;
  $dbpass = $dbpass_read;
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

$get_vars = array( 'id' );

foreach($get_vars as $get_var) {
  if(isset($_GET[$get_var])) {
    ${$get_var} = intval($_GET[$get_var]);
  } elseif(isset($_POST[$get_var])) {
    ${$get_var} = intval($_POST[$get_var]);
  } else {
    ${$get_var} = null;
  }
}

// Copy only used variables into global space.
$get_vars = array( 'searchstring', 'alphabet', 'group', 'resultnumber'
                 , 'submit', 'update', 'delete', 'part'
                 , 'new', 'add', 'remove', 'edit', 'del_format' );

foreach($get_vars as $get_var) {
  if(isset($_GET[$get_var])) {
    ${$get_var} = mysqli_real_escape_string($db, $_GET[$get_var]);
  } elseif(isset($_POST[$get_var])) {
    ${$get_var} = mysqli_real_escape_string($db, $_POST[$get_var]);
  } else {
    ${$get_var} = null;
  }
}

//
// Setup the default columns displayed
//
if(!isset($disp_cols)) {
  $disp_cols
    = array( "select"
           , "lastname"
           , "firstname"
           , "email"
           , "telephone"
           , "edit"
           , "details" );
}

//
// Define the tablenames,
// if not defined in "config.php"
//
if(!isset($table))        $table        = "ht_sipbook";
if(!isset($month_lookup)) $month_lookup = "";   //"bm_month_lookup";
if(!isset($placetable))   $placetable   = "";   //"bm_places";

// (optional) group function
//if(!isset($table_groups))  $table_groups  = "group_list";
//if(!isset($table_grp_adr)) $table_grp_adr = "address_in_groups";
if(!isset($table_groups))  $table_groups  = "";
if(!isset($table_grp_adr)) $table_grp_adr = "";

// (optional) user from database
if(!isset($usertable)) $usertable         = "ht_user";

// the domain
if(!isset($domain_id)) $domain_id  = 0;

// keep a history instead of deleting and updating
if(!isset($keep_history)) $keep_history = true;

// the default color
if(!isset($skin_color)) $skin_color = "blue";

// the table prefix
if(!isset($table_prefix))  $table_prefix  = "";

// Show link to "group-edit" menu
if(!isset($public_group_edit)) $public_group_edit = true;

// Define default homepage guessing
if(!isset($homepage_guess)) $homepage_guess  = true;

// Define quick address adding
if(!isset($quickadd)) $quickadd  = false;

// Define default map guessing
if(!isset($map_guess)) $map_guess  = true;

// Use images for e-mail addresses
if(!isset($mail_as_image)) $mail_as_image  = false;

// Use images for e-mail addresses
if(!isset($mail_accept)) $mail_accept = array();

// Define default ajax mode
if(!isset($use_ajax)) $use_ajax  = true;

// Define default (empty) map key
if(!isset($google_maps_keys)) {
  $key = $_SERVER['SERVER_NAME'];
  $google_maps_keys = array();
  //$google_maps_keys[$key] = "AIzaSyDjuUwcDbioG5pNDPFXTTnfUlsmGdtB6ek";
  $google_maps_keys[$key] = "";
}

// Enable "use_sso" mode, if keys are availabe
$use_sso = (isset($sso_facebook_id) && $sso_facebook_id != "")
        || (isset($sso_google_id)   && $sso_google_id   != "")
        || (isset($sso_yahoo_id)    && $sso_yahoo_id    != "")
        || (isset($sso_hotmail_id)  && $sso_hotmail_id  != "")
        || (isset($sso_twitter_id)  && $sso_twitter_id  != "");

// Enable "doodle" mode, if keys are availabe
$use_doodle = isset($doodle['key']) && isset($doodle['secret']);

// Define default ZIP handling
if(isset($plz_pattern)) $zip_pattern  = $plz_pattern;
if(!isset($zip_pattern)) $zip_pattern = "";

// Define default image location (same server)
if(!isset($url_images)) $url_images = "";

// Define default language behavoir
if(!isset($lang)) $lang  = 'choose';

// Define default UNO-languages
if(!isset($default_languages)) $default_languages = "ar,de,fr,it,th,ru";

// Split the default (displayed) languages
if(isset($default_languages)) {
	$default_languages = explode(",", $default_languages);
}

//
// --- Set default values to parameters, if need
//
if(!isset($page_ext))
  $page_ext = ".php";
$page_ext_qry = $page_ext."?";

if(!isset($read_only))
  $read_only = false;
$read_only = $read_only || isset($_GET["readonly"]);

$group_name = '';
if(isset($group)) {
  $group_name   = $group;
}

$is_fix_group = false;
if(isset($nogroups)) {
  $is_fix_group = $nogroups;
} else {
  $is_fix_group = isset($_GET["fixgroup"]);
}

// Remember the current group
if(!$is_fix_group and $group_name)
{
  $page_ext_qry = "$page_ext?group=$group_name&amp;";
  $page_ext     = "$page_ext?group=$group_name";
}

include("prefs.inc.php");
include("translations.inc.php");
include("mailer.inc.php");
if(!$db) {
	include "include/install.php";
}
mysqli_select_db($db, "$dbname");
//
// Setup the UTF-8 parameters:
// * http://www.phpforum.de/forum/showthread.php?t=217877#PHP
//
// header('Content-type: text/html; charset=utf-8');
mysqli_query($db, "set character set utf8;");
mysqli_query($db, "SET NAMES `utf8`");

// Bug: #139 - Strict mode problem
mysqli_query($db,"SET SQL_MODE = 'STRICT_TRANS_TABLES';");
mysqli_query($db,"SET SQL_MODE = 'MYSQL40';");

include("login.inc.php");
include("version.inc.php");

// Apply the table prefix, if available
$table         = $table_prefix.$table;
$month_lookup  = $table_prefix.$month_lookup;
$table_groups  = $table_prefix.$table_groups;
$table_grp_adr = $table_prefix.$table_grp_adr;
$usertable     = $table_prefix.$usertable;
$placetable    = $table_prefix.$placetable;

function getPhotoB64($photo) {
	$b64 = explode(";", $photo);
	if (count($b64) == 1) {
		$b64 = str_replace(" ", "", $b64[0]);
		return $b64;
	} else if (count($b64) >= 3) {
		$b64 = $b64[2];
		$b64 = explode(":", $b64);
		if (count($b64) >= 2) {
			$b64 = str_replace(" ", "", $b64[1]);
			return $b64;
		}
	}
	return null;
}

function getIndexPhp() {
  $page = 1;
  $start = 0;
  $sortby = '';
  $sortdir = '';
  $searchstring = '';
  if (isset($_SESSION)) {
    if(isset($_SESSION['page'])) $page = $_SESSION['page'];
    if(isset($_SESSION['start'])) $start = $_SESSION['start'];
    if(isset($_SESSION['sortby'])) $sortby = $_SESSION['sortby'];
    if(isset($_SESSION['sortdir'])) $sortdir = $_SESSION['sortdir'];
    if(isset($_SESSION['searchstring'])) $searchstring = $_SESSION['searchstring'];
  }
  return "index.php?sortby=".$sortby."&sortdir=".$sortdir."&searchstring=".$searchstring."&start=".$start."&page=".$page;
}

$res = mysqli_query($db, "SELECT id, name, value FROM ht_configuration");
while ($row = mysqli_fetch_array($res)) {
  $name = $row['name'];
	$settings[$name] = array('id' => $row['id'], 'name' => $row['name'], 'value' => $row['value']);
}
mysqli_free_result($res);

$login = AuthLoginFactory::getBestLogin();

if (!isset($required_roles)) {
  $required_roles = array();
}

if (!$login->hasRoles($required_roles)) {
	include ("include/format.inc.php");
	//echo "<title>".ucfmsg("ADDRESS_BOOK")."</title>";
  include ("login.php");
  die;
} else {
  // Get domain
  $user = $login->getUser();
  if (!$user->getActive()) {
    include ("include/format.inc.php");
  	//echo "<title>".ucfmsg("ADDRESS_BOOK")."</title>";
    include ("login.php");
    //include "include/notactive.inc.html";
    die;
  }
  $username = $user->getLogin();
  $fullname = $user->getName();
  $companyname  = $user->getCompany();
  $compdivision = $user->getDivision();
  $domain_id = $user->getDomain();
  $user_id = $user->getId();
  $user_photo = $user->getPhoto();

  // Check "read only" of user
  $read_only = $read_only || $user->hasRole("readonly");

  $sql = "SELECT T1.n_user as admin from ht_user T1 where T1.b_admin!=0 and T1.n_company='$domain_id'";
  $res = mysqli_query($db, $sql);
  $row = mysqli_fetch_array($res);
  $admin_id = $row["admin"];
  mysqli_free_result($res);

  // Check "forced group"
  if($user->getGroup() != "") {
  	$is_fix_group = true;
  	$group        = $user->getGroup();
  	$group_name   = $user->getGroup();
  };
}

if(isset($domain) && isset($domain[$domain_id]) && isset($domain[$domain_id]['skin'])) {
  $skin_color = $domain[$domain_id]['skin'];
}

// To run the script on systeme with "register_globals" disabled,
// import all variables in a bit secured way: Remove HTML Tags.
foreach($_REQUEST as $key => $value)
{
	// Allow all tags in headers and footers
	if(in_array($key, array('domain_id', 'read_only'))) {

	// Security-Fix: ignore this fields!!

	} elseif(in_array($key, array('group_header','group_footer'))) {
		${$key} = $value;

	// Handle arrays
	} elseif(is_array($value)) {
		foreach($value as $entry)
		{
			${$key}[] = strip_tags($entry);
		}
	} else {
  	// ${$key} = htmlspecialchars($value); --chatelao-20071121, doesn't work with Chinese Characters
  	${$key} = strip_tags($value);
  }

  // TBD: prevent SQL-Injection
}

//
// ------------------- Group query handling ------------------------
//

if($table_groups != '') {
  $select_groups = "SELECT groups.*
         	               , parent_groups.group_name  parent_name
         	               , parent_groups.group_id    parent_id
         	            FROM $table_groups AS groups
                 LEFT JOIN $table_groups AS parent_groups
                        ON groups.group_parent_id = parent_groups.group_id
                     WHERE groups.domain_id = $domain_id";

  // Create "n-level" non-locking recursion
  $max_level = 3;

  $sql_from  = "";
  $sql_where = "";

  for($i = 0; $i < $max_level; $i++)
  {
  	if($i > 0) {
      $sql_from  .= "     , ";
  		$sql_where .= " OR ";
  	}
   	$sql_from  .= "$table_groups g$i";
  	$sql_where .= "( ";

    for($j = 0; $j < $max_level; $j++)
    {
    	if($j > 0) {
    		$sql_where .= "\n  AND ";
    	}
    	if($j >= $i) {
  			$sql_where .= "g$j.group_name = '$group_name'";
  		} else {
  			$sql_where .= "g$j.group_parent_id = g".($j+1).".group_id";
  		}
    }
  	$sql_where .= ")\n";
  }
}
// echo nl2br("select * from ".$sql_from." WHERE ".$sql_where."\n");

// Assemble the statements
//$base_where = "$table.domain_id = $domain_id ";
$base_where = "$table.n_user = $user_id and $usertable.b_delete = 0 ";

//$base_where .= "AND $table.deprecated is null ";
$base_select = " $table.n_book as id,".
               " $table.n_user as user_id,".
               " $table.c_name as fullname,".
               " $table.c_kana as fullyomi,".
               " $table.c_identity as number,".
               " $table.c_photo as photo,".
               " $table.c_memo as notes,".
               " date_format($table.d_create,'%Y.%m.%d') as created";
$base_from  = "$table, $usertable";

$base_from_where  = "$base_from WHERE $base_where ";
$month_from_where = "$base_from WHERE $base_where ";

include("address.class.php");
?>
