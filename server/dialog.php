<input type="hidden" id="user_id" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->user_id:'' ?>">
<input type="hidden" id="isAdmin" value="<?php echo isset($app->loggedInUser)&&$app->loggedInUser->is_admin?'true':'false' ?>">
<input type="hidden" id="displayName" value="<?php echo isset($app->loggedInUser)?$app->loggedInUser->displayname:'' ?>">
<input type="hidden" id="sipServer" value="<?php echo isset($sipserver)?$sipserver:'' ?>">
<input type="hidden" id="sipUsername" value="<?php echo isset($sipusername)?$sipusername:'' ?>">
<input type="hidden" id="sipAuthuser" value="<?php echo isset($sipauthuser)?$sipauthuser:'' ?>">
<input type="hidden" id="sipDisplayname" value="<?php echo isset($sipdisplayname)?$sipdisplayname:'' ?>">
<input type="hidden" id="sipPassword" value="<?php echo isset($sippassword)?$sippassword:'' ?>">
<input type="hidden" id="sipRegisterset" value="<?php echo isset($registerset)?$registerset:'' ?>">
<input type="hidden" id="voiceMailTag" value="<?php echo $voiceMailTag ?>">

<audio id="ringtone" loop>
  <source src="audio/household_telephone_digital_ring_002.mp3" type="audio/mp3">
</audio>
<audio id="ringbacktone" loop>
  <source src="audio/household_telephone_digital_ring_back.mp3" type="audio/mp3">
</audio>

<div id="login-dialog" class="dialog-div">
  <p><input id="mailaddr" type="email" placeholder="メールアドレス"></p>
  <p><input id="password" type="password" placeholder="パスワード"></p>
</div>

<div id="error-dialog" class="dialog-div">
  <p><span id="errormess"></span></p>
</div>

<div id="notification-dialog" class="dialog-div">
  <p><span>Roomビデオコールの通知を受け取るため、通知機能を許可してください</span></p>
</div>

<div id="voicemail" class="dialog-div">
  <div>
    <h3>「録音」ボタンをクリックするとメッセージの録音を開始します</h3>
  </div>
  <div>
    <div>
      <button class="btn btn-xs btn-danger margin-sm" autocomplete="off" id="record">録音</button>
      <span id="recordmess">ボタンをクリック後、約10秒でボイスメールが保存されます。</span>
    </div>
    <div id="playdone" class="alert alert-success hide">ボイスメールが録音されました。<br>
      再生するには<a href="javascript:;" class="listenvoicemail">ここ</a>をクリックしてください。<br>
      ダウンロードするには<a id="downloadvoicemail" href="javascript:;" target="_blank" class="alert-link">ここ</a>をクリックしてください。
    </div>
  </div>
</div>

<div id="playvoicemail" class="dialog-div">
  <div>ボイスメールを再生します<button name="<?php echo $voiceMailTag ?>" class="listenvoicemail hide">再生</button></div>
</div>

<div id="incoming-call-dlg" class="dialog-div">
  <span id="incoming-from"></span>さんからのビデオコール着信です
</div>

<div id="calling-dlg" class="dialog-div">相手の応答を待っています</div>

<div id="siplogin" class="dialog-div">
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-cloud-upload-alt fa-fw"></i></span>
    <input class="form-control" type="text" placeholder="SIP Registrar (e.g., sip:host:port)" value="<?php echo isset($sipserver)?$sipserver:'' ?>" autocomplete="off" id="server" />
  </div>
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
    <input class="form-control" type="text" placeholder="SIP Identity (e.g., sip:goofy@example.com)" value="<?php echo isset($sipusername)?$sipusername:'' ?>" autocomplete="off" id="username" />
  </div>
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-user-plus fa-fw"></i></span>
    <input class="form-control" type="text" placeholder="Username (e.g., goofy, overrides the one in the SIP identity if provided)" value="<?php echo isset($sipauthuser)?$sipauthuser:'' ?>" autocomplete="off" id="authuser" />
  </div>
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
    <input class="form-control" type="password" placeholder="Secret (e.g., mysupersecretpassword)" value="<?php echo isset($sippassword)?$sippassword:'' ?>" autocomplete="off" id="sipassword" />
  </div>
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-quote-right fa-fw"></i></span>
    <input class="form-control" type="text" placeholder="Display name (e.g., Alice Smith)" value="<?php echo isset($sipdisplayname)?$sipdisplayname:(isset($app->loggedInUser)?$app->loggedInUser->displayname:'') ?>" autocomplete="off" id="sipdispname" />
  </div>
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-toolbox fa-fw"></i></span>
    <p>
      <input type="radio" autocomplete="off" name="regoption" class="registerset" value="secret" style="margin-left: 10px"<?php echo isset($registerset)&&$registerset=='secret'?' checked':'' ?> />
      <a href="javadcript:;" title="Using this approach you'll provide a plain secret to REGISTER" style="margin-left: 5px">Register using plain secret</a>
    </p>
    <p>
      <input type="radio" autocomplete="off" name="regoption" class="registerset" value="ha1secret" style="margin-left: 10px"<?php echo isset($registerset)&&$registerset=='ha1'?' checked':'' ?> />
      <a href="javadcript:;" title="Using this approach might not work with Asterisk because the generated HA1 secret could have the wrong realm" style="margin-left: 5px">Register using HA1 secret</a>
    </p>
    <p>
      <input type="radio" autocomplete="off" name="regoption" class="registerset" value="guest" style="margin-left: 10px"<?php echo isset($registerset)&&$registerset=='guest'?' checked':'' ?> />
      <a href="javadcript:;" title="Using this approach you'll try to REGISTER as a guest, that is without providing any secret" style="margin-left: 5px">Register as a guest (no secret)</a>
    </p>
  </div>
