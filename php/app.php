<?php
include('../../data/room/db_connect.php');
require_once('models/constants.php');
require_once("models/class.user.php");

function generateRandomString($length = 8) {
	$number = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$numberLength = strlen($number);
	$randomNumber = '';
	for ($i = 0; $i < $length; $i++) {
		$randomNumber .= $number[rand(0, $numberLength - 1)];
	}
	return $randomNumber;
}

class room_app
{
	public $mysqli;
	public $loggedInUser;
	private $E;

	function __construct($login = '') {
		global $db_host, $db_user, $db_pass, $db_name;

		session_start();

		ini_set("default_charset", "UTF-8");
		ini_set("mbstring.http_output", "UTF-8");
		ini_set("mbstring.internal_encoding", "UTF-8");

		mb_language("Japanese");
		mb_internal_encoding("UTF-8");
		mb_detect_order("ASCII,UTF-8,EUC-JP,JIS,SJIS");

		date_default_timezone_set('Asia/Tokyo');

		$this->E = error_reporting();
		if (($this->E & E_DEPRECATED) == E_DEPRECATED) {
			error_reporting($this->E ^ E_DEPRECATED);
		}
		if (($this->E & E_WARNING) == E_WARNING) {
			error_reporting($this->E ^ E_WARNING);
		}

		openlog("RoomLog",  LOG_CONS|LOG_PERROR|LOG_PID, LOG_USER);

		$this->mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
		if ($this->mysqli->connect_errno) {
			syslog(LOG_ERR, __FILE__.'('.__LINE__."): Could not connect to " . $db_name . "(" . mysqli_error() . ")");
			die("Could not connect to " . $db_name);
		}

		if (isset($_SESSION["userCakeUser"])) {
			$this->loggedInUser = $_SESSION["userCakeUser"];
			if (empty($this->loggedInUser->hash)) {
				unset($this->loggedInUser);
			}
		}
		if (!empty($login)) {
			$this->createLoginUser($login);
		} else if (!isset($this->loggedInUser)) {
			if (!isset($_COOKIE['room_access_key'])) {
				return;
			} else {
				$session = $_COOKIE['room_access_key'];
			}
			$this->createLoginUser($session);
		} else {
			if (!isset($this->loggedInUser->is_admin))
				$this->loggedInUser->is_admin = FALSE;
			if (!isset($this->loggedInUser->is_master))
				$this->loggedInUser->is_master = FALSE;
			if (!isset($this->loggedInUser))
				$this->loggedInUser->is_guest = FALSE;
			if (!isset($this->loggedInUser->email))
				$this->loggedInUser->email = '';
			if (!isset($this->loggedInUser->user_id))
				$this->loggedInUser->user_id = '';
			if (!isset($this->loggedInUser->group_id))
				$this->loggedInUser->group_id = 2;
			if (!isset($this->loggedInUser->company_id))
				$this->loggedInUser->company_id = 2;
			if (!isset($this->loggedInUser->hash_pw))
				$this->loggedInUser->hash_pw = '';
			if (!isset($this->loggedInUser->displayname))
				$this->loggedInUser->displayname = '';
			if (!isset($this->loggedInUser->firstname))
				$this->loggedInUser->firstname = '';
			if (!isset($this->loggedInUser->lastname))
				$this->loggedInUser->lastname = '';
			if (!isset($this->loggedInUser->groupname))
				$this->loggedInUser->groupname = '';
			if (!isset($this->loggedInUser->companyname))
				$this->loggedInUser->companyname = '';
			if (!isset($this->loggedInUser->companyaddr))
				$this->loggedInUser->companyaddr = '';
			if (!isset($this->loggedInUser->privateroom))
				$this->loggedInUser->privateroom = '';
			if (!isset($this->loggedInUser->accessIp))
				$this->loggedInUser->accessIp = '';
			if (!isset($this->loggedInUser->jobTitle))
				$this->loggedInUser->jobTitle = '';
			if (!isset($this->loggedInUser->hostkey))
				$this->loggedInUser->hostkey = '';
			if (!isset($this->loggedInUser->dateformat))
				$this->loggedInUser->dateformat = 'yyyy/mm/dd';
			if (!isset($this->loggedInUser->jsformat))
				$this->loggedInUser->jsformat = 'yy/mm/dd';
			if (!isset($this->loggedInUser->phpformat))
				$this->loggedInUser->phpformat = 'Y/m/d';
			if (!isset($this->loggedInUser->hash))
				$this->loggedInUser->hash = '';
		}
		$this->addIPaddress();
	}

