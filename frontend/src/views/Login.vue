<template>
  <div class="main">
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
        <label for="email" class="label-style">Email</label>
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
        <label for="password" class="label-style">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>
      <div class="btn-lien">
        <button @click="verifieUser" class="btn btn-success btn-props">
          Se connecter
        </button>
        <button @click="goToRegister" class="btn btn-success btn-props">
          S'inscrire
        </button>
      </div>
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
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem("userId", response.data.userId);
          this.$router.push("/"); //push() pour la redirection vers la page Home
        })
        .catch((err) => console.log(err));
    },
    goToRegister() {
      this.$router.push("/inscription");
    },
  },
};
</script>

<style>
.main {
  background-image: url(../assets/london.png);
  background-repeat: no-repeat;
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-size: cover;
}
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
  color: black;
  margin-bottom: 40px;
}
.label-style {
  color: white;
}
.btn-lien {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
