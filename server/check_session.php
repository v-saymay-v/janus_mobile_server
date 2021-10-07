<?php
include ("../../data/room/sns_keys.php");
require ("vendor/autoload.php");
require_once("simplehtmldom/simple_html_dom.php");

use Abraham\TwitterOAuth\TwitterOAuth;

class CheckSession
{
    private $signType = NULL;
    private $signToken = NULL;
    private $signSecret = NULL;
    private $hotbizMails = NULL;

    function __construct($type, $token, $secret) {
        $this->signType = $type;
        $this->signToken = $token;
        $this->signSecret = $secret;
    }

    function checkValid($server, $hotbiz, $snsid) {
        switch ($this->signType) {
            case 'facebook':
                return $this->verifyFacebookToken();
            case 'twitter':
                return $this->verifyTwitterToken();
            case 'google':
                return $this->verifyGoogleToken();
            case 'apple':
                return $this->verifyAppleToken();
            case 'guest':
                return $this->verifyGuestToken();
            default:
                return FALSE;
        }
    }

    public function getMails() {
        return $this->hotbizMails;
    }

    private function verifyFacebookToken() {
        global $Facebook_keys;
        $url = "https://graph.facebook.com/debug_token?input_token=".$this->signTtoken."&access_token=".$Facebook_keys['appId']."|".$Facebook_keys['appSecret'];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $responseJson = curl_exec($ch);
        curl_close($ch);

        $response = json_decode($responseJson);
        if (isset($response['data'])&&isset($response['data']['is_valid'])) {
            return $response['data']['is_valid'];
        }
        return FALSE;
    }

    private function verifyTwitterToken() {
        global $Twitter_keys;
        $connection = new TwitterOAuth($Twitter_keys['consumer_key'], $Twitter_keys['consumer_secret'], $this->signToken, $this->signSecret);
        $content = $connection->get("account/verify_credentials"/*, array('include_entities'=> 'false', 'include_email'=> 'true')*/);
        $user = json_decode(json_encode($content), true);
        return isset($user['id_str'])&&$user['id_str']!='';
    }

    private function verifyGoogleToken() {
        $url = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=".$this->signToken;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $responseJson = curl_exec($ch);
        curl_close($ch);

        $response = json_decode($responseJson);
        $data = $response['exp'];
        return ($data && $data!='');
    }

    private function verifyAppleToken() {
        return TRUE;
    }

    private function verifyGuestToken() {
        return TRUE;
    }
}
?>
