<template>
  <div>
    <Navbar />
    <!-- for new post -->
    <form id="formPost" class="main-form">
      <div class="header-box">
        <h2>Modifier Post</h2>
      </div>
      <div v-if="image != ''" class="image-block">
        <img :src="image" />
      </div>
      <div class="title-desc">
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
      </div>

      <div>
        <input
          name="image"
          type="file"
          id="input-image"
          @change="updatePicture"
          accept="image/png, image/jpg, image/jpeg, image/gif"
        />
        <div class="style-btn">
          <input
            type="button"
            value="Choisir une image"
            onclick="document.getElementById('input-image').click();"
            class="margin-right"
          />
          <button @click="submitData" type="button">
            Valider
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getPostById, modifyPost } from "../services/post";

export default {
  name: "EditPost",
  data() {
    return {
      image: "",
      title: "",
      description: "",
    };
  },
  mounted() {
    getPostById(this.$route.params.id).then((response) => {
      this.image = response.data.post.imgURL;
      this.title = response.data.post.title;
      this.description = response.data.post.description;
    });
  },
  methods: {
    //pour généré l'image choisi par l'utilisateur
    createImage(file) {
      const reader = new FileReader();
      const vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updatePicture(e) {
      const file = e.target.files || e.dataTransfer.files;
      if (!file.length) {
        return;
      }
      this.image = file[0];
      this.createImage(file[0]);
    },

    /* Envoie des données */
    submitData() {
      if (this.submitDisabled) {
        return;
      }
      let formData = {};
      formData = new FormData(document.getElementById("formPost"));

      modifyPost(this.$route.params.id, formData)
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
.main-form {
  height: 100%;
}
#input-image {
  display: none;
}
.style-btn {
  margin-left: 15px;
  margin-bottom: 30px;
}
.title-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.margin-right {
  margin-right: 10px;
}
</style>
