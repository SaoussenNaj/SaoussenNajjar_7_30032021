<template>
  <div>
    <!-- for new post -->
    <form id="formPost">
      <div class="header-box">
        <h2>Nouveau Post</h2>
      </div>
      <div v-if="image != ''" class="image-block">
        <img :src="image" />
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
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
          type="button"
          value="Choisir une image*"
          onclick="document.getElementById('input-image').click();"
        />
        <button @click="submitData" type="button">
          Valider
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { createPost } from "../services/post";
export default {
  name: "DialogBoxPost",
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
    //to generate the image selected by the user
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

    /* Submit */
    submitData() {
      if (this.submitDisabled) {
        return;
      }
      let formData = {};
      formData = new FormData(document.getElementById("formPost"));

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
/* .dialog-box-post {
  z-index: 100;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1290px;
  left: 50%;
  top: 15%;
}
.header-box {
  width: 100%;
}
form {
  z-index: 999;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 20px 20px 20px;
  background-color: #181f44;
  border-width: 2px;
  border-radius: 3px;
  box-shadow: black 5px 5px 10px;
}
.image-block {
  display: flex;
  background-color: #e6e6e6;
  text-align: center;
  height: 200px;
  width: 200px;
  border: solid #284048;
  border-radius: 10px;
  border-width: 2px;
  overflow: hidden;
} */
#input-image {
  display: none;
}
/* .inputs {
  width: max-content;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  color: #f8f8f8;
} */

/* .dialog-box-post {
  // z-index + before: prevents unwanted clicks on the DOM
  z-index: 100;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1290px;
  left: 50%;
  top: 15%;
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.3;
  }
  .header-box {
    width: 100%;
  }
  form {
    z-index: 999;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 20px 20px 20px;
    background-color: #181f44;
    border-width: 2px;
    border-radius: 3px;
    box-shadow: black 5px 5px 10px;
    .image-block {
      display: flex;
      background-color: #e6e6e6;
      text-align: center;
      height: 200px;
      width: 200px;
      border: solid #284048;
      border-radius: 10px;
      border-width: 2px;
      overflow: hidden;
      img {
        width: 100%;
        max-height: 100%;
      }
    }
    .inputs {
      width: max-content;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px;
      color: #f8f8f8;
      #input-image {
        display: none;
      }
      button {
        margin-top: 10px;
      }
    }
  }
} */
</style>
