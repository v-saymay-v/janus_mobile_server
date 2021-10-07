const IS_DEBUG = true;
const janusMobileHost = 'www.yourcompany.com';
const janusMobilePort = IS_DEBUG ? '7443' : '9443';

function parseJSON(json) {
	try {
		return JSON.parse(json);
	} catch (e) {
		trace("Error parsing json: " + json);
	}
	return null;
};

var webrtcUtils = {
	log: function() {
		// suppress console.log output when being included as a module.
		if (typeof module !== 'undefined' ||
			typeof require === 'function' && typeof define === 'function') {
			return;
		}
		console.log.apply(console, arguments);
	},
	extractVersion: function(uastring, expr, pos) {
		var match = uastring.match(expr);
		return match && match.length >= pos && parseInt(match[pos], 10);
	}
};

var Base64 = {
	encode: function(str) {
		return btoa(unescape(encodeURIComponent(str)));
	},
	decode: function(str) {
		return decodeURIComponent(escape(atob(str)));
	}
};

function trace(text) {
	// This function is used for logging.
	if (text[text.length - 1] === '\n') {
		text = text.substring(0, text.length - 1);
	}
	if (window.performance) {
		var now = (window.performance.now() / 1000).toFixed(3);
		webrtcUtils.log(now + ': ' + text);
	} else {
		webrtcUtils.log(text);
	}
};

function toggleClass(element, className) {
	if (!element || !className){
		return;
	}
	var classString;
	if (!element.className) {
		return false;
	} else if (typeof element.className !== 'string') {
		if (typeof element.className.baseVal === 'string') {
			classString = element.className.baseVal;
		} else if (typeof element.className.animVal === 'string') {
			classString = element.className.animVal;
		}
	} else {
		classString = element.className;
	}
	var nameIndex = hasClass(element, className);
	if (!nameIndex) {
		classString += ' ' + className;
	} else {
		classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
	}
	if (typeof element.className !== 'string') {
		if (typeof element.className.baseVal === 'string') {
			element.className.baseVal = classString;
		}
		if (typeof element.className.animVal === 'string') {
			element.className.animVal = classString;
		}
	} else {
		element.className = classString;
	}
};

function hide_(element) {
	if (element && element.classList) {
		element.classList.add("hidden");
	} else if (!hasClass(element, "hidden")) {
		toggleClass(element, "hidden");
	}
};

function show_(element) {
	if (element && element.classList) {
		element.classList.remove("hidden");
	} else if (hasClass(element, "hidden")) {
		toggleClass(element, "hidden");
	}
};

function EncodeHTMLForm( data ) {
    var params = [];
    for ( var name in data ) {
        var value = data[ name ];
        var param = encodeURIComponent( name ) + '=' + encodeURIComponent( value );
        params.push( param );
    }
    return params.join( '&' ).replace( /%20/g, '+' );
}

function loginToHotBiz(url, userid, pass, finishfunc) {
	var parts;
	var hbhost;
	var reqUrl;
	var referer;
	var roomId;
	try {
		var parser = new URL(url);
		parts = parser.pathname.split('/');
		reqUrl = 'https://' + parser.host + '/' + parts[1] + '/hb_chat_login.cgi';
		referer = 'https://' + parser.host + '/' + parts[1] + '/hb_login.cgi';
		roomId = parts[1];
		bahost = parser.host;
	} catch (e) {
		parts = url.split('/');
		reqUrl = 'https://' + parts[2] + '/' + parts[3] + '/hb_chat_login.cgi';
		referer = 'https://' + parts[2] + '/' + parts[3] + '/hb_login.cgi';
		roomId = parts[3];
		bahost = parts[2];
	}
	var postUrl = 'https://www.yourcompany.com:' + janusMobilePort + '/request/POST/' + encodeURIComponent(reqUrl) + '/' + encodeURIComponent(referer);
	var data = {'user' : userid, 'pass' : pass, 'login' : 'ログイン'};
	var req = new XMLHttpRequest();
	req.open('POST', postUrl);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) {
			trace('ready state is ' + req.readyState);
		} else if (req.status != 200 && req.status != 301 && req.status != 302) {
			trace('http error: status ' + req.status);
			if (finishfunc)
				finishfunc('HTTP request status: ' + req.status);
		} else {
			trace(req.responseText);
			var pos = req.responseText.indexOf('hotbiz://?');
			if (pos < 0) {
				if (finishfunc)
					finishfunc('bad returned data:' + req.responseText);
				return;
			}
			var str = req.responseText.substr(pos + 'hotbiz://?'.length);
			pos = str.indexOf('">');
			if (pos < 0) {
				if (finishfunc)
					finishfunc('bad returned data:' + req.responseText);
				return;
			}
			var name;
			var session;
			var photo;
			var userId;
			var paramstr = str.substr(0, pos).replace(/&amp;/g, '&');
			var params = paramstr.split('&');
			for (var idx in params) {
				var param = params[idx];
				var keyval = param.split('=');
				keyval[0] = keyval[0].replace(/^\s+|\s+$/g, '');
				keyval[1] = keyval[1].replace(/^\s+|\s+$/g, '');
				if (keyval[0] == 'name') {
					name = decodeURIComponent(keyval[1]).replace(/\+/g, ' ');
				} else if (keyval[0] == 'session') {
					session = keyval[1];
				} else if (keyval[0] == 'url') {
					photo = keyval[1];
				}
			}
			try {
				parser = new URL(decodeURIComponent(photo));
				if (parser.searchParams.has("user")) {
					userId = parser.searchParams.get("user");
				}
			} catch (exp) {
				var parts = decodeURIComponent(photo).split('/');
				var params = parts[parts.length - 1];
				var search = params.split('?');
				var keyvals = search[1].split('&');
				for (var idx in keyvals) {
					var keyval = keyvals[idx];
					var parts = keyval.split('=');
					if (parts[0] === 'user') {
						userId = parts[1];
						break;
					}
				}
			}
			if (name && session && photo && userid) {
				getHotBizImage(photo, session, userid, function(blob) {
					finishfunc(null, roomId, userid, name, session, blob);
				});
			} else {
				finishfunc('failed to login');
			}
		}
	};
	req.send(EncodeHTMLForm(data));
}

