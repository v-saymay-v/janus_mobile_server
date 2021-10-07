<?
include("construct.php");

define("PAGESIZE", 20);
$phone_delims = array("'", '/', "-", " ", "(", ")", ".");

function likePhone($row, $searchword) {

	global $db, $phone_delims;

	$replace = $row;
	$like    = "'$searchword'";
	foreach($phone_delims as $phone_delim) {
		$replace = "replace(".$replace.", '".mysqli_real_escape_string($db, $phone_delim)."','')";
		$like    = "replace(".$like.   ", '".mysqli_real_escape_string($db, $phone_delim)."','')";
	}
	return $replace." LIKE CONCAT('%',".$like.",'%')";
}

if (!CheckLoggedIn()) {
	header("Location: login.php");
	return;
}

$sortby = 'byname';
if (isset($_SESSION['sortby'])) {
	$sortby = $_SESSION['sortby'];
}
if (isset($_GET["sortby"])) {
	$sortby = $_GET["sortby"];
}
$sortdir = 'asc';
if (isset($_SESSION['sortdir'])) {
	$sortdir = $_SESSION['sortdir'];
}
if (isset($_GET["sortdir"])) {
	$sortdir = $_GET["sortdir"];
}
$searchstring = '';
if (isset($_SESSION['searchstring'])) {
	$searchstring = $_SESSION['searchstring'];
}
if (isset($_POST["searchstring"])) {
	$searchstring = urldecode($_POST["searchstring"]);
} else if (isset($_GET["searchstring"])) {
	$searchstring = urldecode($_GET["searchstring"]);
}
$start = 0;
if (isset($_SESSION["start"])) {
	$start = $_SESSION["start"];
}
if (isset($_GET["start"])) {
	$start = $_GET["start"];
}

$_SESSION['sortby'] = $sortby;
$_SESSION['sortdir'] = $sortdir;
$_SESSION['searchstring'] = $searchstring;
$_SESSION["start"] = $start;
$curpage = intval($start/PAGESIZE);

include("htmlhead.php");
?>
<script>
<!--
jQuery(document).ready(function() {
	jQuery('#sortby').change(function() {
		var sortby = jQuery(this).val();
		location.href = '<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo $curpage*PAGESIZE ?>&sortby='+sortby+'&sortdir=<?php echo $sortdir ?>&searchstring=<?php echo urlencode($searchstring) ?>';
	});
	jQuery('.sort_switch').click(function() {
		if (jQuery(this).hasClass('sort_switch-up')) {
			location.href = '<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo $curpage*PAGESIZE ?>&sortby=<?php echo $sortby ?>&sortdir=desc&searchstring=<?php echo urlencode($searchstring) ?>';
		} else {
			location.href = '<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo $curpage*PAGESIZE ?>&sortby=<?php echo $sortby ?>&sortdir=asc&searchstring=<?php echo urlencode($searchstring) ?>';
		}
	});
	jQuery('.searchbox_btn_detail').click(function() {
		var str = encodeURI(jQuery('#searchstring').val());
		location.href = '<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo $curpage*PAGESIZE ?>&sortby=<?php echo $sortby ?>&sortdir=<?php echo $sortdir ?>&searchstring='+str;
	});
	jQuery('.searchbox_btn_detail').css('cursor', 'pointer');
});
-->
</script>
</head>
<body>

<?
include("header.php");
?>

<section>
  <div class="searchbox01">
    <input id="searchstring" class="search" placeholder="検索" type="text" value="<?php echo $searchstring ?>"><span class="requiredbtn"></span><span class="searchbox_btn_detail"></span>
  </div>
  <div class="searchbox02">
    <div class="sort_wrap">
			<div class="select_wrap">
				<select id="sortby" name="sortby">
					<option value="byname"<?php echo ($sortby=="byname"?" selected":"") ?>>氏名</option>
					<option value="bycompany"<?php echo ($sortby=="bycompany"?" selected":"") ?>>会社名</option>
					<option value="bydate"<?php echo ($sortby=="bydate"?" selected":"") ?>>登録日</option>
				</select>
			</div>
			<button class="sort_switch <?php echo ($sortdir=="asc"?"sort_switch-down":"sort_switch-up") ?> u-ml-10">逆に並べ替える</button>
		</div>
    <div class="print-btn"><a href="../print.php?backto=sp">一覧印刷</a></div>
  </div>
</section>

<section class="u-mt-30">

<?
include("buildsql.php");
$sql .= " LIMIT ".$curpage*PAGESIZE.",".PAGESIZE;

$result = mysqli_query($db, $sql);
if (!$result) {
	error_log(mysqli_error($db));
}

