<template>
  <div class="container-fluid main">
    <div class="style-group">
      <h1>Profil</h1>
      <div>
        <ul class="list-group ">
          <li class="list-group-item margin">
            Nom d'utilisateur: {{ user.username }}
          </li>
          <li class="list-group-item margin ">Email: {{ user.email }}</li>
        </ul>
        <div class="input-group mb-3">
          <label for="password">Mot de passe:</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Ecrivez votre mot de passe"
          />
          <button class="btn btn-danger" @click="deleteAccount">
            Supprimer compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteUser, getUser } from "../services/user";
export default {
  name: "profil",
  data() {
    return {
      user: {},
      password: "",
    };
  },
  mounted() {
    getUser().then((response) => {
      this.user = response.data.user;
    });
  },
  methods: {
    deleteAccount() {
      deleteUser(this.password)
        .then(() => {
          // on supprime le token du user du loalstorage
          localStorage.removeItem("token");
          // on solicite la méhode signout du store
          this.$store.dispatch("signout").then(() => {
            // on redirige le user vers la vue Login et un message apparait
            this.$router.push("Login");
            alert("compte supprimé");
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
.main {
  background-image: url(../assets/london.png);
  background-repeat: no-repeat;
  height: 100%;
  /*Centrez et redimensionnez bien l'image */
  background-position: center;
  background-size: cover;
}
/* .style-li {
  width: 50%;
  margin-bottom: 15px;
} */
.style-group {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.margin {
  margin-bottom: 15px;
}
</style>
