# TDEI local set up

## Motivation
TDEI staff wishes to develop the microservices code on the local machines, without having to need to conenct to Azure or other cloud services. Hence, a local set up is developed to simulate the infrastructure provided by the cloud.
In particular, the local set up mimics the following needed by the microservices:
- file storage 
- queue connections 
- logging support

## Usage
First, clone this repository using:
```console
git clone https://github.com/TaskarCenterAtUW/TDEI-local-server.git 
```
Next, go to `scripts` directory: 
```console
cd scripts
```
### To start the local development set up
Before running your microservice code, it is expected that you would first bring up the local development set up. 
To bring up the local development set up:
```console
./bring_local_dev.sh up
```
The script does a number of things:
- checks if docker is installed on your local machine. If docker is not found, script informs you to download docker before proceeding
- if the needed local-dev docker image is available on the local machine. If it is not available, script will build the local-dev image
- Checks if there is a custom local_dev_env.sh is given; if not, copies local_dev_env_example.sh to local_dev_env.sh and uses it
    - By default, the files uploaded from your microservice will be stored under git_root_dir/local_dev_dir. If you want to change this, edit LOCAL_DEV_STORAGE_DIR in local_dev_env.sh
    - By default, the logs from your microservice will be stored under git_root_dir/local_dev_dir/diag.txt. If you want to change this, edit LOCAL_DEV_LOG_DIR in local_dev_env.sh
    - By default, the 8100 port is exposed for file and log operations; If you want to change this, edit LOCAL_HOST_PORT in local_dev_env.sh
- uses docker compose to bring up the local development
- Finally prints the needed information you need to copy to your microservices local environment file
- If all the steps are successful the last few lines of the script will look like this:
```
File Storage Service up.. files will be stored at /home/suresh/code/tdei/TDEI-local-server/scripts/../local_dev_dir ...
Log Service up.. logs will be stored at /home/suresh/code/tdei/TDEI-local-server/scripts/../local_dev_dir/diag.txt file ...
Showing the environment variables to use in the microservice...
You can copy and paste the following into .env in your microservice
 
PROVIDER=local
QUEUECONNECTION=amqp://guest:guest@rabbitmq:5672/
STORAGECONNECTION=http://localhost:8100
LOGGERQUEUE=http://localhost:8100
```
### To stop the local development set up
Once the development is done, and you want to shutdown the local development set up, use (from `scripts` directory):
```
./bring_local_dev.sh down
```
This will stop the docker containers that were spun up as part of bring the local development up