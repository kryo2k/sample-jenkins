#!/bin/sh

. ./var.sh

#
# Sample Jenkins
# NodeJS start-up script.
#

NODE_PATH=`/usr/bin/which node`

if [ $? -eq 1 ]; then
  echo "Start-up script Could not find NodeJS binary."
  exit 1
fi

if [ -f $PID_FILE ]; then
  echo "Previous pid detected $PID_FILE (`cat $PID_FILE`), overwriting."
  # or exit?
fi

echo "Starting up server -- NodeJS: (`$NODE_PATH -v`) $NODE_PATH ..."

$NODE_PATH server/start.js >> logs/server.log 2>&1 & # start as a background process

SERVER_PID=$!

echo $SERVER_PID > $PID_FILE # save the PID to file

echo "Start-up script finished (PID: $SERVER_PID)."
