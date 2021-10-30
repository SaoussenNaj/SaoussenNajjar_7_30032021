<template>
  <div>
    <div>
      <img
        alt="Vue logo"
        src="../assets/icon-left-font-monochrome-black.png"
        width="300px"
      />
    </div>
    <div class="submit-form">
      <h2 class="styleTitle">Login</h2>
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
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/"); //push() pour la redirection vers la page Home
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
.logo {
  width: 70%;
}
.styleTitle {
  color: blue;
  text-decoration-line: underline;
  margin-bottom: 40px;
}
</style>
