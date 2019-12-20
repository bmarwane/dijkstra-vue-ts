import Vue from "vue";
import VueRouter from "vue-router";
import DijkstraWithMap from "../views/DijkstraWithMap.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: DijkstraWithMap
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
