<template>
  <div class="comment">
    <h1>Commentaires</h1>    
    <div class="buttonComment"></div>
    <div class="commentList" v-for="comment in comments" :key="comment.id">
      <h2>{{ comment.user.username }}</h2>
      <p>{{ comment.content }}</p>
      <button v-if="isAdmin === 1 || comment.user.username === username" @click.prevent="deleteComment(comment.id)">
        supprimer
      </button>
    </div>
    <button @click.prevent="displayEditComment()">
      Laisser un commentaire
    </button>
    <textarea
      v-if="displayInput == true"
      id="textComment"
      v-model="content"
      rows="10"
      maxlength="70"
    ></textarea>
    <div v-if="displayInput == true" class="commentbutton">
      <button @click.prevent="displayEditComment()">Annuler</button>
      <button @click="sendComment()">Envoyer</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comment",
  props: {
    postId: Number,
  },
  data() {
    return {
      comments: "",
      content: null,
      displayInput: false,
      isAdmin: 0,
      username: ""
    };
  },
  methods: {
    sendComment() {
      axios
        .post(
          "http://localhost:3000/api/comments",
          { content: this.content, postId: this.postId },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          response.data
        });
      window.location.reload();
    },
    getAllComments() {
      axios
        .get("http://localhost:3000/api/comments/" + this.postId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.comments = response.data;
        });
    },
    displayEditComment() {
      this.displayInput = this.displayInput === true ? false : true;
      this.content = "";
    },
    deleteComment(comment) {
      if (confirm("Voulez-vous poursuivre la suppression ?")) {
        axios
          .delete("http://localhost:3000/api/comments/" + comment, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            window.location.reload();
          });
      }
    },
    getUserByToken() {
      axios
        .post(
          "http://localhost:3000/api/users/jwt",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.isAdmin = response.data.isAdmin;
          this.username = response.data.username;
        });
    },
  },
  mounted() {
    this.getAllComments();
    this.getUserByToken();
  },
};
</script>

<style></style>
