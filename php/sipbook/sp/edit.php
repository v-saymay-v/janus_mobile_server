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
<script src="../js/ajaxzip3-source.js" charset="UTF-8"></script>
<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery('#zipsearch').on('click', function() {
		AjaxZip3.onSuccess = function() {
		};
		AjaxZip3.onFailure = function() {
			alert('郵便番号を変換できません');
		};
		AjaxZip3.zip2addr('zip','','prefecture','city','number');
	});
});
</script>

</head>
<body>

<?
include("header.php");

function getPhotoTag($photo) {
	return (!empty($photo) ? '<img src="data:image/jpg;base64,'.$photo.'" alt="名刺イメージ" />' : "");
}

if (!empty($_POST["update"])) {
	//$id = $_POST["id"];
	$sql = "UPDATE bt_cards SET".
				" n_user = '".$owner_id."'".
				",n_version = n_version+1".
				",c_fullname = aes_encrypt('".$fullname."','$dbkey')".
				",c_fullyomi = aes_encrypt('".mb_convert_kana(mb_convert_kana($fullyomi), "c")."','$dbkey')".
				",c_organization  = aes_encrypt('".$company."','$dbkey')".
				",c_orgyomi = aes_encrypt('".mb_convert_kana(mb_convert_kana($compyomi), "c")."','$dbkey')".
				",c_division = aes_encrypt('".$division."','$dbkey')".
				",c_title = aes_encrypt('".$title."','$dbkey')".
				",c_country = aes_encrypt('".$country."','$dbkey')".
				",c_zip = aes_encrypt('".$zip."','$dbkey')".
				",c_fulladdr = aes_encrypt(concat('".$prefecture."','".$city."','".$number."','".$building."'),'$dbkey')".
				",c_prefecture = aes_encrypt('".$prefecture."','$dbkey')".
				",c_city = aes_encrypt('".$city."','$dbkey')".
				",c_number = aes_encrypt('".$number."','$dbkey')".
				",c_building = aes_encrypt('".$building."','$dbkey')".
				",c_bizphone = aes_encrypt('".$work."','$dbkey')".
				",c_celphone = aes_encrypt('".$mobile."','$dbkey')".
				",c_faxphone = aes_encrypt('".$fax."','$dbkey')".
				",c_mail = aes_encrypt('".$email."','$dbkey')".
				",c_url = aes_encrypt('".$homepage."','$dbkey')".
				",c_twitter = aes_encrypt('".$twitter."','$dbkey')".
				",c_facebook = aes_encrypt('".$facebook."','$dbkey')".
				",c_line = aes_encrypt('".$line."','$dbkey')".
				",c_memo = aes_encrypt('".$notes."','$dbkey')".
				//", c_authority = '".$authority."'".
				",n_bday = '".$bday."'".
				",c_bmonth = '".$bmonth_num."'".
				",c_byear = '".$byear."'".
				",n_place = ".$place_id."".
				",c_place = '".$place."'".
				",d_meet = '".str_replace('.','-',$meet).":00'".
				" WHERE n_card = '".$id."'";

	$result = mysqli_query($db, $sql);
	if(mysqli_errno($db) > 0) {
		echo(mysqli_errno($db).": ".mysqli_error($db));
		return;
	}
	header('Location: view.php?id='.$id);

} else {
	$prefectures = array('北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
											'茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
											'新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
											'静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
											'奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
											'徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
											'熊本県','大分県','宮崎県','鹿児島県','沖縄県');

	$id = $_GET["id"];
	$sql = "SELECT if(T2.b_admin!=0,'共用',aes_decrypt(T3.c_fullname,'$dbkey')) as owner from bt_cards T1,bt_users T2,bt_cards T3 where T2.n_user=T1.n_user and T3.n_user=T2.n_user and T3.b_mine!=0 and T1.n_card='$id'";
	$result = mysqli_query($db, $sql);
	$row = mysqli_fetch_array($result);
	$owner_id = $row["owner"];
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
								 " aes_decrypt(T1.c_building,'$dbkey') as building,".
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
	echo(mysqli_error($db));
	}
	$row = mysqli_fetch_array($result);
	$resultsnumber = mysqli_num_rows($result);
	if($resultsnumber == 0) {
		mysqli_free_result($result);
		return;
	}
	$owner_id = $row["user_id"];
?>

<form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>">
<input type="hidden" name="id" value="<?php echo (isset($id)?$id:'') ?>">
<input type="hidden" name="update" value="Yes">

