<?php

require_once "translations.inc.php";
include "phone.intl_prefixes.php";
include "birthday.class.php";

function getIfSetFromAddr($addr_array, $key) {

	if(isset($addr_array[$key])) {
	  $result = $addr_array[$key];
	} else {
		$result = "";
	}
	return $result;
}

function trimAll($r) {
  $res = array();
  foreach($r as $key => $val) {
  	$res[$key] = trim($val);
  }
  return $res;
}

function echoIfSet($addr_array, $key) {
	echo getIfSetFromAddr($addr_array, $key);
}

function deleteAddresses($part_sql) {

  global $db, $keep_history, $domain_id, $base_from_where, $table, $table_grp_adr, $table_groups;

  $sql = "SELECT * FROM $base_from_where AND ".$part_sql;
  $result = mysqli_query($db, $sql);
  $resultsnumber = mysqli_num_rows($result);

  $is_valid = $resultsnumber > 0;

  if($is_valid) {
		$sql = "UPDATE $table SET b_removed = 1 WHERE ".$part_sql;
		mysqli_query($db, $sql);
  	if($keep_history) {
  	} else {
			$sql = "UPDATE c_histories SET b_removed = 1 WHERE ".$part_sql;
			mysqli_query($db, $sql);
    }
  }

  return $is_valid;
}

function saveAddress($addr_array) {

	global $db, $dbkey, $domain_id, $table, $table_grp_adr, $table_groups, $month_lookup, $base_from_where;

	$sql = "INSERT INTO ".$table." (`n_user`,`c_identity`,`c_name`,`c_kana`,`c_memo`,`c_photo`,`d_create`,`b_video`) values (".
		"'".getIfSetFromAddr($addr_array, 'user_id')."'".
		",'".getIfSetFromAddr($addr_array, 'number')."'".
		",'".getIfSetFromAddr($addr_array, 'fullname')."'".
		",'".getIfSetFromAddr($addr_array, 'fullyomi')."'".
		",'".getIfSetFromAddr($addr_array, 'notes')."'".
		",'".getIfSetFromAddr($addr_array, 'photo_imgstr')."'".
		",now(),0)";

  $result = mysqli_query($db, $sql);
  if(mysqli_errno($db) > 0) {
    echo "MySQL: ".mysqli_errno($db).": ".mysqli_error($db);
		error_log("MySQL: ".mysqli_errno($db).": ".mysqli_error($db));
  }

	if (mysqli_affected_rows($db) > 0) {
		$id = mysqli_insert_id($db);
	  return $id;
	} else {
		return false;
	}
}

function updateAddress($addr, $keep_photo = true, $keep_back = true) {

  global $db, $dbkey, $keep_history, $domain_id, $base_from_where, $table, $table_grp_adr, $table_groups, $only_phone;

	$addresses = Addresses::withID($addr['id']);
	$resultsnumber = $addresses->count();

	$homepage = str_replace('http://', '', $addr['homepage']);

	$is_valid = $resultsnumber > 0;

	if($is_valid) {
		if($keep_history) {
			$colomns = array();
			$res = mysqli_query($db, "desc bt_cards");
			while ($row = mysqli_fetch_array($res)) {
				$colomns[] = $row['Field'];
			}
			mysqli_free_result($res);

			$sql = "insert into bt_histories (n_card,n_version) values (".$addr['id'].",".$addr['version'].")";
			$result = mysqli_query($db, $sql);

			foreach ($colomns as $column) {
				if ($column != "n_card" && $column != "n_version") {
					$sql = "update bt_histories T1,bt_cards T2 set T1.".$column."=T2.".$column."where T2.n_card = T1.n_card amd T1.n_card = ".$addr['id'];
					$result = mysqli_query($db, $sql);
				}
			}
		}
		$sql = "UPDATE $table SET n_user = '".$addr['user_id']."'".
						(isset($addr['fullname'])?",c_fullname = '".$addr['fullname']."'":"")
						(isset($addr['fullyomi'])?",c_fullyomi = '".$addr['fullyomi']."'":"").
						",c_number = '".$addr['number']."'".
						",c_memo = '".$addr['notes']."'".
						",c_authority = '".$addr['authority']."'".
						(isset($addr['photo'])?",c_photo = ".($keep_photo ? ("'".$addr['photo']."'"):"null"):"").
						" WHERE n_book = '".$addr['id']."'";
	  $result = mysqli_query($db, $sql);
		if(mysqli_errno($db) > 0) {
			error_log(mysqli_errno($db).": ".mysqli_error($db));
	  }
  }

	return $is_valid;
}

