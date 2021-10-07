<?php
$need_bootstrap = true;
include ("include/dbconnect.php");
include ("include/format.inc.php");
include ("include/header.inc.php");

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$file = strrchr($actual_link, '/');
$photo_image = substr($actual_link, 0, strlen($actual_link)-strlen($file)).'/../images/user.png';

$isnewcard = FALSE;
if (!empty($_POST["update"])) {
	$addr = array();
	$addr['user_id']   = isset($_POST["owner"])?$_POST["owner"]:$admin_id;
	$addr['fullname']  = $fullname;
	$addr['fullyomi']  = mb_convert_kana(mb_convert_kana($fullyomi), "c");
	$addr['number']    = $number;
	$addr['notes']     = $notes;
	$addr['photo_imgsrc'] = $photo_imgsrc;
	if (empty($_POST["id"])) {
		$id = saveAddress($addr);
	} else {
		$id = $_POST["id"];
		$addr["id"] = $id;
		updateAddress($addr);
	}
	header("Location: view".$page_ext_qry."id=".$id);
} else {
	$id = $_GET["id"];
	$sql = "SELECT $base_select FROM $base_from_where AND $table.n_book='$id'";
	$result = mysqli_query($db, $sql);
	$row = mysqli_fetch_array($result);
	$resultsnumber = mysqli_num_rows($result);
	if($resultsnumber == 0) {
		$isnewcard = TRUE;
	} else {
		$owner = $row["user_id"];
	}
}
?>

<script>
document.addEventListener("DOMContentLoaded", function() {
	AutoKana.bind("#fullname", "#fullyomi", { katakana: true });
});
</script>

<form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>">
<input type="hidden" name="id" value="<?php echo (isset($id)?$id:'') ?>">
<input type="hidden" name="owner" value="<?php echo $user_id ?>">
<input type="hidden" name="update" value="Yes">
<input type="hidden" name="photo_imgsrc" id="photo_imgsrc" value="">

<section>
	<h1 class="page_ttl">連絡先の<?php echo $isnewcard?'追加':'編集' ?></h1>
	<div class="card_detail_edit">
	<div class="left-sc">
		<ul>
			<li>
				<div class="left-sc-img01">
					<img id="photo_image" src="<?php echo empty($row["fullname"])?$photo_image:$row["fullname"] ?>" alt="写真" />
				</div>
			</li>
			<li>
				<input type="file" id="photo" name="photo" />
			</li>
		</ul>
	</div>
	<div class="right-sc">
		<table class="right-sc-tbl">
    <tr>
      <th><span class="u-f-bg">氏名</span></th>
      <td>
      	<input id="fullname" name="fullname" type="text" class="wp100" value="<?php echo $isnewcard?'':$row["fullname"] ?>" />
      </td>
    </tr>
    <tr>
      <th><span class="u-f-bg">氏名カナ</span></th>
      <td>
      	<input id="fullyomi" name="fullyomi" type="text" class="wp100" value="<?php echo $isnewcard?'':$row["fullyomi"] ?>" />
      </td>
    </tr>
    <tr class="table_line">
      <th><span class="u-f-bg">SIP電話番号</span></th>
      <td class="relative">
				<input name="number" type="text" class="wp100" placeholder="sip:goofy@example.com" value="<?php echo $isnewcard?'':$row["number"] ?>" />
      </td>
    </tr>
    <tr>
      <th><span class="u-f-bg">メモ</span></th>
      <td>
				<div class="textarea_wrap">
					<textarea name="notes"><?php echo $isnewcard?'':$row["notes"] ?></textarea>
				</div>
      </td>
    </tr>
    </table>
  </div>
</div>
</section>
<div class="btn_area">
	<button class="btn" type="submit"><?php echo $isnewcard?'追加':'更新' ?></button>
</div>
</from>

<?php
mysqli_free_result($result);
?>

<script type="text/javascript">
	var front_text = document.getElementById('photo');
	front_text.addEventListener('change', function(e){
		var reader = new FileReader();
		reader.onload = function (e) {
			var image = document.getElementById('photo_image');
			image.setAttribute('src', e.target.result);
			image.style.visibility = 'visible';
			var imgsrc = document.getElementById('photo_imgsrc');
			imgsrc.value = e.target.result;
		}
		reader.readAsDataURL(e.target.files[0]);
	});
</script>

</body>
</html>
