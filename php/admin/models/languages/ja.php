<?php
/*
UserCake Version: 3.0.0

*/

/*
%m1% - Dymamic markers which are replaced at run time by the relevant index.
*/

$lang = array();

//Account
$lang = array_merge($lang,array(
	"ACCOUNT_SPECIFY_USERNAME"	=> "ユーザーIDを入力してください",
	"ACCOUNT_SPECIFY_PASSWORD"	=> "パスワードを入力してください",
	"ACCOUNT_SPECIFY_EMAIL"	=> "メールアドレスを入力してください",
	"ACCOUNT_EXISTS_EMAIL"	=> "メールアドレスは使用されています",
	"ACCOUNT_INVALID_EMAIL"	=> "メールアドレスとして正しくありません",
	"ACCOUNT_USER_OR_EMAIL_INVALID"	=> "ユーザーIDまたはメールアドレスが間違っています",
	"ACCOUNT_USER_OR_PASS_INVALID"	=> "ユーザーIDまたはパスワードが間違っています",
	"ACCOUNT_USER_OR_PASS_INVALID2"	=> "ユーザーIDまたはパスワードが間違っています(top_nav)",
	"ACCOUNT_ALREADY_ACTIVE"	=> "アカウントは既にアクティブです",
	"ACCOUNT_INACTIVE"	=> "アカウントは無効です。アクティブ化用のメールがスパムメールフォルダーに入っていないか確認してみてください",
	"ACCOUNT_USER_CHAR_LIMIT"	=> "ユーザー名は %m1% 文字以上 %m2% 文字以内で入力してください",
	"ACCOUNT_DISPLAY_CHAR_LIMIT"	=> "名前は %m1% 文字以上 %m2% 文字以内で入力してください",
	"ACCOUNT_PASS_CHAR_LIMIT"	=> "パスワードは %m1% 文字以上 %m2% 文字以内で入力してください",
	"ACCOUNT_TITLE_CHAR_LIMIT"	=> "役職は %m1% 文字以上 %m2% 文字以内で入力してください",
	"ACCOUNT_PASS_MISMATCH"	=> "パスワードが一致していません",
	"ACCOUNT_DISPLAY_INVALID_CHARACTERS"	=> "名前には記号は使えません",
	"ACCOUNT_USERNAME_IN_USE"	=> "ユーザーID %m1% は既に使われています",
	"ACCOUNT_DISPLAYNAME_IN_USE"	=> "名前 %m1% は既に使われています",
	"ACCOUNT_EMAIL_IN_USE"			=> "メールアドレス %m1% は既に使われています",
	"ACCOUNT_LINK_ALREADY_SENT"		=> "アクティブ化用のメールはこのメールアドレスに %m1% 時間前に送信されています",
	"ACCOUNT_NEW_ACTIVATION_SENT"		=> "アクティブ化用URLをすでにメールで送信済です。メールが届いていないか確認してください",
	"ACCOUNT_SPECIFY_NEW_PASSWORD"		=> "新しいパスワードを入力してください",
	"ACCOUNT_SPECIFY_CONFIRM_PASSWORD"	=> "確認用のパスワードを入力してください",
	"ACCOUNT_NEW_PASSWORD_LENGTH"		=> "新しいパスワードは %m1% 文字以上 %m2% 文字以内で入力してください",
	"ACCOUNT_PASSWORD_INVALID"		=> "現在のパスワードに誤りがあります",
	"ACCOUNT_DETAILS_UPDATED"		=> "アカウントの詳細が更新されました",
	"ACCOUNT_ACTIVATION_MESSAGE"		=> "ログインする前にアカウントをアクティブ化する必要があります。以下のURLを参照してください \n\n%m1%activate-account.php?token=%m2%",
	"ACCOUNT_ACTIVATION_COMPLETE"		=> "アカウントが正常にアクティブ化されました。以下のURLから<a href=\"../index.php\">ログイン</a>してください",
	"ACCOUNT_REGISTRATION_COMPLETE_TYPE1"	=> "正常に登録されました。以下のURLから<a href=\"../index.php\">ログイン</a>してください",
	"ACCOUNT_REGISTRATION_COMPLETE_TYPE2"	=> "正常に登録されました。アクティブ化用のメールを送信しましたので、ログインする前にアクティベーションを完了してください",
	"ACCOUNT_PASSWORD_NOTHING_TO_UPDATE"	=> "指定された新しいパスワードが現在のものと同一です",
	"ACCOUNT_PASSWORD_UPDATED"		=> "パスワードが更新されました",
	"ACCOUNT_EMAIL_UPDATED"			=> "メールアドレスが更新されました",
	"ACCOUNT_TOKEN_NOT_FOUND"		=> "トークンが存在しないか、あるいは、すでにアクティブ化済です。",
	"ACCOUNT_USER_INVALID_CHARACTERS"	=> "ユーザー名には記号は使用できません",
	"ACCOUNT_DELETIONS_SUCCESSFUL"		=> "%m1% 名のユーザーを正常に削除しました",
	"ACCOUNT_MANUALLY_ACTIVATED"		=> "アカウント %m1% はアクティブ化されました",
	"ACCOUNT_DISPLAYNAME_UPDATED"		=> "名前が %m1% に変更されました",
	"ACCOUNT_TITLE_UPDATED"			=> "%m1% の役職が %m2% に変更されました",
	"ACCOUNT_DIVISION_NOT_SELECTED"	=> "部署が選択されていません",
	"ACCOUNT_DIVISION_UPDATED"			=> "%m1% の部署が %m2% に変更されました",
	"ACCOUNT_PERMISSION_ADDED"		=> "%m1% への権限が追加されました",
	"ACCOUNT_PERMISSION_REMOVED"		=> "%m1% への権限が削除されました",
	"ACCOUNT_INVALID_USERNAME"		=> "ユーザー名に誤りがあります",
	"ACCOUNT_DEPART_UPDATED" => "部署名が更新されました",
	"ACCOUNT_MEMO_UPDATED" => "メモが更新されました",
	"ACCOUNT_MEETING_ID_LIMIT" => "個人ミーティングIDは %m1% 文字以内で入力してください",
	"ACCOUNT_INVALID_MEETING_ID" => "個人ミーティングIDに誤りがあります",
	"ACCOUNT_MEETING_ID_IN_USE" => "個人ミーティングID %m1% は既に使われています",
	"ACCOUNT_MEETING_ID_UPDATED" => "個人ミーティングIDが更新されました"
));

