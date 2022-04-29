### 도커 이미지, 네트워크 생성

```
sudo apt install docker.io

sudo docker pull mongo

sudo docker pull node:16.14.2

sudo docker network create --driver bridge clone_tube-network
```

<hr/>

### 도커 컨테이너 생성

```
MongoDB 컨테이너 생성
sudo docker run \
    --name mongodb-container \
    -d -p 27017:27017 \
    --network clone_tube-network \
    mongo

또는

sudo docker run \
    --name mongodb-container \
    -v /data/clone_tube:/data/clone_tube -d -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USER_NAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo
```

```
cd /

sudo git clone https://github.com/hwd3004/clone_tube.git
```

```
백엔드 컨테이너 생성
sudo docker run -d -it --name backend-clone_tube \
    -v /clone_tube/backend:/clone_tube/backend -p 4000:4000 \
    --network clone_tube-network node:16.14.2

프론트엔드 컨테이너 생성
sudo docker run -d -it --name frontend-clone_tube \
    -v /clone_tube/frontend:/clone_tube/frontend -p 3000:3000 \
    --network clone_tube-network node:16.14.2
```

```
sudo docker network ls

sudo docker inspect clone_tube-network
같은 네트워크에 속해있는 컨테이너들의 ip 확인
```

<hr/>

```
백엔드 실행
sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm i -g nodemon"

sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm i"

sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm start"
```

```
프론트 실행
sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm i"

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm run build"

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm i -g serve"

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && serve -s dist"
```

<hr/>

### nginx 컨테이너 생성

```
sudo docker pull nginx

nginx html 위치
/usr/share/nginx/html

sudo docker run -d -it --name nginx-container \
    -p 80:80 \
    -v /clone_tube/frontend/dist:/usr/share/nginx/html \
    --network clone_tube-network nginx
```

```
sudo docker exec -it nginx-container bash

default.conf 위치
cd /etc/nginx/conf.d

sudo docker restart nginx-container
```

<hr/>

```
DB복구

sudo docker cp mongodb-container:/data/db /data/clone_tube

sudo docker cp /data/clone_tube/db mongodb-container:/data
```

```
mkdir nginx_conf_copy

sudo docker cp nginx-container:/etc/nginx/conf.d/default.conf /nginx_conf_copy
```
