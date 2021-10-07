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
?>
<script type="text/javascript">
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
</script>

</head>
<body>

<?
include("header.php");

$id = $_GET["id"];
$sql = "SELECT if(T2.b_admin!=0,'共用',aes_decrypt(T3.c_fullname,'$dbkey')) as owner from bt_cards T1,bt_users T2,bt_cards T3 where T2.n_user=T1.n_user and T3.n_user=T2.n_user and T3.b_mine!=0 and T1.n_card='$id'";
$result = mysqli_query($db, $sql);
$row = mysqli_fetch_array($result);
$owner = $row["owner"];
mysqli_free_result($result);

$base_select = " T1.n_card as id,".
							 " T1.n_user as user_id,".
							 " aes_decrypt(T1.c_fullname,'$dbkey') as fullname,".
							 " aes_decrypt(T1.c_fullyomi,'$dbkey') as fullyomi,".
							 " aes_decrypt(T1.c_organization,'$dbkey') as company,".
							 " aes_decrypt(T1.c_orgyomi,'$dbkey') as compyomi,".
							 " aes_decrypt(T1.c_title,'$dbkey') as title,".
							 " aes_decrypt(T1.c_division,'$dbkey') as division,".
							 " aes_decrypt(T1.c_country,'$dbkey') as country,".
							 " aes_decrypt(T1.c_zip,'$dbkey') as zip,".
							 " aes_decrypt(T1.c_fulladdr,'$dbkey') as address,".
							 " aes_decrypt(T1.c_prefecture,'$dbkey') as prefecture,".
							 " aes_decrypt(T1.c_city,'$dbkey') as city,".
							 " aes_decrypt(T1.c_number,'$dbkey') as number,".
							 " aes_decrypt(T1.c_bizphone,'$dbkey') as work,".
							 " aes_decrypt(T1.c_faxphone,'$dbkey') as fax,".
							 " aes_decrypt(T1.c_celphone,'$dbkey') as mobile,".
							 " aes_decrypt(T1.c_mail,'$dbkey') as email,".
							 " aes_decrypt(T1.c_url,'$dbkey') as homepage,".
							 " aes_decrypt(T1.c_twitter,'$dbkey') as twitter,".
							 " aes_decrypt(T1.c_facebook,'$dbkey') as facebook,".
							 " aes_decrypt(T1.c_line,'$dbkey') as line,".
							 " aes_decrypt(T1.c_place,'$dbkey') as place,".
							 " T1.n_place as place_id,".
							 " T2.c_name as place_name,".
							 " T1.n_bday as bday,".
							 " T1.c_bmonth as bmonth_num,".
							 " T1.c_byear as byear,".
							 " aes_decrypt(T1.c_frontimage,'$dbkey') as photo,".
							 " aes_decrypt(T1.c_backimage,'$dbkey') as back,".
							 " aes_decrypt(T1.c_memo,'$dbkey') as notes,".
							 " date_format(T1.d_create,'%Y.%m.%d') as created,".
							 " date_format(T1.d_meet,'%Y.%m.%d') as meet,".
							 " date_format(T1.d_meet,'%H:%i') as meet_time,".
							 " date_format(T1.d_update,'%Y.%m.%d') as modified";
$sql = "SELECT $base_select FROM bt_cards T1 left join bm_places T2 on T2.n_place=T1.n_place where T1.n_card='$id'";
$result = mysqli_query($db, $sql);
if (!$result) {
	error_log(mysqli_error($db));
}
$row = mysqli_fetch_array($result);
$resultsnumber = mysqli_num_rows($result);
if($resultsnumber == 0) {
	mysqli_free_result($result);
	return;
}
$owner_id = $row["user_id"];

function getPhotoTag($photo, $id) {
	return (!empty($photo) ? '<img id="'.$id.'" src="data:image/jpg;base64,'.$photo.'" alt="名刺イメージ" />' : "");
}

