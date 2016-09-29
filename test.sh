#!/bin/sh

. ./var.sh

#
# Sample Jenkins
# NodeJS test runner script.
#

NODEUNIT_PATH=`/usr/bin/which nodeunit`

if [ $? -eq 1 ]; then
  echo "Could not find the nodeunit executable."
  exit 1
fi

MOCHA_PATH=`/usr/bin/which mocha`

if [ $? -eq 1 ]; then
  echo "Could not find the mocha executable."
  exit 1
fi

echo "Running nodeunit tests ($NODEUNIT_PATH --config $NODEUNIT_CONF) .."

$NODEUNIT_PATH --config $NODEUNIT_CONF

if [ $? -gt 0 ]; then
  echo "Nodeunit tests ended unexpectedly. Aborting.."
  exit 1
fi

echo "Running mocha tests ($MOCHA_PATH) .."

$MOCHA_PATH -C "./server/api/**/*.test.js"

if [ $? -gt 0 ]; then
  echo "Mocha controller tests ended unexpectedly. Aborting.."
  exit 1
fi

echo "Test runner script successfully."
