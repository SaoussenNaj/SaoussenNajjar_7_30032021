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
          <input
            v-model="password"
            type="text"
            class="form-control"
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
          localStorage.removeItem("token");
          localStorage.removeItem("isAdmin");
          localStorage.removeItem("userId");
          this.$router.push("Login");
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
