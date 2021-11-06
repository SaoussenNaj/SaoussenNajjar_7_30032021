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
      <h2 class="styleTitle">Signup</h2>
      <div class="form-group">
        <label for="username" class="label-style">Nom d'utilisateur</label>
        <input
          type="username"
          class="form-control"
          id="username"
          required
          v-model="user.username"
          name="username"
        />
      </div>

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
          class="form-control "
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <button @click="saveUser" class="btn btn-success btn-props">
        S'inscrire
      </button>
    </div>
  </div>
</template>

<script>
import { signup } from "../services/user";
export default {
  name: "addUser",
  data() {
    return {
      user: {
        id: null,
        username: "",
        email: "",
        password: "",
        published: false,
      },
      alertMsg: "",
    };
  },
  methods: {
    // valider les inputs username, email et mot de passe lors de l'inscription

    validForm() {
      let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
        "g"
      );
      // tester l'expression regex
      let testUsername = this.user.username.length > 0;
      let testEmail = emailRegExp.test(this.user.email);

      let testPassword = this.user.password.length > 8;

      console.log({ testEmail, testPassword, testUsername });

      return testEmail && testPassword && testUsername;
    },

    // méthode pour enregistrer le nouveau utilisateur
    saveUser() {
      const data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };
      const isformValid = this.validForm();
      if (isformValid) {
        signup(data)
          .then(() => {
            this.$router.push("Login");
          })
          .catch((err) => console.log(err));
      } else {
        alert("error");
      }
      // pour s'inscrire
    },
    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
};
</script>

<style>
.main {
  background-image: url(../assets/london.png);
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;
  background-size: cover;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
.btn-props {
  margin-top: 30px;
}
.styleTitle {
  color: black;
  margin-bottom: 40px;
}
.label-style {
  color: black;
}
</style>
