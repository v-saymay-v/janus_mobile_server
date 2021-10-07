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

//Functions that do not interact with DB
//------------------------------------------------------------------------------
include_once('constants.php');

//Retrieve a list of all .php files in models/languages
function getLanguageFiles()
{
	$directory = "models/languages/";
	$languages = glob($directory . "*.php");
	//print each file name
	return $languages;
}

//Retrieve a list of all .css files
function getTemplateFiles()
{
	$directory = "css/";
	$languages = glob($directory . "*.css");
	//print each file name
	return $languages;
}

//Retrieve a list of all .php files in root files folder
function getPageFiles()
{
	$directory = "";
	$pages = glob($directory . "*.php");
	//print each file name
	foreach ($pages as $page){
		$row[$page] = $page;
	}
	return $row;
}

//Generate a unique code
function getUniqueCode($length = "")
{
	$code = md5(uniqid(rand(), true));
	if ($length != "") return substr($code, 0, $length);
	else return $code;
}

//Generate an activation key
function generateActivationToken($mysqli,$gen = null)
{
	do
	{
		$gen = md5(uniqid(mt_rand(), false));
	}
	while(validateActivationToken($mysqli,$gen));
	return $gen;
}

//@ Thanks to - http://phpsec.org
function generateHash($plainText, $salt = null)
{
	if ($salt === null)
	{
		$salt = substr(md5(uniqid(rand(), true)), 0, 25);
	}
	else
	{
		$salt = substr($salt, 0, 25);
	}

	return $salt . sha1($salt . $plainText);
}

function generateRandomNumber($length = 11) {
	$number = '1234567890';
	$numberLength = strlen($number);
	$randomNumber = '';
	for ($i = 0; $i < $length; $i++) {
		$randomNumber .= $number[rand(0, $numberLength - 1)];
	}
	return $randomNumber;
}

//Checks if an email is valid
function isValidEmail($email)
{
	if (filter_var($email, FILTER_VALIDATE_EMAIL) == false) {
		return false;
	}
	else {
		return true;
	}
}

function isValidMeetingId($meeting)
{
	/*
	for ($i = 0; $i < strlen($meeting); ++$i)
	{
		$c = substr($i, 1);
		$options = array(
		    'options' => array(
		        'default' => false, // フィルタが失敗した場合に返す値
		        // その他のオプションをここに書きます
		        'min_range' => 0,
						'max_range' => 9
		    )
		);
		if (!filter_var($c, FILTER_VALIDATE_INT, $options)) {
			return false;
		}
	}
	*/
	if (!filter_var($meeting, FILTER_VALIDATE_INT)) {
		return false;
	}
	return true;
}

//Inputs language strings from selected language.
function lang($key,$markers = NULL)
{
	global $lang;
	if($markers == NULL)
	{
		$str = $lang[$key];
	}
	else
	{
		//Replace any dyamic markers
		$str = $lang[$key];
		$iteration = 1;
		foreach($markers as $marker)
		{
			$str = str_replace("%m".$iteration."%",$marker,$str);
			$iteration++;
		}
	}
	//Ensure we have something to return
	if($str == "")
	{
		return ("No language key found: ".$key);
	}
	else
	{
		return $str;
	}
}

//Checks if a string is within a min and max length
function minMaxRange($min, $max, $what)
{
	if(strlen(trim($what)) < $min)
		return true;
	else if(strlen(trim($what)) > $max)
		return true;
	else
	return false;
}

//Replaces hooks with specified text
function replaceDefaultHook($str)
{
	global $default_hooks,$default_replace;
	return (str_replace($default_hooks,$default_replace,$str));
}

//Displays error and success messages
function resultBlock($errors,$successes){
	//Error block
	if(count($errors) > 0)
	{
		echo "<div id='error'>
		<a href='#' onclick=\"showHide('error');\">[X]</a>
		<ul>";
		foreach($errors as $error)
		{
			echo "<li>".$error."</li>";
		}
		echo "</ul>";
		echo "</div>";
	}
	//Success block
	if(count($successes) > 0)
	{
		echo "<div id='success'>
		<a href='#' onclick=\"showHide('success');\">[X]</a>
		<ul>";
		foreach($successes as $success)
		{
			echo "<li>".$success."</li>";
		}
		echo "</ul>";
		echo "</div>";
	}
}

//Completely sanitizes text
function sanitize($str)
{
	return strtolower(strip_tags(trim(($str))));
}

function beginTransact() {
	global $mysqli;
	if (!$mysqli->begin_transaction()) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
	}
}

function rollbackTransact() {
	global $mysqli;
	if (!$mysqli->rollback()) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
	}
}

function commitTransact() {
	global $mysqli;
	if(!$stmt = $mysqli->commit()) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
	}
}

//Functions that interact mainly with .users table
//------------------------------------------------------------------------------

function createUser($company_id) {
	global $mysqli,$db_table_prefix,$emailActivation;

	$meeting = generateRandomNumber();
	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."user (b_admin,b_active,d_create,b_delete,c_meeting) values (0, ?, now(), 0, ?)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$active = $emailActivation?0:1;
	$stmt->bind_param("is", $active, $meeting);
	$stmt->execute();
	$userId = $mysqli->insert_id;
	$stmt->close();

	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."meeting (n_host, c_meeting, b_private) values (?, ?, 1)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("is", $userId, $meeting);
	$stmt->execute();
	$stmt->close();

	$userdetails = array('id' => $userId, 'company_id' => $company_id, 'user_name' => '', 'display_name' => '',
               'password' => '', 'email' => '', 'division' => '', 'meeting' => $meeting,
               'activation_token' => '', 'last_activation_request' => null,
               'lost_password_request' => 0, 'active' => $emailActivation?0:1, 'date_format' => 'yyyy/mm/dd',
               'sign_up_stamp' => 0, 'last_sign_in_stamp' => 0);
	return $userdetails;
}

