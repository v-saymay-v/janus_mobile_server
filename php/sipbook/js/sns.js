var followRequestScreenName = '';
var followRequestSuccessCB = null;

if ((window.location.search+"").match(/oauth_verifier/)) {
  let getQueryVariable = (variable)=>{
      let query = window.location.search.substring(1);
      let varbs = query.split("&");
      for (var i=0;i<varbs.length;i++) {
          var pair = varbs[i].split("=");
          if (pair[0] == variable) {
              return pair[1];
          }
      }
  }
  var auth_twitter = localStorage.getItem("auth_twitter")
  try {
    let auth_twitter_json = JSON.parse(auth_twitter);
    let oauth_verifier = getQueryVariable("oauth_verifier");
    let oauth_token = getQueryVariable("oauth_token");
    auth_twitter_json["oauth_verifier"] = oauth_verifier;
    auth_twitter_json["oauth_token"] = oauth_token;
    localStorage.setItem("auth_twitter", JSON.stringify(auth_twitter_json));
    let request = new XMLHttpRequest;
    request.onload = function (event) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.statusText); // success
          console.log(request.response);
          try {
            let data_json = JSON.parse(request.response);
            if (data_json.oauth_token_secret)
              auth_twitter_json["oauth_token_secret"] = data_json.oauth_token_secret;
            if (data_json.oauth_token)
              auth_twitter_json["oauth_token"] = data_json.oauth_token;
            if (data_json.data && data_json.data.id_str)
              auth_twitter_json["twitter_userid"] = data_json.data.id_str;
            if (data_json.data && data_json.data.name)
              auth_twitter_json["twitter_name"] = data_json.data.name;
            if (data_json.data && data_json.data.screen_name)
              auth_twitter_json["screen_name"] = data_json.data.screen_name;
            if (data_json.data && data_json.data.profile_image_url_https)
              auth_twitter_json["profile_image_url"] = data_json.data.profile_image_url_https;
            localStorage.setItem("auth_twitter", JSON.stringify(auth_twitter_json));
            if (followRequestScreenName != '') {
              followScreen(auth_twitter_json, followRequestScreenName, followRequestSuccessCB);
              followRequestScreenName = '';
            }
          } catch (e) {
          }
        } else {
          console.log(request.statusText); // error
        }
      }
    };
    request.onerror = function (event) {
      console.log(event.type); // error
    };
    request.open("GET", 'https://'+janusMobileHost+':'+janusMobilePort+'/twitterat/'+auth_twitter_json["request_token"]+'/'+auth_twitter_json["request_token_secret"]+'/'+oauth_verifier, true);
    XMLHttpRequest.responseType = 'json';
    request.send();
  } catch(e) {
  }
} else {
  var auth_twitter = localStorage.getItem("auth_twitter")
  if (!auth_twitter) {
    localStorage.setItem("auth_twitter", "{}");
  }
  var follow_twitter = localStorage.getItem("follow_twitter")
  if (!follow_twitter) {
    localStorage.setItem("follow_twitter", "[]");
  }
}

function followScreen(auth_twitter_json, screenName, successcb) {
  let request = new XMLHttpRequest();
  request.onload = (event)=>{
    if (request.readyState === 4) {
      if (request.status === 200) {
        try {
          let dataTokens = JSON.parse(request.response);
          console.log("dataToken: "+ dataTokens);
          if (dataTokens.result == 'ok') {
            var found = false;
            var follow_twitter = JSON.parse(localStorage.getItem("follow_twitter"));
            for (var i = 0; i < follow_twitter.length; ++i) {
              var follow = follow_twitter[i];
              if (follow.screen && follow.screen == screenName) {
                found = true;
                follow.connect = new Date();
                follow_twitter[i] = follow;
                break;
              }
            }
            if (!found) {
              var follow = {
                screen: screenName,
                connect: new Date()
              }
              follow_twitter.push(follow);
            }
            localStorage.setItem("follow_twitter", JSON.stringify(follow_twitter));
            successcb();
          }
        } catch (e) {
        }
      } else {
        console.log(request.statusText); // error
      }
    }
  };
  request.onerror = (event)=>{
    console.log(event.type); // error
  };
  request.open("GET", 'https://'+janusMobileHost+':'+janusMobilePort+'/twitterfl/'+auth_twitter_json["oauth_token"]+'/'+auth_twitter_json["oauth_token_secret"]+'/'+screenName, true);
  XMLHttpRequest.responseType = 'json';
  request.send();
}

