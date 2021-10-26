<template>
  <div class="submit-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        required
        v-model="user.email"
        name="email"
      />
    </div>

    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input
        type="password"
        class="form-control"
        id="password"
        required
        v-model="user.password"
        name="password"
      />
    </div>

    <button @click="verifieUser" class="btn btn-success btn-props">
      Se connecter
    </button>
    <router-link to="/inscription" id="routerLink">S'inscrire</router-link>
  </div>
</template>

<script>
//

import { login } from "../services/user";
export default {
  name: "connect-user",
  data() {
    return {
      user: {
        id: null,
        email: "",
        password: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    verifieUser() {
      const data = {
        email: this.user.email,
        password: this.user.password,
      };
      login(data)
        .then(() => {
          this.$router.push("Home"); //push() pour la redirection vers la page Home
        })
        .catch((err) => console.log(err));
    },

    // newUser() {
    //   this.submitted = false;
    //   this.user = {};
    // },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.btn-props {
  margin-top: 20px;
}
#routerLink {
  margin-left: 10px;
}
</style>
