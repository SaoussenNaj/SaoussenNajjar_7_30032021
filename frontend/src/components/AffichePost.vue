<template>
  <div>
    <button type="button" class="btn" @click="goToAddPage">
      Ajouter post
    </button>
    <div
      v-for="post in posts"
      :key="post.id"
      class="card"
      style="width: 36rem;"
    >
      <img :src="post.imgURL" class="card-img-top" :alt="post.title" />
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">
          {{ post.description }}
        </p>
        <a class="btn btn-primary" @click="goToEditPage(post.id)">Modifier</a>
        <a class="btn btn-primary" @click="deletePost(post.id)">Supprimer</a>
        <div v-for="comment in comments" :key="comment.id">
          <div v-if="comment.postId === post.id">
            {{ comment.author }}: {{ comment.comment }}
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteComment(comment.id)"
              >
                Supprimer
              </button>
              <button type="button" class="btn btn-warning">Edit</button>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            v-bind:id="`comment-${post.id}`"
            type="text"
            class="form-control"
            name="commentaire"
            placeholder="Ecrivez un commentaire"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            @click="addComment(post.id)"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deletePost, getPosts } from "../services/post";
import { addComment, deleteComment } from "../services/comment";

export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      comments: [],
    };
  },
  // après que le composant est chargé, on exécute tout ce qui est à l'intérieur de la fct mounted
  mounted() {
    getPosts().then((response) => {
      this.posts = response.data.result.posts;
      this.comments = response.data.result.comments;
    });
  },
  methods: {
    goToEditPage(id) {
      this.$router.push({ name: "EditPost", params: { id } });
    },
    deletePost(id) {
      deletePost(id).then(() => {
        getPosts().then((response) => {
          this.posts = response.data.result.posts;
          this.comments = response.data.result.comments;
        });
      });
    },
    addComment(id) {
      const inputId = `comment-${id}`;
      const comment = document.getElementById(inputId).value;
      addComment(id, { comment }).then(() => {
        getPosts().then((response) => {
          this.posts = response.data.result.posts;
          this.comments = response.data.result.comments;
          document.getElementById(inputId).value = "";
        });
      });
    },
    deleteComment(id) {
      deleteComment(id).then(() => {
        getPosts().then((response) => {
          this.posts = response.data.result.posts;
          this.comments = response.data.result.comments;
        });
      });
    },
    goToAddPage() {
      this.$router.push("AddPost");
    },
  },
};
</script>
<style scoped></style>
