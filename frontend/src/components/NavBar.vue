<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">
          <img
            alt="Vue logo"
            src="/assets/icon-left-font-monochrome-black.png"
          />
        </a>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar"
  
};
</script>

<style scoped>
.h4 {
  color: red;
}
</style>
