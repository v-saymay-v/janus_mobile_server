<?php
$need_magnific = true;
include ("include/dbconnect.php");
include ("include/format.inc.php");
include ("include/header.inc.php");

function getPhotoTag($photo, $id) {
	return ('<img id="'.$id.'" src="'.!empty($photo)?$photo:"../images/user.png".' alt="写真" />');
}

$id = $_GET["id"];
$sql = "SELECT T2.c_disp_name as owner from ht_sipbook T1,ht_user T2 where T2.n_user=T1.n_user and T1.n_book='$id'";
$result = mysqli_query($db, $sql);
$row = mysqli_fetch_array($result);
$owner = $row["owner"];
mysqli_free_result($result);

$sql = "SELECT $base_select FROM $base_from_where AND $table.n_book=$id";
$result = mysqli_query($db, $sql);
$row = mysqli_fetch_array($result);
$resultsnumber = mysqli_num_rows($result);
if($resultsnumber == 0) {
?>
	<div class "msgbox">連絡先を選択してください</div>
<?php
	mysqli_free_result($result);
	return;
}
$user_id = $row["user_id"];
?>

<script type="text/javascript">
/*
function base64ToBlob(base64) {
	if (!base64) {
		var buffer = new Uint8Array();
		return new Blob([buffer.buffer], {
	     type: 'image/jpeg'
	  });
	}
	var b64 = base64.substring("data:image/jpg;base64,".length);
  var binary = atob(b64);
  var buffer = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return new Blob([buffer.buffer], {
     type: 'image/jpeg'
  });
}
jQuery(document).ready(function() {
	var front = URL.createObjectURL(base64ToBlob(jQuery('#front_image').attr('src')));
	jQuery('#front_link').attr('href', front);
	var back = URL.createObjectURL(base64ToBlob(jQuery('#back_image').attr('src')));
	jQuery('#back_link').attr('href', back);
});
*/
</script>

<aside class="u-mt-70 u-mb-20">
  <div><span class="u-f-bg">所有者</span>　<?php echo $owner ?></div><div><span class="u-f-bg">登録日</span>　<?php echo $row["created"] ?></div>
</aside>

<section class="card_detail_main">
  <div class="left-sc">
    <ul class="modal-gallery">
      <li>
        <div class="left-sc-img01">
          <a id="front_link" href="<?php echo !empty($row["photo"])?$row["photo"]:'../images/user.png' ?>" class="modal-img-card">
						<img id="<?php echo $id ?>" src="<?php echo !empty($row["photo"])?$row["photo"]:'../images/user.png' ?>" alt="写真" />
					</a>
        </div>
      </li>
    </ul>
  </div>
  <div class="right-sc">
    <p><?php echo $row["fullyomi"] ?></p>
    <h1><?php echo $row["fullname"] ?></h1>

    <table class="right-sc-tbl">
      <tr>
        <th><span class="u-f-bg">電話番号</span></th>
        <td><?php echo $row["number"] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">メモ</span></th>
        <td><?php echo $row["notes"] ?></td>
      </tr>
    </table>
		<!--
		<button class="dustbox" type="button" name="dustbox" value="" onclick="location.href='delete<?php echo $page_ext ?>?id=<?php echo $id ?>'"></button>
		-->
		<a class="dustbox popup-modal" name="dustbox" href="#inline-wrap"></a>
  </div>
	<div id="inline-wrap" class="mfp-hide inline-wrap_cls">
		<h1>名刺の削除</h1>
		<div style="margin: 30px; text-align: center">
			<font size="+1"><b><?php echo $row["fullname"] ?></b></font>さんの名刺を削除します
		</div>
		<div class="inline-wrap_btn">
			<p class="popup-modal-dismiss-close"><a href="#">キャンセル</a></p>
			<p class="popup-modal-dismiss-red"><a id="update_photo" href="#" onclick="location.href='delete<?php echo $page_ext ?>?id=<?php echo $id ?>'">削除</a></p>
		</div>
	</div>
</section>

<?php
$divide = explode('@', $row["number"]);
if (count($divide) > 1) {
	$server = '@'.$divide[1];
}
mysqli_free_result($result);
?>

<section class="card_detail_sb">
	<h1>同じサーバーの連絡先</h1>
	<ul class="slide-multi">
		<?php
		if (isset($server)) {
		  $sql = "select T1.n_book as id,T1.c_fullname as name,T1.c_photo as photo from $table T1 where c_identity like '%".$server."' and T1.b_removed = 0";
			$result = mysqli_query($db, $sql);
			if ($result) {
				$resultsnumber = mysqli_num_rows($result);
				$max=(int)($resultsnumber/4*4);
				while ($max % 4 != 0) {
					++$max;
				}
				for ($i = 0; $i < $max; ++$i) {
					if ($i >= $resultsnumber) {
		?>
				<li></li>
		<?php
					} else {
						$row = mysqli_fetch_array($result);
		?>
		<!-- 4つずつ -->
		<li>
			<a href="view<?php echo $page_ext ?>?id=<?php echo $row["id"] ?>">
				<div class="sb_fg"><img class="sb_fg_img" src="<?php echo !empty($row["photo"])?$row["photo"]:'../images/user.png' ?>" alt="写真" /></div>
				<div class="sb_cp ellipsis"><?php echo $row["name"] ?></div>
			</a>
		</li>
		<?php
					}
				}
			}
		}
		?>
	</ul>
</section>

</body>
</html>
