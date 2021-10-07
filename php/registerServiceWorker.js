const APP_SERVER_KEY = "BBtNMALcHOX9ptE1TdF2Umdwn2d2mVkmH21XGaJFBfHwYOPtjAUGKY4FJRJSoIUpYsX0kusU0m26gcsyiqz5X6k";

// Public base64 to Uint
function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4),
		base64 = (base64String + padding)
			.replace(/\-/g, "+")
			.replace(/_/g, "/"),
		rawData = window.atob(base64),
		outputArray = new Uint8Array(rawData.length);
	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

//-------------------------------------------------------
// PushSubscription を生成して Application Server に送る
//-------------------------------------------------------
function subscribe(register, userid, errorcb, successcb) {
	// [通知]設定がデフォルトの場合は、ここで「許可 or ブロック」を聞いてくる
	// ブロックが選択された場合、この時点で例外が発生する
	// この Service Worker もまた APP_SERVER_KEY を保持することになる（復号に使う）
	// プッシュサービスも APP_SERVER_KEY を知れてしまうのでは？ → 問題ない
	// unsubscribe()された後で subscribe() すると、前回とは別の PushSubscription が生成される
	register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(APP_SERVER_KEY)
	}).then(function(subscription) {
    const key = subscription.getKey('p256dh');
    const token = subscription.getKey('auth');
    const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
    const params = {
      endpoint: subscription.endpoint,
      publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
      authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
      contentEncoding
    };
    const data = new FormData();
		data.set('userid', userid);
		data.set('subscription', JSON.stringify(params));
		fetch("./subscribe.php", {
			method: "POST",
			cache: 'no-cache',
			credentials:'include',
      body: data
		}).then((res) => res.json()).then((response) => {
			console.log('result code: '+response.result);
			console.log(response.result_string);
      console.log("PushSubscription が Application Server に送信されました。");
      if (successcb)
				successcb('正常に登録されました');
		});
	}).catch(function(err) {
		if (err.name == 'NotAllowedError') {
			console.log("通知がブロックされました。");
		}
		//console.table([{'Error name': err.name, 'Error message': err.message}]);
		const label = 'subscribe() Exception';
		console.group(label);
		console.error('Error name:', err.name);
		console.error('Error message:', err.message);
		console.error(err);
		console.groupEnd(label);
    if (err.name != 'InvalidStateError' && errorcb)
      errorcb('デスクトップ通知の登録に失敗しました('+err.message+')');
	});
}

function push_sendSubscriptionToServer(subscription, method, userid) {
  const key = subscription.getKey('p256dh');
  const token = subscription.getKey('auth');
  const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
  const params = {
    subscription: {
      endpoint: subscription.endpoint,
      publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
      authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
      contentEncoding,
    },
    userid: userid
  };

  return fetch('./subscribe.php', {
    method,
    body: JSON.stringify(params)
  }).then(() => subscription);
}

function checkServiceWorkerRegistered(dialogTag, userid, errorcb, successcb) {
  // Notification対応しているかどうか
  if (window.Notification) {
    // Permissionの確認
    if (navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === 'activated') {
      if (successcb)
        successcb('すでに登録済です');
    } else {
      var noteDialog = $('#'+dialogTag).dialog({
        modal: true, //モーダル表示
        title: "Roomビデオコール通知の許可", //タイトル
				resizable: false,
				width: "auto",
        buttons: { //ボタン
          "許可": function() {
            noteDialog.dialog('close');
            navigator.serviceWorker.register("service-worker.js")
            .then(function(register) {
              navigator.serviceWorker.ready.then(function() {
                // ブロックされていなければ、購読処理を実行する
                subscribe(register, userid, errorcb, successcb);
              });
            })
            .catch(function(err){
              if (errorcb)
                errorcb('サービスワーカーの登録に失敗しました('+err+')');
            });
          },
          "拒否": function() {
            if (successcb)
              successcb('中止しました');
          }
        }
      });
    }
  } else {
    if (errorcb)
      errorcb('お使いのブラウザはデスクトップ通知に対応していません');
  }
}
