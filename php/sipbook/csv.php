<?php

  //
  // Excel export module
  // - Support ".csv" with Unicode-Characters.
  //
  // The working encoding concept was found on:
  // - http://forum.de.selfhtml.org/archiv/2007/6/t154117/
  //

  include ("include/dbconnect.php");

  // Check if we can produce the Unicode-Excel.
  $use_utf_16LE = function_exists('mb_convert_encoding');

  function add($value, $first = false) {

  	global $use_utf_16LE;

  	// Remove whitespaces, Replace newlines and escape ["] character
  	$res = trim($value);
  	$res = str_replace("\r", "", $res);
  	$res = str_replace("\n", ", ", $res);
  	$res = str_replace('"', '""',  $res);

  	// Add to result
  	if($use_utf_16LE) {
      //$res = ($first ? "" : "\t" ) . '"'.$res.'"';
      $res = ($first ? "" : "," ) . '"'.$res.'"';
      //print mb_convert_encoding( $res, 'UTF-16LE', 'UTF-8');
      print $res;

    } else { // Fallback to ISO-8859-1
      $res = ($first ? "" : ";" ) . '"'.$res.'"';
      print utf8_decode($res);
    }

  }

	//$sql = "SELECT $table.*, b_month_lookup.bmonth_num FROM $month_from_where ORDER BY lastname, firstname ASC";
  $sql = "SELECT $base_select, $month_lookup.bmonth_num as bmonth_num FROM $month_from_where ORDER BY lastname, firstname ASC";
/*
	echo $sql;
SELECT addr_addressbook.*, b_month_lookup .bmonth_num, amonth_num amonth_num FROM addr_addressbook LEFT OUTER JOIN addr_month_lookup
                                   b_month_lookup ON addr_addressbook.bmonth = b_month_lookup.bmonth
                                LEFT OUTER JOIN (SELECT bmonth AS amonth, bmonth_short AS amonth_short, bmonth_num AS amonth_num FROM addr_month_lookup) AS
                                   a_month_lookup ON addr_addressbook.amonth = a_month_lookup.amonth
                          WHERE addr_addressbook.domain_id = 0 AND addr_addressbook.deprecated is null   ORDER BY lastname, firstname ASC
*/

	$result = mysqli_query($db,$sql);
	$resultsnumber = mysqli_num_rows($result);

  // Header("Content-Type: application/vnd.ms-excel; charset=UTF-8");
  Header("Content-Type: application/vnd.ms-excel");
  Header("Content-disposition: attachement; filename=export-".date("Ymd").($group_name != "" ? "-".$group_name : "").".csv");
  Header("Content-Transfer-Encoding: 8bit");

  //if($use_utf_16LE)
 	//  print chr(255).chr(254);

	# Name + Geburtstag
	add(ucfmsg("LASTNAME"), true);
  add(ucfmsg("LASTNAME")."??????");
	add(ucfmsg("FIRSTNAME"));
  add(ucfmsg("FIRSTNAME")."??????");
	add(ucfmsg("BIRTHDAY"));

  add(ucfmsg("COMPANY"));
  add(ucfmsg("COMPANY")."??????");
  add(ucfmsg("DEPT"));
  add(ucfmsg("TITLES"));

  add(ucfmsg("ZIP"));
  add("????????????");
  add(ucfmsg("CITY"));
	add(ucfmsg("ADDRESS"));

  # Work contact
  add(ucfmsg("E_MAIL_OFFICE"));
  add(ucfmsg("PHONE_WORK"));
  add(ucfmsg("FAX"));
  add(ucfmsg("PHONE_MOBILE"));

	//add(ucfmsg("PHONE_HOME"));
	//add(ucfmsg("E_MAIL_HOME"));

	# 2nd contact
	//add(ucfmsg("2ND_ADDRESS"));
	//add(ucfmsg("2ND_PHONE"));

  if($use_utf_16LE)
  	//print mb_convert_encoding( "\r\n", 'UTF-16LE', 'UTF-8');
    print "\n";
  else
	  echo "\r\n";

	while ($myrow = mysqli_fetch_array($result))
	{

		# Name + Geburtstag
		add($myrow["lastname"], true);
    add($myrow["lastyomi"]);
		add($myrow["firstname"]);
    add($myrow["firstyomi"]);

		$day    = $myrow["bday"];
		$year   = $myrow["byear"];
    if(false) // verbose month
    {
		  // $month  = $myrow["bmonth"];
		  add( ($day > 0 ? "$day. ":"").($month != null ? $month : "")." $year");
    } else {
		  $month  = $myrow["bmonth_num"];
		  add( "$year".($month != null ? "$month." : "").($day > 0 ? "$day.":""));
    }

    add($myrow["company"]);
    add($myrow["compyomi"]);
    add($myrow["division"]);
    add($myrow["title"]);

		# Home contact
		if($zip_pattern != "")
		{
		  $address = "";
		  $zip     = "";
		  $city    = "";
			preg_match( "/(.*)(\b".$zip_pattern."\b)(.*)/m"
                                  , str_replace("\r", "", str_replace("\n", ", ", trim($myrow["address"]))), $matches);
		  if(count($matches) > 1)
			  $address = preg_replace("/,$/", "", trim($matches[1]));
		  if(count($matches) > 2)
			  $zip = $matches[2];
		  if(count($matches) > 3)
			  $city = preg_replace("/^,/", "", trim($matches[3]));

		  add($address);
		  add($zip);
		  add($city);
		}
		else
    {
      add($myrow["zip"]);
      add($myrow["prefecture"]);
		  add($myrow["city"]);
      add($myrow["number"]);
    }

		# Privat contact
		//add($myrow["home"]);
    //add("");
    add($myrow["email"]);
    add($myrow["work"]);
    add($myrow["fax"]);
		add($myrow["mobile"]);

		# Work contact
		//add($myrow["email2"]);
    //add("");

		# 2nd contact
		//add($myrow["address2"]);
		//add($myrow["phone2"]);
    //add("");
		//add("");

    if($use_utf_16LE)
    	//print mb_convert_encoding( "\r\n", 'UTF-16LE', 'UTF-8');
      print "\n";
    else
      echo "\r\n";
	}

?>
