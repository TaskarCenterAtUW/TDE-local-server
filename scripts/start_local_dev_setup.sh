#!/bin/bash
# check if docker exists in the system
echo "Checking if docker is installed on the system ..."
docker_path=$(which docker)
echo $docker_path

if ! hash which docker 2>/dev/null
then 
    echo " docker not found on the system"
    echo " !!! Please install docker on your system before proceeding ..."
    return 1
else
    echo " found docker at $docker_path"
fi

docker_image_tag="local-dev:0.1"
echo "Checking if the local-dev docker image exists on the system..."


if docker images  | awk '{print $1":"$2}' | grep $docker_image_tag >/dev/null 2>&1
then
    echo " $docker_image_tag already in the system. No need to build..."
else
    echo "building docker image...."
    docker build -t $docker_image_tag ..
fi

# check if local_dev_env.sh exists
if [ -f "local_dev_env.sh" ]
then
    echo "Found local_dev_env.sh.. using env variables from this file..."
    source local_dev_env.sh
else
    echo "Please add a local_dev_env.sh file. You can use local_dev_env_example.sh provided as an example"
    return 1
fi
# echo "Checking if env variable \$LOCAL_DEV_STORAGE_DIR is set..."
# if [ -z $LOCAL_DEV_STORAGE_DIR ]
# then
#     echo "Using $LOCAL_DEV_STORAGE_DIR as local storage location..."
# else
#     echo "local dev set up relies on environment vairable \$LOCAL_DEV_STORAGE_DIR." 
#     echo  "Please set it up using export LOCAL_DEV_STORAGE_DIR=<path_where_to_store_files>"
# fi    

#I dont like that we have to use 8100 in the following line
echo "running docker for file storage service and logger service..."
docker run -d -p $LOCAL_HOST_PORT:8100 -v $LOCAL_DEV_STORAGE_DIR:/usr/storagedir -v $LOCAL_DEV_LOG_DIR:/usr/logdir $docker_image_tag
echo "File Storage Service up.. files will be stored at $LOCAL_DEV_STORAGE_DIR ..."
echo "Log Service up.. logs will be stored at $LOCAL_DEV_LOG_DIR/diag.txt file ..."