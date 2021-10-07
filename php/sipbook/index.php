<?php
include ("include/dbconnect.php");
include ("include/format.inc.php");
include ("include/photo.class.php");
include ("include/header.inc.php");

define("ISACTIVE", " is-active");
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
switch ($sortby) {
	case "bycompany":
		if ($sortdir == "asc") {
			$companyasc = ISACTIVE;
		} else {
			$companydesc = ISACTIVE;
		}
		break;
	case "bydate":
		if ($sortdir == "asc") {
			$dateasc = ISACTIVE;
		} else {
			$datedesc = ISACTIVE;
		}
		break;
	default:
		if ($sortdir == "asc") {
			$nameasc = ISACTIVE;
		} else {
			$namedesc = ISACTIVE;
		}
}
$_SESSION['sortby'] = $sortby;
$_SESSION['sortdir'] = $sortdir;
$_SESSION['searchstring'] = $searchstring;
?>

<script type="text/javascript">
function getSearchString() {
	var str = jQuery('#searchstring').val();
	return encodeURI(str.trim());
}

jQuery(document).ready(function() {
	jQuery('.searchbox_btn_detail').on('click', function() {
		//var str = jQuery('#searchstring').val();
		//location.href="<?php echo $_SERVER['PHP_SELF'] ?>?sortby=<?php echo $sortby ?>&sortdir=<?php echo $sortdir ?>&searchstring="+getSearchString();
		jQuery('#searchform').submit();
	});
});
</script>

<section>
	<form accept-charset="utf-8" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" name="searchform" id="searchform">
    <div class="searchbox01">
      <input class="search" placeholder="キーワード、氏名、会社名、メールアドレス等で検索" title="<?php echo ucfmsg('SEARCH_FOR_ANY_TEXT') ?>" type="text" value="<?php echo $searchstring; ?>" id="searchstring" name="searchstring" />
			<span class="requiredbtn"></span><span class="searchbox_btn_detail"></span>
    </div>
    <div class="searchbox02">
      <ul class="u-mt-15">
        <li><div class="sortSwitch_txt01">氏名</div>
	        <div class="sortSwitch_wrap01 u-va-m">
		     		<label class="sortSwitch01 up<?php echo (isset($namedesc)?$namedesc:"") ?>">
							<input class="sortSwitch_input01" type="radio" name="sort" onclick="location.href='<?php echo $_SERVER['PHP_SELF'] ?>?sortby=byname&sortdir=desc&searchstring='+getSearchString()" />
							<span class="up_mk"></span>
						</label>
						<label class="sortSwitch01 down<?php echo (isset($nameasc)?$nameasc:"") ?>">
							<span class="down_mk"></span>
							<input class="sortSwitch_input01" type="radio" name="sort" onclick="location.href='<?php echo $_SERVER['PHP_SELF'] ?>?sortby=byname&sortdir=asc&searchstring='+getSearchString()" />
						</label>
	        </div>
        </li>
        <li>
					<div class="sortSwitch_txt01">会社名</div>
          <div class="sortSwitch_wrap01 u-va-m">
	     			<label class="sortSwitch01 up<?php echo (isset($companydesc)?$companydesc:"") ?>">
							<input class="sortSwitch_input01" type="radio" name="sort" onclick="location.href='<?php echo $_SERVER['PHP_SELF'] ?>?sortby=bycompany&sortdir=desc&searchstring='+getSearchString()" />
							<span class="up_mk"></span>
						</label>
						<label class="sortSwitch01 down<?php echo (isset($companyasc)?$companyasc:"") ?>">
							<span class="down_mk"></span>
							<input class="sortSwitch_input01" type="radio" name="sort" onclick="location.href='<?php echo $_SERVER['PHP_SELF'] ?>?sortby=bycompany&sortdir=asc&searchstring='+getSearchString()" />
						</label>
          </div>
        </li>
        <li>
					<div class="sortSwitch_txt01">登録日</div>
          <div class="sortSwitch_wrap01 u-va-m">
						<label class="sortSwitch01 up<?php echo (isset($datedesc)?$datedesc:"") ?>">
							<input class="sortSwitch_input01" type="radio" name="sort" onclick="location.href='<?php echo $_SERVER['PHP_SELF'] ?>?sortby=bydate&sortdir=desc&searchstring='+getSearchString()" />
							<span class="up_mk"></span>
						</label>
						<label class="sortSwitch01 down<?php echo (isset($dateasc)?$dateasc:"") ?>">
							<span class="down_mk"></span>
							<input class="sortSwitch_input01" type="radio" name="sort" onclick="location.href='<?php echo $_SERVER['PHP_SELF'] ?>?sortby=bydate&sortdir=asc&searchstring='+getSearchString()" />
						</label>
          </div>
        </li>
      </ul>
			<div class="print-btn" style="display: flex;">
				<a href="edit<?php echo $page_ext_qry ?>id=" style="white-space: nowrap">新規追加</a>
				<a href="print.php" style="white-space: nowrap; margin-left: 3px">一覧印刷</a>
			</div>
    </div>
	</form>
</section>

