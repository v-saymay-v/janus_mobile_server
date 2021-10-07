<?
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
		jQuery('#user_photo').attr('src', 'common/images/user_img.png');
	});
});
</script>

</head>
<body>

<?
include("header.php");

if (!empty($selfphoto) && !empty($phototype)) {
	$user_photo = 'data:'.$phototype.';base64,'.$selfphoto;
}
?>
<form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>">
<input type="hidden" name="update" value="Yes">
<input type="hidden" name="imgtype" id="imgtype" value="<?php echo $phototype ?>">
<input type="hidden" name="imgb64" id="imgb64" value="<?php echo $selfphoto ?>">

<section>
  <h1 class="page_ttl">ユーザーの編集</h1>
  <div class="user_custom">
    <div class="uaer_custom_img">
      <a class="uaer_custom_img_a popup-modal" href="#inline-wrap">
				<?
				$photo = empty($user_photo) ? "common/images/user_img.png" : $user_photo;
				?>
        <span><img id="main_photo" src="<?php echo $photo ?>" alt="ユーザー画像"></span>
      </a>
    </div>
    <ul class="user_custom_ul01">
      <li>
        <ul class="user_custom_ul02">
        	<li>名前</li><li class="user_custom_li02 user_custom_txt_area"><input type="text" class="" value="<?php echo $fullname ?>" name="fullname" placeholder="山田　太郎" /></li>
        </ul>
    	</li>
      <li>
        <ul class="user_custom_ul02">
          <li>ユーザーID</li><li class="user_custom_txt_area"><input type="text" class="" value="<?php echo $username ?>" name="mailaddr" placeholder="yamada@asj.ad.jp" /></li>
        </ul>
      </li>
			<li>
        <ul class="user_custom_ul02">
          <li>部署</li><li class="user_custom_txt_area"><input type="text" class="" value="<?php echo $compdiv ?>" name="division" placeholder="営業部" /></li>
        </ul>
      </li>
      <li>
        <ul class="user_custom_ul02">
          <li>役職</li><li class="user_custom_txt_area"><input type="text" class="" value="<?php echo $comptitle ?>" name="title" placeholder="部長" /></li>
        </ul>
      </li>
      <li>
        <ul class="user_custom_ul02">
          <li>権限</li>
					<li class="user_custom_radio">
						<span><input type="radio" id="radioA" name="alphabet" <?php echo ($selfpriority=='A'?'checked="checked"':'disabled="disabled"') ?>><label for="radioA" class="radioA">A</label></span>
						<span><input type="radio" id="radioB" name="alphabet" <?php echo ($selfpriority=='B'?'checked="checked"':'disabled="disabled"') ?>><label for="radioB" class="radioB">B</label></span>
						<span><input type="radio" id="radioC" name="alphabet" <?php echo ($selfpriority=='C'?'checked="checked"':'disabled="disabled"') ?>><label for="radioC" class="radioC">C</label></span>
						<span><input type="radio" id="radioD" name="alphabet" <?php echo ($selfpriority=='D'?'checked="checked"':'disabled="disabled"') ?>><label for="radioD" class="radioD">D</label></span>
						<span><input type="radio" id="radioE" name="alphabet" <?php echo ($selfpriority=='E'?'checked="checked"':'disabled="disabled"') ?>><label for="radioE" class="radioE">E</label></span>
					</li>
        </ul>
      </li>
    </ul>
  </div>
</section>

<div class="btn_area">
	<button class="btn" type="submit">保存</button>
</div>

<div id="inline-wrap" class="mfp-hide inline-wrap_cls">
	<h1>プロフィール写真の編集</h1>
	<div class="image">
		<a id="trigger" href="#"><img id="user_photo" src="<?php echo $photo ?>" alt="ユーザー画像"></a>
		<input id="photo_edit" type="file" style="visibility: hidden" />
	</div>
	<div class="inline-wrap_btn">
		<p class="popup-modal-dismiss-red"><a id="update_photo" href="#">変更</a></p>
		<p class="popup-modal-dismiss-close"><a href="#">キャンセル</a></p>
		<button id="clearimg" class="dustbox" type="button" name="dustbox" value="">削除</button>
	</div>
</div>
</form>

<?
}
?>

</body>
</html>
