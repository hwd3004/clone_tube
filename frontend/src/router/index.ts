import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Upload from "../views/videos/Upload.vue";
import Watch from "../views/videos/Watch.vue";
import Edit from "../views/videos/Edit.vue";
import PageNotFound from "../components/PageNotFound.vue";
import Search from "../views/Search.vue";
import Join from "../views/Join.vue";
import Login from "../views/Login.vue";
import EditProfile from "../views/EditProfile.vue";
import Change_Password from "../views/Change_Password.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/videos/upload",
    component: Upload,
  },
  {
    path: "/videos/:id",
    component: Watch,
  },
  {
    path: "/videos/:id/edit",
    component: Edit,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/join",
    component: Join,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/users/edit",
    component: EditProfile,
  },
  {
    path: "/users/change_password",
    component: Change_Password,
  },
  {
    path: "/:pathMatch(.*)",
    component: PageNotFound,
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;
