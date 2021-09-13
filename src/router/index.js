import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/home"),
  }, {
    path: "/post/:id",
    name: "post",
    component: () => import("@/components/post")
  }, {
    path: "/view-post/:id",
    name: "view-post",
    component: () => import("@/components/view-post")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
