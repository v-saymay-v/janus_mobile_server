<?php
require_once('user_class.php');
class Meeting
{
  public $host = NULL;
  public $meeting_id = NULL;
  public $meeting_no = NULL;
  public $pass = NULL;
  public $crypt_seed = NULL;
  public $auth_method = NULL;
  public $title = NULL;
  public $memo = NULL;
  public $start = NULL;
  public $finish = NULL;
  public $minutes = NULL;
  public $repeat = NULL;
  public $daily_every = NULL;
  public $weekly_every = NULL;
  public $weekly_dotw = NULL;
  public $monthly_every = NULL;
  public $monthly_by = NULL;
  public $monthly_day = NULL;
  public $monthly_numof = NULL;
  public $monthly_dotw = NULL;
  public $with_pmi = NULL;
  public $end_by = NULL;
  public $limit = NULL;
  public $times = NULL;
  public $skipPass = NULL;
  public $private = NULL;
  public $video_host = NULL;
  public $video_part = NULL;
  public $mute_begin = NULL;
  public $rec_local = NULL;
  public $users = array();
  public $days = array();

	function __construct($app, $id)
	{
    $this->meeting_no = $id;
    $stmt = $app->mysqli->prepare(
      "select T1.`n_meeting`
      ,T1.`n_host`
      ,T1.`c_pass`
      ,T1.`c_crypt_seed`
      ,T1.`c_auth_method`
      ,T1.`c_title`
      ,T1.`c_memo`
      ,T1.`d_start`
      ,T3.`d_finish`
      ,T1.`n_minutes`
      ,T1.`c_repeat`
      ,T1.`n_daily_every`
      ,T1.`n_weekly_every`
      ,T1.`c_weekly_dotw`
      ,T1.`n_monthly_every`
      ,T1.`c_monthly_by`
      ,T1.`n_monthly_day`
      ,T1.`n_monthly_numof`
      ,T1.`c_monthly_dotw`
      ,T1.`c_end_by`
      ,T1.`d_limit`
      ,T1.`n_times`
      ,T1.`c_with_pmi`
      ,T1.`b_skip_pass`
      ,T1.`b_private`
      ,T1.`b_video_host`
      ,T1.`b_video_part`
      ,T1.`b_mute_begin`
      ,T1.`b_rec_local`
      from `ht_meeting` T1
      left join `ht_meeting_days` T3 on T3.n_meeting = T1.n_meeting
      ,`ht_user` T2
      where T2.n_user = T1.n_host
      and T1.`c_meeting` = ?");
    if ($stmt) {
      $stmt->bind_param('s', $id);
      $stmt->execute();
      $stmt->bind_result(
        $this->meeting_id, $host_id, $this->pass, $this->crypt_seed, $this->auth_method,
        $this->title, $this->memo, $start, $finish, $this->minutes, $this->repeat,
        $this->daily_every, $this->weekly_every, $weekly_dotw, $this->monthly_every,
        $this->monthly_by, $this->monthly_day, $this->monthly_numof, $this->monthly_dotw,
        $this->end_by, $limit, $this->times, $this->with_pmi, $this->skipPass, $this->private,
        $this->video_host, $this->video_part, $this->mute_begin, $this->rec_local);
      if ($stmt->fetch()) {
        $this->start = new DateTime($start);
        if (!empty($finish)) {
          $this->finish = new DateTime($finish);
        }
        $this->weekly_dotw = explode(',', $weekly_dotw);
        if (!empty($limit)) {
          $this->limit = new DateTime($limit);
        }
      }
      $stmt->close();
    } else {
      syslog(LOG_ERR, __FILE__.'('.__LINE__.')'.": Query failed (" . $app->mysqli->error . ")");
      return;
    }
    if (isset($host_id)) {
      $this->host = new User($app, $host_id);
    }

    $uids = array();
    $stmt = $app->mysqli->prepare("select n_user from ht_meeting_users where n_meeting = ?");
    if ($stmt) {
      $stmt->bind_param('i', $this->meeting_id);
      $stmt->execute();
      $stmt->bind_result($user_id);
      while ($stmt->fetch()) {
        $uids[] = $user_id;
      }
      $stmt->close();
    } else {
      syslog(LOG_ERR, __FILE__.'('.__LINE__.')'.": Query failed (" . $app->mysqli->error . ")");
      return;
    }
    foreach ($uids as $uid) {
      $this->users[] = new User($app, $uid);
    }

    $stmt = $app->mysqli->prepare("select d_date from ht_meeting_days where n_meeting = ?"); 
    if ($stmt) {
      $stmt->bind_param('i', $this->meeting_id);
      $stmt->execute();
      $stmt->bind_result($datetime);
      while ($stmt->fetch()) {
        $this->days[] = new DateTime($datetime);
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
