#!/bin/bash

usage () {
    echo "Usage: one of the following .."
    echo "  local_dev.sh up"
    echo "      or "
    echo "  local_dev.sh down"
    exit 1
}

if (($# != 1))
then
    usage
fi
echo $1
if [[ "$1" == "up" ]]
then 
    echo "***** Starting local development environment ****"
    source start_local_dev_setup.sh 
elif [[ "$1" == "down" ]]
then 
    echo "***** Stopping local development environment ****"
    source stop_local_dev_setup.sh
else
    echo "unknown command..."
    usage
fi
