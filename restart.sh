#!/bin/sh

#
# Sample Jenkins
# NodeJS restart script.
#

echo "Restart script running.."

./stop.sh
./start.sh

echo "Restart script was run."
