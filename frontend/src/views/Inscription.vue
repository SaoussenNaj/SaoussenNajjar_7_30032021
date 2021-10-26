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
      <label for="username">Username</label>
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
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        required
        v-model="user.password"
        name="password"
      />
    </div>

    <button @click="saveUser" class="btn btn-success btn-props">Submit</button>
  </div>
</template>

<script>
import { signup } from "../services/user";
export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        username: "",
        email: "",
        password: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      const data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };
      signup(data)
        .then(() => {
          this.$router.push("Login");
        })
        .catch((err) => console.log(err));
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.btn-props {
  margin-top: 30px;
}
</style>