function createDepart($company_id) {
	global $mysqli,$db_table_prefix,$emailActivation;
	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."group
		(n_company,d_create) values (?,now())");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $company_id);
	$stmt->execute();
	$userId = $mysqli->insert_id;
	$stmt->close();

	$userdetails = array('id' => $userId, 'name' => '', 'yomi' => '');
	return $userdetails;
}

//Delete a defined array of users
function deleteUsers($users) {
	global $mysqli,$db_table_prefix;

	$i = 0;
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user SET b_delete = 1 WHERE n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	foreach($users as $id){
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$i++;
	}
	$stmt->close();

	return $i;
}

//Delete a defined array of users
function deleteDeparts($users) {
	global $mysqli,$db_table_prefix;

	$i = 0;
	$stmt = $mysqli->prepare("DELETE FROM ".$db_table_prefix."group
		WHERE n_group = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt2 = $mysqli->prepare("DELETE FROM ".$db_table_prefix."group_user
		WHERE n_group = ?");
	if (!$stmt2) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	foreach($users as $id){
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt2->bind_param("i", $id);
		$stmt2->execute();
		$i++;
	}
	$stmt->close();
	$stmt2->close();
	return $i;
}

//Check if a display name exists in the DB
function displayNameExists($displayname)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT b_active
		FROM ".$db_table_prefix."user
		WHERE
		display_name = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $displayname);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Check if an email exists in the DB
function emailExists($mysqli,$email)
{
	global $db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("SELECT b_active
		FROM ".$db_table_prefix."user T1
		WHERE T1.c_login = ? LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Check if a user name and email belong to the same user
function emailUsernameLinked($email,$username)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT b_active
		FROM ".$db_table_prefix."user
		WHERE user_name = ?
		AND email = ?
		LIMIT 1
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("ss", $username, $email);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Retrieve information for all users
function fetchAllUsers()
{
	global $mysqli,$db_table_prefix,$db_key;
	$loggedInUser = $_SESSION["userCakeUser"];
	$stmt = $mysqli->prepare("SELECT
		T1.n_user as id,
		T2.n_company as company,
		T1.c_login as user_name,
		T1.c_disp_name as display_name,
		T1.c_pass as password,
		T1.c_login as email,
		T1.n_group as division,
		T1.c_meeting as meeting,
		T1.c_access_key as activation_token,
		T1.b_active as active,
		T1.c_last_activation_request as activation_request,
		T1.b_lost_password_request as password_request,
		T1.c_date_format as date_format,
		unix_timestamp(T1.d_create) as sign_up_stamp,
		unix_timestamp(T1.d_signin) as last_sign_in_stamp
		FROM ".$db_table_prefix."user T1
		,".$db_table_prefix."group T2
		WHERE (T1.b_admin = 0 or T1.b_admin is null)
		AND (T1.b_delete = 0 or T1.b_delete is null)
		AND T1.n_group = T2.n_group
		AND T2.n_company = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("i", $loggedInUser->company_id);
	if ($stmt->execute()) {
		$stmt->bind_result($id, $company, $user, $display, $password, $email, $division, $meeting, $token, $active, $activation_request, $password_request, $date_format, $signUp, $signIn);

		$row = array();
		while ($stmt->fetch()){
			$row[] = array('id' => $id, 'company_id' => $company, 'user_name' => $user, 'display_name' => $display,
										'password' => $password, 'email' => $email, 'division' => $division, 'meeting' => $meeting,
										'activation_token' => $token, 'active' => $active,	'last_activation_request' => $activation_request,
										'lost_password_request' => $password_request, 'date_format' => $date_format, 'sign_up_stamp' => $signUp,
										'last_sign_in_stamp' => $signIn);
		}
		$stmt->close();
		return ($row);
	}
	syslog(LOG_ERR, __LINE__.":".$mysqli->error);
	return array();
}

function recursive_list_menu ( $data, $id )
{
  foreach ( $data as $values ) {
    $label = $values['label'];
    $query = $values['query'];
    $child = $values['child'];
		if ( $query == $id ) {
			return $values['parent'];
		}
    if ( !empty( $child ) ) {
      $parent = recursive_list_menu( $child, $id );
			if ($parent != 0) {
				return $parent;
			}
    }
  }
	return 0;
}

function getFullGroup($data, $id)
{
	$html = "";
	$refid = recursive_list_menu ( $data, $id );
	while (array_key_exists( $refid, $data )) {
		$values = $data[$refid];
		$html = $values['label'].'/'.$html;
		$refid = $values['parent'];
		if (intval($refid) == 0) {
			break;
		}
	}
	return $html;
}

function getMyPlace($myid)
{
	global $mysqli,$db_table_prefix,$db_key;

	$rs = $mysqli->query( 'SELECT n_group,c_name,n_parent FROM ht_group WHERE b_delete = 0 and b_admin = 0' );
	if(!$rs) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}

	$rows = array();
	while ($row = mysqli_fetch_array( $rs )) {
		$rows[] = $row;
	}
	mysqli_free_result($rs);

	$i = 0;
	while ($i < count($rows)) {
	//while( $row = $rows[$i] ) {
		$row = $rows[$i];
	  $mapped[$row['n_group']] = array( 'label' => $row['c_name'], 'query' => $row['n_group'], 'parent' => $row['n_parent'], 'child' => array() );
	  $source[$row['n_parent']] = $row['n_group'];
	  $i ++;
	}
	krsort( $source );
	foreach ( $source as $pid => $id ) {
	  if ( $pid && array_key_exists( $pid, $mapped ) ) {
	    $values =  $mapped[$id];
	    unset( $mapped[$id] );
	    $mapped[$pid]['child'][] = $values;
	  }
	}

	return getFullGroup( $mapped, $myid );
/*
	$sql = "SELECT
		T1.n_parent as parent,
		T2.c_name as name
		FROM ".$db_table_prefix."group T1,".$db_table_prefix."group T2
		WHERE T2.n_group = T1.n_parent
		AND T1.n_group = ".$id;
	$query_result = $mysqli->query($sql);
	if ($query_result) {
		$row = $query_result->fetch_array();
		$parent = $row['parent'];
		$name = $row['name'];
		$tree = $name . (empty($tree)?"":"/") . $tree;
		if ($parent == 0) {
			$query_result->close();
			return $tree;
		}
		getMyPlace($parent, $tree);
	} else {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
*/
}

//Retrieve information for all users
function fetchAllDeparts()
{
	global $mysqli,$db_table_prefix,$db_key;

	if (!isset($_SESSION["userCakeUser"])) {
		syslog(LOG_ERR, __LINE__.": not logged in");
		return false;
	}
	$loggedInUser = $_SESSION["userCakeUser"];

	$rs = $mysqli->query( 'SELECT n_group,c_name,n_parent FROM ht_group WHERE b_delete = 0 and b_admin = 0' );
	if(!$rs) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}

	$rows = array();
	while ($row = mysqli_fetch_array( $rs )) {
		$rows[] = $row;
	}
	mysqli_free_result($rs);

	$i = 0;
	while ($i < count($rows)) {
	//while( $row = $rows[$i] ) {
		$row = $rows[$i];
	  $mapped[$row['n_group']] = array( 'label' => $row['c_name'], 'query' => $row['n_group'], 'parent' => $row['n_parent'], 'child' => array() );
	  $source[$row['n_parent']] = $row['n_group'];
	  $i ++;
	}
	krsort( $source );
	foreach ( $source as $pid => $id ) {
	  if ( $pid && array_key_exists( $pid, $mapped ) ) {
	    $values =  $mapped[$id];
	    unset( $mapped[$id] );
	    $mapped[$pid]['child'][] = $values;
	  }
	}

	$stmt = $mysqli->prepare("SELECT
		n_group as id,
		c_name as name
		FROM ".$db_table_prefix."group
		WHERE n_company = ?
		AND b_admin = 0
		AND b_delete = 0");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $loggedInUser->company_id);
	$stmt->execute();
	$stmt->bind_result($id, $name);

	$row = array();
	while ($stmt->fetch()) {
		$tree = getFullGroup( $mapped, $id );
		$row[] = array('id' => $id, 'name' => $name, 'tree' => $tree);
	}
	$stmt->close();
	return ($row);
}

//Retrieve complete user information by username, token or ID
function fetchUserDetails($mysqli, $company=NULL, $username=NULL, $token=NULL, $id=NULL)
{
	global $db_table_prefix,$db_key;
	if ($company!=NULL) {
		$column = "T1.b_admin = 1 AND T3.c_name = ".$company;
	}
	else if ($username!=NULL) {
		$column = "T1.c_login = ".$username;
	}
	else if ($token!=NULL) {
		$column = "T1.c_access_key = ".$token;
	}
	else if ($id!=NULL) {
		$column = "T1.n_user = ".$id;
	}
	$stmt = $mysqli->prepare("SELECT
		T1.n_user as id,
		T3.n_company as compid,
		T1.c_login as user_name,
		T1.c_disp_name as display_name,
		T1.c_pass as password,
		T1.c_login as email,
		T1.n_group as division,
		T1.c_meeting as meeting,
		T1.c_access_key as activation_token,
		T1.b_active as active,
	  T1.c_last_activation_request as activation_request,
	  T1.b_lost_password_request as password_request,
		T1.c_date_format as date_format,
		unix_timestamp(T1.d_create) as sign_up_stamp,
		unix_timestamp(T1.d_signin) as last_sign_in_stamp
		FROM ".$db_table_prefix."user T1,".$db_table_prefix."group T2,".$db_table_prefix."company T3
		WHERE ".$column."
		AND T3.n_company = T2.n_company
		and T1.n_group = T2.n_group
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$row = array();
	$stmt->execute();
	$stmt->bind_result($id, $compid, $user, $display, $password, $email, $division, $meeting, $token, $active, $active_request, $password_request, $date_format, $signUp, $signIn);
	while ($stmt->fetch()) {
		if (empty($meeting)) {
			$meeting = generateRandomNumber();
		}
		$row = array('id' => $id, 'company_id' => $compid, 'user_name' => $user, 'display_name' => $display,
								'password' => $password, 'email' => $email, 'division' => $division, 'meeting' => $meeting,
								'activation_token' => $token, 'last_activation_request' => $active_request, 'lost_password_request' => $password_request,
								'active' => $active, 'date_format' => $date_format, 'sign_up_stamp' => $signUp, 'last_sign_in_stamp' => $signIn);
	}
	$stmt->close();
	return ($row);
}

function fetchDepartDetails($id)
{
	global $mysqli,$db_table_prefix,$db_key;
	$stmt = $mysqli->prepare("SELECT
		n_group as id,
		c_name as name,
		n_parent as parent
		FROM ".$db_table_prefix."group
		WHERE n_group = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("i", $id);

	$stmt->execute();
	$stmt->bind_result($did, $name, $parent);
	while ($stmt->fetch()) {
		$tree = getMyPlace($did);
		$row = array('id' => $did, 'name' => $name, 'parent' => $parent, 'tree' => $tree);
	}
	$stmt->close();
	return ($row);
}

//Toggle if lost password request flag on or off
function flagLostPasswordRequest($username,$value)
{
	global $mysqli,$db_table_prefix;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
		SET lost_password_request = ?
		WHERE c_login = ? LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("ss", $value, $username);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Check if a user is logged in
function isUserLoggedIn()
{
	global $loggedInUser,$mysqli,$db_table_prefix,$db_key;

	if($loggedInUser == NULL)
	{
		return false;
	}

	$stmt = $mysqli->prepare("SELECT T1.n_user,T1.c_pass FROM ht_user T1 WHERE T1.n_user = ? AND T1.c_pass = ? LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("is", $loggedInUser->user_id, $loggedInUser->hash_pw);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		if(isset($_SESSION["userCakeUser"]))
		{
			$_SESSION["userCakeUser"] = NULL;
			unset($_SESSION["userCakeUser"]);
		}
		return false;
	}
}

//Change a user from inactive to active
function setUserActive($token)
{
	global $mysqli,$db_table_prefix;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
		SET b_active = 1
		WHERE c_activation_token = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("s", $token);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

function setUserActiveById($userId)
{
	global $mysqli,$db_table_prefix;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
		SET b_active = 1
		WHERE n_user = ? LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("i", $userId);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Change a user's display name
function updateDisplayName($id, $display)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1
		SET T1.c_disp_name = ?
		WHERE T1.n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $display, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

function updateDepartName($id, $name)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."group
		SET c_name = ?
		WHERE n_group = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $name, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

/*
function updateDepartYomi($id, $yomi)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."departs
		SET
		c_yomi = aes_encrypt(?,'$db_key')
		WHERE n_depart = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("si", $yomi, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}
*/

function updateDepartParent($id, $parent)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."group
		SET n_parent = ?
		WHERE n_group = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("ii", $parent, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Update a user's email
function updateEmail($id, $email)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1
		SET T1.c_login = ?
		WHERE T1.n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $email, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

function updateMeetingId($id, $meeting)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1
		SET T1.c_meeting = ?
		WHERE T1.n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $meeting, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Input new activation token, and update the time of the most recent activation request
function updateLastActivationRequest($mysqli,$new_activation_token,$email,$newEmail=NULL)
{
	global $db_table_prefix;

	if ($newEmail == NULL) {
		$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
			SET c_activation_token = ?,
			c_last_activation_request = ?
			WHERE c_login = ?");
		if (!$stmt) {
			syslog(LOG_ERR, __LINE__.":".$mysqli->error);
			return false;
		}
		$time = time().'';
		$stmt->bind_param("sss", $new_activation_token, $time, $email);
	} else {
		$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
			SET c_activation_token = ?,
			c_last_activation_request = ?,
			c_update_mail = ?
			WHERE c_login = ?");
		if (!$stmt) {
			syslog(LOG_ERR, __LINE__.":".$mysqli->error);
			return false;
		}
		$time = time().'';
		$stmt->bind_param("ssss", $new_activation_token, $time, $newEmail, $email);
	}
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Generate a random password, and new token
function updatePasswordFromToken($pass,$token)
{
	global $mysqli,$db_table_prefix;

	$new_activation_token = generateActivationToken($mysqli);
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
		SET c_pass = password(?),
		c_activation_token = ?
		WHERE	c_activation_token = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("sss", $pass, $new_activation_token, $token);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

function updatePassword($userId, $pass)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
		SET c_pass = password(?)
		WHERE n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $pass, $userId);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Update a user's title
/*
function updateTitle($id, $title)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1
		SET T2.c_title = aes_encrypt(?,'$db_key')
		WHERE T2.n_user = T1.n_user
		AND	T2.b_mine != 0
		AND T1.n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("si", $title, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}
*/

//Update a user's title
function updateDivision($id, $division)
{
	global $mysqli,$db_table_prefix,$db_key;
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1
		SET T1.n_group = ?
		WHERE T1.n_user = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("ii", $division, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Check if a user ID exists in the DB
function userIdExists($id)
{
	global $mysqli,$db_table_prefix;

	$stmt = $mysqli->prepare("SELECT n_group
		FROM ".$db_table_prefix."user
		WHERE n_user = ? LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Check if a user ID exists in the DB
function meetingIdExists($id)
{
	global $mysqli,$db_table_prefix;

	$stmt = $mysqli->prepare("SELECT n_user
		FROM ".$db_table_prefix."user
		WHERE c_meeting = ? LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $id);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function departIdExists($id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT c_name
		FROM ".$db_table_prefix."group
		WHERE
		n_group = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Checks if a username exists in the DB
function usernameExists($username)
{
	global $mysqli,$db_table_prefix,$db_key;
	$sql = "SELECT T1.c_company
		FROM bt_companies T1
		where
		T1.c_company = ?
		LIMIT 1";
	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $username);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Check if activation token exists in DB
function validateActivationToken($mysqli,$token,$lostpass=NULL)
{
	global $db_table_prefix;

	if($lostpass === NULL)
	{
		$stmt = $mysqli->prepare("SELECT b_active,
			c_login
			FROM ".$db_table_prefix."user
			WHERE b_active = 0
			AND c_activation_token = ?
			LIMIT 1");
	}
	else if ($lostpass === true)
	{
		$stmt = $mysqli->prepare("SELECT b_active,
			c_login
			FROM ".$db_table_prefix."user
			WHERE b_active = 1
			AND c_activation_token = ?
			AND b_lost_password_request = 1
			LIMIT 1");
	}
	else
	{
		$needupdate = true;
		$stmt = $mysqli->prepare("SELECT b_active,
			c_login
			FROM ".$db_table_prefix."user
			WHERE b_active = 1
			AND c_activation_token = ?
			LIMIT 1");
	}
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $token);
	$stmt->execute();
	//$stmt->store_result();
	$stmt->bind_result($active, $email);
	$stmt->fetch();
	$stmt->close();

	if (isset($active) && isset($email))
	{
		if (isset($needupdate)) {
			$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user
				set `c_login` = `c_update_mail`,
				`c_access_key` = null,
				`c_access_ip` = null
				where `c_login` = ?");
			$stmt->bind_param("s", $email);
			$stmt->execute();
			$stmt->close();
		}
		return true;
	}
	else
	{
		return false;
	}
}

//Functions that interact mainly with .permissions table
//------------------------------------------------------------------------------

//Create a permission level in DB
function createPermission($permission) {
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."permissions (
		name
		)
		VALUES (
		?
		)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $permission);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Delete a permission level from the DB
function deletePermission($permission) {
	global $mysqli,$db_table_prefix,$errors;
	$i = 0;
	$stmt = $mysqli->prepare("DELETE FROM ".$db_table_prefix."permissions
		WHERE id = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt2 = $mysqli->prepare("DELETE FROM ".$db_table_prefix."user_permission_matches
		WHERE permission_id = ?");
	if (!$stmt2) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt3 = $mysqli->prepare("DELETE FROM ".$db_table_prefix."permission_page_matches
		WHERE permission_id = ?");
	if (!$stmt3) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	foreach($permission as $id){
		if ($id == 1){
			$errors[] = lang("CANNOT_DELETE_NEWUSERS");
		}
		elseif ($id == 2){
			$errors[] = lang("CANNOT_DELETE_ADMIN");
		}
		else{
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$stmt2->bind_param("i", $id);
			$stmt2->execute();
			$stmt3->bind_param("i", $id);
			$stmt3->execute();
			$i++;
		}
	}
	$stmt->close();
	$stmt2->close();
	$stmt3->close();
	return $i;
}

//Retrieve information for all permission levels
function fetchAllPermissions()
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		name
		FROM ".$db_table_prefix."permissions");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->execute();
	$stmt->bind_result($id, $name);
	while ($stmt->fetch()){
		$row[] = array('id' => $id, 'name' => $name);
	}
	$stmt->close();
	return ($row);
}

//Retrieve information for a single permission level
function fetchPermissionDetails($id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		name
		FROM ".$db_table_prefix."permissions
		WHERE
		id = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->bind_result($id, $name);
	while ($stmt->fetch()){
		$row = array('id' => $id, 'name' => $name);
	}
	$stmt->close();
	return ($row);
}

//Check if a permission level ID exists in the DB
function permissionIdExists($id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT id
		FROM ".$db_table_prefix."permissions
		WHERE
		id = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Check if a permission level name exists in the DB
function permissionNameExists($permission)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT id
		FROM ".$db_table_prefix."permissions
		WHERE
		name = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $permission);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Change a permission level's name
function updatePermissionName($id, $name)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."permissions
		SET name = ?
		WHERE
		id = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("si", $name, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Functions that interact mainly with .user_permission_matches table
//------------------------------------------------------------------------------

//Match permission level(s) with user(s)
function addPermission($permission, $user) {
	global $mysqli,$db_table_prefix;
	$i = 0;
	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."user_permission_matches (
		permission_id,
		user_id
		)
		VALUES (
		?,
		?
		)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	if (is_array($permission)){
		foreach($permission as $id){
			$stmt->bind_param("ii", $id, $user);
			$stmt->execute();
			$i++;
		}
	}
	elseif (is_array($user)){
		foreach($user as $id){
			$stmt->bind_param("ii", $permission, $id);
			$stmt->execute();
			$i++;
		}
	}
	else {
		$stmt->bind_param("ii", $permission, $user);
		$stmt->execute();
		$i++;
	}
	$stmt->close();
	return $i;
}

//Retrieve information for all user/permission level matches
function fetchAllMatches()
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		user_id,
		permission_id
		FROM ".$db_table_prefix."user_permission_matches");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->execute();
	$stmt->bind_result($id, $user, $permission);
	while ($stmt->fetch()){
		$row[] = array('id' => $id, 'user_id' => $user, 'permission_id' => $permission);
	}
	$stmt->close();
	return ($row);
}

//Retrieve list of permission levels a user has
function fetchUserPermissions($user_id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		permission_id
		FROM ".$db_table_prefix."user_permission_matches
		WHERE user_id = ?
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $user_id);
	$stmt->execute();
	$stmt->bind_result($id, $permission);
	while ($stmt->fetch()){
		$row[$permission] = array('id' => $id, 'permission_id' => $permission);
	}
	$stmt->close();
	if (isset($row)){
		return ($row);
	}
}

//Retrieve list of users who have a permission level
function fetchPermissionUsers($permission_id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT id, user_id
		FROM ".$db_table_prefix."user_permission_matches
		WHERE permission_id = ?
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $permission_id);
	$stmt->execute();
	$stmt->bind_result($id, $user);
	while ($stmt->fetch()){
		$row[$user] = array('id' => $id, 'user_id' => $user);
	}
	$stmt->close();
	if (isset($row)){
		return ($row);
	}
}

//Unmatch permission level(s) from user(s)
function removePermission($permission, $user) {
	global $mysqli,$db_table_prefix;
	$i = 0;
	$stmt = $mysqli->prepare("DELETE FROM ".$db_table_prefix."user_permission_matches
		WHERE permission_id = ?
		AND user_id =?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	if (is_array($permission)){
		foreach($permission as $id){
			$stmt->bind_param("ii", $id, $user);
			$stmt->execute();
			$i++;
		}
	}
	elseif (is_array($user)){
		foreach($user as $id){
			$stmt->bind_param("ii", $permission, $id);
			$stmt->execute();
			$i++;
		}
	}
	else {
		$stmt->bind_param("ii", $permission, $user);
		$stmt->execute();
		$i++;
	}
	$stmt->close();
	return $i;
}

//Functions that interact mainly with .configuration table
//------------------------------------------------------------------------------

//Update configuration table
function updateConfig($id, $value)
{
	global $mysqli,$db_table_prefix,$db_key;
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."configuration
		SET value = ?
		WHERE id = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	foreach ($id as $cfg){
		if ($cfg == 1) {
			$name = $value[$cfg];
		} else if ($cfg == 2) {
			$url = $value[$cfg];
		} else if ($cfg == 3) {
			$mail = $value[$cfg];
		}
		$stmt->bind_param("si", $value[$cfg], $cfg);
		$stmt->execute();
	}
	$stmt->close();

	if (isset($name)) {
		$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."company T1,".$db_table_prefix."group T2,".$db_table_prefix."user T3
			SET T1.c_name = aes_encrypt('$name','$db_key'),
			WHERE T1.n_company = T2.n_company
			AND T2.n_group = T3.n_group
			AND T3.n_user = ?");
		$stmt->bind_param("i", $loggedInUser->user_id);
		$stmt->execute();
		$stmt->close();
	}
/*
	if (isset($url)) {
		$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."cards T1,".$db_table_prefix."users T2
			SET T1.c_url = aes_encrypt('$url','$db_key'),
			WHERE T1.n_user = T2.n_user
			AND T2.n_user = ?");
		$stmt->bind_param("i", $loggedInUser->user_id);
		$stmt->execute();
		$stmt->close();
	}
*/
	if (isset($mail)) {
		$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1
			SET T1.c_login = ?,
			WHERE T1.n_user = ?");
		$stmt->bind_param("si", $mail, $loggedInUser->user_id);
		$stmt->execute();
		$stmt->close();
	}
}

//Functions that interact mainly with .pages table
//------------------------------------------------------------------------------

//Add a page to the DB
function createPages($pages) {
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."pages (
		page
		)
		VALUES (
		?
		)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	foreach($pages as $page){
		$stmt->bind_param("s", $page);
		$stmt->execute();
	}
	$stmt->close();
}

//Delete a page from the DB
function deletePages($pages) {
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("DELETE FROM ".$db_table_prefix."pages
		WHERE id = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt2 = $mysqli->prepare("DELETE FROM ".$db_table_prefix."permission_page_matches
		WHERE page_id = ?");
	if (!$stmt2) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	foreach($pages as $id){
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt2->bind_param("i", $id);
		$stmt2->execute();
	}
	$stmt->close();
	$stmt2->close();
}

//Fetch information on all pages
function fetchAllPages()
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		page,
		private
		FROM ".$db_table_prefix."pages");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->execute();
	$stmt->bind_result($id, $page, $private);
	while ($stmt->fetch()){
		$row[$page] = array('id' => $id, 'page' => $page, 'private' => $private);
	}
	$stmt->close();
	if (isset($row)){
		return ($row);
	}
}

//Fetch information for a specific page
function fetchPageDetails($id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		page,
		private
		FROM ".$db_table_prefix."pages
		WHERE
		id = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->bind_result($id, $page, $private);
	while ($stmt->fetch()){
		$row = array('id' => $id, 'page' => $page, 'private' => $private);
	}
	$stmt->close();
	return ($row);
}

//Check if a page ID exists
function pageIdExists($id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT private
		FROM ".$db_table_prefix."pages
		WHERE
		id = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Toggle private/public setting of a page
function updatePrivate($id, $private)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."pages
		SET
		private = ?
		WHERE
		id = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("ii", $private, $id);
	$result = $stmt->execute();
	$stmt->close();
	return $result;
}

//Functions that interact mainly with .permission_page_matches table
//------------------------------------------------------------------------------

//Match permission level(s) with page(s)
function addPage($page, $permission) {
	global $mysqli,$db_table_prefix;
	$i = 0;
	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."permission_page_matches (
		permission_id,
		page_id
		)
		VALUES (
		?,
		?
		)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	if (is_array($permission)){
		foreach($permission as $id){
			$stmt->bind_param("ii", $id, $page);
			$stmt->execute();
			$i++;
		}
	}
	elseif (is_array($page)){
		foreach($page as $id){
			$stmt->bind_param("ii", $permission, $id);
			$stmt->execute();
			$i++;
		}
	}
	else {
		$stmt->bind_param("ii", $permission, $page);
		$stmt->execute();
		$i++;
	}
	$stmt->close();
	return $i;
}

//Retrieve list of permission levels that can access a page
function fetchPagePermissions($page_id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		permission_id
		FROM ".$db_table_prefix."permission_page_matches
		WHERE page_id = ?
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $page_id);
	$stmt->execute();
	$stmt->bind_result($id, $permission);
	while ($stmt->fetch()){
		$row[$permission] = array('id' => $id, 'permission_id' => $permission);
	}
	$stmt->close();
	if (isset($row)){
		return ($row);
	}
}

//Retrieve list of pages that a permission level can access
function fetchPermissionPages($permission_id)
{
	global $mysqli,$db_table_prefix;
	$stmt = $mysqli->prepare("SELECT
		id,
		page_id
		FROM ".$db_table_prefix."permission_page_matches
		WHERE permission_id = ?
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $permission_id);
	$stmt->execute();
	$stmt->bind_result($id, $page);
	while ($stmt->fetch()){
		$row[$page] = array('id' => $id, 'permission_id' => $page);
	}
	$stmt->close();
	if (isset($row)){
		return ($row);
	}
}

//Unmatched permission and page
function removePage($page, $permission) {
	global $mysqli,$db_table_prefix;
	$i = 0;
	$stmt = $mysqli->prepare("DELETE FROM ".$db_table_prefix."permission_page_matches
		WHERE page_id = ?
		AND permission_id =?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	if (is_array($page)){
		foreach($page as $id){
			$stmt->bind_param("ii", $id, $permission);
			$stmt->execute();
			$i++;
		}
	}
	elseif (is_array($permission)){
		foreach($permission as $id){
			$stmt->bind_param("ii", $page, $id);
			$stmt->execute();
			$i++;
		}
	}
	else {
		$stmt->bind_param("ii", $permission, $user);
		$stmt->execute();
		$i++;
	}
	$stmt->close();
	return $i;
}

//Check if a user has access to a page
function securePage($uri){

	//Separate document name from uri
	$tokens = explode('/', $uri);
	$page = $tokens[sizeof($tokens)-1];
	global $mysqli,$db_table_prefix,$loggedInUser;
	//retrieve page details
	$stmt = $mysqli->prepare("SELECT
		id,
		page,
		private
		FROM ".$db_table_prefix."pages
		WHERE
		page = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $page);
	$stmt->execute();
	$stmt->bind_result($id, $page, $private);
	while ($stmt->fetch()){
		$pageDetails = array('id' => $id, 'page' => $page, 'private' => $private);
	}
	$stmt->close();
	//If page does not exist in DB, allow access
	if (empty($pageDetails)){
		return true;
	}
	//If page is public, allow access
	elseif ($pageDetails['private'] == 0) {
		return true;
	}
	//If user is not logged in, deny access
	elseif(!isUserLoggedIn())
	{
		syslog(LOG_ERR, "Not logged in funcs.php");
		header("Location: ../index.php");
		return false;
	}
	else {
		//Retrieve list of permission levels with access to page
		$stmt = $mysqli->prepare("SELECT
			permission_id
			FROM ".$db_table_prefix."permission_page_matches
			WHERE page_id = ?
			");
		if (!$stmt) {
			syslog(LOG_ERR, __LINE__.":".$mysqli->error);
			return;
		}
		$stmt->bind_param("i", $pageDetails['id']);
		$stmt->execute();
		$stmt->bind_result($permission);
		while ($stmt->fetch()){
			$pagePermissions[] = $permission;
		}
		$stmt->close();
		//Check if user's permission levels allow access to page
		if ($loggedInUser->checkPermission($pagePermissions)){
			return true;
		}
		//Grant access if master user
		elseif ($loggedInUser->is_admin/*$master_account*/) {
			return true;
		}
		else {
			syslog(LOG_ERR, "Not have permission in funcs.php");
			header("Location: ../index.php");
			return false;
		}
	}
}

//Change a user's display name
function updateCompanyName($id, $company)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."company T1
		SET T1.c_name = ?
		WHERE T1.n_company = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $company, $id);
	$result = $stmt->execute();
	$stmt->close();

	return $result;
}

function updateCompanyMemo($id, $memo)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."company T1
		SET T1.c_memo = ?
		WHERE T1.n_company = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $memo, $id);
	$result = $stmt->execute();
	$stmt->close();

	return $result;
}

function updateAdminLogin($id, $adminlogin)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE "
		.$db_table_prefix."company T3,"
		.$db_table_prefix."group T2,"
		.$db_table_prefix."user T1
		SET T1.c_login= ?
		WHERE T3.n_company = ?
		AND T2.n_company = T3.n_company
		AND T2.b_admin = 1
		AND T1.n_group = T2.n_group
		AND T1.b_admin = 1
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $adminlogin, $id);
	$result = $stmt->execute();
	$stmt->close();

	return $result;
}

function updateAdminName($id, $adminname)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE "
		.$db_table_prefix."company T3,"
		.$db_table_prefix."group T2,"
		.$db_table_prefix."user T1
		SET T1.c_disp_name = ?
		WHERE T3.n_company = ?
		AND T2.n_company = T3.n_company
		AND T2.b_admin = 1
		AND T1.n_group = T2.n_group
		AND T1.b_admin = 1
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $adminlogin, $id);
	$result = $stmt->execute();
	$stmt->close();

	return $result;
}

function updateAdminPass($id, $password)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("UPDATE "
	.$db_table_prefix."company T3,"
	.$db_table_prefix."group T2,"
	.$db_table_prefix."user T1
		SET T1.c_pass = password(?)
		WHERE T3.n_company = ?
		AND T2.n_company = T3.n_company
		AND T2.b_admin = 1
		AND T1.n_group = T2.n_group
		AND T1.b_admin = 1
		");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("si", $password, $id);
	$result = $stmt->execute();
	$stmt->close();

	return $result;
}

function createCompany() {
	global $mysqli,$db_table_prefix,$emailActivation;

	$stmt = $mysqli->prepare("update seq_company set n_seq = last_insert_id(n_seq + 1)");
	$stmt->execute();
	$stmt->close();

	$stmt = $mysqli->prepare("select last_insert_id() from seq_company for update");
	$stmt->execute();
	$stmt->bind_result($seq);
	if (!$stmt->fetch()) {
		$seq = 1;
	}
	$stmt->close();

	$stmt = $mysqli->prepare(
		"INSERT INTO ".$db_table_prefix."company ".
		"(n_company,c_name,c_memo,n_seq,d_create,d_update,d_delete,b_delete,b_admin) ".
		"values ".
		"(null, '', '', ?, now(), null, null, 0, 0)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("i", $seq);
	$stmt->execute();
	$id = $mysqli->insert_id;
	$stmt->close();

	$stmt = $mysqli->prepare(
		"INSERT INTO ".$db_table_prefix."group ".
		"(n_group,n_company,c_name,c_memo,n_parent,n_seq,d_create,d_update,d_delete,b_delete,b_admin) ".
		"values ".
		"(null, ?, '".lang("ADMIN_COMPS_PHP_ADMIN_DEFAULT")."', '', 1, 0, now(), null, null, 0, 1)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$gid = $mysqli->insert_id;
	$stmt->close();

	$stmt = $mysqli->prepare("INSERT INTO seq_group (n_company, n_seq) values (?, 1)");
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->close();

  $randomNumber = generateRandomNumber();

	$stmt = $mysqli->prepare(
		"INSERT INTO ".$db_table_prefix."user".
		"(n_user,n_group,c_first_name,c_last_name,c_disp_name,c_disp_kana,c_gender,c_login,c_pass,c_access_key,c_meeting,c_memo,d_create,d_signin,d_update,d_delete,b_delete,b_admin)".
		" values".
		"(null, ?, '', '', '".lang("ADMIN_COMPS_PHP_ADMIN_DEFAULT")."', '', null, '', '', '', ?, '', now(), null, null, null, 0, 1)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("is", $gid, $randomNumber);
	$stmt->execute();
	$uid = $mysqli->insert_id;
	$stmt->close();

	$stmt = $mysqli->prepare("INSERT INTO ".$db_table_prefix."user_permission_matches (`user_id`,`permission_id`) values (?, 1)");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	$stmt->bind_param("i", $uid);
	$stmt->execute();
	$stmt->close();

	$userdetails = array('id' => $id, 'comp_name' => '', 'memo' => '', 'admin_login' => '', 'admin_pass' => '', 'admin_name' => lang("ADMIN_COMPS_PHP_ADMIN_DEFAULT"), 'last_sign_in_stamp' => 0);
	return $userdetails;
}

//Retrieve information for all companies
function fetchAllCompanies()
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("SELECT
		T1.n_company as id,
		T1.c_name as comp_name,
		T1.c_memo as memo,
		T3.c_login as admin_login,
		T3.c_pass as admin_pass,
		T3.c_disp_name as admin_name,
		T3.d_signin as last_signin
		FROM ".$db_table_prefix."company T1,".$db_table_prefix."group T2,".$db_table_prefix."user T3
		WHERE T1.b_admin = 0
		AND T1.b_delete = 0
		AND T1.n_company = T2.n_company
		AND T2.n_group = T3.n_group
		AND T3.b_admin = 1");
		if (!$stmt) {
			syslog(LOG_ERR, __LINE__.":".$mysqli->error);
			return false;
		}
		$stmt->execute();
		$stmt->bind_result($id, $comp_name, $memo, $admin_login, $admin_pass, $admin_name, $last_signin);

		$row = array();
		while ($stmt->fetch()) {
			$row[] = array('id' => $id, 'comp_name' => $comp_name, 'memo' => $memo, 'admin_login' => $admin_login, 'admin_pass' => $admin_pass, 'admin_name' => $admin_name, 'last_sign_in_stamp' => $last_signin);
		}
		$stmt->close();
		return ($row);
}

function fetchCompanyDetails($id)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("SELECT
		T1.n_company as id,
		T1.c_name as comp_name,
		T1.c_memo as memo,
		T3.c_login as admin_login,
		T3.c_pass as admin_login,
		T3.c_disp_name as admin_name,
		T3.d_signin as last_signin
		FROM ".$db_table_prefix."company T1,".$db_table_prefix."group T2,".$db_table_prefix."user T3
		WHERE T1.n_company = ?
		AND T1.n_company = T2.n_company
		AND T2.n_group = T3.n_group
		AND T3.b_admin = 1");
		if (!$stmt) {
			syslog(LOG_ERR, __LINE__.":".$mysqli->error);
			return false;
		}
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->bind_result($id, $comp_name, $memo, $admin_login, $admin_pass, $admin_name, $last_signin);

		if ($stmt->fetch()) {
			$userdetails = array('id' => $id, 'comp_name' => $comp_name, 'memo' => $memo, 'admin_login' => $admin_login, 'admin_pass' => $admin_pass, 'admin_name' => $admin_name, 'last_sign_in_stamp' => $last_signin);
		} else {
			$userdetails = array('id' => $id, 'comp_name' => '', 'memo' => '', 'admin_login' => '', 'admin_pass' => '', 'admin_name' => lang("ADMIN_COMPS_PHP_ADMIN_DEFAULT"), 'last_sign_in_stamp' => 0);
		}
		$stmt->close();
		return ($userdetails);
}

//Delete a defined array of users
function deleteCompanies($users) {
	global $mysqli,$db_table_prefix;

	$i = 0;
	$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."company
		SET b_delete = 1 WHERE n_company = ?");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return false;
	}
	foreach($users as $id){
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$i++;
	}
	$stmt->close();

	return $i;
}

//Check if a user ID exists in the DB
function companyIdExists($id)
{
	global $mysqli,$db_table_prefix;

	$stmt = $mysqli->prepare("SELECT n_seq
		FROM ".$db_table_prefix."company
		WHERE
		n_company = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//Check if an email exists in the DB
function adminLoginExists($email)
{
	global $mysqli,$db_table_prefix,$db_key;

	$stmt = $mysqli->prepare("SELECT n_user
		FROM ".$db_table_prefix."user T1
		WHERE T1.c_login = ?
		LIMIT 1");
	if (!$stmt) {
		syslog(LOG_ERR, __LINE__.":".$mysqli->error);
		return;
	}
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$stmt->store_result();
	$num_returns = $stmt->num_rows;
	$stmt->close();

	if ($num_returns > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}
?>