//Configuration
$lang = array_merge($lang,array(
	"CONFIG_NAME_CHAR_LIMIT"		=> "会社名は %m1% 文字以上 %m2% 文字以内で入力してください",
	"CONFIG_URL_CHAR_LIMIT"			=> "URLは %m1% 文字以上 %m2% 文字以内で入力してください",
	"CONFIG_EMAIL_CHAR_LIMIT"		=> "メールアドレスは %m1% 文字以上 %m2% 文字以内で入力してください",
	"CONFIG_ACTIVATION_TRUE_FALSE"		=> "メールによるアクティブ化は `true` か `false` を指定してください",
	"CONFIG_ACTIVATION_RESEND_RANGE"	=> "アクティブ化間隔は %m1% 時間以上 %m2% 時間以下で入力してください",
	"CONFIG_LANGUAGE_CHAR_LIMIT"		=> "言語パスは %m1% 文字以上and %m2% 文字以下で入力してください",
	"CONFIG_LANGUAGE_INVALID"		=> "指定された言語用ファイルは存在しません： `%m1%`",
	"CONFIG_TEMPLATE_CHAR_LIMIT"	=> "テンプレートパスは %m1% 文字以上 %m2% 文字以下で入力してください",
	"CONFIG_TEMPLATE_INVALID"		=> "指定されたテンプレート用ファイルは存在しません： `%m1%`",
	"CONFIG_EMAIL_INVALID"			=> "指定されたメールアドレスに誤りがあります",
	"CONFIG_INVALID_URL_END"		=> "サイトURLの最後は / にしてください",
	"CONFIG_UPDATE_SUCCESSFUL"		=> "設定が更新されました。設定を有効にするにはページをリロードする必要があります",
));

//Forgot Password
$lang = array_merge($lang,array(
	"FORGOTPASS_INVALID_TOKEN"		=> "アクティブ化用のトークンが正しくありません",
	"FORGOTPASS_NEW_PASS_EMAIL"		=> "新しいパスワードをメールで送信しました",
	"FORGOTPASS_REQUEST_CANNED"		=> "パスワードを忘れた場合の処理を中止しました",
	"FORGOTPASS_REQUEST_EXISTS"		=> "すでにパスワードを忘れた場合の処理を実行しています",
	"FORGOTPASS_REQUEST_SUCCESS"	=> "再アクティブ化の手順をメールで送信しました",
	));

