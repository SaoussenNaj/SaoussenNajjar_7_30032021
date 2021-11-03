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
        <label for="email" class="title-style">Email</label>
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
        <label for="password" class="title-style">Mot de passe</label>
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
      const isformValid = this.validForm();
      if (isformValid) {
        login(data)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.$store.state.user.isAdmin = response.data.isAdmin;
            this.$store.state.user.userId = response.data.userId;
            this.$store.state.user.islogged = true;
            this.$router.push("/"); //push() pour la redirection vers la page Home
          })
          .catch(() => alert("email ou mot de passe incorrect"));
      } else {
        alert("error");
      }
    },
    goToRegister() {
      this.$router.push("/inscription");
    },
    validForm() {
      let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
        "g"
      );
      // tester l'expression regex
      let testEmail = emailRegExp.test(this.user.email);

      let testPassword = this.user.password.length > 0;

      return testEmail && testPassword;
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
.title-style {
  color: rgb(8, 8, 8);
}
.btn-lien {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
