import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { token: false },
});

createApp(App).use(store).use(router).component("QuillEditor", QuillEditor).mount("#app");
