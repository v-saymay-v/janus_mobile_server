<?php
require_once('group_class.php');
class Groups
{
  public $root;

  function __construct($app)
	{
    $this->root = new Group($app, 1);
    $this->getChildren($app, $this->root);
  }

  function getChildren($app, $grp)
  {
    $gids = array();
    $stmt = $app->mysqli->prepare("select `n_group` from ht_group where b_admin = 0 and n_group > 1 and n_parent = ?");
    if ($stmt) {
      $stmt->bind_param('i', $grp->group_id);
      $stmt->execute();
      $stmt->bind_result($groupid);
      while ($stmt->fetch()) {
        $gids[] = $groupid;
      }
      $stmt->close();
    } else {
      syslog(LOG_ERR, __FILE__.'('.__LINE__.')'.": Query failed (" . $app->mysqli->error . ")");
      return;
    }
    foreach($gids as $gid) {
      $grp->children[] = new Group($app, $gid);
    }
    foreach($grp->children as $child) {
      $this->getChildren($app, $child);
    }
  }

  function __destruct()
	{
  }
}
?>