<?php
$page = 1;
if (isset($_SESSION["page"])) {
	$page = $_SESSION["page"];
}
if (isset($_GET["page"])) {
	$page = $_GET["page"];
}
$start = 0;
if (isset($_SESSION["start"])) {
	$start = $_SESSION["start"];
}
if (isset($_GET["start"])) {
	$start = $_GET["start"];
}
$pagesize = Addresses::$pagesize;
$curpage = intval($start/$pagesize);
if ($curpage - 2 > 1) {
	$page = $curpage - 2;
}
$addresses = Addresses::withSearchString($searchstring, /*$alphabet,*/ $curpage+1, $pagesize, $sortby, $sortdir);
$result = $addresses->getResults();
$resultsnumber = mysqli_num_rows($result);
$maxrows = $addresses->getMaxRowCount();
$start = $curpage*$pagesize;
$allpages = intval(($maxrows + $pagesize - 1) / $pagesize);
$_SESSION["page"] = $page;
$_SESSION["start"] = $start;
?>
<section class="u-mt-30">
<?php
function MarkMatched($target) {
	global $searchstring;
	if (empty($searchstring))
		return $target;
	$searchwords = explode(" ", $searchstring);
	foreach($searchwords as $searchword) {
		$pattern = '/('.$searchword.')/';
		$replace = '<span class="search_letter">${1}</span>';
		$target = preg_replace($pattern, $replace, $target);
	}
	return $target;
}

while ($addr = $addresses->nextAddress()) { ?>

<div class="ucl-tg">
  <div class="user-card-list">
    <ul>
    <li>
      <ul>
        <li class="ucl-day"><?php echo $addr->getMeetDate() ?></li>
        <li class="ucl-img"><?php echo $addr->getPhoto() ?></li>
      </ul>
    </li>
		<li class="u-ml-30 sc-lst">
      <ul>
				<?
				$fullyomi = MarkMatched($addr->getFullYomi());
				$fullname = MarkMatched($addr->getFullName());
				$company = MarkMatched($addr->getCompany());
				$compyomi = MarkMatched($addr->getCompYomi());
				?>
        <li class="ucl-name-s"><?php echo $fullyomi ?></li>
        <li class="ucl-name"><?php echo $fullname ?></li>
        <li class="ucl-sbtxt"><?php echo $company ?>（<?php echo $compyomi ?>）</li>
<?php
	$division = MarkMatched($addr->getDivision());
	$title = MarkMatched($addr->getTitle());
	if (!empty($division) && !empty($title)) {
?>
        <li class="ucl-sbtxt"><?php echo $division ?>／<?php echo $title ?></li>
<?php
	} else if (!empty($division)) {
?>
        <li class="ucl-sbtxt"><?php echo $division ?></li>
<?php
	} else if (!empty($title)) {
?>
        <li class="ucl-sbtxt"><?php echo $title ?></li>
<?php
	}
?>
      </ul>
    </li>
		<li class="u-ml-50 thd-lst">
      <ul>
<?php
	$emails = $addr->getEMails();
	foreach($emails as $mail) {
?>
        <li class="ucl-mail"><?php echo MarkMatched($mail) ?></li>
<?php
	}
	$phones = $addr->getPhones();
	foreach($phones as $phone) { ?>
        <li class="ucl-tel"><?php echo MarkMatched($phone) ?></li>
<?php
	}
?>
        <li>
<?php
	$twitter = $addr->getTwitter();
	if (!empty($twitter)) {
?>
					<div class="ucl-snsbtn ucl-snsbtn01"><a href="#">Twitter</a></div>
<?php
	}
	$facebook = $addr->getFacebook();
	if (!empty($facebook)) {
?>
          <div class="ucl-snsbtn ucl-snsbtn02"><a href="#">Facebook</a></div>
<?php
	}
?>
        </li>
      </ul>
    </ul>
    <a class="ucl-tg-a" href="view<?php echo $page_ext_qry ?>id=<?php echo $addr->getId() ?>"><div class="ucl-tg-arrow"></div></a>
  </div>
</div>
<?php
}
?>
<div class="list-bb"></div>
</section>

<article class="">
<div id="pages">
	<ol>
		<?php
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
		<?php
		} else {
		?>
		<li>&#8249;</li>
		<?php
		}
		if ($curpage == 0) {
		?>
			<li id="here">1</li>
		<?php
			$page = 1;
		} else {
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=0&page=1">1</a></li>
		<?php
		}
		if ($curpage - 2 > 1) {
		?>
			<li>…</li>
		<?php
		}
		for ($i = $page; $i < $page + 5 && $i < $allpages; ++$i) {
			if ($i == $curpage) {
		?>
		<li id="here"><?php echo $i + 1 ?></li>
		<?php
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
		<?php
			}
		}
		if ($page + 4 < $allpages) {
		?>
			<li>…</li>
		<?php
		}
		if ($i < $allpages) {
		?>
		<li><a href="<?php echo $_SERVER['PHP_SELF'] ?>?start=<?php echo ($allpages * $pagesize) . "&page=" . $np ?>"><?php echo $allpages ?></a></li>
		<?php
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
		<?php
		} else {
		?>
		<li>&#155;</li>
		<?php
		}
		?>
	</ol>
</div>
</article>

<footer>
<p>Copyright &copy; ASJ Inc. All Rights Reserved.</p>
</footer>

</body>
</html>
