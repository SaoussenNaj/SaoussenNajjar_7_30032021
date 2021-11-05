import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Inscription from "../views/Inscription.vue";
import AddPost from "../components/AjoutPost.vue";
import EditPost from "../components/EditPost.vue";
import Admins from "../views/Admin.vue";
import Profil from "../views/Profil.vue";
import store from "../store";

Vue.use(VueRouter);

// pour garder la session ouverte de l'utilisateur, on crée authenticate pour verifier la présence ou pas du token dans localstorage
const authenticate = (to, from, next) => {
  store.state.user.isLogged = true;
  // fct pour se déconnecter
  function logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    store.state.user.isLogged = false;
    next("/login");
  }
  //  si pas de token on se déconnecte
  if (!localStorage.getItem("token")) {
    logout();
    return;
  }
  //  si token on se redirige vers home
  if (localStorage.getItem("token")) {
    next();
  } else next("/login");
};

// Configuration des différentes routes
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
