<?php
require_once('group_class.php');
class User
{
  public $user_id = NULL;
  public $group = NULL;
  public $first_name = NULL;
  public $last_name = NULL;
  public $disp_name = NULL;
  public $disp_kana = NULL;
  public $gender = NULL;
  public $email = NULL;
  public $hash_pw = NULL;
  public $access_key = NULL;
  public $meeting_id = NULL;
  public $host_key = NULL;
  public $memo = NULL;
  public $create = NULL;  // datetime DEFAULT NULL,
  public $signin = NULL;  // datetime DEFAULT NULL,
  public $update = NULL;  //timestamp,
  public $delete = NULL;  // datetime DEFAULT NULL,
  public $is_delete = NULL; // tinyint(1) DEFAULT 0,
  public $is_admin = NULL;  // tinyint(1) DEFAULT 0,
  public $is_active = NULL; // tinyint(1) DEFAULT 1,
  public $access_ip = NULL;
  public $activation_token = NULL;
  public $last_activation_request = NULL;
  public $lost_password_request = NULL; // tinyint(1) DEFAULT 0,
  public $date_format = NULL;

  function __construct($app, $id)
	{
    $this->user_id = $id;
    $stmt = $app->mysqli->prepare(
      "select `n_group`
      ,`c_first_name`
      ,`c_last_name`
      ,`c_disp_name`
      ,`c_disp_kana`
      ,`c_gender`
      ,`c_login`
      ,`c_pass`
      ,`c_access_key`
      ,`c_meeting`
      ,`c_host_key`
      ,`c_memo`
      ,`d_create`
      ,`d_signin`
      ,`d_update`
      ,`d_delete`
      ,`b_delete`
      ,`b_admin`
      ,`b_active`
      ,`c_access_ip`
      ,`c_activation_token`
      ,`c_last_activation_request`
      ,`b_lost_password_request`
      ,`c_date_format`
      from ht_user
      where n_user = ?");
    if ($stmt) {
      $stmt->bind_param('i', $id);
      $stmt->execute();
      $stmt->bind_result(
        $group_id, $this->first_name, $this->last_name, $this->disp_name, $this->disp_kana,
        $this->gender, $this->email, $this->hash_pw, $this->access_key, $this->meeting_id,
        $this->host_key, $this->memo, $create, $signin, $update, $delete, $is_delete,
        $is_admin, $is_active, $this->sccess_ip, $this->activation_token,
        $this->last_activation_request, $lost_password_request, $this->date_format);
      if ($stmt->fetch()) {
        if (isset($create)) {
          $this->create = new DateTime($create);
        }
        if (isset($signin)) {
          $this->signin = new DateTime($signin);
        }
        if (isset($update)) {
          $this->update = new DateTime($update);
        }
        if (isset($delete)) {
          $this->delete = new DateTime($delete);
        }
        if (isset($is_delete)) {
          $this->is_delete = intval($is_delete)>0;
        }
        if (isset($is_admin)) {
          $this->is_admin = intval($is_admin)>0;
        }
        if (isset($is_active)) {
          $this->is_active = intval($is_active)>0;
        }
        if (isset($lost_password_request)) {
          $this->lost_password_request = intval($lost_password_request)>0;
        }
      }
      $stmt->close();
    } else {
      syslog(LOG_ERR, __FILE__.'('.__LINE__.')'.": Query failed (" . $app->mysqli->error . ")");
      return;
    }
    if (isset($group_id)) {
      $this->group = new Group($app, $group_id);
    }
  }
  
  function __destruct()
	{
  }
}
?>
