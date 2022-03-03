"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const Home_vue_1 = __importDefault(require("../views/Home.vue"));
const Upload_vue_1 = __importDefault(require("../views/videos/Upload.vue"));
const Watch_vue_1 = __importDefault(require("../views/videos/Watch.vue"));
const Edit_vue_1 = __importDefault(require("../views/videos/Edit.vue"));
const PageNotFound_vue_1 = __importDefault(require("../components/PageNotFound.vue"));
const Search_vue_1 = __importDefault(require("../views/Search.vue"));
const Join_vue_1 = __importDefault(require("../views/Join.vue"));
const Login_vue_1 = __importDefault(require("../views/Login.vue"));
const routes = [
    {
        path: "/",
        component: Home_vue_1.default,
    },
    {
        path: "/videos/upload",
        component: Upload_vue_1.default,
    },
    {
        path: "/videos/:id",
        component: Watch_vue_1.default,
    },
    {
        path: "/videos/:id/edit",
        component: Edit_vue_1.default,
    },
    {
        path: "/search",
        component: Search_vue_1.default,
    },
    {
        path: "/join",
        component: Join_vue_1.default,
    },
    {
        path: "/login",
        component: Login_vue_1.default,
    },
    {
        path: "/:pathMatch(.*)",
        component: PageNotFound_vue_1.default,
    },
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes,
});
exports.default = router;
//# sourceMappingURL=index.js.map