</div>

<div id="sipcalldlg" class="dialog-div">
  <!--
  <button id="addhelper" class="btn btn-xs btn-info pull-right" title="Add a new line">
    <i class="fa fa-plus"></i>
  </button>
  -->
  <div class="input-group margin-bottom-sm">
    <span class="input-group-addon"><i class="fa fa-phone fa-fw"></i></span>
    <input class="form-control" type="text" placeholder="SIP URI to call (e.g., sip:1000@example.com)" autocomplete="off" id="peer" onkeypress="return checkEnter(this, event);" />
  </div>
  <button class="btn btn-success margin-bottom-sm" autocomplete="off" id="sipcall">Call</button> <input autocomplete="off" id="dovideo" type="checkbox" />Use Video
</div>

<div id="videocalllist" class="dialog-div">
  <div class="mtg-list-header clearfix" style="width: 700px">
    <div class="list-col mtg-checkbox">&nbsp;</div>
    <div class="list-col mtg-id">発着</div>
    <div class="list-col mtg-topic">相手</div>
    <div class="list-col mtg-date">日付 <span class="sorting sort-headers"></span></a></div>
    <div class="list-col mtg-id">応答</div>
    <div class="list-col mtg-action"> &nbsp; </div>
  </div>
  <div class="mtg-list-content" id="videocalls" style="width: 700px">
  </div>
</div>

<div id="videocall" class="dialog-div">
  <div>
    <div>
      <div>
        <h3>ローカル
          <div>
            <button id="toggleaudio">音声オフ</button>
            <button id="togglevideo">映像オフ</button>
            <div>
              <button autocomplete="off" id="bitrateset">送信帯域<span class="caret"></span></button>
              <ul id="bitrate">
                <li><a href="#" id="0">無制限</a></li>
                <li><a href="#" id="128">最大128KB</a></li>
                <li><a href="#" id="256">最大256KB</a></li>
                <li><a href="#" id="512">最大512KB</a></li>
                <li><a href="#" id="1024">最大1MB</a></li>
                <li><a href="#" id="1500">最大1.5MB</a></li>
                <li><a href="#" id="2000">最大2MB</a></li>
              </ul>
            </div>
          </div>
        </h3>
      </div>
      <div id="videoleft"></div>
    </div>
    <div>
      <span><i></i></span>
      <input type="text" placeholder="Write a DataChannel message to your peer" autocomplete="off" id="datasend" onkeypress="return checkEnter(this, event);" disabled />
    </div>
  </div>
  <div>
    <div>
      <div>
        <h3>リモート <span id="callee"></span> <span class="hide" id="curres"></span> <span class="hide" id="curbitrate"></span></h3>
      </div>
      <div id="videoright"></div>
    </div>
    <div>
      <span><i></i></span>
      <input type="text" id="datarecv" disabled />
    </div>
  </div>
</div>

<div id="changePictureDialog" class="dialog-div">
  <div class="content">
    <p>ファイルのサイズが2MBより小さいJPG/JPEG、GIF、PNG画像ファイルを選び、アップロードしてから、ご自分のプロフィール写真用に切り取ってください。</p>
    <div class="alert-danger hide"></div>
    <div>
      <div class="original-container">
        <img src="<?php echo $photo_image ?>" alt="プロフィール画像を変更する">
        <div class="loading"><i class="busy"></i> <span>写真を読み込み中・・・</span></div>
      </div>
      <div class="preview-container">
        <img src="<?php echo $photo_image ?>" alt="プレビュー">
      </div>
    </div>
  </div>
  <div class="hide">
    <input type="file" id="file" name="file" data-url="./upload.php">
    <div class="upload-msg hide">アップロード中です・・・</div>
    <div class="fileupload-progress hide">
      <div class="progress">
        <div class="progress-bar" style="width:0%;"></div>
      </div>
    </div>
  </div>
</div>

<div id="voicemaillist" class="dialog-div">
  <div class="mtg-list-header clearfix" style="width: 700px">
    <div class="list-col mtg-checkbox">&nbsp;</div>
    <div class="list-col mtg-id">送受</div>
    <div class="list-col mtg-topic">相手</div>
    <div class="list-col mtg-date">日付 <span class="sorting sort-headers"></span></a></div>
    <div class="list-col mtg-id">既読</div>
    <div class="list-col mtg-action"> &nbsp; </div>
  </div>
  <div class="mtg-list-content" id="voicemails" style="width: 700px">
  </div>
</div>
