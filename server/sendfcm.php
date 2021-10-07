<?php
function sendFCM($push_token, $notification, $data) {
    $api_key  = "ここにFirebaseから割り当てられたAPI KEYを入力してください";
    $base_url = "https://fcm.googleapis.com/fcm/send";

    // toに指定しているのはトピック名:testに対して一括送信するという意味
    // 個別に送信したい場合はここに端末に割り振られたトークンIDを指定する
    $data = array(
        "to" => $push_token
        ,"priority"     => "high"
        ,"notification" => $notification    //array(
                                            //    "title" => "テスト送信タイトル"
                                            //    ,"body"  => "テスト送信本文"
                                            //)
        ,data => $data
    );
    $header = array(
        "Content-Type:application/json"
        ,"Authorization:key=".$api_key
    );
    $context = stream_context_create(array(
        "http" => array(
            'method' => 'POST'
            ,'header' => implode("\r\n",$header)
            ,'content'=> json_encode($data)
        )
    ));
    $response = file_get_contents($base_url, false, $context);
}
?>