$allpages = 1;
$res = mysqli_query($db, "select found_rows()");
$row = mysqli_fetch_array($res);
if($row) {
	$maxrowcnt = $row[0];
	$allpages = intval(($maxrowcnt + PAGESIZE - 1) / PAGESIZE);
}
mysqli_free_result($res);

while ($row = mysqli_fetch_array($result)) {
?>

<div class="ucl-tg">
  <div class="user-card-list">
    <p class="ucl-day"><?php echo $row['created'] ?></p>
    <div class="ucl-box">
      <p class="ucl-img">
				<?
				if (!empty($row['photo'])) {
				?>
				<img src="data:image/jpg;base64,<?php echo $row['photo'] ?>" alt="名刺">
				<?
				}
				?>
			</p>
      <div class="ucl-detail">
        <ul class="sc-lst">
          <li class="ucl-name-s"><?php echo $row['fullyomi'] ?></li>
          <li class="ucl-name"><?php echo $row['fullname'] ?></li>
					<?
					$comp = '';
					if (!empty($row['company']) && !empty($row['compyomi'])) {
						$comp = $row['company'].'（'.$row['compyomi'].'）';
					} else if (!empty($row['company'])) {
						$comp = $row['company'];
					}
					?>
          <li class="ucl-sbtxt"><?php echo $comp ?></li>
					<?
					$title = '';
					if (!empty($row['title']) && !empty($row['division'])) {
						$title = $row['division'].'／'.$row['title'];
					} else if (!empty($row['title'])) {
						$title = $row['title'];
					} else if (!empty($row['division'])) {
						$title = $row['division'];
					}
					?>
          <li class="ucl-sbtxt"><?echo $title ?></li>
        </ul>
        <ul class="thd-lst">
					<?
					if (!empty($row['email'])) {
					?>
          <li class="ucl-mail"><a href="mailto:<?php echo $row['email'] ?>?subject=件名&amp;body=本文"><?php echo $row['email'] ?></a></li>
					<?
					}
					if (!empty($row['work'])) {
						$work = '';
						for ($i = 0; $i < strlen($row['work']); ++$i) {
							$c = substr($row['work'], $i, 1);
							if ($c >= '0' && $c <= '9') {
								$work .= $c;
							}
						}
					?>
          <li class="ucl-tel"><a href="tel:<?php echo $work ?>"><?php echo $row['work'] ?></a></li>
					<?
					}
					?>
          <li>
						<?
						if (!empty($row['line'])) {
						?>
            <div class="ucl-snsbtn ucl-snsbtn-line"><a href="#">LINE</a></div>
						<?
						}
						if (!empty($row['twitter'])) {
						?>
            <div class="ucl-snsbtn ucl-snsbtn-tw"><a href="#">Twitter</a></div>
						<?
						}
						if (!empty($row['facebook'])) {
						?>
            <div class="ucl-snsbtn ucl-snsbtn-fb"><a href="#">Facebook</a></div>
						<?
						}
						?>
          </li>
        </ul>
			</div>
		</div>
		<div class="btn_area">
  		<a class="ucl-tg-a" href="view.php?id=<?php echo $row['id'] ?>">詳細を見る</a>
  	</div>
	</div>
</div>

<?
}
mysqli_free_result($result);

?>
<div class="list-bb"></div>
</section>

<article class="">
<div class="pagination">
	<p class="pagination_inner">
		<?
		if ($curpage > 0) {
		?>
		<a class="m-prev" href="<?php echo $_SERVER['PHP_SELF'] ?>?start=0&sortby=<?php echo $sortby ?>&sortdir=<?php echo $sortdir ?>&searchstring=<?php echo urlencode($searchstring) ?>">&#8249;&#8249;</a>
		<a class="pn-prev" href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($curpage-1)*PAGESIZE ?>&sortby=<?php echo $sortby ?>&sortdir=<?php echo $sortdir ?>&searchstring=<?php echo urlencode($searchstring) ?>">&#8249;</a>
		<?
		}
		?>
		<span class="page-of"><?php echo $curpage+1 ?>/<?php echo $allpages ?></span>
		<?
		if ($curpage < $allpages - 1) {
		?>
		<a class="pn-next" href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($curpage+1)*PAGESIZE ?>&sortby=<?php echo $sortby ?>&sortdir=<?php echo $sortdir ?>&searchstring=<?php echo urlencode($searchstring) ?>">&#155;</a>
		<a class="m-next" href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($allpages-1)*PAGESIZE ?>&sortby=<?php echo $sortby ?>&sortdir=<?php echo $sortdir ?>&searchstring=<?php echo urlencode($searchstring) ?>">&#155;&#155;</a>
		<?
		}
		?>
	</p>
</div>
</article>

<footer>
<p>Copyright &copy; ASJ Inc. All Rights Reserved.</p>
</footer>


</body>
</html>
