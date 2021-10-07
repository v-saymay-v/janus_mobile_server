-- MySQL dump 10.14  Distrib 5.5.47-MariaDB, for FreeBSD9.1 (amd64)
--
-- Host: localhost    Database: hbu0000
-- ------------------------------------------------------
-- Server version	5.5.47-MariaDB-log

--
-- Table structure for table `ht_company`
--
DROP TABLE IF EXISTS `ht_company`;
CREATE TABLE `ht_company` (
  `n_company` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(128),
  `c_address` varchar(255),
  `c_memo` text,
  `n_seq` int(11) DEFAULT NULL,
  `c_hotbiz_server` varchar(64),
  `c_hotbiz_name` varchar(16),
  `d_create` datetime DEFAULT NULL,
  `d_update` timestamp,
  `d_delete` datetime DEFAULT NULL,
  `b_delete` tinyint(1) DEFAULT '0',
  `b_admin` tinyint(1) DEFAULT '0',
  `b_free` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`n_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
insert into `ht_company` values (1, '株式会社ＡＳＪ', '', '管理会社', 1, now(), null, null, 0, 1, 0);
insert into `ht_company` values (2, '無所属', '', '無所属', 2, now(), null, null, 0, 0, 1);

DROP TABLE IF EXISTS `seq_company`;
CREATE TABLE `seq_company` (
  `n_seq` int(11)
);
insert into seq_company values(1);

--
-- Table structure for table `ht_group`
--
DROP TABLE IF EXISTS `ht_group`;
CREATE TABLE `ht_group` (
  `n_group` int(11) NOT NULL AUTO_INCREMENT,
  `n_company` int(11) DEFAULT NULL,
  `c_name` varchar(128),
  `c_memo` text,
  `n_parent` int(11) DEFAULT NULL,
  `n_seq` int(11) DEFAULT NULL,
  `d_create` datetime DEFAULT NULL,
  `d_update` timestamp,
  `d_delete` datetime DEFAULT NULL,
  `b_delete` tinyint(1) DEFAULT '0',
  `b_admin` tinyint(1) DEFAULT '0',
  `b_free` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`n_group`),
  KEY (`n_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
insert into ht_group values(1, 1, 'ルート', 'ルート', 0, 1, now(), now(), now(), 0, 1, 0);
insert into ht_group values(2, 2, '無所属', '無所属', 0, 2, now(), now(), now(), 0, 0, 1);

DROP TABLE IF EXISTS `seq_group`;
CREATE TABLE `seq_group` (
  `n_company` int(11),
  `n_seq` int(11),
  PRIMARY KEY (`n_company`)
);

--
-- Table structure for table `ht_user`
--
DROP TABLE IF EXISTS `ht_user`;
CREATE TABLE `ht_user` (
  `n_user` int(11) NOT NULL AUTO_INCREMENT,
  `n_group` int(11) DEFAULT NULL,
  `c_first_name` varchar(64),
  `c_last_name` varchar(64),
  `c_disp_name` varchar(128),
  `c_disp_kana` varchar(128),
  `c_job_title` varchar(64),
  `c_gender` enum('male', 'female') DEFAULT NULL,
  `c_login` varchar(128),
  `c_pass` varchar(255),
  `c_access_key` varchar(255) DEFAULT NULL,
  `c_subscription` text DEFAULT NULL,
  `c_meeting` varchar(16) DEFAULT NULL,
  `c_host_key` varchar(8),                    -- ホストを交代するために必要なキー(6桁の数字)
  `c_memo` text,
  `d_create` datetime DEFAULT NULL,
  `d_signin` datetime DEFAULT NULL,
  `d_update` timestamp,
  `d_delete` datetime DEFAULT NULL,
  `b_delete` tinyint(1) DEFAULT 0,
  `b_admin` tinyint(1) DEFAULT 0,
  `b_active` tinyint(1) DEFAULT 1,
  `b_guest` tinyint(1) DEFAULT 0,
  `c_access_ip` varchar(64) DEFAULT NULL,
  `c_update_mail` varchar(128),
  `c_activation_token` varchar(255),
  `c_last_activation_request` varchar(32),
  `b_lost_password_request` tinyint(1) DEFAULT 0,
  `c_date_format` enum('mm/dd/yyyy','mm/dd/yy','m/d/yyyy','yyyy-mm-dd','yy-mm-dd','yyyy/mm/dd','yy/mm/dd','yyyy/m/d','yy/m/d','yyyy.mm.dd','yy.mm.dd','dd/mm/yyyy','dd/mm/yy','dd.mm.yyyy','dd.mm.yy','d.m.yy','dd-mm-yyyy','yyyy/dd/mm') default 'yyyy/mm/dd',
  `c_photo` text,
  `c_photo_type` varchar(64),
  PRIMARY KEY (`n_user`),
  UNIQUE KEY (`c_meeting`),
  KEY (`c_pass`),
  KEY (`b_delete`),
  KEY (`c_access_ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
insert into ht_user values (1, 1, '管理者', 'マスター', 'マスター管理者', 'ますたーかんりしゃ', 'male', 'master_admin@asj.ad.jp', password('Ti62ko_pUpHI7-uY'), '', '', '', 'マスター管理者', now(), NULL, now(), now(), 0, 1, 1, NULL, '', '', 0, 'yyyy/mm/dd');

DROP TABLE IF EXISTS `ht_janusmobile`;
CREATE TABLE `ht_janusmobile` (
  `n_user` int(11) NOT NULL,
  `c_snsid` varchar(128),
  `e_type` ENUM('facebook', 'twitter', 'google', 'apple', 'hotbiz', 'guest'),
  `e_os` ENUM('ios', 'android', 'web', 'win') default 'web',
  `c_push_token` varchar(255),
  `c_voip_token` varchar(255),
  `c_apns_token` varchar(255),
  `b_debug_token` bool,
  `c_login_token` varchar(255),
  `c_login_secret` varchar(255),
  `c_photo_url` varchar(255),
  `c_cover` text,
  `c_cover_url` varchar(255),
  `c_cover_type` varchar(64),
  PRIMARY KEY (`n_user`),
  KEY (n_hotbiz, e_type, e_os)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_group_user`;
CREATE TABLE `ht_group_user` (
  `n_user` int(11) NOT NULL,
  `n_group` int(11) NOT NULL,
  PRIMARY KEY (`n_user`, `n_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
insert into ht_group_user values (1, 1);

DROP TABLE IF EXISTS `ht_meeting`;
CREATE TABLE `ht_meeting` (
  `n_meeting` int(11) NOT NULL AUTO_INCREMENT,
  `n_host` int(11),                           -- 開催者の n_user
  `c_meeting` varchar(16) DEFAULT NULL,       -- 10桁の数字
  `c_pass` varchar(16) DEFAULT NULL,          -- ルーム入室用パスワード
  `c_crypt_seed` varchar(255) DEFAULT NULL,   -- ルーム用URL内のパスワード作成時のSEED
  `c_title` varchar(255),
  `c_memo` text,
  `c_auth_method` enum ('meeting', 'login') default 'login',
  `d_start` datetime,
  `n_minutes` int(11),
  `c_repeat` enum ('norepeat', 'daily', 'weekly', 'monthly') default 'norepeat',
  `n_daily_every` int(11),          -- 毎日：何日おき
  `n_weekly_every` int(11),         -- 毎週：何周おき
  `c_weekly_dotw` set ('sun','mon','tue','wed','thu','fri','sat'),
  `n_monthly_every` int(11),        -- 毎月：何か月おき
  `c_monthly_by` varchar(16),
  `n_monthly_day` int(11),          -- 毎月：何日
  `n_monthly_numof` int(11),        -- 毎月：第何～曜日
  `c_monthly_dotw` enum ('sun','mon','tue','wed','thu','fri','sat'),
  `c_with_pmi` enum ('off', 'on') default 'off',
  `c_end_by` varchar(16),
  `d_limit` datetime,
  `n_times` int(11),
  `b_skip_pass` tinyint(1) DEFAULT '0',
  `b_private` tinyint(1) DEFAULT '0',
  `b_video_host` tinyint(1) DEFAULT '0',
  `b_video_part` tinyint(1) DEFAULT '0',
  `b_mute_begin` tinyint(1) DEFAULT '0',
  `b_rec_local` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`n_meeting`),
  KEY (c_meeting)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_meeting_days`;
CREATE TABLE `ht_meeting_days` (
  `n_meeting` int(11) NOT NULL,
  `d_date` datetime,
  `d_finish` datetime,                        -- 終わっていない場合はNULL、終わった時にUPDATEする。
  key (`n_meeting`, `d_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_meeting_users`;
CREATE TABLE `ht_meeting_users` (
  `n_meeting` int(11) NOT NULL,
  `n_user` int(11),
  `c_status` enum('waiting', 'allowed') default 'allowed',
  key (`n_meeting`, `n_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_sipsetting`;
CREATE TABLE `ht_sipsetting` (
  `n_user` int(11) NOT NULL,
  `c_registrar` varchar(128),
  `c_identity` varchar(128),
  `c_username` varchar(128),
  `c_dispname` varchar(128),
  `c_password` varbinary(128),
  `c_mode` enum('secret', 'ha1', 'guest') default 'secret',
  primary key (`n_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_sipbook`;
CREATE TABLE `ht_sipbook` (
  `n_book` int(11) NOT NULL AUTO_INCREMENT,
  `n_user` int(11) NOT NULL,
  `c_identity` varchar(128),
  `c_name` varchar(128),
  `c_kana` varchar(128),
  `c_memo` text,
  `c_photo` text,
  `d_create` datetime,
  `b_video` tinyint(1),
  `b_removed` tinyint(1) default 0,
  primary key (`n_book`),
  key (`n_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_videocall`;
CREATE TABLE `ht_videocall` (
  `c_tag` varchar(128) NOT NULL,
  `n_from` int(11),
  `n_to` int(11),
  `d_create` datetime,
  `d_answer` datetime,
  `d_notice` datetime,
  `d_finish` datetime,
  primary key (c_tag),
  key (`n_from`, `n_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `ht_voicemail`;
CREATE TABLE `ht_voicemail` (
  `c_tag` varchar(128) NOT NULL,
  `n_from` int(11),
  `n_to` int(11),
  `c_filename` varchar(128) NOT NULL,
  `d_create` datetime,
  `d_notice` datetime,
  `d_read` datetime,
  primary key (c_tag),
  key (`n_from`, `n_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `ht_user`
--
DROP TABLE IF EXISTS `ht_configuration`;
CREATE TABLE IF NOT EXISTS `ht_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=8 ;
INSERT INTO `ht_configuration` (`id`, `name`, `value`) VALUES
  (1, 'website_name', 'Room Admin'),
  (2, 'website_url', 'https://room.asj.ne.jp/hotroom/'),
  (3, 'email', 'master_admin@asj.ad.jp'),
  (4, 'activation', 'false'),
  (5, 'resend_activation_threshold', '0'),
  (6, 'language', 'models/languages/ja.php'),
  (7, 'template', 'css/uc-main.css');

DROP TABLE IF EXISTS `ht_permissions`;
CREATE TABLE `ht_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) engine = InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=3;
INSERT INTO `ht_permissions` (`id`, `name`) VALUES
  (1, 'New Member'),
  (2, 'Administrator');

CREATE TABLE IF NOT EXISTS `ht_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page` varchar(150) NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=18 ;
INSERT INTO `ht_pages` (`id`, `page`, `private`) VALUES
  (1, 'account.php', 1),
  (2, 'activate-account.php', 0),
  (3, 'admin_configuration.php', 1),
  (4, 'admin_page.php', 1),
  (5, 'admin_pages.php', 1),
  (6, 'admin_permission.php', 1),
  (7, 'admin_permissions.php', 1),
  (8, 'admin_user.php', 1),
  (9, 'admin_users.php', 1),
  (10, 'forgot-password.php', 0),
  (11, 'index.php', 0),
  (12, 'left-nav.php', 0),
  (13, 'login.php', 0),
  (14, 'logout.php', 1),
  (15, 'register.php', 0),
  (16, 'resend-activation.php', 0),
  (17, 'user_settings.php', 1);

CREATE TABLE IF NOT EXISTS `ht_permission_page_matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=23 ;
INSERT INTO `ht_permission_page_matches` (`id`, `permission_id`, `page_id`) VALUES
  (1, 1, 1),
  (2, 1, 14),
  (3, 1, 17),
  (4, 2, 1),
  (5, 2, 3),
  (6, 2, 4),
  (7, 2, 5),
  (8, 2, 6),
  (9, 2, 7),
  (10, 2, 8),
  (11, 2, 9),
  (12, 2, 14),
  (13, 2, 17);

CREATE TABLE IF NOT EXISTS `ht_user_permission_matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=2 ;
INSERT INTO `ht_user_permission_matches` (`id`, `user_id`, `permission_id`) VALUES (1, 1, 2);
