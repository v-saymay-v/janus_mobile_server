<?php

include ("include/dbconnect.php");

if ($id) {

   $sql = "SELECT $base_select FROM $month_from_where AND $table.n_card=$id";
   $result = mysqli_query($db,$sql);
   if(mysqli_errno($db) > 0) {
     error_log("MySQL: ".mysqli_errno($db).": ".mysqli_error($db));
   }
   $links  = mysqli_fetch_array($result);

   require "include/export.vcard.php";

   header2vcard($links);
   echo address2vcard($links);

} else {

	echo "You need to select an ID number of a data entry";

}
?>
