<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">S'authentifier</h5>
        <form action="">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mot de passe" />
        </form>

        <a href="#" class="btn btn-primary">Se connecter</a>
        <router-link to="/inscription">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped></style>
