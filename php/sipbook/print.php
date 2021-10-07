<?
include ("include/dbconnect.php");
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
$_SESSION['sortby'] = $sortby;
$_SESSION['sortdir'] = $sortdir;
$_SESSION['searchstring'] = $searchstring;
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="telephone=no, email=no, address=no">
<title>BusinessCardManagement- <?php echo $companyname ?></title>
<link rel="icon" href="common/images/favicon.ico" type="image/x-icon">
<!-- CSS -->
<link rel="stylesheet" href="common/css/reset.css" media="screen">
<link rel="stylesheet" href="common/css/layout.css">

<!-- JAVASCRIPT -->
<script src="common/js/jquery-3.3.1.min.js"></script>
<script src="common/js/common.js"></script>


</head>
<body>

<header class="head-nav">
<nav>
	<div id="menu-logo"><a href="index.html"><span class="logo"><img src="common/images/logo.png" alt="BusinessCardManagement"></span></a></div>
	<div class="rightset">
    <?
    $photo = empty($user_photo) ? "common/images/user_img01.png" : $user_photo;
    ?>
		<div class="relative rightset-btn"><a href="#" class=""><span class="nav_u_img"><img src="<?php echo $photo ?>" alt="" width="32" height="32"></span>山田　太郎</a></div>
		<div class="rightset-btn"><a href="#"><span class="rightset-logout-btn">ログアウト</span></a></div>
		<div class="rightset-btn"><a href="#"><span class="rightset-help-btn"></span></a></div>
	</div>
</nav>
</header>

<?
$page = 1;
if (isset($_SESSION["page_pr"])) {
	$page = $_SESSION["page_pr"];
}
if (isset($_GET["page"])) {
	$page = $_GET["page"];
}
$start = 0;
if (isset($_SESSION["start_pr"])) {
	$start = $_SESSION["start_pr"];
}
if (isset($_GET["start"])) {
	$start = $_GET["start"];
}
$pagesize = 8;
$curpage = intval($start/$pagesize);
if ($curpage - 2 > 1) {
	$page = $curpage - 2;
}
$addresses = Addresses::withSearchString($searchstring, $curpage+1, $pagesize, $sortby, $sortdir);
$result = $addresses->getResults();
$resultsnumber = mysqli_num_rows($result);
$maxrows = $addresses->getMaxRowCount();
$start = $curpage*$pagesize;
$allpages = intval(($maxrows + $pagesize - 1) / $pagesize);
$_SESSION["page_pr"] = $page;
$_SESSION["start_pr"] = $start;
?>
<section>
<?php
  $cnt = 0;
  while ($addr = $addresses->nextAddress()) {
    if (($cnt % 4) == 0) {
?>
	<ul class="printbox">
<?
    }
?>
		<li>
      <?
      $photo = $addr->getPhoto();
      if (empty($photo)) {
        $photo = '<img alt="Embedded Image" src="common/images/blank.png" alt="名刺" />';
      }
      ?>
			<div class="ucl-img"><?php echo $photo ?></div>
			<p class="ucl-name"><?php echo $addr->getFullName() ?></p>
			<dl>
				<dt><span class="u-f-bg">会社名</span></dt>
				<dd><?php echo $addr->getCompany() ?></dd>
			</dl>
			<dl class="dl_address">
				<dt><span class="u-f-bg">住所</span></dt>
				<dd><?php echo $addr->getData()['address'] ?></dd>
			</dl>
			<dl class="dl_tel">
				<dt><span class="u-f-bg">電話番号</span></dt>
				<dd><?php echo $addr->firstPhone() ?></dd>
			</dl>
			<dl class="dl_fax">
				<dt><span class="u-f-bg">FAX</span></dt>
				<dd><?php echo $addr->getData()['fax'] ?></dd>
			</dl>
			<dl class="dl_mail">
				<dt><span class="u-f-bg">メールアドレス</span></dt>
				<dd><a class="alink-right" href="mailto:<?php echo $addr->firstEMail() ?>?subject=件名&amp;body=本文"><?php echo $addr->firstEMail() ?></a></dd>
			</dl>
			<dl class="dl_hp">
				<dt><span class="u-f-bg">ホームページ</span></dt>
				<dd><a class="alink-right" href="<?php echo $addr->getData()['homepage'] ?>" target="_blank"><?php echo $addr->getData()['homepage'] ?>/</a></dd>
			</dl>
		</li>
<?
    ++$cnt;
    if (($cnt % 4) == 0) {
?>
  </ul>
<?
    }
  }
?>
</section>

<article class="">
<div id="pages">
	<ol>
    <?
		if ($start > 1) {
			if ($allpages <= 5) {
				$np = 1;
			} else if ($curpage - 1 <= 4) {
				$np = 1;
			} else if ($curpage - 1 >= $allpages - 5) {
				$np = $allpages - 5;
			} else {
				$np = $curpage - 1 - 2;
			}
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($start - $pagesize) . "&page=" . $np ?>">&#8249;</a></li>
		<?
		} else {
		?>
		<li>&#8249;</li>
		<?
		}
		if ($curpage == 0) {
		?>
			<li id="here">1</li>
		<?
			$page = 1;
		} else {
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=0&page=1">1</a></li>
		<?
		}
		if ($curpage - 2 > 1) {
		?>
			<li>…</li>
		<?
		}
		for ($i = $page; $i < $page + 5 && $i < $allpages; ++$i) {
			if ($i == $curpage) {
		?>
		<li id="here"><?php echo $i + 1 ?></li>
		<?
			} else {
				if ($allpages <= 5) {
					$np = 1;
				} else if ($i <= 4) {
					$np = 1;
				} else if ($i >= $allpages - 5) {
					$np = $allpages - 5;
				} else {
					$np = $i - 2;
				}
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($i * $pagesize) . "&page=" . $np ?>"><?php echo $i + 1 ?></a></li>
		<?
			}
		}
		if ($page + 4 < $allpages) {
		?>
		<li>…</li>
		<?
		}
		if ($i < $allpages) {
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($allpages * $pagesize) . "&page=" . $np ?>"><?php echo $allpages ?></a></li>
		<?
		}
		if ($curpage < $allpages - 1) {
			if ($allpages <= 5) {
				$np = 1;
			} else if ($curpage + 1 <= 4) {
				$np = 1;
			} else if ($curpage + 1 >= $allpages - 5) {
				$np = $allpages - 5;
			} else {
				$np = $curpage + 1 - 4;
			}
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($start + $pagesize) . "&page=" . $np ?>">&#155;</a></li>
		<?
		} else {
		?>
		<li>&#155;</li>
		<?
		}
		?>
<!--
		<li><a href="">&#8249;</a></li>
		<li id="here">1</li>
		<li><a href="">2</a></li>
		<li><a href="">3</a></li>
		<li><a href="">4</a></li>
		<li><a href="">5</a></li>
		<li>…</li>
		<li><a href="">10</a></li>
		<li><a href="">&#155;</a></li>
-->
	</ol>
</div>
</article>

<div class="btn_area">
  <?
  $index = isset($_GET['backto'])&&$_GET['backto']=='sp'?'sp/index.php':'index.php';
  ?>
	<button class="btn" type="submit" onclick="location.href='<?php echo $index ?>'">戻る</button>
</div>

<footer>
<p>Copyright &copy; ASJ Inc. All Rights Reserved.</p>
</footer>

</body>
</html>
