<template>
  <div class="home">
    <NavBar />
    <Posts />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from "@/components/NavBar.vue";
import Posts from "../components/AffichePost.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    Posts,
  },
};
</script>

<style scoped></style>
