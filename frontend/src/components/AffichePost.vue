<template>
  <div class="div-container">
    <div class="btn-style">
      <button type="button" class="btn btn-primary" @click="goToAddPage">
        Ajouter post
      </button>
    </div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="card card-style"
      style="width: 36rem;"
    >
      <img :src="post.imgURL" class="card-img-top" :alt="post.title" />
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">
          {{ post.description }}
        </p>
        <div v-for="comment in comments" :key="comment.id">
          <div v-if="comment.postId === post.id">
            <div
              class="edit-comment mb-3"
              style="display:flex;align-items:center;gap:12px"
            >
              <div v-bind:id="`comment-${comment.id}`" style="display:flex;">
                <div style="margin-right:6px">{{ comment.author }}:</div>
                <div>{{ comment.comment }}</div>
              </div>
              <div class="input-group">
                <input
                  v-bind:id="`comment-${comment.id}-edit`"
                  type="text"
                  class="form-control"
                  name="commentaire"
                  placeholder="Ecrivez un commentaire"
                  style="display:none"
                />
                <button
                  v-bind:id="`comment-${comment.id}-edit-button`"
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="editComment(comment.id)"
                  style="display:none"
                >
                  Envoyer
                </button>
              </div>
              <div class="edit-delete-icon">
                <span @click="showEdit(comment.id, comment.comment)">
                  <i
                    v-if="userId == comment.authorId || isAdmin === 'true'"
                    class="fas fa-edit"
                    style="cursor: pointer;"
                  ></i>
                </span>
                <span @click="deleteComment(comment.id)">
                  <i
                    v-if="userId == comment.authorId || isAdmin === 'true'"
                    class="fas fa-trash-alt"
                    style="cursor: pointer;"
                  ></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            v-bind:id="`post-${post.id}-input`"
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
        <div class="btn-edit-delete-post">
          <a
            class="btn btn-warning"
            v-if="userId == post.userId || isAdmin === 'true'"
            @click="goToEditPage(post.id)"
            >Modifier</a
          >
          <a
            class="btn btn-danger"
            v-if="userId == post.userId || isAdmin === 'true'"
            @click="deletePost(post.id)"
            >Supprimer</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deletePost, getPosts } from "../services/post";
import { addComment, deleteComment, modifyComment } from "../services/comment";

export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      comments: [],
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  // après que le composant est chargé, on exécute tout ce qui est à l'intérieur de la fct mounted
  mounted() {
    getPosts().then((response) => {
      this.posts = response.data.result.posts;
      this.comments = response.data.result.comments;
    });
    console.log({ userId: this.userId, isAdmin: this.isAdmin });
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
      const inputId = `post-${id}-input`;
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
    showEdit(id, comment) {
      document.getElementById(`comment-${id}`).style.display = "none";
      document.getElementById(`comment-${id}-edit`).style.display = "flex";
      document.getElementById(`comment-${id}-edit`).value = comment;
      document.getElementById(`comment-${id}-edit-button`).style.display =
        "block";
    },
    editComment(id) {
      const inputId = `comment-${id}-edit`;
      const comment = document.getElementById(inputId).value;
      modifyComment(id, { comment }).then(() => {
        document.getElementById(`comment-${id}`).style.display = "flex";
        document.getElementById(`comment-${id}-edit`).style.display = "none";
        document.getElementById(`comment-${id}-edit-button`).style.display =
          "none";
        getPosts().then((response) => {
          this.posts = response.data.result.posts;
          this.comments = response.data.result.comments;
        });
      });
    },
  },
};
</script>
<style scoped>
.div-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.card-style {
  margin-bottom: 20px;
}
.btn-style {
  align-self: flex-end;
  margin: 16px;
}
.btn-edit-delete-post {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.icon-color {
  color: black;
}
.edit-comment {
  display: flex;
  justify-content: space-between;
}
.edit-delete-icon {
  display: flex;
  gap: 12px;
}
</style>
