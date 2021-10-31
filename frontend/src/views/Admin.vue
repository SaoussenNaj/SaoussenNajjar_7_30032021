<template>
  <div class="container-fluid" style="height:100%">
    <h1>Liste des administrateurs</h1>
    <ul class="list-group">
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
<style scoped></style>
