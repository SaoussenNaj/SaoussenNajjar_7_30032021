<template>
  <div class="container-fluid main">
    <h1>Liste des administrateurs</h1>
    <ul class="list-group list">
      <li v-for="admin in admins" v-bind:key="admin.id" class="list-group-item">
        {{ admin.username }}
      </li>
    </ul>
  </div>
</template>
<script>
import { getAdmins } from "../services/user";
export default {
  name: "admins",
  data() {
    return {
      admins: [],
    };
  },
  mounted() {
    getAdmins().then((response) => {
      this.admins = response.data.users;
    });
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
.list {
  justify-content: center;
}
.margin {
  margin-bottom: 15px;
}
</style>
