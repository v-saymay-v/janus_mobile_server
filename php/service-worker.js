self.addEventListener("push", (event) => {

  if (event.data) {
    const iconUrl = new URL('./images/large_icon.png', self.location.origin).href;
    try {
      const data = event.data.json();
      // ServiceWorkerRegistration.showNotification()
      // Service Worker 内部からデスクトップ通知を表示する
      const promiseChain = self.registration.showNotification(data.title, {
        renotify: true,
        tag: data.tag,
        body: data.body,
        icon: iconUrl
      });
      event.waitUntil(promiseChain.then(function(evt) {
        //console.log(evt);
        if(evt && evt.notification) {
          setTimeout(function() {
            event.notification.close();
          }, 3000);
        }
      }));
    } catch(e) {
      const promiseChain = self.registration.showNotification("Push received", {
        renotify: true,
        tag: "tag",
        body: event.data.text(),
        icon: iconUrl
      });
      event.waitUntil(promiseChain.then(function(evt) {
        //console.log(evt);
        if(evt && evt.notification) {
          setTimeout(function() {
            event.notification.close();
          }, 3000);
        }
      }));
    }
  }
});

self.addEventListener('notificationclick', function(event) {
  //console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  var idx = event.notification.tag.indexOf('_');
  var func = event.notification.tag.substr(0, idx);

  var php;
  switch (func) {
    case 'videocall':
      php = 'answerpush.php';
      break;
    case 'voicemail':
      php = 'listenmail.php';
      break;
    case 'meeting':
      php = 'joinmeeting.php';
      break;
    default:
      php = 'index.php';
  }

  const urlToOpen = new URL('./', self.location.origin).href;
  const urlTarget = new URL('./'+php+'?tag='+event.notification.tag, self.location.origin).href;
  
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    let matchingClient = null;
  
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url.indexOf(urlToOpen) >= 0) {
        matchingClient = windowClient;
        break;
      }
    }
  
    if (matchingClient) {
      matchingClient.navigate(urlTarget);
      return matchingClient.focus();
    } else {
      return clients.openWindow(urlTarget);
    }
  });
  
  event.waitUntil(promiseChain);
});
