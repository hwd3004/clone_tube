import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// https://vueup.github.io/vue-quill/guide/themes.html
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getLsUser, getLsLoggedIn } from "./store/modules/user";

// getLsUser();
// getLsLoggedIn();

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    user: JSON.stringify(getLsUser()),
    loggedin: getLsLoggedIn(),
    // headers의 이름들은 소문자만 가능

    "Content-Type": "multipart/form-data",
  },
});

createApp(App).use(store).use(router).component("QuillEditor", QuillEditor).mount("#app");