function removeNonNumber($phone) {
	$work = '';
	for ($i = 0; $i < strlen($phone); ++$i) {
		$c = substr($phone, $i, 1);
		if ($c >= '0' && $c <= '9') {
			$work .= $c;
		}
	}
	return $work;
}
?>

<aside class="u-mb-20">
  <div><span class="u-f-bg">所有者</span>　<?php echo $owner ?></div><div><span class="u-f-bg">登録日</span>　<?php echo $row['created'] ?></div>
</aside>

<section class="card_detail_main">
  <div class="left-sc">
    <ul class="modal-gallery">
      <li>
        <div class="left-sc-img01">
          <a id="front_link" href="common/images/user_cd.png" class="modal-img-card"><?php echo getPhotoTag($row["photo"], "front_image") ?></a>
        </div>
      </li>
    	<li>
    		<div class="left-sc-img02">
      		<a id="back_link" href="common/images/user_cd_back.png" class="modal-img-card"><?php echo getPhotoTag($row["back"], "back_image") ?></a>
    		</div>
    	</li>
    	<li class="left-sc-sns"><span class="u-f-bg lispan-sns">LINE ID</span><a href="#" class="alink-sns"><?php echo (empty($row['line'])?'-':$row['line']) ?></a></li>
    	<li class="left-sc-sns"><span class="u-f-bg lispan-sns">Facebook ID</span><a href="#" class="alink-sns"><?php echo (empty($row['facebook'])?'-':$row['facebook']) ?></a></li>
    	<li class="left-sc-sns"><span class="u-f-bg lispan-sns">Twitter ID</span><a href="#" class="alink-sns"><?php echo (empty($row['twitter'])?'-':$row['twitter']) ?></a></li>
    	<li class="left-sc-red"><a href="edit.php?id=<?php echo $id ?>" class="alink-red01">編集</a></li>
    	<li><a href="http://maps.google.com/maps?q=<?php echo urlencode(trim(str_replace("\r\n", ", ", trim($row["address"])))) ?>&t=h" class="alink-red02">地図</a></li>
    	<li><a href="vcard.php?id=<?php echo $id ?>" class="alink-red03 alink-red-last">VCARD</a></li>
  	</ul>
  </div>
  <div class="right-sc">
    <p><?php echo $row['fullyomi'] ?></p>
    <h1><?php echo $row['fullname'] ?></h1>
    <table class="right-sc-tbl">
      <tr>
	      <th><span class="u-f-bg">会社名</span></th>
				<?
				$company = $row['company'];
				?>
	      <td><?php echo $company ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">会社名カナ</span></th>
				<?
				$compyomi = $row['compyomi'];
				?>
        <td><?php echo $compyomi ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">部署</span></th>
        <td><?php echo $row['division'] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">役職</span></th>
        <td><?php echo $row['title'] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">電話番号</span></th>
        <td>
        	<a href="tel:<?php echo removeNonNumber($row['work']) ?>"><?php echo $row['work'] ?></a>
        	<br><a href="tel:<?php echo removeNonNumber($row['mobile']) ?>"><?php echo $row['mobile'] ?></a>
					<?
					$phones = array();
					$sql = "select aes_decrypt(c_phone,'$dbkey') as phone from bt_phones where n_card = $id";
					$res = mysqli_query($db, $sql);
					while ($r = mysqli_fetch_array($res)) {
						$phones[] = $r["phone"];
					}
					mysqli_free_result($res);
					$cnt = 0;
					foreach ($phones as $phone) {
						if ($cnt > 0) echo "<br />";
						?>
						<a href="tel:<?php echo removeNonNumber($phone) ?>"><?php echo $phone ?></a>
						<?
						++$cnt;
					}
					?>
        </td>
      </tr>
      <tr>
        <th><span class="u-f-bg">住所</span></th>
        <td><?php echo $row['address'] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">FAX</span></th>
        <td><?php echo $row['fax'] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">メールアドレス</span></th>
        <td><a class="alink-right" href="mailto:<?php echo $row['email'] ?>?subject=件名&amp;body=本文"><?php echo $row['email'] ?></a></td>
				<?
				$mails = array();
				$sql = "select aes_decrypt(c_mail,'$dbkey') as mail from bt_mails where n_card = $id";
				$res = mysqli_query($db, $sql);
				while ($r = mysqli_fetch_array($res)) {
					$mails[] = $r["mail"];
				}
				mysqli_free_result($res);
				$cnt = 0;
				foreach ($mails as $mail) {
					if ($cnt > 0) echo "<br />";
				?>
				<a class="alink-right" href="mailto:<?php echo $mail ?>?subject=件名&amp;body=本文"><?php echo $mail ?></a>
				<?
					++$cnt;
				}
				?>
      </tr>
      <tr>
        <th><span class="u-f-bg">ホームページ</span></th>
        <td><a class="alink-right" href="<?php echo $row['homepage'] ?>" target="_blank"><?php echo $row['homepage'] ?></a></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">誕生日</span></th>
        <td><?php echo $row["byear"].".".$row["bmonth_num"].".".$row["bday"] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">来訪管理</span></th>
        <td><?php echo $row["meet"] ?> <?php echo $row["meet_time"] ?> <?php echo $row["place"] ?> <?php echo $row["place_name"] ?></td>
      </tr>
      <tr>
        <th><span class="u-f-bg">メモ</span></th>
        <td><?php echo $row["notes"] ?></td>
      </tr>
    </table>
    <button class="dustbox" type="button" name="dustbox" value="">削除</button>
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

