<?
$sql = " select SQL_CALC_FOUND_ROWS".
			" T1.n_card as id,".
			" date_format(T1.d_create,'%Y.%m.%d') as created,".
			" aes_decrypt(T1.c_frontimage,'$dbkey') as photo,".
      " aes_decrypt(T1.c_backimage,'$dbkey') as back,".
			" aes_decrypt(T1.c_fullname,'$dbkey') as fullname,".
			" aes_decrypt(T1.c_fullyomi,'$dbkey') as fullyomi,".
			" aes_decrypt(T1.c_organization,'$dbkey') as company,".
			" aes_decrypt(T1.c_orgyomi,'$dbkey') as compyomi,".
			" aes_decrypt(T1.c_title,'$dbkey') as title,".
			" aes_decrypt(T1.c_division,'$dbkey') as division,".
			" aes_decrypt(T1.c_bizphone,'$dbkey') as work,".
			" aes_decrypt(T1.c_faxphone,'$dbkey') as fax,".
			" aes_decrypt(T1.c_celphone,'$dbkey') as mobile,".
			" aes_decrypt(T1.c_mail,'$dbkey') as email,".
      " aes_decrypt(T1.c_url,'$dbkey') as homepage,".
			" aes_decrypt(T1.c_twitter,'$dbkey') as twitter,".
			" aes_decrypt(T1.c_facebook,'$dbkey') as facebook,".
			" aes_decrypt(T1.c_line,'$dbkey') as line,".
			" aes_decrypt(T1.c_firstname,'$dbkey') as firstname,".
			" aes_decrypt(T1.c_firstyomi,'$dbkey') as firstyomi,".
			" aes_decrypt(T1.c_middlename,'$dbkey') as middlename,".
			" aes_decrypt(T1.c_middleyomi,'$dbkey') as middleyomi,".
			" aes_decrypt(T1.c_lastname,'$dbkey') as lastname,".
			" aes_decrypt(T1.c_lastyomi,'$dbkey') as lastyomi,".
			" aes_decrypt(T1.c_fulladdr,'$dbkey') as address,".
			" aes_decrypt(T1.c_memo,'$dbkey') as notes,".
      " T1.n_bday as bday,".
      " T1.c_bmonth as bmonth_num,".
      " T1.c_byear as byear".
			" from bt_cards T1,bt_users T2";

if ($settings['show_others']['value'] == 'true') {
	$sql .= " where T1.n_user = T2.n_user and T2.n_company = $comp_id and T1.b_mine = 0 and T1.b_removed = 0";
} else {
  $sql .= " where (T1.n_user = $user_id or (T1.n_user = $admin_id and T1.n_user = T2.n_user and T2.n_company = $comp_id)) and T1.b_mine = 0 and T1.b_removed = 0";
}

$searchwords = explode(" ", $searchstring);
if (!empty($searchstring) && count($searchwords) > 0) {
	$idx = 0;
	$having = ' HAVING (';
	foreach($searchwords as $searchword) {
		if (!empty($searchword)) {
			if ($idx > 0) {
				$having .= " OR ";
			}
			$having .= "lastname  LIKE '%$searchword%'".
									" OR lastyomi   LIKE '%$searchword%'".
									" OR middlename LIKE '%$searchword%'".
									" OR middleyomi LIKE '%$searchword%'".
									" OR firstname  LIKE '%$searchword%'".
									" OR firstyomi  LIKE '%$searchword%'".
									" OR fullname   LIKE '%$searchword%'".
									" OR fullyomi   LIKE '%$searchword%'".
									" OR company    LIKE '%$searchword%'".
									" OR compyomi   LIKE '%$searchword%'".
									" OR address    LIKE '%$searchword%'".
									" OR ".likePhone('work',   $searchword).
									" OR ".likePhone('mobile', $searchword).
									" OR ".likePhone('fax',    $searchword).
									" OR email      LIKE '%$searchword%'".
									" OR notes      LIKE '%$searchword%'";
			++$idx;
		}
	}
	$having .= ')';
	$sql .= $having;
}

if (strtolower($sortdir) != "asc" && strtolower($sortdir) != "desc") {
	$sortdir = "asc";
}
switch ($sortby) {
	case "bycompany":
		$sql .= " ORDER BY compyomi " . $sortdir;
		break;
	case "bydate":
		$sql .= " ORDER BY created " . $sortdir;
		break;
	default:
		$sql .= " ORDER BY fullyomi ".$sortdir.",lastyomi ".$sortdir.",firstyomi ".$sortdir;
}
?>
