import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/home.vue";
import News from "../views/news.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/News",
        name: "News",
        component: News,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;