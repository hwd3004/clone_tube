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
    -v /data/clone_tube:/var/lib/mongodb -d -p 27017:27017 \
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

git clone https://github.com/hwd3004/clone_tube.git
```

```
백엔드 컨테이너 생성
sudo docker run -d -it --name backend-clone_tube \
    -v /clone_tube/backend:/clone_tube/backend -p 4000:4000 \
    --network clone_tube-network node:16.14.2

프론트엔드 컨테이너 생성
sudo docker run -d -it --name frontend-clone_tube \
    -v /clone_tube/frontend:/clone_tube/frontend -p 8000:8000 \
    --network clone_tube-network node:16.14.2
```

```
sudo docker network ls

sudo docker inspect clone_tube-network
같은 네트워크에 속해있는 컨테이너들의 ip 확인
```

<hr/>

```
sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm i -g nodemon"

sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm i"

sudo docker exec -itd backend-clone_tube sh -c "cd /clone_tube/backend && npm start"

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm i"

sudo docker exec -itd frontend-clone_tube sh -c "cd /clone_tube/frontend && npm run build"
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
```

<img src="./capture 2022-04-27 174238.png">

```
sudo docker restart nginx-container
```

<hr/>

```
sudo docker run -d -it --name web-clone_tube \
    -v /clone_tube:/clone_tube -p 4000:4000 \
    --network clone_tube-network node:16.14.2

sudo docker exec -itd web-clone_tube sh -c "cd /clone_tube/backend && npm i -g nodemon"

sudo docker exec -itd web-clone_tube sh -c "cd /clone_tube/backend && npm i"

sudo docker exec -itd web-clone_tube sh -c "cd /clone_tube/frontend && npm i"

sudo docker exec -itd web-clone_tube sh -c "cd /clone_tube/backend && npm start"

sudo docker exec -itd web-clone_tube sh -c "cd /clone_tube/frontend && npm run serve"
```

<hr/>

https://stackoverflow.com/questions/67598005/logs-in-the-console-stuck-saying-120659-pm-file-change-detected-starting-in

/backend/tsconfig/json

```json
{
  "exclude": ["uploads"],
  "include": ["src"]
  // ...
}
```

<hr/>

https://t-okk.tistory.com/154

https://cornswrold.tistory.com/439

https://cli.vuejs.org/guide/deployment.html

https://velog.io/@blackb0x/%EC%96%B4%ED%94%8C-%EB%B0%B0%ED%8F%AC%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EB%B6%80%EB%B6%84

https://81shinez.tistory.com/7