<section>
	<h1 class="page_ttl">名刺の編集</h1>
	<div class="card_detail_edit">
		<div class="left-sc">
			<ul>
				<li>
					<div class="left-sc-img01">
						<?php echo getPhotoTag($row['photo']) ?>
          </div>
				</li>
				<li>
					<div class="left-sc-img02">
						<?php echo getPhotoTag($row['back']) ?>
					</div>
				</li>
			</ul>
		</div>
		<div class="right-sc">
			<table class="right-sc-tbl">
				<tr>
					<th><span class="u-f-bg">所有者</span></th>
					<td>
						<div class="select_wrap">
							<select name="owner_id">
								<option value="<?php echo $admin_id ?>"<?php echo ($admin_id==$owner_id?' selected':'') ?>>共用</option>
								<option value="<?php echo $user_id ?>"<?php echo ($admin_id!=$owner_id?' selected':'') ?>>個人</option>
							</select>
						</div>
					</td>
				</tr>
        <tr>
          <th><span class="u-f-bg">氏名</span></th>
          <td>
          	<input name="fullname" type="text" class="wp100" value="<?php echo $row['fullyomi'] ?>" />
          </td>
        </tr>
        <tr>
          <th><span class="u-f-bg">氏名カナ</span></th>
          <td>
          	<input name="fullyomi" type="text" class="wp100" value="<?php echo $row['fullname'] ?>" />
          </td>
        </tr>
        <tr>
          <th><span class="u-f-bg">会社名</span></th>
          <td>
          	<input name="company" type="text" class="wp100" value="<?php echo $row['company'] ?>" />
          </td>
        </tr>
        <tr>
          <th><span class="u-f-bg">会社名カナ</span></th>
          <td>
          	<input name="compyomi" type="text" class="wp100" value="<?php echo $row['compyomi'] ?>" />
          </td>
        </tr>
        <tr>
          <th><span class="u-f-bg">部署</span></th>
          <td>
          	<input name="division" type="text" class="wp100" value="<?php echo $row['division'] ?>" />
          </td>
        </tr>
        <tr>
          <th><span class="u-f-bg">役職</span></th>
          <td>
          	<input name="title" type="text" class="wp100" value="<?php echo $row['title'] ?>" />
          </td>
        </tr>
        <tr class="table_line">
          <th><span class="u-f-bg">電話番号</span></th>
          <td class="relative">
          	<input name="work" type="text" class="wp100-40" value="<?php echo $row['work'] ?>" />
          	<input name="mobile" type="text" class="wp100-40" value="<?php echo $row['mobile'] ?>" />
						<?
						$phones = array();
						$sql = "select aes_decrypt(c_phone,'$dbkey') as phone from bt_phones where n_card = $id";
						$res = mysqli_query($db, $sql);
						while ($r = mysqli_fetch_array($res)) {
							$phones[] = $r["phone"];
						}
						mysqli_free_result($res);
						foreach ($phones as $phone) {
						?>
						<input name="phones[]" type="text" class="wp100-40" value="<?php echo $phone ?>" />
						<?
						}
						?>
          	<button type="button" class="add-btn">追加</button>
          </td>
        </tr>
        <tr class="table_line table_dl">
          <th><span class="u-f-bg">住所</span></th>
          <td>
          	<dl class="dl">
              <dt><span class="u-f-bg">国</span></dt>
              <dd>
              	<input name="country" type="text" class="wp100-106" value="<?php echo $row["country"] ?>" />
              </dd>
              <dt><span class="u-f-bg">郵便番号</span></dt>
              <dd>
              	<input name="zip" type="text" class="wp100-106" value="<?php echo $row["zip"] ?>" /><button id="zipsearch" type="button" class="option-btn u-ml-10">検索</button>
              </dd>
              <dt><span class="u-f-bg">都道府県</span></dt>
              <dd>
								<div class="select_wrap">
									<select name="prefecture">
										<option>都道府県をお選びください</option>
										<?
										foreach ($prefectures as $pref) {
										?>
										<option<?php echo ($pref==$row["prefecture"]?' selected':'') ?>><?php echo $pref ?></option>
										<?
										}
										?>
									</select>
								</div>
							</dd>
              <dt><span class="u-f-bg">市町村</span></dt>
              <dd>
              	<input name="city" type="text" class="wp100" value="<?php echo $row["city"] ?>" />
              </dd>
              <dt><span class="u-f-bg">町名番地</span></dt>
              <dd>
              	<input name="number" type="text" class="wp100" value="<?php echo $row["number"] ?>" />
              </dd>
              <dt><span class="u-f-bg">建物名</span></dt>
              <dd>
              	<input name="building" type="text" class="wp100" value="<?php echo $row["building"] ?>" />
              </dd>
						</dl>
					</td>
				</tr>
				<tr>
					<th><span class="u-f-bg">FAX</span></th>
					<td class="relative">
						<input name="fax" type="text" class="wp100-40" value="<?php echo $row["fax"] ?>" />
					</td>
				</tr>
				<tr class="table_line">
					<th><span class="u-f-bg">メールアドレス</span></th>
					<td class="relative">
						<input name="email" type="text" class="wp100-40" value="<?php echo $row["email"] ?>" />
						<?
						$mails = array();
						$sql = "select aes_decrypt(c_mail,'$dbkey') as mail from bt_mails where n_card = $id";
						$res = mysqli_query($db, $sql);
						while ($r = mysqli_fetch_array($res)) {
							$mails[] = $r["mail"];
						}
						mysqli_free_result($res);
						foreach ($mails as $mail) {
						?>
						<input name="mails[]" type="text" class="w350" value="<?php echo $mail ?>" />
						<?
						}
						?>
						<button type="button" class="add-btn">追加</button>
					</td>
				</tr>
				<tr class="table_line">
					<th><span class="u-f-bg">SNS</span></th>
					<td>
						<table class="right-sc-tbl">
							<tr>
								<th><span class="u-f-bg">LINE ID</span></th>
								<td>
									<input name="line" type="text" class="wp100" value="<?php echo $row["line"] ?>" />
								</td>
							</tr>
							<tr>
								<th><span class="u-f-bg">Facebook ID</span></th>
								<td>
									<input name="facebook" type="text" class="wp100" value="<?php echo $row["facebook"] ?>" />
								</td>
							</tr>
							<tr>
								<th><span class="u-f-bg">Twitter ID</span></th>
								<td>
									<input name="twitter" type="text" class="wp100" value="<?php echo $row["twitter"] ?>" />
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<th><span class="u-f-bg">ホームページ</span></th>
					<td>
						<input name="homepage" type="text" class="wp100" value="<?php echo $row["homepage"] ?>" />
					</td>
				</tr>
				<tr class="table_line">
					<th><span class="u-f-bg">誕生日</span></th>
					<td>
						<span class="u-disp-iB">
							<div class="select_wrap">
								<select name="byear">
									<option value="">-</option>
									<?
									$start = (int)date('Y');
									for ($year = $start; $year > $start - 100; --$year) {
									?>
									<option value="<?php echo $year ?>"<?php echo ($year==$row["byear"]?' selected':'') ?>><?php echo $year ?></option>
									<?
									}
									?>
								</select>
							</div>
							<span class="u-mr-8">年</span>
						</span>
						<span class="u-disp-iB">
							<div class="select_wrap">
								<select name="bmonth_num">
									<option value="">-</option>
									<?
									for ($month = 1; $month <= 12; ++$month) {
									?>
									<option value="<?php echo $month ?>"<?php echo ($month==$row["bmonth_num"]?' selected':'') ?>><?php echo $month ?></option>
									<?
									}
									?>
								</select>
							</div>
							<span class="u-mr-8">月</span>
							<div class="select_wrap">
								<select name="bday">
									<option value="">-</option>
									<?
									for ($day = 1; $day <= 31; ++$day) {
									?>
									<option value="<?php echo $day ?>"<?php echo ($day==$row["bday"]?' selected':'') ?>><?php echo $day ?></option>
									<?
									}
									?>
								</select>
							</div>
							日
						</span>
					</td>
				</tr>
				<tr class="table_line table_dl">
					<th><span class="u-f-bg">来訪管理</span></th>
					<td>
						<dl class="dl">
							<dt><span class="u-f-bg">日時</span></dt>
							<dd>
								<div class="input-group date datetimepicker-YMDHm">
									<span class="input-group-addon">
										<input name="meet" type="text" class="form-control" value="<?php echo $row["meet"] ?> <?php echo $row["meet_time"] ?>">
									</span>
								</div>
							</dd>
              <dt><span class="u-f-bg">場所</span></dt>
              <dd>
              	<input name="place" type="text" class="w200" value="<?php echo $row["place"] ?>" />
              </dd>
              <dt><span class="u-f-bg">種類</span></dt>
            	<dd>
								<div class="select_wrap">
									<select name="place_id">
										<option value="0">-</option>
										<?
										$sql = "SELECT n_place,c_name from bm_places order by n_place";
										$res = mysqli_query($db, $sql);
										while ($r = mysqli_fetch_array($res)) {
											$placeid = $r["n_place"];
										?>
										<option value="<?php echo $placeid ?>"<?php echo ($placeid==$row["place_id"]?' selected':'') ?>><?php echo $r["c_name"] ?></option>
										<?
										}
										mysqli_free_result($res);
										?>
									</select>
								</div>
              </dd>
						</dl>
        	</td>
      	</tr>
      	<tr>
        	<th><span class="u-f-bg">メモ</span></th>
        	<td>
						<div class="textarea_wrap">
							<textarea name="notes"><?php echo $row["notes"] ?></textarea>
						</div>
        	</td>
      	</tr>
			</table>
		</div>
	</div>
</section>
<div class="btn_area">
	<button class="btn" type="submit">更新</button>
</div>
</form>
<?
	mysqli_free_result($result);
}
?>

</body>
</html>
