import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios, { AxiosRequestConfig } from "axios";

// https://vueup.github.io/vue-quill/guide/themes.html
// import { QuillEditor } from "@vueup/vue-quill";
const QuillEditor = require("@vueup/vue-quill");

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getLsUser, getLsLoggedIn } from "./store/modules/user";

import CKEditor from "@ckeditor/ckeditor5-vue";

export const local = false;
let address;

local ? (address = "http://localhost:4000/api") : (address = "/api");

export const baseURL = address;

export const instance = axios.create({
  baseURL,
  // headers: {
  //   user: JSON.stringify(getLsUser()),
  //   loggedin: JSON.stringify(getLsLoggedIn()),
  //   // headers의 이름들은 소문자만 가능

  //   "Content-Type": "multipart/form-data",
  // },
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

createApp(App).use(store).use(router).use(CKEditor).component("QuillEditor", QuillEditor).mount("#app");

let wakeLock = null;

// 모바일에서 영상 시청 후 터치가 없으면 잠금 화면으로 이동되는 폰이 있음
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator["wakeLock"].request("screen");
    console.log(wakeLock);
  } catch (error) {
    console.log(error);
  }
};

requestWakeLock();