	public function convDateFormat($dateformat, &$php_format, &$js_format) {
		switch ($dateformat) {
		case 'mm/dd/yyyy':
			$js_format = 'mm/dd/yy';
			$php_format = 'm/d/Y';
			break;
		case 'mm/dd/yy':
			$js_format = 'mm/dd/y';
			$php_format = 'm/d/y';
			break;
		case 'm/d/yyyy':
			$js_format = 'm/d/yy';
			$php_format = 'n/j/Y';
			break;
		case 'yyyy-mm-dd':
			$js_format = 'yy-mm-dd';
			$php_format = 'Y-m-d';
			break;
		case 'yy-mm-dd':
			$js_format = 'y-mm-dd';
			$php_format = 'y-m-d';
			break;
		case 'yyyy/mm/dd':
			$js_format = 'yy/mm/dd';
			$php_format = 'Y/m/d';
			break;
		case 'yy/mm/dd':
			$js_format = 'y/mm/dd';
			$php_format = 'y/m/d';
			break;
		case 'yyyy/m/d':
			$js_format = 'yy/m/d';
			$php_format = 'Y/n/j';
			break;
		case 'yy/m/d':
			$js_format = 'y/m/d';
			$php_format = 'y/n/j';
			break;
		case 'yyyy.mm.dd':
			$js_format = 'yy.mm.dd';
			$php_format = 'Y.m.d';
			break;
		case 'yy.mm.dd':
			$js_format = 'y.mm.dd';
			$php_format = 'y.m.d';
			break;
		case 'dd/mm/yyyy':
			$js_format = 'dd/mm/yy';
			$php_format = 'd/m/Y';
			break;
		case 'dd/mm/yy':
			$js_format = 'dd/mm/y';
			$php_format = 'd/m/y';
			break;
		case 'dd.mm.yyyy':
			$js_format = 'dd.mm.yy';
			$php_format = 'd.m.Y';
			break;
		case 'dd.mm.yy':
			$js_format = 'dd.mm.y';
			$php_format = 'd.m.y';
			break;
		case 'd.m.yy':
			$js_format = 'd.m.y';
			$php_format = 'j.n.y';
			break;
		case 'dd-mm-yyyy':
			$js_format = 'dd-mm-yy';
			$php_format = 'd-m-Y';
			break;
		case 'yyyy/dd/mm':
			$js_format = 'yy/dd/mm';
			$php_format = 'Y/d/m';
			break;
		default:
			$js_format = 'yy/mm/dd';
			$php_format = 'Y/m/d';
		}
	}

