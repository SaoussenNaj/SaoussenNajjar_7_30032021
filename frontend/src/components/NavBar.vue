<template>
  <div>
    <nav class="navbar navStyle">
      <div class="container-fluid position">
        <a class="navbar-brand" href="/Home">
          <img
            class="logo"
            alt="logo"
            src="../assets/icon-left-font-monochrome-white.png"
          />
        </a>
        <form class="d-flex">
          <button
            v-if="isLogged === true"
            class="btn btn-outline-success btn-light btn-style"
            @click="goToProfilPage"
          >
            Profil
          </button>
          <button
            v-if="isAdmin === true && isLogged === true"
            class="btn btn-outline-success btn-light btn-style"
            @click="goToAdminsPage"
          >
            Administrateur
          </button>
          <button
            v-if="isLogged === true"
            class="btn btn-outline-danger btn-light btn-style"
            @click="signout"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isAdmin() {
      return this.$store.state.user.isAdmin;
    },
    isLogged() {
      return this.$store.state.user.isLogged;
    },
  },
  methods: {
    goToAdminsPage() {
      this.$router.push("/admin");
    },
    signout() {
      localStorage.removeItem("token");
      this.$store.dispatch("signout").then(() => this.$router.push("/login"));
    },
    goToProfilPage() {
      this.$router.push("Profil");
    },
  },
};
</script>

<style scoped>
.position {
  position: sticky;
  top: 0;
}
.navStyle {
  background-color: #181f44;
  position: sticky;
  top: 0;
}
.btn-style {
  margin-left: 15px;
}
.h4 {
  color: red;
}
.logo {
  width: 150px;
  height: 150px;
}
</style>
