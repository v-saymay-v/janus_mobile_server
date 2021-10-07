<header class="head-nav">
<form name="logoutform" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
	<input type="hidden" name="logout" value="yes">
	<nav>
		<?
		$photo = (!empty($selfphoto)&&!empty($phototype)?'data:'.$phototype.';base64,'.$selfphoto:'common/images/user_img.png');
		$sortby = $_SESSION['sortbysp'];
		$sortdir = $_SESSION['sortdirsp'];
		$searchstring = $_SESSION['searchstringsp'];
		$start = $_SESSION["startsp"];
		$index = 'index.php?sortby='.$sortby.'&sortdir='.$sortdir.'&start='.$start.'&searchstring='.$searchstring;
		?>
		<div id="menu-logo"><a href="<?php echo $index ?>"><span class="logo"><img src="common/images/logo.png" alt="BusinessCardManagement"></span></a></div>
		<div class="rightset">
			<div class="relative rightset-btn"><a href="user.php?id=<?php echo $user_id ?>" class=""><span class="nav_u_img"><img src="<?php echo $photo ?>" width="32" height="32" alt="<?php echo $fullname ?>"></span></a></div>
			<div class="rightset-btn"><a href="#" onClick="document.logoutform.submit(); return false"><span class="rightset-logout-btn">ログアウト</span></a></div>
			<div class="rightset-btn"><a href="#"><span class="rightset-help-btn"></span></a></div>
		</div>
	</nav>
</form>
</header>