//Mail
$lang = array_merge($lang,array(
	"MAIL_ERROR"				=> "メール送信に失敗しました。サーバー管理者に連絡してください",
	"MAIL_TEMPLATE_BUILD_ERROR"		=> "メールテンプレートの取得に失敗しました",
	"MAIL_TEMPLATE_DIRECTORY_ERROR"		=> "メールテンプレートのディレクトリが開けません。メール用のディレクトリを %m1% に変更してみてください",
	"MAIL_TEMPLATE_FILE_EMPTY"		=> "テンプレートファイルが空なのでメール送信できません",
	));

//Miscellaneous
$lang = array_merge($lang,array(
	"CAPTCHA_FAIL"				=> "セキュリティの質問に失敗しました",
	"CONFIRM"				=> "確認",
	"DENY"					=> "拒否",
	"SUCCESS"				=> "成功",
	"ERROR"					=> "エラー",
	"NOTHING_TO_UPDATE"			=> "更新するものがありません",
	"SQL_ERROR"				=> "SQLエラー",
	"FEATURE_DISABLED"			=> "この機能は現在ご利用になりません",
	"PAGE_PRIVATE_TOGGLED"			=> "このページは現在%m1%です",
	"PAGE_ACCESS_REMOVED"			=> "ページアクセス権限 %m1% が削除されました",
	"PAGE_ACCESS_ADDED"			=> "ページアクセス権限 %m1% が追加されました",
	));

//Permissions
$lang = array_merge($lang,array(
	"PERMISSION_CHAR_LIMIT"			=> "アクセス権限名は %m1% 文字以上 %m2% 文字以内で入力してください",
	"PERMISSION_NAME_IN_USE"		=> "アクセス権限名 %m1% は既に使われています",
	"PERMISSION_DELETIONS_SUCCESSFUL"	=> "アクセス権限 %m1% は正常に削除されました",
	"PERMISSION_CREATION_SUCCESSFUL"	=> "アクセス権限 `%m1%` は正常に追加されました",
	"PERMISSION_NAME_UPDATE"		=> "アクセス権限名 `%m1%` に変更されました",
	"PERMISSION_REMOVE_PAGES"		=> "ページ %m1% へのアクセス権限は正常に削除されました",
	"PERMISSION_ADD_PAGES"			=> "ページ %m1% へのアクセス権限は正常に追加されました",
	"PERMISSION_REMOVE_USERS"		=> "アクセス権限から %m1% 名を削除しました",
	"PERMISSION_ADD_USERS"			=> "アクセス権限に %m1% 名追加しました",
	"CANNOT_DELETE_NEWUSERS"		=> "デフォルトのグループ 'new user' は削除できません",
	"CANNOT_DELETE_ADMIN"				=> "デフォルトのグループ 'admin' は削除できません",
	));

//activate-account.php
$lang = array_merge($lang,array(
	"ACTIVATE_ACCOUNT_PHP_ACTIVATE_ACCOUNT" => "アカウントのアクティブ化"
));

//admin-configration.php
$lang = array_merge($lang,array(
	"ADMIN_CONFINGRATION_PHP_ADMIN_CONFINGRATION" => "設定",
	"ADMIN_CONFINGRATION_PHP_WEBSITE_NAME" => "会社名",
	"ADMIN_CONFINGRATION_PHP_WEBSITE_URL" => "会社URL",
	"ADMIN_CONFINGRATION_PHP_EMAIL" => "メール",
	"ADMIN_CONFINGRATION_PHP_ACTIVATION_THRESHOLD" => "アクティブ化間隔",
	"ADMIN_CONFINGRATION_PHP_LANGUAGE" => "言語",
	"ADMIN_CONFINGRATION_PHP_EMAIL_ACTIVATION" => "メールによるアクティブ化",
	"ADMIN_CONFINGRATION_PHP_SHOW_OTHERS" => "他ユーザーの名刺を表示",
	"ADMIN_CONFINGRATION_PHP_TEMPLATE" => "テンプレート",
));

