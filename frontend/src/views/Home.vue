<template>
  <div class="home">
    <Posts />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Posts from "../components/AffichePost.vue";

export default {
  name: "Home",
  components: {
    Posts,
  },
};
</script>

<style scoped></style>
