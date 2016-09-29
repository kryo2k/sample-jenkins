#!/bin/sh

. ./var.sh

#
# Sample Jenkins
# NodeJS shut-down script.
#

if [ ! -f $PID_FILE ]; then
  echo "No pid detected $PID_FILE, exiting shutdown.."
  exit 1
fi

LAST_PID=`cat $PID_FILE`

if [ $? -ne 0 ]; then
  echo "Problem reading the pid file."
  exit 1
fi

echo "Shutting down server ..."

echo "Last process ID: $LAST_PID"

kill $LAST_PID 2>/dev/null

if [ $? -eq 0 ]; then
  echo "Process was killed."
else
  echo "Process was not found."
fi

rm -f $PID_FILE

echo "Shutdown script finished."
