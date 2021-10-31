<template>
  <div class="container-fluid" style="height:100%">
    <h1>Profil</h1>
    <ul class="list-group">
      <li class="list-group-item">username: {{ user.username }}</li>
      <li class="list-group-item">email: {{ user.email }}</li>
    </ul>
    <div class="input-group mb-3">
      <input
        v-model="password"
        type="text"
        class="form-control"
        name="password"
        placeholder="Ecrivez ton mot de passe"
      />
      <button class="btn btn-outline-danger" @click="deleteAccount">
        Delete account
      </button>
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
<style scoped></style>
