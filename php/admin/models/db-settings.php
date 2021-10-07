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


include(dirname(__FILE__).DIRECTORY_SEPARATOR.".."
                         .DIRECTORY_SEPARATOR.".."
                         .DIRECTORY_SEPARATOR.".."
                         .DIRECTORY_SEPARATOR.".."
                         .DIRECTORY_SEPARATOR."data"
                         .DIRECTORY_SEPARATOR."room"
                         .DIRECTORY_SEPARATOR."db_connect.php");

$db_table_prefix = "ht_";

GLOBAL $errors;
GLOBAL $successes;

$errors = array();
$successes = array();

/* Create a new mysqli object with database connection parameters */
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
GLOBAL $mysqli;

if(mysqli_connect_errno()) {
	die("Connection Failed: " . mysqli_connect_errno());
}

?>
