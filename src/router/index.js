import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/home.vue";
import News from "../views/news.vue";
import Crypto_single from "../views/crypto-single.vue";

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
    {
        path: "/crypto/:id",
        name: "Crypto-single",
        component: Crypto_single,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;