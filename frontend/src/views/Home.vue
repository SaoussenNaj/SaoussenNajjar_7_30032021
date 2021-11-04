<template>
  <div class="home">
    <Posts />
  </div>
</template>

<script>
import Posts from "../components/AffichePost.vue";

export default {
  name: "Home",
  components: {
    Posts,
  },
};
</script>

<style scoped></style>