let getTokenKeys = ()=>{
  let request = new XMLHttpRequest();
  request.onload = (event)=>{
    if (request.readyState === 4) {
      if (request.status === 200) {
        var auth_twitter = localStorage.getItem("auth_twitter");
        console.log(request.statusText); // success
        console.log(request.response);
        try {
          let auth_twitter_json = JSON.parse(auth_twitter);
          let dataTokens = JSON.parse(request.response);
          console.log("dataToken: "+ dataTokens);
          auth_twitter_json["consumer_key"] = dataTokens.consumer_key;
          auth_twitter_json["consumer_secret"] = dataTokens.consumer_secret;
          auth_twitter_json["request_token"] = dataTokens.oauth_token;
          auth_twitter_json["request_token_secret"] = dataTokens.oauth_token_secret;
          localStorage.setItem("auth_twitter", JSON.stringify(auth_twitter_json));
          location.href = dataTokens.oauth_uri;
        } catch (e) {
        }
      } else {
        console.log(request.statusText); // error
      }
    }
  };
  request.onerror = (event)=>{
    console.log(event.type); // error
  };
  request.open("GET", 'https://'+janusMobileHost+':'+janusMobilePort+'/twitterrt', true);
  XMLHttpRequest.responseType = 'json';
  request.send();
}

function loginTwitter(screenName, successcb) {
  var auth_twitter = localStorage.getItem("auth_twitter");
  try {
    let auth_twitter_json = JSON.parse(auth_twitter);
  	if (!auth_twitter_json["oauth_verifier"] ||
  		  !auth_twitter_json["oauth_token"] ||
  		  !auth_twitter_json["oauth_token_secret"]) {
      followRequestScreenName = screenName;
      followRequestSuccessCB = successcb;
      getTokenKeys();
    } else {
  		if (auth_twitter_json["twitter_name"])
  			console.log('twitter name: ' + auth_twitter_json["twitter_name"]);
  		if (auth_twitter_json["profile_image_url"])
  			console.log('twitter image: ' + auth_twitter_json["profile_image_url"]);
      followScreen(auth_twitter_json, screenName, successcb);
    }
  } catch (e) {
    localStorage.setItem("auth_twitter", "{}");
    followRequestScreenName = '';
    followRequestSuccessCB = null;
    getTokenKeys();
  }
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
    var auth_facebook = localStorage.getItem("auth_facebook");
    try {
      let auth_facebook_json = JSON.parse(auth_facebook);
	    var uid = response.authResponse.userID;
	    var accessToken = response.authResponse.accessToken;
		  auth_facebook_json["facebook_oauth_token"] = accessToken;
	    auth_facebook_json["facebook_user_id"] = uid;
      localStorage.setItem("auth_facebook", JSON.stringify(auth_facebook_json));
  		console.log('Welcome!  Fetching your information.... ');
  		FB.api('/me', function(response) {
  			console.log('Thanks for logging in, ' + response.name + '!');
        auth_facebook_json["facebook_name"] = response.name;
        localStorage.setItem("auth_facebook", JSON.stringify(auth_facebook_json));
  			FB.api('/'+response.id+'?fields=picture', function(response) {
          auth_facebook_json["facebook_image"] = response.picture.data.url;
          localStorage.setItem("auth_facebook", JSON.stringify(auth_facebook_json));
  			});
  		});
    } catch (e) {
    }
	} else if (response.status === 'not_authorized') {
	    // The user hasn't authorized your application.  They
	    // must click the Login button, or you must call FB.login
	    // in response to a user gesture, to launch a login dialog.
	} else {
	    // The user isn't logged in to Facebook. You can launch a
	    // login dialog with a user gesture, but the user may have
	    // to log in to Facebook before authorizing your application.
		console.log('Please log into this app.');
	}
}

/*
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}
*/

function loginFacebook() {
  var auth_facebook = localStorage.getItem("auth_facebook");
  try {
    let auth_facebook_json = JSON.parse(auth_facebook);
    if (!auth_facebook_json["facebook_oauth_token"] ||
  		  !auth_facebook_json["facebook_user_id"]) {
  	  FB.login(function(response) {
  	    statusChangeCallback(response);
  	  }, {scope: 'public_profile,email'});
    } else {
    }
  } catch (e) {

  }
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '653667311806856',
		cookie     : true,	// enable cookies to allow the server to access
							// the session
		xfbml      : true,	// parse social plugins on this page
		version    : 'v4.0' // The Graph API version to use for the call
	});

 // Now that we've initialized the JavaScript SDK, we call
 // FB.getLoginStatus().  This function gets the state of the
 // person visiting this page and can return one of three states to
 // the callback you provide.  They can be:
 //
 // 1. Logged into your app ('connected')
 // 2. Logged into Facebook, but not your app ('not_authorized')
 // 3. Not logged into Facebook and can't tell if they are logged into
 //    your app or not.
 //
 // These three cases are handled in the callback function.

	//FB.getLoginStatus(function(response) {
	//	statusChangeCallback(response);
	//});
  var auth_facebook = localStorage.getItem("auth_facebook")
  if (!auth_facebook) {
    localStorage.setItem("auth_facebook", "{}");
  }
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id))
		return;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
