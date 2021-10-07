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
    let oauth_verifier = getQueryVariable("oauth_verifier");
    let oauth_token = getQueryVariable("oauth_token");
    localStorage.setItem("oauth_verifier", oauth_verifier);
    localStorage.setItem("oauth_token", oauth_token);
    let request = new XMLHttpRequest;
    request.onload = function (event) {
       if (request.readyState === 4) {
          if (request.status === 200) {
             console.log(request.statusText); // success
             console.log(request.response);
             let data_json = JSON.parse(request.response);
             if (data_json.oauth_token_secret)
               localStorage.setItem("oauth_token_secret", data_json.oauth_token_secret);
             if (data_json.oauth_token)
               localStorage.setItem("oauth_token", data_json.oauth_token);
             if (data_json.data && data_json.data.name)
               localStorage.setItem("twitter_name", data_json.data.name);
             if (data_json.data && data_json.data.profile_image_url_https)
               localStorage.setItem("twitter_profile_image_url", data_json.data.profile_image_url_https);
             loginToBizCard('twitter', data_json.oauth_token, data_json.oauth_token_secret, data_json.data.id);
          } else {
             console.log(request.statusText); // error
          }
       }
    };
    request.onerror = function (event) {
       console.log(event.type); // error
    };
    request.open("GET", 'https://'+janusMobileHost+':'+janusMobilePort+'/twitterat/'+localStorage.getItem("request_token")+'/'+localStorage.getItem("request_token_secret")+'/'+oauth_verifier, true);
    XMLHttpRequest.responseType = 'json';
    request.send();
}

let getTokenKeys = (req_str)=>{
    let request = new XMLHttpRequest();
    if (req_str === 'request_token'){
         //イベントハンドラ設定
         request.onload = (event)=>{
             if (request.readyState === 4) {
                 if (request.status === 200) {
                     console.log(request.statusText); // success
                     console.log(request.response);
                     initTwitterOAuth(request.response);
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
         console.log(req_str);
     } else if (req_str === 'oauth_token'){
         //イベントハンドラ設定
        request.onload = (event)=>{
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request.statusText); // success
                    console.log(request.response);
                    twitterOAuth(request.response);
                } else {
                    console.log(request.statusText); // error
                }
            }
        };
        request.onerror = (event)=>{
            console.log(event.type); // error
        };
        request.open("GET", 'https://'+janusMobileHost+':'+janusMobilePort+'/twitterat', true);
        XMLHttpRequest.responseType = 'json';
        request.send(); 
        console.log(req_str);
    }
}

let initTwitterOAuth = (dataToken)=>{
    let dataTokens = JSON.parse(dataToken);
    console.log("dataToken: "+ dataToken);
    localStorage.setItem("consumer_key", dataTokens.consumer_key);
    localStorage.setItem("consumer_secret", dataTokens.consumer_secret);
    localStorage.setItem("request_token", dataTokens.oauth_token);
    localStorage.setItem("request_token_secret", dataTokens.oauth_token_secret);
    location.href = dataTokens.oauth_uri;
}