function getHotBizImage(url, session, userid, callback) {

	let xhr = new XMLHttpRequest();
	var baurl = 'https://www.yourcompany.com:'+janusMobilePort+'/hotbizimg/'+encodeURIComponent(url)+'/'+session+'/'+userid;
	xhr.open('GET', baurl); // the third parameter is true by default
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4)
			return;
		if (xhr.status != 200) {
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			var obj = parseJSON(xhr.responseText);
			var blob = new Blob([new Uint8Array(obj.image.data)], {type: obj.type});
			callback(blob);
		}
	}
	xhr.send(); // (1)
}

function createBizCardUser(cert, token, secret, userid, hotbiz) {
	var params = {
		os_type: 'web',
		cert_type: cert,
		sns_token: token,
		sns_secret: secret,
		device_token: '',
		push_token: '',
		userid: userid,
		hotbiz_user: hotbiz
	};

	let xhr = new XMLHttpRequest();
	var baurl = 'https://www.yourcompany.com:'+janusMobilePort+'/createuser';
	xhr.open('POST', baurl); // the third parameter is true by default
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4)
			return;
		if (xhr.status != 200) {
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			var obj = parseJSON(xhr.responseText);
			if (obj) {
				if (obj.result !== 'ok') {
					alert(obj.params.error);
				} else {
					//localStorage.setItem("bizcard_userid", obj.bizcard_userid);
					//localStorage.setItem("bizcard_token", obj.bizcard_token);
					document.cookie['uin'] = obj.bizcard_token;
					document.cookie['uid'] = obj.bizcard_userid;
					location.href = "index.html";
				}
			}
		}
	}
	xhr.send(JSON.stringify(params)); // (1)
}

function loginToBizCard(cert, token, secret, userid, hotbiz) {

	var params = {
		os_type: 'web',
		cert_type: cert,
		sns_token: token,
		sns_secret: secret,
		device_token: '',
		push_token: '',
		userid: userid,
		hotbiz_user: hotbiz
	};

	let xhr = new XMLHttpRequest();
	var baurl = 'https://www.yourcomapny,com:'+janusMobilePort+'/loginuser';
	xhr.open('POST', baurl); // the third parameter is true by default
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4)
			return;
		if (xhr.status != 200) {
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			var obj = parseJSON(xhr.responseText);
			if (obj) {
				if (obj.result !== 'ok') {
					if (obj.params.error == 'user not found') {
						setTimeout(function() {
							createBizCardUser(cert, token, secret, userid, hotbiz);
						}, 100);
					} else {
						alert(obj.params.error);
					}
				} else {
					//localStorage.setItem("bizcard_userid", obj.bizcard_userid);
					//localStorage.setItem("bizcard_token", obj.bizcard_token);
					document.cookie['uin'] = obj.bizcard_token;
					document.cookie['uid'] = obj.bizcard_userid;
					location.href = "index.html";
				}
			}
		}
	}
	xhr.send(JSON.stringify(params)); // (1)
}