<?
mysqli_free_result($result);
?>

<section class="card_detail_sb">
  <h1>同じ会社の名刺</h1>
	<ul class="slide-multi">
		<?
		if ($settings['show_others']['value'] == 'true') {
		  $sql = "select T1.n_card as id,aes_decrypt(T1.c_fullname,'$dbkey') as name,aes_decrypt(T1.c_frontimage,'$dbkey') as photo from bt_cards T1".
						" where (aes_decrypt(T1.c_organization,'$dbkey') = '$company' or aes_decrypt(T1.c_orgyomi,'$dbkey') = '$compyomi') and T1.b_mine = 0 and T1.b_removed = 0";
		} else {
		  $sql = "select T1.n_card as id,aes_decrypt(T1.c_fullname,'$dbkey') as name,aes_decrypt(T1.c_frontimage,'$dbkey') as photo from bt_cards T1,bt_users T2".
						" where (aes_decrypt(T1.c_organization,'$dbkey') = '$company' or aes_decrypt(T1.c_orgyomi,'$dbkey') = '$compyomi')".
						" and ((T1.n_user = $user_id or (T1.n_user = $comp_id and T1.n_user = T2.n_user and T2.n_company = $comp_id)) and T1.b_mine = 0 and T1.b_removed = 0)";
		}
		$result = mysqli_query($db, $sql);
		if (!$result) {
			error_log(mysqli_error($db));
		}
		$resultsnumber = mysqli_num_rows($result);
		$max=(int)($resultsnumber*4/4);
		while ($max % 4 != 0) {
			++$max;
		}
		for ($i = 0; $i < $max; ++$i) {
			if ($i >= $resultsnumber) {
		?>
				<li></li>
		<?
			} else {
				$row = mysqli_fetch_array($result);
		?>
		<!-- 4つずつ -->
  	<li>
			<a href="view.php?id=<?php echo $row["id"] ?>">
				<div class="sb_fg"><img class="sb_fg_img" src="data:image/jpg;base64,<?php echo $row["photo"] ?>" alt="名刺イメージ"></div>
				<div class="sb_cp ellipsis"><?php echo $row["name"] ?></div>
			</a>
		</li>
		<?
			}
		}
		?>
	</ul>
</section>

</body>
</html>
