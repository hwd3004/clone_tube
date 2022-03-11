[해결] 버그 - 로그인 후 새로고침하지 않으면, /users/edit로 바로 접속 시 실행되는 axios 메소드의 헤더가 변경된 로컬 스토리지를 반영하지 못함

frontend의 main.ts에 만든 AxiosInstgance는 브라우저가 생정되자마자 메모리에 올라간 후 변동이 없기 때문에 사용자가 로그인 하더라도 로컬스토리지의 변경이 반영되지 않음

```typescript
export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    user: JSON.stringify(getLsUser()),
    loggedin: JSON.stringify(getLsLoggedIn()),
    // headers의 이름들은 소문자만 가능

    "Content-Type": "multipart/form-data",
  },
});
```

https://axios-http.com/kr/docs/interceptors

인터셉터를 사용하면 다른 곳에서 AxiosInstance를 호출하여 사용할 때마다 인터셉터하여 변경된 설정을 반영할 수 있다

```typescript
export const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    config.headers = {
      ...config.headers,
      user: JSON.stringify(getLsUser()),
      loggedin: JSON.stringify(getLsLoggedIn()),
      // headers의 이름들은 소문자만 가능

      "Content-Type": "multipart/form-data",
    };

    return config;
  },
  (error: any) => {
    console.log(error);
    return error;
  }
);
```
