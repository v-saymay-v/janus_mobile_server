#!/bin/sh
#
# hoged                Startup script for the Hoge System
#
# chkconfig: 345 99 01
# descroption: The Hoge System.
# processname: hoged
#
 
# Source function library.
#. /etc/init.d/functions
 
# Path to the script
#php=/usr/bin/php
daemon=/usr/bin/daemon
prog=/var/www/data/room/pushdaemon.php
pidfile=${PIDFILE-/var/run/room/pushdaemon.pid}
lockfile=${LOCKFILE-/var/lock/subsys/pushdaemon}
RETVAL=0
 
start() {
  if [ -f $lockfile ]; then
    echo "$prog is Started"
    exit 1
  fi
 
  echo -n "Starting $prog: "
  $daemon --pidfile=${pidfile} --user=www-data $prog
  RETVAL=$?
  echo
  [ $RETVAL = 0 ] && touch ${lockfile}
  return $RETVAL
}       
 
stop() {
  echo -n "Shutting down $prog: "
  /sbin/start-stop-daemon --stop --quiet --oknodo --exec $prog --pidfile ${pidfile}
  #killproc -p ${pidfile} $prog
  RETVAL=$?
  echo
  [ $RETVAL = 0 ] && rm -f ${lockfile} ${pidfile}
}
 
case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  status)
    status -p ${pidfile} $prog
    RETVAL=$?
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $prog {start|stop|restart|status}"
    exit 1
    ;;
esac
exit $RETVAL
