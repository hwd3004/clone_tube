import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios, { AxiosRequestConfig } from "axios";

// https://vueup.github.io/vue-quill/guide/themes.html
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getLsUser, getLsLoggedIn } from "./store/modules/user";

export const baseURL = "http://localhost:4000";

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

createApp(App).use(store).use(router).component("QuillEditor", QuillEditor).mount("#app");