	function createLoginUser($session)
	{
		global $db_host, $db_user, $db_pass, $db_name;

		$sql =
			" select T1.n_user as n_user".
			",T1.n_group as n_group".
			",T1.c_login as c_login".
			",T1.c_pass as c_pass".
			",T1.b_admin as b_admin".
			",T1.b_guest as b_guest".
			",T1.c_first_name as c_first_name".
			",T1.c_last_name as c_last_name".
			",T1.c_disp_name as c_disp_name".
			",T1.c_meeting as c_meeting".
			",T1.c_date_format as c_date_format".
			",T1.c_access_ip as c_access_ip".
			",T1.c_job_title as c_job_title".
			",T1.c_host_key as c_host_key".
			",T2.c_name as c_group".
			",T2.n_company as n_company".
			",T3.c_name as c_company".
			",T3.c_address as c_address".
			" from ht_user T1".
			",ht_group T2".
			",ht_company T3".
			" where T3.n_company = T2.n_company".
			" and (T3.b_delete = 0 or T3.b_delete is null)".
			" and T2.n_group = T1.n_group".
			" and T1.c_access_key = '".$session."'";
		$query_result = $this->mysqli->query($sql);
		if ($query_result) {
			$row = $query_result->fetch_array();
			if ($row) {
				$dateformat = $row["c_date_format"];
				$this->convDateFormat($dateformat, $php_format, $js_format);
				$this->loggedInUser = new loggedInUser();
				$this->loggedInUser->is_admin = (intval($row['b_admin'])>0);
				$this->loggedInUser->is_master = ($row['n_user']==UID_ADMIN && intval($row['n_group'])==GID_ADMIN);
				$this->loggedInUser->is_guest = (intval($row['b_guest'])>0);
				$this->loggedInUser->email = $row["c_login"];
				$this->loggedInUser->user_id = $row['n_user'];
				$this->loggedInUser->group_id = $row['n_group'];
				$this->loggedInUser->company_id = $row['n_company'];
				$this->loggedInUser->hash_pw = $row["c_pass"];
				$this->loggedInUser->displayname = $row["c_disp_name"];
				$this->loggedInUser->firstname = $row["c_first_name"];
				$this->loggedInUser->lastname = $row["c_last_name"];
				$this->loggedInUser->groupname = $row["c_group"];
				$this->loggedInUser->companyname = $row["c_company"];
				$this->loggedInUser->companyaddr = $row["c_address"];
				$this->loggedInUser->privateroom = $row["c_meeting"];
				$this->loggedInUser->accessIp = $row["c_access_ip"];
				$this->loggedInUser->jobTitle = $row["c_job_title"];
				$this->loggedInUser->hostkey = $row["c_host_key"];
				$this->loggedInUser->dateformat = $dateformat;
				$this->loggedInUser->jsformat = $js_format;
				$this->loggedInUser->phpformat = $php_format;
				$this->loggedInUser->hash = $session;
				$_SESSION["userCakeUser"] = $this->loggedInUser;
				setcookie("_zm_date_format", $js_format);
			} else {
				syslog(LOG_ERR, __FILE__.'('.__LINE__."): session not found");
				$query_result->close();
				return;
			}
			$query_result->close();

			$this->mysqli->begin_transaction();
			$sql = "update ht_user set c_access_ip = '".$_SERVER["REMOTE_ADDR"]."' where n_user = ".$this->loggedInUser->user_id;
			$query_result = $this->mysqli->query($sql);
			if ($query_result) {
				$this->mysqli->commit();
			} else {
				syslog(LOG_ERR, __FILE__.'('.__LINE__."): Query failed (" . $this->mysqli->error . ")");
				$this->mysqli->rollback();
			}
		} else {
			syslog(LOG_ERR, __FILE__.'('.__LINE__."): Query failed (" . $this->mysqli->error . ")");
		}
	}

	function addIPaddress() {
		$stmt = $this->mysqli->prepare("SELECT count(*) from ht_user where c_access_ip = ?");
		if (!$stmt) {
			syslog(LOG_ERR, __FILE__.'('.__LINE__."): Query failed (" . $app->mysqli->error . ")");
			die();
		}
		$stmt->bind_param('s', $_SERVER["REMOTE_ADDR"]);
		$stmt->execute();
		$stmt->bind_result($count);
		if ($stmt->fetch() && intval($count) == 0) {
			$return = exec('/home/janus/bin/php_ufw.sh '.$_SERVER["REMOTE_ADDR"], $output, $return_var);
		}
		$stmt->close();
	}

	function __destruct() {
		if ($this->mysqli) {
			$this->mysqli->close();
		}
		closelog();
		error_reporting($this->E);
	}
}
?>
