<?php
include ("include/dbconnect.php");
include ("include/format.inc.php");
include ("include/header.inc.php");

if (!empty($_POST["update"])) {
	$image_type = $_POST['imgtype'];
	$image_body = $_POST['imgb64'];
	$fullname = $_POST['fullname'];
	$mailaddr = $_POST['mailaddr'];
	$division = $_POST['division'];
	$title = $_POST['title'];

	$sql = "update bt_cards T1 set ".
				"T1.c_phototype = '".$image_type."',".
				"T1.c_photo = aes_encrypt('".$image_body."','".$dbkey."'),".
				"T1.c_fullname = aes_encrypt('".$fullname."','".$dbkey."'),".
				"T1.c_mail = aes_encrypt('".$mailaddr."','".$dbkey."'),".
				"T1.c_division = aes_encrypt('".$division."','".$dbkey."'),".
				"T1.c_title = aes_encrypt('".$title."','".$dbkey."') ".
				"where T1.b_mine != 0 and T1.n_user = ".$user_id;
	$result = mysqli_query($db, $sql);
	if(mysqli_errno($db) > 0) {
		error_log(mysqli_error($db));
	}
	header('Location: ' . getIndexPhp());
} else {
?>

<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery('#trigger').on('click', function() {
		jQuery('#photo_edit').trigger("click");
	});
	jQuery('#update_photo').on('click', function() {
		var src = jQuery('#user_photo').attr('src');
		jQuery('#main_photo').attr('src', src);
		jQuery('#main_photo').css('height', '100%');
		var arry1 = src.split(/,/);
		if (arry1.length == 1) {
			jQuery('#imgb64').val('');
			jQuery('#imgtype').val('');
		} else {
			jQuery('#imgb64').val(arry1[1]);
			var arry2 = arry1[0].split(/;/);
			var arry3 = arry2[0].split(/:/);
			jQuery('#imgtype').val(arry3[1]);
		}
		jQuery.magnificPopup.close();
	});
	var front_text = document.getElementById('photo_edit');
	front_text.addEventListener('change', function(e){
		var reader = new FileReader();
		reader.onload = function (e) {
			var image = document.getElementById('user_photo');
			image.setAttribute('src', e.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	});
	jQuery('#clearimg').on('click', function() {
		jQuery('#user_photo').attr('src', 'common/images/user_img02.png');
	});
});
</script>

<form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>">
<input type="hidden" name="update" value="Yes">
<?
$body = '';
$type = '';
if (!empty($user_photo)) {
	$arry1 = explode(',', $user_photo);
	$body = $arry1[1];
	$arry2 = explode(';', $arry1[0]);
	$arry3 = explode(':', $arry2[0]);
	$type = $arry3[1];
}
?>
<input type="hidden" name="imgtype" id="imgtype" value="<?php echo $type ?>">
<input type="hidden" name="imgb64" id="imgb64" value="<?php echo $body ?>">

<section>
  <h1 class="user_custom_h1">ユーザーの編集</h1>
  <div class="user_custom">
    <div class="uaer_custom_img">
	    <a class="uaer_custom_img_a popup-modal" href="#inline-wrap">
				<?
				$photo = empty($user_photo) ? "common/images/user_img02.png" : $user_photo;
				?>
	      <img id="main_photo" src="<?php echo $photo ?>" alt="ユーザー画像">
	    </a>
    </div>
    <ul class="user_custom_ul01">
      <li>
        <ul class="user_custom_ul02">
        	<li>名前</li><li class="user_custom_li02"><input type="text" class="" value="<?php echo $fullname ?>" name="fullname" placeholder="山田　太郎" /></li>
        </ul>
      </li>
      <li>
        <ul class="user_custom_ul02">
        	<li>ユーザーID</li><li><input type="text" class="" value="<?php echo $username ?>" name="mailaddr" placeholder="yamada@asj.ad.jp" /></li>
        </ul>
      </li>
			<li>
        <ul class="user_custom_ul02">
        	<li>部署</li><li><input type="text" class="" value="<?php echo $compdivision ?>" name="division" placeholder="営業部" /></li>
        </ul>
      </li>
      <li>
        <ul class="user_custom_ul02">
        	<li>役職</li><li><input type="text" class="" value="<?php echo $comptitle ?>" name="title" placeholder="執行役員" /></li>
        </ul>
      </li>
			<li>
				<ul class="user_custom_ul02">
				<li>権限</li>
					<li class="user_custom_radio">
						<span><input type="radio" id="radioA" name="alphabet" <?php echo ($user_priority=='A'?'checked="checked"':'disabled="disabled"') ?>><label for="radioA" class="radioA">A</label></span>
						<span><input type="radio" id="radioB" name="alphabet" <?php echo ($user_priority=='B'?'checked="checked"':'disabled="disabled"') ?>><label for="radioB" class="radioB">B</label></span>
						<span><input type="radio" id="radioC" name="alphabet" <?php echo ($user_priority=='C'?'checked="checked"':'disabled="disabled"') ?>><label for="radioC" class="radioC">C</label></span>
						<span><input type="radio" id="radioD" name="alphabet" <?php echo ($user_priority=='D'?'checked="checked"':'disabled="disabled"') ?>><label for="radioD" class="radioD">D</label></span>
						<span><input type="radio" id="radioE" name="alphabet" <?php echo ($user_priority=='E'?'checked="checked"':'disabled="disabled"') ?>><label for="radioE" class="radioE">E</label></span>
					</li>
				</ul>
			</li>
    </ul>
  </div>
</section>

<div class="user_custom_btn_area">
	<button class="btn_sv" type="submit">保存</button>
</div>

<div id="inline-wrap" class="mfp-hide inline-wrap_cls">
	<h1>プロフィール写真の編集</h1>
	<div class="image">
		<a id="trigger" href="#"><img id="user_photo" src="<?php echo $photo ?>" alt="ユーザー画像" /></a>
		<input type="file" id="photo_edit" style="visibility: hidden" />
	</div>
	<div class="inline-wrap_btn">
		<p class="popup-modal-dismiss-close"><a href="#">キャンセル</a></p>
		<p class="popup-modal-dismiss-red"><a id="update_photo" href="#">変更</a></p>
		<button id="clearimg" class="dustbox03" type="button" name="dustbox" value=""></button>
	</div>
</div>
</form>

<?
}
?>

</body>
</html>
