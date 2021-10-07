<header>
  <div class="head is-sp"><div class="img_box logo"><a href="index.html"><img src="images/logo.png" alt="HotRoom"></a></div><div class="menu"><span></span></div></div>
  <nav class="gnav">
    <ul class="gnav_list">
      <li class="list_ttl"><a href="./schedule.php"><img src="images/icon_nav_schedule.png" alt="">ミーティングを予定</a></li>
      <li class="list_ttl"><a href="./room.php?roomId=<?php echo isset($app->loggedInUser)?$app->loggedInUser->privateroom:'' ?>"><img src="images/icon_nav_hostmeeting.png" alt="">ミーティングを開催</a></li>
      <li class="list_ttl acd_head">
        <img src="images/icon_nav_hostmeeting.png" alt="">ミーティングに参加
        <ul id="joinMeetingDropdown" class="acd_box dropdown-menu" style="">
<?php
$stmt = $app->mysqli->prepare("SELECT T1.c_meeting,T2.c_disp_name from ht_meeting T1,ht_user T2 where T2.n_user = T1.n_host and T2.b_delete = 0 and T1.b_private != 0");
if ($stmt) {
$result = $stmt->execute();
$stmt->bind_result($meetingid, $username);
while($stmt->fetch()) {
?>
          <li class="list_ttl"><a href="./room.php?roomId=<?php echo $meetingid ?>"><?php echo $username ?>さんのルーム</a></li>
<?php
}
$stmt->close();
}
?>
        </ul>
      </li>
      <li id="makevideocall" class="list_ttl acd_head<?php echo $videoCalling?' hide':'' ?>">
        <img src="images/icon_nav_videocall.png" alt="">ビデオコール
        <ul  id="videocallDropdown" class="acd_box dropdown-menu" style="">
          <!--
          <li class="list_ttl"><a href="#">#</a></li>
          <li class="list_ttl"><a href="#">#</a></li>
          -->
        </ul>
      </li>
      <li id="videocalling" class="list_ttl acd_head<?php echo $videoCalling?'':' hide' ?>" style="display: none">
        <img src="images/icon_nav_videocall.png" alt="">コール中：<span id="callingto"><?php echo $videoCallingName ?></span>
        <ul id="callingDropdown" class="acd_box">
          <li class="list_ttl"><a href="javascript:;" name="<?php echo $videoCallingTag ?>" id="cancelvideocall">切断</a></li>
        </ul>
      </li>
      <li class="list_ttl acd_head">
        <img src="images/icon_nav_sipcall.png" alt="">IP電話
        <ul class="acd_box">
          <li class="list_ttl"><a href="javascript:;" id="makeSipCall">番号指定</a></li>
          <li class="list_ttl"><div class="divider"></div></li>
          <li class="list_ttl"><a href="javascript:;" id="sipSetting">SIP設定...</a></li>
          <li class="list_ttl"><a href="./sipbook/index.php" target="_blank">連絡先...</a></li>
        </ul>
      </li>
      <li class="list_ttl acd_head">
        <img src="images/icon_nav_voicemail.png" alt="">ボイスメール
        <ul id="voicemailDropdown" class="acd_box dropdown-menu" style="">
          <!--
          <li class="list_ttl"><a href="#">#</a></li>
          <li class="list_ttl"><a href="#">#</a></li>
          -->
        </ul>
      </li>
    </ul>
  </nav>
</header>
