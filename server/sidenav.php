<div class="side_nav">
  <div class="img_box logo"><a href="index.html"><img src="images/logo.png" alt="HotRoom"></a></div>
  <div class="pic" id="pic">
    <div class="icon_profile"><img id="headerPic" src="<?php echo $photo_image ?>" alt="プロフィール画像"></div>
    <input id="acd_profile" type="checkbox">
    <label for="acd_profile" class="acd_head name"><?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?></label>
    <ul class="acd_box">
      <li class="list_ttl">
        <a id="profile-menu-item-profile" href="./index.php" class="profile avator-menu-item" tabindex="-1">
          <b><?php echo isset($app->loggedInUser)?$app->loggedInUser->groupname:'' ?></b>
          <?php echo isset($app->loggedInUser)?$app->loggedInUser->email:'' ?>
        </a>
      </li>
      <li class="list_ttl">
        <a href="javascript:0" class="list_ttl rr btn-logout avator-menu-item" id="btnVideoCallList" tabindex="-1">ビデオコール</a>
      </li>
      <li class="list_ttl">
        <a href="javascript:0" class="list_ttl rr btn-logout avator-menu-item" id="btnVoiceMailList" tabindex="-1">ボイスメール</a>
      </li>
    </ul>
    <div class="btn_ghost_w"><a href="logout.php" class="list_ttl rr btn-logout avator-menu-item" tabindex="-1">サインアウト</a></div>
  </div>
  <ul class="side_nav_list">
    <li class="side_nav_list_item">
      <ul>
        <li class="list_head">個人</li>
        <li class="list_ttl<?php echo $myname=='index.php'?' is-active':''?>"><a href="./index.php">プロフィール</a></li>
        <li class="list_ttl<?php echo $myname!='index.php'?' is-active':''?>"><a href="./meeting.php">ミーティング</a></li>
      </ul>
    </li>
<?php
if (isset($app->loggedInUser) && $app->loggedInUser->is_admin) {
?>
    <li class="side_nav_list_item">
      <ul>
        <li class="list_head">管理</li>
        <li class="list_ttl">
          <input id="acd_user" type="checkbox">
          <label for="acd_user" class="acd_head">ユーザー管理</label>
          <ul class="acd_box">
            <li class="list_ttl"><a href="admin/admin_users.php">ユーザー</a></li>
            <li class="list_ttl"><a href="admin/admin_departs.php">グループ管理</a></li>
          </ul>
        </li>
        <li class="list_ttl">
          <input id="acd_room" type="checkbox">
          <label for="acd_room" class="acd_head">ルーム管理</label>
          <ul class="acd_box">
            <li class="list_ttl"><a href="#">#</a></li>
            <li class="list_ttl"><a href="#">#</a></li>
          </ul>
        </li>
        <li class="list_ttl"><a href="#">アカウント管理</a></li>
        <li class="list_ttl"><a href="#">詳細</a></li>
      </ul>
    </li>
<?php
}
?>
  </ul>
</div>
