</head>
<body>

  <header class="head-nav">
  <nav>
	  <div id="menu-logo"><a href="<?php echo getIndexPhp() ?>"><span class="logo"><img src="common/images/logo.png" alt="BusinessCardManagement"></span></a></div>
	  <div class="rightset">
      <?php
      $photo = empty($user_photo) ? "common/images/user_img01.png" : $user_photo;
      ?>
  		<div class="relative rightset-btn"><a href="user.php" class=""><span class="nav_u_img"><img src="<?php echo $photo ?>" width="32" height="32" alt=""></span><?php echo $fullname ?></a></div>
  		<div class="rightset-btn">
        <form name="logout" method="post">
          <input type="hidden" name="logout" value="yes" />
          <a href="#" onClick="document.logout.submit();"><span class="rightset-logout-btn">ログアウト</span></a>
        </form>
      </div>
      <div class="rightset-btn"><a href="#"><span class="rightset-help-btn"></span></a></div>
	  </div>
  </nav>
  </header>
