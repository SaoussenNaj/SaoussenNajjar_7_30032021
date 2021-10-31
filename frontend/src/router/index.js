import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Inscription from "../views/Inscription.vue";
import AddPost from "../components/AjoutPost.vue";
import EditPost from "../components/EditPost.vue";
import Admins from "../views/Admin.vue";
import Profil from "../views/Profil.vue";
// import store from '../store';

Vue.use(VueRouter);

const authenticate = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else next("/login");
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authenticate,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription,
  },
  {
    path: "/addPost",
    name: "AddPost",
    component: AddPost,
    beforeEnter: authenticate,
  },
  {
    path: "/post/:id",
    name: "EditPost",
    component: EditPost,
    beforeEnter: authenticate,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admins,
    beforeEnter: authenticate,
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    beforeEnter: authenticate,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
