import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Inscription from "../views/Inscription.vue";
import AddPost from "../components/AjoutPost.vue";
import EditPost from "../components/EditPost.vue";
// import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  },
  { path: "/post/:id", name: "EditPost", component: EditPost },
];

const router = new VueRouter({
  routes,
});

export default router;