//admin-page.php
$lang = array_merge($lang,array(
	"ADMIN_PAGE_PHP_ADMIN_PAGE" => "Admin Page",
	"ADMIN_PAGE_PHP_PAGE_INFORMATION" => "Page Information",
	"ADMIN_PAGE_PHP_NAME" => "Name",
	"ADMIN_PAGE_PHP_PRIVATE" => "Private",
	"ADMIN_PAGE_PHP_PAGE_ACCESS" => "Page Access",
	"ADMIN_PAGE_PHP_REMOTE_ACCESS" => "Remove Access",
	"ADMIN_PAGE_PHP_ADD_ACCESS" => "Add Access",
));

//admin-permission.php
$lang = array_merge($lang,array(
	"ADMIN_PERMISSION_PHP_ADMIN_PERMISSIONS" => "Admin Permissions",
	"ADMIN_PERMISSION_PHP_PERMISSION_INFORMATION" => "Permission Information",
	"ADMIN_PERMISSION_PHP_NAME" => "Name",
	"ADMIN_PERMISSION_PHP_DELETE" => "Delete",
	"ADMIN_PERMISSION_PHP_PERMISSION_MEMBERSHIP" => "Permission Membership",
	"ADMIN_PERMISSION_PHP_REMOVE_MEMBERS" => "Remove Members",
	"ADMIN_PERMISSION_PHP_ADD_MEMBERS" => "Add Members",
	"ADMIN_PERMISSION_PHP_PERMISSION_ACCESS" => "Permission Access",
	"ADMIN_PERMISSION_PHP_PUBLIC_ACCESS" => "Public Access",
	"ADMIN_PERMISSION_PHP_REMOVE_ACCESS" => "Remove Access",
	"ADMIN_PERMISSION_PHP_ADD_ACCESS" => "Add Access"
));

//admin-permissions.php
$lang = array_merge($lang,array(
	"ADMIN_PERMISSIONS_PHP_ADMIN_PERMISSIONS" => "Admin Permissions",
	"ADMIN_PERMISSIONS_PHP_DELETE" => "Delete",
	"ADMIN_PERMISSIONS_PHP_PERMISSION_NAME" => "Permission Name",
));

//admin-user.php
$lang = array_merge($lang,array(
	"ADMIN_USER_PHP_USER_INFORMATION" => "ユーザー情報",
	"ADMIN_USER_PHP_USERNAME" => "ユーザーID",
	"ADMIN_USER_PHP_EMAIL" => "メールアドレス",
	"ADMIN_USER_PHP_PASSWORD" => "パスワード",
	"ADMIN_USER_PHP_PASSWORD_CONFIRM" => "パスワード(確認)",
	"ADMIN_USER_PHP_DISPLAY_NAME" => "名前",
	"ADMIN_USER_PHP_ACTIVE" => "有効",
	"ADMIN_USER_PHP_ACTIVATE" => "有効化",
	"ADMIN_USER_PHP_AUTHORITY" => "権限",
	"ADMIN_USER_PHP_DIVISION" => "所属部署",
	"ADMIN_USER_PHP_TITLE" => "役職",
	"ADMIN_USER_PHP_SIGN_UP" => "作成日",
	"ADMIN_USER_PHP_LAST_SIGN_IN" => "最終ログイン日",
	"ADMIN_USER_PHP_PERSONAL_MEETING_ID" => "個人ミーティングID",
	"ADMIN_USER_PHP_ADD" => "新規",
	"ADMIN_USER_PHP_DELETE" => "削除",
	"ADMIN_USER_PHP_UPDATE" => "更新"
));

//admin-companies.php
$lang = array_merge($lang,array(
	"ADMIN_COMPS_PHP_ADMIN_COMPANIES" => "会社一覧",
	"ADMIN_COMPS_PHP_DELETE" => "削除",
	"ADMIN_COMPS_PHP_COMPANY_NAME" => "会社名",
	"ADMIN_COMPS_PHP_ADMIN_LOGIN" => "管理者ログインID",
	"ADMIN_COMPS_PHP_ADMIN_PASS" => "管理者パスワード",
	"ADMIN_COMPS_PHP_ADMIN_PASS_CONFIRM" => "管理者パスワード(確認)",
	"ADMIN_COMPS_PHP_ADMIN_NAME" => "管理者名",
	"ADMIN_COMPS_PHP_ADMIN_DEFAULT" => "管理者",
	"ADMIN_COMPS_PHP_LAST_SIGN_IN" => "最終ログイン日",
	"ADMIN_COMPS_PHP_MEMO" => "メモ",
));

