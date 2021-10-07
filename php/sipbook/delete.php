<?php
include ("include/dbconnect.php");
include ("include/format.inc.php");
?>
	<meta HTTP-EQUIV="REFRESH" content="4;url=<?php echo getIndexPhp() ?>">
	<title>Delete</title>
<?php
include ("include/header.inc.php");
?>
	<h1>名刺の削除</h1>
<?
  if(! $read_only)
  {
		$sql="SELECT * FROM $base_from_where AND ".$part_sql;
		$result = mysqli_query($db,$sql);
		$resultsnumber = mysqli_num_rows($result);

  	if(! deleteAddresses($part_sql)) {
		?>
  		<br /><div class='msgbox'>Invalid record, sorry but the record no longer exsists<br /><i>return to <a href='<?php echo getIndexPhp() ?>'>home page</a></i></div>
		<?
  	} else {
		?>
  		<br /><div class='msgbox'><i>名刺が削除されました<a href='<?php echo getIndexPhp() ?>'>戻る</a></i></div>
		<?
  	}
	} else {
	?>
    <br /><div class='msgbox'>削除権限がありません</div>
	<?
	}
	include ("include/footer.inc.php");
?>
