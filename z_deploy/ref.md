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

https://elfinlas.github.io/2019/02/11/docker-on-mongo/ - docker에서 mongodb 설치

<hr/>

nginx default.conf

```conf
upstream front {
  server frontend-clone_tube:3000;
}

upstream api {
  server backend-clone_tube:4000;
}

server {
    listen       80;
    listen  [::]:80;
    server_name  clonetube.ga;

    #access_log  /var/log/nginx/host.access.log  main;

    #MY ADD
    #root /usr/share/nginx/html;
    #index index.html index.htm;

    location / {
        #root   /usr/share/nginx/html;
        #index  index.html index.htm;

        #MY ADD
        #try_files $uri $uri/ index.html;
        proxy_pass http://front;
        #proxy_redirect off;
        #proxy_set_header Host $host;
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    #MY ADD
    location /api {
      proxy_pass http://api;
    }

    #MY ADD
    client_max_body_size 10000M;

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

<hr/>

도커 볼륨

https://youtu.be/OrQLrqQm4M0

https://velog.io/@1-blue/docker-volume-%EC%82%AC%EC%9A%A9%EB%B2%95

https://palbok.tistory.com/36

https://docs.docker.com/storage/volumes/