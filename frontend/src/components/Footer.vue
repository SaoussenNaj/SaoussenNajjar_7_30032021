<template>
  <div class="footer">
    <a href="#">Contact</a>
    <a href="#">Aide</a>
    <a href="#">Information</a>
  </div>
</template>
<script>
export default {
  name: "FooterBlock",
};
</script>
<style scoped>
.footer {
  height: 50px;
  background-color: #181f44;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 20;
}
a {
  margin: 0 10px;
  color: white;
}
</style>
