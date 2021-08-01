<template>
  <div class="comment">
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
      <button @click.prevent="displayEditComment()">annuler</button>
      <button @click="sendComment()">Envoyer</button>
    </div>
    <div class="buttonComment"></div>
    <div class="commentList" v-for="comment in comments" :key="comment.id">
      <p>{{ comment.user.username }}</p>
      <p>{{ comment.content }}</p>
      <button v-if="isAdmin === 1 || comment.user.username === username" @click.prevent="deleteComment(comment.id)">
        supprimer
      </button>
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
      isAdmin: parseInt(localStorage.getItem("isAdmin")),
      username: localStorage.getItem("username")
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
          console.log(response);
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
          console.log("mes comments : ", response.data);
        });
    },
    displayEditComment() {
      this.displayInput = this.displayInput === true ? false : true;
    },
    deleteComment(comment) {
      console.log(comment);
      if (confirm("Voulez-vous poursuivre la suppression ?")) {
        axios
          .delete("http://localhost:3000/api/comments/" + comment, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response);

            window.location.reload();
          });
      }
    },
  },
  mounted() {
    this.getAllComments();
  },
};
</script>

<style></style>
