### 도커 이미지, 네트워크, 볼륨 생성

```
sudo apt install docker.io

sudo docker pull mongo

sudo docker pull node:16.14.2

sudo docker network create --driver bridge clone_tube-network
```

```
docker volume create mongodb-volume

docker volume inspect mongodb-volume

윈도우에서 도커 볼륨 위치
\\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes

안쓰는 볼륨들 청소
docker volume prune
```

<hr/>

### 도커 컨테이너 생성

```
MongoDB 컨테이너 생성
sudo docker run \
    --name mongodb-container \
    -d -p 27017:27017 \
    -v mongodb-volume:/data/db \
    --network clone_tube-network \
    mongo

docker run --name mongodb-container -d -p 27017:27017 -v mongodb-volume:/data/db --network clone_tube-network mongo

docker run --name mongodb-container -d -p 27017:27017 \
    --network clone_tube-network \
    -v /clone_tube/z_deploy/mongod.conf:/etc/mongod.conf \
    mongo --config /etc/mongod.conf --wiredTigerCacheSizeGB 1
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

docker run -d -it --name backend-clone_tube -v C:\workspace\clone_tube\backend:/clone_tube/backend -p 4000:4000 --network clone_tube-network node:16.14.2

프론트엔드 컨테이너 생성
sudo docker run -d -it --name frontend-clone_tube \
    -v /clone_tube/frontend:/clone_tube/frontend -p 3000:3000 \
    --network clone_tube-network node:16.14.2

docker run -d -it --name frontend-clone_tube -v C:\workspace\clone_tube\frontend:/clone_tube/frontend -p 3000:3000 --network clone_tube-network node:16.14.2
```

```
docker network ls

docker inspect clone_tube-network
같은 네트워크에 속해있는 컨테이너들의 ip 확인
```

<hr/>

```
백엔드 실행
docker exec -it backend-clone_tube bash

sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm i -g nodemon"

sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm i"

docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm start"
docker exec -it backend-clone_tube sh -c "cd /clone_tube/backend && npm start"
```

```
프론트 실행
docker exec -it frontend-clone_tube bash

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm i"

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm run build"

docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm i -g serve"

docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && serve -s dist"
```

<hr/>

### nginx 컨테이너 생성

```
sudo docker pull nginx

nginx html 위치
/usr/share/nginx/html

sudo docker run -d -it --name nginx-container \
    -p 80:80 \
    -v /clone_tube/z_deploy/default.conf:/etc/nginx/conf.d/default.conf \
    --network clone_tube-network nginx

docker run -d -it --name nginx-container -p 80:80 -v C:\workspace\clone_tube\z_deploy\default.conf:/etc/nginx/conf.d/default.conf --network clone_tube-network nginx
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

docker cp mongodb-container:/data/db /data/clone_tube

docker exec -itd mongodb-container sh -c "cd /data/db && rm -rf *"

docker cp /data/clone_tube/db mongodb-container:/data
```

```
cp -r /data/clone_tube/db/* /var/lib/docker/volumes/mongodb-volume/_data
```

```
mkdir nginx_conf_copy

sudo docker cp nginx-container:/etc/nginx/conf.d/default.conf /nginx_conf_copy
```

```
윈도우에서 개발 후 도커로 테스트 시 주의사항 - node_modules를 삭제하고 도커 컨테이너 안에서 npm i
```
