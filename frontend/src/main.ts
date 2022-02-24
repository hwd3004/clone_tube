import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { token: false },
});

createApp(App).use(store).use(router).mount("#app");