$phone_delims = array("'", '/', "-", " ", "(", ")", ".");

class Address {

  private $address; // mother of all data

  private $phones;
  private $emails;

  function __construct($data) {
  	$this->address = $data;
  }

  public function getData() {
      return $this->address;
  }

  //
  // Phone order home->mobile->work->phone2
  //
  public function getPhones() {

    $phones = array();
  	if($this->address["number"] != "") $phones[] = $this->address["number"];
 	  return $phones;
 	}

  public function hasPhone() {
    return !empty($this->phones);
 	}

  public function firstPhone() {
    return (!empty($this->phones) ? $this->phones[0] : "");
  }

  public function getPhoto() {
  	return ($this->address["photo"] != "" ? '<img alt="Embedded Image" src="'.$b64.'" alt="写真" /><br>' : "");
	}

	public function getFullName() {
		return $this->address['fullname'];
	}

	public function getFullYomi() {
		return $this->address['fullyomi'];
	}

	public function getNumber() {
		return $this->address['number'];
	}

	public function getUserId() {
		return $this->address['user_id'];
	}
}

class Addresses {

  private $result;
	private $page = 1;
	private $maxrowcnt;
	public static $pagesize = 20;

  function likePhone($row, $searchword) {

    global $db, $phone_delims;

    $replace = $row;
  	$like    = "'$searchword'";
   	foreach($phone_delims as $phone_delim) {
  	  $replace = "replace(".$replace.", '".mysqli_real_escape_string($db, $phone_delim)."','')";
  	  $like    = "replace(".$like.   ", '".mysqli_real_escape_string($db, $phone_delim)."','')";
   	}
   	return $replace." LIKE CONCAT('%',".$like.",'%')";
  }

  protected function loadBy($load_type, $searchstring, /*$alphabet = "",*/ $page = 0, $pagesize, $sortby = "byname", $sortdir = "asc") {

    global $db, $base_select, $base_from_where, $table;

		$this->page = $page;
    $sql = "SELECT SQL_CALC_FOUND_ROWS $base_select FROM $base_from_where";

    $searchwords = explode(" ", $searchstring);
		if (!empty($searchstring) && count($searchwords) > 0) {
			$idx = 0;
			$sql .= ' HAVING (';
			foreach($searchwords as $searchword) {
				if (!empty($searchword)) {
					if ($idx > 0) {
						$sql .= " OR";
					}
					$sql .= " fullname   LIKE '%$searchword%'".
									" OR fullyomi   LIKE '%$searchword%'".
									" OR ".likePhone('c_identity', $searchword).
									" OR notes      LIKE '%$searchword%'";
					++$idx;
				}
			}
			$sql .= ')';
		}

		if (strtolower($sortdir) != "asc" && strtolower($sortdir) != "desc") {
			$sortdir = "asc";
		}
		switch ($sortby) {
			case "bydate":
				$sql .= " ORDER BY created " . $sortdir;
				break;
			default:
				$sql .= " ORDER BY fullyomi ".$sortdir;
		}

    // Paging
    if($pagesize > 0 && $load_type != 'id') {
      $sql .= " LIMIT ".($this->page-1)*$pagesize.",".$pagesize;
    }

    $this->result = mysqli_query($db, $sql);
		if (!$this->result) {
			error_log(mysqli_error());
		}

		$res = mysqli_query($db, "select found_rows()");
		$row = mysqli_fetch_array($res);
		if($row) {
			$this->maxrowcnt = $row[0];
		}
		mysqli_free_result($res);
  }

	public function getMaxRowCount() {
		return $this->maxrowcnt;
	}

  public static function withSearchString($searchstring, /*$alphabet = "",*/ $page = 0, $pagesize = 20, $sortby = "byname", $sortdir = "asc") {
  	$instance = new self();
  	$instance->loadBy('', $searchstring, /*$alphabet,*/ $page, $pagesize, $sortby, $sortdir);
  	return $instance;
  }

  public static function withID( $id, $page = 0, $sortby = "byname", $sortdir = "asc" ) {
  	$instance = new self();
  	$instance->loadBy('id', $id, $page, $sortby, $sortdir );
  	return $instance;
  }

  public function nextAddress() {

  	$myrow = mysqli_fetch_array($this->result);
  	if($myrow) {
	      return new Address(trimAll($myrow));
	  } else {
	      return false;
	  }
  }

  public function getResults() {
  	return $this->result;
  }

  public function count() {
  	return mysqli_num_rows($this->getResults());
  }
}
?>
