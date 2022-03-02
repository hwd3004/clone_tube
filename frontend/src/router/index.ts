import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Upload from "../views/videos/Upload.vue";
import Watch from "../views/videos/Watch.vue";
import Edit from "../views/videos/Edit.vue";
import PageNotFound from "../components/PageNotFound.vue";
import Search from "../views/Search.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
