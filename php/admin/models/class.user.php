<?php
/*
UserSpice 2.5.6
by Dan Hoover at http://UserSpice.com

based on
UserCake Version: 2.0.2


UserCake created by: Adam Davis
UserCake V2.0 designed by: Jonathan Cassels

Please note that this version uses technology that some consider
to be outdated. This version is designed as a cosmetic upgrade for
users of 2.0.2 and as a path towards development of version 3.0 and beyond
*/

class loggedInUser {
	public $email = NULL;
	public $hash_pw = NULL;
	public $user_id = NULL;

	//Simple function to update the last sign in of a user
	public function updateLastSignIn($mysqli)
	{
		$stmt = $mysqli->prepare("UPDATE ht_user SET d_signin = now() WHERE n_user = ?");
		$stmt->bind_param("i", $this->user_id);
		$stmt->execute();
		$stmt->close();
	}

	//Return the timestamp when the user registered
	public function signupTimeStamp()
	{
		global $mysqli,$db_table_prefix;

		$stmt = $mysqli->prepare(
			"SELECT unix_timestamp(T1.d_create) FROM ".$db_table_prefix."user T1 WHERE T1.n_user = ?");
		$stmt->bind_param("i", $this->user_id);
		$stmt->execute();
		$stmt->bind_result($timestamp);
		$stmt->fetch();
		$stmt->close();
		return ($timestamp);
	}

	//Update a users password
	public function updatePassword($pass)
	{
		global $mysqli,$db_table_prefix;

		$stmt = $mysqli->prepare(
			"UPDATE ".$db_table_prefix."user T1 SET T1.c_password = password(?) WHERE T1.n_user = ?");
		$stmt->bind_param("si", $secure_pass, $this->user_id);
		$stmt->execute();
		$stmt->close();

		$stmt = $mysqli->prepare("SELECT (T1.c_pass) FROM ".$db_table_prefix."user T1 WHERE T1.n_user = ?");
		$stmt->bind_param("i", $this->user_id);
		$stmt->execute();
		$stmt->bind_result($this->hash_pw);
		$stmt->fetch();
		$stmt->close();
	}

	//Update a users email
	public function updateEmail($email)
	{
		global $mysqli,$db_table_prefix;
		$this->email = $email;
		$stmt = $mysqli->prepare("UPDATE ".$db_table_prefix."user T1 SET T1.c_login = ? WHERE T1.n_user = ?");
		$stmt->bind_param("si", $email, $this->user_id);
		$stmt->execute();
		$stmt->close();
	}

	//Is a user has a permission
	public function checkPermission($permission)
	{
		global $mysqli,$db_table_prefix,$master_account;

		//Grant access if master user

		$stmt = $mysqli->prepare("SELECT id
			FROM ".$db_table_prefix."user_permission_matches
			WHERE user_id = ?
			AND permission_id = ?
			LIMIT 1
			");
		$access = 0;
		foreach($permission as $check){
			if ($access == 0){
				$stmt->bind_param("ii", $this->user_id, $check);
				//$stmt->bind_param("ii", $this->company_id, $check);
				$stmt->execute();
				$stmt->store_result();
				if ($stmt->num_rows > 0){
					$access = 1;
				}
			}
		}
		if ($access == 1)
		{
			return true;
		}
		if ($this->user_id == $master_account){
			return true;
		}
		else
		{
			return false;
		}
		$stmt->close();
	}
	
	//Destroys a session as part of logout
	function destroySession($name)
	{
		if(isset($_SESSION[$name]))
		{
			$_SESSION[$name] = NULL;
			unset($_SESSION[$name]);
		}
	}

	//Logout
	public function userLogOut()
	{
		// セッション変数を全て解除する
		$_SESSION = array();

		// セッションを切断するにはセッションクッキーも削除する。
		// Note: セッション情報だけでなくセッションを破壊する。
		if (ini_get("session.use_cookies")) {
			$params = session_get_cookie_params();
			setcookie(session_name(), '', time() - 42000,
				$params["path"], $params["domain"],
				$params["secure"], $params["httponly"]
			);
		}

		// 最終的に、セッションを破壊する
		session_destroy();

		setcookie("room_access_key", "", time() - 3600);
	}
}

?>
