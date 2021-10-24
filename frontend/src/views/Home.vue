<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from "@/components/NavBar.vue";


export default {
  name: "Home",
  components: {
    NavBar
  },
};
</script>

<style scoped>
.logo {
  width: 10%;
  display: flex;
  justify-content: flex-start;
}
</style>
