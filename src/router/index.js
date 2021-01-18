import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import {
  configureFirebaseSDK,
  isAuthenticated,
  onAuthStateChanged,
} from "../authUtils";

Vue.use(VueRouter);
configureFirebaseSDK();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/details/:id",
    name: "Details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Details.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.name != "Login" && !isAuthenticated()) next({ name: "Login" });
  else next();
});

function onSignIn() {
  router.push({ name: "Home" });
}

function onSignOut() {
  if (window.location.pathname != "/login") {
    router.push({ name: "Login" });
  }
}

onAuthStateChanged(onSignIn, onSignOut);
export default router;