//admin-users.php
$lang = array_merge($lang,array(
	"ADMIN_USERS_PHP_ADMIN_USERS" => "ユーザー一覧",
	"ADMIN_USERS_PHP_DELETE" => "削除",
	"ADMIN_USERS_PHP_USERNAME" => "ユーザーID",
	"ADMIN_USERS_PHP_DISPLAY_NAME" => "名前",
	"ADMIN_USERS_PHP_TITLE" => "役職",
	"ADMIN_USERS_PHP_LAST_SIGN_IN" => "最終ログイン日",
));

//admin-depart.php
$lang = array_merge($lang,array(
	"ADMIN_DEPART_PHP_DEPART_INFORMATION" => "部署情報",
	"ADMIN_DEPART_PHP_NAME" => "名前",
	"ADMIN_DEPART_PHP_PARENT" => "場所",
	"ADMIN_DEPART_PHP_DELETE" => "削除",
	"ADMIN_DEPART_PHP_UPDATE" => "更新",
	"ADMIN_DEPART_PHP_ADD" => "追加"
));

//admin-departs.php
$lang = array_merge($lang,array(
	"ADMIN_DEPARTS_PHP_ADMIN_DEPARTS" => "部署一覧",
	"ADMIN_DEPARTS_PHP_DELETE" => "削除",
	"ADMIN_DEPARTS_PHP_NAME" => "名前",
	"ADMIN_DEPARTS_PHP_TREE" => "場所",
	"ADMIN_DEPARTS_PHP_ADD" => "追加"
));

//blank-page.php
$lang = array_merge($lang,array(
	"BLANK_PAGE_PHP_BLANK_PAGE" => "空のページ",
	"BLANK_PAGE_PHP_SUBHEADING" => "サブタイトル"
));

//forgot-password.php
$lang = array_merge($lang,array(
	"FORGOT_PASSWORD_PHP_FORGOT_PASSWORD" => "パスワードを忘れた場合",
	"FORGOT_PASSWORD_PHP_EMAIL" => "メールアドレス",
));

//login.php
$lang = array_merge($lang,array(
	"LOGIN_PHP_LOGIN" => "ログイン",
	"LOGIN_PHP_USERNAME" => "会社ID",
	"LOGIN_PHP_PASSWORD" => "パスワード"
));

//resend-activation.php
$lang = array_merge($lang,array(
	"RESEND_ACTIVATION_PHP_RESEND_ACTIVATION" => "再アクティベーション",
	"RESEND_ACTIVATION_PHP_EMAIL" => "メールアドレス"
));

//user-settings.php
$lang = array_merge($lang,array(
	"USER_SETTINGS_PHP_USER_SETTINGS" => "パスワード変更",
	"USER_SETTINGS_PHP_PASSWORD" => "現在のパスワード",
	"USER_SETTINGS_PHP_EMAIL" => "メールアドレス",
	"USER_SETTINGS_PHP_NEW_PASSWORD" => "新パスワード(最低8文字)",
	"USER_SETTINGS_PHP_CONFIRM_PASSWORD" => "新パスワード(確認)"
));

//left-nav.php
$lang = array_merge($lang,array(
	"LEFT_NAV_PHP_ACCOUNT_HOME" => "ホーム画面",
	"LEFT_NAV_PHP_USER_SETTING" => "パスワード変更",
	"LEFT_NAV_PHP_ADMIN_CONFIGURATION" => "設定",
	"LEFT_NAV_PHP_ADMIN_COMPANIES" => "会社一覧",
	"LEFT_NAV_PHP_ADMIN_DEPARTS" => "部署一覧",
	"LEFT_NAV_PHP_ADMIN_USERS" => "ユーザー一覧",
	"LEFT_NAV_PHP_ADMIN_ROOMS" => "ルーム管理",
	"LEFT_NAV_PHP_LOGOUT" => "ログアウト",
	"LEFT_NAV_PHP_FORGOT_PASSWORD" => "パスワードを忘れた場合",
	"LEFT_NAV_PHP_RESEND_ACTIVATION_EMAIL" => "再アクティベーション"
));

//top-nav.php
$lang = array_merge($lang,array(
	"TOP_NAV_PHP_APP_NAME" => "Room Video Chat",
	"TOP_NAV_PHP_ACCOUNT_INFO" => "ホーム画面",
	"TOP_NAV_PHP_SIGN_OUT" => "サインアウト",
	"TOP_NAV_PHP_SIGN_IN" => "サインイン",
));
?>
