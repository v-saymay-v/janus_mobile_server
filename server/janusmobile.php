<?php
require_once("app.php");
$app = new room_app();

$param = '';
foreach($_POST as $key => $val) {
    if ($param == '') {
        $param .= "?";
    } else {
        $param .= "&";
    }
    $param .= $key."=".urlencode($val);
}
$location = "intent://callback".$param.'#Intent;package=jp.asj.biz_access;scheme=signinwithapple;end';
//$location = "signinwithapple://callback".$param.'#Intent;package=jp.asj.biz_access;scheme=signinwithapple;end';
syslog(LOG_INFO, __FILE__."(".__LINE__."):".$location);
header("Location: ".$location, TRUE, 307);
//header("Location: ".$location);
exit();
?>
