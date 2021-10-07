<?php
require_once('company_class.php');
class Group
{
  public $group_id = NULL;
  public $company = NULL;
  public $name = NULL;
  public $memo = NULL;
  public $parent = NULL;
  public $seq = NULL;
  public $create = NULL;
  public $update = NULL;
  public $delete = NULL;
  public $is_delete = NULL;
  public $is_admin = NULL;
  public $children = array();

  function __construct($app, $id)
	{
    if (empty($id)) {
      $this->group_id = 0;
      $this->name = "ゲスト";
    } else {
      $this->group_id = $id;
      $stmt = $app->mysqli->prepare(
        "select `n_company`
        ,`c_name`
        ,`c_memo`
        ,`n_parent`
        ,`n_seq`
        ,`d_create`
        ,`d_update`
        ,`d_delete`
        ,`b_delete`
        ,`b_admin`
        from `ht_group`
        where n_group = ?");
      if ($stmt) {
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result(
          $company, $this->name, $this->memo, $parent, $this->seq,
          $create, $update, $delete, $is_delete, $is_admin);
        if ($stmt->fetch()) {
          if (isset($create)) {
            $this->create = new DateTime($create);
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
        }
        $stmt->close();
      } else {
        syslog(LOG_ERR, __FILE__.'('.__LINE__.')'.": Query failed (" . $app->mysqli->error . ")");
        return;
      }
    }
    if (isset($company)) {
      $this->company = new Company($app, $company);
    }
    if (intval($parent) > 0) {
      $this->parent = new Group($app, $parent);
    }
  }
  
  function __destruct()
	{
  }
}
?>
