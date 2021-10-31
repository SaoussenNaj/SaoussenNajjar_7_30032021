<template>
  <div>
    <nav class="navbar navStyle">
      <div class="container-fluid" style="  position: sticky;top: 0;">
        <a class="navbar-brand">
          <img
            alt="logo-Groupomania"
            src="/assets/logo.png"
            style="width:150px;height:150px"
          />
        </a>
        <form class="d-flex">
          <button
            class="btn btn-outline-success btn-light btn-style"
            @click="goToProfilPage"
          >
            Profil
          </button>
          <button
            v-if="isAdmin === 'true'"
            class="btn btn-outline-success btn-light btn-style"
            @click="goToAdminsPage"
          >
            Administrateur
          </button>
          <button
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
  data() {
    return {
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  mounted() {
    console.log(this.isAdmin);
  },
  methods: {
    goToAdminsPage() {
      this.$router.push("/admin");
    },
    signout() {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
    goToProfilPage() {
      this.$router.push("Profil");
    },
  },
};
</script>

<style scoped>
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
</style>
