<template>
  <div class="main">
    <!-- for new post -->
    <form id="formPost">
      <div class="header-box">
        <h1>Nouveau Post</h1>
      </div>
      <div v-if="image != ''" class="image-block">
        <img :src="image" />
      </div>
      <div class="style-li">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input
            v-model="title"
            class="form-control"
            name="title"
            id="title"
            type="text"
          />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input
            v-model="description"
            class="form-control"
            name="description"
            id="description"
            type="text"
          />
        </div>
        <div>
          <input
            name="image"
            type="file"
            id="input-image"
            @change="updatePicture"
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
          <input
            class="margin"
            type="button"
            value="Choisir une image"
            onclick="document.getElementById('input-image').click();"
          />
          <button @click="submitData" type="button" class="margin">
            Valider
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { createPost } from "../services/post";
export default {
  name: "AjoutPost",
  computed: {
    ...mapState(["api", "user", "boxPost"]),
  },
  data() {
    return {
      image: "",
      title: "",
      description: "",
      comment: "",
    };
  },
  methods: {
    //pour générer l'image sélectionnée par l'utilisateur
    createImage(file) {
      const reader = new FileReader();
      const vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    // téléchargement de l'image
    updatePicture(e) {
      const file = e.target.files || e.dataTransfer.files;
      if (!file.length) {
        return;
      }
      this.image = file[0];
      this.createImage(file[0]);
    },

    /* Envoie des données*/
    submitData() {
      if (this.submitDisabled) {
        return;
      }
      let formData = {};
      formData = new FormData(document.getElementById("formPost"));
      // création d'un nouveau post
      createPost(formData)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Erreur: " + err);
        });
    },
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
  display: flex;
  justify-content: center;
}
.list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.style-li {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.margin {
  margin-left: 10px;
}
#input-image {
  display: none;
}
</style>
