```
sudo apt install docker.io

sudo docker pull mongo

sudo docker network create --driver bridge clone_tube-network

sudo docker network ls

sudo docker run \
    --name mongodb-container \
    -v /data/clone_tube:/var/lib/mongodb -d -p 27017:27017 \
    --network clone_tube-network \
    mongo
```

또는

```
sudo docker run \
    --name mongodb-container \
    -v /data/clone_tube:/data/clone_tube -d -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USER_NAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo

sudo docker pull node:16.14.2

sudo docker run -d -it --name backend-clone_tube \
    -v /clone_tube/backend:/clone_tube/backend -p 4000:4000 \
    --network clone_tube-network node:16.14.2

sudo docker run -d -it --name frontend-clone_tube \
    -v /clone_tube/frontend:/clone_tube/frontend -p 80:8000 \
    --network clone_tube-network node:16.14.2
```

```
sudo docker inspect clone_tube-network
같은 네트워크에 속해있는 컨테이너들의 ip 확인
```

https://github.com/hwd3004/clone_tube.git