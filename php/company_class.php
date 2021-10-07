<?php
class Company
{
  public $company_id = NULL;

  function __construct($app, $id)
	{
    $this->group_id = $id;
    $stmt = $app->mysqli->prepare(
      "select `c_name`
      ,`c_memo`
      ,`n_seq`
      ,`d_create`
      ,`d_update`
      ,`d_delete`
      ,`b_delete`
      ,`b_admin`
      from ht_company
      where n_company = ?");
    if ($stmt) {
      $stmt->bind_param('i', $id);
      $stmt->execute();
      $stmt->bind_result($this->name, $this->seq, $create, $delete, $is_delete, $is_admin);
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
      $stmt->close();
    } else {
      syslog(LOG_ERR, __FILE__.'('.__LINE__.')'.": Query failed (" . $app->mysqli->error . ")");
      return;
    }
  }

  function __destruct()
  {
  }
}
?>
