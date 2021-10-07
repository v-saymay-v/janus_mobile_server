<?php
include("construct.php");
include("htmlhead.php");

if (!CheckLoggedIn()) {
?>
<script type="text/javascript">
location.href = 'login.php';
</script>
<?
  return;
}
?>
<style type="text/css">
<!--
  body {
    background:none;
  }
  #container {
    margin:0 2px 0;width:700px;
  }
  @media only screen and (max-device-width: 480px) {
    #container {margin:0 2px 0;width:99%;}
  }
  .odd {background:#e5e5e5;}
  .even {background:#f3f3f3;}
-->
</style>
</head>
<body>
  <div id="container"><div>
<?php
$print = 1;
$smart_phone = 1;
include("../include/view.w.php");

function trimAll($r) {
  $res = array();
  foreach($r as $key => $val) {
  	$res[$key] = trim($val);
  }
  return $res;
}

$sortby = $_SESSION['sortby'];
$sortdir = $_SESSION['sortdir'];
$searchstring = $_SESSION['searchstring'];

include("buildsql.php");

$result = mysqli_query($db, $sql);
if (!$result) {
	error_log(mysqli_error($db));
}

$cnt = 0;
$addr_per_line  = 3;
?>
<table id="view">
<?
while ($r = mysqli_fetch_array($result)) {
  $r = trimAll($r);
  if (($cnt % (2*$addr_per_line)) == 0) {
?>
  <tr class="odd">
<?
  } else if (($cnt % (2*$addr_per_line)) == $addr_per_line) {
?>
  <tr class="even">
<?
  }
?>
    <td valign="top">
<?
  showOneEntry($r, false);
?>
    </td>
<?
  $cnt++;
  if (($cnt % $addr_per_line) == 0) {
?>
  </tr>
<?
  }
}
if (($cnt % $addr_per_line) != 0) {
  while (($cnt % $addr_per_line) != 0) {
?>
    <td></td>
<?
    $cnt++;
  }
?>
  </tr>
<?
}
?>
</table>

</body>
</html>
