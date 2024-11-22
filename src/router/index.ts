import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import ListPage from "../views/List.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: ListPage,
    // children: [
    //   {
    //     path: "",
    //     redirect: "/list",
    //   },
    //   {
    //     path: "list",
    //     component: () => import("@/views/Content.vue"),
    //   },
    // ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
